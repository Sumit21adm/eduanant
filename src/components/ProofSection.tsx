import { motion } from 'framer-motion';
import { RELEASE_COUNT } from '../data/changelog';
import { LIVE_SINCE_LABEL, monthsLiveLabel, monthsLiveUnit } from '../lib/timeline';
import { spell, capitalise } from '../lib/text';
import { Link } from 'react-router-dom';
import {
    ExternalLink,
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
        color: 'from-[#1E1B4B] to-[#312E81]', border: 'border-[#1E1B4B]/25', bg: 'bg-[#1E1B4B]/5',
    },
    {
        icon: GitCommitVertical,
        title: 'Read every change we have shipped',
        body: `${capitalise(spell(RELEASE_COUNT))} releases since ${LIVE_SINCE_LABEL}, each one listed with its date and what actually changed. If a product is being maintained, its release history shows it. Ours is public.`,
        cta: 'See the release history', to: '/updates',
        color: 'from-[#312E81] to-[#F59E0B]', border: 'border-[#D97706]/25', bg: 'bg-[#D97706]/5',
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
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12), transparent)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-14">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--accent-text)' }}>
                        <Handshake className="w-3.5 h-3.5" /> Live in production · onboarding our first 10 schools
                    </motion.div>
                    <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-4 leading-tight">
                        Already running a school.<br />
                        <span className="brand-text-gradient">Check it for yourself.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        EduAnant is young, and we would rather show you the deployment than put words in a
                        principal's mouth. Here is the school running it today, and everything else you can
                        verify before you trust us with yours.
                    </p>
                </motion.div>

                {/* The live deployment. Facts only — student and staff counts, and the
                    date it went live. No quote, because we do not have one yet. */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 rounded-3xl border border-white/10 shadow-xl shadow-indigo-950/20 overflow-hidden
                        bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81]">
                    <div className="p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="relative flex h-2 w-2" aria-hidden>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                                    Live since {LIVE_SINCE_LABEL}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                {/* The crest sits on a white plate: school logos are drawn for
                                    paper and lose their edges on a navy ground. */}
                                <span className="w-20 h-20 rounded-2xl bg-white shrink-0 flex items-center justify-center p-2.5 ring-1 ring-white/20 shadow-lg">
                                    <img src="/clients/sdv-public-school.webp"
                                        alt="S.D.V. Public School crest"
                                        width={60} height={60} loading="lazy" decoding="async"
                                        className="w-full h-full object-contain" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                                        S.D.V. Public School, Patna
                                    </h3>
                                    <p className="text-sm text-indigo-200 mt-1">CBSE affiliated · three campuses across Patna, Bihar</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                                Admissions, fee collection, attendance, examinations and staff records for the whole
                                school have run on EduAnant every working day since {LIVE_SINCE_LABEL} — through a full
                                admission cycle, a full fee cycle and a full exam cycle.
                            </p>
                            <a href="https://sdv-edu.in" target="_blank" rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#63cae0] hover:gap-2.5 transition-all duration-300">
                                Visit sdv-edu.in
                                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                            </a>
                        </div>
                        <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                            {[
                                { v: '1,300+', l: 'Active students' },
                                { v: '100+', l: 'School staff' },
                                { v: monthsLiveLabel(), l: monthsLiveUnit() },
                            ].map(st => (
                                <div key={st.l} className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 p-4 text-center">
                                    <div className="font-display text-2xl font-extrabold text-white tabular-nums leading-none">{st.v}</div>
                                    <p className="text-[10px] text-indigo-200 mt-1.5 leading-snug">{st.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
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

                                <h3 className="font-display text-lg font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-2 leading-snug">{p.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{p.body}</p>

                                <Link to={p.to}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                                    style={{ color: 'var(--accent-text)' }}>
                                    {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-center text-sm text-text-secondary mt-10 max-w-2xl mx-auto">
                    More schools are onboarding now. As each one has been live long enough to have an
                    opinion worth quoting, its words will appear here — with its permission.
                </motion.p>
            </div>
        </section>
    );
}
