import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// MUI Icons
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Seo from '../lib/seo';
import DemoRequestForm from '../components/DemoRequestForm';
import { PAGE_SEO } from '../lib/seoConfig';

const DEMO_ROLES = [
    {
        id: 'admin',
        role: 'System Administrator',
        icon: ShieldIcon,
        description: 'Runs the whole system. Academic sessions, school details, user roles, backups and the security log.',
        color: 'from-blue-600 to-indigo-600',
        textColor: 'text-indigo-400 dark:text-indigo-300',
        bgColor: 'rgba(99, 102, 241, 0.08)',
        features: ['Manage Academic Sessions', 'System Security & Logs', 'User Role Configurations', 'Backups and restore']
    },
    {
        id: 'principal',
        role: 'School Principal',
        icon: VerifiedUserIcon,
        description: 'The overview a head of school wants: notices, staff leave approvals, class tests and parent meetings.',
        color: 'from-purple-600 to-pink-600',
        textColor: 'text-pink-400 dark:text-pink-300',
        bgColor: 'rgba(236, 72, 153, 0.08)',
        features: ['Notices to classes', 'Staff leave approvals', 'Parent meeting slots', 'Awards and recognition']
    },
    {
        id: 'teacher',
        role: 'Class Teacher',
        icon: SchoolIcon,
        description: 'A teacher\'s day: attendance, homework, lesson plans, curriculum progress and marks entry.',
        color: 'from-emerald-600 to-teal-600',
        textColor: 'text-teal-400 dark:text-teal-300',
        bgColor: 'rgba(20, 184, 166, 0.08)',
        features: ['Attendance in one screen', 'Lesson plans and diary', 'Homework posting', 'Marks entry']
    },
    {
        id: 'accountant',
        role: 'School Accountant',
        icon: AccountBalanceWalletIcon,
        description: 'The fee counter: heads and structures, demand bills for a whole class, collection and receipts.',
        color: 'from-amber-600 to-orange-600',
        textColor: 'text-amber-400 dark:text-amber-300',
        bgColor: 'rgba(245, 158, 11, 0.08)',
        features: ['Fee structures', 'Demand bills in bulk', 'Split and advance payments', 'Printed receipts']
    },
    {
        id: 'receptionist',
        role: 'Front Desk Executive',
        icon: AssignmentIcon,
        description: 'The front desk: admission enquiries, visitors, appointments and students leaving early.',
        color: 'from-cyan-600 to-sky-600',
        textColor: 'text-cyan-400 dark:text-cyan-300',
        bgColor: 'rgba(14, 165, 233, 0.08)',
        features: ['Enquiry follow-ups', 'Visitor check-in', 'Appointments', 'Gate passes']
    },
    {
        id: 'student',
        role: 'Student & Parent',
        icon: PeopleIcon,
        description: 'What a parent sees at home: homework, attendance, results, fees and report cards.',
        color: 'from-rose-600 to-red-600',
        textColor: 'text-rose-400 dark:text-rose-300',
        bgColor: 'rgba(244, 63, 94, 0.08)',
        features: ['Homework', 'Report cards', 'Fees and payment history', 'Parent meeting alerts']
    }
];

export default function DemoPage() {
    return (
        <>
            <Seo {...PAGE_SEO.demo} schema={[]} crumbs={[{ name: 'Live Demo', path: '/demo' }]} />
            <div className="pt-14 pb-24 relative overflow-hidden">
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
                                style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                                <AutoAwesomeIcon className="w-3.5 h-3.5" /> Real build · access on request
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-6 leading-none">
                                See the real build,<br />
                                <span className="brand-text-gradient">not a slide deck.</span>
                            </h1>
                            <p className="text-xl text-text-secondary leading-relaxed">
                                This is the current build of EduAnant, running on a school we made up. Tell us who you are and we will send sign-in details, so you can use it exactly as the person in your office would.
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
                                className="btn-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2.5 shadow-lg shadow-[#F59E0B]/20 group transition-all"
                            >
                                Request demo access <ArrowDownIcon className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Demo Info Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto p-5 rounded-2xl border mb-16 flex items-start gap-4 bg-white/50 dark:bg-white/[0.01]"
                        style={{ borderColor: 'rgba(245,158,11,0.2)' }}
                    >
                        <InfoIcon className="w-6 h-6 shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }} />
                        <div>
                            <h3 className="font-black text-text-primary mb-1 text-base">Nothing here is real, so change whatever you like</h3>
                            <p className="text-sm text-text-secondary leading-relaxed font-medium">
                                The demo installation runs at <a href="https://demo.eduanant.cloud" className="font-bold text-[var(--primary-main)] dark:text-[#00b6d5] hover:underline" target="_blank" rel="noopener noreferrer">demo.eduanant.cloud</a>. Every student, fee and mark in it is invented. Add records, edit them, collect a fee, print a receipt — it resets on its own, and no real child's data is involved.
                            </p>
                        </div>
                    </motion.div>

                    {/* Access is requested here rather than handed out above. */}
                    <div id="request" className="max-w-3xl mx-auto mb-16 scroll-mt-24">
                        <DemoRequestForm />
                    </div>

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
                                        <div className="p-3 rounded-2xl border" style={{ backgroundColor: role.bgColor, borderColor: 'rgba(245,158,11,0.1)' }}>
                                            <IconComponent className="w-6 h-6 text-[var(--accent-text)]" />
                                        </div>
                                        <h3 className="text-xl font-black text-text-primary">{role.role}</h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-text-secondary mb-6 leading-relaxed flex-grow font-medium">
                                        {role.description}
                                    </p>

                                    {/* Features Checklist */}
                                    <div className="space-y-2">
                                        <span className="text-xs font-bold text-text-secondary block uppercase tracking-wider mb-2">Capabilities:</span>
                                        {role.features.map((feat) => (
                                            <div key={feat} className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Credentials used to sit here in plain text. They are
                                        issued on request now — see the form below. */}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Final CTA Area */}
                    <div className="mt-20 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black text-text-primary mb-4">Would you rather be shown around?</h2>
                        <p className="text-text-secondary mb-8 leading-relaxed font-medium">
                            Book a walkthrough and we will take you through it on a call, using your school's own structure — your classes, your fee heads, your board — instead of ours.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                            <a href="#request" className="btn-primary px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2">
                                Request demo access
                            </a>
                            <span className="text-text-secondary text-sm font-bold">or</span>
                            <Link to="/contact" className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/20 hover:border-[#F59E0B] text-text-primary text-sm font-bold transition-colors">
                                Book a walkthrough
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
