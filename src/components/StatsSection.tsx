import { motion } from 'framer-motion';
import { Layers, Users, KeyRound, WifiOff, Zap, GraduationCap } from 'lucide-react';

/**
 * Verified against production Release 1.4.0.
 *
 * These figures are rendered as static text on purpose. They were previously
 * animated count-ups that started at 0, so any hydration hiccup or a paused
 * animation left a school director staring at "0+ Modules" during a live pitch.
 * The number is now in the markup itself and can never render as zero.
 */
const STATS = [
    {
        icon: Layers,
        display: '16',
        label: 'Fully Wired Modules',
        desc: 'Admissions · Fees · Attendance · Exams · Transport · HR · Library · Front Office — every one live, end to end',
        border: 'border-slate-200/70 dark:border-white/10',
        iconColor: 'text-white',
        iconBg: 'bg-gradient-to-br from-[#1E1B4B] to-[#312E81] dark:from-[#312E81] dark:to-[#4F46E5] ring-1 ring-white/10',
    },
    {
        icon: Zap,
        display: '100+',
        label: 'Production Screens',
        desc: 'Fully navigable screens across the admin console and both portals — finished software, not prototypes',
        border: 'border-slate-200/70 dark:border-white/10',
        iconColor: 'text-white',
        iconBg: 'bg-gradient-to-br from-[#1E1B4B] to-[#312E81] dark:from-[#312E81] dark:to-[#4F46E5] ring-1 ring-white/10',
    },
    {
        icon: GraduationCap,
        display: '2',
        displaySuffix: ' + App',
        label: 'Portals + Android App',
        desc: 'A Teacher portal and a Student & Parent portal, plus a native Android app with push alerts',
        border: 'border-slate-200/70 dark:border-white/10',
        iconColor: 'text-white',
        iconBg: 'bg-gradient-to-br from-[#1E1B4B] to-[#312E81] dark:from-[#312E81] dark:to-[#4F46E5] ring-1 ring-white/10',
    },
    {
        icon: KeyRound,
        display: '96',
        label: 'Granular Permission Keys',
        desc: 'Grant access one key at a time — the principal, the cashier and the front desk each see only their own work',
        border: 'border-amber-300/60 dark:border-amber-500/25',
        iconColor: 'text-white',
        iconBg: 'bg-gradient-to-br from-[#F59E0B] to-[#EA580C] ring-1 ring-black/5',
    },
    {
        icon: Users,
        display: '∞',
        label: 'Unlimited Students',
        desc: 'No student count cap — scales with your school, however large it grows',
        border: 'border-slate-200/70 dark:border-white/10',
        iconColor: 'text-white',
        iconBg: 'bg-gradient-to-br from-[#1E1B4B] to-[#312E81] dark:from-[#312E81] dark:to-[#4F46E5] ring-1 ring-white/10',
    },
    {
        icon: WifiOff,
        display: '₹0',
        label: 'Monthly Cloud Bill',
        desc: 'Runs on your own server over the school LAN — you pay for software, not someone else\'s cloud',
        border: 'border-slate-200/70 dark:border-white/10',
        iconColor: 'text-white',
        iconBg: 'bg-gradient-to-br from-[#F59E0B] to-[#EA580C] ring-1 ring-black/5',
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
                    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white">
                        Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#EA580C] to-[#F59E0B] dark:from-[#FBBF24] dark:via-[#F59E0B] dark:to-[#FB923C]">EduAnant delivers</span> — on Day 1
                    </h2>
                    <p className="text-sm text-text-secondary mt-3 max-w-xl mx-auto">
                        Counted from the running Release 1.4.0 build — not a roadmap.
                    </p>
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
                                                                className={`relative rounded-2xl p-6 border ${stat.border} bg-white dark:bg-white/[0.03] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group overflow-hidden`}>

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
                                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-amber-400/25" />

                                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4 shadow-md`}>
                                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                                </div>

                                <div className={`font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-1 tabular-nums`}>
                                    {stat.display}
                                    {stat.displaySuffix && (
                                        <span className="text-xl md:text-2xl font-extrabold align-middle">{stat.displaySuffix}</span>
                                    )}
                                </div>
                                <p className="font-display font-bold text-text-primary text-sm mb-1">{stat.label}</p>
                                <p className="text-text-secondary text-xs leading-relaxed">{stat.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
