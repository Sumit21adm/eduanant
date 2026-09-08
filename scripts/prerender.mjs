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
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join, extname, dirname } from 'node:path';

const execFileAsync = promisify(execFile);
const DIST = 'dist';
const PORT = 4477;

const ROUTES = [
    '/', '/features', '/security', '/updates', '/pricing',
    '/demo', '/contact', '/register',
    '/privacy-policy', '/terms-of-service', '/refund-policy',
];

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

const server = await serveDist();
let ok = 0;

try {
    for (const route of ROUTES) {
        const { stdout } = await execFileAsync(chrome, [
            '--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
            '--virtual-time-budget=7000', '--run-all-compositor-stages-before-draw',
            '--dump-dom', `http://localhost:${PORT}${route}`,
        ], { maxBuffer: 64 * 1024 * 1024 });

        // Sanity-check the render before overwriting anything.
        const title = /<title>([^<]*)<\/title>/.exec(stdout)?.[1] ?? '';
        const hasContent = stdout.includes('<h1') || stdout.includes('id="root"');
        if (!title || !hasContent || stdout.length < 5000) {
            throw new Error(`route ${route} rendered no usable HTML (title="${title}", ${stdout.length} bytes)`);
        }

        const out = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
        await mkdir(dirname(out), { recursive: true });
        await writeFile(out, stdout);
        ok++;
        console.log(`  ✓ ${route.padEnd(20)} ${title.slice(0, 58)}`);
    }
    console.log(`\n  prerendered ${ok}/${ROUTES.length} routes\n`);
} finally {
    server.close();
}

if (ok !== ROUTES.length) process.exit(1);
