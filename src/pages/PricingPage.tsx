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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BusinessIcon from '@mui/icons-material/Business';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import DnsIcon from '@mui/icons-material/Dns';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Seo from '../lib/seo';
import {
    RATE_ANNUAL, RATE_MONTHLY, HOSTING_ANNUAL, ONBOARDING_VALUE,
    GST_RATE as GST, ANNUAL_SAVING_PCT, inr, annualRateLabel,
    SIZE_BANDS, LARGE_SCHOOL_FROM, effectiveRate, RATE_FLOOR_ANNUAL,
    EXAMPLE_ROLL, DEPLOYMENT_MODES, CONTACT_SALES_ABOVE,
    quoteFor, SLIDER_MIN, SLIDER_MAX, SLIDER_TICKS, studentsAtTick, tickForStudents,
} from '../data/pricing';
import { capitalise, countOf } from '../lib/text';
import { PAGE_SEO, softwareSchema } from '../lib/seoConfig';

/* Where the published table ends. This was hardcoded at 2,000 while the bands
 * stopped at 1,250, so 1,251-2,000 had no band, licenceFor returned null, and the
 * figure fell through to the old annual minimum — a 1,370-student school was shown
 * Rs 90,000. The commercial model now lives entirely in src/data/pricing.ts. */
const ENTERPRISE_ABOVE = CONTACT_SALES_ABOVE;


const SUITE_FEATURES = [
    'All 16 modules, with no tier to upgrade to',
    '2 self-service portals for teachers and parents, plus the admin console and Android app',
    'Unlimited staff accounts — no per-user charge',
    'Fee collection, demand bills, receipts and ledger',
    'HR with service book, salary structure and compliance exports',
    'Library, Reception Counter and Transport',
    'Push notifications to parents',
    'Runs on your school network — no external internet needed',
    'Your data on your server, in a database you can export',
    'Excel and register migration — we move you across',
    'On-site staff training (2 days)',
    'Every update for as long as you subscribe',
    'Support on call and WhatsApp, direct to the team',
];

const NOT_INCLUDED = [
    {
        icon: DnsIcon,
        label: 'The server itself',
        desc: `Free if you run it on a school PC or an existing server. If you would rather not, we host and maintain it for Rs ${inr(HOSTING_ANNUAL)} a year.`,
    },
    {
        icon: ReceiptLongIcon,
        label: '18% GST',
        desc: 'Every figure on this page is before tax. Your invoice carries GST as a separate line.',
    },
];

const EARLY_OFFERS = [
    { icon: WorkspacePremiumIcon, label: 'Founding 10', desc: 'First ten schools: 50% off year one, with renewal rates locked for life.', badge: 'Open now', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', color: '#f59e0b' },
    { icon: RocketLaunchIcon, label: 'Onboarding waived', desc: `Migration, installation and two days of on-site training — a Rs ${inr(ONBOARDING_VALUE)} line item, free for founding schools.`, badge: `Worth Rs ${inr(ONBOARDING_VALUE)}`, bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.25)', color: '#14b8a6' },
    { icon: CalendarTodayIcon, label: 'Session 2027-28 early bird', desc: 'Confirm by 31 January 2027 and open the new session on it — 30% off your first year.', badge: 'Next session', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' },
    { icon: CardGiftcardIcon, label: 'Refer a school', desc: 'Introduce us to a school that signs and both of you take 20% off the next renewal.', badge: 'Referral', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.25)', color: '#f43f5e' },
    { icon: HandshakeIcon, label: 'Trust and group rate', desc: 'Three or more schools under one management: 25% off each, one invoice, one onboarding team.', badge: 'Group', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)', color: '#8b5cf6' },
    { icon: AccountBalanceIcon, label: 'Government and aided', desc: '40% off for schools that can show recognition or aid status. Send the details and we will confirm.', badge: 'Verified rate', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#10b981' },
];

const WHY_EDUANANT = [
    {
        label: 'Thirty days before you are invoiced',
        desc: 'Long enough to cross a fee cycle and a full week of attendance, which is where school software usually falls over. Walk away at day 30 and you owe nothing.',
    },
    {
        label: 'Nothing sits behind a paywall',
        desc: 'HR, Library, Reception, Transport and the parent app are in the base price. Schools switching to us usually arrive from a product where half of that was quoted as an extra.',
    },
    {
        label: 'You pay for your actual size',
        desc: 'A 200-student school should not be billed like a 2,000-student one. You pay for the students on your roll at the rate for your size, and nothing else.',
    },
    {
        label: 'No cloud subscription underneath it',
        desc: 'The software runs on your hardware. Stop paying us and the database is still on your own machine, in standard PostgreSQL you can export.',
    },
];

/**
 * Set against the two shapes the market actually comes in, not against a named
 * vendor. Deliberately qualitative: the rupee figures a principal is comparing us
 * against are on their quote, not ours, which is why the note under the table asks
 * for it. Claims about another vendor's prices would need substantiating and would
 * go stale; "often billed separately" stays true and stays defensible.
 */
type Cell = { status: 'success' | 'warning' | 'error'; text: string };
const COMPARISON: { feature: string; eduanant: Cell; budget: Cell; legacy: Cell }[] = [
    {
        feature: 'Year one setup and training',
        eduanant: { status: 'success', text: 'Free, included' },
        budget: { status: 'warning', text: 'Often a separate onboarding fee' },
        legacy: { status: 'error', text: 'Implementation quoted on top' },
    },
    {
        feature: 'Core modules like HR and Library',
        eduanant: { status: 'success', text: 'All 16 from day one' },
        budget: { status: 'error', text: 'Held back for a premium tier' },
        legacy: { status: 'error', text: 'Sold as priced add-ons' },
    },
    {
        feature: 'Parent and teacher apps',
        eduanant: { status: 'success', text: 'Included, with push alerts' },
        budget: { status: 'warning', text: 'Often billed separately' },
        legacy: { status: 'error', text: 'Carries its own maintenance fee' },
    },
    {
        feature: 'Where the database sits',
        eduanant: { status: 'success', text: 'Your building, or a server we run for you alone' },
        budget: { status: 'error', text: 'A shared multi-tenant cloud' },
        legacy: { status: 'error', text: "The vendor's own servers" },
    },
    {
        feature: 'The day the line goes down',
        eduanant: { status: 'success', text: 'Keeps working if installed in school' },
        budget: { status: 'error', text: 'Front desk stops with it' },
        legacy: { status: 'error', text: 'Front desk stops with it' },
    },
    {
        feature: 'Alerts to parents',
        eduanant: { status: 'success', text: 'No per-message fee' },
        budget: { status: 'error', text: 'Message packs billed on top' },
        legacy: { status: 'error', text: 'Message packs billed on top' },
    },
    {
        feature: 'Server to run it on',
        eduanant: { status: 'success', text: `A school PC, or Rs ${inr(HOSTING_ANNUAL)} a year managed` },
        budget: { status: 'error', text: 'Built into every monthly bill' },
        legacy: { status: 'error', text: 'A hosting package to buy' },
    },
    {
        feature: 'What changes by year three',
        eduanant: { status: 'success', text: 'The published rate, no maintenance charge' },
        budget: { status: 'warning', text: 'Tier upgrades as the school grows' },
        legacy: { status: 'error', text: 'Annual maintenance on top of licence' },
    },
    {
        feature: 'Trying it first',
        eduanant: { status: 'success', text: '30 days, no invoice' },
        budget: { status: 'warning', text: 'Usually behind a sales call' },
        legacy: { status: 'error', text: 'A pilot, after a contract' },
    },
    {
        feature: 'Who answers when it breaks',
        eduanant: { status: 'success', text: 'The people who built it' },
        budget: { status: 'error', text: 'A ticket queue' },
        legacy: { status: 'warning', text: 'An account manager, or a partner' },
    },
];


/**
 * Size bands — so a director finds their school in one row rather than doing
 * arithmetic in a meeting. Billing underneath is still per student, which is why
 * each row is a range: a school at the bottom of a band pays the bottom of it.
 */
/**
 * The two arguments a principal actually weighs after the table: what else lands on
 * the invoice, and why software installed on their own machine carries a yearly fee
 * at all. Both come up in every sales conversation; neither was anywhere on the site.
 */
function ValueCase() {
    return (
        <div className="container mx-auto px-6 max-w-5xl mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {[
                    {
                        icon: ReceiptLongIcon,
                        title: 'No surprise invoice in October',
                        body: `A quote you compare us against may not include onboarding, the message pack, or the tier that unlocks HR. Ours does. One line on the budget, fixed for the year, worked out from your roll and the rate for your size, with GST the only thing added.`,
                    },
                    {
                        icon: DnsIcon,
                        title: 'The front desk never waits for a page',
                        body: 'Installed in school, the software is on the same network as the people using it. Fee week does not stop because the broadband is down, and a counter that keeps taking receipts through an outage pays for a good deal of software.',
                    },
                    {
                        icon: AccountBalanceIcon,
                        title: 'The server is a PC you already own',
                        body: `There is no hosting package to buy unless you want one. If you would rather not run it yourself, we will, for Rs ${inr(HOSTING_ANNUAL)} a year — and that is the whole of it, not a platform fee that grows with your roll.`,
                    },
                ].map((c, i) => (
                    <motion.div key={c.title}
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.35 }}
                        className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-5 shadow-sm">
                        <c.icon className="w-6 h-6 text-[var(--accent-text)] mb-3" />
                        <h3 className="font-display text-base font-extrabold text-text-primary mb-2">{c.title}</h3>
                        <p className="text-xs text-text-secondary leading-relaxed">{c.body}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-6 sm:p-7 shadow-sm">
                <h3 className="font-display text-lg font-extrabold text-text-primary mb-3">
                    Why a yearly fee for software that runs on your own machine
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    It is a fair question, and the honest answer is that the two older models each got half of it
                    right. Offline software used to arrive on a disc, work well, and quietly go stale — no new board
                    circular, no new report format, no one to call. Cloud software fixed that and took the database
                    in exchange, so leaving meant leaving your own records behind.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                    The fee buys the first half without the second: the circulars and formats kept current, the
                    updates applied for you, and people who answer the phone — on an install that is still yours, in
                    a database you can export this afternoon. Stop paying and the software stops; the data does not
                    go anywhere. You can see what that has actually meant on the{' '}
                    <Link to="/updates" className="font-semibold text-[var(--accent-text)] hover:underline">
                        release history
                    </Link>.
                </p>
            </motion.div>
        </div>
    );
}

function DeploymentModes() {
    return (
        <div className="container mx-auto px-6 max-w-5xl mb-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-center mb-8">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-3">Where it runs</p>
                <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                    One product, three ways to install it
                </h2>
                <p className="text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
                    The same build and the same 16 modules in every case. You choose where the database lives, and
                    you can move between these later without changing software — a school that starts on one PC can
                    be on the school network next term, or hosted by us the term after.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEPLOYMENT_MODES.map((mode, i) => (
                    <motion.div key={mode.key}
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.35 }}
                        className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-5 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <h3 className="font-display text-base font-extrabold text-text-primary">{mode.name}</h3>
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${
                                mode.cost === 0
                                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                                    : 'text-[var(--accent-text)] bg-[var(--accent-text)]/10'
                            }`}>
                                {mode.cost === 0 ? 'No hosting fee' : `\u20b9${inr(mode.cost)} a year`}
                            </span>
                        </div>

                        <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1">{mode.blurb}</p>

                        <dl className="space-y-2 text-xs border-t border-gray-200/40 dark:border-white/5 pt-3">
                            <div className="flex gap-2">
                                <dt className="text-text-secondary shrink-0 w-20">You provide</dt>
                                <dd className="font-semibold text-text-primary">{mode.needs}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="text-text-secondary shrink-0 w-20">Worth knowing</dt>
                                <dd className="font-semibold text-text-primary">{mode.limit}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="text-text-secondary shrink-0 w-20">Suits</dt>
                                <dd className="font-semibold text-text-primary">{mode.bestFor}</dd>
                            </div>
                        </dl>
                    </motion.div>
                ))}
            </div>

            <p className="text-xs text-text-secondary text-center mt-4 max-w-2xl mx-auto leading-relaxed">
                In the first two the database never leaves your building, and it stays standard PostgreSQL you can
                export whenever you like. In the third it sits on a server we run for your school alone.
            </p>
        </div>
    );
}

/** One cell of the comparison grid. Shared by the desktop table and the phone cards
 *  so the two can never drift apart. */
function StatusCell({ cell, strong = false }: { cell: Cell; strong?: boolean }) {
    return (
        <div className={`flex items-start gap-2 text-xs font-semibold ${strong ? 'text-text-primary' : 'text-text-secondary'}`}>
            {cell.status === 'success' && <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-px" />}
            {cell.status === 'warning' && <WarningAmberIcon className="w-4 h-4 text-amber-500 shrink-0 mt-px" />}
            {cell.status === 'error' && <CancelIcon className="w-4 h-4 text-red-500 shrink-0 mt-px" />}
            <span>{cell.text}</span>
        </div>
    );
}

function SizeBandTable() {
    return (
        <div className="max-w-3xl mx-auto mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center mb-7">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-3">Find your school</p>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white">
                    What it comes to, by size
                </h3>
            </motion.div>

            <div className="rounded-3xl border border-slate-200/70 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden shadow-sm">
                <div className="grid grid-cols-5 gap-2 px-5 sm:px-6 py-3 bg-slate-50 dark:bg-white/[0.04] border-b border-slate-200/70 dark:border-white/10">
                    <span className="col-span-2 text-[10px] font-black uppercase tracking-wider text-text-secondary">School size</span>
                    <span className="col-span-2 text-[10px] font-black uppercase tracking-wider text-text-secondary text-right">Licence, per year</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary text-right">Per student</span>
                </div>

                {SIZE_BANDS.map((band, i) => (
                    <motion.div key={band.label}
                        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        className="grid grid-cols-5 gap-2 items-center px-5 sm:px-6 py-3.5 border-b border-slate-100 dark:border-white/[0.06]">
                        <span className="col-span-2 text-sm font-bold text-text-primary">{band.label}</span>
                        <span className="col-span-2 text-sm font-bold text-text-primary text-right tabular-nums">
                            <span className="text-text-secondary font-medium">up to </span>₹{inr(band.upToAnnual)}
                        </span>
                        <span className="text-sm font-bold text-right tabular-nums text-[var(--brand-cyan-deep)] dark:text-[#00b6d5]">
                            ₹{effectiveRate(band.max!).toFixed(0)}
                        </span>
                    </motion.div>
                ))}

                <div className="grid grid-cols-5 gap-2 items-center px-5 sm:px-6 py-3.5">
                    <span className="col-span-2 text-sm font-bold text-text-primary">More than {inr(LARGE_SCHOOL_FROM)}</span>
                    <span className="col-span-2 text-right">
                        <Link to="/contact" className="text-sm font-bold text-[var(--brand-cyan-deep)] dark:text-[#00b6d5] hover:underline">
                            Quoted on your setup
                        </Link>
                    </span>
                    <span className="text-sm font-bold text-right tabular-nums text-[var(--brand-cyan-deep)] dark:text-[#00b6d5]">
                        from ₹{RATE_FLOOR_ANNUAL}
                    </span>
                </div>
            </div>

            <p className="text-xs text-text-secondary text-center mt-4 leading-relaxed max-w-xl mx-auto">
                Charged on the students you actually have, at the single rate for your school's size — a school of
                {' '}{inr(EXAMPLE_ROLL)} pays &#8377;{effectiveRate(EXAMPLE_ROLL)} a month for every one of them, not
                {' '}{annualRateLabel} for the first 250 and less thereafter. The licence column shows what a school
                at the top of each band pays; figures are before {Math.round(GST * 100)}% GST.
            </p>
        </div>
    );
}

function PricingCalculator() {
    const [tick, setTick] = useState(() => tickForStudents(300));
    const students = studentsAtTick(tick);
    const atCeiling = students >= SLIDER_MAX;
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
    const [managedHosting, setManagedHosting] = useState(false);
    const [founding, setFounding] = useState(true);

    // One source for every figure below — see quoteFor() in src/data/pricing.ts.
    // Null means the roll is past the published bands, which renders the quote panel.
    const q = quoteFor({ students, cycle: billing, founding, managedHosting });
    const isEnterprise = q === null;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border p-8 md:p-10"
            style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.03)' }}>
            <div className="text-center mb-8">
                <p className="text-xs font-black uppercase tracking-widest mb-2 inline-flex items-center gap-1.5" style={{ color: 'var(--accent-text)' }}>
                    <CalculateIcon className="w-3.5 h-3.5" /> Work out your number
                </p>
                <h3 className="text-2xl font-black text-text-primary mt-1">What would this cost my school?</h3>
                <p className="text-sm text-text-secondary mt-1">Drag the slider to your student count. Every figure below covers a full year, so the two billing cycles compare fairly.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <div className="flex justify-between text-xs text-text-secondary mb-2">
                        <span>{inr(SLIDER_MIN)}</span>
                        <span className="font-black text-text-primary text-base">
                            {inr(students)}{atCeiling ? '+' : ''} students
                        </span>
                        <span>{inr(SLIDER_MAX)}+</span>
                    </div>
                    <input type="range" min={0} max={SLIDER_TICKS} step={1} value={tick}
                        aria-label="Number of students"
                        aria-valuetext={`${inr(students)}${atCeiling ? ' or more' : ''} students`}
                        onChange={e => setTick(Number(e.target.value))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: '#F59E0B' }} />
                </div>

                {isEnterprise ? (
                    <div className="text-center p-8 rounded-2xl border" style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
                        <p className="text-lg font-black text-text-primary mb-1">Above {inr(ENTERPRISE_ABOVE)} students we quote it properly</p>
                        <p className="text-sm text-text-secondary mb-5">At this size the server sizing, the volume of data to migrate and the training plan all change. Better to look at your actual setup than guess a number here.</p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.03 }} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4" /> Ask for a quote
                            </motion.button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Billing cycle</label>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100/50 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-xl">
                                    <button type="button" onClick={() => setBilling('monthly')}
                                        className={`py-2 rounded-lg text-xs font-bold transition-all ${billing === 'monthly' ? 'bg-white dark:bg-white/10 text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                                        Monthly
                                    </button>
                                    <button type="button" onClick={() => setBilling('annual')}
                                        className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${billing === 'annual' ? 'bg-white dark:bg-white/10 text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                                        Annual
                                        <span className="text-[9px] font-black px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-sans">-{ANNUAL_SAVING_PCT}%</span>
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] cursor-pointer">
                                <input type="checkbox" checked={founding} onChange={e => setFounding(e.target.checked)}
                                    className="mt-0.5 cursor-pointer" style={{ accentColor: '#f59e0b' }} />
                                <span>
                                    <span className="block text-xs font-black text-text-primary">Founding 10 rate</span>
                                    <span className="block text-[11px] text-text-secondary leading-snug">Half price for year one, onboarding waived. Ten schools only.</span>
                                </span>
                            </label>

                            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] cursor-pointer">
                                <input type="checkbox" checked={managedHosting} onChange={e => setManagedHosting(e.target.checked)}
                                    className="mt-0.5 cursor-pointer" style={{ accentColor: '#F59E0B' }} />
                                <span>
                                    <span className="block text-xs font-black text-text-primary">We host it for you</span>
                                    <span className="block text-[11px] text-text-secondary leading-snug">Rs {inr(HOSTING_ANNUAL)} a year. Leave this unticked if you have a PC or server at school.</span>
                                </span>
                            </label>
                        </div>

                        <div className="bg-white/95 dark:bg-[#141B2D]/95 border border-[#F59E0B]/20 p-5 rounded-2xl space-y-3.5 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/5 rounded-full blur-xl pointer-events-none" />
                            <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-text)] border-b border-gray-100 dark:border-white/5 pb-2 flex items-center justify-between">
                                <span>Your first year</span>
                                <span>{billing === 'annual' ? 'Paid yearly' : 'Paid monthly'}</span>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">
                                        Software ({inr(students)} students &times; &#8377;{q!.rate}/mo)
                                    </span>
                                    <span className="font-semibold text-text-primary">&#8377;{inr(q!.listLicence)}</span>
                                </div>
                                {founding && (
                                    <div className="flex justify-between text-[#f59e0b] font-semibold">
                                        <span>Founding 10, half off year one</span>
                                        <span>&minus;&#8377;{inr(q!.foundingDiscount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Onboarding, migration and training</span>
                                    <span className="font-semibold text-text-primary">{q!.onboarding ? `₹${inr(q!.onboarding)}` : 'Free'}</span>
                                </div>
                                {managedHosting && (
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Managed hosting</span>
                                        <span className="font-semibold text-text-primary">&#8377;{inr(q!.hosting)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-dashed border-gray-100 dark:border-white/5 pt-2">
                                    <span className="text-text-secondary">GST at 18%</span>
                                    <span className="font-semibold text-text-primary">&#8377;{inr(q!.gst)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200/50 dark:border-white/10 pt-3 flex items-end justify-between gap-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-text-secondary">First year, all in</p>
                                    <p className="text-2xl font-black text-text-primary">&#8377;{inr(q!.firstYear)}</p>
                                    <p className="text-[11px] text-text-secondary mt-0.5">
                                        about &#8377;{q!.perStudentMonth.toFixed(0)} per student a month
                                    </p>
                                </div>
                                <Link to="/contact">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="btn-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0">
                                        Start the 30 days <ArrowForwardIcon className="w-3.5 h-3.5" />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <p className="text-center text-xs text-text-secondary font-medium">
                    An estimate, not a quote. Group, government and referral rates are settled on a call, and none of them stack with the founding rate.
                </p>
            </div>
        </motion.div>
    );
}

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
    const ratePerStudent = billing === 'annual' ? RATE_ANNUAL : RATE_MONTHLY;

    return (
        <>
            <Seo {...PAGE_SEO.pricing} schema={[softwareSchema]} crumbs={[{ name: 'Pricing', path: '/pricing' }]} />
            <div className="pt-14 pb-24 relative">
                <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                            style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                            <CurrencyRupeeIcon className="w-3.5 h-3.5" /> One plan, priced by school size
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                            Priced per student,<br />
                            <span className="brand-text-gradient">not per feature.</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            {annualRateLabel} per student a month, billed annually. All 16 modules, every portal, unlimited staff accounts.
                            Run your school on it for 30 days before we send an invoice.
                        </p>
                    </motion.div>
                </div>

                {/* Founding 10 — the reason to move now */}
                <div className="container mx-auto px-6 max-w-5xl mb-16">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="rounded-3xl border p-7 md:p-9"
                        style={{ borderColor: 'rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.05)' }}>
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex items-center gap-4 md:w-1/3">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.15)' }}>
                                    <WorkspacePremiumIcon className="w-6 h-6" style={{ color: '#f59e0b' }} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Open now</p>
                                    <h2 className="text-2xl font-black text-text-primary leading-tight">Founding 10</h2>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                    We are looking for ten schools to build the next year of this product with. You get half price for
                                    year one and renewal rates locked for life. In return we ask for a reference call,
                                    a line we can quote once you have lived with it for two months, and your name on this website.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        'Half price, first year',
                                        'Renewal rates locked for life',
                                        'Onboarding and training free',
                                    ].map(t => (
                                        <div key={t} className="flex items-start gap-2 text-xs font-semibold text-text-primary">
                                            <CheckCircleIcon className="w-4 h-4 shrink-0" style={{ color: '#f59e0b' }} />
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 max-w-6xl mb-8">
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setBilling('monthly')}
                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${billing === 'monthly' ? 'btn-primary shadow-lg shadow-[#F59E0B]/20' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                            Monthly
                        </button>
                        <button onClick={() => setBilling('annual')}
                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border ${billing === 'annual' ? 'btn-primary shadow-lg shadow-[#F59E0B]/20' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                            Annual
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full font-sans transition-all"
                                style={{
                                    background: billing === 'annual' ? 'rgba(255,255,255,0.25)' : 'rgba(52,211,153,0.2)',
                                    color: billing === 'annual' ? '#ffffff' : '#10b981'
                                }}>
                                Save {ANNUAL_SAVING_PCT}%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-5xl mb-14">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-3xl p-8 md:p-12 border border-[#F59E0B]/30 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm shadow-[0_0_60px_rgba(245,158,11,0.15)] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1E1B4B] via-[#F59E0B] to-purple-600" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#1E1B4B] to-[#F59E0B] uppercase tracking-wider mb-4">
                                        <AutoAwesomeIcon className="w-3 h-3" /> Full suite
                                    </span>
                                    <h2 className="text-3xl font-black text-text-primary mb-2">EduAnant Unlimited</h2>
                                    <p className="text-sm text-text-secondary">
                                        The whole product, whatever your size. One plan, because we do not keep a better
                                        version of it behind a paywall.
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl border border-[#F59E0B]/15 bg-[#F59E0B]/5">
                                    <p className="text-xs font-bold text-text-secondary mb-1">Rate</p>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-4xl font-black brand-text-gradient">&#8377;{ratePerStudent}</span>
                                        <span className="text-sm text-text-secondary font-semibold">/ student / month</span>
                                    </div>
                                    <p className="text-[11px] text-text-secondary mt-1.5">
                                        {billing === 'annual'
                                            ? `₹${inr(RATE_ANNUAL * 12)} per student a year, paid once — ${ANNUAL_SAVING_PCT}% less than the monthly rate.`
                                            : `₹${inr(RATE_MONTHLY * 12)} per student a year. Switch to annual and it is ₹${inr(RATE_ANNUAL * 12)}.`}
                                    </p>
                                    <p className="text-[11px] text-text-secondary mt-1">
                                        Billed on your actual roll &middot; 18% GST extra
                                    </p>
                                </div>

                                <Link to="/contact" className="block w-full">
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="w-full btn-primary py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/20">
                                        <PhoneIcon className="w-4 h-4" /> Start your 30 days <ArrowForwardIcon className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </div>

                            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-gray-200/50 dark:border-white/10 lg:pl-8 pt-8 lg:pt-0 flex flex-col justify-center">
                                <p className="text-xs font-black uppercase tracking-widest text-[var(--accent-text)] mb-4">What you get</p>
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
                        style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-gray-200/20 shadow-sm">
                                <BusinessIcon className="w-6 h-6 text-[var(--accent-text)]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-text-primary">Large schools, trusts and groups</h3>
                                <p className="text-sm text-text-secondary font-medium">Above {inr(CONTACT_SALES_ABOVE)} students &middot; Several schools under one management</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <p className="text-sm text-text-secondary font-semibold">Quoted on your actual setup</p>
                            <Link to="/contact">
                                <motion.button whileHover={{ scale: 1.04 }} className="btn-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                                    <PhoneIcon className="w-4 h-4" /> Talk to us
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 max-w-4xl mb-20">
                    <SizeBandTable />

                    <PricingCalculator />
                </div>

                <div className="container mx-auto px-6 max-w-5xl mb-20">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-2xl font-black text-text-primary text-center mb-2">
                        What the price does not cover
                    </motion.h2>
                    <p className="text-sm text-text-secondary text-center mb-8 max-w-xl mx-auto">
                        {capitalise(countOf(NOT_INCLUDED.length, 'thing'))}{' '}
                        {NOT_INCLUDED.length === 1 ? 'sits' : 'sit'} outside the licence.
                        Better you read them here than meet them on an invoice.
                    </p>
                    <div className={`grid grid-cols-1 gap-4 mx-auto ${NOT_INCLUDED.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl' : 'sm:grid-cols-2 max-w-3xl'}`}>
                        {NOT_INCLUDED.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={item.label}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                                    <Icon className="w-6 h-6 mb-3" style={{ color: 'var(--accent-text)' }} />
                                    <p className="font-black text-text-primary text-sm mb-1.5">{item.label}</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-6xl mb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-3 mb-5">
                            <AutoAwesomeIcon className="w-4 h-4 text-amber-400" />
                            <p className="text-sm font-black uppercase tracking-widest text-text-secondary">Ways to pay less</p>
                            <div className="flex-1 h-px bg-gray-200/40 dark:bg-white/10" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {EARLY_OFFERS.map((offer, i) => {
                                const Icon = offer.icon;
                                return (
                                    <motion.div key={offer.label}
                                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl border bg-white/50 dark:bg-white/[0.01]"
                                        style={{ borderColor: offer.border }}>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${offer.color}15` }}>
                                            <Icon className="w-5 h-5" style={{ color: offer.color }} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-0.5">
                                                <p className="text-sm font-black text-text-primary min-w-0">{offer.label}</p>
                                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap mt-0.5"
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
                            One per school, and none of them stack. Tell us which fits and we will apply it.
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 max-w-5xl mb-20">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-2xl font-black text-text-primary text-center mb-10">
                        Why the deal is shaped this way
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

                <DeploymentModes />

                <div className="container mx-auto px-6 max-w-5xl mb-16">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-center mb-8">
                        <h2 className="text-2xl font-black text-text-primary mb-3">
                            The starting price is rarely the finishing price
                        </h2>
                        <p className="text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            School software tends to arrive in one of two shapes: a cheap per-student app that bills
                            for the parts you assumed were included, or an enterprise suite quoted as one large number
                            with maintenance after it. Here is where the money actually goes in each.
                        </p>
                    </motion.div>

                    {/* Desktop: EduAnant sits second, not last, so it is never the column that
                        scrolls off the edge on a narrow screen. */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="hidden md:block rounded-3xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] shadow-xl overflow-hidden">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="border-b border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                                    <th className="w-[25%] p-4 text-xs font-black uppercase tracking-wider text-text-secondary">What it costs you</th>
                                    <th className="w-[27%] p-4 text-xs font-black uppercase tracking-wider text-[var(--accent-text)] border-l border-gray-200/5 dark:border-white/5 bg-[var(--accent-text)]/[0.04]">EduAnant Unlimited</th>
                                    <th className="w-[24%] p-4 text-xs font-black uppercase tracking-wider text-text-secondary border-l border-gray-200/5 dark:border-white/5">A budget cloud app</th>
                                    <th className="w-[24%] p-4 text-xs font-black uppercase tracking-wider text-text-secondary border-l border-gray-200/5 dark:border-white/5">A legacy enterprise ERP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row, i) => (
                                    <tr key={row.feature}
                                        className={`hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors ${i !== COMPARISON.length - 1 ? 'border-b border-gray-200/30 dark:border-white/5' : ''}`}>
                                        <td className="p-4 text-xs font-semibold text-text-secondary lg:text-sm align-top">{row.feature}</td>
                                        <td className="p-4 border-l border-gray-200/5 dark:border-white/5 bg-[var(--accent-text)]/[0.04] align-top">
                                            <StatusCell cell={row.eduanant} strong />
                                        </td>
                                        <td className="p-4 border-l border-gray-200/5 dark:border-white/5 align-top">
                                            <StatusCell cell={row.budget} />
                                        </td>
                                        <td className="p-4 border-l border-gray-200/5 dark:border-white/5 align-top">
                                            <StatusCell cell={row.legacy} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* Phones: one card per row. A four-column table cannot be read at 375px,
                        and squeezing it only produces a column of single words. */}
                    <div className="md:hidden space-y-3">
                        {COMPARISON.map((row, i) => (
                            <motion.div key={row.feature}
                                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: Math.min(i * 0.04, 0.2), duration: 0.3 }}
                                className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-4 shadow-sm">
                                <p className="text-xs font-black uppercase tracking-wider text-text-secondary mb-3">{row.feature}</p>
                                <div className="rounded-xl bg-[var(--accent-text)]/[0.06] px-3 py-2.5 mb-2">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-[var(--accent-text)] mb-1">EduAnant</p>
                                    <StatusCell cell={row.eduanant} strong />
                                </div>
                                <div className="px-3 py-1.5">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-text-secondary mb-1">A budget cloud app</p>
                                    <StatusCell cell={row.budget} />
                                </div>
                                <div className="px-3 py-1.5">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-text-secondary mb-1">A legacy enterprise ERP</p>
                                    <StatusCell cell={row.legacy} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-xs text-text-secondary text-center mt-4 max-w-2xl mx-auto leading-relaxed">
                        Terms vary by vendor and by tier, and these are the patterns we see rather than any one
                        company's price list. Bring us a quote you have been given and we will go through it line by line.
                    </p>
                </div>

                <ValueCase />

                <div className="container mx-auto px-6 max-w-4xl mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-6"
                        style={{ borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.04)' }}>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-gray-200/20 shadow-sm">
                            <AccountBalanceIcon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-black text-text-primary mb-1">Government and aided schools</h3>
                            <p className="text-sm text-text-secondary leading-relaxed font-medium">
                                40% off everything above, for schools that can show recognition or aid status.
                                The product is identical; only the invoice changes.
                            </p>
                        </div>
                        <Link to="/contact" className="shrink-0">
                            <motion.button whileHover={{ scale: 1.04 }}
                                className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 border"
                                style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10b981' }}>
                                <SchoolIcon className="w-4 h-4" /> Apply for this rate
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="p-10 rounded-3xl border"
                        style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}>
                        <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--accent-text)' }}>Still weighing it up?</p>
                        <h3 className="text-3xl font-black text-text-primary mb-4">Start with the thirty days</h3>
                        <p className="text-text-secondary mb-8 font-medium">
                            Installation, data migration and staff training happen first. The invoice comes only once
                            you have decided to keep it.
                        </p>
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                                className="btn-primary px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2">
                                Book a walkthrough <ArrowForwardIcon className="w-5 h-5" />
                            </motion.button>
                        </Link>
                        <p className="text-xs text-text-secondary mt-4 font-semibold">We reply within 24 hours</p>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
