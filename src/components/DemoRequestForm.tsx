import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Send, Clock } from 'lucide-react';

const ADMIN_PORTAL_API = 'https://admin.eduanant.cloud/api/v1/contact';

const ROLES = [
    'School Director / Founder', 'Principal / Head of School', 'Administrator / Office Manager',
    'Accountant / Fee Counter', 'Teacher', 'IT / Technical', 'Other',
];

/** Same shape of challenge the contact form uses, so bots meet it on both pages. */
function makeMathChallenge() {
    const a = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 9) + 1;
    return { a, b, op: '+', answer: a + b };
}

/**
 * Demo access is requested, not self-served.
 *
 * The credentials used to sit on this page in plain text, which meant anyone —
 * including competitors and scrapers — could sign in and alter the demo data,
 * and we learned nothing about who was interested. A request costs a genuine
 * prospect thirty seconds and turns an anonymous visit into a lead.
 */
export default function DemoRequestForm() {
    const [form, setForm] = useState({ name: '', school: '', role: '', phone: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [startedAt] = useState(() => Date.now());
    const [honeypot, setHoneypot] = useState('');
    const [math, setMath] = useState(makeMathChallenge);
    const [mathInput, setMathInput] = useState('');
    const [mathError, setMathError] = useState(false);

    const refreshMath = () => { setMath(makeMathChallenge()); setMathInput(''); };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Filled honeypot: succeed silently rather than tell a bot it was spotted.
        if (honeypot) { setSubmitted(true); return; }
        // A human cannot read and complete this in under three seconds.
        if (Date.now() - startedAt < 3000) { setSubmitted(true); return; }
        if (parseInt(mathInput, 10) !== math.answer) {
            setMathError(true); refreshMath();
            setError('Incorrect answer — a new question has been generated. Please try again.');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(ADMIN_PORTAL_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-Version': '1' },
                body: JSON.stringify({
                    name: form.name,
                    school: form.school,
                    phone: form.phone,
                    email: form.email || undefined,
                    inquiryType: 'Demo access request',
                    message: [`Role: ${form.role}`, form.message].filter(Boolean).join(' — '),
                }),
            });
            if (res.status === 429) {
                setError('Too many requests from this device. Try again in 10 minutes, or call us directly.');
                return;
            }
            if (!res.ok) throw new Error('Server error');
            setSubmitted(true);
        } catch {
            setError('Something went wrong. Please try again or call +91 79036 12979.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-text-primary mb-3">
                    Request received
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                    We will send your demo sign-in details to the phone number you gave us, usually within a few
                    working hours. If you would rather be walked through it on a call, say so when we reach you.
                </p>
                <p className="mt-5 text-xs text-text-secondary/70">
                    In a hurry? Call <a href="tel:+917903612979" className="font-bold text-[var(--brand-cyan-deep)] dark:text-[#00b6d5]">+91 79036 12979</a>.
                </p>
            </motion.div>
        );
    }

    const field = "w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white dark:bg-white/[0.04] text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2";
    const ring = { '--tw-ring-color': 'rgba(0,182,213,0.35)' } as React.CSSProperties;
    const label = "block text-xs font-black uppercase tracking-wider text-text-secondary mb-2";

    return (
        <form onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200/70 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 sm:p-8 shadow-sm">

            <div className="flex items-start gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EA580C] flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
                    <Clock className="w-5 h-5 text-white" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-text-primary leading-tight">
                        Request demo access
                    </h3>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        Tell us who you are and we will send sign-in details, usually within a few working hours.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="d-name" className={label}>Your name *</label>
                    <input id="d-name" name="name" value={form.name} onChange={handleChange} required
                        autoComplete="name" placeholder="Rajesh Kumar" className={field} style={ring} />
                </div>
                <div>
                    <label htmlFor="d-school" className={label}>School name *</label>
                    <input id="d-school" name="school" value={form.school} onChange={handleChange} required
                        autoComplete="organization" placeholder="Saraswati Public School" className={field} style={ring} />
                </div>
                <div>
                    <label htmlFor="d-phone" className={label}>Mobile number *</label>
                    <input id="d-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required
                        autoComplete="tel" placeholder="+91 9876543210" className={field} style={ring} />
                </div>
                <div>
                    <label htmlFor="d-email" className={label}>Email address</label>
                    <input id="d-email" name="email" type="email" value={form.email} onChange={handleChange}
                        autoComplete="email" placeholder="principal@school.com" className={field} style={ring} />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="d-role" className={label}>Your role *</label>
                    <select id="d-role" name="role" value={form.role} onChange={handleChange} required
                        className={field} style={ring}>
                        <option value="">Select your role</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="d-message" className={label}>Anything specific you want to see?</label>
                    <textarea id="d-message" name="message" value={form.message} onChange={handleChange} rows={3}
                        placeholder="We mainly want to see fee collection and attendance." className={`${field} resize-none`} style={ring} />
                </div>
            </div>

            {/* Honeypot — hidden from people, irresistible to bots */}
            <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden className="absolute opacity-0 w-0 h-0 pointer-events-none" />

            <div className={`flex flex-wrap items-center gap-3 p-4 mt-4 rounded-xl border ${mathError
                ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03]'}`}>
                <span className="text-xs sm:text-sm font-black text-text-secondary uppercase tracking-wider">Verify you&apos;re human:</span>
                <span className="text-base font-black" style={{ color: 'var(--accent-text)' }}>{math.a} {math.op} {math.b} =</span>
                <input type="text" inputMode="numeric" value={mathInput} required aria-label="Answer"
                    onChange={e => { setMathInput(e.target.value); setMathError(false); }}
                    placeholder="?" autoComplete="off"
                    className="w-16 sm:w-20 shrink-0 px-2 sm:px-3 py-2 rounded-lg border border-gray-200/70 dark:border-white/15 bg-white dark:bg-white/[0.06] text-text-primary text-sm font-bold text-center focus:outline-none focus:ring-2"
                    style={ring} />
                <button type="button" onClick={refreshMath}
                    className="text-xs text-text-secondary hover:text-text-primary underline sm:ml-auto shrink-0">
                    New question
                </button>
            </div>

            {error && (
                <div className="flex items-start gap-2 mt-4 text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{error}</span>
                </div>
            )}

            <button type="submit" disabled={submitting}
                className="btn-primary w-full mt-5 px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-base disabled:opacity-60">
                <Send className="w-4 h-4" strokeWidth={1.5} />
                {submitting ? 'Sending…' : 'Request demo access'}
            </button>

            <p className="mt-3 text-center text-[11px] text-text-secondary/70">
                We use this only to send your access details and follow up once. No marketing lists.
            </p>
        </form>
    );
}
