import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Back to top — a round button whose rim fills as the page is read.
 *
 * Every page here is long: the features page alone is sixteen module cards, and
 * on a phone the way back to the nav is a lot of thumb. The ring doubles as a
 * progress gauge, so the button says how far down you are as well as offering
 * the way up.
 *
 * Two decisions worth knowing about:
 *
 *  - The ring is driven through a ref, not state. Progress changes on every
 *    scroll frame, and re-rendering a React component sixty times a second to
 *    move one SVG attribute is exactly the kind of cost that makes a page feel
 *    heavy on the low-end Android phones most of our visitors hold. State only
 *    carries `visible`, which flips twice per visit.
 *  - Nothing is rendered until it has something to do. At the top of the page
 *    there is no button, which also keeps it out of the prerendered HTML that
 *    crawlers read.
 */

/** Roughly a screen's worth — before that, the top of the page is still in view. */
const SHOW_AFTER = 400;

const SIZE = 48;
const STROKE = 3.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** 0 at the top of the page, 1 at the very bottom. */
const readProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
};

const paint = (ring: SVGCircleElement | null) =>
    ring?.style.setProperty('stroke-dashoffset', String(CIRCUMFERENCE * (1 - readProgress())));

export default function BackToTop() {
    const [visible, setVisible] = useState(false);
    const ringRef = useRef<SVGCircleElement | null>(null);
    const frame = useRef(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const read = () => {
            frame.current = 0;
            paint(ringRef.current);
            setVisible(window.scrollY > SHOW_AFTER);
        };
        // One read per painted frame however many scroll events arrive.
        const schedule = () => { if (!frame.current) frame.current = requestAnimationFrame(read); };

        read();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        // The page grows as images and lazy sections arrive, and changes height on
        // every route; either moves "how far down" without a scroll event.
        const observer = new ResizeObserver(schedule);
        observer.observe(document.body);

        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            observer.disconnect();
            if (frame.current) cancelAnimationFrame(frame.current);
        };
    }, []);

    // The button unmounts when hidden, and a fresh ring starts empty — so it is
    // painted the moment it mounts rather than waiting for the next scroll event.
    const attachRing = (el: SVGCircleElement | null) => {
        ringRef.current = el;
        paint(el);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    aria-label="Back to top"
                    // 'instant', not 'auto': index.css sets scroll-behavior: smooth on <html>, and
                    // 'auto' means "whatever the CSS says" — so a visitor who has asked their
                    // device for reduced motion would still be glided up the page.
                    onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 12 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                    // z-40 sits under the header (50) and the mobile menu (60). The bottom
                    // offset clears the iOS home indicator, which would otherwise sit over it.
                    className="group fixed z-40 right-4 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6
                        w-12 h-12 grid place-items-center rounded-full print:hidden
                        bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md
                        border border-slate-200/80 dark:border-white/10
                        shadow-lg shadow-slate-900/10 dark:shadow-black/40
                        transition-transform duration-200 hover:-translate-y-0.5
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b6d5]
                        focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1120]">
                    <svg className="absolute inset-0 -rotate-90 pointer-events-none" width={SIZE} height={SIZE}
                        viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
                        <defs>
                            <linearGradient id="back-to-top-ring" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#F59E0B" />
                                <stop offset="1" stopColor="#EA580C" />
                            </linearGradient>
                        </defs>
                        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE}
                            className="stroke-slate-200 dark:stroke-white/10" />
                        <circle ref={attachRing} cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE}
                            stroke="url(#back-to-top-ring)" strokeLinecap="round"
                            strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE} />
                    </svg>
                    <ArrowUp className="relative w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
                        style={{ color: 'var(--accent-text)' }} strokeWidth={2} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
