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
 * `monthly` is the list rate — what a school pays billed month to month. `annual` is
 * that less 20%, the discount for paying for the year up front. The ladder is the
 * monthly one (₹50 down to ₹30); the annual column is derived from it, so changing a
 * monthly rate means recomputing its partner.
 *
 * Band rates carry a known cost: because the rate steps down at a boundary, a school
 * just over one pays less in total than a school just under it (251 students costs
 * less than 250). Charging marginally keeps totals rising but cannot reach the low
 * rates this table publishes, and the table was the priority.
 *
 * The table stops at 1,250. An earlier version ran to 1,500 and inverted badly, the
 * smaller school paying ₹77,700 more. Stopping here keeps every step at +250 and
 * leaves the floor below as something sales quotes rather than a rate we must honour.
 */
export const RATE_BANDS = [
    { upTo: 250, monthly: 50, annual: 40 },
    { upTo: 500, monthly: 45, annual: 36 },
    { upTo: 750, monthly: 40, annual: 32 },
    { upTo: 1000, monthly: 35, annual: 28 },
    { upTo: 1250, monthly: 30, annual: 24 },
] as const;

/** Above the last band we quote rather than publish. */
export const CONTACT_SALES_ABOVE = RATE_BANDS[RATE_BANDS.length - 1].upTo;

/** Entry rate — what a small school pays, and the headline figure. */
export const RATE_ANNUAL = RATE_BANDS[0].annual;
export const RATE_MONTHLY = RATE_BANDS[0].monthly;

/**
 * The lowest annual rate sales may quote, for the "from" figure on the contact row.
 * Below the last published band (₹24 annual) rather than derived from it: this is
 * room to negotiate on a large school, not a rate in the table. Equivalent to ₹25
 * a month at list, which is where the number came from.
 */
export const RATE_FLOOR_ANNUAL = 20;

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

/** Optional managed hosting, per year, if the school would rather not run a box. */
export const HOSTING_ANNUAL = 18_000;

/** List value of onboarding — migration, install, two days of on-site training. */
export const ONBOARDING_VALUE = 15_000;

/** GST applied on top of every figure quoted on the site. */
export const GST_RATE = 0.18;

/** Founding cohort: how many schools, and the first-year discount they get. */
export const FOUNDING_COUNT = 10;
export const FOUNDING_DISCOUNT = 0.5;

/** What a monthly payer gives up by not paying annually, as a percentage. */
export const ANNUAL_SAVING_PCT = Math.round((1 - RATE_ANNUAL / RATE_MONTHLY) * 100);

/** 36000 -> "36,000" in Indian digit grouping. */
export const inr = (n: number) => n.toLocaleString('en-IN');

/** "₹20" — the headline rate, for prose and metadata. */
export const annualRateLabel = `₹${RATE_ANNUAL}`;
export const monthlyRateLabel = `₹${RATE_MONTHLY}`;

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
    /** Licence for a school at the top of this band — the "up to" figure. */
    upToAnnual: number;
}

const BAND_CEILINGS = RATE_BANDS.map(b => b.upTo);

/** Annual licence for a roll of n students, before GST. Null above the published
 *  bands, where sales quotes instead — callers must handle that rather than
 *  substituting a number, which is how the calculator once showed a 1,370-student
 *  school the old annual minimum. */
export const annualFor = (students: number) => licenceFor(students, 'annual');

/* The licence column shows the ceiling for each band — what a school at the top of
 * it pays. Showing a range needs a lower bound, and without an annual minimum the
 * first band's would be one student at Rs 600, which tells a director nothing. The
 * rate beside it is what they multiply by their own roll. */
export const SIZE_BANDS: SizeBand[] = BAND_CEILINGS.map((max, i) => ({
    label: i === 0 ? `Up to ${inr(max)} students` : `${inr(BAND_CEILINGS[i - 1] + 1)} – ${inr(max)}`,
    max,
    upToAnnual: annualFor(max) ?? 0,
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

/* ── The quote ────────────────────────────────────────────────────────────────
 * Every figure the calculator prints comes from here. It used to be computed
 * inline in the component, where nothing could test it, and it was wrong twice:
 * a roll above the bands fell through to the old annual minimum, and the
 * per-student line divided the pre-GST licence while the total beside it was
 * post-GST. scripts/verify-pricing.mjs exercises this function across every
 * slider position and option combination on each build.
 */

export const ONBOARDING_LIST = ONBOARDING_VALUE;

export interface QuoteInput {
    students: number;
    cycle: 'annual' | 'monthly';
    founding: boolean;
    managedHosting: boolean;
}

export interface Quote {
    students: number;
    cycle: 'annual' | 'monthly';
    /** Per student per month, for this roll and cycle. */
    rate: number;
    /** A full year at list, before any discount. */
    listLicence: number;
    /** After the founding discount, if taken. */
    licence: number;
    foundingDiscount: number;
    onboarding: number;
    hosting: number;
    subtotal: number;
    gst: number;
    firstYear: number;
    /** All-in, per student per month — the same total divided down, never the
     *  pre-GST figure, so the two lines cannot disagree. */
    perStudentMonth: number;
}

/** Null above the published bands: there is no list price there, sales quotes it.
 *  Callers must render that case rather than substituting a number. */
export function quoteFor({ students, cycle, founding, managedHosting }: QuoteInput): Quote | null {
    const band = bandFor(students);
    if (!band) return null;

    const rate = band[cycle];
    const listLicence = students * rate * 12;
    const licence = founding ? Math.round(listLicence / 2) : listLicence;
    // Included for every school, not only founding ones. Charging it unless
    // `founding` contradicted the comparison table, the brochure, llms.txt and the
    // plan card, all of which said setup and training were included — so a school
    // outside the founding ten read "free" and then met a Rs 15,000 line on its own
    // estimate. ONBOARDING_VALUE survives as the list value the copy quotes.
    const onboarding = 0;
    const hosting = managedHosting ? HOSTING_ANNUAL : 0;
    const subtotal = licence + onboarding + hosting;
    const gst = Math.round(subtotal * GST_RATE);
    const firstYear = subtotal + gst;

    return {
        students, cycle, rate, listLicence, licence,
        foundingDiscount: listLicence - licence,
        onboarding, hosting, subtotal, gst, firstYear,
        perStudentMonth: firstYear / 12 / students,
    };
}

/* ── Slider geometry ──────────────────────────────────────────────────────────
 * 100 students to "5,000 or more", but not linearly: most schools sit inside the
 * published bands, and a straight track would spend three quarters of its length
 * on sizes that all show the same quote panel. The first 70% of the travel covers
 * 100 up to the last band in steps of 10; the rest covers everything above it in
 * steps of 50.
 */
export const SLIDER_MIN = 100;
export const SLIDER_MAX = 5000;
export const SLIDER_TICKS = 1000;
const SLIDER_SPLIT = Math.round(SLIDER_TICKS * 0.7);

export function studentsAtTick(tick: number): number {
    if (tick <= SLIDER_SPLIT) {
        const t = tick / SLIDER_SPLIT;
        return Math.round((SLIDER_MIN + t * (CONTACT_SALES_ABOVE - SLIDER_MIN)) / 10) * 10;
    }
    const t = (tick - SLIDER_SPLIT) / (SLIDER_TICKS - SLIDER_SPLIT);
    return Math.round((CONTACT_SALES_ABOVE + t * (SLIDER_MAX - CONTACT_SALES_ABOVE)) / 50) * 50;
}

export function tickForStudents(students: number): number {
    if (students <= CONTACT_SALES_ABOVE) {
        return Math.round(((students - SLIDER_MIN) / (CONTACT_SALES_ABOVE - SLIDER_MIN)) * SLIDER_SPLIT);
    }
    const t = (students - CONTACT_SALES_ABOVE) / (SLIDER_MAX - CONTACT_SALES_ABOVE);
    return Math.round(SLIDER_SPLIT + t * (SLIDER_TICKS - SLIDER_SPLIT));
}
