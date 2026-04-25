import { motion } from 'framer-motion';
import { useState } from 'react';
import { PhoneCall, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const INQUIRY_TYPES = [
    'Book a Free Demo', 'Get a Pricing Quote', 'Technical / Security Question',
    'Data Migration Query', 'Partnership / Reseller', 'Other',
];
const SCHOOL_SIZES = ['< 200 Students', '200–500', '500–1000', '1000–2000', '2000–3000', '3000+ (Large / Multi-branch)'];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', school: '', phone: '', email: '', size: '', inquiry: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production: POST to backend / email service
        setSubmitted(true);
    };

    return (
        <div className="pt-28 pb-24 relative">
            <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <PhoneCall className="w-3.5 h-3.5" /> Let's Talk
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-5 leading-tight">
                        Ready to see it<br />
                        <span className="brand-text-gradient">in your school?</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-xl mx-auto">
                        Fill in the form and our team will reach out within 24 hours. No sales pressure — just an honest conversation about what your school needs.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact info sidebar */}
                    <div className="lg:col-span-2 space-y-5">
                        {[
                            { icon: PhoneCall, label: 'Call Us', value: '+91 79036 12979', href: 'tel:+917903612979', sub: 'Mon–Sat, 9 AM – 7 PM IST' },
                            { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/917903612979', sub: 'Usually replies in 1 hour' },
                            { icon: Mail, label: 'Email', value: 'contact@eduanant.com', href: 'mailto:contact@eduanant.com', sub: 'Response within 24 hours' },
                        ].map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <motion.a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:border-[#00b6d5]/40 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                        style={{ background: 'linear-gradient(135deg, #17305a, #00b6d5)' }}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-wider text-text-secondary mb-1">{c.label}</p>
                                        <p className="font-black text-text-primary">{c.value}</p>
                                        <p className="text-xs text-text-secondary mt-0.5">{c.sub}</p>
                                    </div>
                                </motion.a>
                            );
                        })}

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="p-5 rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock className="w-4 h-4" style={{ color: '#00b6d5' }} />
                                <p className="text-xs font-black uppercase tracking-wider text-text-secondary">What happens after you submit?</p>
                            </div>
                            <ol className="space-y-3">
                                {['Our team reviews your requirements', 'We call you within 24 hours', 'Schedule a live demo of EduAnant', 'We prepare a quote tailored to your school'].map((s, i) => (
                                    <li key={s} className="flex items-start gap-2.5 text-sm text-text-secondary">
                                        <span className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 text-white"
                                            style={{ background: 'linear-gradient(135deg, #17305a, #00b6d5)' }}>{i + 1}</span>
                                        {s}
                                    </li>
                                ))}
                            </ol>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                            className="flex items-center gap-2 text-sm text-text-secondary p-4 rounded-xl border border-gray-200/50 dark:border-white/10">
                            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#00b6d5' }} />
                            <span>Snapx Technologies · India</span>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        className="lg:col-span-3">
                        {submitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 rounded-3xl border"
                                style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.04)' }}>
                                <CheckCircle className="w-16 h-16 mb-5" style={{ color: '#00b6d5' }} />
                                <h2 className="text-2xl font-black text-text-primary mb-3">We've received your enquiry!</h2>
                                <p className="text-text-secondary mb-2">Our team will reach out to you at <strong>{form.phone || form.email}</strong> within 24 hours.</p>
                                <p className="text-sm text-text-secondary">For urgent queries, call us directly at <strong>+91 79036 12979</strong></p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}
                                className="p-8 rounded-3xl border border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.02] space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[
                                        { name: 'name', label: 'Your Name', placeholder: 'Rajesh Kumar', required: true },
                                        { name: 'school', label: 'School Name', placeholder: 'Saraswati Public School', required: true },
                                        { name: 'phone', label: 'Mobile Number', placeholder: '+91 9876543210', required: true },
                                        { name: 'email', label: 'Email Address', placeholder: 'principal@school.com', required: false },
                                    ].map(field => (
                                        <div key={field.name}>
                                            <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">
                                                {field.label} {field.required && <span style={{ color: '#00b6d5' }}>*</span>}
                                            </label>
                                            <input
                                                type="text" name={field.name} value={(form as Record<string, string>)[field.name]}
                                                onChange={handleChange} placeholder={field.placeholder} required={field.required}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-text-primary text-sm font-medium focus:outline-none focus:ring-2 transition-all placeholder:text-text-secondary/50"
                                                style={{ '--tw-ring-color': 'rgba(0,182,213,0.3)' } as React.CSSProperties} />
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">
                                            School Size <span style={{ color: '#00b6d5' }}>*</span>
                                        </label>
                                        <select name="size" value={form.size} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-text-primary text-sm font-medium focus:outline-none focus:ring-2 transition-all">
                                            <option value="">Select student count</option>
                                            {SCHOOL_SIZES.map(s => <option key={s} value={s}>{s} students</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">
                                            How can we help? <span style={{ color: '#00b6d5' }}>*</span>
                                        </label>
                                        <select name="inquiry" value={form.inquiry} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-text-primary text-sm font-medium focus:outline-none focus:ring-2 transition-all">
                                            <option value="">Select inquiry type</option>
                                            {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-text-secondary mb-2">Message (optional)</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                                        placeholder="Tell us about your current system, specific requirements, or any questions..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200/70 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] text-text-primary text-sm font-medium focus:outline-none focus:ring-2 transition-all resize-none placeholder:text-text-secondary/50" />
                                </div>

                                <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,182,213,0.25)' }} whileTap={{ scale: 0.98 }}
                                    className="w-full btn-primary py-4 rounded-xl font-black text-base flex items-center justify-center gap-2">
                                    <Send className="w-4 h-4" /> Submit Enquiry
                                </motion.button>
                                <p className="text-center text-xs text-text-secondary">
                                    Or call us directly: <a href="tel:+917903612979" className="font-bold" style={{ color: '#00b6d5' }}>+91 79036 12979</a>
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
