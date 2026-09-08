import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, WifiOff, ArrowRight, Check } from 'lucide-react';
import { MODULES } from '../data/modules';

/** The three things a director weighs: what it does, where it runs, how it's protected. */
const PILLARS = [
    {
        icon: Layers,
        eyebrow: 'What it does',
        title: '16 wired modules',
        body: 'Admissions, fees, attendance, exams, HR, library, transport and the front desk — one system, no per-module upsell.',
        points: ['100+ production screens', '2 portals + Android app', 'Nothing held back for a higher tier'],
        to: '/features',
        cta: 'See all 16 modules',
    },
    {
        icon: WifiOff,
        eyebrow: 'Where it runs',
        title: 'On your own server',
        body: 'Installed inside your school and reached over your own Wi-Fi. Broadband down outside? Your office keeps working.',
        points: ['No monthly cloud bill', 'Hindi & English interface', 'CBSE / ICSE / State Board'],
        to: '/pricing',
        cta: 'See what it costs',
    },
    {
        icon: ShieldCheck,
        eyebrow: 'How it is protected',
        title: 'Secure by design',
        body: 'Every action is logged and cannot be edited — not even by the school admin. Access is granted one key at a time.',
        points: ['96 granular permission keys', 'Immutable audit trail', 'No third-party data sharing'],
        to: '/security',
        cta: 'How we secure it',
    },
];

export default function CapabilitiesSection() {
    return (
        <section className="py-24 relative overflow-x-clip">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-3">The whole picture</p>
                    <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-5 leading-tight">
                        One system.<br />
                        <span className="brand-text-gradient">Everything your school runs on.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Not a suite of separate products stitched together — a single install where the fee counter,
                        the class register and the staff record already know about each other.
                    </p>
                </motion.div>
            </div>

            {/* The 16 modules drifting past — same source of truth as the Features page,
                so this can never advertise a module that page does not list. */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8 }} className="mb-14 space-y-3">
                {[MODULES.slice(0, 8), MODULES.slice(8)].map((row, r) => (
                    <div key={r} className="marquee-rail">
                        <div className={`marquee-track ${r === 1 ? 'marquee-track--reverse' : ''}`}>
                            {[0, 1].map(copy => (
                                <div key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1}>
                                    {row.map(m => {
                                        const MIcon = m.icon;
                                        return (
                                            <div key={m.id}
                                                className="flex items-center gap-2.5 shrink-0 rounded-2xl border border-slate-200/70 dark:border-white/10
                                                    bg-white dark:bg-white/[0.03] px-4 py-3 shadow-sm">
                                                <span className={`w-8 h-8 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                                                    <MIcon className="w-4 h-4 text-white" strokeWidth={1.5} />
                                                </span>
                                                <span className="text-left">
                                                    <span className="block text-[13px] font-bold text-text-primary whitespace-nowrap">{m.title}</span>
                                                    <span className="block text-[10px] text-text-secondary whitespace-nowrap">{m.tagline}</span>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PILLARS.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={p.title}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative rounded-2xl border border-slate-200/70 dark:border-white/10
                                    bg-white dark:bg-white/[0.03] p-7 shadow-sm overflow-hidden
                                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">

                                <div aria-hidden className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-0
                                    group-hover:opacity-100 transition-opacity duration-500 bg-amber-400/20" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-11 h-11 rounded-2xl mb-5 flex items-center justify-center shadow-lg
                                        bg-gradient-to-br from-[#1E1B4B] to-[#312E81] dark:from-[#312E81] dark:to-[#4F46E5] ring-1 ring-white/10">
                                        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                                    </div>

                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--accent-text)] mb-1.5">{p.eyebrow}</p>
                                    <h3 className="font-display text-xl font-extrabold tracking-tight text-text-primary mb-2.5">{p.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed mb-5">{p.body}</p>

                                    <ul className="space-y-2 mb-6">
                                        {p.points.map(pt => (
                                            <li key={pt} className="flex items-start gap-2 text-xs text-text-secondary">
                                                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#00b6d5]" strokeWidth={2} />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to={p.to}
                                        className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold
                                            text-[var(--brand-cyan-deep)] dark:text-[#00b6d5] hover:gap-2.5 transition-all duration-300">
                                        {p.cta}
                                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
