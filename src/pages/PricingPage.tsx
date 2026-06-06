import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// MUI Icons
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalculateIcon from '@mui/icons-material/Calculate';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BusinessIcon from '@mui/icons-material/Business';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';

// Pricing model: ₹50 per student / month
// Annual payment: 20% off vs monthly billing (₹40 per student / month)
// All features included — no feature gating

const SUITE_FEATURES = [
    'Complete school management suite — every module included',
    '3 portals: Admin, Teacher & Parent — one platform',
    'Collect fees & issue receipts in under 60 seconds',
    'Demand bills, receipts & ledger — auto-generated',
    'Track every bus, route & student — transport management',
    'Full HR & staff attendance module',
    'Run multiple branches from one dashboard',
    'Custom fee structures — as complex as your school needs',
    'Runs on your school network — no external internet needed',
    'Your data, your server — zero cloud dependency',
    'Priority support via call & WhatsApp',
    'Free Excel & register migration — we switch you over',
    'Unlimited staff accounts — no per-staff fees',
    'On-site staff training (1-2 days included)',
    'Free software updates for 12 months',
];

const EARLY_OFFERS = [
    { icon: WorkspacePremiumIcon, label: 'Founder Pricing', desc: 'First 25 schools — 20% off, locked forever. Price never increases.', badge: 'Founder Member', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', color: '#f59e0b', discount: 20 },
    { icon: CardGiftcardIcon, label: 'Refer & Earn', desc: 'Refer a school — both of you get 25% off on your next license/billing.', badge: 'Refer Programme', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.25)', color: '#f43f5e', discount: 25 },
    { icon: CalendarTodayIcon, label: 'Academic Year Kickoff', desc: 'Sign before 30 June 2026 — 30% off your first year.', badge: 'Early Bird', bg: 'rgba(0,182,213,0.08)', border: 'rgba(0,182,213,0.25)', color: '#00b6d5', discount: 30 },
    { icon: HandshakeIcon, label: 'School Group Deal', desc: '3+ schools in same trust or group — 40% off each license.', badge: 'Group Pricing', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)', color: '#8b5cf6', discount: 40 },
    { icon: AccountBalanceIcon, label: 'Government School Rate', desc: 'Special pricing for Govt & Aided schools — 60% off for verified applicants.', badge: 'Special Rate', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#10b981', discount: 60 },
    { icon: RocketLaunchIcon, label: 'Free Onboarding Pack', desc: 'Data migration + first training session included — ₹8,000 value, free.', badge: 'Included Free', bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.25)', color: '#14b8a6', discount: 0 },
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
        label: '20% off when you pay annually',
        desc: 'Commit to the year, save 20%. Budget it once in April, forget it for the entire academic year.',
    },
];

const COMPARISON = [
    { feature: 'All modules included from day 1', eduanant: { status: 'success', text: 'All features included' }, other: { status: 'error', text: 'Arbitrary feature tiers / lock' } },
    { feature: 'Offline LAN support', eduanant: { status: 'success', text: 'Runs offline on school LAN' }, other: { status: 'error', text: 'Requires 24/7 internet' } },
    { feature: 'Data ownership', eduanant: { status: 'success', text: '100% yours on your server' }, other: { status: 'error', text: 'Held on third-party cloud' } },
    { feature: 'Fee receipts under 60s', eduanant: { status: 'success', text: 'Included' }, other: { status: 'warning', text: 'Varies, often slow' } },
    { feature: 'Transport & route management', eduanant: { status: 'success', text: 'Included' }, other: { status: 'error', text: 'Extra cost addon / module' } },
    { feature: 'HR & staff attendance', eduanant: { status: 'success', text: 'Included' }, other: { status: 'error', text: 'Only on higher tiers' } },
    { feature: 'No cloud server cost', eduanant: { status: 'success', text: 'Runs on existing school PCs' }, other: { status: 'error', text: 'Recurring cloud billing' } },
    { feature: 'Priority call & WhatsApp support', eduanant: { status: 'success', text: 'Yes, direct contact' }, other: { status: 'error', text: 'Email/ticket systems only' } },
];

function PricingCalculator() {
    const [students, setStudents] = useState(300);
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
    const [offerIndex, setOfferIndex] = useState(1);

    const discountOffers = [
        { label: 'No Promo Offer', discount: 0 },
        ...EARLY_OFFERS.filter(o => o.discount > 0)
    ];

    const isEnterprise = students > 1500;
    const ratePerStudent = billing === 'annual' ? 40 : 50;
    const baseCost = students * ratePerStudent * (billing === 'annual' ? 12 : 1);
    const offerDiscountPercent = discountOffers[offerIndex].discount;
    const offerSavings = baseCost * (offerDiscountPercent / 100);
    const finalPrice = Math.round(baseCost - offerSavings);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border p-8 md:p-10"
            style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.03)' }}>
            <div className="text-center mb-8">
                <p className="text-xs font-black uppercase tracking-widest mb-2 inline-flex items-center gap-1.5" style={{ color: '#00b6d5' }}>
                    <CalculateIcon className="w-3.5 h-3.5" /> Interactive Pricing Calculator
                </p>
                <h3 className="text-2xl font-black text-text-primary mt-1">How much will it cost?</h3>
                <p className="text-sm text-text-secondary mt-1">Configure your school count and options to calculate estimated pricing</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <div className="flex justify-between text-xs text-text-secondary mb-2">
                        <span>100</span>
                        <span className="font-black text-text-primary text-base">{students.toLocaleString('en-IN')} students</span>
                        <span>2,000</span>
                    </div>
                    <input type="range" min={100} max={2000} step={10} value={students}
                        onChange={e => setStudents(Number(e.target.value))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: '#00b6d5' }} />
                </div>

                {isEnterprise ? (
                    <div className="text-center p-8 rounded-2xl border" style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
                        <p className="text-lg font-black text-text-primary mb-1">Custom Enterprise Pricing</p>
                        <p className="text-sm text-text-secondary mb-5">1,500+ students — custom pricing with specialized SLA based on your requirements</p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.03 }} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4" /> Get Custom Quote
                            </motion.button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Billing Cycle</label>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100/50 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-xl">
                                    <button type="button" onClick={() => setBilling('monthly')}
                                        className={`py-2 rounded-lg text-xs font-bold transition-all ${billing === 'monthly' ? 'bg-white dark:bg-white/10 text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                                        Monthly
                                    </button>
                                    <button type="button" onClick={() => setBilling('annual')}
                                        className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${billing === 'annual' ? 'bg-white dark:bg-white/10 text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                                        Annual
                                        <span className="text-[9px] font-black px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-sans">-20%</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Promotional Offer</label>
                                <div className="relative">
                                    <select value={offerIndex} onChange={e => setOfferIndex(Number(e.target.value))}
                                        className="w-full bg-white dark:bg-[#0d1721] border border-gray-200/50 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-primary focus:outline-none focus:border-[#00b6d5] appearance-none cursor-pointer">
                                        {discountOffers.map((o, idx) => (
                                            <option key={o.label} value={idx}>
                                                {o.label} {o.discount > 0 ? `(${o.discount}% Off)` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
                                        <KeyboardArrowDownIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 dark:bg-[#0d1721]/95 border border-[#00b6d5]/20 p-5 rounded-2xl space-y-3.5 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00b6d5]/5 rounded-full blur-xl pointer-events-none" />
                            <div className="text-xs font-black uppercase tracking-widest text-[#00b6d5] border-b border-gray-100 dark:border-white/5 pb-2 flex items-center justify-between">
                                <span>Estimated Invoice</span>
                                <span>{billing === 'annual' ? 'Annualized' : 'Monthly'}</span>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Rate:</span>
                                    <span className="font-semibold text-text-primary">₹{ratePerStudent} / student / month</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Size:</span>
                                    <span className="font-semibold text-text-primary">{students} students</span>
                                </div>
                                {billing === 'annual' && (
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Annual base ({students} × ₹40 × 12):</span>
                                        <span className="font-semibold text-text-primary">₹{baseCost.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                                {billing === 'monthly' && (
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Monthly base ({students} × ₹50):</span>
                                        <span className="font-semibold text-text-primary">₹{baseCost.toLocaleString('en-IN')}</span>
                                    </div>
                                )}

                                {offerDiscountPercent > 0 && (
                                    <div className="flex justify-between text-[#00b6d5] font-semibold border-t border-dashed border-gray-100 dark:border-white/5 pt-2">
                                        <span>Discount ({discountOffers[offerIndex].label}):</span>
                                        <span>-{offerDiscountPercent}% (-₹{offerSavings.toLocaleString('en-IN')})</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200/50 dark:border-white/10 pt-3 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-text-secondary">Total Estimate</p>
                                    <p className="text-2xl font-black text-text-primary">₹{finalPrice.toLocaleString('en-IN')}</p>
                                </div>
                                <Link to="/contact">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="btn-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1">
                                        Lock Price <ArrowForwardIcon className="w-3.5 h-3.5" />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <p className="text-center text-xs text-text-secondary italic font-medium">
                    Offers cannot be stacked. Final price confirmed after school verification. Open to negotiation.
                </p>
            </div>
        </motion.div>
    );
}

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

    const ratePerStudent = billing === 'annual' ? 40 : 50;

    return (
        <div className="pt-28 pb-24 relative">
            <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <CurrencyRupeeIcon className="w-3.5 h-3.5" /> Unified Pricing Model
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Priced per student,<br />
                        <span className="brand-text-gradient">not per feature.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        ₹50 per student, per month — less than a cup of tea per child.
                        Every module included. No hidden fees. Open to negotiation.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl mb-16">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <div className="flex items-center gap-3 mb-5">
                        <AutoAwesomeIcon className="w-4 h-4 text-amber-400" />
                        <p className="text-sm font-black uppercase tracking-widest text-text-secondary">Current Offers</p>
                        <div className="flex-1 h-px bg-gray-200/40 dark:bg-white/10" />
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full border" style={{ background: 'rgba(251,191,36,0.1)', borderColor: 'rgba(251,191,36,0.3)', color: '#f59e0b' }}>
                            Limited Time
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {EARLY_OFFERS.map((offer, i) => {
                            const Icon = offer.icon;
                            return (
                                <motion.div key={offer.label}
                                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                                    className="flex items-start gap-4 p-4 rounded-2xl border bg-white/50 dark:bg-white/[0.01]"
                                    style={{ borderColor: offer.border }}>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${offer.color}15` }}>
                                        <Icon className="w-5 h-5" style={{ color: offer.color }} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                            <p className="text-sm font-black text-text-primary">{offer.label}</p>
                                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full border"
                                                style={{ background: `${offer.color}15`, borderColor: `${offer.color}40`, color: offer.color }}>
                                                {offer.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">{offer.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    <p className="text-xs text-text-secondary text-center mt-3">
                        Contact us to avail any offer · All pricing negotiable for government and aided schools
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl mb-8">
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setBilling('monthly')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${billing === 'monthly' ? 'btn-primary shadow-lg shadow-[#00b6d5]/20' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                        Monthly
                    </button>
                    <button onClick={() => setBilling('annual')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border ${billing === 'annual' ? 'btn-primary shadow-lg shadow-[#00b6d5]/20' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                        Annual
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full font-sans transition-all"
                            style={{
                                background: billing === 'annual' ? 'rgba(255,255,255,0.25)' : 'rgba(52,211,153,0.2)',
                                color: billing === 'annual' ? '#ffffff' : '#10b981'
                            }}>
                            Save 20%
                        </span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl mb-14">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl p-8 md:p-12 border border-[#00b6d5]/30 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm shadow-[0_0_60px_rgba(0,182,213,0.15)] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#17305a] via-[#00b6d5] to-purple-600" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b6d5]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                            <div>
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#17305a] to-[#00b6d5] uppercase tracking-wider mb-4">
                                    <AutoAwesomeIcon className="w-3 h-3" /> Full Suite Plan
                                </span>
                                <h2 className="text-3xl font-black text-text-primary mb-2">EduAnant Unlimited</h2>
                                <p className="text-sm text-text-secondary">
                                    Our unified plan designed to support any size of school. No feature walls, no locked models, no limitations.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl border border-[#00b6d5]/15 bg-[#00b6d5]/5">
                                <p className="text-xs font-bold text-text-secondary mb-1">Pricing Model</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-4xl font-black brand-text-gradient">₹{ratePerStudent}</span>
                                    <span className="text-sm text-text-secondary font-semibold">/ student / month</span>
                                </div>
                                <p className="text-[11px] text-text-secondary mt-1.5 italic">
                                    {billing === 'annual' ? 'Billed annually (₹480 / student / year) — saves 20%' : 'Billed monthly'}
                                </p>
                            </div>

                            <Link to="/contact" className="block w-full">
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className="w-full btn-primary py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00b6d5]/20">
                                    <PhoneIcon className="w-4 h-4" /> Get Started Now <ArrowForwardIcon className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </div>

                        <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-gray-200/50 dark:border-white/10 lg:pl-8 pt-8 lg:pt-0 flex flex-col justify-center">
                            <p className="text-xs font-black uppercase tracking-widest text-[#00b6d5] mb-4">Everything Included</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {SUITE_FEATURES.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckIcon className="w-2.5 h-2.5 text-emerald-400 font-bold" />
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-6 p-7 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6"
                    style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-gray-200/20 shadow-sm">
                            <BusinessIcon className="w-6 h-6 text-[#00b6d5]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-text-primary">Enterprise & School Groups</h3>
                            <p className="text-sm text-text-secondary font-medium">1,500+ students · Multiple branches · Specialized deployments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <p className="text-sm text-text-secondary font-semibold">Custom pricing based on requirements</p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.04 }} className="btn-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4" /> Talk to Us
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl mb-20">
                <PricingCalculator />
            </div>

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
                            <CheckCircleIcon className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                            <div>
                                <p className="font-black text-text-primary text-sm mb-1">{item.label}</p>
                                <p className="text-xs text-text-secondary leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl mb-16">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-2xl font-black text-text-primary text-center mb-8">
                    Value Comparison
                </motion.h2>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="rounded-3xl border border-gray-200/50 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/[0.02] shadow-xl">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="border-b border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                                <th className="w-[35%] p-4 text-xs font-black uppercase tracking-wider text-text-secondary">Feature / Attribute</th>
                                <th className="w-[30%] p-4 text-xs font-black uppercase tracking-wider text-[#00b6d5] border-l border-gray-200/5 dark:border-white/5">EduAnant All-in-One</th>
                                <th className="w-[35%] p-4 text-xs font-black uppercase tracking-wider text-text-secondary border-l border-gray-200/5 dark:border-white/5">Traditional Cloud ERPs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row, i) => (
                                <tr key={row.feature}
                                    className={`hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors ${i !== COMPARISON.length - 1 ? 'border-b border-gray-200/30 dark:border-white/5' : ''}`}>
                                    <td className="p-4 text-xs font-semibold text-text-secondary truncate md:text-sm">{row.feature}</td>
                                    
                                    <td className="p-4 border-l border-gray-200/5 dark:border-white/5">
                                        <div className="flex items-center gap-2 text-text-primary text-xs font-semibold">
                                            <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span>{row.eduanant.text}</span>
                                        </div>
                                    </td>

                                    <td className="p-4 border-l border-gray-200/5 dark:border-white/5">
                                        <div className="flex items-center gap-2 text-text-secondary text-xs font-semibold">
                                            {row.other.status === 'error' && (
                                                <CancelIcon className="w-4 h-4 text-red-500 shrink-0" />
                                            )}
                                            {row.other.status === 'warning' && (
                                                <WarningAmberIcon className="w-4 h-4 text-amber-500 shrink-0" />
                                            )}
                                            <span>{row.other.text}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl mb-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-6"
                    style={{ borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.04)' }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-gray-200/20 shadow-sm">
                        <AccountBalanceIcon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-black text-text-primary mb-1">Government & Aided Schools</h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-medium">
                            EduAnant believes every school — regardless of budget — deserves modern school management.
                            Special pricing is available for government and government-aided schools.{' '}
                            <strong className="text-text-primary">Contact us with your school details.</strong>
                        </p>
                    </div>
                    <Link to="/contact" className="shrink-0">
                        <motion.button whileHover={{ scale: 1.04 }}
                            className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 border"
                            style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10b981' }}>
                            <SchoolIcon className="w-4 h-4" /> Apply for Special Rate
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-3xl text-center">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="p-10 rounded-3xl border"
                    style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                    <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#00b6d5' }}>Not sure how to get started?</p>
                    <h3 className="text-3xl font-black text-text-primary mb-4">Let's configure it together</h3>
                    <p className="text-text-secondary mb-8 font-medium">Tell us your school size and requirements. We'll assist with server setup and data migration — no sales pressure, free consultation.</p>
                    <Link to="/contact">
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                            className="btn-primary px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2">
                            Book a Free Demo <ArrowForwardIcon className="w-5 h-5" />
                        </motion.button>
                    </Link>
                    <p className="text-xs text-text-secondary mt-4 font-semibold">Response within 24 hours · All pricing negotiable for Government / Aided schools</p>
                </motion.div>
            </div>
        </div>
    );
}
