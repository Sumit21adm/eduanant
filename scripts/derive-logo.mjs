/**
 * Derives the logo files the website and the print kit use from the master.
 *
 *   node scripts/derive-logo.mjs
 *
 * The master is public/Logo/EduAnant_Trademark_Logo.svg — the full logo, mark
 * and name, as exported from the design file. It cannot be used as it stands, for
 * two reasons that are both mechanical:
 *
 *   1. It is drawn for a white page. The mark's left loop and the whole wordmark
 *      are navy, so on the site's dark theme the logo simply disappears.
 *   2. Its 1459 x 343 canvas has uneven built-in margins — 29 units above the
 *      artwork and 68 below. Sized by height in a header, that leaves the logo
 *      sitting visibly high of centre.
 *
 * So this crops to the artwork and writes a second copy for dark grounds. It
 * changes nothing else: no path is redrawn, moved or re-spaced, and the dark
 * version swaps colours only, using the same light-slate left loop the mark-only
 * dark logo already uses so the two never read as different brands.
 *
 * It fails loudly if the master does not have the shape it expects. A silently
 * mis-derived logo is worse than none, because it ends up on the front of a
 * leaflet and nobody notices until a director does.
 */
import { readFile, writeFile } from 'node:fs/promises';

const MASTER = 'public/Logo/EduAnant_Trademark_Logo.svg';

/** The artwork's tight bounds inside the 1459 x 343 canvas — measured with
 *  getBoundingClientRect on the three paths (x 27-1425, y 29.3-275) — plus 4
 *  units of air so anti-aliased edges are never clipped. Re-measure if the
 *  master's artwork changes. */
const CROP = { x: 23, y: 25, w: 1406, h: 254 };

/** Colours for a dark ground. The mark's gradient is the one in
 *  eduanant-logo-dark.svg; the wordmark goes white. */
const DARK = {
    wordmark: '#FFFFFF',
    cap: [['0', '#E8EEF5'], ['1', '#CBD5E1']],
    loop: [
        ['0', '#F1F5F9'], ['0', '#E2E8F0'], ['.2', '#CBD5E1'], ['.3', '#93C5D8'],
        ['.4', '#3FBBD6'], ['.5', '#00b6d5'], ['.6', '#17bad7'], ['.8', '#40c2dc'],
        ['.9', '#59c8de'], ['1', '#63cae0'],
    ],
};

const stops = (list) => list.map(([o, c]) => `      <stop offset="${o}" stop-color="${c}"/>`).join('\n');

const master = await readFile(MASTER, 'utf8');

// The shape this relies on. Anything else and the crop and colour swaps are guesses.
const expect = (ok, what) => { if (!ok) { console.error(`\n  derive-logo: ${MASTER} ${what}\n`); process.exit(1); } };
expect((master.match(/<path /g) || []).length === 3, 'no longer has exactly three paths');
expect(!/<text/.test(master), 'contains live <text> — outline the wordmark first, or it renders in whatever font the visitor has');
expect(/viewBox="0 0 1459 343"/.test(master), 'is no longer a 1459 x 343 canvas, so CROP is stale');
expect(/id="linear-gradient"/.test(master) && /id="linear-gradient-2"/.test(master), 'has different gradients than expected');
expect(/id="Path_3"[^>]*fill="#192a54"/.test(master), 'has a different wordmark colour than expected');

function derive({ dark, prefix }) {
    let svg = master
        // The master clips to its own full canvas, which means nothing once cropped.
        .replace(/<clipPath[\s\S]*?<\/clipPath>\s*/, '')
        .replace(/\sclip-path="url\(#clip-[^)]*\)"/, '')
        .replace(
            /<svg[^>]*>/,
            `<svg xmlns="http://www.w3.org/2000/svg" width="${CROP.w}" height="${CROP.h}" ` +
            `viewBox="${CROP.x} ${CROP.y} ${CROP.w} ${CROP.h}" role="img" aria-label="EduAnant">`,
        );

    if (dark) {
        svg = svg
            .replace(/(<linearGradient id="linear-gradient"[^>]*>)[\s\S]*?(<\/linearGradient>)/,
                `$1\n${stops(DARK.cap)}\n    $2`)
            .replace(/(<linearGradient id="linear-gradient-2"[^>]*>)[\s\S]*?(<\/linearGradient>)/,
                `$1\n${stops(DARK.loop)}\n    $2`)
            .replace(/(id="Path_3"[^>]*fill=")#192a54(")/, `$1${DARK.wordmark}$2`);
    }

    // Gradient ids are renamed per variant. Both variants get inlined into one
    // print page, and an id clash would paint one logo with the other's colours.
    svg = svg
        .replace(/linear-gradient-2/g, `${prefix}-loop`)
        .replace(/linear-gradient/g, `${prefix}-cap`);

    const banner = `<!-- Derived by scripts/derive-logo.mjs from public/Logo/EduAnant_Trademark_Logo.svg. ` +
        `Cropped to the artwork${dark ? '; colours changed for dark grounds' : ''}. Do not edit by hand. -->\n`;
    return banner + svg.replace(/^\s+|\s+$/g, '') + '\n';
}

await writeFile('public/eduanant-logo-full.svg', derive({ dark: false, prefix: 'eal' }));
await writeFile('public/eduanant-logo-full-dark.svg', derive({ dark: true, prefix: 'ead' }));
console.log('  derive-logo · public/eduanant-logo-full.svg, public/eduanant-logo-full-dark.svg');
