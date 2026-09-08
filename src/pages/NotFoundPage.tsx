import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Compass } from 'lucide-react';
import Seo from '../lib/seo';

const ELSEWHERE = [
    { to: '/features', label: 'All 16 modules', desc: 'Admissions, fees, attendance, exams and the rest' },
    { to: '/pricing', label: 'Pricing', desc: '₹20 per student a month, everything included' },
    { to: '/demo', label: 'Live demo', desc: 'A running install, open without sign-up' },
    { to: '/contact', label: 'Talk to us', desc: 'Book a walkthrough at your school' },
];

/**
 * Served for any URL that is not a real route. Marked noindex so a mistyped or
 * stale link never enters the index, and given genuine onward links so a visitor
 * who lands here from an old share still finds what they came for.
 */
export default function NotFoundPage() {
    return (
        <>
            <Seo
                title="Page Not Found | EduAnant School Management System"
                description="This page does not exist. Find EduAnant's modules, pricing, live demo and contact details here."
                path="/404"
                noindex
            />
            <div className="pt-14 pb-24 relative">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                            style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                            <Compass className="w-3.5 h-3.5" strokeWidth={1.5} /> 404
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-5 leading-tight">
                            That page isn&apos;t here.<br />
                            <span className="brand-text-gradient">Everything else is.</span>
                        </h1>
                        <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed mb-10">
                            The link may be old or mistyped. Here is where most people are heading.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
                        {ELSEWHERE.map((e, i) => (
                            <motion.div key={e.to}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}>
                                <Link to={e.to}
                                    className="group block rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white dark:bg-white/[0.03]
                                        p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                                    <span className="flex items-center gap-1.5 font-display font-extrabold text-text-primary mb-1">
                                        {e.label}
                                        <ArrowRight className="w-3.5 h-3.5 text-[var(--brand-cyan-deep)] dark:text-[#00b6d5] group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                                    </span>
                                    <span className="block text-sm text-text-secondary">{e.desc}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <Link to="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base">
                        <Home className="w-4 h-4" strokeWidth={1.5} /> Back to the homepage
                    </Link>
                </div>
            </div>
        </>
    );
}
