/**
 * Build identity for THIS WEBSITE, injected by Vite at build time.
 *
 * Two different version numbers exist in this project and they must never be
 * confused on screen:
 *
 *   APP_VERSION     — this marketing site. Numbered by the release workflow
 *                     (scripts/next-version.mjs) and shown as "dev" on a local
 *                     build. Of interest to us, not to a school director.
 *   PRODUCT_VERSION — EduAnant, the school management system being sold here.
 *                     This is the number that appears in copy, structured data,
 *                     llms.txt and every printed piece in docs/print.
 *
 * Anything user-facing that shows APP_VERSION must label it, or a visitor reads
 * "v1.0.0" as the product and a mature 16-module system looks like a first
 * release. See the footer for how it is presented.
 *
 * Every release is tagged with the version it stamps, so what the footer shows is
 * exactly what was released — it cannot drift from the deployed artefact the way a
 * hand-edited constant (or package.json, which nothing bumps) would.
 */
declare const __APP_VERSION__: string;
declare const __APP_COMMIT__: string;
declare const __APP_BUILT_AT__: string;

export const APP_VERSION = __APP_VERSION__;
export const APP_COMMIT = __APP_COMMIT__;
export const APP_BUILT_AT = __APP_BUILT_AT__;

/** The released version of the EduAnant product this site sells — not the site.
 *  Must match what is actually in production at a paying school. The print kit
 *  reads this too, so a stale value here puts a wrong release number on paper. */
export const PRODUCT_VERSION = '1.5.4';

/** "8 Sep 2026" — the build date, for the footer tooltip. */
export function buildDateLabel(): string {
    try {
        return new Date(APP_BUILT_AT).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
        });
    } catch {
        return APP_BUILT_AT;
    }
}
