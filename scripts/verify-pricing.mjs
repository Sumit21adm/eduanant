/**
 * Exhaustive check of the commercial model. Runs on every build.
 *
 * The calculator has shipped two arithmetic bugs: a roll above the published bands
 * fell through to the old annual minimum and quoted a 1,370-student school Rs 90,000,
 * and the "per student a month" line divided the pre-GST licence while the total
 * printed beside it was post-GST. Both were invisible to the type checker and to the
 * prerender, because the figures were computed inside the component.
 *
 * The model now lives in src/data/pricing.ts. This walks every slider position
 * against every option combination and asserts each figure against the published
 * rates, rather than against a second copy of the same arithmetic.
 */
import { build } from 'esbuild';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const out = join(tmpdir(), `eduanant-pricing-${process.pid}.mjs`);
await build({ entryPoints: ['src/data/pricing.ts'], bundle: true, format: 'esm', outfile: out, logLevel: 'silent' });
const P = await import(`file://${out}`);
await rm(out, { force: true });

const fail = [];
const check = (ok, msg) => { if (!ok) fail.push(msg); };
const money = n => `Rs ${n.toLocaleString('en-IN')}`;

/* 1. The bands themselves. */
check(P.RATE_BANDS.length > 0, 'RATE_BANDS is empty');
let prevCeiling = 0;
for (const b of P.RATE_BANDS) {
    check(b.upTo > prevCeiling, `band ceilings must ascend: ${b.upTo} follows ${prevCeiling}`);
    check(b.monthly > 0 && b.annual > 0, `band ${b.upTo} has a non-positive rate`);
    check(b.annual < b.monthly, `band ${b.upTo}: annual ${b.annual} is not below monthly ${b.monthly}`);
    const expected = Math.round(b.monthly * (1 - P.ANNUAL_SAVING_PCT / 100));
    check(b.annual === expected,
        `band ${b.upTo}: annual is ${b.annual}, but ${P.ANNUAL_SAVING_PCT}% off ${b.monthly} is ${expected}`);
    prevCeiling = b.upTo;
}
// Rates must fall as schools grow, or "bigger school, lower rate" is not true.
for (let i = 1; i < P.RATE_BANDS.length; i++) {
    check(P.RATE_BANDS[i].monthly < P.RATE_BANDS[i - 1].monthly,
        `band ${P.RATE_BANDS[i].upTo} is not cheaper per student than ${P.RATE_BANDS[i - 1].upTo}`);
}
check(P.RATE_MONTHLY === P.RATE_BANDS[0].monthly, 'RATE_MONTHLY is not the entry band');
check(P.RATE_ANNUAL === P.RATE_BANDS[0].annual, 'RATE_ANNUAL is not the entry band');
check(P.RATE_FLOOR_ANNUAL < P.RATE_BANDS.at(-1).annual,
    `the quotable floor ${P.RATE_FLOOR_ANNUAL} is not below the last band's annual rate ${P.RATE_BANDS.at(-1).annual}`);
check(P.CONTACT_SALES_ABOVE === P.RATE_BANDS.at(-1).upTo, 'CONTACT_SALES_ABOVE is not the last band ceiling');

/* 2. The size table a director reads. */
for (const band of P.SIZE_BANDS) {
    const expected = band.max * (P.bandFor(band.max)?.annual ?? 0) * 12;
    check(band.upToAnnual === expected,
        `SIZE_BANDS "${band.label}": shows ${money(band.upToAnnual)}, should be ${money(expected)}`);
}

/* 3. The slider: endpoints, monotonicity, and no unreachable band. */
check(P.studentsAtTick(0) === P.SLIDER_MIN, `tick 0 gives ${P.studentsAtTick(0)}, not ${P.SLIDER_MIN}`);
check(P.studentsAtTick(P.SLIDER_TICKS) === P.SLIDER_MAX, `last tick gives ${P.studentsAtTick(P.SLIDER_TICKS)}, not ${P.SLIDER_MAX}`);
let prev = -1;
for (let t = 0; t <= P.SLIDER_TICKS; t++) {
    const n = P.studentsAtTick(t);
    check(n >= prev, `slider goes backwards at tick ${t}: ${prev} then ${n}`);
    check(Number.isInteger(n) && n > 0, `tick ${t} gives a non-student count ${n}`);
    prev = n;
}
for (const b of P.RATE_BANDS) {
    const reachable = [...Array(P.SLIDER_TICKS + 1).keys()].some(t => P.bandFor(P.studentsAtTick(t))?.upTo === b.upTo);
    check(reachable, `no slider position lands in the ${b.upTo} band — it cannot be priced in the calculator`);
}
check(P.studentsAtTick(P.tickForStudents(P.CONTACT_SALES_ABOVE)) === P.CONTACT_SALES_ABOVE,
    'the last band ceiling is not exactly reachable on the slider');

/* 4. Every quote, at every slider position, under every option combination. */
let quotes = 0, quoted = 0;
for (let t = 0; t <= P.SLIDER_TICKS; t++) {
    const students = P.studentsAtTick(t);
    for (const cycle of ['annual', 'monthly']) {
        for (const founding of [true, false]) {
            for (const managedHosting of [true, false]) {
                const q = P.quoteFor({ students, cycle, founding, managedHosting });
                if (students > P.CONTACT_SALES_ABOVE) { check(q === null, `${students} students is past the table but still priced`); quoted++; continue; }
                if (!q) { fail.push(`${students} students is inside the table but returned no price`); continue; }
                quotes++;
                const band = P.bandFor(students);
                const where = `${students} students, ${cycle}${founding ? ', founding' : ''}${managedHosting ? ', hosted' : ''}`;
                check(q.rate === band[cycle], `${where}: rate ${q.rate} is not the band rate ${band[cycle]}`);
                check(q.listLicence === students * band[cycle] * 12, `${where}: licence ${money(q.listLicence)} != students x rate x 12`);
                check(q.licence === (founding ? Math.round(q.listLicence / 2) : q.listLicence), `${where}: founding discount misapplied`);
                check(q.foundingDiscount === q.listLicence - q.licence, `${where}: the discount line does not match the licence lines`);
                // Onboarding is included for every school. It was once charged unless
                // `founding`, while the comparison table, brochure, llms.txt and plan
                // card all said it was included — a non-founding school read "free"
                // and then met Rs 15,000 on its estimate.
                check(q.onboarding === 0, `${where}: onboarding is ${q.onboarding}, but the site says it is included for every school`);
                check(q.hosting === (managedHosting ? P.HOSTING_ANNUAL : 0), `${where}: hosting is ${q.hosting}`);
                check(q.subtotal === q.licence + q.onboarding + q.hosting, `${where}: subtotal does not add up`);
                check(q.gst === Math.round(q.subtotal * P.GST_RATE), `${where}: GST is not ${P.GST_RATE * 100}% of the subtotal`);
                check(q.firstYear === q.subtotal + q.gst, `${where}: total is not subtotal + GST`);
                check(Math.abs(q.perStudentMonth * 12 * students - q.firstYear) < 0.01,
                    `${where}: "${q.perStudentMonth.toFixed(2)} per student a month" does not reconcile with ${money(q.firstYear)}`);
                check(q.firstYear > 0, `${where}: a non-positive total`);
            }
        }
    }
}

/* 5. Annual billing must always beat monthly, or the toggle lies. */
for (let t = 0; t <= P.SLIDER_TICKS; t++) {
    const students = P.studentsAtTick(t);
    const a = P.quoteFor({ students, cycle: 'annual', founding: false, managedHosting: false });
    const m = P.quoteFor({ students, cycle: 'monthly', founding: false, managedHosting: false });
    if (!a || !m) continue;
    check(a.firstYear < m.firstYear, `${students} students: annual ${money(a.firstYear)} is not below monthly ${money(m.firstYear)}`);
    const saving = Math.round((1 - a.licence / m.licence) * 100);
    check(saving === P.ANNUAL_SAVING_PCT,
        `${students} students: annual saves ${saving}%, but the badge claims ${P.ANNUAL_SAVING_PCT}%`);
}

if (fail.length) {
    console.error(`\n  pricing: ${fail.length} inconsistenc${fail.length === 1 ? 'y' : 'ies'} in the commercial model:`);
    for (const f of [...new Set(fail)].slice(0, 25)) console.error(`    - ${f}`);
    if (new Set(fail).size > 25) console.error(`    ... and ${new Set(fail).size - 25} more`);
    console.error('');
    process.exit(1);
}
console.log(`  pricing verified · ${P.RATE_BANDS.length} bands · ${P.SLIDER_TICKS + 1} slider positions · ${quotes} priced quotes · ${quoted} routed to sales`);
