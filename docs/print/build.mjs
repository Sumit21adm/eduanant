/**
 * Builds every printed piece from the same source of truth the website uses.
 *
 * The brochure used to be a hand-typed HTML file. It drifted: it advertised
 * "first 25 schools, 20% off" for weeks after the offer became "first 10, 50%",
 * and the build could not see it, because scripts/verify-pricing.mjs only checks
 * that the per-student rates appear somewhere in the text.
 *
 * So nothing here is typed by hand. Rates, bands, worked examples, founding
 * terms, module names, the release count and the months-live figure are read out
 * of src/data/*.ts at build time and substituted into the templates. Repricing
 * is a one-line edit in pricing.ts followed by `npm run print`.
 *
 *   node docs/print/build.mjs            all pieces
 *   node docs/print/build.mjs leaflet    one piece, by file stem
 *   node docs/print/build.mjs --html     skip the PDF pass (fast, for layout work)
 *   node docs/print/build.mjs --check    measure every page for overflow, then stop
 *
 * Output lands in docs/print/dist as a self-contained .html and a .pdf. The
 * brochure additionally overwrites docs/brochure-source.html and the PDF the
 * website serves, so the public download can never fall behind this build.
 */
import { build as esbuild } from 'esbuild';
import { createRequire } from 'node:module';
import { readFile, writeFile, readdir, rm, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');
const SRC = join(HERE, 'src');
const DIST = join(HERE, 'dist');

/* ── Contact block ───────────────────────────────────────────────────────────
 * The company's own details come from src/data/company.ts, which the website
 * reads as well — a phone number or a GST number appears on nine pieces and
 * must not survive a change in one of them. Only the things that exist solely
 * for print live here: the deep links the QR codes encode, and the reference
 * school the field material leans on.
 */
const CONTACT = {
    demoUrl: 'https://eduanant.cloud/demo',
    pricingUrl: 'https://eduanant.cloud/pricing',
    reference: {
        name: 'S.D.V. Public School',
        city: 'Patna',
        students: '1,300+',
        staff: '100+',
        campuses: 'three campuses',
        board: 'CBSE affiliated',
        site: 'sdv-edu.in',
    },
};

/* ── Read the commercial model and the product out of src/data ───────────────
 * modules.ts imports its icons from lucide-react, which has no business being
 * pulled into a print build. The stub answers any named import with a string, so
 * the module data loads without the icon library existing. It is CommonJS on
 * purpose: esbuild resolves named imports from CJS at runtime rather than
 * checking them at bundle time, which an ESM stub would fail.
 */
const stubLucide = {
    name: 'stub-lucide',
    setup(b) {
        b.onResolve({ filter: /^lucide-react$/ }, () => ({ path: 'lucide', namespace: 'stub' }));
        // Each icon is exported as its own name, so a module's `icon: UserPlus`
        // arrives here as the string "UserPlus" — which is what lets a printed
        // piece draw the same icon the website draws, from the one assignment in
        // modules.ts.
        //
        // The names are generated from that file's own import list rather than
        // served by a Proxy: esbuild's CJS interop copies a module's *own
        // enumerable* properties, and a Proxy with no `ownKeys` trap has none,
        // so every icon silently came through as undefined.
        b.onLoad({ filter: /.*/, namespace: 'stub' }, async () => {
            const src = await readFile(join(ROOT, 'src/data/modules.ts'), 'utf8');
            const imports = /import\s*\{([^}]+)\}\s*from\s*'lucide-react'/.exec(src);
            const names = imports
                ? [...new Set(imports[1].split(',').map(s => s.trim()).filter(s => /^[A-Z]\w*$/.test(s)))]
                : [];
            return {
                contents: names.map(n => `export const ${n} = ${JSON.stringify(n)};`).join('\n')
                    + '\nexport default {};\n',
                loader: 'js',
                resolveDir: ROOT,
            };
        });
    },
};

/* ── Icons ───────────────────────────────────────────────────────────────────
 * Rendered from lucide-react's own icon data rather than redrawn, so print and
 * screen cannot diverge. Used sparingly: a module's icon where a reader is
 * scanning for one, and nowhere a word would do the job.
 */
const ICON_DIR = join(ROOT, 'node_modules/lucide-react/dist/esm/icons');
const iconCache = new Map();
const iconProblems = [];

/** The drawing instructions for one lucide icon, following the alias files
 *  lucide leaves behind when an icon is renamed. `BarChart3` is one of those:
 *  its file is a one-line re-export of `chart-column` and carries no artwork
 *  of its own, which is how the Reports module printed with a blank space
 *  where its icon should have been. */
async function iconNodes(file, depth = 0) {
    if (depth > 3) return null;
    const path = join(ICON_DIR, `${file}.js`);
    if (!existsSync(path)) return null;
    const mod = await import(`file://${path}`);
    if (mod.__iconNode) return mod.__iconNode;
    const alias = /export\s*\{\s*default\s*\}\s*from\s*'\.\/([\w-]+)\.js'/
        .exec(await readFile(path, 'utf8'));
    return alias ? iconNodes(alias[1], depth + 1) : null;
}

async function lucideIcon(name, cls = 'ico') {
    if (!name || typeof name !== 'string') { iconProblems.push('an icon with no name'); return ''; }
    if (!iconCache.has(name)) {
        // BarChart3 -> bar-chart-3: a trailing digit is its own segment in
        // lucide's filenames, which a plain lower-before-upper split misses.
        const kebab = name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Za-z])(\d)/g, '$1-$2')
            .toLowerCase();
        const nodes = await iconNodes(kebab).catch(() => null);
        iconCache.set(name, nodes && nodes.map(([tag, attrs]) =>
            `<${tag} ${Object.entries(attrs)
                .filter(([k]) => k !== 'key')
                .map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join(''));
    }
    const body = iconCache.get(name);
    if (!body) { iconProblems.push(`${name} is not a lucide icon this build can draw`); return ''; }
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"` +
        ` stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

async function loadData() {
    const entry = join(tmpdir(), `eduanant-print-entry-${process.pid}.ts`);
    const out = join(tmpdir(), `eduanant-print-${process.pid}.mjs`);
    await writeFile(entry, `
        export * from ${JSON.stringify(join(ROOT, 'src/data/pricing.ts'))};
        export { MODULES } from ${JSON.stringify(join(ROOT, 'src/data/modules.ts'))};
        export { CHANGELOG, RELEASE_COUNT } from ${JSON.stringify(join(ROOT, 'src/data/changelog.ts'))};
        export { LIVE_SINCE_LABEL, monthsSince } from ${JSON.stringify(join(ROOT, 'src/lib/timeline.ts'))};
        export { PRODUCT_VERSION } from ${JSON.stringify(join(ROOT, 'src/lib/version.ts'))};
        export { COMPANY, REGISTRATIONS, registrationLine, GSTIN, PAYMENT } from ${JSON.stringify(join(ROOT, 'src/data/company.ts'))};
    `);
    await esbuild({
        entryPoints: [entry], bundle: true, format: 'esm', outfile: out,
        plugins: [stubLucide], logLevel: 'silent', absWorkingDir: ROOT,
        // version.ts also re-exports three globals Vite injects when it builds the
        // website. Nothing here reads them, but they have to resolve to something
        // or importing the module throws before PRODUCT_VERSION can be read.
        define: {
            __APP_VERSION__: '"print"', __APP_COMMIT__: '"print"', __APP_BUILT_AT__: '"print"',
        },
    });
    const data = await import(`file://${out}`);
    await rm(entry, { force: true });
    await rm(out, { force: true });
    return data;
}

/* ── Logo ────────────────────────────────────────────────────────────────────
 * Inlined, not linked. A leaflet that depends on a file path renders without its
 * logo the moment it is emailed to a print shop.
 */
async function loadLogo(file, className, scope) {
    let svg = (await readFile(join(ROOT, 'public', file), 'utf8'))
        .replace(/<\?xml[^>]*\?>/, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\sid="[^"]*"/, '')   // the <svg>'s own id, before the gradients are renamed
        .trim();

    /* An inline <svg>'s <style> block is NOT scoped to that svg — the browser
     * hoists it into the document's stylesheets like any other rule. Both logo
     * files colour their artwork through the same generic `.st0` class, so
     * putting them on one page meant the white mark's `fill:#fff` won on cascade
     * order and erased the dark mark wherever it sat on white paper. It printed
     * as a thin sliver, which is what the visiting card and the leaflet's back
     * cover were doing.
     *
     * So each variant's rules are scoped behind its own class, and its gradients
     * are renamed to match. Repeated insertions of the same variant share both,
     * which is harmless: the artwork is identical, and `url(#id)` resolving to
     * the first definition of an identical gradient changes nothing. */
    svg = svg
        .replace(/id="(linear-gradient\d*)"/g, (_, g) => `id="${scope}-${g}"`)
        .replace(/url\(#(linear-gradient\d*)\)/g, (_, g) => `url(#${scope}-${g})`)
        .replace(/\.(st\d+)\s*\{/g, (_, c) => `.${scope} .${c} {`)
        .replace('<svg', `<svg class="${className} ${scope}" aria-hidden="true"`);

    return svg;
}

/** The official full logo, inlined. Both variants come out of
 *  scripts/derive-logo.mjs with their own gradient ids (eal-* and ead-*), so any
 *  number of either can share a page without painting each other's colours.
 *
 *  The width and height attributes are stripped: brand.css sizes the logo in
 *  millimetres, and an inline <svg> that carries pixel dimensions of its own
 *  fights that sizing. */
async function loadFullLogo(file) {
    return (await readFile(join(ROOT, 'public', file), 'utf8'))
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/(<svg[^>]*?)\swidth="[^"]*"/, '$1')
        .replace(/(<svg[^>]*?)\sheight="[^"]*"/, '$1')
        .replace('<svg', '<svg class="lockup-logo"')
        .trim();
}

/** The printed logo is the official artwork — mark and name drawn together, with
 *  the name as outlines in the logo's own typeface. It used to be assembled here
 *  from the mark plus "EduAnant" typed in Plus Jakarta Sans, which was a different
 *  logo that happened to look similar. The descriptor line is optional and sits
 *  beneath: it appears on covers, where there is room to say what the product is,
 *  and is left off the mastheads, where the headline already does. */
function lockup(logo, { size = '', sub = '', hindi = false } = {}) {
    return `<span class="lockup ${size}">${logo}` +
        (sub ? `<span class="lockup-sub">${sub}</span>` : '') +
        (hindi ? `<span class="lockup-hi">एडुअनंत · स्कूल प्रबंधन सिस्टम</span>` : '') +
        `</span>`;
}

/* ── QR codes ────────────────────────────────────────────────────────────────
 * Generated as SVG so they stay sharp at any press resolution. The encoder lives
 * in a sibling repo rather than this one; if it cannot be found the build still
 * completes and prints a labelled placeholder, so a missing dev dependency never
 * silently ships a card with a blank square on it.
 */
function makeQrFactory() {
    const req = createRequire(import.meta.url);
    const candidates = [
        'qrcode',
        join(ROOT, '../eduanant-sms-app/node_modules/qrcode'),
        join(ROOT, '../eduanant-admin-portal/node_modules/qrcode'),
    ];
    for (const c of candidates) {
        try {
            const QR = req(c);
            return { ok: true, make: (text) => QR.toString(text, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' }) };
        } catch { /* try the next */ }
    }
    return {
        ok: false,
        make: async () => '<svg viewBox="0 0 100 100" class="qr-missing">' +
            '<rect width="100" height="100" fill="#F8FAFC" stroke="#B45309" stroke-width="2"/>' +
            '<text x="50" y="46" font-size="9" text-anchor="middle" fill="#B45309" font-family="sans-serif">QR NOT</text>' +
            '<text x="50" y="60" font-size="9" text-anchor="middle" fill="#B45309" font-family="sans-serif">GENERATED</text></svg>',
    };
}

const inr = (n) => n.toLocaleString('en-IN');
const withGst = (n, rate) => Math.round(n * (1 + rate));

function findChrome() {
    const chrome = process.env.CHROME_PATH
        || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Chromium.app/Contents/MacOS/Chromium',
            '/usr/bin/chromium', '/usr/bin/google-chrome'].find(p => existsSync(p));
    if (!chrome) {
        console.error('\n  print: no Chrome found. Set CHROME_PATH, or pass --html to skip rendering.\n');
        process.exit(1);
    }
    return chrome;
}

async function main() {
    const argv = process.argv.slice(2);
    const htmlOnly = argv.includes('--html');
    const checkOnly = argv.includes('--check');
    const only = argv.filter(a => !a.startsWith('--'));

    const P = await loadData();
    const qr = makeQrFactory();
    const css = await readFile(join(HERE, 'brand.css'), 'utf8');

    const logoColour = await loadFullLogo('eduanant-logo-full.svg');
    const logoDark = await loadFullLogo('eduanant-logo-full-dark.svg');
    // The mark on its own is still wanted for the brand sheet, which shows what the
    // symbol is and where it may stand alone (an app icon, an avatar) — never on paper
    // as the logo itself.
    const markDark = await loadLogo('eduanant-logo.svg', 'lockup-mark', 'mk-colour');
    const markLight = await loadLogo('Logo/Logo_logo1.svg', 'lockup-mark', 'mk-white');

    /* The rate ladder, straight from RATE_BANDS. Printing it by hand is what put
     * a retired band on a brochure that was handed to schools for a month. */
    const bandLabel = (b, i) => i === 0
        ? `Up to ${inr(b.upTo)} students`
        : `${inr(P.RATE_BANDS[i - 1].upTo + 1)} – ${inr(b.upTo)}`;

    const rateRows = P.RATE_BANDS.map((b, i) => `<tr>
        <td>${bandLabel(b, i)}</td>
        <td class="num">₹${b.monthly}</td>
        <td class="num num--amber">₹${b.annual}</td>
        <td>up to ₹${inr(b.upTo * b.annual * 12)}</td></tr>`).join('\n');

    const rateRowsCompact = P.RATE_BANDS.map((b, i) => `<tr>
        <td>${bandLabel(b, i)}</td>
        <td class="num">₹${b.monthly}</td>
        <td class="num num--amber">₹${b.annual}</td></tr>`).join('\n');

    /* Worked examples. A director does not multiply in a meeting; they look for a
     * school their own size and read across. GST is shown because most schools
     * are not registered for it and cannot claim it back — quoting ex-GST and
     * invoicing 18% more is the fastest way to lose a signature. */
    const EXAMPLE_ROLLS = [200, 400, 600, 900, 1200];
    const quotePair = (n) => ({
        list: P.quoteFor({ students: n, cycle: 'annual', founding: false, managedHosting: false }),
        found: P.quoteFor({ students: n, cycle: 'annual', founding: true, managedHosting: false }),
    });
    const exampleRows = EXAMPLE_ROLLS.map(n => {
        const { list, found } = quotePair(n);
        return `<tr>
            <td><b>${inr(n)} students</b></td>
            <td class="num">₹${inr(list.licence)}</td>
            <td class="num">₹${inr(list.firstYear)}</td>
            <td class="num num--amber">₹${inr(found.licence)}</td>
            <td class="num num--amber">₹${inr(found.firstYear)}</td></tr>`;
    }).join('\n');

    /* The same examples where a page has three columns instead of five: the only
     * two numbers a director actually reads out loud are the all-in year-one
     * totals, so those are the two that survive the squeeze. */
    const exampleRowsCompact = EXAMPLE_ROLLS.map(n => {
        const { list, found } = quotePair(n);
        return `<tr>
            <td><b>${inr(n)}</b></td>
            <td class="num">₹${inr(list.firstYear)}</td>
            <td class="num num--amber">₹${inr(found.firstYear)}</td></tr>`;
    }).join('\n');

    const moduleIcons = Object.fromEntries(
        await Promise.all(P.MODULES.map(async m => [m.id, await lucideIcon(m.icon)])));

    const moduleListItems = P.MODULES
        .map(m => `<li>${moduleIcons[m.id]}<span>${m.title}</span></li>`).join('\n');

    const moduleGrid = P.MODULES.map(m => `<div class="mod">
        <div class="mod-ico">${moduleIcons[m.id]}</div>
        <div><div class="mod-t">${m.title}</div><div class="mod-s">${m.tagline}</div></div>
    </div>`).join('\n');

    const LOCK_SM = lockup(logoColour, { size: 'lockup--sm' });

    /* One appendix slide per module, so a rep can flip to the exact page a
     * question lands on instead of scrolling a deck in front of the buyer. */
    const moduleSlides = P.MODULES.map(m => `
<section class="sheet sheet--slide">
  <div class="slide-head"><span class="slide-no">Module ${m.id} of ${P.MODULES.length}</span>${LOCK_SM}</div>
  <h2 class="slide-h2"><span class="slide-ico">${moduleIcons[m.id]}</span>${m.title}</h2>
  <p class="slide-lead">${m.tagline}</p>
  <div class="slide-split">
    <div><p class="slide-body">${m.description}</p></div>
    <div class="panel panel--plain"><ul class="ticks">${m.features.slice(0, 8).map(f => `<li>${f}</li>`).join('')}</ul></div>
  </div>
  <div class="slide-foot">${P.COMPANY.site} · ${P.COMPANY.phone}</div>
</section>`).join('\n');

    const monthsLive = P.monthsSince();

    const qrSite = await qr.make(P.COMPANY.siteUrl);
    const qrDemo = await qr.make(CONTACT.demoUrl);
    const qrPricing = await qr.make(CONTACT.pricingUrl);
    const qrWa = await qr.make(`https://wa.me/${P.COMPANY.phoneDigits}`);

    const tokens = {
        CSS: css,
        LOCKUP: lockup(logoColour),
        LOCKUP_HI: lockup(logoColour, { hindi: true }),
        LOCKUP_LG: lockup(logoColour, { size: 'lockup--lg', sub: 'School Management System' }),
        LOCKUP_SM: LOCK_SM,
        LOGO_LG: lockup(logoColour, { size: 'lockup--lg' }),
        LOGO_DARK_LG: `<span class="on-dark">${lockup(logoDark, { size: 'lockup--lg' })}</span>`,
        LOCKUP_DARK: `<span class="on-dark">${lockup(logoDark)}</span>`,
        LOCKUP_DARK_LG: `<span class="on-dark">${lockup(logoDark, { size: 'lockup--lg', sub: 'School Management System' })}</span>`,
        LOCKUP_DARK_SM: `<span class="on-dark">${lockup(logoDark, { size: 'lockup--sm' })}</span>`,
        MARK: markDark,
        MARK_WHITE: markLight,

        RATE_ROWS: rateRows,
        RATE_ROWS_COMPACT: rateRowsCompact,
        EXAMPLE_ROWS: exampleRows,
        EXAMPLE_ROWS_COMPACT: exampleRowsCompact,
        ENTRY_MONTHLY: `₹${P.RATE_MONTHLY}`,
        ENTRY_ANNUAL: `₹${P.RATE_ANNUAL}`,
        LAST_MONTHLY: `₹${P.RATE_BANDS.at(-1).monthly}`,
        LAST_ANNUAL: `₹${P.RATE_BANDS.at(-1).annual}`,
        FLOOR_ANNUAL: `₹${P.RATE_FLOOR_ANNUAL}`,
        CONTACT_ABOVE: inr(P.CONTACT_SALES_ABOVE),
        ANNUAL_SAVING_PCT: String(P.ANNUAL_SAVING_PCT),
        GST_PCT: String(Math.round(P.GST_RATE * 100)),
        HOSTING_ANNUAL: inr(P.HOSTING_ANNUAL),
        HOSTING_ANNUAL_GST: inr(withGst(P.HOSTING_ANNUAL, P.GST_RATE)),
        ONBOARDING_VALUE: inr(P.ONBOARDING_VALUE),
        FOUNDING_COUNT: String(P.FOUNDING_COUNT),
        FOUNDING_PCT: String(Math.round(P.FOUNDING_DISCOUNT * 100)),

        MODULE_COUNT: String(P.MODULES.length),
        MODULE_LIST: moduleListItems,
        MODULE_GRID: moduleGrid,
        MODULE_SLIDES: moduleSlides,
        RELEASE_COUNT: String(P.RELEASE_COUNT),
        // The released product version, not the newest changelog heading: that
        // heading may cover a range ("1.5.0 – 1.5.4") and would print as one.
        VERSION: P.PRODUCT_VERSION,
        LIVE_SINCE: P.LIVE_SINCE_LABEL,
        MONTHS_LIVE: String(monthsLive),

        REF_NAME: CONTACT.reference.name,
        REF_CITY: CONTACT.reference.city,
        REF_STUDENTS: CONTACT.reference.students,
        REF_STAFF: CONTACT.reference.staff,
        REF_CAMPUSES: CONTACT.reference.campuses,
        REF_BOARD: CONTACT.reference.board,
        REF_SITE: CONTACT.reference.site,

        LEGAL_NAME: P.COMPANY.legalName,
        ADDRESS: P.COMPANY.addressLine,
        /** The same registered office set as a postal block, for a letterhead
         *  or anywhere it is the company's address rather than a line of
         *  furniture. */
        ADDRESS_BLOCK: P.COMPANY.addressLines.join('<br>'),
        PHONE: P.COMPANY.phone,
        WHATSAPP: P.COMPANY.whatsapp,
        EMAIL: P.COMPANY.email,
        SITE: P.COMPANY.site,

        /* Registry identifiers. REG_LINE is the compact one-liner for a footer;
         * REG_ROWS is the table a school's accountant reads off the order form. */
        // The name on the bank account, exactly — no "M/S". See PAYMENT in src/data/company.ts.
        PAYEE: P.PAYMENT.payee,
        REG_LINE: P.registrationLine,
        GSTIN: P.GSTIN,
        // One token per identifier — REG_LLPIN, REG_GSTIN, REG_UDYAM, REG_DPIIT —
        // so a narrow letterhead can print two of them without a template
        // hardcoding a number and quietly going stale.
        ...Object.fromEntries(P.REGISTRATIONS.map(r =>
            [`REG_${r.label.toUpperCase()}`, r.value])),
        REG_ROWS: P.REGISTRATIONS.map(r =>
            `<tr><td>${r.label}</td><td class="num">${r.value}</td>` +
            `<td style="font-size:7pt;color:var(--ink-mute)">${r.note ?? ''}</td></tr>`).join('\n'),
        REG_CHIPS: P.REGISTRATIONS.map(r =>
            `<span class="chip">${r.label} ${r.value}</span>`).join(''),

        QR_SITE: qrSite,
        QR_DEMO: qrDemo,
        QR_PRICING: qrPricing,
        QR_WA: qrWa,
    };

    await mkdir(DIST, { recursive: true });
    const files = (await readdir(SRC)).filter(f => f.endsWith('.html')).sort();
    const picked = only.length ? files.filter(f => only.some(o => f.includes(o))) : files;
    if (!picked.length) {
        console.error(`\n  print: nothing matched ${only.join(', ')}. Available: ${files.map(f => basename(f, '.html')).join(', ')}\n`);
        process.exit(1);
    }

    const problems = [];
    const made = [];

    for (const f of picked) {
        let html = await readFile(join(SRC, f), 'utf8');

        // {{ICON:Bell}} — any lucide name, so a template can place one without
        // build.mjs needing a token per icon. Resolved before the plain tokens.
        for (const hit of [...new Set([...html.matchAll(/\{\{ICON:([A-Za-z0-9]+)\}\}/g)].map(m => m[1]))]) {
            html = html.replaceAll(`{{ICON:${hit}}}`, await lucideIcon(hit));
        }

        html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
            if (!(k in tokens)) { problems.push(`${f}: unknown token {{${k}}}`); return m; }
            return tokens[k];
        });

        /* A rate typed into a template by hand is exactly the failure this build
         * exists to prevent, so anything shaped like a per-student rate must be
         * one the model actually publishes. */
        const known = new Set([
            ...P.RATE_BANDS.flatMap(b => [b.monthly, b.annual]),
            P.RATE_FLOOR_ANNUAL,
        ]);
        for (const m of html.matchAll(/₹\s*(\d{1,3})\s*(?:\/|per |a month per |a student|\s*per student)/gi)) {
            if (!known.has(Number(m[1]))) problems.push(`${f}: ₹${m[1]} per student is not a published rate`);
        }

        const outHtml = join(DIST, f);
        await writeFile(outHtml, html);
        made.push({ src: f, html: outHtml });
    }

    // A missing icon leaves a hole no reader can diagnose, so it fails the build
    // rather than printing as empty space.
    for (const p of new Set(iconProblems)) problems.push(`icon: ${p}`);

    if (problems.length) {
        console.error('\n  print: the kit does not agree with src/data:');
        for (const p of [...new Set(problems)]) console.error(`    - ${p}`);
        console.error('');
        process.exit(1);
    }

    /* ── Overflow check ──────────────────────────────────────────────────────
     * A fixed-size page silently clips whatever does not fit, and the clipped
     * part is always the bottom — which on these pieces is the price, the
     * signature block or the telephone number. Catching that by eye means
     * rendering every page and looking at it, and it was missed twice.
     *
     * So the pages measure themselves. The DOM is rendered with a script that
     * compares each page's content height against the page box and records the
     * overshoot on the element; --dump-dom hands the result back here. */
    if (checkOnly) {
        const chrome = findChrome();
        /* The limit is whatever the flowing content would actually hit: the top
         * of the pinned footer where a page has one, otherwise the bottom
         * padding. Measuring against the padding box alone flagged pages that
         * were merely tight, which trains you to ignore the check. */
        const probe = `<script>window.addEventListener('load',()=>{
            const FOOT = '.footer,.pan-foot,.slide-foot,.foot-rule';
            document.querySelectorAll('.sheet,.card,.pan')
                .forEach((p, i) => { p.dataset.page = String(i + 1); });
            // .pan, not .fold: in a bifold the panel is the page, and the fold
            // is only the spread that holds two of them.
            for (const el of document.querySelectorAll('.sheet,.card,.pan')) {
                const box = el.getBoundingClientRect();
                let limit = box.bottom - (parseFloat(getComputedStyle(el).paddingBottom) || 0);
                for (const f of el.querySelectorAll(FOOT)) {
                    if (getComputedStyle(f).position !== 'absolute') continue;
                    limit = Math.min(limit, f.getBoundingClientRect().top);
                }
                let low = 0;
                const walk = (node) => {
                    for (const kid of node.children) {
                        if (kid.matches(FOOT)) continue;
                        if (getComputedStyle(kid).position === 'absolute') { walk(kid); continue; }
                        low = Math.max(low, kid.getBoundingClientRect().bottom);
                    }
                };
                walk(el);
                const over = Math.round(low - limit);
                if (over > 2) el.setAttribute('data-overflow', over + '@' + (el.dataset.page || '?'));
            }
            document.title = 'measured';
        });</script>`;
        const bad = [];
        for (const m of made) {
            const probed = m.html.replace(/\.html$/, '.probe.html');
            await writeFile(probed, (await readFile(m.html, 'utf8')).replace('</head>', probe + '</head>'));
            const { stdout } = await run(chrome, ['--headless=new', '--disable-gpu',
                '--virtual-time-budget=15000', '--dump-dom', `file://${probed}`], { maxBuffer: 64 << 20 });
            await rm(probed, { force: true });
            for (const hit of stdout.matchAll(/data-overflow="(\d+)@(\S+?)"/g)) {
                bad.push(`${basename(m.src, '.html')}: page ${hit[2]} runs ~${Math.round(hit[1] / 3.78)}mm into its footer`);
            }
        }
        if (bad.length) {
            console.error('\n  print: content is being clipped off the page:');
            for (const b of bad) console.error(`    - ${b}`);
            console.error('');
            process.exit(1);
        }
        console.log(`\n  print · ${made.length} pieces measured, nothing clipped\n`);
        return;
    }

    if (!htmlOnly) {
        const chrome = findChrome();
        for (const m of made) {
            const pdf = m.html.replace(/\.html$/, '.pdf');
            await run(chrome, [
                '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                '--virtual-time-budget=20000', `--print-to-pdf=${pdf}`, `file://${m.html}`,
            ]).catch(e => { throw new Error(`rendering ${m.src}: ${e.message}`); });
            m.pdf = pdf;
        }
    }

    /* The website serves the brochure. Regenerating it here and leaving the
     * public copy untouched is how the download went stale the first time. */
    const brochure = made.find(m => m.src.includes('brochure'));
    if (brochure && brochure.pdf) {
        await copyFile(brochure.pdf, join(ROOT, 'public/eduanant-school-overview.pdf'));
        await copyFile(brochure.html, join(ROOT, 'docs/brochure-source.html'));
    }

    console.log(`\n  print · ${made.length} piece${made.length === 1 ? '' : 's'} built from src/data` +
        `${qr.ok ? '' : '  (QR encoder missing — placeholders printed)'}`);
    for (const m of made) console.log(`    ${basename(m.src, '.html').padEnd(22)} ${m.pdf ? 'pdf + html' : 'html'}`);
    if (brochure && brochure.pdf) console.log(`    → public/eduanant-school-overview.pdf refreshed`);
    console.log('');
}

main().catch(e => { console.error(`\n  print: ${e.message}\n`); process.exit(1); });
