import { motion } from 'framer-motion';
import {
    UserPlus, IndianRupee, CalendarCheck, BookOpen, Bus, GraduationCap,
    BarChart3, Settings, Shield, Layers, FileText, Users, Zap, Check, ArrowRight,
    Library, ConciergeBell, MapPin, Megaphone, DatabaseBackup
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MODULES = [
    {
        id: '01', icon: UserPlus, title: 'Registrations & Admissions',
        tagline: 'From enquiry to enrolled — fully digital',
        color: 'from-[#17305a] to-[#0f6187]', borderColor: 'border-[#17305a]/25', bgColor: 'bg-[#17305a]/5',
        description: 'The complete intake pipeline — capture a walk-in as a registration first, evaluate it, then convert to a full admission in one click with nothing re-typed. Documents, seat allocation, and numbering handled throughout.',
        features: [
            'Pre-admission registration stage (REG-YYYY-XXXX)',
            'One-click convert registration → admission',
            'Multi-step digital admission form',
            'Document upload & verification tracking',
            'Bulk Excel import (1,000+ students)',
            'Previous school & TC records',
            'Sibling & re-admission support',
            'Admission / PEN number auto-generation',
            'Class promotion wizard with clearance checks',
            'NEW-student badge & enrolment filters',
        ],
    },
    {
        id: '02', icon: IndianRupee, title: 'Fee Management',
        tagline: 'Demand bills, receipts, and reconciliation — automated',
        color: 'from-emerald-700 to-emerald-500', borderColor: 'border-emerald-500/25', bgColor: 'bg-emerald-500/5',
        description: 'India\'s most complete fee collection engine — built for how Indian schools actually work. Demand bills, split payments, advance adjustments, concessions, online payment approval, and instant PDF receipts.',
        features: [
            'Demand bill generation (monthly / term)',
            'Split payment & partial collection',
            'Cash, UPI, Cheque, Bank Transfer',
            'Parents pay online & upload proof — school verifies before posting',
            'Online payment receipts with QR verification',
            'PDF receipts auto-generated',
            'Advance deposit, adjustment & advance balance on receipt',
            'Concession, scholarship & full-year discounts',
            'Late fee rules with waiver control',
            'Session-wise opening balance carry-forward',
            'Defaulter list & automated fee reminders',
            'Month-end reconciliation & Excel export',
        ],
    },
    {
        id: '03', icon: CalendarCheck, title: 'Student Attendance',
        tagline: 'Mark an entire class in 60 seconds',
        color: 'from-amber-700 to-amber-500', borderColor: 'border-amber-500/25', bgColor: 'bg-amber-500/5',
        description: 'Daily attendance for the whole class — bulk or individual, on desktop or phone. The calendar decides what is markable, so nobody records attendance on a Sunday, a second Saturday, or a declared holiday.',
        features: [
            'Class-wise bulk marking, mobile-first cards',
            'Present / Absent / Late / Half-day',
            'Holiday & weekly-off aware — marking blocked',
            'Approved leave auto-applied, with override warning',
            'Auto-marking cron for unmarked absences',
            'Student leave request workflow',
            'Session-to-date attendance % per student',
            'Monthly summaries & defaulter reports',
            'Low-attendance alerts to parents',
            'Attendance export for board reporting',
        ],
    },
    {
        id: '04', icon: MapPin, title: 'Staff Attendance & Leave',
        tagline: 'Self check-in on a phone — inside the campus geofence',
        color: 'from-lime-700 to-lime-500', borderColor: 'border-lime-500/25', bgColor: 'bg-lime-500/5',
        description: 'Staff mark their own attendance from their phone, verified against an optional campus geofence. Leave policies, balances, payable days, and substitute cover are all driven from the same record — no separate muster register.',
        features: [
            'Self check-in / check-out with campus geofence',
            'Configurable late cutoff & LATE marking',
            'Staff self-correction of check-in/out times',
            'Leave policy master with per-session balances',
            'Approved leave reflected in attendance & balance',
            'Payable days clamped to employment window',
            'Absence cron with failure-window hardening',
            'Substitute teacher engine & substitute report',
            'Co-teaching: secondary class & subject teachers',
            'Staff attendance reports & exports',
        ],
    },
    {
        id: '05', icon: Users, title: 'Human Resources',
        tagline: 'Service book, statutory posture, compliance exports',
        color: 'from-rose-700 to-rose-500', borderColor: 'border-rose-500/25', bgColor: 'bg-rose-500/5',
        description: 'A full HR record for every employee — onboarding to exit — with UDISE+ and CBSE Appendix-IX exports generated straight from it. Aadhaar, PAN, and bank numbers are encrypted at rest and only ever released through an audit-logged reveal.',
        features: [
            'Employee records with UDISE+ fields',
            'Encrypted Aadhaar / PAN / bank details',
            'Config-driven onboarding links (phone-verified)',
            'Designation, department & document-type masters',
            'Document checklist with expiry reminders',
            'Service history, transfers, exit & service book',
            'Effective-dated salary structures, EPF / ESI posture',
            'Periodic profile attestation cycles + chase list',
            'Staff self-service profile update requests',
            'UDISE+ & CBSE Appendix-IX statutory exports',
        ],
    },
    {
        id: '06', icon: BookOpen, title: 'Examination & Results',
        tagline: 'Configure any exam pattern, publish results instantly',
        color: 'from-violet-700 to-violet-500', borderColor: 'border-violet-500/25', bgColor: 'bg-violet-500/5',
        description: 'Flexible exam engine supporting term exams, unit tests, practicals, and internal assessments. Schedule with room splits, enter marks, auto-calculate grades and rank, then publish straight to the parent portal.',
        features: [
            'Configurable exam patterns (term/unit/practical)',
            'Period-based scheduling with section room splits',
            'Room allocation & invigilator duty rosters',
            'Admit card generation (A6, multi-sitting)',
            'Class tests & unit tests published to the portal',
            'Mobile-friendly subject-wise marks entry',
            'Grade, GPA & class rank calculation',
            'Progress report cards & marksheets (PDF)',
            'Result publishing to student & parent portal',
            'Grade distribution & topper analytics',
        ],
    },
    {
        id: '07', icon: Library, title: 'Library Management',
        tagline: 'Every copy tracked by its own accession number',
        color: 'from-fuchsia-700 to-fuchsia-500', borderColor: 'border-fuchsia-500/25', bgColor: 'bg-fuchsia-500/5',
        description: 'A real library system, not a book list — titles and physical copies are separate records, so each copy carries its own accession number, condition, and status. Membership comes live from the student and staff roster, so promotions and transfers never need a sync.',
        features: [
            'Catalogue with per-copy accession & condition',
            'Issue / return / renew with per-class loan policy',
            'Fines collected at the counter, lost-book write-off',
            'Reservations with automatic hold expiry',
            'Textbook bulk issue & return for a whole class',
            'ISBN autofill (Open Library / Google Books)',
            'Accession register, stock & overdue reports',
            'Scan-based stock verification',
            'Library clearance check at promotion time',
        ],
    },
    {
        id: '08', icon: ConciergeBell, title: 'Reception Counter',
        tagline: 'The front desk, finally on record',
        color: 'from-pink-700 to-pink-500', borderColor: 'border-pink-500/25', bgColor: 'bg-pink-500/5',
        description: 'What happens at the gate and the front desk gets written down rather than remembered — visitors, gate passes, enquiries, appointments and phone calls, each timestamped, searchable later, and tied back to the student record where relevant.',
        features: [
            'Visitor log with in/out timestamps',
            'Student movement & gate pass records',
            'Admission enquiry capture & follow-up',
            'Appointment scheduling for parents',
            'Phone call log with purpose & outcome',
            'Preset filters: Today / Week / Month / Year',
            'Transport lookup on student release',
            'Edit & delete with self-authorization control',
        ],
    },
    {
        id: '09', icon: Bus, title: 'Transport Management',
        tagline: 'Buses, routes, and students — all tracked',
        color: 'from-blue-700 to-blue-500', borderColor: 'border-blue-500/25', bgColor: 'bg-blue-500/5',
        description: 'Assign students to buses and routes, bill transport fees separately, and manage vehicles, drivers, and stops. Built for schools running complex multi-route operations.',
        features: [
            'Bus & vehicle registration with documents',
            'Route builder with drag-and-drop stop ordering',
            'Distance-slab fare calculation',
            'Student-to-route assignment & occupancy view',
            'Transport fee billing (separate head)',
            'Driver & conductor records with licence tracking',
            'Search, filter, sort & pagination everywhere',
            'Route-wise lists & Excel transport reports',
        ],
    },
    {
        id: '10', icon: GraduationCap, title: 'Academics & Calendar',
        tagline: 'Classes, subjects, timetable, and the school year',
        color: 'from-teal-700 to-teal-500', borderColor: 'border-teal-500/25', bgColor: 'bg-teal-500/5',
        description: 'Define your school\'s complete academic structure — sessions, classes, sections, subjects, periods, and rooms — then run the year off an academic calendar that every other module respects. Works for CBSE, ICSE, or any State Board.',
        features: [
            'Academic session management (Apr–Mar)',
            'Class, section & room configuration',
            'Subject mapping and teacher assignment',
            'Co-teaching: primary + secondary teachers',
            'Period schedule & timetable builder',
            'Academic calendar with per-event attendance gates',
            'School events with staff duty allocation',
            'Weekly offs (Sundays, nth Saturdays) & holidays',
            'Working-day and holiday counts computed, not assumed',
            'Class promotion & session rollover',
        ],
    },
    {
        id: '11', icon: Megaphone, title: 'Communication & Notifications',
        tagline: 'Reaches the parent\'s phone, not a WhatsApp group',
        color: 'from-orange-700 to-orange-500', borderColor: 'border-orange-500/25', bgColor: 'bg-orange-500/5',
        description: 'Notices, alerts, and reminders delivered through one notification centre — in-app in real time, and as push notifications to the parent app. Every send is queued, logged, and retryable, so you can prove what went out.',
        features: [
            'School-wide, class & section-specific notices',
            'Scheduled notice broadcasts with expiry',
            'Push notifications to the parent & teacher app',
            'Two-way messaging between teachers and parents',
            'Parent-teacher meeting slots parents can book',
            'Real-time in-app feed with unified inbox',
            'Delivery queue, logs & manual retry',
            'Fee, homework & absence reminders (holiday-aware)',
            'Birthday auto-notifications',
            'Per-user mute preferences & one-click unsubscribe',
            'WhatsApp / SMS gateway integration',
        ],
    },
    {
        id: '12', icon: FileText, title: 'Classroom & Teaching',
        tagline: 'The teacher\'s whole day, in one portal',
        color: 'from-cyan-700 to-cyan-500', borderColor: 'border-cyan-500/25', bgColor: 'bg-cyan-500/5',
        description: 'The part of a teacher\'s day that sits outside attendance and marks — homework, lesson plans, class tests, the teaching diary and the behaviour record. Students and parents see what concerns them in their own portal, with a push notification when new work lands.',
        features: [
            'Homework by subject & class, with attachments',
            'Per-student homework completion tracking',
            'Lesson plans & curriculum progress',
            'Teaching diary of what was actually covered',
            'Class tests with marks & portal results',
            'Discipline incidents with severity & action taken',
            'Student recognition & merit points',
            'Teacher remarks on a student record',
            'Teacher dashboard, timetable & workload view',
        ],
    },
    {
        id: '13', icon: BarChart3, title: 'Reports & Analytics',
        tagline: 'Data that helps you make better decisions',
        color: 'from-indigo-700 to-indigo-500', borderColor: 'border-indigo-500/25', bgColor: 'bg-indigo-500/5',
        description: 'Reporting across the whole system — fee collection, attendance, exam results, transport occupancy, staff attendance, library circulation and statutory compliance. All exportable to PDF and Excel.',
        features: [
            'Fee collection summary (daily/monthly/annual)',
            'Defaulter & outstanding dues report',
            'Attendance percentage & defaulters by class',
            'Exam result analytics & grade distribution',
            'Staff attendance & substitute reports',
            'Library circulation, stock & overdue reports',
            'Transport route occupancy',
            'UDISE+ / CBSE compliance exports',
            'Export to PDF & Excel throughout',
        ],
    },
    {
        id: '14', icon: Layers, title: 'Portals & Mobile App',
        tagline: 'Three portals on the web, one app in the pocket',
        color: 'from-[#00b6d5] to-[#63cae0]', borderColor: 'border-[#63cae0]/25', bgColor: 'bg-[#63cae0]/5',
        description: 'Admin, Teacher, and Student/Parent portals under one login system — plus an Android app that wraps the portal with native push notifications, a biometric lock, and background sync.',
        features: [
            'Admin portal (full school management)',
            'Teacher portal (attendance, marks, homework)',
            'Student & parent portal',
            'Android app with native push notifications',
            'Installable web app on any phone or desktop',
            'Biometric app lock & secure session storage',
            'Deep links straight to the relevant screen',
            'Role-based login routing & cross-tab sync',
            'Parents see gate passes & movement history',
            'Guided in-app tour for new users',
            'Mobile-responsive across every portal',
        ],
    },
    {
        id: '15', icon: Shield, title: 'Security & Access Control',
        tagline: 'Enterprise-grade access control — every action recorded',
        color: 'from-slate-700 to-slate-500', borderColor: 'border-slate-500/25', bgColor: 'bg-slate-500/5',
        description: 'Every staff member sees only what their role allows, down to individual screens and actions — 96 permissions across 22 modules, editable per user. Every sensitive action is recorded in a tamper-proof audit trail.',
        features: [
            'Role-based access with per-user permission editor',
            '96 module-level permissions, role defaults built in',
            'Create your own roles with their own defaults',
            'Two-factor authentication (TOTP)',
            'Server-side PII masking with reveal audit trail',
            'Immutable audit log with export',
            'Role-based inactivity timeouts & session control',
            'Rate limiting on login, OTP & password reset',
            'Forced password reset on first login',
            'Encryption at rest for sensitive fields',
        ],
    },
    {
        id: '16', icon: DatabaseBackup, title: 'Backup & Restore',
        tagline: 'Your data, safe — automatically, every day',
        color: 'from-sky-700 to-sky-500', borderColor: 'border-sky-500/25', bgColor: 'bg-sky-500/5',
        description: 'Scheduled full-database backups with cloud copies, retention limits, and a guided restore. A backup is taken automatically before every software update, so an update can always be walked back.',
        features: [
            'Scheduled automatic backups',
            'Google Drive / cloud copy with pruning',
            'Retention days & maximum-copies policy',
            'One-click download (up to 1 GB)',
            'Guided restore with schema safety checks',
            'Automatic backup before every update',
            'Backup history & status in the admin panel',
            'Vendor-assisted recovery support',
        ],
    },
    {
        id: '17', icon: Settings, title: 'System Configuration',
        tagline: 'Fully configurable to your school\'s needs',
        color: 'from-gray-700 to-gray-500', borderColor: 'border-gray-500/25', bgColor: 'bg-gray-500/5',
        description: 'Settings, labels and workflows are yours to change from the admin panel — no code, no support ticket. Configuration tabs save themselves as you type, so nothing is lost to a forgotten Save button.',
        features: [
            'School profile, logo, signatures & branding',
            'Receipt, bill & report print settings',
            'Auto-numbering (admission, receipt, PEN, employee ID)',
            'Digital signatures on receipts & report cards',
            'Excel data migration with validated templates',
            'Storage manager — find orphaned files, reclaim disk',
            'Fee heads, categories & grading schemes',
            'Attendance, holiday & weekly-off policy',
            'English & Hindi interface',
            'Theme, dark mode & menu appearance',
            'Module & add-on enable/disable toggles',
            'Auto-saving configuration tabs',
        ],
    },
    {
        id: '18', icon: Zap, title: 'Updates & Licensing',
        tagline: 'Always up to date — always improving',
        color: 'from-[#0f6187] to-[#00b6d5]', borderColor: 'border-[#00b6d5]/25', bgColor: 'bg-[#00b6d5]/5',
        description: 'EduAnant is actively developed and regularly improved. New features reach your school through a one-click update — backed up first, migrated in a pre-flight step, and rolled back automatically if anything fails.',
        features: [
            'One-click update from the admin panel',
            'Full data backup before every update',
            'Database migrations run in a pre-flight step',
            'Automatic rollback on a failed health check',
            'Release notes & breaking-change warnings in-app',
            'Licence activation, offline activation & add-on sync',
            'Daily automatic licence validation',
            'Report an issue from inside the app, with diagnostics',
            'Update history & live update logs',
            'Back online in under 5 minutes',
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
                        <Layers className="w-3.5 h-3.5" /> 18 Production-Ready Modules
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Everything your school<br />
                        <span className="brand-text-gradient">will ever need.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Every module below is live in production as of version 1.4.0 — tested, in daily use, and included. This is not a roadmap; it's what you get on Day 1.
                    </p>
                </motion.div>

                {/* Quick summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mt-10 flex flex-wrap gap-3 justify-center">
                    {['18 Modules', '3 Portals + Android App', '120+ Screens', 'Live in Production', 'v1.4.0 — Sept 2026'].map(tag => (
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
                                Book a walkthrough <ArrowRight className="w-4 h-4" />
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
