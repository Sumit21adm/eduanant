import { MODULES } from '../data/modules';

/**
 * The module suite drawn as a quiet network behind the hero.
 *
 * Icon-only by design: this is a background, and a chip carrying a full module
 * name competes with the headline for attention and clips at narrow widths.
 * Positions are percentages so the arrangement holds at every size, nodes are
 * kept out of the vertical band the headline occupies, and the whole layer is
 * radially masked so it thins toward the centre.
 *
 * Purely decorative — aria-hidden, pointer-events-none, clipped by its own
 * container, and completely still under prefers-reduced-motion.
 */

/** x/y are percentages of the hero box. `sm` marks the subset kept on phones. */
const NODES = [
    { id: '01', x: 7,  y: 14, sm: true,  d: '0s'   },
    { id: '02', x: 13, y: 40, sm: true,  d: '1.6s' },
    { id: '03', x: 6,  y: 66, sm: false, d: '3.0s' },
    { id: '11', x: 15, y: 88, sm: true,  d: '2.1s' },
    { id: '09', x: 30, y: 6,  sm: false, d: '0.8s' },
    { id: '10', x: 71, y: 5,  sm: false, d: '2.6s' },
    { id: '08', x: 93, y: 15, sm: true,  d: '1.2s' },
    { id: '04', x: 87, y: 41, sm: true,  d: '3.4s' },
    { id: '06', x: 94, y: 67, sm: false, d: '0.4s' },
    { id: '07', x: 84, y: 89, sm: true,  d: '2.9s' },
];

/** A loose mesh between node indices — not every pair. */
const WIRES: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [1, 7],
];

const byId = (id: string) => MODULES.find(m => m.id === id);

export default function HeroConstellation() {
    return (
        <div className="hero-constellation" aria-hidden>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {WIRES.map(([a, b], i) => {
                    const A = NODES[a], B = NODES[b];
                    return (
                        <line key={i}
                            x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                            className={`hero-wire ${A.sm && B.sm ? '' : 'hidden sm:block'} stroke-[#00b6d5]/40 dark:stroke-[#00b6d5]/30`}
                            strokeWidth={1} vectorEffect="non-scaling-stroke"
                            strokeDasharray="3 9" strokeLinecap="round"
                            style={{ animationDelay: `${i * 0.3}s` }} />
                    );
                })}
            </svg>

            {NODES.map(n => {
                const m = byId(n.id);
                if (!m) return null;
                const Icon = m.icon;
                return (
                    <div key={n.id}
                        className={`hero-node ${n.sm ? '' : 'hidden sm:flex'}`}
                        style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: n.d }}
                        title={m.title}>
                        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
