import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// MUI Icons
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LockIcon from '@mui/icons-material/Lock';

const DEMO_ROLES = [
    {
        id: 'admin',
        role: 'System Administrator',
        icon: ShieldIcon,
        description: 'Complete override controls. Set up school metadata, manage academic sessions, configure system parameters, and oversee security logs.',
        username: 'admin@eduanant.cloud',
        password: 'Admin@123',
        color: 'from-blue-600 to-indigo-600',
        textColor: 'text-indigo-400 dark:text-indigo-300',
        bgColor: 'rgba(99, 102, 241, 0.08)',
        features: ['Manage Academic Sessions', 'System Security & Logs', 'User Role Configurations', 'Database Snapshots & backups']
    },
    {
        id: 'principal',
        role: 'School Principal',
        icon: VerifiedUserIcon,
        description: 'High-level academic and operations dashboard. Configure circular notices, view leaves requests, inspect class tests schedules, and manage PTMs.',
        username: 'principal@eduanant.cloud',
        password: 'Demo@1234',
        color: 'from-purple-600 to-pink-600',
        textColor: 'text-pink-400 dark:text-pink-300',
        bgColor: 'rgba(236, 72, 153, 0.08)',
        features: ['Circular Announcements', 'Teacher Leaves Approval', 'PTM Scheduling & Slots', 'Student Awards & Recognitions']
    },
    {
        id: 'teacher',
        role: 'Class Teacher',
        icon: SchoolIcon,
        description: 'Daily teaching workflows. Mark student attendance, manage lesson plans, upload class assignments, track curriculum, and enter marks.',
        username: 'teacher.math@eduanant.cloud',
        password: 'Demo@1234',
        color: 'from-emerald-600 to-teal-600',
        textColor: 'text-teal-400 dark:text-teal-300',
        bgColor: 'rgba(20, 184, 166, 0.08)',
        features: ['Attendance Grid marking', 'Lesson Planning & TIM', 'Homework Assignments', 'Quarterly/Annual Marks Entry']
    },
    {
        id: 'accountant',
        role: 'School Accountant',
        icon: AccountBalanceWalletIcon,
        description: 'Financial accounting dashboard. Manage fee categories, generate class fee demand bills, record collection payments, and issue receipts.',
        username: 'accountant@eduanant.cloud',
        password: 'Demo@1234',
        color: 'from-amber-600 to-orange-600',
        textColor: 'text-amber-400 dark:text-amber-300',
        bgColor: 'rgba(245, 158, 11, 0.08)',
        features: ['Fee Structure definitions', 'Demand Bill batch generation', 'Split & advance payments', 'Printable Fee Receipts']
    },
    {
        id: 'receptionist',
        role: 'Front Desk Executive',
        icon: AssignmentIcon,
        description: 'First point of contact. Record admission inquiries, log visitors checking, manage staff appointments, and register student gate pass checkouts.',
        username: 'receptionist@eduanant.cloud',
        password: 'Demo@1234',
        color: 'from-cyan-600 to-sky-600',
        textColor: 'text-cyan-400 dark:text-cyan-300',
        bgColor: 'rgba(14, 165, 233, 0.08)',
        features: ['Enquiry Pipeline tracker', 'Visitor check-in & passes', 'Appointment Manager', 'Gate Pass movement logger']
    },
    {
        id: 'student',
        role: 'Student & Parent',
        icon: PeopleIcon,
        description: 'Personalized student and guardian portal. Download homework assignments, view attendance charts, examine test results, and print report cards.',
        username: 'SID00001',
        password: 'Demo@1234',
        color: 'from-rose-600 to-red-600',
        textColor: 'text-rose-400 dark:text-rose-300',
        bgColor: 'rgba(244, 63, 94, 0.08)',
        features: ['Download Homework', 'Printable Report Cards', 'View Fee Demands & History', 'PTM Meeting notifications']
    }
];

export default function DemoPage() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(id);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="pt-28 pb-24 relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                
                {/* Hero Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                            style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                            <AutoAwesomeIcon className="w-3.5 h-3.5" /> Experience the Platform
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-6 leading-none">
                            Live Interactive<br />
                            <span className="brand-text-gradient">Real-Time Demo.</span>
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            No setup. No installations. Launch the live demo portal and sign in with any of our pre-configured role profiles to experience the latest production build of EduAnant in real time.
                        </p>
                    </motion.div>

                    {/* Launch CTA */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a 
                            href="https://demo.eduanant.cloud" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2.5 shadow-lg shadow-[#00b6d5]/20 group transition-all"
                        >
                            Launch Demo Portal <OpenInNewIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {/* Demo Info Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto p-5 rounded-2xl border mb-16 flex items-start gap-4 bg-white/50 dark:bg-white/[0.01]"
                    style={{ borderColor: 'rgba(0,182,213,0.2)' }}
                >
                    <InfoIcon className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#00b6d5' }} />
                    <div>
                        <h3 className="font-black text-text-primary mb-1 text-base">Real-Time Production Demo Environment</h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-medium">
                            The demo installation runs at <a href="https://demo.eduanant.cloud" className="font-bold text-[var(--primary-main)] hover:underline" target="_blank" rel="noopener noreferrer">demo.eduanant.cloud</a>. It represents a real-time production deployment containing mock academic records, permitting full write, edit, and print operations to experience the complete speed and offline capabilities of the platform.
                        </p>
                    </div>
                </motion.div>

                {/* Demo Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEMO_ROLES.map((role, i) => {
                        const IconComponent = role.icon;
                        return (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="rounded-3xl border border-gray-200/50 dark:border-white/10 p-6 flex flex-col bg-white/70 dark:bg-[#0c131e]/50 backdrop-blur-md shadow-lg shadow-black/5 hover:shadow-xl transition-all hover:scale-[1.01]"
                            >
                                {/* Role Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-2xl border" style={{ backgroundColor: role.bgColor, borderColor: 'rgba(0,182,213,0.1)' }}>
                                        <IconComponent className="w-6 h-6 text-[#00b6d5]" />
                                    </div>
                                    <h3 className="text-xl font-black text-text-primary">{role.role}</h3>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-text-secondary mb-6 leading-relaxed flex-grow font-medium">
                                    {role.description}
                                </p>

                                {/* Features Checklist */}
                                <div className="mb-6 space-y-2">
                                    <span className="text-xs font-bold text-text-secondary block uppercase tracking-wider mb-2">Capabilities:</span>
                                    {role.features.map((feat) => (
                                        <div key={feat} className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#00b6d5' }} />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Credentials Panel */}
                                <div className="mt-auto p-4 rounded-2xl bg-gray-100/60 dark:bg-white/[0.02] border border-gray-200/30 dark:border-white/5 space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <LockIcon className="w-3.5 h-3.5 text-text-secondary" />
                                            <span className="font-bold text-text-primary">Demo Credentials</span>
                                        </div>
                                        <a href={`https://demo.eduanant.cloud/login?username=${encodeURIComponent(role.username)}&password=${encodeURIComponent(role.password)}`} target="_blank" rel="noopener noreferrer" className="text-[#00b6d5] hover:underline flex items-center gap-1 font-bold">
                                            Log in <OpenInNewIcon className="w-3 h-3" />
                                        </a>
                                    </div>

                                    {/* Username field */}
                                    <div className="flex items-center justify-between bg-white dark:bg-black/20 p-2.5 rounded-xl border border-gray-200/40 dark:border-white/5">
                                        <div className="overflow-hidden mr-2">
                                            <span className="text-[10px] text-text-secondary block font-bold uppercase">Username</span>
                                            <span className="text-xs font-mono text-text-primary truncate block">{role.username}</span>
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(role.username, `${role.id}-user`)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-text-secondary transition-colors shrink-0"
                                            title="Copy Username"
                                        >
                                            {copiedField === `${role.id}-user` ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <ContentCopyIcon className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Password field */}
                                    <div className="flex items-center justify-between bg-white dark:bg-black/20 p-2.5 rounded-xl border border-gray-200/40 dark:border-white/5">
                                        <div className="overflow-hidden mr-2">
                                            <span className="text-[10px] text-text-secondary block font-bold uppercase">Password</span>
                                            <span className="text-xs font-mono text-text-primary truncate block">{role.password}</span>
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(role.password, `${role.id}-pass`)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-text-secondary transition-colors shrink-0"
                                            title="Copy Password"
                                        >
                                            {copiedField === `${role.id}-pass` ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <ContentCopyIcon className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Final CTA Area */}
                <div className="mt-20 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-text-primary mb-4">Ready to see it in action?</h2>
                    <p className="text-text-secondary mb-8 leading-relaxed font-medium">
                        If you have questions about custom integrations, school data import, or would like a guided demo session with our support team, we are here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <a href="https://demo.eduanant.cloud" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2">
                            Launch Live Demo <OpenInNewIcon className="w-4 h-4" />
                        </a>
                        <span className="text-text-secondary text-sm font-bold">or</span>
                        <Link to="/contact" className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/20 hover:border-[#00b6d5] text-text-primary text-sm font-bold transition-colors">
                            Request Guided Demo
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
