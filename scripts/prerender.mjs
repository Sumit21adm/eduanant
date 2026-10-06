/**
 * Prerender each route to static HTML after `vite build`.
 *
 * Why this exists: the site is a client-rendered SPA, so every route ships the
 * same empty index.html. Google will usually render the JavaScript eventually,
 * but the AI crawlers we care about — GPTBot, ClaudeBot, PerplexityBot, CCBot —
 * largely do not execute JS. Without this step they see one generic page for the
 * whole site, with no per-page title, description or JSON-LD.
 *
 * It serves dist/, loads each route in headless Chrome, and writes the rendered
 * DOM to dist/<route>/index.html. nginx already resolves those via
 * `try_files $uri $uri/ /index.html`, so no server change is needed.
 *
 * Keep ROUTES in step with the router in src/App.tsx.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, access, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join, extname, dirname } from 'node:path';

const execFileAsync = promisify(execFile);
const DIST = 'dist';
const PORT = 4477;

/** Route -> [sitemap priority, changefreq]. One list drives both the prerender
 *  and sitemap.xml, so a new page cannot be prerendered but left unlisted. */
const ROUTES = {
    '/':                  ['1.0', 'weekly'],
    '/features':          ['0.9', 'monthly'],
    '/pricing':           ['0.9', 'monthly'],
    '/demo':              ['0.8', 'monthly'],
    '/security':          ['0.8', 'monthly'],
    '/contact':           ['0.7', 'monthly'],
    '/updates':           ['0.6', 'weekly'],
    '/register':          ['0.6', 'monthly'],
    '/privacy-policy':    ['0.3', 'yearly'],
    '/terms-of-service':  ['0.3', 'yearly'],
    '/refund-policy':     ['0.3', 'yearly'],
};
const SITE_URL = 'https://eduanant.cloud';

/** Rendered to 404.html, which nginx serves with a real 404 status. Not in the
 *  sitemap, and the page itself carries noindex. */
const NOT_FOUND_ROUTE = '/__not-found__';

const MIME = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
    '.json': 'application/json', '.pdf': 'application/pdf', '.txt': 'text/plain',
    '.xml': 'application/xml', '.ico': 'image/x-icon',
};

function findChrome() {
    if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
    const candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/usr/bin/chromium-browser', '/usr/bin/chromium',
        '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    ];
    return candidates.find(p => existsSync(p)) ?? null;
}

async function serveDist() {
    const server = createServer(async (req, res) => {
        const path = decodeURIComponent(req.url.split('?')[0]);
        let file = join(DIST, path === '/' ? 'index.html' : path);
        try {
            await access(file);
            if (!extname(file)) file = join(DIST, 'index.html');
        } catch {
            file = join(DIST, 'index.html'); // SPA fallback
        }
        try {
            const body = await readFile(file);
            res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
            res.end(body);
        } catch {
            res.writeHead(404).end('not found');
        }
    });
    await new Promise(r => server.listen(PORT, r));
    return server;
}

const chrome = findChrome();
if (!chrome) {
    console.error(
        '\n  prerender: no Chrome/Chromium found.\n' +
        '  Set CHROME_PATH, or install chromium (Alpine: apk add --no-cache chromium).\n' +
        '  Pages will still work, but AI crawlers will not see per-page metadata.\n'
    );
    process.exit(1);
}

// public/llms.txt and docs/brochure-source.html quote prices but cannot import
// src/data/pricing.ts. Repricing used to mean remembering they exist; now the
// build refuses rather than letting the site quote two different numbers.
const pricingSrc = await readFile('src/data/pricing.ts', 'utf8');
const allBands = [...pricingSrc.matchAll(/\{\s*upTo:\s*(\d+),\s*monthly:\s*(\d+),\s*annual:\s*(\d+)\s*\}/g)];
const firstTier = allBands[0];
const lastTier = allBands[allBands.length - 1];
// The quotable floor is its own constant, not the last band's rate: the table stops
// at the 1,250 band and ₹25 is room to negotiate below it, so deriving it from the
// last band would silently publish ₹30 as the floor.
const floorMatch = /RATE_FLOOR_ANNUAL = (\d+)/.exec(pricingSrc);
if (!firstTier || !lastTier || !floorMatch) {
    console.error('\n  prerender: could not read the rates out of src/data/pricing.ts — the drift guard cannot run.\n');
    process.exit(1);
}
const rates = {
    entryMonthly: Number(firstTier[2]),
    entryAnnual: Number(firstTier[3]),
    lastBandMonthly: Number(lastTier[2]),
    lastBandAnnual: Number(lastTier[3]),
    contactAbove: Number(lastTier[1]),
    floorAnnual: Number(floorMatch[1]),
};
const inrGroup = (n) => n.toLocaleString('en-IN');
const staticPriceFiles = ['public/llms.txt', 'docs/brochure-source.html'];
const priceProblems = [];
for (const f of staticPriceFiles) {
    let text;
    try { text = await readFile(f, 'utf8'); } catch { continue; }
    for (const [label, value] of [
        ['entry annual rate', `\u20b9${rates.entryAnnual}`],
        ['entry monthly rate', `\u20b9${rates.entryMonthly}`],
        ['largest band monthly rate', `\u20b9${rates.lastBandMonthly}`],
        ['largest band annual rate', `\u20b9${rates.lastBandAnnual}`],
        ['quotable floor rate', `\u20b9${rates.floorAnnual}`],
        ['contact-sales threshold', inrGroup(rates.contactAbove)],
    ]) {
        if (!text.includes(value)) priceProblems.push(`${f} does not mention the ${label} ${value}`);
    }
}
// A per-student rate typed by hand into a component is how the homepage ended up
// offering "₹25 if you pay monthly" a reprice after that stopped being true, and how
// index.html advertised ₹20 through two of them. Anything shaped like a per-student
// rate must be one of the rates this file defines — mock dashboard amounts such as
// ₹64,500 for a day's collection do not match the pattern and are left alone.
const known = new Set([
    ...allBands.flatMap(b => [Number(b[2]), Number(b[3])]),
    rates.floorAnnual,
]);
const PER_STUDENT = /\u20b9\s*(\d{1,3})\s*(?:\/\s*stu|per stu|a month per stu|\/ ?student)/gi;
const sourceFiles = [];
for (const dir of ['src', 'index.html']) {
    if (dir === 'index.html') { sourceFiles.push(dir); continue; }
    const walk = async (d) => {
        for (const e of await readdir(d, { withFileTypes: true })) {
            const full = `${d}/${e.name}`;
            if (e.isDirectory()) await walk(full);
            else if (/\.(tsx?|html)$/.test(e.name) && full !== 'src/data/pricing.ts') sourceFiles.push(full);
        }
    };
    await walk(dir);
}
for (const f of sourceFiles) {
    const text = await readFile(f, 'utf8');
    for (const m of text.matchAll(PER_STUDENT)) {
        if (!known.has(Number(m[1]))) {
            priceProblems.push(
                `${f} hardcodes "${m[0].trim()}", which is not a rate in src/data/pricing.ts ` +
                `(known: ${[...known].sort((a, b) => a - b).join(', ')}) — import it instead of typing it`,
            );
        }
    }
}

if (priceProblems.length) {
    console.error('\n  prerender: pricing drift — src/data/pricing.ts disagrees with the static files:');
    for (const m of priceProblems) console.error(`    - ${m}`);
    console.error('  Update those files (and regenerate the PDF) to match.\n');
    process.exit(1);
}

// A route added to the router but not to ROUTES would 404 in production, since
// nginx only serves what was prerendered. Fail the build instead of shipping it.
const appSrc = await readFile('src/App.tsx', 'utf8');
const declared = [...appSrc.matchAll(/<Route path="([^"]+)"/g)].map(m => m[1]).filter(p => p !== '*');
const missing = declared.filter(r => !(r in ROUTES));
if (missing.length) {
    console.error(`\n  prerender: these routes exist in App.tsx but are not in ROUTES: ${missing.join(', ')}\n`);
    process.exit(1);
}

const server = await serveDist();
let ok = 0;

try {
    for (const route of [...Object.keys(ROUTES), NOT_FOUND_ROUTE]) {
        const { stdout } = await execFileAsync(chrome, [
            '--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
            '--virtual-time-budget=20000', '--run-all-compositor-stages-before-draw',
            '--dump-dom', `http://localhost:${PORT}${route}`,
        ], { maxBuffer: 64 * 1024 * 1024 });

        // Sanity-check the render before overwriting anything. This has to assert
        // real *content*, not just that a document came back: an un-hydrated SPA
        // shell still has a <title> and an #root div, and an earlier, looser
        // version of this check happily wrote 6 KB empty pages to disk.
        const title = /<title>([^<]*)<\/title>/.exec(stdout)?.[1] ?? '';
        const body = stdout.replace(/<script[\s\S]*?<\/script>/g, '');
        const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
        const hasH1 = /<h1[\s>]/.test(stdout);
        if (!title || !hasH1 || words < 120) {
            throw new Error(
                `route ${route} rendered no usable content — title="${title}", h1=${hasH1}, ${words} words. ` +
                `The app did not finish rendering before the DOM was dumped.`
            );
        }

        const out = route === NOT_FOUND_ROUTE ? join(DIST, '404.html')
            : route === '/' ? join(DIST, 'index.html')
            : join(DIST, route, 'index.html');
        await mkdir(dirname(out), { recursive: true });
        await writeFile(out, stdout);
        ok++;
        console.log(`  ✓ ${(route === NOT_FOUND_ROUTE ? '404.html' : route).padEnd(20)} ${title.slice(0, 58)}`);
    }
    // lastmod tracks the build, so the sitemap is never stale on deploy.
    const today = new Date().toISOString().slice(0, 10);
    const urls = Object.entries(ROUTES).map(([route, [priority, changefreq]]) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
    await writeFile(join(DIST, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

    console.log(`\n  prerendered ${ok - 1}/${Object.keys(ROUTES).length} routes + 404.html · sitemap.xml written (${today})\n`);
} finally {
    server.close();
}

if (ok !== Object.keys(ROUTES).length + 1) process.exit(1);
