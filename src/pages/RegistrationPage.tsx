import { motion } from 'framer-motion';
import { useState } from 'react';
import { Building2, UserCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const SCHOOL_SIZES = ['Up to 300 Students (Essential)', '301 – 800 Students (Standard)', '801 – 1,500 Students (Professional)', '1,500+ Students (Enterprise)', 'Not sure yet'];

export default function RegistrationPage() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ 
        schoolName: '', address: '', contactPerson: '', role: '', phone: '', email: '', size: '', 
        agreeToTerms: false, dataConsent: false 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setForm(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Prepend a single quote to the phone number so Google Sheets treats it as text instead of a formula
            const payload = {
                ...form,
                phone: `'${form.phone}`
            };

            await fetch('https://script.google.com/macros/s/AKfycbx3Yj22ff2qKNoKonOz27vwUqOkqkjtlvDxqHWzMtffkc6Hs76dibC_TTKXwi4czqTT/exec', {
                method: 'POST',
                mode: 'no-cors', // Important for bypassing CORS issues with Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-28 pb-24 relative">
            <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Building2 className="w-3.5 h-3.5" /> School Onboarding
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-text-primary mb-5 leading-tight">
                        Register your school with<br />
                        <span className="brand-text-gradient">EduAnant Academy</span>
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Join hundreds of schools digitizing their campus. Fill out the registration form below and our onboarding team will set up your admin portal.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.02]">
                            <CheckCircle className="w-16 h-16 mb-5" style={{ color: '#00b6d5' }} />
                            <h2 className="text-2xl font-black text-text-primary mb-3">Registration Received!</h2>
                            <p className="text-text-secondary mb-6 max-w-md mx-auto">
                                Thank you for registering <strong>{form.schoolName}</strong>. Our onboarding team is reviewing your details and will contact you at <strong>{form.email}</strong> within 24 hours to hand over your Admin Portal credentials.
                            </p>
                            <Link to="/" className="btn-primary py-3 px-8 rounded-xl font-bold">Return to Home</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.02] space-y-8 shadow-xl shadow-black/5">
                            
                            {/* School Details */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
                                    <Building2 className="w-5 h-5 text-[#00b6d5]" /> School Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">School Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="schoolName" value={form.schoolName} onChange={handleChange} required placeholder="e.g. Delhi Public School"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as any} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">School Address <span className="text-red-500">*</span></label>
                                        <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="Full address including city and state"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as any} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Total Students <span className="text-red-500">*</span></label>
                                        <select name="size" value={form.size} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none">
                                            <option value="">Select size</option>
                                            {SCHOOL_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
                                    <UserCircle className="w-5 h-5 text-[#00b6d5]" /> Primary Contact Person
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="contactPerson" value={form.contactPerson} onChange={handleChange} required placeholder="e.g. Ramesh Singh"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as any} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Role / Designation <span className="text-red-500">*</span></label>
                                        <input type="text" name="role" value={form.role} onChange={handleChange} required placeholder="e.g. Principal, Director, IT Head"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as any} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Mobile Number <span className="text-red-500">*</span></label>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as any} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Official Email <span className="text-red-500">*</span></label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="principal@school.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-sm text-text-primary focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as any} />
                                    </div>
                                </div>
                            </div>

                            {/* Legal Consent (Crucial for Compliance) */}
                            <div className="space-y-4 p-5 rounded-2xl bg-gray-50/50 dark:bg-white/[0.01] border border-gray-200/50 dark:border-white/5">
                                <h3 className="text-sm font-black text-text-primary flex items-center gap-2 mb-3">
                                    <ShieldCheck className="w-4 h-4 text-green-500" /> Legal & Data Privacy Consent
                                </h3>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-0.5">
                                        <input type="checkbox" name="agreeToTerms" checked={form.agreeToTerms} onChange={handleChange} required
                                            className="peer w-5 h-5 appearance-none rounded border-2 border-gray-300 dark:border-white/20 checked:border-[#00b6d5] checked:bg-[#00b6d5] focus:outline-none focus:ring-2 focus:ring-[#00b6d5]/30 transition-colors" />
                                        <CheckCircle className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                    <span className="text-sm text-text-secondary leading-tight group-hover:text-text-primary transition-colors">
                                        I have read and agree to the <Link to="/terms-of-service" target="_blank" className="text-[#00b6d5] hover:underline">Terms of Service</Link>, <Link to="/privacy-policy" target="_blank" className="text-[#00b6d5] hover:underline">Privacy Policy</Link>, and <Link to="/refund-policy" target="_blank" className="text-[#00b6d5] hover:underline">Refund Policy</Link>. <span className="text-red-500">*</span>
                                    </span>
                                </label>
                                
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-0.5">
                                        <input type="checkbox" name="dataConsent" checked={form.dataConsent} onChange={handleChange} required
                                            className="peer w-5 h-5 appearance-none rounded border-2 border-gray-300 dark:border-white/20 checked:border-[#00b6d5] checked:bg-[#00b6d5] focus:outline-none focus:ring-2 focus:ring-[#00b6d5]/30 transition-colors" />
                                        <CheckCircle className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                    <span className="text-sm text-text-secondary leading-tight group-hover:text-text-primary transition-colors">
                                        I acknowledge that EduAnant will process our school's data in accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. I confirm I have the authority to act on behalf of the school. <span className="text-red-500">*</span>
                                    </span>
                                </label>
                            </div>

                            <motion.button type="submit" disabled={submitting} whileHover={{ scale: submitting ? 1 : 1.01 }} whileTap={{ scale: submitting ? 1 : 0.99 }}
                                className="w-full btn-primary py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed">
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting Securely...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" /> Register School & Get Admin Access
                                    </>
                                )}
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
