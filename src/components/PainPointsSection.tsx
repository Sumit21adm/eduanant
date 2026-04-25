import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Check, AlertCircle, TrendingDown, IndianRupee, Clock, FileSpreadsheet, Database, ChevronRight } from 'lucide-react';

const PAIN_POINTS = [
    {
        before: 'Attendance in physical registers',
        after: 'One-tap bulk attendance on any device',
        beforeDetail: 'Teachers spend 15–20 min every morning. Wrong entries, lost registers, messy corrections.',
        afterDetail: 'Mark entire class attendance in under 60 seconds. Auto-generates monthly reports.',
        icon: Clock,
        color: 'emerald',
    },
    {
        before: 'Fee receipts written by hand or in Tally',
        after: 'Instant digital PDF receipts with UPI/Cash/Cheque',
        beforeDetail: 'Accountant manages 3 registers + Excel. Month-end reconciliation takes 3 days.',
        afterDetail: 'Auto-generated demand bills, split payments, instant PDF receipts. Reconciled in minutes.',
        icon: IndianRupee,
        color: 'blue',
    },
    {
        before: 'Student data scattered across files & Excel',
        after: 'Single digital profile from admission to alumni',
        beforeDetail: 'Admission form, TC, mark sheets, transport details — all in different places.',
        afterDetail: 'Complete digital profile with docs, history, fees, attendance — all in one place.',
        icon: Database,
        color: 'violet',
    },
    {
        before: '5 different softwares for 5 different things',
        after: 'Everything in one fully integrated platform',
        beforeDetail: 'Separate software for fees, attendance, exams. Data never talks to each other.',
        afterDetail: '14 modules that are tightly integrated. Fee dues auto-link with attendance reports.',
        icon: FileSpreadsheet,
        color: 'amber',
    },
];

const colorMap: Record<string, { card: string; badge: string; dot: string; text: string }> = {
    emerald: {
        card: 'border-emerald-500/30 bg-emerald-500/5',
        badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        dot: 'bg-emerald-500',
        text: 'text-emerald-500',
    },
    blue: {
        card: 'border-blue-500/30 bg-blue-500/5',
        badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        dot: 'bg-blue-500',
        text: 'text-blue-500',
    },
    violet: {
        card: 'border-violet-500/30 bg-violet-500/5',
        badge: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
        dot: 'bg-violet-500',
        text: 'text-violet-500',
    },
    amber: {
        card: 'border-amber-500/30 bg-amber-500/5',
        badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        dot: 'bg-amber-500',
        text: 'text-amber-500',
    },
};

export default function PainPointsSection() {
    const [active, setActive] = useState(0);

    return (
        <section className="py-24 relative overflow-x-clip">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-white/10 to-transparent" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest border border-red-500/20 mb-6">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Sound Familiar?
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-5 leading-tight">
                        Every Indian school admin<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">knows these headaches.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        We talked to 100+ school principals across India. These are the exact problems they deal with every single day — and exactly why we built EduAnant.
                    </p>
                </motion.div>

                {/* Tab selector */}
                <div className="flex flex-wrap gap-3 justify-center mb-10">
                    {PAIN_POINTS.map((p, i) => {
                        const colors = colorMap[p.color];
                        const Icon = p.icon;
                        return (
                            <motion.button
                                key={i}
                                onClick={() => setActive(i)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${i === active ? `${colors.badge} border-opacity-100 shadow-md` : 'border-gray-200/50 dark:border-white/10 text-text-secondary hover:border-gray-300 dark:hover:border-white/20'}`}>
                                <Icon className="w-3.5 h-3.5" />
                                Problem {i + 1}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Before / After card */}
                {PAIN_POINTS.map((pain, i) => {
                    const colors = colorMap[pain.color];
                    const Icon = pain.icon;
                    if (i !== active) return null;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

                            {/* BEFORE */}
                            <div className="relative rounded-3xl p-8 border border-red-500/20 bg-red-500/5 backdrop-blur-sm overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                                        <X className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-red-500">The Problem — Today</span>
                                </div>
                                <h3 className="text-xl font-black text-text-primary mb-3">{pain.before}</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">{pain.beforeDetail}</p>
                                <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 px-3 py-2 rounded-full border border-red-500/20 w-fit">
                                    <TrendingDown className="w-3.5 h-3.5" />
                                    Wasted time, errors, frustrated staff
                                </div>
                            </div>

                            {/* AFTER */}
                            <div className={`relative rounded-3xl p-8 border ${colors.card} backdrop-blur-sm overflow-hidden group`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 ${colors.dot} opacity-10 rounded-full blur-2xl`} />
                                <div className="flex items-center gap-2 mb-5">
                                    <div className={`w-8 h-8 rounded-full ${colors.badge} flex items-center justify-center`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-widest ${colors.text}`}>With EduAnant</span>
                                </div>
                                <h3 className="text-xl font-black text-text-primary mb-3">{pain.after}</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">{pain.afterDetail}</p>
                                <div className={`flex items-center gap-2 text-xs font-semibold ${colors.badge} px-3 py-2 rounded-full border w-fit`}>
                                    <Icon className="w-3.5 h-3.5" />
                                    Saves hours every single day
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Navigation dots */}
                <div className="flex gap-2 justify-center mt-8">
                    {PAIN_POINTS.map((_, i) => (
                        <button key={i} onClick={() => setActive(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-primary-main' : 'w-1.5 bg-gray-300 dark:bg-white/20'}`} />
                    ))}
                </div>

                {/* Bottom line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-main/10 to-secondary-main/10 border border-primary-main/20">
                        <ChevronRight className="w-5 h-5 text-primary-main" />
                        <p className="text-base font-bold text-text-primary">
                            EduAnant replaces <span className="text-primary-main">registers, Excel sheets, Tally entries, and 3–5 other tools</span> — with one platform your whole school uses.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
