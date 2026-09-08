/**
 * Small text helpers for turning data into prose.
 *
 * Counts that describe an array should be derived from that array, never typed
 * out: a hand-written "Three things sit outside the licence" survives the
 * removal of the third and quietly starts lying.
 */

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve'] as const;

/** House style: words up to twelve, digits above. */
export function spell(n: number): string {
    return n >= 0 && n <= 12 ? WORDS[n] : String(n);
}

export function capitalise(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/** `countOf(2, 'thing')` -> "two things"; handles the singular for you. */
export function countOf(n: number, noun: string, plural = `${noun}s`): string {
    return `${spell(n)} ${n === 1 ? noun : plural}`;
}
