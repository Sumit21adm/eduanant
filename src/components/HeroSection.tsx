import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function HeroSection() {
    useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

    // Parallax values
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yMockup = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const scaleMockup = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

    return (
        <section ref={containerRef} id="hero" className="min-h-[100vh] flex items-center justify-center relative overflow-x-clip pt-32 pb-24 perspective-1000">
            {/* Cinematic Background Glares */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-main/20 dark:bg-primary-main/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-main/20 dark:bg-secondary-main/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten" />

            {/* Dynamic Subtle Grid Pattern */}
            <div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
                style={{ maskImage: 'linear-gradient(to bottom, white 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, white 70%, transparent 100%)' }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl pt-10">

                {/* Parallax Content Container */}
                <motion.div style={{ y: yText, opacity: opacityText }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full border border-primary-main/20 bg-primary-main/5 dark:bg-primary-main/10 text-primary-main font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Building India's #1 EdTech Ecosystem
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-black tracking-tight text-text-primary mb-8"
                        style={{ lineHeight: 1.05 }}
                    >
                        The Infinite Ecosystem for <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-main to-secondary-main filter drop-shadow-sm">Modern Education</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        More than just software—a long-term technology partner. Architected for scale, driven by data, and built to evolve perfectly alongside your growing institution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a href="#demo" className="btn-primary w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2 group relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Try Interactive Demo
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
                        </a>
                        <a href="#contact" className="btn-outline w-full sm:w-auto text-lg px-8 py-4 bg-paper/50 backdrop-blur-sm dark:text-text-primary dark:border-gray-700 dark:hover:border-primary-main flex items-center justify-center gap-2">
                            <Play className="w-5 h-5" />
                            Contact Sales
                        </a>
                    </motion.div>
                </motion.div>

                {/* Floating Mockup Preview with 3D Rotate and Glowing Shadow */}
                <motion.div
                    style={{ y: yMockup, scale: scaleMockup }}
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 mx-auto max-w-5xl relative perspective-[2000px]"
                >
                    {/* The massive theme-colored glow behind the image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[var(--primary-main)] blur-[100px] opacity-30 dark:opacity-40 pointer-events-none rounded-full" />

                    <div className="relative glass-panel rounded-2xl p-2 sm:p-4 border-b-0 shadow-2xl mx-4 sm:mx-0 bg-background/80 dark:bg-black/40 ring-1 ring-white/10 dark:ring-white/5 transform-gpu">
                        <div className="w-full flex items-center justify-between gap-2 mb-3 px-2 border-b border-gray-200/50 dark:border-white/10 pb-3">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="text-[10px] font-mono text-text-secondary bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                www.eduananth.com
                            </div>
                            <div className="w-12"></div> {/* Spacer to center the URL */}
                        </div>

                        {/* Cinematic Animated Dummy Dashboard Stack */}
                        <div className="rounded-xl overflow-hidden border border-gray-200/50 dark:border-white/10 bg-white/40 dark:bg-black/40 relative aspect-[16/9] flex backdrop-blur-2xl transition-all duration-500">

                            {/* Glass Noise Overlay specific to the dashboard */}
                            <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                            {/* Sidebar Mock */}
                            <div className="w-[22%] border-r border-gray-200/50 dark:border-white/5 bg-white/30 dark:bg-white/[0.02] p-4 flex flex-col gap-3 hidden sm:flex z-10 backdrop-blur-md">
                                <div className="w-24 h-5 rounded-md bg-gray-300/50 dark:bg-white/10 mb-6"></div>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className={`h-8 rounded-lg flex items-center px-2 gap-3 transition-colors ${i === 0 ? 'bg-primary-main/10 border border-primary-main/20' : 'opacity-50 hover:opacity-100 dark:hover:bg-white/5'}`}>
                                        <div className={`w-4 h-4 rounded-sm ${i === 0 ? 'bg-primary-main/60 shadow-[0_0_10px_var(--primary-main)]' : 'bg-gray-400 dark:bg-white/20'}`}></div>
                                        <div className={`h-2.5 rounded-full ${i === 0 ? 'w-16 bg-primary-main/60' : 'w-12 bg-gray-400 dark:bg-white/20'}`}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Main Canvas */}
                            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 relative z-10">
                                {/* Header Mock */}
                                <div className="flex justify-between items-center bg-white/30 dark:bg-white/[0.02] backdrop-blur-md rounded-xl p-3 border border-gray-200/50 dark:border-white/5">
                                    <div className="w-32 h-5 rounded-md bg-gray-300/50 dark:bg-white/10"></div>
                                    <div className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gray-300/50 dark:bg-white/10"></div>
                                        <div className="w-7 h-7 rounded-full bg-gray-300/50 dark:bg-white/10"></div>
                                    </div>
                                </div>

                                {/* Floating Metric Cards */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    {[
                                        { color: 'from-blue-500', glow: 'shadow-blue-500/20', delay: 0 },
                                        { color: 'from-emerald-500', glow: 'shadow-emerald-500/20', delay: 0.1 },
                                        { color: 'from-amber-500', glow: 'shadow-amber-500/20', delay: 0.2 },
                                        { color: 'from-purple-500', glow: 'shadow-purple-500/20', delay: 0.3 },
                                    ].map((style, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -6, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, delay: style.delay, ease: 'easeInOut' }}
                                            className="p-4 rounded-xl border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md relative overflow-hidden group"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${style.color} to-transparent opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                                            <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center bg-white dark:bg-black/50 border border-gray-100 dark:border-white/10 shadow-sm ${style.glow}`}>
                                                <div className={`w-3.5 h-3.5 rounded-sm bg-gradient-to-br ${style.color} to-transparent opacity-80`}></div>
                                            </div>
                                            <div className="w-16 h-2.5 rounded-full bg-gray-300 dark:bg-white/20 mb-3"></div>
                                            <div className="w-20 h-6 rounded-md bg-gray-800 dark:bg-white/90"></div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Cinematic Charts Area */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Main Line Chart */}
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                                        className="col-span-2 rounded-xl border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md p-5 flex flex-col relative overflow-hidden"
                                    >
                                        <div className="w-40 h-4 rounded-full bg-gray-300 dark:bg-white/20 mb-8 relative z-10"></div>

                                        {/* Chart Grid Lines */}
                                        <div className="absolute inset-x-5 inset-y-16 flex flex-col justify-between z-0 opacity-20">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="w-full h-px bg-gray-400 dark:bg-white/20 border-dashed border-b"></div>
                                            ))}
                                        </div>

                                        <div className="flex-1 relative z-10 flex items-end">
                                            {/* Glowing SVG Path */}
                                            <svg className="w-full h-[120%] absolute bottom-[-10%] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                                <defs>
                                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="var(--primary-main)" />
                                                        <stop offset="50%" stopColor="var(--secondary-main)" />
                                                        <stop offset="100%" stopColor="var(--primary-main)" />
                                                    </linearGradient>
                                                    <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="var(--primary-main)" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="var(--primary-main)" stopOpacity="0" />
                                                    </linearGradient>
                                                    <filter id="glow">
                                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                        <feMerge>
                                                            <feMergeNode in="coloredBlur" />
                                                            <feMergeNode in="SourceGraphic" />
                                                        </feMerge>
                                                    </filter>
                                                </defs>
                                                {/* Filled Area under line */}
                                                <path d="M0,80 Q10,50 30,60 T60,30 T100,50 L100,100 L0,100 Z" fill="url(#fillGrad)" style={{ animation: 'pulse 4s ease-in-out infinite alternate' }}></path>
                                                {/* Stroke Line */}
                                                <path d="M0,80 Q10,50 30,60 T60,30 T100,50" fill="none" stroke="url(#lineGrad)" strokeWidth="3" filter="url(#glow)" className="opacity-90"></path>
                                            </svg>
                                        </div>

                                        {/* Animated Scanner Laser */}
                                        <motion.div
                                            animate={{ left: ['-10%', '110%'] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                            className="absolute top-0 bottom-0 w-[2px] bg-white dark:bg-primary-main/80 blur-[1px] shadow-[0_0_15px_var(--primary-main)] z-20"
                                        />
                                    </motion.div>

                                    {/* Holographic Donut Chart */}
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 4.5, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
                                        className="rounded-xl border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md p-4 flex flex-col items-center justify-center relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-primary-main/5 blur-2xl rounded-full scale-150 group-hover:bg-primary-main/10 transition-colors duration-700"></div>

                                        <div className="relative w-36 h-36 rounded-full border-[8px] border-white/50 dark:border-black/50 shadow-inner flex items-center justify-center">
                                            {/* Spinning colored segments */}
                                            <div className="absolute inset-[-8px] rounded-full border-[8px] border-transparent border-t-primary-main border-r-secondary-main animate-[spin_12s_linear_infinite] filter drop-shadow-[0_0_10px_var(--primary-main)] opacity-80"></div>
                                            <div className="absolute inset-[-8px] rounded-full border-[8px] border-transparent border-b-amber-500 border-l-transparent animate-[spin_8s_linear_infinite_reverse] filter drop-shadow-[0_0_10px_theme(colors.amber.500)] opacity-60"></div>

                                            {/* Center Stats */}
                                            <div className="text-center bg-white/80 dark:bg-black/80 w-24 h-24 rounded-full flex flex-col items-center justify-center backdrop-blur-md border border-white/50 dark:border-white/10 shadow-lg">
                                                <div className="text-2xl font-black text-gray-800 dark:text-white bg-clip-text">100%</div>
                                                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Uptime</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Massive Fade out bottom to blend seamlessly into next section */}
                            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-30" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
