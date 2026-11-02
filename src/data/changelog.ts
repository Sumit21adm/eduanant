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
    /* The product's own release notes record 1.5.0 to 1.5.4 as one body of work
     * rather than splitting them, so this entry covers the range. The version
     * quoted in copy and in print comes from PRODUCT_VERSION in lib/version.ts,
     * not from this label. */
    {
        phase: 'Version 1.5.0 – 1.5.4', date: 'October–November 2026', status: 'Latest',
        headline: 'Staff attendance and HR rebuilt, the parent portal reworked, and photos families send in',
        changes: [
            'HR Today — uncovered periods, who is absent and what needs a decision, on one screen',
            'Staff leave rebuilt: rules per leave type, half-days, sandwich rule, and the balance shown before applying',
            'Arrange substitute cover while approving the leave that created the gap',
            'Staff attendance: tick rows and change them together, plus a printable monthly muster roll',
            'Staff can ask the office to correct a missed check-out or any past day',
            'Schools choose who is on the attendance register — drivers and directors need not be',
            'A holiday can now close the school for only some of the staff',
            'Staff are marked absent at a time the school sets, and the cron asks before marking a whole school absent',
            'A morning digest to whoever runs the school, once a day',
            'Families submit a student photo from the portal; the school approves or declines it with a reason',
            'Families register the adults allowed to collect their child',
            'The portal says how results are moving — per subject, against the last exam, with class rank',
            'Attendance and marks joined in one line on the student dashboard',
            'Export the academic calendar and fee structure as a feed for the school’s own website',
            'Refreshing any screen keeps you on the tab you were on',
            'Security: uploaded files are no longer readable by URL, login codes use a CSPRNG, notices are sanitised',
        ],
    },
    {
        phase: 'Version 1.4.5', date: '5 October 2026', status: 'Stable',
        headline: 'Guardians captured at registration, with their relation to the student',
        changes: [
            'Registration captures guardian name, relation and phone',
            'Guardian details carry across when a registration becomes an admission',
            'A wider relation list, for a child whose daily contact is not a parent',
        ],
    },
    {
        phase: 'Version 1.4.3', date: '16 September 2026', status: 'Stable',
        headline: 'Library barcodes scanned with a phone camera, and a fee summary that adds up',
        changes: [
            'Scan barcodes with the device camera — EAN-13/8, UPC-A, Code128 and QR',
            'Decoding runs in the browser, so no image leaves the device',
            'Continuous scan mode, so a shelf can be walked in one pass',
            'ISBN autofill falls back to a title and author search',
            'Scanning a catalogued ISBN offers to add a copy, not a duplicate title',
            'Collection summary counts UPI in person and Card, so the cards add up to the total',
        ],
    },
    {
        phase: 'Version 1.4.0', date: 'September 2026', status: 'Stable',
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
