import { motion } from 'framer-motion';

export default function RefundPolicyPage() {
    return (
        <div className="pt-32 pb-24 relative">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#00b6d5]/5 to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-4 bg-[#00b6d5]/10 border-[#00b6d5]/20 text-[#00b6d5]">
                            Legal Document
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
                            Cancellation & Refund Policy
                        </h1>
                        <p className="text-text-secondary">Details regarding billing, cancellations, and our strictly non-refundable model.</p>
                    </div>

                    <div className="bg-white/80 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                        <p className="text-sm text-text-secondary mb-10 pb-4 border-b border-gray-200 dark:border-white/10">
                            <strong className="text-text-primary">Last updated:</strong> May 2026
                        </p>
                        
                        <div className="space-y-10 text-text-secondary leading-relaxed text-base md:text-lg">
                            <section className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-200/50 dark:border-red-500/20">
                                <h3 className="text-xl md:text-2xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-black shrink-0">1</span>
                                    General Subscription Terms
                                </h3>
                                <p>EduAnant operates strictly on a prepaid B2B subscription model. Because our service requires significant upfront cloud resource provisioning, database configuration, and dedicated onboarding effort per institution, <strong className="text-text-primary">all sales are final and subscription fees are completely non-refundable.</strong></p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">2</span>
                                    Cancellations
                                </h3>
                                <p>Schools may cancel their subscription at any time. Cancellations will take effect at the end of the current paid billing cycle. You will not be charged for the subsequent cycle. However, <strong className="text-text-primary">no prorated refunds</strong> will be issued for partial months or unused time within the active billing cycle. Your data will remain accessible until the end of the paid period.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">3</span>
                                    Service Degradation Exceptions
                                </h3>
                                <p>In the highly unlikely event that the EduAnant platform suffers severe, prolonged downtime exceeding our internal SLA metrics due to our exclusive fault, we may, at our sole and absolute discretion, issue <strong className="text-text-primary">Service Credits</strong> towards your next billing cycle. We do not issue cash refunds or chargebacks under any circumstances.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">4</span>
                                    Contact for Billing
                                </h3>
                                <p>If you have a billing dispute or wish to notify us of your intent to cancel, please contact your dedicated account manager or email our billing team at <a href="mailto:billing@eduanant.com" className="text-[#00b6d5] hover:underline font-semibold">billing@eduanant.com</a> at least 7 days before your next renewal date.</p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
