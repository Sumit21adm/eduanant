/**
 * Build identity for THIS WEBSITE, injected by Vite at build time.
 *
 * Two different version numbers exist in this project and they must never be
 * confused on screen:
 *
 *   APP_VERSION     — this marketing site. Starts at v1.0.0, bumped by tagging
 *                     this repo. Of interest to us, not to a school director.
 *   PRODUCT_VERSION — EduAnant, the school management system being sold here.
 *                     Currently 1.4.0. This is the number that appears in copy,
 *                     structured data and llms.txt.
 *
 * Anything user-facing that shows APP_VERSION must label it, or a visitor reads
 * "v1.0.0" as the product and a mature 16-module system looks like a first
 * release. See the footer for how it is presented.
 *
 * On a tag push the version comes from the tag itself, so what the footer shows
 * is exactly what was released — it cannot drift from the deployed artefact the
 * way a hand-edited constant would.
 */
declare const __APP_VERSION__: string;
declare const __APP_COMMIT__: string;
declare const __APP_BUILT_AT__: string;

export const APP_VERSION = __APP_VERSION__;
export const APP_COMMIT = __APP_COMMIT__;
export const APP_BUILT_AT = __APP_BUILT_AT__;

/** The released version of the EduAnant product this site sells — not the site. */
export const PRODUCT_VERSION = '1.4.0';

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
