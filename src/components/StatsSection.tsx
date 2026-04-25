import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Layers, Users, ShieldCheck, Zap, BookOpen, GraduationCap } from 'lucide-react';

function CountUp({ target, suffix = '', prefix = '', duration = 2.2 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-10% 0px' });

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, target, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setCount(Math.round(v)),
        });
        return controls.stop;
    }, [inView, target, duration]);

    return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
}

const STATS = [
    {
        icon: Layers,
        value: 14,
        suffix: '+',
        label: 'Fully Operational Modules',
        desc: 'Admissions · Fees · Attendance · Exams · Transport · Staff — all live, all ready',
        gradient: 'from-indigo-500/20 to-blue-500/10',
        border: 'border-indigo-500/20',
        iconColor: 'text-indigo-400',
        iconBg: 'bg-indigo-500/10',
        glow: 'shadow-indigo-500/10',
    },
    {
        icon: GraduationCap,
        value: 3,
        suffix: ' Portals',
        label: 'Dedicated Role Portals',
        desc: 'Admin · Teacher · Student & Parent — each tailored',
        gradient: 'from-emerald-500/20 to-teal-500/10',
        border: 'border-emerald-500/20',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
        glow: 'shadow-emerald-500/10',
    },
    {
        icon: Users,
        value: 0,
        suffix: '',
        displayText: '∞',
        label: 'Unlimited Students',
        desc: 'No student count cap — scales with your school, however large it grows',
        gradient: 'from-amber-500/20 to-orange-500/10',
        border: 'border-amber-500/20',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
        glow: 'shadow-amber-500/10',
    },
    {
        icon: ShieldCheck,
        value: 100,
        suffix: '%',
        label: 'Uptime Guarantee',
        desc: 'Runs on your own server — you own your data, always',
        gradient: 'from-rose-500/20 to-pink-500/10',
        border: 'border-rose-500/20',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-500/10',
        glow: 'shadow-rose-500/10',
    },
    {
        icon: Zap,
        value: 52,
        suffix: '+',
        label: 'Application Pages',
        desc: 'A complete, deeply-built ERP — nothing half-done',
        gradient: 'from-violet-500/20 to-purple-500/10',
        border: 'border-violet-500/20',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        glow: 'shadow-violet-500/10',
    },
    {
        icon: BookOpen,
        value: 29,
        suffix: '+',
        label: 'Backend Service Modules',
        desc: 'Deeply built API layer powering every workflow with precision',
        gradient: 'from-cyan-500/20 to-sky-500/10',
        border: 'border-cyan-500/20',
        iconColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/10',
        glow: 'shadow-cyan-500/10',
    },
];

export default function StatsSection() {
    return (
        <section className="py-20 relative overflow-x-clip">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-main/3 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-3">By the numbers</p>
                    <h2 className="text-3xl md:text-4xl font-black text-text-primary">
                        Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-main to-secondary-main">EduAnant delivers</span> — on Day 1
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {STATS.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -5 }}
                                className={`relative rounded-2xl p-6 border ${stat.border} bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm hover:shadow-xl transition-all duration-500 group overflow-hidden`}>

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
                                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 ${stat.iconBg}`} />

                                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}>
                                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                                </div>

                                <div className={`text-4xl md:text-5xl font-black ${stat.iconColor} mb-1 tabular-nums`}>
                                    {'displayText' in stat
                                        ? <span>{(stat as { displayText: string }).displayText}</span>
                                        : <CountUp target={stat.value} suffix={stat.suffix} />
                                    }
                                </div>
                                <p className="font-bold text-text-primary text-sm mb-1">{stat.label}</p>
                                <p className="text-text-secondary text-xs leading-relaxed">{stat.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
