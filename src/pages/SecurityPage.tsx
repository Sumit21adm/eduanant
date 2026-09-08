import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Lock, Eye, EyeOff, Server, FileSearch, RefreshCw, Users, CheckCircle, ArrowRight, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../lib/seo';
import { PAGE_SEO } from '../lib/seoConfig';

const SECURITY_PILLARS = [
    {
        icon: Shield, title: 'Role-Based Access Control',
        desc: 'Every staff member in EduAnant sees only what their role allows. A teacher never sees fee records. An accountant never touches exam marks. Access boundaries are strictly enforced — at both the screen and data level.',
        points: [
            'Separate roles for Admin, Teacher, Accountant, Parent/Student',
            '96 individual permissions across 22 permission groups',
            'Tune any single permission per staff member, not just per role',
            'Create custom roles for your school\'s own designations',
            'Cannot bypass restrictions via URL or direct navigation',
            'Role and permission changes take effect immediately',
        ],
        color: 'from-[#1E1B4B] to-[#312E81]', border: 'border-[#1E1B4B]/20', bg: 'bg-[#1E1B4B]/5',
    },
    {
        icon: Lock, title: 'Two-Factor Login & Session Management',
        desc: 'Every login is authenticated through a secure, industry-standard session system, with optional two-factor authentication from any authenticator app. Sessions expire automatically and are invalidated the moment a user logs out or their role changes.',
        points: [
            'Optional two-factor authentication (authenticator app)',
            'Inactivity timeout configurable per role',
            'Forced password reset on first login',
            'Sessions invalidated immediately on logout or role change',
            'Rate limiting on login, OTP and password reset',
        ],
        color: 'from-[#312E81] to-[#F59E0B]', border: 'border-[#D97706]/20', bg: 'bg-[#D97706]/5',
    },
    {
        icon: FileSearch, title: 'Immutable Audit Trail',
        desc: 'Every action performed inside EduAnant is logged — who did it, when, and on which record. These logs cannot be modified or deleted by anyone, including the school admin. Critical for accountability and compliance.',
        points: [
            'Every action logged with timestamp and user identity',
            'Tamper-proof — no one can edit or delete logs',
            'Filterable audit history for administrators',
            'Supports accountability across all staff roles',
        ],
        color: 'from-violet-700 to-violet-500', border: 'border-violet-500/20', bg: 'bg-violet-500/5',
    },
    {
        icon: Server, title: 'Your Data, Your Server',
        desc: 'Unlike cloud-based software, EduAnant runs entirely on your own server or computer. Your student data never leaves your premises. You own it completely — no vendor can access, sell, or lock you out of it.',
        points: [
            'Runs on your own server or VPS — not a shared cloud',
            'Your database, your hardware, your control',
            'No third party can access your school\'s data',
            'Complete data ownership and sovereignty',
        ],
        color: 'from-emerald-700 to-emerald-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5',
    },
    {
        icon: Lock, title: 'Encrypted Communication',
        desc: 'All communication between the browser and your server is encrypted. No data travels in plain text. Passwords are never stored as readable text — they are protected using industry-standard security practices.',
        points: [
            'All traffic encrypted in transit',
            'Passwords stored using industry-standard hashing',
            'Secure communication enforced in production',
            'No sensitive data stored in plain text',
        ],
        color: 'from-rose-700 to-rose-500', border: 'border-rose-500/20', bg: 'bg-rose-500/5',
    },
    {
        icon: Eye, title: 'Input & API Protection',
        desc: 'Every piece of data entering EduAnant is validated before it\'s processed. Built-in protections guard against common attack vectors. Repeated failed login attempts are automatically blocked.',
        points: [
            'All inputs validated before processing',
            'Protection against injection and manipulation attacks',
            'Brute-force login protection',
            'Controlled access policies for external communication',
        ],
        color: 'from-amber-700 to-amber-500', border: 'border-amber-500/20', bg: 'bg-amber-500/5',
    },
    {
        icon: RefreshCw, title: 'Automatic Backup Before Every Update',
        desc: 'Before any software update is applied, a complete backup of your school data is automatically created. If anything goes wrong, you can restore everything in minutes. Zero risk to your data.',
        points: [
            'Full data backup created before every update',
            'Stored securely on your own server',
            'Restore in minutes if needed',
            'No update applies without a backup being confirmed',
        ],
        color: 'from-teal-700 to-teal-500', border: 'border-teal-500/20', bg: 'bg-teal-500/5',
    },
    {
        icon: EyeOff, title: 'Sensitive Data Encrypted & Masked',
        desc: 'Aadhaar, PAN, and bank account numbers on staff records are encrypted in the database and masked on screen by default. Revealing one is a deliberate, permission-gated action — and every reveal is written to the audit trail with the name of whoever asked for it.',
        points: [
            'Aadhaar, PAN & bank details encrypted at rest',
            'Masked on screen unless explicitly revealed',
            'Reveal requires a separate permission',
            'Every reveal recorded in the audit trail',
        ],
        color: 'from-sky-700 to-sky-500', border: 'border-sky-500/20', bg: 'bg-sky-500/5',
    },
    {
        icon: Users, title: 'Privacy by Design',
        desc: 'EduAnant does not collect, share, or use your school\'s data for any purpose beyond running your software. No advertising. No analytics sent out. No third-party integrations with access to your student records.',
        points: [
            'No usage data or telemetry sent externally',
            'No advertising or third-party tracking',
            'Student data never used for any other purpose',
            'Designed to respect Indian school data privacy norms',
        ],
        color: 'from-indigo-700 to-indigo-500', border: 'border-indigo-500/20', bg: 'bg-indigo-500/5',
    },
];

const COMPLIANCE = [
    { label: 'Data Ownership', value: '100% — Your server, your database' },
    { label: 'Login Security', value: 'Secure sessions + optional 2FA' },
    { label: 'Password Protection', value: 'Industry-standard hashing' },
    { label: 'Data in Transit', value: 'Fully encrypted' },
    { label: 'Audit Logging', value: 'Immutable, full trail' },
    { label: 'Third-party Data Sharing', value: 'None — ever' },
    { label: 'Brute-force Protection', value: 'Rate-limited login, OTP & reset' },
    { label: 'Staff ID Numbers', value: 'Encrypted at rest, masked on screen' },
    { label: 'Data Backup', value: 'Automatic before every update' },
];

const HEADLINE_FACTS = [
    { icon: KeyRound, value: '96', label: 'Granular permission keys' },
    { icon: Server, value: '100%', label: 'On your own server' },
    { icon: EyeOff, value: 'Zero', label: 'Third parties with access' },
];

export default function SecurityPage() {
    return (
        <>
            <Seo {...PAGE_SEO.security} schema={[]} crumbs={[{ name: 'Security', path: '/security' }]} />
            <div className="pt-14 pb-24 relative">
                {/* ── Hero ─────────────────────────────────────────────────────────
                    The nine controls used to sit in a flat table. They are the most
                    persuasive thing on this page, so they now lead as a console panel
                    that audits itself as you arrive. Navy in both themes — a console
                    surface should not change identity with the site theme. */}
                <div className="container mx-auto px-6 max-w-7xl mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                        {/* Left: the claim */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-6 text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                                style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                                <Shield className="w-3.5 h-3.5" strokeWidth={1.5} /> Enterprise-Grade Security
                            </span>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-5 leading-[1.05]">
                                Your students&apos; data is<br />
                                <span className="brand-text-gradient">safe. Always.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                EduAnant is built with security at its core — not as an afterthought.
                                Here&apos;s what that means for your school&apos;s data, in plain language.
                            </p>

                            <div className="mt-9 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
                                {HEADLINE_FACTS.map((f, i) => {
                                    const FIcon = f.icon;
                                    return (
                                        <motion.div key={f.label}
                                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                                            className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm">
                                            <FIcon className="w-4 h-4 mb-2 text-[var(--brand-cyan-deep)] dark:text-[#00b6d5]" strokeWidth={1.5} />
                                            <div className="font-display text-2xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white tabular-nums leading-none">
                                                {f.value}
                                            </div>
                                            <p className="text-[11px] text-text-secondary mt-1.5 leading-snug">{f.label}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Right: the console */}
                        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-6 relative">

                            {/* Rings pulsing out from the shield in the panel's corner.
                                Sized so a clean arc clears the panel edge instead of
                                reading as a stray line. */}
                            <div aria-hidden className="absolute -top-14 -left-14 w-56 h-56 pointer-events-none">
                                <span className="security-ring inset-0" />
                                <span className="security-ring inset-0" style={{ animationDelay: '1.15s' }} />
                                <span className="security-ring inset-0" style={{ animationDelay: '2.3s' }} />
                            </div>
                            <div aria-hidden className="absolute -bottom-16 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(0,182,213,0.22), transparent 70%)' }} />

                            <div className="relative rounded-3xl border border-white/10 shadow-2xl shadow-indigo-950/30 overflow-hidden
                                bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81]">

                                <div aria-hidden className="security-scan top-0" />

                                <div className="relative flex items-center justify-between gap-4 px-6 py-5 border-b border-white/10">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-400">Security at a glance</p>
                                            <p className="text-[11px] text-slate-400 truncate">Verified against the Release 1.4.0 build</p>
                                        </div>
                                    </div>
                                    <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400 shrink-0">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                        </span>
                                        Active
                                    </span>
                                </div>

                                <div className="relative px-6 py-2">
                                    {COMPLIANCE.map((c, i) => (
                                        <motion.div key={c.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex items-start justify-between gap-4 py-3 border-b border-white/[0.06] last:border-0">
                                            <span className="text-[13px] text-slate-400 shrink-0">{c.label}</span>
                                            <span className="flex items-center gap-2 text-[13px] font-semibold text-white text-right">
                                                <motion.span
                                                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                                                    transition={{ delay: 0.42 + i * 0.05, type: 'spring', stiffness: 420, damping: 18 }}
                                                    className="shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
                                                </motion.span>
                                                {c.value}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="relative px-6 pb-5 pt-1">
                                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                        <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#00b6d5]"
                                            initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }}
                                            transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }} />
                                    </div>
                                    <p className="mt-2.5 text-[10px] text-slate-500">
                                        {COMPLIANCE.length} controls · every EduAnant deployment
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Security pillars */}
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SECURITY_PILLARS.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <motion.div key={p.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07, duration: 0.6 }}
                                    whileHover={{ y: -4 }}
                                    className={`rounded-3xl p-7 border ${p.border} ${p.bg} bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm transition-all hover:shadow-xl`}>
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-black text-text-primary mb-3">{p.title}</h2>
                                    <p className="text-sm text-text-secondary leading-relaxed mb-5">{p.desc}</p>
                                    <ul className="space-y-2">
                                        {p.points.map(pt => (
                                            <li key={pt} className="flex items-start gap-2 text-sm text-text-secondary">
                                                <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
                        <div className="inline-block p-8 rounded-3xl border max-w-xl" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}>
                            <Shield className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--accent-text)' }} />
                            <h3 className="text-2xl font-black text-text-primary mb-3">Have specific security questions?</h3>
                            <p className="text-text-secondary text-sm mb-6">Our team is happy to walk you through how EduAnant protects your school's data — in detail, in person or over a call.</p>
                            <Link to="/contact">
                                <motion.button whileHover={{ scale: 1.04 }} className="btn-primary px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 mx-auto">
                                    Talk to our Team <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
