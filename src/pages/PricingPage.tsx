import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, Building2, Landmark, PhoneCall, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * PRICING STRATEGY — Indian School ERP Market
 *
 * Competitor benchmarks (cloud-based, per month):
 *  - Fedena Cloud:    ₹3,500–7,000/month  = ₹42,000–84,000/year
 *  - SchoolMint:      ₹3,000–5,000/month  = ₹36,000–60,000/year
 *  - Generic ERP:     ₹20,000–80,000 one-time + ₹10,000/year AMC
 *
 * EduAnant USP: Self-hosted, unlimited students, one annual license.
 * No recurring cloud fees. Value = (competitor annual) - (server cost).
 *
 * Recommended tiers (annual software license):
 *  - Essential  (up to 500 students):  ₹18,000/year
 *  - Standard   (up to 1500 students): ₹32,000/year
 *  - Professional (up to 3000):        ₹55,000/year
 *  - Enterprise  (unlimited):          Custom
 */

const PLANS = [
    {
        icon: Users,
        name: 'Essential',
        target: 'Small & independent schools',
        students: 'Up to 500 Students',
        price: '₹18,000',
        period: '/year',
        note: 'Approx. ₹1,500/month — less than one staff member\'s day salary',
        highlight: false,
        cta: 'Get a Quote',
        features: [
            'All 14 modules included',
            'Admin + Teacher + Parent portals',
            'Unlimited fee transactions',
            'PDF receipts & demand bills',
            'Hindi & English interface',
            'Data migration from Excel',
            'WhatsApp & email support',
            '1 year of software updates',
        ],
        color: 'from-[#17305a] to-[#0f6187]',
        border: 'border-[#17305a]/20',
    },
    {
        icon: Building2,
        name: 'Standard',
        target: 'Growing & established schools',
        students: 'Up to 1500 Students',
        price: '₹32,000',
        period: '/year',
        note: 'Best value — full ERP at a fraction of cloud competitor cost',
        highlight: true,
        cta: 'Get a Quote',
        features: [
            'Everything in Essential',
            'Multi-staff role configuration',
            'Transport & route management',
            'Priority phone + WhatsApp support',
            'Staff attendance & HR module',
            'Advanced reports & analytics',
            'On-site staff training (1 day)',
            '1 year of software updates',
        ],
        color: 'from-[#0f6187] to-[#00b6d5]',
        border: 'border-[#00b6d5]/30',
    },
    {
        icon: Landmark,
        name: 'Professional',
        target: 'Large schools & school groups',
        students: 'Up to 3000 Students',
        price: '₹55,000',
        period: '/year',
        note: 'Includes dedicated onboarding and SLA-backed support',
        highlight: false,
        cta: 'Get a Quote',
        features: [
            'Everything in Standard',
            'Unlimited student records',
            'Multi-branch / multi-session support',
            'Dedicated account manager',
            'Priority SLA support',
            'Custom fee structure setup',
            'Extended training (2 days)',
            '1 year of updates + rollover support',
        ],
        color: 'from-violet-700 to-violet-500',
        border: 'border-violet-500/20',
    },
];

const WHY_ANNUAL = [
    {
        label: 'No monthly surprises',
        desc: 'One fixed payment per year. Budget it once, forget it for the year.',
    },
    {
        label: 'No per-student charges',
        desc: 'Enroll 50 students or 3,000 — the price doesn\'t change.',
    },
    {
        label: 'No feature limits by tier',
        desc: 'Every plan includes all 14 modules. You don\'t pay extra to unlock features.',
    },
    {
        label: 'Compare to the alternative',
        desc: 'Cloud competitors charge ₹3,000–7,000/month. EduAnant costs a fraction of that — and you own your data.',
    },
];

const COMPARISON = [
    { feature: 'All modules included', essential: true, standard: true, professional: true },
    { feature: 'Unlimited fee transactions', essential: true, standard: true, professional: true },
    { feature: 'Hindi + English UI', essential: true, standard: true, professional: true },
    { feature: 'Transport management', essential: true, standard: true, professional: true },
    { feature: 'Data migration from Excel', essential: true, standard: true, professional: true },
    { feature: 'Priority phone support', essential: false, standard: true, professional: true },
    { feature: 'On-site staff training', essential: false, standard: true, professional: true },
    { feature: 'Dedicated account manager', essential: false, standard: false, professional: true },
    { feature: 'Multi-branch configuration', essential: false, standard: false, professional: true },
    { feature: 'SLA-backed support', essential: false, standard: false, professional: true },
];

export default function PricingPage() {
    return (
        <div className="pt-28 pb-24 relative">
            {/* Header */}
            <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <IndianRupee className="w-3.5 h-3.5" /> Simple, Honest Pricing
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        The right plan for<br />
                        <span className="brand-text-gradient">your school.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        One annual license. All 14 modules. All portals. No per-student charges. No hidden fees.
                        Pricing is based on your school size — not arbitrary feature locks.
                    </p>
                </motion.div>
            </div>

            {/* Plans */}
            <div className="container mx-auto px-6 max-w-6xl mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {PLANS.map((plan, i) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-3xl p-8 border flex flex-col transition-all duration-500 ${plan.highlight
                                    ? 'border-[#00b6d5]/40 shadow-[0_0_60px_rgba(0,182,213,0.2)]'
                                    : 'border-gray-200/50 dark:border-white/10'
                                    } bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm`}>

                                {plan.highlight && (
                                    <>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                                            style={{ background: 'linear-gradient(90deg, transparent, #00b6d5, transparent)' }} />
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="text-[10px] font-black px-3 py-1 rounded-full text-white"
                                                style={{ background: 'linear-gradient(90deg, #17305a, #00b6d5)' }}>Most Popular</span>
                                        </div>
                                    </>
                                )}

                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h2 className="text-2xl font-black text-text-primary mb-1">{plan.name}</h2>
                                <p className="text-sm text-text-secondary mb-2">{plan.target}</p>
                                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
                                    style={{ background: 'rgba(0,182,213,0.1)', color: '#0091b8' }}>
                                    {plan.students}
                                </span>

                                <div className="mb-2">
                                    <span className="text-4xl font-black text-text-primary">{plan.price}</span>
                                    <span className="text-text-secondary text-sm ml-1">{plan.period}</span>
                                </div>
                                <p className="text-xs text-text-secondary italic mb-6">{plan.note}</p>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                                            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" /> {f}
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact">
                                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}>
                                        {plan.cta} <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Enterprise callout */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-6 p-7 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6"
                    style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-white/10">🏛️</div>
                        <div>
                            <h3 className="text-lg font-black text-text-primary">Enterprise / School Groups</h3>
                            <p className="text-sm text-text-secondary">3000+ students · Multiple branches · Custom requirements</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <p className="text-sm text-text-secondary">Custom pricing based on your requirements</p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.04 }} className="btn-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                                <PhoneCall className="w-4 h-4" /> Talk to Us
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Why annual pricing */}
            <div className="container mx-auto px-6 max-w-5xl mb-20">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-2xl font-black text-text-primary text-center mb-10">
                    Why annual licensing makes sense for schools
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {WHY_ANNUAL.map((item, i) => (
                        <motion.div key={item.label}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                            <div>
                                <p className="font-black text-text-primary text-sm mb-1">{item.label}</p>
                                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Feature comparison table */}
            <div className="container mx-auto px-6 max-w-4xl mb-16">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-2xl font-black text-text-primary text-center mb-8">
                    What's included in each plan
                </motion.h2>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="rounded-3xl border border-gray-200/50 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/[0.02]">
                    {/* Header row */}
                    <div className="grid grid-cols-4 gap-0 border-b border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                        <div className="p-4 text-xs font-black uppercase tracking-wider text-text-secondary">Feature</div>
                        {['Essential', 'Standard', 'Professional'].map(p => (
                            <div key={p} className="p-4 text-center text-xs font-black text-text-primary">{p}</div>
                        ))}
                    </div>
                    {COMPARISON.map((row, i) => (
                        <div key={row.feature}
                            className={`grid grid-cols-4 gap-0 ${i !== COMPARISON.length - 1 ? 'border-b border-gray-200/30 dark:border-white/5' : ''}`}>
                            <div className="p-4 text-sm text-text-secondary">{row.feature}</div>
                            {[row.essential, row.standard, row.professional].map((val, j) => (
                                <div key={j} className="p-4 flex items-center justify-center">
                                    {val
                                        ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                                        : <span className="w-4 h-0.5 bg-gray-300/50 dark:bg-white/10 rounded-full block" />
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-6 max-w-3xl text-center">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="p-10 rounded-3xl border"
                    style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                    <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#00b6d5' }}>Not sure which plan fits?</p>
                    <h3 className="text-3xl font-black text-text-primary mb-4">Let's figure it out together</h3>
                    <p className="text-text-secondary mb-8">Tell us your school size and requirements. We'll recommend the right plan — no sales pressure, free consultation.</p>
                    <Link to="/contact">
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                            className="btn-primary px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2">
                            Book a Free Demo <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                    <p className="text-xs text-text-secondary mt-4">Response within 24 hours · All pricing negotiable for Government / Aided schools</p>
                </motion.div>
            </div>
        </div>
    );
}
