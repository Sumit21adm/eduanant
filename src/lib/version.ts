/**
 * Build identity, injected by Vite at build time (see vite.config.ts).
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
