import { SITE } from './seo';
import { RELEASE_COUNT } from '../data/changelog';
import { LIVE_SINCE_LABEL, monthsSince, spell } from './timeline';

/**
 * Per-route metadata. Titles stay under ~60 characters and descriptions under
 * ~158 so neither is truncated in results, and each one names both the job
 * (fees, attendance, admissions) and the person doing it — director, principal,
 * administrator, clerk, teacher or parent — because those are the words people
 * actually type and ask.
 */
export const PAGE_SEO = {
    home: {
        title: 'Home: School Management Software for Indian Schools | EduAnant',
        description:
            'Offline-ready school ERP for Indian schools. 16 modules — admissions, fees, attendance, exams, HR, library, transport — on your own server. ₹20/student.',
        path: '/',
        keywords:
            'school management software India, school ERP, offline school software, fee management software, student attendance software, school administration software, CBSE school software, Hindi school software',
    },
    features: {
        title: 'Features: Admissions, Fees, Attendance & Exams | EduAnant',
        description:
            'Admissions, fee collection, student and staff attendance, examinations, library, transport, HR, reception, reports and portals — all live in Release 1.4.0.',
        path: '/features',
        keywords:
            'school ERP modules, fee collection software, student attendance system, examination management software, school library software, school transport management, school HR software',
    },
    security: {
        title: 'Security: Student Data Protection & Access Control | EduAnant',
        description:
            'How EduAnant protects student data: 96 permission keys, an immutable audit trail, encryption at rest, and a database that never leaves your campus.',
        path: '/security',
        keywords:
            'school data security, student data privacy India, DPDP Act school software, role based access control school, school software audit trail',
    },
    pricing: {
        title: 'Pricing: ₹20 per Student — School ERP Cost | EduAnant',
        description:
            '₹20 per student a month billed annually, ₹36,000 minimum. All 16 modules, both portals, the Android app, migration and training included.',
        path: '/pricing',
        keywords:
            'school management software price India, school ERP cost, per student school software pricing, affordable school software, school software India cost',
    },
    demo: {
        title: 'Live Demo: Try the School ERP Free, No Sign-Up | EduAnant',
        description:
            'Open the running EduAnant demo and sign in as a principal, class teacher, accountant, receptionist or parent. Real screens, real data, no sign-up required.',
        path: '/demo',
        keywords:
            'school management software demo, free school ERP demo, try school software online, school software trial India',
    },
    updates: {
        title: 'Updates: Release Notes & Version History | EduAnant',
        description:
            `${spell(RELEASE_COUNT)[0].toUpperCase()}${spell(RELEASE_COUNT).slice(1)} releases since ${LIVE_SINCE_LABEL}. See exactly what shipped in each version and how one-click updates back up your school data before anything changes.`,
        path: '/updates',
        keywords:
            'EduAnant release notes, school software updates, school ERP changelog, school software version history',
    },
    contact: {
        title: 'Contact: Book an On-Site School Demo in India | EduAnant',
        description:
            'We visit your school, load your own classes and fee heads, and show the exact screens your staff would use. No obligation, no sales pressure.',
        path: '/contact',
        keywords:
            'school software demo booking, school ERP consultation India, school management software Bihar, school software Patna',
    },
    register: {
        title: 'Register: Onboard Your School to EduAnant | School ERP',
        description:
            'Tell us your board, session and student count. We prepare the installation, migrate your existing Excel records and train your staff on site.',
        path: '/register',
        keywords: 'register school software, school ERP onboarding, school management system signup India',
    },
    privacy: {
        title: 'Privacy Policy: Student & School Data | EduAnant',
        description:
            'How EduAnant handles school, staff and student data under the DPDP Act 2023 — what is collected, who controls it, and how to raise a request.',
        path: '/privacy-policy',
    },
    terms: {
        title: 'Terms of Service: Subscription Terms | EduAnant',
        description:
            'The subscription terms between your school and Snapx Technologies LLP for the EduAnant school management system and its Android application.',
        path: '/terms-of-service',
    },
    refund: {
        title: 'Refund Policy: Cancellation & Refunds | EduAnant',
        description:
            'EduAnant refund and cancellation terms, including the 30-day evaluation period and how your school exports its database if you decide to leave.',
        path: '/refund-policy',
    },
};

/* ── Reusable JSON-LD nodes ─────────────────────────────────────────────── */

export const softwareSchema = {
    '@type': 'SoftwareApplication',
    name: 'EduAnant',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'School Management System',
    operatingSystem: 'Web, Android, Windows, Linux',
    softwareVersion: SITE.version,
    url: SITE.url,
    downloadUrl: 'https://play.google.com/store/apps/details?id=cloud.eduanant.app',
    inLanguage: ['en-IN', 'hi-IN'],
    offers: {
        '@type': 'Offer',
        price: '20',
        priceCurrency: 'INR',
        priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '20',
            priceCurrency: 'INR',
            unitText: 'per student per month, billed annually',
        },
        availability: 'https://schema.org/InStock',
        url: `${SITE.url}/pricing`,
    },
    featureList: [
        'Registrations & Admissions', 'Fee Management', 'Student Attendance',
        'Human Resources & Staff Attendance', 'Examination & Results', 'Library Management',
        'Reception Counter', 'Transport Management', 'Academics & Calendar',
        'Communication & Notifications', 'Classroom & Teaching', 'Reports & Analytics',
        'Portals & Mobile App', 'Security & Access Control', 'Backup & Restore',
        'System Configuration & Updates',
    ],
    audience: {
        '@type': 'Audience',
        audienceType: 'School directors, principals, administrators, accountants, teachers, parents and students',
    },
};

export const organizationSchema = {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        postalCode: SITE.postalCode,
        addressCountry: SITE.country,
    },
    sameAs: ['https://play.google.com/store/apps/details?id=cloud.eduanant.app', 'https://snapxtechnologies.com'],
};

/** Questions a director actually asks — and the shape AI answer engines quote from. */
export const homeFaqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
        {
            q: 'Does EduAnant work without an internet connection?',
            a: 'Yes. EduAnant installs on a PC or server inside your school and staff reach it over your own Wi-Fi. If the broadband line goes down, the office, fee counter and attendance keep working. Only the parent Android app needs a connection to receive push notifications.',
        },
        {
            q: 'What does EduAnant cost for a school in India?',
            a: '₹20 per student per month billed annually, or ₹25 billed monthly, with a ₹36,000 annual minimum that covers a school of up to 150 students. All 16 modules, both portals, the Android app, data migration and staff training are included at no extra cost.',
        },
        {
            q: 'Which modules are included?',
            a: 'All 16 wired modules ship with every school: admissions and registrations, fee management, student attendance, HR and staff attendance, examinations and results, library, reception counter, transport, academics and calendar, communication, classroom and teaching, reports and analytics, portals and mobile app, security and access control, backup and restore, and system configuration.',
        },
        {
            q: 'Is any school actually using EduAnant?',
            a: `Yes. S.D.V. Public School in Patna, Bihar — a CBSE-affiliated school with three campuses, over 1,300 active students and more than 100 staff — has run its admissions, fee collection, attendance, examinations and staff records on EduAnant every working day for the past ${monthsSince()} months, since ${LIVE_SINCE_LABEL}.`,
        },
        {
            q: 'Who owns the school data?',
            a: 'Your school does. EduAnant runs on your own server, the database sits on your machine in standard PostgreSQL, and you can export a full backup at any time. No student data is shared with third parties.',
        },
        {
            q: 'Does EduAnant work in Hindi?',
            a: 'Yes. The entire interface switches between English and Hindi in one click, so office staff who are not comfortable in English can use every screen.',
        },
        {
            q: 'Which boards does EduAnant support?',
            a: 'CBSE, ICSE and State Board schools. You configure your own class structure, April–March academic session, subject mapping and exam patterns rather than being forced into a fixed template.',
        },
    ].map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
    })),
};
