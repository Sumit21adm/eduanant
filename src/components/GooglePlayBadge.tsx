/**
 * Official-style "Get it on Google Play" badge, drawn inline as SVG so it costs
 * zero network requests and stays crisp on any screen (important on the weak
 * connections our schools browse from).
 *
 * If you later need the pixel-exact Google artwork for store-listing compliance,
 * drop the PNG in /public and swap the <svg> below for an <img> — the wrapper
 * <a>, sizing and hover state can stay exactly as they are.
 */

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cloud.eduanant.app';

export default function GooglePlayBadge({ className = '' }: { className?: string }) {
    return (
        <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get the EduAnant parent & teacher app on Google Play"
            className={`inline-flex items-center gap-3 rounded-xl bg-[#0F172A] px-4 py-2.5 border border-white/15 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/30 ${className}`}
        >
            <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" aria-hidden focusable="false">
                <defs>
                    <linearGradient id="gp-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00A0FF" />
                        <stop offset="100%" stopColor="#00E3FF" />
                    </linearGradient>
                    <linearGradient id="gp-amber" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#FFE000" />
                        <stop offset="100%" stopColor="#FF9C00" />
                    </linearGradient>
                    <linearGradient id="gp-red" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FF3A44" />
                        <stop offset="100%" stopColor="#C31162" />
                    </linearGradient>
                    <linearGradient id="gp-green" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#32A071" />
                        <stop offset="100%" stopColor="#00E676" />
                    </linearGradient>
                </defs>
                <path d="M.5 1.6C.19 1.93 0 2.43 0 3.08v17.84c0 .65.19 1.15.5 1.48l.06.06 10-10v-.24l-10-10L.5 1.6z" fill="url(#gp-blue)" />
                <path d="M13.9 15.75l-3.34-3.34v-.24l3.34-3.34.08.05 3.95 2.25c1.13.64 1.13 1.69 0 2.33l-3.95 2.24-.08.05z" fill="url(#gp-amber)" />
                <path d="M13.98 15.7l-3.42-3.42L.5 22.34c.37.4.99.44 1.68.06l11.8-6.7z" fill="url(#gp-red)" />
                <path d="M13.98 8.86L2.18 2.16C1.49 1.78.87 1.83.5 2.22l10.06 10.06 3.42-3.42z" fill="url(#gp-green)" />
            </svg>
            <span className="flex flex-col items-start leading-none text-left">
                <span className="text-[9px] uppercase tracking-[0.14em] text-white/70 font-medium">Get it on</span>
                <span className="text-[15px] font-bold text-white tracking-tight mt-0.5">Google Play</span>
            </span>
        </a>
    );
}
