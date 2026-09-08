import { motion } from 'framer-motion';

export default function RefundPolicyPage() {
    return (
        <div className="pt-14 pb-24 relative">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#F59E0B]/5 to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-4 bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[var(--accent-text)]">
                            Legal Document
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
                            Cancellation & Refund Policy
                        </h1>
                        <p className="text-text-secondary">How the trial works, when you are invoiced, and what happens if you leave.</p>
                    </div>

                    <div className="bg-white/80 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                        <p className="text-sm text-text-secondary mb-10 pb-4 border-b border-gray-200 dark:border-white/10">
                            <strong className="text-text-primary">Last updated:</strong> 7 September 2026
                        </p>
                        
                        <div className="space-y-10 text-text-secondary leading-relaxed text-base md:text-lg">
                            <section className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-500/20">
                                <h3 className="text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-black shrink-0">1</span>
                                    Thirty days before any invoice
                                </h3>
                                <p>Every school starts on a 30-day trial. We install EduAnant, migrate your existing records and train your staff, and you run the school on it for a month. <strong className="text-text-primary">No invoice is raised during that period.</strong> If you decide against it before the trial ends, you owe us nothing and you keep a full export of your data.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">2</span>
                                    After the trial: billing and cancellation
                                </h3>
                                <p>Once you confirm, the subscription is prepaid — annually, or monthly if you prefer. You can cancel at any time and it takes effect at the end of the cycle you have already paid for; nothing further is charged. <strong className="text-text-primary">We do not refund unused time within a cycle that has already started</strong>, so an annual subscription cancelled in month three runs to the end of the year rather than being refunded for the remaining nine months.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">3</span>
                                    If we let you down
                                </h3>
                                <p>Where a failure is ours and it leaves the software unusable for a prolonged period, we extend your subscription by the time you lost, or issue a credit against the next cycle. We do not issue cash refunds after the trial has ended. If you self-host, note that the availability of your own server and network is not something we control.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">4</span>
                                    Your data, whenever you leave
                                </h3>
                                <p>The database sits on your own server, and you can take a full backup from inside the admin panel at any time — during the trial, mid-subscription, or on your way out. We will also generate a final export for you on request. To cancel or query a bill, write to <a href="mailto:hello@eduanant.cloud" className="text-[var(--accent-text)] hover:underline font-semibold">hello@eduanant.cloud</a> at least 7 days before your renewal date.</p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
