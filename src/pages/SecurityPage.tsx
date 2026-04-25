import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, FileSearch, RefreshCw, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SECURITY_PILLARS = [
    {
        icon: Shield, title: 'Role-Based Access Control',
        desc: 'Every staff member in EduAnant sees only what their role allows. A teacher never sees fee records. An accountant never touches exam marks. Access boundaries are strictly enforced — at both the screen and data level.',
        points: [
            'Separate roles for Admin, Teacher, Accountant, Parent/Student',
            'Module-level access — read, write, or no access',
            'Cannot bypass restrictions via URL or direct navigation',
            'Role changes take effect immediately across all sessions',
        ],
        color: 'from-[#17305a] to-[#0f6187]', border: 'border-[#17305a]/20', bg: 'bg-[#17305a]/5',
    },
    {
        icon: Lock, title: 'Secure Login & Session Management',
        desc: 'Every login is authenticated through a secure, industry-standard session system. Sessions expire automatically and are invalidated the moment a user logs out or their role changes.',
        points: [
            'Secure, time-limited login sessions',
            'Auto logout after inactivity',
            'Sessions invalidated immediately on logout or role change',
            'No shared or persistent login vulnerabilities',
        ],
        color: 'from-[#0f6187] to-[#00b6d5]', border: 'border-[#0091b8]/20', bg: 'bg-[#0091b8]/5',
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
    { label: 'Login Security', value: 'Secure, time-limited sessions' },
    { label: 'Password Protection', value: 'Industry-standard hashing' },
    { label: 'Data in Transit', value: 'Fully encrypted' },
    { label: 'Audit Logging', value: 'Immutable, full trail' },
    { label: 'Third-party Data Sharing', value: 'None — ever' },
    { label: 'Brute-force Protection', value: 'Built-in' },
    { label: 'Data Backup', value: 'Automatic before every update' },
];

export default function SecurityPage() {
    return (
        <div className="pt-28 pb-24 relative">
            <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Shield className="w-3.5 h-3.5" /> Enterprise-Grade Security
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Your students' data is<br />
                        <span className="brand-text-gradient">safe. Always.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        EduAnant is built with security at its core — not as an afterthought. Here's what that means for your school's data, in plain language.
                    </p>
                </motion.div>

                {/* Compliance summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mt-12 max-w-3xl mx-auto rounded-3xl border overflow-hidden"
                    style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                    <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(0,182,213,0.15)' }}>
                        <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#00b6d5' }}>Security at a glance</p>
                    </div>
                    <div className="divide-y" style={{ borderColor: 'rgba(0,182,213,0.08)' }}>
                        {COMPLIANCE.map(c => (
                            <div key={c.label} className="flex items-center justify-between px-6 py-3.5">
                                <span className="text-sm text-text-secondary font-medium">{c.label}</span>
                                <span className="flex items-center gap-2 text-sm font-bold text-text-primary">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {c.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
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
                    <div className="inline-block p-8 rounded-3xl border max-w-xl" style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                        <Shield className="w-10 h-10 mx-auto mb-4" style={{ color: '#00b6d5' }} />
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
    );
}
