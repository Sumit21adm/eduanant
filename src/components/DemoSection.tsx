import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LayoutDashboard, Users, CalendarCheck, CreditCard, Settings, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const screens = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-4 h-4" />,
        src: '/screenshots/dashboard-light.png',
        darkSrc: '/screenshots/dashboard-dark.png',
        caption: 'Real-time dashboard with student stats, attendance trends, fee collections, and demographic insights.',
    },
    {
        id: 'students',
        label: 'Student Admissions',
        icon: <Users className="w-4 h-4" />,
        src: '/screenshots/students.png',
        darkSrc: '/screenshots/students.png', // Assuming single version for now
        caption: 'Manage 1,090+ active students — search, filter by class/section, view profiles, and record new admissions.',
    },
    {
        id: 'attendance',
        label: 'Attendance',
        icon: <CalendarCheck className="w-4 h-4" />,
        src: '/screenshots/attendance.png',
        darkSrc: '/screenshots/attendance.png',
        caption: 'Mark daily attendance by class and section with date-picker controls, holiday tracking, and leave management.',
    },
    {
        id: 'fees',
        label: 'Fee Collection',
        icon: <CreditCard className="w-4 h-4" />,
        src: '/screenshots/fees.png',
        darkSrc: '/screenshots/fees.png',
        caption: 'Process fee collections with auto-assigned receipt numbers, multiple payment modes, and financial history.',
    },
    {
        id: 'dark',
        label: 'Dark Mode',
        icon: <Moon className="w-4 h-4" />,
        src: '/screenshots/dashboard-dark.png',
        darkSrc: '/screenshots/dashboard-dark.png',
        caption: 'A stunning dark mode built-in — easy on the eyes for administrators working late into the night.',
    },
    {
        id: 'settings',
        label: 'App Settings',
        icon: <Settings className="w-4 h-4" />,
        src: '/screenshots/settings.png',
        darkSrc: '/screenshots/settings.png',
        caption: 'Comprehensive system settings — configure institution details, academic sessions, and system preferences.',
    },
];

export default function DemoSection() {
    const { isDarkMode } = useTheme();
    const [active, setActive] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const yGlow = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={containerRef} id="demo" className="py-24 relative overflow-x-clip">

            {/* Cinematic Background Glow */}
            <motion.div
                style={{ y: yGlow }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-main/10 dark:bg-primary-main/5 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black text-text-primary mb-6 tracking-tight leading-tight">
                        See EduAnant <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent">in Action</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
                        Real screenshots from the live application — no mockups, no placeholders. What you see is exactly what you get.
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {screens.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => setActive(i)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${active === i
                                ? 'bg-primary-main text-white border-primary-main shadow-md shadow-primary-main/20 scale-105'
                                : 'bg-paper text-text-secondary border-gray-200 dark:border-white/10 hover:border-primary-main/50 hover:text-primary-main dark:hover:bg-white/5'
                                }`}
                        >
                            {s.icon}
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Screenshot Display */}
                <div className="relative max-w-5xl mx-auto perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 20, rotateX: 10 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: -20, rotateX: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="transform-gpu"
                        >
                            {/* Browser chrome */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary-main/5 border border-gray-200/80 dark:border-white/10 bg-paper">
                                <div className="bg-gray-50 dark:bg-gray-900/50 flex items-center gap-1.5 px-4 py-3 border-b border-gray-200/80 dark:border-white/10">
                                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                    <div className="flex-1 ml-4 flex justify-center sm:justify-start">
                                        <div className="bg-white dark:bg-black/40 rounded-md px-3 py-1.5 text-xs text-text-secondary text-left font-mono border border-gray-200 dark:border-white/10 w-full sm:max-w-xs flex items-center gap-2">
                                            <span className="opacity-50">🔒</span> www.eduananth.com
                                        </div>
                                    </div>
                                    <span className="hidden sm:inline-block text-[10px] text-green-700 dark:text-green-400 font-bold uppercase tracking-wider bg-green-100 dark:bg-green-400/10 px-2 py-1 rounded-full border border-green-200 dark:border-green-400/20">
                                        Live App
                                    </span>
                                </div>
                                <div className="relative bg-background">
                                    {/* The dark mode toggle logic will be handled by the user switching to the Dark Mode tab, or we can use the context. For now, since the actual screenshot varies per tab, we just render what's defined. */}
                                    <img
                                        src={isDarkMode && screens[active].darkSrc ? screens[active].darkSrc : screens[active].src}
                                        alt={screens[active].label}
                                        className="w-full h-auto object-cover object-top"
                                        style={{ maxHeight: '600px' }}
                                    />

                                    {/* Data Privacy Blur Overlay for Student Admissions Screenshot (index 1) */}
                                    {active === 1 && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[48%] backdrop-blur-[8px] bg-white/5 dark:bg-black/20 z-10 flex items-center justify-center border-t border-white/20 dark:border-white/5">
                                            <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-md border border-white/10 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                                Student Data Obfuscated
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none z-20"></div>
                                </div>
                            </div>

                            {/* Caption */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mt-6 text-text-secondary text-sm md:text-base max-w-2xl mx-auto dark:text-gray-400"
                            >
                                {screens[active].caption}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
