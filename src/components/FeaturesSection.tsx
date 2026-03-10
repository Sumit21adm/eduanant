import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
    LayoutDashboard, Users, BookOpen, CalendarCheck, CreditCard, ClipboardList,
    Bus, UserCog, Settings,
    BarChart3, Layers, Award, Zap,
    Moon, Database, Download, ShieldCheck, Palette,
    Globe, Bell, Eye, Lock, FileText, Sparkles, ArrowRight,
    Activity, AppWindow, Type, ShieldAlert,
    KeyRound, RefreshCcw, ShieldOff, Cpu,
    Upload, FileSearch, AlertCircle, Table2,
    Monitor, Server, Cloud
} from 'lucide-react';

// Each module gets a "cinematic scene" treatment
const scenes = [
    {
        act: '01',
        gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
        glow: 'shadow-blue-500/20',
        icon: LayoutDashboard,
        title: 'The Command Center',
        module: 'Dashboard Analytics',
        story: 'Transform intuition into strategy. Your morning brief is no longer a stack of papers, but a live, breathing data ecosystem. Monitor institutional health, predict trends, and make executive decisions with absolute clarity.',
        features: ['Real-time institutional health metrics', 'Predictive demographic & fee analytics', 'Automated anomaly detection', 'Executive-level KPI visualization', 'Cross-campus live synchronization'],
        size: 'lg',
    },
    {
        act: '02',
        gradient: 'from-violet-600 via-purple-600 to-fuchsia-500',
        glow: 'shadow-purple-500/20',
        icon: Users,
        title: 'The Digital Blueprint',
        module: 'Student Lifecycle',
        story: 'We don\'t just store data; we map journeys. From the first admission inquiry to proud alumni status, every interaction, achievement, and milestone is woven into a master narrative that scales with your growing institution.',
        features: ['End-to-end lifecycle management', 'Comprehensive digital profiling', 'Intelligent promotion algorithms', 'Alumni engagement tracking', 'Secure, scalable cloud storage'],
        size: 'md',
    },
    {
        act: '03',
        gradient: 'from-amber-500 via-orange-500 to-rose-500',
        glow: 'shadow-orange-500/20',
        icon: CalendarCheck,
        title: 'Frictionless Operations',
        module: 'Attendance Matrix',
        story: 'Time is your most valuable asset. We engineered a system that eliminates administrative friction, turning a 15-minute daily chore into a single tap. Gain instant visibility into campus-wide presence and behavioral trends.',
        features: ['Frictionless bulk attendance capture', 'Behavioral presence analytics', 'Automated leave orchestration', 'Historical trend forecasting', 'Instant administrative reporting'],
        size: 'md',
    },
    {
        act: '04',
        gradient: 'from-rose-600 via-pink-600 to-red-500',
        glow: 'shadow-rose-500/20',
        icon: CreditCard,
        title: 'Financial Sovereignty',
        module: 'Revenue Engine',
        story: 'Take absolute control of your institution\'s financial heartbeat. Auto-generated demand bills, seamless digital payment gateways, and predictive revenue tracking. We don\'t just collect money; we secure your financial future.',
        features: ['Intelligent demand bill generation', 'Unified multi-gateway integration', 'Automated outstanding recovery', 'Dynamic fee structure modeling', 'Comprehensive audit-ready ledgers'],
        size: 'lg',
    },
    {
        act: '05',
        gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
        glow: 'shadow-emerald-500/20',
        icon: BookOpen,
        title: 'The Academic Substrate',
        module: 'Core Infrastructure',
        story: 'The foundational architecture upon which your institution operates. Configure it once, and watch the entire campus snap into alignment. Designed for infinite scalability, whether you manage one campus or fifty.',
        features: ['Boundless structural configuration', 'Dynamic subject & curriculum mapping', 'Automated session transitions', 'Intelligent resource allocation', 'Conflict-free timetabling algorithms'],
        size: 'sm',
    },
    {
        act: '06',
        gradient: 'from-cyan-600 via-sky-600 to-blue-600',
        glow: 'shadow-cyan-500/20',
        icon: ClipboardList,
        title: 'Analytical Assessments',
        module: 'Examination Engine',
        story: 'Move beyond mere testing to true academic intelligence. Schedule, assess, and evaluate without the anxiety. Generate deep analytical insights that empower educators and inform curricular evolution.',
        features: ['Automated scheduling & logistics', 'Granular performance analytics', 'Customizable grading rubrics', 'One-click consolidated reporting', 'Parent-facing digital report cards'],
        size: 'sm',
    },
    {
        act: '07',
        gradient: 'from-orange-600 via-red-500 to-pink-600',
        glow: 'shadow-orange-500/20',
        icon: Bus,
        title: 'Logistics, Mastered',
        module: 'Fleet Operations',
        story: 'Total visibility and control over your moving assets. Optimize routes, manage billing automatically, and ensure the safety of every student with an enterprise-grade transit orchestration system.',
        features: ['Dynamic route optimization', 'Integrated fleet tracking & metrics', 'Automated transport billing', 'Driver compliance \& assignment', 'Geospatial student mapping'],
        size: 'sm',
    },
    {
        act: '08',
        gradient: 'from-slate-700 via-gray-700 to-zinc-600',
        glow: 'shadow-slate-500/20',
        icon: UserCog,
        title: 'Fortified Security',
        module: 'Access Governance',
        story: 'Enterprise-grade security is not a feature; it is our foundation. Construct intricate, impenetrable role hierarchies. Delegate with confidence, knowing every digital action is heavily encrypted and perfectly audited.',
        features: ['Granular role-based access control (RBAC)', 'Module-level precise permissions', 'Immutable activity audit logs', 'Enterprise password policies', 'Zero-trust architecture readiness'],
        size: 'sm',
    },
    {
        act: '09',
        gradient: 'from-fuchsia-600 via-purple-600 to-violet-700',
        glow: 'shadow-fuchsia-500/20',
        icon: Settings,
        title: 'Institutional DNA',
        module: 'System Identity',
        story: 'EduAnant is a chameleon engineered to wear your institution\'s identity. From localized currency and timezone structures, to injecting your exact brand colors into the core UI. It does not feel like software; it feels like your software.',
        features: ['White-label brand integration', 'Global localization & currency mapping', 'Custom UI/UX theme engine', 'Automated disaster recovery', 'Compliance & ISO certification mapping'],
        size: 'lg',
    },
];

const microCategories = [
    {
        category: 'Security & Access',
        desc: 'Fortified from the ground up.',
        gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
        border: 'border-violet-500/20 hover:border-violet-400/40',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        animateIcon: { scale: [1, 1.2, 1] },
        Icon: ShieldCheck,
        features: [
            { icon: ShieldCheck, label: 'Role-Based Access' },
            { icon: Lock, label: 'Secure Auth' },
            { icon: KeyRound, label: 'License Activation' },
            { icon: Eye, label: 'Audit Logs' },
            { icon: Bell, label: 'Session Alerts' },
        ],
    },
    {
        category: 'Updates & Reliability',
        desc: 'Zero-downtime. Always on.',
        gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
        border: 'border-amber-500/20 hover:border-amber-400/40',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
        animateIcon: { rotate: [0, 360] },
        Icon: RefreshCcw,
        features: [
            { icon: Activity, label: 'Live Update Logs' },
            { icon: RefreshCcw, label: 'One-Click Updates' },
            { icon: ShieldAlert, label: 'Failsafe Rollbacks' },
            { icon: ShieldOff, label: 'Vulnerability Patching' },
            { icon: Cpu, label: 'Update Lock Guard' },
        ],
    },
    {
        category: 'Data & Imports',
        desc: 'Clean data in. Insight out.',
        gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
        border: 'border-blue-500/20 hover:border-blue-400/40',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
        animateIcon: { y: [0, -4, 0] },
        Icon: Database,
        features: [
            { icon: Upload, label: 'Bulk Student Import' },
            { icon: FileSearch, label: 'Duplicate Detection' },
            { icon: AlertCircle, label: 'Skip Reason Logs' },
            { icon: Table2, label: 'Smart CSV Parsing' },
            { icon: Database, label: 'Conflict-Free Imports' },
            { icon: Zap, label: 'Smart Data Caching' },
        ],
    },
    {
        category: 'UI & Experience',
        desc: 'Thoughtful, beautiful, yours.',
        gradient: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
        border: 'border-fuchsia-500/20 hover:border-fuchsia-400/40',
        iconColor: 'text-fuchsia-400',
        iconBg: 'bg-fuchsia-500/10',
        animateIcon: { rotate: [0, 10, -10, 0] },
        Icon: Palette,
        features: [
            { icon: Moon, label: 'Dark Mode' },
            { icon: AppWindow, label: 'Native UI Dialogs' },
            { icon: Palette, label: 'Custom Theme Colors' },
            { icon: Type, label: 'Smart Formatting' },
            { icon: Globe, label: 'Multi-Currency' },
        ],
    },
    {
        category: 'Finance & Operations',
        desc: 'Every rupee. Every receipt.',
        gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
        border: 'border-emerald-500/20 hover:border-emerald-400/40',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
        animateIcon: { y: [0, -3, 0] },
        Icon: FileText,
        features: [
            { icon: Download, label: 'Export to Excel' },
            { icon: FileText, label: 'Auto Receipt Nos.' },
        ],
    },
];

const upcoming = [
    { icon: BarChart3, title: 'AI Analytics', desc: 'Predictive insights into student performance' },
    { icon: Layers, title: 'Library', desc: 'Book catalog, issuance & return tracking' },
    { icon: Award, title: 'Hostel & Mess', desc: 'Accommodation & dining management' },
    { icon: Sparkles, title: 'Payroll', desc: 'Staff salary & payslip generation' },
];

// Cinematic Narrative Block (Replaces Bento Card)
function SceneCard({ scene, index }: { scene: typeof scenes[0]; index: number }) {
    const Icon = scene.icon;
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-[3rem] overflow-hidden group border border-gray-200/50 dark:border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl shadow-2xl min-h-[500px] flex flex-col md:flex-row items-stretch"
        >
            {/* Massive Ambient Glow for the entire card */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br ${scene.gradient} opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity duration-1000 blur-3xl pointer-events-none rounded-full scale-150`} />

            {/* Content Side */}
            <div className={`p-10 md:p-20 flex-1 flex flex-col justify-center relative z-10 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                {/* Act number & Label */}
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${scene.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-text-secondary text-xs font-black tracking-[0.3em] uppercase">
                            ACT {scene.act}
                        </div>
                        <div className="text-primary-main font-bold tracking-widest text-sm uppercase">
                            {scene.module}
                        </div>
                    </div>
                </div>

                <h3 className="font-black text-text-primary mb-6 leading-tight text-4xl md:text-5xl">
                    {scene.title}
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl">
                    {scene.story}
                </p>

                <ul className="space-y-4">
                    {scene.features.map((f, fi) => (
                        <motion.li
                            key={fi}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (fi * 0.1) }}
                            className="flex items-center gap-3 text-text-secondary group/item"
                        >
                            <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700 bg-background dark:bg-black/40 flex items-center justify-center group-hover/item:border-primary-main group-hover/item:bg-primary-main/10 transition-colors">
                                <Sparkles className="w-3 h-3 text-primary-main opacity-70 group-hover/item:opacity-100" />
                            </div>
                            <span className="font-medium group-hover/item:text-text-primary transition-colors">{f}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Visual/Abstract Side */}
            <div className={`flex-1 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-auto border-t md:border-t-0 border-gray-200/50 dark:border-white/5 bg-gradient-to-br ${scene.gradient} ${isEven ? 'md:border-l md:order-2' : 'md:border-r md:order-1'}`}>
                {/* Glass overlay to mute the bright gradient slightly */}
                <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm mix-blend-overlay"></div>

                {/* Abstract geometric composition */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[150%] h-[150%] opacity-30"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")" }}
                />

                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700"
                >
                    <Icon className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

    return (
        <section id="features" ref={sectionRef} className="py-24 relative overflow-x-clip">

            {/* Ambient background breathing orbs */}
            <motion.div
                style={{ y }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-40 left-[10%] w-[600px] h-[600px] rounded-full bg-primary-main blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten"
            />
            <motion.div
                style={{ y }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-40 right-[10%] w-[800px] h-[800px] rounded-full bg-secondary-main blur-[150px] pointer-events-none mix-blend-screen dark:mix-blend-lighten"
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Cinematic Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> 9 Modules · Fully Operational
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-5xl md:text-6xl font-black text-text-primary mb-6 leading-tight"
                    >
                        One platform.<br />
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                            Every story.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
                    >
                        From the morning dashboard check to the last fee receipt of the year — every workflow, every module, every tiny feature — built, shipped, and running right now.
                    </motion.p>
                </div>

                {/* Sprawling Vertical Narrative Stack */}
                <div className="flex flex-col gap-16 md:gap-32 mb-20">
                    {scenes.map((scene, i) => (
                        <SceneCard key={scene.act} scene={scene} index={i} />
                    ))}
                </div>

                {/* Built-in Power Features Cards */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-text-secondary mb-2">Shipped with love</p>
                        <h3 className="text-3xl md:text-4xl font-black text-text-primary">Hidden in plain sight</h3>
                        <p className="text-text-secondary mt-3 text-sm max-w-lg mx-auto">Small features that make every interaction feel considered.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {microCategories.map((cat, ci) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: ci * 0.1, duration: 0.6 }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-3xl p-8 bg-gradient-to-br ${cat.gradient} border ${cat.border} bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500`}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <motion.div
                                    animate={cat.animateIcon}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-5`}
                                >
                                    <cat.Icon className={`w-6 h-6 ${cat.iconColor}`} />
                                </motion.div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-1">{cat.category}</p>
                                <h4 className="text-lg font-black text-text-primary mb-5">{cat.desc}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.features.map((f) => {
                                        const FIcon = f.icon;
                                        return (
                                            <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-medium text-text-secondary">
                                                <FIcon className={`w-3 h-3 ${cat.iconColor}`} />
                                                {f.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-32"
                >
                    <div className="text-center mb-12">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-text-secondary mb-2">Under the hood</p>
                        <h3 className="text-3xl md:text-4xl font-black text-text-primary">Built on a world-class stack</h3>
                        <p className="text-text-secondary mt-3 text-sm max-w-lg mx-auto">Every technology chosen for performance, security, and longevity — not trend.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                category: 'Frontend',
                                desc: 'Pixel-perfect, blazing-fast interfaces.',
                                gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
                                border: 'border-cyan-500/20 hover:border-cyan-400/40',
                                iconColor: 'text-cyan-400',
                                iconBg: 'bg-cyan-500/10',
                                animateIcon: { rotate: [0, 5, -5, 0] },
                                Icon: Monitor,
                                techs: [
                                    { name: 'React', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><circle cx="12" cy="12" r="2.05" fill="#61DAFB" /><ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" /><ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" /></svg> },
                                    { name: 'TypeScript', logo: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="3" fill="#3178C6" /><path d="M13.5 9.75h-3v1.5h3v7.5h1.5v-7.5h3v-1.5h-7.5zM6 9.75v9h1.5v-3.75h3v-1.5h-3v-2.25H12v-1.5z" fill="white" /></svg> },
                                    { name: 'Vite', logo: <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 3 12 21l-3-6.5L21 3z" fill="#646CFF" /><path d="M3 3l7.5 4.5L12 14.5 3 3z" fill="#FF8800" /></svg> },
                                    { name: 'Material UI', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0081CB"><path d="M0 0v13.5L4.5 9l4.5 9L13.5 9l1.5 3V0H0z" /><path d="M13.5 9L18 0v13.5l-4.5 4.5z" opacity="0.7" /></svg> },
                                ],
                            },
                            {
                                category: 'Backend',
                                desc: 'Resilient, scalable, and type-safe APIs.',
                                gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
                                border: 'border-green-500/20 hover:border-green-400/40',
                                iconColor: 'text-green-400',
                                iconBg: 'bg-green-500/10',
                                animateIcon: { y: [0, -3, 0] },
                                Icon: Server,
                                techs: [
                                    { name: 'Node.js', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933"><path d="M12 1.85L2 7.21v9.58L12 22.15l10-5.36V7.21L12 1.85zm0 2.31l7.5 4.02v8.04L12 20.24 4.5 16.22V8.18L12 4.16z" /></svg> },
                                    { name: 'TypeScript', logo: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="3" fill="#3178C6" /><path d="M13.5 9.75h-3v1.5h3v7.5h1.5v-7.5h3v-1.5h-7.5zM6 9.75v9h1.5v-3.75h3v-1.5h-3v-2.25H12v-1.5z" fill="white" /></svg> },
                                    { name: 'Prisma', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#5C6BC0"><path d="M21.8 18.3 13.6.8a1.3 1.3 0 0 0-2.3-.1L2.3 15.2a1.3 1.3 0 0 0 0 1.3l3.2 6.2c.4.8 1.4 1 2 .4l.5-.6 3.2-6.6 5.3 5.3c.5.5 1.3.5 1.8 0l4.1-5.2c.4-.5.4-1.2-.3-1.7z" /></svg> },
                                    { name: 'PostgreSQL', logo: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#4169E1" opacity="0.1" /><text y="17" fontSize="11" textAnchor="middle" x="12" fill="#4169E1" fontWeight="bold">PG</text></svg> },
                                ],
                            },
                            {
                                category: 'Infrastructure',
                                desc: 'Secure, portable, and automated deployments.',
                                gradient: 'from-sky-500/20 via-indigo-500/10 to-transparent',
                                border: 'border-sky-500/20 hover:border-sky-400/40',
                                iconColor: 'text-sky-400',
                                iconBg: 'bg-sky-500/10',
                                animateIcon: { scale: [1, 1.15, 1] },
                                Icon: Cloud,
                                techs: [
                                    { name: 'Docker', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2496ED"><path d="M22.3 10.6c-.4-.3-1.4-.5-2.1-.5-.2-1-1-1.8-1.8-2.3l-.4-.2-.2.4c-.3.5-.4 1.2-.4 1.7.1.6.4 1.2.8 1.6-.4.2-1.2.3-1.6.3H1.8c-.4 1.5-.3 4 1.5 5.6.8.8 2 1.4 3.5 1.4 3.2 0 5.6-1.5 6.8-4.1.5 0 1.4 0 1.9-.7.3-.4.4-.8.4-1v-.1l-.3-.2-.3.1zM5 10.7h1.8V9H5v1.7zm2 0h1.8V9H7v1.7zm2 0h1.8V9H9v1.7zm2 0h1.8V9H11v1.7zm-8-2h1.8V7H3v1.7zm2 0h1.8V7H5v1.7zm2 0h1.8V7H7v1.7zm2 0h1.8V7H9v1.7zm2 0h1.8V7H11v1.7z" /></svg> },
                                    { name: 'GitHub', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg> },
                                    { name: 'CI/CD', logo: <RefreshCcw className="w-6 h-6 text-blue-400" /> },
                                    { name: 'Linux VPS', logo: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FCC624"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm-1 14.5v-5l-2 1.5V11l3-2.25L15 11v2l-2-1.5v5h-2z" /></svg> },
                                ],
                            },
                        ].map((cat, ci) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: ci * 0.15, duration: 0.6 }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-3xl p-8 bg-gradient-to-br ${cat.gradient} border ${cat.border} bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500`}
                            >
                                {/* Top shine line */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                {/* Animated category icon */}
                                <motion.div
                                    animate={cat.animateIcon}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-5`}
                                >
                                    <cat.Icon className={`w-6 h-6 ${cat.iconColor}`} />
                                </motion.div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-1">{cat.category}</p>
                                <h4 className="text-lg font-black text-text-primary mb-1">{cat.desc}</h4>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {cat.techs.map((t) => (
                                        <div key={t.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                                            {t.logo}
                                            <span className="text-xs font-semibold text-text-secondary whitespace-nowrap">{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Roadmap */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider mb-4"
                    >
                        <Zap className="w-3 h-3" /> Our Team Builds 24 × 7
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-5xl font-black text-text-primary mb-4 leading-tight"
                    >
                        What's next on the <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent">horizon</span>
                    </motion.h3>
                    <p className="text-lg md:text-xl text-text-secondary font-medium max-w-2xl mx-auto mb-2">
                        The story doesn't end here — new chapters are being written every sprint.
                    </p>
                </div>

                <div className="relative mt-8 pt-10 pb-0">
                    {/* Cinematic Horizon Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-500/30 to-transparent transform -translate-y-1/2 hidden lg:block" />

                    {/* Moving glowing light on the horizon */}
                    <motion.div
                        className="absolute top-1/2 left-0 w-64 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-sm transform -translate-y-1/2 hidden lg:block"
                        animate={{ left: ['-20%', '120%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {upcoming.map((mod, i) => {
                            const Icon = mod.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                                    className="h-full"
                                >
                                    <motion.div
                                        animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                                        transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                                        className="relative h-full p-6 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-[#16181d]/80 backdrop-blur-xl hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-50/80 dark:from-amber-500/0 dark:to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Inner glowing orb on hover */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/20 dark:bg-amber-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-500/5 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-500">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 px-3 py-1 rounded-full backdrop-blur-sm">Coming Soon</span>
                                            </div>
                                            <h4 className="font-black text-text-primary text-lg mb-2">{mod.title}</h4>
                                            <p className="text-sm text-text-secondary leading-relaxed">{mod.desc}</p>

                                            <div className="flex items-center gap-2 mt-6 text-xs text-amber-600 dark:text-amber-400 font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                                <span>In development vault</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div >
        </section >
    );
}
