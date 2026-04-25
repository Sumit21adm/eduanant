import { motion } from 'framer-motion';
import { Server, Globe2, WifiOff, Languages, IndianRupee, ShieldCheck, Headphones, Zap, ArrowRight } from 'lucide-react';

const PILLARS = [
    {
        icon: Server,
        title: 'Runs On Your Own Server',
        subtitle: 'Your data, your control',
        body: 'No cloud subscription required. EduAnant installs on a local PC or VPS. Your student data never leaves your premises — fully compliant with Indian data privacy norms.',
        tag: 'Self-Hosted',
        gradient: 'from-brand-navy to-brand-navyMid',
        glow: 'rgba(23,48,90,0.3)',
        border: 'border-[#17305a]/30',
        bg: 'bg-[#17305a]/5',
    },
    {
        icon: WifiOff,
        title: 'Works Without Internet',
        subtitle: 'No broadband? No problem.',
        body: 'Power cuts and slow broadband won\'t disrupt your school. EduAnant syncs when online and queues all actions offline — built for real Indian infrastructure conditions.',
        tag: 'Offline-Ready',
        gradient: 'from-[#0f6187] to-brand-cyan',
        glow: 'rgba(0,182,213,0.2)',
        border: 'border-[#00b6d5]/30',
        bg: 'bg-[#00b6d5]/5',
    },
    {
        icon: Languages,
        title: 'Hindi + English Interface',
        subtitle: 'Comfortable for every staff member',
        body: 'Switch the entire UI between English and Hindi in one click. No more staff struggling with English-only software. Designed for Indian educators from Day 1.',
        tag: 'हिंदी & English',
        gradient: 'from-brand-cyan to-brand-cyanLight',
        glow: 'rgba(99,202,224,0.2)',
        border: 'border-[#63cae0]/30',
        bg: 'bg-[#63cae0]/5',
    },
    {
        icon: IndianRupee,
        title: 'Built for Indian Finance',
        subtitle: 'UPI · Cheque · Cash · Bank Transfer',
        body: 'Demand bills in ₹, split payments, advance adjustments, opening balance carry-forward across sessions, PDF receipts — everything tailored for how Indian schools actually collect fees.',
        tag: '₹ Native',
        gradient: 'from-emerald-600 to-teal-500',
        glow: 'rgba(16,185,129,0.2)',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/5',
    },
    {
        icon: ShieldCheck,
        title: 'CBSE / ICSE / State Board Ready',
        subtitle: 'Flexible academic structure',
        body: 'Configure any board\'s class structure, session (April–March), subject mapping, and exam patterns. No rigid templates forced on you — your school\'s structure, your way.',
        tag: 'Board Agnostic',
        gradient: 'from-violet-600 to-purple-500',
        glow: 'rgba(139,92,246,0.2)',
        border: 'border-violet-500/30',
        bg: 'bg-violet-500/5',
    },
    {
        icon: Headphones,
        title: 'Onboarding & Support Included',
        subtitle: 'We set it up for you',
        body: 'Our team handles installation, data migration from your old Excel files, and staff training. You don\'t need an IT department — we\'re your IT team at launch.',
        tag: 'White-Glove Setup',
        gradient: 'from-rose-600 to-pink-500',
        glow: 'rgba(244,63,94,0.2)',
        border: 'border-rose-500/30',
        bg: 'bg-rose-500/5',
    },
];

const SCHOOL_SIZES = [
    { label: 'Small School', size: '200–500 Students', icon: '🏫', suitable: true, points: ['All modules included', 'Single admin user', 'Runs on basic PC/laptop', 'Easy setup in 1 day'] },
    { label: 'Medium School', size: '500–2000 Students', icon: '🏛️', suitable: true, highlight: true, points: ['All modules included', 'Multi-staff access', 'Role-based permissions', 'Data import from Excel'] },
    { label: 'Large School', size: 'Unlimited Students', icon: '🏢', suitable: true, points: ['All modules included', 'VPS/server deployment', 'Priority support', 'Custom configuration'] },
];

export default function WhyUsSection() {
    return (
        <section id="why-us" className="py-24 relative overflow-x-clip">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
                    style={{ background: 'radial-gradient(circle, #00b6d5, transparent)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[120px] opacity-8"
                    style={{ background: 'radial-gradient(circle, #17305a, transparent)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Globe2 className="w-3.5 h-3.5" /> Made for India
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-5 leading-tight">
                        Not adapted from foreign software.<br />
                        <span className="brand-text-gradient">Built ground-up for Indian schools.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Every feature, every workflow, every design decision was made keeping Indian school operations in mind — because Indian schools have unique needs that foreign software never addresses.
                    </p>
                </motion.div>

                {/* Pillars grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                    {PILLARS.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-3xl p-7 border ${p.border} ${p.bg} backdrop-blur-sm overflow-hidden group transition-all duration-500 hover:shadow-2xl`}
                                style={{ '--glow': p.glow } as React.CSSProperties}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
                                    style={{ background: p.glow }} />

                                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                <div className="flex items-start gap-3 mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className="text-base font-black text-text-primary">{p.title}</h3>
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${p.border} ${p.bg}`}
                                                style={{ color: 'var(--primary-main)' }}>{p.tag}</span>
                                        </div>
                                        <p className="text-xs font-semibold text-text-secondary mb-3">{p.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* School size cards */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-3">Scales with you</p>
                    <h3 className="text-3xl md:text-4xl font-black text-text-primary">
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
                                ? 'border-[#00b6d5]/40 shadow-[0_0_40px_rgba(0,182,213,0.15)]'
                                : 'border-gray-200/50 dark:border-white/10'
                                } bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm`}>
                            {s.highlight && (
                                <>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                                        style={{ background: 'linear-gradient(90deg, transparent, #00b6d5, transparent)' }} />
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="text-[10px] font-black px-3 py-1 rounded-full text-white"
                                            style={{ background: 'linear-gradient(90deg, #17305a, #00b6d5)' }}>Most Popular</span>
                                    </div>
                                </>
                            )}
                            <div className="text-3xl mb-3">{s.icon}</div>
                            <h4 className="font-black text-text-primary text-lg mb-1">{s.label}</h4>
                            <p className="text-sm font-bold mb-5" style={{ color: '#00b6d5' }}>{s.size}</p>
                            <ul className="space-y-2">
                                {s.points.map(pt => (
                                    <li key={pt} className="flex items-center gap-2 text-sm text-text-secondary">
                                        <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: '#00b6d5' }} />
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
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,182,213,0.3)' }} whileTap={{ scale: 0.98 }}
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
