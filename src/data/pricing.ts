/**
 * Commercial terms — the single source of truth.
 *
 * These numbers used to be typed into fourteen places across nine files: the
 * pricing page and its calculator, the homepage pricing block, the menu hint,
 * the 404 page, four SEO strings, the FAQ schema, llms.txt and the PDF source.
 * Repricing meant finding all of them, and missing one meant the site quoted two
 * different numbers.
 *
 * Change a rate here and every rendered surface follows. The two static files
 * that cannot import — public/llms.txt and docs/brochure-source.html — are
 * checked against these values during the build, which fails if they drift.
 */

/**
 * Rate bands, in uniform steps of 250. The rate for a school's band applies to its
 * whole roll, not marginally like tax brackets.
 *
 * Band rates are a deliberate commercial choice with a known cost: because the rate
 * steps down at a boundary, a school just over one pays less in total than a school
 * just under it (251 students costs less than 250). Charging marginally keeps totals
 * rising but cannot reach the low rates this table publishes — it bottoms out near
 * ₹28 — and the table was the priority.
 *
 * The table stops at 1,250 rather than running to 1,500 at ₹25. An earlier version
 * published a 1,301–1,500 band at ₹25 and it inverted badly: 1,301 students came to
 * ₹3,90,300 against ₹4,68,000 for 1,300, so the smaller school paid ₹77,700 more.
 * Stopping here keeps every published step at +250, drops the inverted row, and
 * leaves ₹25 as a floor sales can quote down to instead of a rate we must honour.
 */
export const RATE_BANDS = [
    { upTo: 250, annual: 50, monthly: 63 },
    { upTo: 500, annual: 45, monthly: 56 },
    { upTo: 750, annual: 40, monthly: 50 },
    { upTo: 1000, annual: 35, monthly: 44 },
    { upTo: 1250, annual: 30, monthly: 38 },
] as const;

/** Above the last band we quote rather than publish. */
export const CONTACT_SALES_ABOVE = RATE_BANDS[RATE_BANDS.length - 1].upTo;

/** Entry rate — what a small school pays, and the headline figure. */
export const RATE_ANNUAL = RATE_BANDS[0].annual;
export const RATE_MONTHLY = RATE_BANDS[0].monthly;

/**
 * The lowest rate sales may quote, for "from ₹25" copy on the contact row. It is
 * deliberately below the last published band (₹30) rather than derived from it:
 * this is the room to negotiate on a large school, not a rate in the table.
 */
export const RATE_FLOOR_ANNUAL = 25;

/** The band a roll of n students falls into, or null above the last one. */
export const bandFor = (students: number) =>
    RATE_BANDS.find(b => students <= b.upTo) ?? null;

/** Licence for a roll of n students on the given cycle, before GST.
 *  Returns null above the published bands, where sales quotes instead. */
export function licenceFor(students: number, cycle: 'annual' | 'monthly' = 'annual'): number | null {
    const band = bandFor(students);
    return band ? students * band[cycle] * 12 : null;
}

/** What one student effectively costs per month at this roll. */
export const effectiveRate = (students: number, cycle: 'annual' | 'monthly' = 'annual') => {
    const band = bandFor(students);
    return band ? band[cycle] : RATE_FLOOR_ANNUAL;
};

/** Floor for an annual contract, so a very small school is still viable to serve.
 *  Scaled with the rate so it keeps covering ~150 students — a floor that covers
 *  fewer and fewer schools as the rate rises stops being a floor. */
export const MIN_ANNUAL = 90_000;

/** Optional managed hosting, per year, if the school would rather not run a box. */
export const HOSTING_ANNUAL = 18_000;

/** List value of onboarding — migration, install, two days of on-site training. */
export const ONBOARDING_VALUE = 15_000;

/** GST applied on top of every figure quoted on the site. */
export const GST_RATE = 0.18;

/** Founding cohort: how many schools, and the first-year discount they get. */
export const FOUNDING_COUNT = 10;
export const FOUNDING_DISCOUNT = 0.5;

/** Students covered before the annual minimum stops binding. */
export const MIN_COVERS_STUDENTS = Math.round(MIN_ANNUAL / (RATE_ANNUAL * 12));

/** What a monthly payer gives up by not paying annually, as a percentage. */
export const ANNUAL_SAVING_PCT = Math.round((1 - RATE_ANNUAL / RATE_MONTHLY) * 100);

/** 36000 -> "36,000" in Indian digit grouping. */
export const inr = (n: number) => n.toLocaleString('en-IN');

/** "₹20" — the headline rate, for prose and metadata. */
export const annualRateLabel = `₹${RATE_ANNUAL}`;
export const monthlyRateLabel = `₹${RATE_MONTHLY}`;
export const minAnnualLabel = `₹${inr(MIN_ANNUAL)}`;

/* ── Size bands ───────────────────────────────────────────────────────────────
 * Presentation only. Billing stays per student, so a school at the bottom of a
 * band never pays the top-of-band rate and one extra admission never costs a
 * step change. These exist so a director can find their own school in one row
 * instead of doing arithmetic in a meeting.
 */
export interface SizeBand {
    label: string;
    /** Upper bound of the band; undefined means "and above". */
    max?: number;
    /** Lower display bound — what the smallest school in this band actually pays. */
    from?: number;
}

const BAND_CEILINGS = RATE_BANDS.map(b => b.upTo);

/** Annual licence for a roll of n students, before GST, respecting the minimum.
 *  Null above the published bands. */
export const annualFor = (students: number) => {
    const l = licenceFor(students, 'annual');
    return l === null ? null : Math.max(MIN_ANNUAL, l);
};

/* Each row's range is bounded by its own band's rate: the smallest roll that falls
 * in the band, and the largest. Using the previous band's ceiling price as the lower
 * bound instead would overstate every row, and on the last band it inverts — ₹4,68,000
 * down to ₹4,50,000 — because the rate step is steeper than the 200 extra students. */
export const SIZE_BANDS: SizeBand[] = BAND_CEILINGS.map((max, i) => ({
    label: i === 0 ? `Up to ${inr(max)} students` : `${inr(BAND_CEILINGS[i - 1] + 1)} – ${inr(max)}`,
    max,
    from: annualFor(i === 0 ? 1 : BAND_CEILINGS[i - 1] + 1) ?? MIN_ANNUAL,
}));

/** A concrete mid-table roll used in pricing copy, so the worked example in prose
 *  cannot drift away from the band table beside it. */
export const EXAMPLE_ROLL = 600;

/** Above the last ceiling we quote on the actual setup rather than a table row. */
export const LARGE_SCHOOL_FROM = CONTACT_SALES_ABOVE;

/**
 * How a school can actually run EduAnant. Kept here beside HOSTING_ANNUAL because
 * the choice is as much a cost decision as a technical one.
 *
 * The site used to say "self-hosted, no internet dependency" flatly, which sold one
 * mode and quietly denied the other two. It is one product in all three cases — the
 * same build, the same 16 modules — so the honest pitch is that the school picks where
 * it lives, not that it only lives in one place.
 */
export interface DeploymentMode {
    key: 'single' | 'network' | 'cloud';
    name: string;
    blurb: string;
    /** What the school needs to provide. */
    needs: string;
    /** The honest limit of this mode, stated plainly rather than buried. */
    limit: string;
    /** Annual cost to us for the hosting itself, before the licence. */
    cost: number;
    bestFor: string;
}

export const DEPLOYMENT_MODES: DeploymentMode[] = [
    {
        key: 'single',
        name: 'One computer',
        blurb:
            'Installed on a single office PC and used from that machine. No internet, no network setup, nothing else to buy.',
        needs: 'A PC in the office',
        limit: 'One person works in it at a time, at that desk',
        cost: 0,
        bestFor: 'A small school, or a first term before widening it out',
    },
    {
        key: 'network',
        name: 'Your school network',
        blurb:
            'Installed on one PC or a small server; everyone on the school Wi-Fi or cable opens it in a browser at the same time — front desk, staffroom, accounts, principal.',
        needs: 'One PC to host it, and the Wi-Fi you already have',
        limit: 'Reachable on campus; parents off-site need the cloud option',
        cost: 0,
        bestFor: 'Most schools — full use with no internet bill and no cloud fee',
    },
    {
        key: 'cloud',
        name: 'Hosted for you',
        blurb:
            'We run it on a server we maintain, with backups, updates and a web address of your own. Staff, parents and the Android app reach it from anywhere.',
        needs: 'Nothing — we set it up',
        limit: 'Needs a working internet line at school, like any cloud system',
        cost: HOSTING_ANNUAL,
        bestFor: 'Several branches, or parents who should see it from home',
    },
];
