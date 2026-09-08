/**
 * Release history — the single source of truth for the Updates page, the
 * hero marquee, and every "N releases since April 2026" sentence on the site.
 * Add a release here and the counts elsewhere follow.
 */
export interface Release {
    phase: string;
    date: string;
    status: string;
    headline: string;
    changes: string[];
}

export const CHANGELOG: Release[] = [
    {
        phase: 'Version 1.4.0', date: 'September 2026', status: 'Latest',
        headline: 'Library, pre-admission registrations, HR attestation & a full access-control overhaul',
        changes: [
            'Library module — catalogue, issue/return, fines, reservations & reports',
            'Per-copy accession numbers, textbook bulk issue, stock verification',
            'Student Registrations — capture enquiries before admission, convert in one click',
            'HR profile attestation — staff periodically reconfirm personal & bank details',
            'Document expiry reminders for staff records',
            'Per-user permission editor across 96 permissions in 22 permission groups',
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
            'Notification centre: broadcasts, delivery logs and push notifications',
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

export const RELEASE_COUNT = CHANGELOG.length;
