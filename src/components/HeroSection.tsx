import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, GraduationCap, Users, Shield, PhoneCall } from 'lucide-react';
import { TopBar, SideBar } from './ProductDemoSection';
import GooglePlayBadge from './GooglePlayBadge';
import { Link } from 'react-router-dom';


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
        chartLabel: 'Fee collection · last 7 days',
        metrics: [
            { label: "Today's collection", value: '₹64,500', sub: '18 cash · 12 UPI', tone: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Student attendance', value: '94.2%', sub: '1,178 / 1,250 present', tone: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Staff on campus', value: '48 / 50', sub: '2 substitutes assigned', tone: 'text-amber-600 dark:text-amber-400' },
        ],
    },
    {
        label: 'Teacher',
        icon: GraduationCap,
        color: 'from-emerald-500 to-teal-600',
        tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        features: ['Daily Attendance Marking', 'Homework & Class Tests', 'Lesson Plans', 'My Students View', 'Timetable & Schedule'],
        mockColor: 'from-emerald-600 to-teal-700',
        chartLabel: 'Class 8-A attendance · last 7 days',
        metrics: [
            { label: 'Attendance marked', value: '5 / 6', sub: 'Period 4 pending', tone: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Class 8-A present', value: '38 / 42', sub: '3 leave · 1 absent', tone: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Homework to review', value: '24', sub: 'Maths · due today', tone: 'text-amber-600 dark:text-amber-400' },
        ],
    },
    {
        label: 'Student / Parent',
        icon: Users,
        color: 'from-amber-500 to-orange-600',
        tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        features: ['View Attendance & Results', 'Fee Payment Status', 'Notices & Homework', 'Timetable & Transport', 'Push Alerts on the Parent App'],
        mockColor: 'from-amber-600 to-orange-700',
        chartLabel: 'Rahul\'s attendance · last 7 days',
        metrics: [
            { label: 'Fees due', value: '₹2,400', sub: 'Term 2 · due 15 Sep', tone: 'text-rose-600 dark:text-rose-400' },
            { label: 'Attendance this month', value: '96.1%', sub: '22 of 23 days present', tone: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Next exam', value: 'Maths', sub: 'Half-yearly · 12 Sep', tone: 'text-indigo-600 dark:text-indigo-400' },
        ],
    },
];


/**
 * One portal's dashboard mockup. Extracted so two of them can be stacked in the
 * same grid cell during a switch — that overlap is what makes it a genuine
 * cross-fade rather than a dip to grey and back.
 */
function PortalPanel({ t, index }: { t: (typeof PORTAL_TABS)[number]; index: number }) {
    const Icon = t.icon;
    return (
        <div className="rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/[0.07] bg-white dark:bg-[#111318] relative flex flex-col shadow-2xl shadow-blue-900/5 dark:shadow-black/40">


                        {/* Browser Chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#15181e] border-b border-gray-200 dark:border-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="ml-4 flex-1 flex justify-center">
                                <div className="flex items-center gap-2 bg-white dark:bg-[#1a1d24] text-gray-500 text-[10px] px-6 py-1.5 rounded-full border border-gray-200 dark:border-white/10 font-mono w-full max-w-sm">
                                    demo.eduanant.cloud
                                </div>
                            </div>
                        </div>

                        {/* App Layout */}
                        <div className="flex h-[380px]">
                            <SideBar activeId={index === 0 ? 'dashboard' : index === 1 ? 'academics' : 'admissions'} />
                            <div className="flex-1 flex flex-col min-w-0">
                                <TopBar />
                                <div className="flex-1 overflow-hidden relative bg-gray-50 dark:bg-[#111318] p-4 flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${t.mockColor} opacity-90 flex items-center justify-center`}>
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{t.label} Overview</h3>
                                                <p className="text-[10px] text-gray-500">Real-time data visualization</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {t.metrics.map((m) => (
                                            <div key={m.label} className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d24] shadow-sm">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 truncate">{m.label}</p>
                                                <div className={`h-1.5 rounded-full w-8 bg-gradient-to-r ${t.mockColor} opacity-80 mb-2`} />
                                                <p className={`text-lg font-black leading-none tabular-nums ${m.tone}`}>{m.value}</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 truncate">{m.sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex-1 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-end">
                                        <div className="absolute top-4 left-4">
                                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.chartLabel}</p>
                                        </div>
                                        <svg className="w-full h-32" viewBox="0 0 100 40" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id={`hg${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="var(--primary-main)" />
                                                    <stop offset="100%" stopColor="var(--secondary-main)" />
                                                </linearGradient>
                                                <linearGradient id={`hf${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="var(--primary-main)" stopOpacity="0.4" />
                                                    <stop offset="100%" stopColor="var(--primary-main)" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M0,35 Q15,20 30,25 T60,12 T100,20 L100,40 L0,40Z" fill={`url(#hf${index})`} />
                                            <path d="M0,35 Q15,20 30,25 T60,12 T100,20" fill="none" stroke={`url(#hg${index})`} strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
    );
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const [activeTab, setActiveTab] = useState(0);
    const [ticker, setTicker] = useState(0);
    // Once someone picks a portal, the carousel stops for good — during a live
    // demo the panel must stay on whatever the director asked to see.
    const [tabsLocked, setTabsLocked] = useState(false);
    const [prevTab, setPrevTab] = useState<number | null>(null);

    const selectTab = (i: number) => {
        setTabsLocked(true);
        setActiveTab(i);
    };

    // Hold the outgoing panel underneath for the length of the fade. This is set
    // during render (React's documented "adjust state when a value changes"
    // pattern) rather than in an effect, so the outgoing layer is already in
    // place on the same paint the incoming one starts fading in on — otherwise
    // there is a one-frame gap where neither panel is visible.
    const lastTab = useRef(activeTab);
    const hasMounted = useRef(false);
    if (lastTab.current !== activeTab) {
        setPrevTab(lastTab.current);
        lastTab.current = activeTab;
    }
    useEffect(() => { hasMounted.current = true; }, []);
    // Drop the outgoing layer on a timer, not on animation-complete: a stalled
    // animation must never leave the mockup on the portal the visitor just left.
    useEffect(() => {
        if (prevTab === null) return;
        const id = setTimeout(() => setPrevTab(null), 340);
        return () => clearTimeout(id);
    }, [prevTab]);

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

    // Rotate portal tab every 5s until the visitor takes control
    useEffect(() => {
        if (tabsLocked) return;
        const id = setInterval(() => setActiveTab(t => (t + 1) % PORTAL_TABS.length), 5000);
        return () => clearInterval(id);
    }, [tabsLocked]);

    // Ticker
    useEffect(() => {
        const id = setInterval(() => setTicker(t => (t + 1) % SCHOOL_TYPES.length), 2000);
        return () => clearInterval(id);
    }, []);

    const tab = PORTAL_TABS[activeTab];

    return (
        <section ref={containerRef} id="hero" className="min-h-[calc(100vh-72px)] flex items-center justify-center relative overflow-x-clip pt-12 pb-16 perspective-1000">
            {/* Background orbs */}
            <motion.div style={{ x: springX, y: springY }}
                className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-primary-main/20 dark:bg-primary-main/10 rounded-full blur-[140px] pointer-events-none" />
            <motion.div style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
                className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-secondary-main/15 dark:bg-secondary-main/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22%20fill%3D%22currentColor%22%20opacity%3D%220.15%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30 dark:opacity-10 text-gray-400 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-6xl w-full min-w-0">
                <motion.div style={{ y: yText, opacity: opacityText }} className="text-center">

                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mb-8 px-5 py-2.5 rounded-full border border-slate-300/80 dark:border-white/15 bg-slate-100 dark:bg-white/[0.06] text-[#1E1B4B] dark:text-slate-100 font-bold text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-widest shadow-sm max-w-[92vw]">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]" />
                        </div>
                        {/* Tricolour drawn as SVG. The regional-indicator flag emoji
                            does not render at all on the Windows machines most
                            school offices run — it shows as two letter boxes. */}
                        <svg viewBox="0 0 21 14" className="w-[18px] h-3 rounded-[2px] shrink-0 ring-1 ring-black/10" aria-hidden focusable="false">
                            <rect width="21" height="14" fill="#fff" />
                            <rect width="21" height="4.667" fill="#FF9933" />
                            <rect y="9.333" width="21" height="4.667" fill="#138808" />
                            <circle cx="10.5" cy="7" r="1.6" fill="none" stroke="#000080" strokeWidth="0.5" />
                        </svg>
                        <span className="text-[#B45309] dark:text-amber-400">Built for Indian Realities</span>
                        <span aria-hidden className="opacity-40">·</span>Works Offline
                        <span aria-hidden className="opacity-40">·</span>Zero Cloud Bills
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-6" style={{ lineHeight: 1.05 }}>
                        Run Your Entire School<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] animate-[gradient-shift_4s_ease_infinite] bg-[length:200%_auto]"> on Your Own Terms.</span>
                    </motion.h1>

                    {/* Sub */}
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-text-secondary mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
                        Admissions · Fees · Attendance · Exams · Transport · HR · Library · Reception —
                        built for <span className="font-bold text-text-primary">schools of all sizes — small, growing, or large.</span>
                    </motion.p>

                    {/* School type ticker */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 mb-10 text-sm text-text-secondary">
                        <span>Perfect for</span>
                        <div className="relative overflow-hidden h-7 w-40 inline-flex items-center">
                            {/* Rolls on the y-axis only. It deliberately does NOT animate
                                opacity: if the animation is ever skipped — reduced-motion,
                                an interrupted frame — the word must still be readable rather
                                than leaving the hero reading "Perfect for ___". */}
                            <motion.span
                                key={ticker}
                                initial={{ y: 7 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute font-bold text-[var(--accent-text)] whitespace-nowrap">
                                {SCHOOL_TYPES[ticker]}
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons — the amber action converts, the cyan one lets a
                        sceptical director check the claim themselves. Two different
                        jobs, so two visually distinct treatments rather than a
                        primary/secondary pair. */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-7">
                        <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full sm:w-auto text-base px-8 py-4 flex items-center justify-center gap-2 group rounded-xl transition-all duration-300">
                            <PhoneCall className="w-4 h-4" strokeWidth={1.5} />
                            Book a walkthrough
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                        </motion.a>
                        <Link to="/demo" className="w-full sm:w-auto">
                            <button className="btn-live w-full text-base px-8 py-4 flex items-center justify-center gap-2.5">
                                {/* A live indicator, not decoration — it says the demo is a
                                    running installation, not a video. */}
                                <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b6d5] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00b6d5]" />
                                </span>
                                Try the live demo
                            </button>
                        </Link>
                    </motion.div>

                    {/* The app is for everyone the school runs on — not only parents and
                        teachers — so the caption names no roles. */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                        className="flex flex-col items-center gap-2 mb-14">
                        <GooglePlayBadge />
                        <span className="text-[11px] text-text-secondary">
                            The EduAnant Android app · included free with every school
                        </span>
                    </motion.div>

                    {/* Trust line */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary mb-16">
                        {['No setup fees', 'Runs on your own server', 'Hindi & English UI', 'No internet dependency', 'Free onboarding support'].map(t => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-[#00b6d5]" strokeWidth={1.5} /> {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Portal Preview */}
                <motion.div style={{ y: yMockup }}
                    initial={{ opacity: 0, y: 80, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-5xl relative w-full min-w-0">

                    {/* Glow behind mockup */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary-main blur-[100px] opacity-20 dark:opacity-30 pointer-events-none rounded-full" />

                    <div className="relative glass-panel rounded-2xl p-2 sm:p-3 shadow-2xl mx-2 sm:mx-0 bg-background/80 dark:bg-white/[0.02] ring-1 ring-white/10 dark:ring-white/[0.06] overflow-hidden min-w-0">
                        
                        {/* Tab switcher */}
                        <div className="flex gap-2 px-3 mb-3 overflow-x-auto pb-1 mt-2">
                            {PORTAL_TABS.map((t, i) => {
                                const TIcon = t.icon;
                                return (
                                    <button key={t.label} type="button" onClick={() => selectTab(i)}
                                        aria-pressed={i === activeTab}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all whitespace-nowrap
                                            ${i === activeTab
                                                ? 'bg-[#00b6d5] text-[#0F172A] border-transparent shadow-md shadow-[#00b6d5]/40'
                                                : 'text-text-secondary border-gray-200/70 dark:border-white/10 hover:border-[#00b6d5]/60 hover:text-[var(--brand-cyan-deep)] dark:hover:text-[#00b6d5]'}`}>
                                        <TIcon className="w-3.5 h-3.5" /> {t.label} Portal
                                    </button>
                                );
                            })}
                        </div>

                        {/* Dashboard preview — the outgoing panel stays underneath
                            while the incoming one fades in over it */}
                        <div className="grid">
                            {prevTab !== null && prevTab !== activeTab && (
                                <div className="col-start-1 row-start-1" aria-hidden>
                                    <PortalPanel t={PORTAL_TABS[prevTab]} index={prevTab} />
                                </div>
                            )}
                            <motion.div key={activeTab}
                                initial={hasMounted.current ? { opacity: 0 } : false}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="col-start-1 row-start-1">
                                <PortalPanel t={tab} index={activeTab} />
                            </motion.div>
                        </div>

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
