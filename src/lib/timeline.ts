/**
 * Facts that move with the calendar.
 *
 * Anything derived from a date is computed here rather than typed into copy, so
 * "5 months live" cannot quietly become wrong. The only things to maintain are
 * the two constants below and the changelog itself.
 */

/** First production deployment: S.D.V. Public School, Patna. */
export const LIVE_SINCE = new Date('2026-04-01T00:00:00Z');

/** Written out where a sentence reads better than a date. */
export const LIVE_SINCE_LABEL = 'April 2026';

/** Whole months between `from` and now, floored, never below 1. */
export function monthsSince(from: Date = LIVE_SINCE, now: Date = new Date()): number {
    const months =
        (now.getFullYear() - from.getFullYear()) * 12 +
        (now.getMonth() - from.getMonth()) -
        (now.getDate() < from.getDate() ? 1 : 0);
    return Math.max(1, months);
}

/** "5" until a year has passed, then "1 yr 2" style stays readable in a stat tile. */
export function monthsLiveLabel(now: Date = new Date()): string {
    const m = monthsSince(LIVE_SINCE, now);
    if (m < 12) return String(m);
    const years = Math.floor(m / 12);
    const rest = m % 12;
    return rest ? `${years}y ${rest}m` : `${years}y`;
}

export function monthsLiveUnit(now: Date = new Date()): string {
    return monthsSince(LIVE_SINCE, now) < 12 ? 'Months live' : 'Live for';
}

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve'] as const;

/** "six" for 6, "17" past twelve — house style is words up to twelve. */
export function spell(n: number): string {
    return n <= 12 ? WORDS[n] : String(n);
}
