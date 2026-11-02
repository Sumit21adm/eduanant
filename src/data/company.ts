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
    addressLine: 'Patna 804453, Bihar, India',
    city: 'Patna',
    state: 'Bihar',
    pin: '804453',
    country: 'India',

    phone: '+91 79036 12979',
    /** Same handset as the phone; kept separate so one can change alone. */
    whatsapp: '+91 79036 12979',
    /** Digits only, for tel: and wa.me links. */
    phoneDigits: '917903612979',
    email: 'hello@eduanant.cloud',
    site: 'eduanant.cloud',
    siteUrl: 'https://eduanant.cloud',
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
