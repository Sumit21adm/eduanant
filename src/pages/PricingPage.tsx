import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, Building2, Landmark, PhoneCall, IndianRupee, Calculator, Sparkles, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

// Pricing model: ₹10 per student / month
// Annual payment: 10% off vs monthly billing
// All plans include all modules — no feature gating

const PLANS = [
    {
        icon: Users,
        name: 'Essential',
        target: 'Small & independent schools',
        band: 'Up to 300 Students',
        rateLabel: '₹10 / student / month',
        monthlyExample: '₹3,000 / month',
        annualApprox: '~₹32,000 / year',
        annualNote: 'Approx. for 300 students · 10% off on annual payment',
        highlight: false,
        cta: 'Get a Quote',
        features: [
            'Complete school management suite — every module included',
            '3 portals: Admin, Teacher & Parent — one platform',
            'Collect fees & issue receipts in under 60 seconds',
            'Demand bills, receipts & ledger — auto-generated',
            'Built for India — Hindi & English, zero language barrier',
            'Free Excel & register migration — we switch you over',
            'Runs on your school network — no external internet needed',
            'Your data, your server — zero cloud dependency',
            'WhatsApp support — we respond, we don\'t just email',
            'Free updates for 12 months',
        ],
        color: 'from-[#17305a] to-[#0f6187]',
    },
    {
        icon: Building2,
        name: 'Standard',
        target: 'Growing & established schools',
        band: '301 – 800 Students',
        rateLabel: '₹10 / student / month',
        monthlyExample: 'Up to ₹8,000 / month',
        annualApprox: '~₹54,000 – ₹86,000 / year',
        annualNote: 'Approx. based on your student count · 10% off on annual payment',
        highlight: true,
        cta: 'Get a Quote',
        features: [
            'Everything in Essential',
            'Every staff member, their own role — fine-grained access',
            'Track every bus, route & student — transport management',
            'Full HR & staff attendance module',
            'Analytics dashboard — see what\'s really happening',
            'Priority phone support — we pick up the call',
            'On-site training (1 day) — we come to your school',
            'Free updates for 12 months',
        ],
        color: 'from-[#0f6187] to-[#00b6d5]',
    },
    {
        icon: Landmark,
        name: 'Professional',
        target: 'Large schools',
        band: '801 – 1,500 Students',
        rateLabel: '₹10 / student / month',
        monthlyExample: 'Up to ₹15,000 / month',
        annualApprox: '~₹1,08,000 – ₹1,62,000 / year',
        annualNote: 'Approx. based on your student count · 10% off on annual payment',
        highlight: false,
        cta: 'Get a Quote',
        features: [
            'Everything in Standard',
            'Run multiple branches from one dashboard',
            'Custom fee structures — as complex as your school needs',
            'Dedicated account manager — one person who knows your school',
            'Priority SLA — issues resolved in hours, not days',
            'Extended on-site training (2 days)',
            'Rollover support for the next academic year',
            'Free updates for 12 months',
        ],
        color: 'from-violet-700 to-violet-500',
    },
];

const EARLY_OFFERS = [
    { icon: '🏅', label: 'Founder Pricing', desc: 'First 25 schools — 20% off, locked forever. Price never increases.', badge: 'Founder Member', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', color: '#f59e0b' },
    { icon: '📅', label: 'Academic Year Kickoff', desc: 'Sign before 30 June 2026 — 15% off your first year.', badge: 'Early Bird', bg: 'rgba(0,182,213,0.08)', border: 'rgba(0,182,213,0.25)', color: '#00b6d5' },
    { icon: '🏛️', label: 'Government School Rate', desc: 'Special pricing for Govt & Aided schools — verified applicants only.', badge: 'Special Rate', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#10b981' },
    { icon: '🤝', label: 'School Group Deal', desc: '3+ schools in same trust or group — 20% off each license.', badge: 'Group Pricing', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)', color: '#8b5cf6' },
    { icon: '📲', label: 'Refer & Earn', desc: 'Refer a school — both of you get 1 extra month free.', badge: 'Refer Programme', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.25)', color: '#f43f5e' },
    { icon: '🆓', label: 'Free Onboarding Pack', desc: 'Data migration + first training session included — ₹8,000 value, free.', badge: 'Included Free', bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.25)', color: '#14b8a6' },
];

const WHY_EDUANANT = [
    {
        label: 'No cloud subscription ever',
        desc: 'Your data stays on your own server. No monthly cloud bill. No vendor lock-in.',
    },
    {
        label: 'Transparent per-student pricing',
        desc: 'Pay for your actual school size — not arbitrary feature tiers. Every module included from day one.',
    },
    {
        label: 'Save up to 70% vs cloud ERPs',
        desc: 'Fedena and SchoolMint charge ₹3,000–7,000/month for less. EduAnant gives you more — at a fraction of the cost.',
    },
    {
        label: '10% off when you pay annually',
        desc: 'Commit to the year, save 10%. Budget it once in April, forget it for the entire academic year.',
    },
];

const COMPARISON = [
    { feature: 'All modules included', essential: true, standard: true, professional: true },
    { feature: 'Fee collection & auto-receipts', essential: true, standard: true, professional: true },
    { feature: 'Hindi + English UI', essential: true, standard: true, professional: true },
    { feature: 'Data migration from Excel', essential: true, standard: true, professional: true },
    { feature: 'Self-hosted on your server', essential: true, standard: true, professional: true },
    { feature: 'WhatsApp & email support', essential: true, standard: true, professional: true },
    { feature: 'Transport & route management', essential: false, standard: true, professional: true },
    { feature: 'HR & staff attendance', essential: false, standard: true, professional: true },
    { feature: 'Advanced analytics', essential: false, standard: true, professional: true },
    { feature: 'Priority phone support', essential: false, standard: true, professional: true },
    { feature: 'On-site staff training (1 day)', essential: false, standard: true, professional: true },
    { feature: 'Dedicated account manager', essential: false, standard: false, professional: true },
    { feature: 'Multi-branch support', essential: false, standard: false, professional: true },
    { feature: 'Custom fee structures', essential: false, standard: false, professional: true },
    { feature: 'Priority SLA support', essential: false, standard: false, professional: true },
    { feature: 'Rollover support (next year)', essential: false, standard: false, professional: true },
];

function PricingCalculator() {
    const [students, setStudents] = useState(300);
    const plan = students <= 300 ? 'Essential' : students <= 800 ? 'Standard' : students <= 1500 ? 'Professional' : 'Enterprise';
    const monthly = students <= 1500 ? students * 10 : null;
    const annual = monthly ? Math.round(monthly * 12 * 0.9) : null;
    const planColor = plan === 'Essential' ? '#0f6187' : plan === 'Standard' ? '#00b6d5' : plan === 'Professional' ? '#8b5cf6' : '#f59e0b';

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border p-8 md:p-10"
            style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.03)' }}>
            <div className="text-center mb-8">
                <p className="text-xs font-black uppercase tracking-widest mb-2 inline-flex items-center gap-1.5" style={{ color: '#00b6d5' }}>
                    <Calculator className="w-3.5 h-3.5" /> Pricing Calculator
                </p>
                <h3 className="text-2xl font-black text-text-primary mt-1">How much will it cost?</h3>
                <p className="text-sm text-text-secondary mt-1">Move the slider to your student count</p>
            </div>
            <div className="max-w-xl mx-auto">
                <div className="flex justify-between text-xs text-text-secondary mb-2">
                    <span>300</span>
                    <span className="font-black text-text-primary text-base">{students.toLocaleString('en-IN')} students</span>
                    <span>2,000</span>
                </div>
                <input type="range" min={300} max={2000} step={10} value={students}
                    onChange={e => setStudents(Number(e.target.value))}
                    className="w-full cursor-pointer mb-6"
                    style={{ accentColor: planColor }} />

                {plan === 'Enterprise' ? (
                    <div className="text-center p-6 rounded-2xl border" style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
                        <p className="text-lg font-black text-text-primary mb-1">Enterprise Plan</p>
                        <p className="text-sm text-text-secondary mb-4">1,500+ students — custom pricing based on your requirements</p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.03 }} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                                <PhoneCall className="w-4 h-4" /> Talk to Us
                            </motion.button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl text-center border border-gray-200/30 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                            <p className="text-xs text-text-secondary mb-1">Plan</p>
                            <p className="text-xl font-black" style={{ color: planColor }}>{plan}</p>
                        </div>
                        <div className="p-5 rounded-2xl text-center border border-gray-200/30 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                            <p className="text-xs text-text-secondary mb-1">Monthly billing</p>
                            <p className="text-xl font-black text-text-primary">₹{monthly!.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-text-secondary">per month</p>
                        </div>
                        <div className="p-5 rounded-2xl text-center border" style={{ borderColor: `${planColor}40`, background: `${planColor}10` }}>
                            <p className="text-xs font-bold mb-1" style={{ color: planColor }}>Annual (save 10%)</p>
                            <p className="text-xl font-black text-text-primary">₹{annual!.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-text-secondary">per year · approx.</p>
                        </div>
                    </div>
                )}
                <p className="text-center text-xs text-text-secondary mt-4 italic">
                    All prices are approximate — final price confirmed after school size verification. Open to negotiation.
                </p>
            </div>
        </motion.div>
    );
}

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

    return (
        <div className="pt-28 pb-24 relative">
            {/* Header */}
            <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <IndianRupee className="w-3.5 h-3.5" /> Transparent Pricing
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Priced per student,<br />
                        <span className="brand-text-gradient">not per feature.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        ₹10 per student, per month — less than one photocopy per child.
                        Every module included. No hidden fees. Open to negotiation.
                    </p>
                </motion.div>
            </div>

            {/* Plans */}
            {/* Early Offers Banner */}
            <div className="container mx-auto px-6 max-w-6xl mb-12">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <div className="flex items-center gap-3 mb-5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <p className="text-sm font-black uppercase tracking-widest text-text-secondary">Current Offers</p>
                        <div className="flex-1 h-px bg-gray-200/40 dark:bg-white/10" />
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full border" style={{ background: 'rgba(251,191,36,0.1)', borderColor: 'rgba(251,191,36,0.3)', color: '#f59e0b' }}>
                            Limited Time
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {EARLY_OFFERS.map((offer, i) => (
                            <motion.div key={offer.label}
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                                className="flex items-start gap-3 p-4 rounded-2xl border"
                                style={{ background: offer.bg, borderColor: offer.border }}>
                                <span className="text-xl shrink-0">{offer.icon}</span>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <p className="text-sm font-black text-text-primary">{offer.label}</p>
                                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full border"
                                            style={{ background: `${offer.color}15`, borderColor: `${offer.color}40`, color: offer.color }}>
                                            {offer.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary">{offer.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-xs text-text-secondary text-center mt-3">
                        Contact us to avail any offer · All pricing negotiable for government and aided schools
                    </p>
                </motion.div>
            </div>

            {/* Billing toggle */}
            <div className="container mx-auto px-6 max-w-6xl mb-8">
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setBilling('monthly')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${billing === 'monthly' ? 'border-white/20 bg-white/10 text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                        Monthly
                    </button>
                    <button onClick={() => setBilling('annual')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === 'annual' ? 'btn-primary' : 'text-text-secondary hover:text-text-primary border border-transparent'}`}>
                        Annual
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}>
                            Save 10%
                        </span>
                    </button>
                </div>
            </div>

            {/* Plan cards */}
            <div className="container mx-auto px-6 max-w-6xl mb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {PLANS.map((plan, i) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div key={plan.name}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
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
                                    {plan.band}
                                </span>

                                <div className="mb-5 p-4 rounded-2xl border" style={{ borderColor: 'rgba(0,182,213,0.15)', background: 'rgba(0,182,213,0.04)' }}>
                                    <p className="text-xs font-bold text-text-secondary mb-1.5">{plan.rateLabel}</p>
                                    {billing === 'annual' ? (
                                        <>
                                            <p className="text-2xl font-black text-text-primary">{plan.annualApprox}</p>
                                            <p className="text-[11px] text-text-secondary italic mt-1">{plan.annualNote}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-2xl font-black text-text-primary">{plan.monthlyExample}</p>
                                            <p className="text-[11px] text-text-secondary italic mt-1">Approx. max for this band · billed monthly</p>
                                        </>
                                    )}
                                </div>

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
                            <p className="text-sm text-text-secondary">1,500+ students · Multiple branches · Custom requirements</p>
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

            {/* Pricing Calculator */}
            <div className="container mx-auto px-6 max-w-4xl mb-20">
                <PricingCalculator />
            </div>

            {/* Why EduAnant over cloud ERPs */}
            <div className="container mx-auto px-6 max-w-5xl mb-20">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-2xl font-black text-text-primary text-center mb-10">
                    Why EduAnant over cloud ERPs?
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {WHY_EDUANANT.map((item, i) => (
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

            {/* Government School callout */}
            <div className="container mx-auto px-6 max-w-4xl mb-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-6"
                    style={{ borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.04)' }}>
                    <div className="text-4xl shrink-0">🏛️</div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-black text-text-primary mb-1">Government & Aided Schools</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            EduAnant believes every school — regardless of budget — deserves modern school management.
                            Special pricing is available for government and government-aided schools.{' '}
                            <strong className="text-text-primary">Contact us with your school details.</strong>
                        </p>
                    </div>
                    <Link to="/contact" className="shrink-0">
                        <motion.button whileHover={{ scale: 1.04 }}
                            className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 border"
                            style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10b981' }}>
                            <GraduationCap className="w-4 h-4" /> Apply for Special Rate
                        </motion.button>
                    </Link>
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
