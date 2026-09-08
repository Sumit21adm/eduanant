import { motion } from 'framer-motion';
import { CHANGELOG, RELEASE_COUNT } from '../data/changelog';
import { LIVE_SINCE_LABEL, spell } from '../lib/timeline';
import { Zap, CheckCircle, Clock, ArrowRight, Package, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../lib/seo';
import { PAGE_SEO } from '../lib/seoConfig';

const HOW_IT_WORKS = [
    {
        step: '01', title: 'We Build & Test the Update',
        desc: 'Every new feature or fix goes through thorough internal testing before it\'s released. Nothing ships to schools until it\'s verified to be stable.',
    },
    {
        step: '02', title: 'An Update is Ready',
        desc: 'When an update is ready, we package it with a clear list of what\'s new, improved, or fixed — and notify the school admin.',
    },
    {
        step: '03', title: 'Your Data is Backed Up Automatically',
        desc: 'Before anything is changed on your system, EduAnant automatically creates a complete backup of all your school data. Your information is never at risk.',
    },
    {
        step: '04', title: 'One Click — You\'re Updated',
        desc: 'The school administrator clicks "Update" from inside the admin panel. The system handles everything — no IT person needed, no manual steps.',
    },
    {
        step: '05', title: 'Back Online in Minutes',
        desc: 'Your school\'s system comes back online with all the latest improvements — and all your data exactly as you left it.',
    },
];


export default function UpdatesPage() {
    return (
        <>
            <Seo {...PAGE_SEO.updates} schema={[]} crumbs={[{ name: 'Updates', path: '/updates' }]} />
            <div className="pt-14 pb-24 relative">
                <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                            style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                            <Zap className="w-3.5 h-3.5" /> Continuous Improvement
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                            Software that keeps<br />
                            <span className="brand-text-gradient">getting better.</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            EduAnant is under active development — 16 modules and {spell(RELEASE_COUNT)} releases since {LIVE_SINCE_LABEL}. Every improvement reaches your school with a single click.
                        </p>
                    </motion.div>

                    {/* Status badges */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-3 justify-center mt-8">
                        {[
                            { label: 'Current Version', value: 'v1.4.0 — September 2026' },
                            { label: 'Status', value: 'Actively Maintained', dot: true },
                            { label: 'Update Process', value: 'One-Click from Admin Panel' },
                            { label: 'Data Safety', value: 'Auto-backup before every update' },
                            { label: 'Update Time', value: 'Under 5 minutes' },
                        ].map(b => (
                            <div key={b.label} className="px-4 py-2 rounded-xl border text-sm"
                                style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>
                                <span className="text-text-secondary text-xs">{b.label}: </span>
                                {'dot' in b && (
                                    <span className="relative inline-flex h-2 w-2 mr-1.5 align-middle">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                )}
                                <span className="font-bold text-text-primary">{b.value}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>


                {/* ── Every release, drifting past ─────────────────────────────────
                    Reads off the same CHANGELOG the history below renders, so the
                    hero can never advertise a release the page does not list. */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-16 space-y-3">
                    {[CHANGELOG.slice(0, 3), CHANGELOG.slice(3)].map((row, r) => (
                        <div key={r} className="marquee-rail">
                            <div className={`marquee-track ${r === 1 ? 'marquee-track--reverse' : ''}`}>
                                {[0, 1].map(copy => (
                                    <div key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1}>
                                        {row.map(c => (
                                            <div key={c.phase}
                                                className="shrink-0 max-w-md rounded-2xl border border-slate-200/70 dark:border-white/10
                                                    bg-white dark:bg-white/[0.03] px-5 py-3.5 shadow-sm">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-display text-sm font-extrabold text-text-primary whitespace-nowrap">{c.phase}</span>
                                                    {c.status === 'Latest' ? (
                                                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-amber-700 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 whitespace-nowrap">
                                                            Latest
                                                        </span>
                                                    ) : (
                                                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
                                                            {c.status}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-text-secondary whitespace-nowrap">{c.date}</span>
                                                </div>
                                                <p className="text-[11px] text-text-secondary leading-snug line-clamp-2">{c.headline}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* How updates work */}
                <div className="container mx-auto px-6 max-w-4xl mb-20">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-2xl font-black text-text-primary text-center mb-12">
                        How Updates Work — Simple & Safe
                    </motion.h2>

                    <div className="relative">
                        <div className="absolute left-6 top-6 bottom-6 w-0.5 hidden md:block"
                            style={{ background: 'linear-gradient(180deg, #1E1B4B, #F59E0B, #FBBF24)' }} />

                        <div className="space-y-4 md:pl-16">
                            {HOW_IT_WORKS.map((step, i) => (
                                <motion.div key={step.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative flex items-start gap-5 p-5 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                                    <div className="absolute -left-[52px] hidden md:flex w-8 h-8 rounded-full items-center justify-center text-white text-[10px] font-black border-2 border-white dark:border-[#0B1120] shadow-md"
                                        style={{ background: `hsl(${200 + i * 8}, 70%, ${30 + i * 4}%)` }}>
                                        {step.step}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-text-primary mb-1">{step.title}</h3>
                                        <p className="text-sm text-text-secondary">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="mt-8 p-5 rounded-2xl border text-center"
                        style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>
                        <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--accent-text)' }} />
                        <p className="font-black text-text-primary mb-1">Average update time: Under 5 minutes</p>
                        <p className="text-sm text-text-secondary">Your school is briefly offline only during the restart — typically under 60 seconds. All data is fully preserved.</p>
                    </motion.div>

                    {/* Trust indicators */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {[
                            { icon: ShieldCheck, label: 'Data is always backed up before any update' },
                            { icon: Package, label: 'Every update is tested before release' },
                            { icon: Zap, label: 'No IT team needed — school admin does it' },
                        ].map(({ icon: Icon, label }) => (
                            <motion.div key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                                <Icon className="w-5 h-5 shrink-0" style={{ color: 'var(--accent-text)' }} />
                                <span className="text-sm font-semibold text-text-secondary">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Changelog */}
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-2xl font-black text-text-primary text-center mb-10">
                        Release History
                    </motion.h2>

                    <div className="space-y-6">
                        {CHANGELOG.map((release, i) => (
                            <motion.div key={release.phase}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-3xl border border-gray-200/50 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/[0.02]">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 px-7 py-5 border-b border-gray-200/50 dark:border-white/10">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                                            <span className="text-xl font-black text-text-primary">{release.phase}</span>
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${i === 0 ? 'text-white' : 'text-text-secondary border border-gray-200/50 dark:border-white/10'}`}
                                                style={i === 0 ? { background: 'linear-gradient(90deg, #D97706, #F59E0B)' } : {}}>
                                                {release.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-secondary font-medium">{release.headline}</p>
                                    </div>
                                    <span className="text-sm text-text-secondary font-medium shrink-0 sm:pt-1">{release.date}</span>
                                </div>
                                <div className="p-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {release.changes.map(c => (
                                        <div key={c} className="flex items-start gap-2 text-sm text-text-secondary">
                                            <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }} />
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="mt-12 text-center">
                        <p className="text-text-secondary mb-4">Want to know what's coming next on our roadmap?</p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.04 }} className="btn-primary px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2">
                                Talk to Our Team <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
