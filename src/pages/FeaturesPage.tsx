import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Layers, Check, ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MODULES } from '../data/modules';
import Seo from '../lib/seo';
import { PAGE_SEO, softwareSchema } from '../lib/seoConfig';


const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Bullets shown before the reader asks for the rest. */
const PREVIEW_COUNT = 4;

export default function FeaturesPage() {
    // One card open at a time — sixteen expanded cards is the wall we just removed.
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <>
            <Seo {...PAGE_SEO.features} schema={[softwareSchema]} crumbs={[{ name: 'Features', path: '/features' }]} />
            <div className="pt-14 pb-24 relative">
                {/* Page header */}
                <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                            style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                            <Layers className="w-3.5 h-3.5" /> 16 Production-Ready Modules
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                            Everything your school<br />
                            <span className="brand-text-gradient">will ever need.</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            Every module below is live in production as of version 1.4.0 — tested, in daily use, and included. This is not a roadmap; it's what you get on Day 1.
                        </p>
                    </motion.div>

                    {/* Quick summary */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="mt-10 flex flex-wrap gap-3 justify-center">
                        {['16 Modules', '2 Portals + Android App', '100+ Screens', '96 Permission Keys', 'Live in Production', 'v1.4.0 — Sept 2026'].map(tag => (
                            <span key={tag} className="text-xs font-black px-4 py-2 rounded-full border"
                                style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.06)', color: 'var(--accent-text)' }}>
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* ── The 16 modules, drifting past ──────────────────────────────────
                    Two tracks in opposite directions. Each renders the list twice so a
                    -50% translate loops seamlessly; the second copy is aria-hidden so a
                    screen reader hears each module once. Pauses on hover, and under
                    reduced-motion it becomes a plain scrollable row. */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}
                    className="mb-16 space-y-3">
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

                {/* Module grid */}
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={containerVariants} initial="hidden" animate="visible">
                        {MODULES.map((mod) => {
                            const Icon = mod.icon;
                            const open = openId === mod.id;
                            return (
                                <motion.div key={mod.id} variants={cardVariants}
                                    whileHover={{ y: -4 }}
                                    className={`relative rounded-3xl border ${mod.borderColor} ${mod.bgColor} bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden p-7 transition-all duration-500 hover:shadow-2xl group`}>

                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg shrink-0`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[9px] font-black tracking-widest uppercase text-text-secondary opacity-60">Module {mod.id}</span>
                                                <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-emerald-600 bg-emerald-500/10 border border-emerald-500/20">● LIVE</span>
                                            </div>
                                            <h2 className="text-xl font-black text-text-primary">{mod.title}</h2>
                                            <p className="text-sm font-semibold text-text-secondary">{mod.tagline}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-text-secondary leading-relaxed mb-5">{mod.description}</p>

                                    {/* Feature list — preview first, full list on request */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {mod.features.slice(0, PREVIEW_COUNT).map(f => (
                                            <div key={f} className="flex items-start gap-2 text-xs text-text-secondary">
                                                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }} />
                                                {f}
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {open && mod.features.length > PREVIEW_COUNT && (
                                            <motion.div
                                                key="rest"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-2">
                                                    {mod.features.slice(PREVIEW_COUNT).map(f => (
                                                        <div key={f} className="flex items-start gap-2 text-xs text-text-secondary">
                                                            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }} />
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {mod.features.length > PREVIEW_COUNT && (
                                        <button type="button"
                                            onClick={() => setOpenId(open ? null : mod.id)}
                                            aria-expanded={open}
                                            aria-controls={`mod-${mod.id}-features`}
                                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold
                                                text-[var(--brand-cyan-deep)] dark:text-[#00b6d5]
                                                hover:gap-2.5 transition-all duration-300 rounded-lg
                                                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b6d5] focus-visible:ring-offset-2
                                                focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1120]">
                                            {open ? 'Show less' : `Show all ${mod.features.length} features`}
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mt-16 text-center">
                        <p className="text-text-secondary mb-6 text-lg">Want to see all of this working live for your school?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                                    className="btn-primary px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2">
                                    Book a walkthrough <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                            <Link to="/security">
                                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                                    className="btn-outline px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2">
                                    View Security Architecture <Shield className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
