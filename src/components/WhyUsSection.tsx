import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Server, Globe2, WifiOff, Languages, IndianRupee, ShieldCheck, Headphones, Zap, ArrowRight,
    UserPlus, CalendarCheck, School, Landmark, Building2 } from 'lucide-react';

/* Live proof that the whole interface speaks Hindi. Worth more in a meeting
   than any sentence claiming it does — the director presses it themselves. */
const UI_STRINGS = [
    { en: 'Student Admission', hi: 'छात्र प्रवेश',    value: '1,250',   icon: UserPlus },
    { en: 'Fee Collection',    hi: 'शुल्क संग्रह',      value: '₹64,500', icon: IndianRupee },
    { en: 'Daily Attendance',  hi: 'दैनिक उपस्थिति',  value: '94.2%',   icon: CalendarCheck },
];

function LanguageDemo() {
    const [hindi, setHindi] = useState(false);

    return (
        <div className="relative z-10 w-full sm:w-[15.5rem] shrink-0">
            {/* Segmented toggle */}
            <div role="group" aria-label="Interface language"
                className="inline-flex p-1 mb-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                {[{ k: false, l: 'English' }, { k: true, l: 'हिंदी' }].map(o => (
                    <button key={o.l} type="button" onClick={() => setHindi(o.k)}
                        aria-pressed={hindi === o.k}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${hindi === o.k
                            ? 'bg-[#00b6d5] text-[#0F172A] shadow-sm'
                            : 'text-text-secondary hover:text-[var(--brand-cyan-deep)]'}`}>
                        {o.l}
                    </button>
                ))}
            </div>

            {/* Dummy dashboard card that actually switches language */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141B2D] shadow-sm p-3 space-y-2">
                {UI_STRINGS.map(row => (
                    <div key={row.en} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                            <span aria-hidden className="w-6 h-6 shrink-0 rounded-md bg-[#00b6d5]/12 text-[var(--brand-cyan-deep)] flex items-center justify-center">
                                <row.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                            </span>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span key={hindi ? row.hi : row.en}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.18 }}
                                    className="text-[11px] font-semibold text-text-primary truncate">
                                    {hindi ? row.hi : row.en}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <span className="text-[11px] font-bold tabular-nums text-text-secondary shrink-0">{row.value}</span>
                    </div>
                ))}
            </div>
            <p className="mt-2 text-[10px] text-text-secondary">Try it — the real app switches the same way.</p>
        </div>
    );
}

const PILLARS = [
    {
        icon: Server,
        title: 'Runs On Your Own Server',
        subtitle: 'Your data, your control',
        body: 'No cloud subscription required. EduAnant installs on a local PC or VPS. Your student data never leaves your premises, which is the simplest answer to almost every question a parent or board will ask about where it is kept.',
        tag: 'Self-Hosted',
        variant: 'feature',
        span: 'sm:col-span-2 lg:col-span-4 lg:row-span-2',
    },
    {
        icon: WifiOff,
        title: 'No Internet Dependency',
        subtitle: 'Works on your school Wi-Fi',
        body: 'Staff access EduAnant over the school network — no external broadband needed. Broadband down outside? Doesn\'t matter.',
        tag: 'LAN-Ready',
        variant: 'accent',
        span: 'lg:col-span-2',
    },
    {
        icon: IndianRupee,
        title: 'Built for Indian Finance',
        subtitle: 'UPI · Cheque · Cash · Bank Transfer',
        body: 'Demand bills in ₹, split payments, advance adjustments, session carry-forward and instant PDF receipts.',
        tag: '₹ Native',
        variant: 'plain',
        span: 'lg:col-span-2',
    },
    {
        icon: Languages,
        title: 'Hindi + English Interface',
        subtitle: 'Comfortable for every staff member',
        body: 'Switch the entire interface in one click — no staff member left struggling with English-only software.',
        tag: 'हिंदी & English',
        variant: 'demo',
        span: 'sm:col-span-2 lg:col-span-4',
    },
    {
        icon: ShieldCheck,
        title: 'CBSE / ICSE / State Board',
        subtitle: 'Flexible academic structure',
        body: 'Configure any board\'s class structure, April–March session, subject mapping and exam patterns.',
        tag: 'Board Agnostic',
        variant: 'plain',
        span: 'lg:col-span-2',
    },
    {
        icon: Headphones,
        title: 'Onboarding & Support Included',
        subtitle: 'We set it up for you — you don\'t need an IT department',
        body: 'Our team handles installation, migration from your old Excel files, and staff training on site. We are your IT team at launch.',
        tag: 'White-Glove Setup',
        variant: 'band',
        span: 'sm:col-span-2 lg:col-span-6',
    },
];

const SCHOOL_SIZES = [
    { label: 'Essential', size: 'Up to 300 Students', icon: School, suitable: true, points: ['All modules included', 'Teacher & Parent portals + admin console', 'Runs on basic PC/laptop', 'Easy setup — we handle it'] },
    { label: 'Standard', size: '301 – 800 Students', icon: Landmark, suitable: true, highlight: true, points: ['Everything in Essential', 'Multi-staff & role-based access', 'Transport & HR module', 'On-site staff training'] },
    { label: 'Professional', size: '801 – 1,500 Students', icon: Building2, suitable: true, points: ['Everything in Standard', 'Custom roles & granular permissions', 'Dedicated account manager', 'Priority SLA support'] },
];

export default function WhyUsSection() {
    return (
        <section id="why-us" className="py-24 relative overflow-x-clip">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
                    style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[120px] opacity-8"
                    style={{ background: 'radial-gradient(circle, #1E1B4B, transparent)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                        <Globe2 className="w-3.5 h-3.5" /> Made for India
                    </motion.div>
                    <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-5 leading-tight">
                        Not adapted from foreign software.<br />
                        <span className="brand-text-gradient">Built ground-up for Indian schools.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Every feature, every workflow, every design decision was made keeping Indian school operations in mind — because Indian schools have unique needs that foreign software never addresses.
                    </p>
                </motion.div>

                {/* Pillars — bento grid: one anchor tile, four uniform tiles, one closing band */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4 md:gap-5 mb-20">
                    {PILLARS.map((p, i) => {
                        const Icon = p.icon;
                        const isFeature = p.variant === 'feature';
                        const isBand = p.variant === 'band';
                        const isAccent = p.variant === 'accent';
                        const isDemo = p.variant === 'demo';

                        // One card shape, three skins — navy anchor, amber accent, plain white
                        const skin = isFeature
                            ? 'bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] border-white/10 text-white shadow-xl shadow-indigo-950/20'
                            : isAccent
                                ? 'bg-amber-50 dark:bg-amber-500/[0.07] border-amber-300/60 dark:border-amber-500/25'
                                : 'bg-white dark:bg-white/[0.03] border-slate-200/70 dark:border-white/10';

                        return (
                            <motion.div key={p.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-8% 0px' }}
                                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className={`group relative rounded-2xl border overflow-hidden shadow-sm
                                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                                    ${skin} ${p.span}
                                    ${isFeature ? 'p-8 flex flex-col justify-between' : (isBand || isDemo) ? 'p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6' : 'p-6'}`}>

                                {/* Amber wash that warms the card on hover */}
                                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: isFeature ? 'rgba(245,158,11,0.35)' : 'rgba(245,158,11,0.18)' }} />

                                <div className={(isBand || isDemo) ? 'flex items-start gap-5 flex-1 min-w-0' : ''}>
                                    <div className={`shrink-0 rounded-2xl flex items-center justify-center shadow-lg
                                        ${isFeature ? 'w-14 h-14 mb-6 bg-white/10 ring-1 ring-white/20' : 'w-11 h-11 mb-5 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] ring-1 ring-black/5 shadow-amber-500/25'}
                                        ${(isBand || isDemo) ? 'mb-0' : ''}`}>
                                        <Icon className={isFeature ? 'w-6 h-6 text-amber-400' : 'w-5 h-5 text-white'} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                            <h3 className={`font-display font-extrabold tracking-tight
                                                ${isFeature ? 'text-2xl md:text-3xl text-white' : 'text-base text-text-primary'}`}>
                                                {p.title}
                                            </h3>
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border
                                                ${isFeature
                                                    ? 'border-amber-400/40 bg-amber-400/15 text-amber-300'
                                                    : 'border-amber-500/30 bg-amber-500/10 text-[var(--accent-text)]'}`}>
                                                {p.tag}
                                            </span>
                                        </div>
                                        <p className={`text-xs font-semibold mb-3 ${isFeature ? 'text-indigo-200' : 'text-text-secondary'}`}>
                                            {p.subtitle}
                                        </p>
                                        <p className={`text-sm leading-relaxed ${isFeature ? 'text-slate-300 max-w-lg' : 'text-text-secondary'}`}>
                                            {p.body}
                                        </p>
                                    </div>
                                </div>

                                {isFeature && (
                                    <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                                        {['Your campus, your server', 'No monthly cloud bill', 'Nightly local backups'].map(chip => (
                                            <span key={chip} className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/10 text-slate-200 border border-white/15">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {isDemo && <LanguageDemo />}

                                {isBand && (
                                    <a href="#contact"
                                        className="relative z-10 shrink-0 inline-flex items-center gap-2 self-start sm:self-auto btn-primary text-sm px-6 py-3 rounded-xl">
                                        Talk to us <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* School size cards */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-3">Scales with you</p>
                    <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white">
                        Works for <span className="brand-text-gradient">every school size</span>
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {SCHOOL_SIZES.map((s, i) => (
                        <motion.div key={s.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-3xl p-7 border transition-all duration-500 ${s.highlight
                                ? 'border-[#F59E0B]/40 shadow-[0_0_40px_rgba(245,158,11,0.15)]'
                                : 'border-gray-200/50 dark:border-white/10'
                                } bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm`}>
                            {s.highlight && (
                                <>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                                        style={{ background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)' }} />
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="text-[10px] font-black px-3 py-1 rounded-full text-white"
                                            style={{ background: 'linear-gradient(90deg, #1E1B4B, #F59E0B)' }}>Most Popular</span>
                                    </div>
                                </>
                            )}
                            <div className={`w-11 h-11 rounded-2xl mb-4 flex items-center justify-center shadow-lg ${s.highlight ? 'bg-gradient-to-br from-[#F59E0B] to-[#EA580C] ring-1 ring-black/5 shadow-amber-500/25' : 'bg-gradient-to-br from-[#1E1B4B] to-[#312E81] dark:from-[#312E81] dark:to-[#4F46E5] ring-1 ring-white/10'}`}>
                                <s.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                            </div>
                            <h4 className="font-black text-text-primary text-lg mb-1">{s.label}</h4>
                            <p className="text-sm font-bold mb-5" style={{ color: 'var(--accent-text)' }}>{s.size}</p>
                            <ul className="space-y-2">
                                {s.points.map(pt => (
                                    <li key={pt} className="flex items-center gap-2 text-sm text-text-secondary">
                                        <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-text)' }} />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-16 text-center">
                    <a href="#contact">
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(245,158,11,0.3)' }} whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2.5 btn-primary text-base px-8 py-4 rounded-xl font-bold">
                            Talk to our team — free consultation
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </a>
                    <p className="mt-3 text-sm text-text-secondary">No sales pressure · Response within 24 hours · Free demo for your school</p>
                </motion.div>
            </div>
        </section>
    );
}
