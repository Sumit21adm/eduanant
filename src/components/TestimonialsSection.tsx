import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'Rajesh Kumar Sharma',
        role: 'Principal',
        school: 'Saraswati Public School',
        body: 'Before EduAnant, our accountant was spending 3 days every month reconciling fee registers and Excel sheets. Now it\'s done in 30 minutes. The demand bill generation alone saved us one full-time staff member\'s salary.',
        rating: 5,
        avatar: 'RK',
        tag: '850 Students · CBSE',
        color: 'from-[#17305a] to-[#0f6187]',
    },
    {
        name: 'Sunita Devi Patel',
        role: 'School Director',
        school: 'Modern Academy',
        body: 'We tried two other school software before this. Both were complex and needed an IT person. EduAnant was up and running in one day. Our teachers mark attendance in 60 seconds. The Hindi interface is a huge plus for our support staff.',
        rating: 5,
        avatar: 'SD',
        tag: '1,200 Students · State Board',
        color: 'from-[#0f6187] to-[#00b6d5]',
    },
    {
        name: 'Mahesh Agarwal',
        role: 'Administrative Officer',
        school: 'Holy Cross Sr. Sec. School',
        body: 'The transport module is brilliant. We manage 12 buses, 340 students, and 6 routes. Earlier it was chaos — now assignments, billing, and route management are all in one screen. Parents get fee receipts instantly.',
        rating: 5,
        avatar: 'MA',
        tag: '2,100 Students · ICSE',
        color: 'from-[#00b6d5] to-[#63cae0]',
    },
    {
        name: 'Anjali Singh',
        role: 'Academic Coordinator',
        school: 'Delhi Public Convent',
        body: 'As a teacher, I was sceptical. But the teacher portal is genuinely easy. Homework posting, attendance, class tests, my timetable — everything in one place. I spend 20 minutes less every morning compared to the old paper system.',
        rating: 5,
        avatar: 'AS',
        tag: '680 Students · CBSE',
        color: 'from-emerald-600 to-teal-500',
    },
    {
        name: 'Vikram Nair',
        role: 'Chairman',
        school: 'Nair Group of Schools',
        body: 'We run 3 schools under one management. The multi-session, multi-class configuration is extremely flexible. Data migration from our old system was done by the EduAnant team in 2 days — zero headache for us.',
        rating: 5,
        avatar: 'VN',
        tag: '4,500 Students · State Board',
        color: 'from-violet-600 to-purple-500',
    },
    {
        name: 'Priya Mehta',
        role: 'Finance Manager',
        school: 'Blossom International School',
        body: 'The audit trail is excellent. Every fee transaction, every discount applied, every user action — everything is logged. During our annual audit, the auditor was impressed by how clean our digital records were.',
        rating: 5,
        avatar: 'PM',
        tag: '920 Students · CBSE',
        color: 'from-rose-600 to-pink-500',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 relative overflow-x-clip">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[150px] opacity-8"
                    style={{ background: 'radial-gradient(circle, rgba(0,182,213,0.12), transparent)' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-6"
                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.25)', color: '#00b6d5' }}>
                        <Star className="w-3.5 h-3.5 fill-current" /> Trusted by Schools Across India
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4 leading-tight">
                        Real schools.<br />
                        <span className="brand-text-gradient">Real results.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-xl mx-auto">From small schools to large institutions with thousands of students — here's what they say.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div key={t.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6 }}
                            className="relative rounded-3xl p-7 bg-white/70 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden">

                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{ background: `linear-gradient(135deg, ${t.color.split(' ')[1].slice(5)}, transparent)` }} />

                            <div className="mb-5">
                                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                                    <Quote className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, si) => (
                                    <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed mb-6 italic">"{t.body}"</p>

                            <div className="flex items-center gap-3 mt-auto">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-black text-white shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-black text-text-primary text-sm">{t.name}</p>
                                    <p className="text-[11px] text-text-secondary">{t.role} · {t.school}</p>
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block"
                                        style={{ background: 'rgba(0,182,213,0.08)', borderColor: 'rgba(0,182,213,0.2)', color: '#0091b8' }}>
                                        {t.tag}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
