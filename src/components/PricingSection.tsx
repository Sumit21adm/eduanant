import { ArrowRight, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
    'All 14 modules — no feature gating',
    'Unlimited students & staff',
    'Hindi + English UI',
    'Works offline (no internet required)',
    'Self-hosted on your own server/PC',
    'PDF receipts & demand bills included',
    'Data migration from Excel included',
    'Staff training & onboarding included',
    'One-click software updates',
    'Automated data backup',
    'Role-based access for every staff',
    'Priority support via call & WhatsApp',
];

export default function PricingSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const yGlow = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section ref={containerRef} id="pricing" className="py-24 relative overflow-x-clip">
            <motion.div
                style={{ y: yGlow, background: 'radial-gradient(circle, rgba(0,182,213,0.12), transparent)', filter: 'blur(100px)' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Sparkles className="w-3.5 h-3.5" /> Simple, Transparent Pricing
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-5 leading-tight">
                        Pricing that grows<br />
                        <span className="brand-text-gradient">with your school.</span>
                    </h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Plans based on your school size — not arbitrary feature limits. Every plan includes all 14 modules and full support.
                    </p>
                </motion.div>

                {/* Pricing card */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative max-w-4xl mx-auto group">

                    {/* Animated glow border */}
                    <div className="absolute -inset-0.5 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"
                        style={{ background: 'linear-gradient(135deg, #17305a, #00b6d5, #63cae0, #17305a)', backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease infinite' }} />

                    <div className="relative bg-white/95 dark:bg-[#0d1721]/95 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-[#00b6d5]/20 shadow-2xl">
                        {/* Top bar */}
                        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #17305a, #0f6187, #00b6d5, #63cae0)' }} />

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left: What you get */}
                            <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-gray-200/50 dark:border-white/10">
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-text-secondary mb-2">What's included</p>
                                <h3 className="text-2xl font-black text-text-primary mb-6">Everything. For real.</h3>

                                <div className="grid grid-cols-1 gap-3">
                                    {FEATURES.map((f, i) => (
                                        <motion.div key={f}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + i * 0.04 }}
                                            className="flex items-center gap-3 group/item">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                                                style={{ borderColor: 'rgba(0,182,213,0.3)', background: 'rgba(0,182,213,0.08)' }}>
                                                <CheckCircle2 className="w-3 h-3" style={{ color: '#00b6d5' }} />
                                            </div>
                                            <span className="text-sm text-text-secondary font-medium group-hover/item:text-text-primary transition-colors">{f}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Pricing + CTA */}
                            <div className="p-8 sm:p-10 flex flex-col justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Pricing model</p>

                                    <div className="mb-6 p-5 rounded-2xl border"
                                        style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.05)' }}>
                                        <div className="text-5xl font-black mb-2 brand-text-gradient">
                                            Custom
                                        </div>
                                        <p className="text-text-secondary text-sm font-semibold">Tailored to your school size & requirements</p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {[
                                            { label: 'Pricing Model', value: 'Annual License (One-time per year)' },
                                            { label: 'Per-Student Charge', value: '❌ None — ever' },
                                            { label: 'Hidden Fees', value: '❌ None' },
                                            { label: 'Cloud Subscription', value: '❌ Not required' },
                                            { label: 'Setup & Onboarding', value: '✅ Included free' },
                                        ].map(r => (
                                            <div key={r.label} className="flex items-start justify-between gap-4 text-sm border-b border-gray-100 dark:border-white/5 pb-2">
                                                <span className="text-text-secondary font-medium">{r.label}</span>
                                                <span className="font-bold text-text-primary text-right">{r.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Link to="/contact">
                                        <motion.button whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,182,213,0.3)' }} whileTap={{ scale: 0.98 }}
                                            className="w-full btn-primary text-base px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                                            <PhoneCall className="w-4 h-4" />
                                            Get a Quote for Your School
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                    <Link to="/pricing"
                                        className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-text-secondary hover:text-[var(--primary-main)] transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                        View all pricing plans
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <p className="text-center text-sm text-text-secondary mt-8">
                    💡 Early access offer — schools that sign up now get <strong className="text-text-primary">founder pricing</strong> locked in for life. <Link to="/contact" className="underline" style={{ color: '#00b6d5' }}>Contact us to know more.</Link>
                </p>
            </div>
        </section>
    );
}
