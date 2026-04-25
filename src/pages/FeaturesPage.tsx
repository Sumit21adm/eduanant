import { motion } from 'framer-motion';
import {
    UserPlus, IndianRupee, CalendarCheck, BookOpen, Bus, GraduationCap,
    BarChart3, Settings, Bell, Shield, Layers, FileText, Users, Zap, Check, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MODULES = [
    {
        id: '01', icon: UserPlus, title: 'Student Admissions',
        tagline: 'From enquiry to enrolled — fully digital',
        color: 'from-[#17305a] to-[#0f6187]', borderColor: 'border-[#17305a]/25', bgColor: 'bg-[#17305a]/5',
        description: 'Manage the complete student admission lifecycle — from initial enquiry and application form to document collection, seat allocation, and final enrollment. No paper forms, no lost applications.',
        features: [
            'Multi-step digital admission form',
            'Document upload & verification tracking',
            'Seat / class capacity management',
            'Previous school & TC records',
            'Sibling & re-admission support',
            'Admission number auto-generation',
            'Enquiry to conversion pipeline',
            'Custom fields per school',
        ],
    },
    {
        id: '02', icon: IndianRupee, title: 'Fee Management',
        tagline: 'Demand bills, receipts, and reconciliation — automated',
        color: 'from-emerald-700 to-emerald-500', borderColor: 'border-emerald-500/25', bgColor: 'bg-emerald-500/5',
        description: 'India\'s most complete fee collection engine — built for how Indian schools actually work. Demand bills, split payments, advance adjustments, concessions, and instant PDF receipts.',
        features: [
            'Demand bill generation (monthly / term)',
            'Split payment & partial collection',
            'Cash, UPI, Cheque, Bank Transfer',
            'PDF receipts auto-generated',
            'Fee head & category configuration',
            'Advance deposit & adjustment',
            'Concession & scholarship management',
            'Session-wise opening balance carry-forward',
            'Defaulter list & follow-up tracking',
            'Month-end reconciliation report',
        ],
    },
    {
        id: '03', icon: CalendarCheck, title: 'Attendance Management',
        tagline: 'Mark entire class in 60 seconds',
        color: 'from-amber-700 to-amber-500', borderColor: 'border-amber-500/25', bgColor: 'bg-amber-500/5',
        description: 'Daily attendance marking for students and staff — bulk or individual. Supports present, absent, late, and half-day. Monthly attendance reports auto-calculated.',
        features: [
            'Class-wise bulk attendance marking',
            'Present / Absent / Late / Half-day',
            'Teacher & staff attendance',
            'Monthly attendance summaries',
            'Low-attendance alerts',
            'Subject-wise attendance (optional)',
            'Date-wise historical view',
            'Attendance export for reports',
        ],
    },
    {
        id: '04', icon: BookOpen, title: 'Examination & Results',
        tagline: 'Configure any exam pattern, publish results instantly',
        color: 'from-violet-700 to-violet-500', borderColor: 'border-violet-500/25', bgColor: 'bg-violet-500/5',
        description: 'Flexible exam engine supporting term exams, unit tests, practicals, and internal assessments. Enter marks, auto-calculate grades, publish results, and generate marksheets.',
        features: [
            'Configurable exam patterns (term/unit/practical)',
            'Subject-wise marks entry',
            'Grade & GPA calculation',
            'Marks sheet generation (PDF)',
            'Result publishing by class',
            'Subject topper & rank calculation',
            'Progress report card generation',
            'Exam schedule & timetable',
        ],
    },
    {
        id: '05', icon: Bus, title: 'Transport Management',
        tagline: 'Buses, routes, and students — all tracked',
        color: 'from-blue-700 to-blue-500', borderColor: 'border-blue-500/25', bgColor: 'bg-blue-500/5',
        description: 'Assign students to buses and routes, track transport fees separately, manage vehicle details and driver assignments. Built for schools with complex multi-route operations.',
        features: [
            'Bus & vehicle registration',
            'Route & stop configuration',
            'Student-to-route assignment',
            'Transport fee billing (separate)',
            'Driver & conductor records',
            'Route-wise student list',
            'Transport concession support',
            'Pick-up & drop time tracking',
        ],
    },
    {
        id: '06', icon: GraduationCap, title: 'Academic Structure',
        tagline: 'Classes, sections, subjects, and timetables',
        color: 'from-teal-700 to-teal-500', borderColor: 'border-teal-500/25', bgColor: 'bg-teal-500/5',
        description: 'Define your school\'s complete academic structure — sessions, classes, sections, subjects, and timetables. Works for CBSE, ICSE, or any State Board configuration.',
        features: [
            'Academic session management (Apr–Mar)',
            'Class & section configuration',
            'Subject mapping per class',
            'Teacher-subject-class assignment',
            'Timetable builder',
            'Class promotion workflow',
            'Holiday & working day calendar',
            'Board-agnostic structure',
        ],
    },
    {
        id: '07', icon: Users, title: 'Staff & HR Management',
        tagline: 'All staff records in one place',
        color: 'from-rose-700 to-rose-500', borderColor: 'border-rose-500/25', bgColor: 'bg-rose-500/5',
        description: 'Maintain complete records for teaching and non-teaching staff. Assign roles, track attendance, and manage user access permissions.',
        features: [
            'Teaching & non-teaching staff profiles',
            'Department & designation management',
            'Staff attendance marking',
            'Role & user access assignment',
            'Joining & leaving records',
            'Staff document storage',
            'Leave request management',
            'Staff timetable view',
        ],
    },
    {
        id: '08', icon: Bell, title: 'Notice & Communication',
        tagline: 'School notices delivered digitally',
        color: 'from-orange-700 to-orange-500', borderColor: 'border-orange-500/25', bgColor: 'bg-orange-500/5',
        description: 'Post school-wide or class-specific notices. Parents and students see them in their portal. No WhatsApp groups or physical notice boards needed.',
        features: [
            'School-wide notice posting',
            'Class / section specific notices',
            'Notice publish & expiry dates',
            'Student & parent portal delivery',
            'Event & holiday announcements',
            'Notice history & archive',
            'Priority notice flagging',
            'Read acknowledgement tracking',
        ],
    },
    {
        id: '09', icon: FileText, title: 'Homework & Assignments',
        tagline: 'Teachers post, students view — all tracked',
        color: 'from-cyan-700 to-cyan-500', borderColor: 'border-cyan-500/25', bgColor: 'bg-cyan-500/5',
        description: 'Teachers post homework and assignments by subject. Students and parents see it in their portal. Track submission status and follow up on pending work.',
        features: [
            'Homework posting by subject & class',
            'Due date & description',
            'Student portal visibility',
            'Parent access to assignments',
            'Attachment support',
            'Submission status tracking',
            'Historical homework archive',
            'Teacher dashboard view',
        ],
    },
    {
        id: '10', icon: BarChart3, title: 'Reports & Analytics',
        tagline: 'Data that helps you make better decisions',
        color: 'from-indigo-700 to-indigo-500', borderColor: 'border-indigo-500/25', bgColor: 'bg-indigo-500/5',
        description: 'Comprehensive reporting across all modules — fee collection summaries, attendance trends, exam results, student strength reports, and more. All exportable to PDF and Excel.',
        features: [
            'Fee collection summary (daily/monthly/annual)',
            'Student strength & section reports',
            'Attendance percentage by class',
            'Defaulter & due report',
            'Exam result analytics',
            'Transport route occupancy',
            'Export to PDF & Excel',
            'Admin dashboard KPIs',
        ],
    },
    {
        id: '11', icon: Shield, title: 'Security & Access Control',
        tagline: 'Enterprise-grade access control — every action recorded',
        color: 'from-slate-700 to-slate-500', borderColor: 'border-slate-500/25', bgColor: 'bg-slate-500/5',
        description: 'Every staff member sees only what their role allows. Every action inside the system is recorded with a full, tamper-proof audit trail — giving you complete accountability across your school.',
        features: [
            'Role-based access per staff type',
            'Module-level permissions',
            'Immutable audit log trail',
            'Secure login & session management',
            'Admin user management',
            'Data privacy by design',
            'Protection against unauthorized access',
            'Detailed activity history',
        ],
    },
    {
        id: '12', icon: Settings, title: 'System Configuration',
        tagline: 'Fully configurable to your school\'s needs',
        color: 'from-gray-700 to-gray-500', borderColor: 'border-gray-500/25', bgColor: 'bg-gray-500/5',
        description: 'Every setting, label, and workflow can be configured without touching code. Set your school name, logo, academic year, fee structure, and more from the admin panel.',
        features: [
            'School profile & branding',
            'Academic year configuration',
            'Fee head & category setup',
            'Grade & marking scheme',
            'SMS / notification settings',
            'Backup & restore configuration',
            'Multi-role user setup',
            'Module enable/disable toggles',
        ],
    },
    {
        id: '13', icon: Zap, title: 'Software Updates',
        tagline: 'Always up to date — always improving',
        color: 'from-[#0f6187] to-[#00b6d5]', borderColor: 'border-[#00b6d5]/25', bgColor: 'bg-[#00b6d5]/5',
        description: 'EduAnant is actively developed and regularly improved. New features reach your school through a simple one-click update — no IT team needed, no technical steps, no risk to your data.',
        features: [
            'One-click update from admin panel',
            'Complete data backup before every update',
            'Updates tested before release',
            'Update history visible in admin panel',
            'Back online in under 5 minutes',
            'No manual steps required',
            'Regular new features & improvements',
            'Update support included',
        ],
    },
    {
        id: '14', icon: Layers, title: 'Multi-Portal Architecture',
        tagline: 'Three purpose-built portals — one platform',
        color: 'from-[#00b6d5] to-[#63cae0]', borderColor: 'border-[#63cae0]/25', bgColor: 'bg-[#63cae0]/5',
        description: 'Three fully distinct portals under one login system — Admin for school management, Teacher for classroom operations, and Student/Parent portal for transparency. Each portal is purpose-designed for its users.',
        features: [
            'Admin portal (full management)',
            'Teacher portal (classroom + homework)',
            'Student & parent portal',
            'Role-based login routing',
            'Shared authentication system',
            'Portal-specific navigation',
            'Cross-portal data sync',
            'Mobile-responsive all portals',
        ],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturesPage() {
    return (
        <div className="pt-28 pb-24 relative">
            {/* Page header */}
            <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Layers className="w-3.5 h-3.5" /> 14 Production-Ready Modules
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Everything your school<br />
                        <span className="brand-text-gradient">will ever need.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Every module below is live, tested, and used in production. This is not a roadmap — it's what you get on Day 1.
                    </p>
                </motion.div>

                {/* Quick summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mt-10 flex flex-wrap gap-3 justify-center">
                    {['14 Modules', '3 Portals', '52+ Pages', 'Production Ready', 'Actively Maintained'].map(tag => (
                        <span key={tag} className="text-xs font-black px-4 py-2 rounded-full border"
                            style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.06)', color: '#0091b8' }}>
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Module grid */}
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={containerVariants} initial="hidden" animate="visible">
                    {MODULES.map((mod) => {
                        const Icon = mod.icon;
                        return (
                            <motion.div key={mod.id} variants={cardVariants}
                                whileHover={{ y: -4 }}
                                className={`relative rounded-3xl border ${mod.borderColor} ${mod.bgColor} bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden p-7 transition-all duration-500 hover:shadow-2xl group`}>

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                {/* Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg shrink-0`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black tracking-widest uppercase text-text-secondary opacity-60">Module {mod.id}</span>
                                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-emerald-600 bg-emerald-500/10 border border-emerald-500/20">● LIVE</span>
                                        </div>
                                        <h2 className="text-xl font-black text-text-primary">{mod.title}</h2>
                                        <p className="text-sm font-semibold text-text-secondary">{mod.tagline}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-text-secondary leading-relaxed mb-5">{mod.description}</p>

                                {/* Feature list */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                    {mod.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                                            <Check className="w-3.5 h-3.5 shrink-0" style={{ color: '#00b6d5' }} />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-16 text-center">
                    <p className="text-text-secondary mb-6 text-lg">Want to see all of this working live for your school?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact">
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                                className="btn-primary px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2">
                                Book a Free Live Demo <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link to="/security">
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                                className="btn-outline px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2">
                                View Security Architecture <Shield className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
