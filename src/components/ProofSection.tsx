import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    KeyRound, GitCommitVertical, ShieldCheck, Server, MessageSquare, Handshake, ArrowRight,
} from 'lucide-react';

// We are pre-first-customer. Instead of borrowed credibility, this section points at
// things a school can verify for itself before signing anything.
const PROOF = [
    {
        icon: KeyRound,
        title: 'Log in to the real thing',
        body: 'Not a video, not a slide deck. Open the live demo with working admin, teacher and accountant logins and click through every screen on this website before you talk to us.',
        cta: 'Open the live demo', to: '/demo',
        color: 'from-[#17305a] to-[#0f6187]', border: 'border-[#17305a]/25', bg: 'bg-[#17305a]/5',
    },
    {
        icon: GitCommitVertical,
        title: 'Read every change we have shipped',
        body: 'Six releases since April 2026, each one listed with its date and what actually changed. If a product is being maintained, its release history shows it. Ours is public.',
        cta: 'See the release history', to: '/updates',
        color: 'from-[#0f6187] to-[#00b6d5]', border: 'border-[#0091b8]/25', bg: 'bg-[#0091b8]/5',
    },
    {
        icon: ShieldCheck,
        title: 'Inspect the security model first',
        body: 'Who can see what, what is encrypted, what is written to the audit trail — documented in plain language before you hand over a single student record.',
        cta: 'Read the security page', to: '/security',
        color: 'from-violet-700 to-violet-500', border: 'border-violet-500/25', bg: 'bg-violet-500/5',
    },
    {
        icon: Server,
        title: 'You hold the database',
        body: 'EduAnant runs on your server. If you ever stop paying us, the data does not go anywhere — it is already on your machine, in a standard PostgreSQL database you can export.',
        cta: 'How it is deployed', to: '/features',
        color: 'from-emerald-700 to-emerald-500', border: 'border-emerald-500/25', bg: 'bg-emerald-500/5',
    },
    {
        icon: Handshake,
        title: 'Founding school terms, in writing',
        body: 'The first ten schools get a locked price, a paid pilot they can walk away from, and direct influence on what gets built next. All of it stated on the pricing page, not left to a conversation.',
        cta: 'See founding terms', to: '/pricing',
        color: 'from-amber-700 to-amber-500', border: 'border-amber-500/25', bg: 'bg-amber-500/5',
    },
    {
        icon: MessageSquare,
        title: 'Talk to the people who build it',
        body: 'No call centre, no reseller in the middle. When you ask why something works the way it does, the answer comes from the person who wrote it.',
        cta: 'Start a conversation', to: '/contact',
        color: 'from-rose-700 to-rose-500', border: 'border-rose-500/25', bg: 'bg-rose-500/5',
    },
];

export default function ProofSection() {
    return (
        <section className="py-24 relative overflow-x-clip">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[150px] opacity-8"
                    style={{ background: 'radial-gradient(circle, rgba(0,182,213,0.12), transparent)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-14">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Handshake className="w-3.5 h-3.5" /> Onboarding our first 10 schools
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4 leading-tight">
                        No testimonials yet.<br />
                        <span className="brand-text-gradient">Evidence instead.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        EduAnant is new, and we would rather say so than put words in a principal's mouth.
                        Here is everything you can check for yourself before you trust us with your school.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PROOF.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={p.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-3xl p-7 border ${p.border} ${p.bg} bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm hover:shadow-2xl transition-all duration-500 flex flex-col`}>

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg mb-5`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                <h3 className="text-lg font-black text-text-primary mb-2 leading-snug">{p.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{p.body}</p>

                                <Link to={p.to}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                                    style={{ color: '#0091b8' }}>
                                    {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-center text-sm text-text-secondary mt-10 max-w-2xl mx-auto">
                    When our first schools have been live long enough to have an opinion worth quoting,
                    their names and their words will appear here — with their permission.
                </motion.p>
            </div>
        </section>
    );
}
