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

/** Per student per month when the year is paid up front. */
export const RATE_ANNUAL = 20;

/** Per student per month when billed monthly. */
export const RATE_MONTHLY = 25;

/** Floor for an annual contract, so a very small school is still viable to serve. */
export const MIN_ANNUAL = 36_000;

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
