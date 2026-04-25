import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, GraduationCap, Users, Shield, PhoneCall } from 'lucide-react';
import { TopBar, SideBar } from './ProductDemoSection';


const SCHOOL_TYPES = [
    'Primary Schools', 'High Schools', 'Senior Secondary', 'CBSE Schools',
    'ICSE Schools', 'State Board Schools', 'Private Schools', 'Government Schools',
    'Residential Schools', 'Day Schools', 'Co-Ed Schools', 'Girls Schools',
];

const PORTAL_TABS = [
    {
        label: 'Admin',
        icon: Shield,
        color: 'from-indigo-500 to-blue-600',
        tagColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        features: ['Real-time Dashboard & KPIs', 'Fee Collection & Demand Bills', 'Student Admissions & Lifecycle', 'Staff & User Management', 'Audit Logs & Backup'],
        mockColor: 'from-indigo-600 to-blue-700',
    },
    {
        label: 'Teacher',
        icon: GraduationCap,
        color: 'from-emerald-500 to-teal-600',
        tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        features: ['Daily Attendance Marking', 'Homework & Class Tests', 'Lesson Plans', 'My Students View', 'Timetable & Schedule'],
        mockColor: 'from-emerald-600 to-teal-700',
    },
    {
        label: 'Student / Parent',
        icon: Users,
        color: 'from-amber-500 to-orange-600',
        tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        features: ['View Attendance & Results', 'Fee Payment Status', 'Notices & Homework', 'Timetable & Transport', 'Leave Requests'],
        mockColor: 'from-amber-600 to-orange-700',
    },
];

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const [activeTab, setActiveTab] = useState(0);
    const [ticker, setTicker] = useState(0);

    const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const yMockup = useTransform(scrollYProgress, [0, 1], [0, -80]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX - innerWidth / 2) / 20);
            mouseY.set((e.clientY - innerHeight / 2) / 20);
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    // Rotate portal tab every 4s
    useEffect(() => {
        const id = setInterval(() => setActiveTab(t => (t + 1) % PORTAL_TABS.length), 4000);
        return () => clearInterval(id);
    }, []);

    // Ticker
    useEffect(() => {
        const id = setInterval(() => setTicker(t => (t + 1) % SCHOOL_TYPES.length), 2000);
        return () => clearInterval(id);
    }, []);

    const tab = PORTAL_TABS[activeTab];
    const TabIcon = tab.icon;

    return (
        <section ref={containerRef} id="hero" className="min-h-[100vh] flex items-center justify-center relative overflow-x-clip pt-28 pb-16 perspective-1000">
            {/* Background orbs */}
            <motion.div style={{ x: springX, y: springY }}
                className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-primary-main/20 dark:bg-primary-main/10 rounded-full blur-[140px] pointer-events-none" />
            <motion.div style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
                className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-secondary-main/15 dark:bg-secondary-main/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22%20fill%3D%22currentColor%22%20opacity%3D%220.15%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30 dark:opacity-10 text-gray-400 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <motion.div style={{ y: yText, opacity: opacityText }} className="text-center">

                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full border border-primary-main/25 bg-primary-main/8 dark:bg-primary-main/10 text-primary-main font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-sm">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-main opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-main" />
                        </div>
                        Building India's #1 School Management Application
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-text-primary mb-6" style={{ lineHeight: 1.05 }}>
                        Run Your Entire School<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-main via-secondary-main to-primary-main animate-[gradient-shift_4s_ease_infinite] bg-[length:200%_auto]"> From One Place</span>
                    </motion.h1>

                    {/* Sub */}
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-text-secondary mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
                        Admissions · Fees · Attendance · Exams · Transport · Staff · and much more —
                        built for <span className="font-bold text-text-primary">schools of all sizes — small, growing, or large.</span>
                    </motion.p>

                    {/* School type ticker */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 mb-10 text-sm text-text-secondary">
                        <span>Perfect for</span>
                        <div className="relative overflow-hidden h-6 w-40 inline-flex items-center">
                            <motion.span
                                key={ticker}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute font-bold text-primary-main whitespace-nowrap">
                                {SCHOOL_TYPES[ticker]}
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full sm:w-auto text-base px-8 py-4 flex items-center justify-center gap-2 group relative overflow-hidden rounded-xl shadow-lg shadow-primary-main/20">
                            <span className="relative z-10 flex items-center gap-2">
                                <PhoneCall className="w-4 h-4" />
                                Book a Free Demo
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                        <motion.a href="#features" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                            className="btn-outline w-full sm:w-auto text-base px-8 py-4 flex items-center justify-center gap-2 rounded-xl dark:text-text-primary dark:border-gray-600 dark:hover:border-primary-main">
                            <Sparkles className="w-4 h-4" />
                            Explore Features
                        </motion.a>
                    </motion.div>

                    {/* Trust line */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary mb-16">
                        {['No setup fees', 'Runs on your own server', 'Hindi & English UI', 'Works offline too', 'Free onboarding support'].map(t => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Portal Preview */}
                <motion.div style={{ y: yMockup }}
                    initial={{ opacity: 0, y: 80, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-5xl relative">

                    {/* Glow behind mockup */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary-main blur-[100px] opacity-20 dark:opacity-30 pointer-events-none rounded-full" />

                    <div className="relative glass-panel rounded-2xl p-2 sm:p-3 shadow-2xl mx-2 sm:mx-0 bg-background/80 dark:bg-black/50 ring-1 ring-white/10 dark:ring-white/5">
                        
                        {/* Tab switcher */}
                        <div className="flex gap-2 px-3 mb-3 overflow-x-auto pb-1 mt-2">
                            {PORTAL_TABS.map((t, i) => {
                                const TIcon = t.icon;
                                return (
                                    <button key={t.label} onClick={() => setActiveTab(i)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all whitespace-nowrap ${i === activeTab ? `bg-gradient-to-r ${t.color} text-white border-transparent shadow-md` : 'text-text-secondary border-gray-200/50 dark:border-white/10 hover:border-primary-main/30'}`}>
                                        <TIcon className="w-3.5 h-3.5" /> {t.label} Portal
                                    </button>
                                );
                            })}
                        </div>

                        {/* Dashboard preview */}
                        <motion.div key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white relative flex flex-col shadow-2xl shadow-blue-900/5">

                            {/* Browser Chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#15181e] border-b border-gray-200 dark:border-white/10">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="ml-4 flex-1 flex justify-center">
                                    <div className="flex items-center gap-2 bg-white dark:bg-[#1a1d24] text-gray-500 text-[10px] px-6 py-1.5 rounded-full border border-gray-200 dark:border-white/10 font-mono w-full max-w-sm">
                                        app.eduanant.cloud/{tab.label.toLowerCase().replace(/ \/ /g, '-')}
                                    </div>
                                </div>
                            </div>

                            {/* App Layout */}
                            <div className="flex h-[380px]">
                                <SideBar activeId={activeTab === 0 ? 'dashboard' : activeTab === 1 ? 'academics' : 'admissions'} />
                                <div className="flex-1 flex flex-col min-w-0">
                                    <TopBar />
                                    <div className="flex-1 overflow-hidden relative bg-gray-50 dark:bg-[#111318] p-4 flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${tab.mockColor} opacity-90 flex items-center justify-center`}>
                                                    <TabIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{tab.label} Overview</h3>
                                                    <p className="text-[10px] text-gray-500">Real-time data visualization</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {tab.features.slice(0, 3).map((f, i) => (
                                                <div key={f} className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d24] shadow-sm">
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Metric {i+1}</p>
                                                    <div className={`h-1.5 rounded-full w-8 bg-gradient-to-r ${tab.mockColor} opacity-80 mb-2`} />
                                                    <div className="h-3 rounded-full w-full bg-gray-100 dark:bg-gray-800 mb-1.5" />
                                                    <div className="h-2 rounded-full w-2/3 bg-gray-50 dark:bg-gray-900" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex-1 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-end">
                                            <div className="absolute top-4 left-4">
                                                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Activity Trend</p>
                                            </div>
                                            <svg className="w-full h-32" viewBox="0 0 100 40" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id={`hg${activeTab}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="var(--primary-main)" />
                                                        <stop offset="100%" stopColor="var(--secondary-main)" />
                                                    </linearGradient>
                                                    <linearGradient id={`hf${activeTab}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="var(--primary-main)" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="var(--primary-main)" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M0,35 Q15,20 30,25 T60,12 T100,20 L100,40 L0,40Z" fill={`url(#hf${activeTab})`} />
                                                <path d="M0,35 Q15,20 30,25 T60,12 T100,20" fill="none" stroke={`url(#hg${activeTab})`} strokeWidth="2" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feature badges below mockup */}
                        <div className="flex flex-wrap gap-2 px-3 pt-3 pb-1">
                            {tab.features.map((f) => (
                                <motion.span key={f} layout
                                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${tab.tagColor}`}>
                                    {f}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
