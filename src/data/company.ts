/**
 * Who we are, in registry terms — the single source for anything identifying
 * the company, on screen or on paper.
 *
 * A school director's unspoken question is whether this is a real company or
 * two people with a laptop, and none of these numbers appeared anywhere: not in
 * the footer, not in llms.txt, not on the order form whose invoice an
 * accountant has to book. Each one is verifiable in a public registry, which is
 * the whole point — it answers the question without naming anybody.
 *
 * docs/print/build.mjs reads this file too, so the nine printed pieces and the
 * website cannot disagree about a GST number.
 */

export const COMPANY = {
    legalName: 'M/S Snapx Technologies LLP',
    /** Used where the full legal form would crowd a line. */
    shortName: 'Snapx Technologies LLP',

    /* The registered office exactly as it reads on the incorporation document,
     * which is the only version that belongs on anything a school files — an
     * order form, an invoice, a letter of authorisation. The site used to say
     * "Patna 804453, Bihar, India", which is where we are but not an address
     * anyone could serve a notice at, and it disagreed with the parent
     * company's own site.
     *
     * The company name is deliberately not part of these: every caller prints
     * it alongside, and folding it in here produced it twice. */
    addressLine:
        'Shushila Shadan, Kamla Sharan Colony, NH-83, Nathupur Road, beside S.D.V. Public School, '
        + 'Kurthoul, Patna, Nathupur, Bihar 804453, India',
    /** Broken for display, so it sets as a postal block rather than a run-on line. */
    addressLines: [
        'Shushila Shadan, Kamla Sharan Colony',
        'NH-83, Nathupur Road',
        'Beside S.D.V. Public School, Kurthoul',
        'Patna, Nathupur, Bihar 804453, India',
    ],
    /** Structured, for PostalAddress schema. */
    postal: {
        streetAddress:
            'Shushila Shadan, Kamla Sharan Colony, NH-83, Nathupur Rd, '
            + 'beside S.D.V. Public School, Kurthoul, Nathupur',
        addressLocality: 'Patna',
        addressRegion: 'Bihar',
        postalCode: '804453',
        addressCountry: 'IN',
    },
    city: 'Patna',
    state: 'Bihar',
    pin: '804453',
    country: 'India',

    /**
     * Google Business Profile place link, for a "Get directions" action.
     * Resolves to SNAPX TECHNOLOGIES at the coordinates below. A school that
     * wants to know we exist somewhere real can look at the building.
     */
    mapsUrl: 'https://maps.app.goo.gl/BswrvWnHqwzLauWXA',
    geo: { latitude: 25.5555642, longitude: 85.1217201 },

    phone: '+91 79036 12979',
    /** Same handset as the phone; kept separate so one can change alone. */
    whatsapp: '+91 79036 12979',
    /** Digits only, for tel: and wa.me links. */
    phoneDigits: '917903612979',
    email: 'hello@eduanant.cloud',
    site: 'eduanant.cloud',
    siteUrl: 'https://eduanant.cloud',
} as const;

/**
 * Who the money goes to.
 *
 * Another business trades under the name Snapx, and people charged by it search for a
 * refund policy, land on pages like ours, and ring us instead. The full notice lives on
 * the parent company's site, which is where those searches arrive; this is the short,
 * self-contained form for the pages and papers where a school actually pays.
 *
 * It is repeated here rather than only linked because a policy a customer relies on
 * should not have to send them to another website to learn who to pay. The name is
 * kept in one place so the copies cannot drift: it is the bank's name for the account,
 * exactly, and it has no "M/S" — that is an honorific, not part of the account.
 *
 * The wording is about us. It does not name the other business or say what it does:
 * "we are not connected with it" is true and enough.
 */
export const PAYMENT = {
    payee: 'SNAPX TECHNOLOGIES LLP',
    heading: 'Pay only to SNAPX TECHNOLOGIES LLP',
    body:
        'Every payment for EduAnant goes into one bank account, held in the name SNAPX TECHNOLOGIES LLP, '
        + 'and into no other. Before you confirm a payment, check that the name your bank or UPI app '
        + 'shows reads exactly that. We never take money from your account automatically — there is no '
        + 'auto-debit, standing instruction or e-mandate; every payment is one you make yourself. We are '
        + 'not connected with any other business or app that uses the name Snapx.',
    /** The canonical, full notice — kept once, on the site those searches reach. */
    fullNoticeUrl: 'https://snapxtechnologies.com/legal/refunds',
} as const;

export interface Registration {
    /** What a reader needs to recognise it, e.g. "GSTIN". */
    label: string;
    value: string;
    /** Expanded once, in the place that has room for it. */
    note?: string;
}

/**
 * Deliberately four entries, not five.
 *
 * DPIIT recognition *is* the Startup India recognition — they are the same
 * certificate under two names. Listing both reads as padding, and the kind of
 * director who checks one will check the other.
 *
 * Each value has been validated: the GSTIN's checksum computes, its state code
 * is Bihar, and the PAN inside it carries entity type F (Firm / LLP), which is
 * what this company is. Change one of these only against the certificate.
 */
export const REGISTRATIONS: Registration[] = [
    { label: 'LLPIN', value: 'AAX-6898', note: 'Registered with the Ministry of Corporate Affairs' },
    { label: 'GSTIN', value: '10AEMFS0052G1ZH', note: 'Bihar' },
    { label: 'Udyam', value: 'UDYAM-BR-26-0088932', note: 'MSME registered' },
    { label: 'DPIIT', value: 'DIPP85668', note: 'DPIIT-recognised startup (Startup India)' },
];

/** "LLPIN AAX-6898 · GSTIN …" — for a footer or a strip with one line to spare. */
export const registrationLine = REGISTRATIONS
    .map(r => `${r.label} ${r.value}`)
    .join(' · ');

/** Just the GST number, which is the one an accountant asks for by name. */
export const GSTIN = REGISTRATIONS.find(r => r.label === 'GSTIN')!.value;
