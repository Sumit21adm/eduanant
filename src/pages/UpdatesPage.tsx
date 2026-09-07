import { motion } from 'framer-motion';
import { Zap, CheckCircle, Clock, ArrowRight, Package, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HOW_IT_WORKS = [
    {
        step: '01', title: 'We Build & Test the Update',
        desc: 'Every new feature or fix goes through thorough internal testing before it\'s released. Nothing ships to schools until it\'s verified to be stable.',
    },
    {
        step: '02', title: 'An Update is Ready',
        desc: 'When an update is ready, we package it with a clear list of what\'s new, improved, or fixed — and notify the school admin.',
    },
    {
        step: '03', title: 'Your Data is Backed Up Automatically',
        desc: 'Before anything is changed on your system, EduAnant automatically creates a complete backup of all your school data. Your information is never at risk.',
    },
    {
        step: '04', title: 'One Click — You\'re Updated',
        desc: 'The school administrator clicks "Update" from inside the admin panel. The system handles everything — no IT person needed, no manual steps.',
    },
    {
        step: '05', title: 'Back Online in Minutes',
        desc: 'Your school\'s system comes back online with all the latest improvements — and all your data exactly as you left it.',
    },
];

const CHANGELOG = [
    {
        phase: 'Version 1.4.0', date: 'September 2026', status: 'Latest',
        headline: 'Library, pre-admission registrations, HR attestation & a full access-control overhaul',
        changes: [
            'Library module — catalogue, issue/return, fines, reservations & reports',
            'Per-copy accession numbers, textbook bulk issue, stock verification',
            'Student Registrations — capture enquiries before admission, convert in one click',
            'HR profile attestation — staff periodically reconfirm personal & bank details',
            'Document expiry reminders for staff records',
            'Per-user permission editor across 96 permissions and 22 modules',
            'Attendance can no longer be marked on Sundays, off-Saturdays or holidays',
            'Approved student leave is applied automatically, with an override warning',
            'Academic calendar now counts real working days and holidays',
            'Notification centre: mark all read, clear all, logout unsubscribe',
            'Smart morning, attendance & homework reminders — holiday aware',
            'Licence status now genuinely refreshes, plus a daily automatic validation',
            'Security hardening across exams, audit log, portal accounts & rate limiting',
            'Fixed the database connection exhaustion that broke manual backups',
        ],
    },
    {
        phase: 'Version 1.3.2', date: '1 September 2026', status: 'Stable',
        headline: 'Fee receipt advance balance and the HR employee intake rework',
        changes: [
            'Advance balance now shown on the fee receipt',
            'Reworked HR employee intake with auto-generated departments',
            'Social category & religion fields on the employee record',
            'Form dropdowns sorted alphabetically across the app',
            'Leave request span capped, attendance defaulters query bounded',
            'A dismissed notice no longer reappears on another device',
            'Real error shown when a data-migration template fails to download',
        ],
    },
    {
        phase: 'Version 1.3.0', date: '27 August 2026', status: 'Stable',
        headline: 'Human Resources, Reception Counter, staff geofence attendance and the Android app',
        changes: [
            'Human Resources module — records, onboarding, service book, exits',
            'Encrypted Aadhaar, PAN & bank details with audit-logged reveal',
            'UDISE+ and CBSE Appendix-IX statutory exports',
            'Staff self check-in/out with an optional campus geofence',
            'Reception Counter — visitors, gate passes, appointments, enquiries, calls',
            'Co-teaching: secondary class and subject teacher assignment',
            'Android app with push notifications, biometric lock & background sync',
            'Transport: search, filters, stat cards and drag-and-drop stop ordering',
            'Exam results: grades, rank, portal results and improved report cards',
            'Notification centre: broadcasts, delivery logs, WhatsApp/SMS integration',
            'Backups: cloud trigger, container fallback and 1 GB uploads',
            'Server-side PII masking with a full reveal audit trail',
            'Database migrations moved out of the live server boot sequence',
        ],
    },
    {
        phase: 'Version 1.2.0', date: '12 May 2026', status: 'Stable',
        headline: 'Staff attendance, substitutes and the unified Notification Centre',
        changes: [
            'Staff attendance with cutoff enforcement, override log and absence cron',
            'Substitute engine with a substitute report',
            'Unified Notification Centre with infinite-scroll feed',
            'Redesigned notice board and notification control centre',
            'Student portal account management — bulk create, enable & reset',
            'Comprehensive teacher profiles with photos and password reset',
            'Employee ID auto-generation with search, sort and filter',
            'In-app tour guide for students and teachers',
            'Dashboard performance tuning for low-resource servers',
        ],
    },
    {
        phase: 'Version 1.1.0', date: '2 May 2026', status: 'Stable',
        headline: 'Examinations, admit cards, fee reporting and the EduAnant rebrand',
        changes: [
            'Period-based exam scheduling with section-aware room splits',
            'Admit card layout rework — 10 exam rows on a single A6 page',
            'Full-year discount configuration and configurable PDF stamp size',
            'Excel export for fee and transport reports',
            'Roll number management overhaul with an audit trail',
            'Overdue detection now accounts for collection-time discounts',
            'Demand bills always carry the previous session opening balance',
            'Renamed the product to EduAnant across the platform',
            'Forced password reset on first login',
            'Search-engine and AI-crawler indexing blocked',
        ],
    },
    {
        phase: 'Version 1.0.0', date: '3 April 2026', status: 'Foundation',
        headline: 'The first official release — admissions, fees, attendance, exams and transport',
        changes: [
            'Student admissions, profiles, documents and bulk import',
            'Fee structures, demand bills, split payments and PDF receipts',
            'Student and staff attendance',
            'Examinations, admit cards and marks entry',
            'Transport — vehicles, drivers, routes and slab-based fares',
            'Role-based access control and immutable audit logs',
            'Admin, Teacher and Student/Parent portals',
            'Automated backups with Google Drive integration',
            'English and Hindi interface, dark mode and themes',
        ],
    },
];

export default function UpdatesPage() {
    return (
        <div className="pt-28 pb-24 relative">
            <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Zap className="w-3.5 h-3.5" /> Continuous Improvement
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Software that keeps<br />
                        <span className="brand-text-gradient">getting better.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        EduAnant is under active development — 18 modules and six releases since April 2026. Every improvement reaches your school with a single click.
                    </p>
                </motion.div>

                {/* Status badges */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3 justify-center mt-8">
                    {[
                        { label: 'Current Version', value: 'v1.4.0 — September 2026' },
                        { label: 'Status', value: '🟢 Actively Maintained' },
                        { label: 'Update Process', value: 'One-Click from Admin Panel' },
                        { label: 'Data Safety', value: 'Auto-backup before every update' },
                        { label: 'Update Time', value: 'Under 5 minutes' },
                    ].map(b => (
                        <div key={b.label} className="px-4 py-2 rounded-xl border text-sm"
                            style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.05)' }}>
                            <span className="text-text-secondary text-xs">{b.label}: </span>
                            <span className="font-bold text-text-primary">{b.value}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* How updates work */}
            <div className="container mx-auto px-6 max-w-4xl mb-20">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-2xl font-black text-text-primary text-center mb-12">
                    How Updates Work — Simple & Safe
                </motion.h2>

                <div className="relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 hidden md:block"
                        style={{ background: 'linear-gradient(180deg, #17305a, #00b6d5, #63cae0)' }} />

                    <div className="space-y-4 md:pl-16">
                        {HOW_IT_WORKS.map((step, i) => (
                            <motion.div key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative flex items-start gap-5 p-5 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                                <div className="absolute -left-[52px] hidden md:flex w-8 h-8 rounded-full items-center justify-center text-white text-[10px] font-black border-2 border-white dark:border-[#080e17] shadow-md"
                                    style={{ background: `hsl(${200 + i * 8}, 70%, ${30 + i * 4}%)` }}>
                                    {step.step}
                                </div>
                                <div>
                                    <h3 className="font-black text-text-primary mb-1">{step.title}</h3>
                                    <p className="text-sm text-text-secondary">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="mt-8 p-5 rounded-2xl border text-center"
                    style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.05)' }}>
                    <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: '#00b6d5' }} />
                    <p className="font-black text-text-primary mb-1">Average update time: Under 5 minutes</p>
                    <p className="text-sm text-text-secondary">Your school is briefly offline only during the restart — typically under 60 seconds. All data is fully preserved.</p>
                </motion.div>

                {/* Trust indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    {[
                        { icon: ShieldCheck, label: 'Data is always backed up before any update' },
                        { icon: Package, label: 'Every update is tested before release' },
                        { icon: Zap, label: 'No IT team needed — school admin does it' },
                    ].map(({ icon: Icon, label }) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                            <Icon className="w-5 h-5 shrink-0" style={{ color: '#00b6d5' }} />
                            <span className="text-sm font-semibold text-text-secondary">{label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Changelog */}
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-2xl font-black text-text-primary text-center mb-10">
                    Release History
                </motion.h2>

                <div className="space-y-6">
                    {CHANGELOG.map((release, i) => (
                        <motion.div key={release.phase}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-3xl border border-gray-200/50 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/[0.02]">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 px-7 py-5 border-b border-gray-200/50 dark:border-white/10">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <span className="text-xl font-black text-text-primary">{release.phase}</span>
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${i === 0 ? 'text-white' : 'text-text-secondary border border-gray-200/50 dark:border-white/10'}`}
                                            style={i === 0 ? { background: 'linear-gradient(90deg, #0091b8, #00b6d5)' } : {}}>
                                            {release.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-secondary font-medium">{release.headline}</p>
                                </div>
                                <span className="text-sm text-text-secondary font-medium shrink-0 sm:pt-1">{release.date}</span>
                            </div>
                            <div className="p-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {release.changes.map(c => (
                                    <div key={c} className="flex items-start gap-2 text-sm text-text-secondary">
                                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#00b6d5' }} />
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="mt-12 text-center">
                    <p className="text-text-secondary mb-4">Want to know what's coming next on our roadmap?</p>
                    <Link to="/contact">
                        <motion.button whileHover={{ scale: 1.04 }} className="btn-primary px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2">
                            Talk to Our Team <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
