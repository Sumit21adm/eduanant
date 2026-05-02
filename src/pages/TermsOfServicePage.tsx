import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
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
                            Terms of Service
                        </h1>
                        <p className="text-text-secondary">Commercial B2B agreement for schools using EduAnant.</p>
                    </div>

                    <div className="bg-white/80 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                        <p className="text-sm text-text-secondary mb-10 pb-4 border-b border-gray-200 dark:border-white/10">
                            <strong className="text-text-primary">Last updated:</strong> May 2026
                        </p>
                        
                        <div className="space-y-10 text-text-secondary leading-relaxed text-base md:text-lg">
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">1</span>
                                    Acceptance of Terms
                                </h3>
                                <p>By registering, accessing, or using the EduAnant School Management System ("Service"), the subscribing institution ("Client", "School") agrees to be bound by these Terms of Service. This constitutes a binding commercial B2B agreement between Snapx Technologies and the subscribing School.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">2</span>
                                    License & Intellectual Property
                                </h3>
                                <p>EduAnant grants the School a limited, non-exclusive, non-transferable, and revocable subscription license to use the Service solely for its internal administrative purposes. Snapx Technologies retains all intellectual property rights to the software, codebase, architecture, and branding. The School retains all ownership rights to the data they upload.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">3</span>
                                    Service Availability
                                </h3>
                                <p>While we strive for maximum uptime and reliability, the Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee uninterrupted or error-free operation. We are not liable for any service disruptions caused by third-party infrastructure failures (such as AWS/DigitalOcean outages), internet service provider issues, or force majeure events.</p>
                            </section>
                            
                            <section className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-200/50 dark:border-orange-500/20">
                                <h3 className="text-xl md:text-2xl font-bold text-orange-800 dark:text-orange-400 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-black shrink-0">4</span>
                                    Limitation of Liability
                                </h3>
                                <p>To the maximum extent permitted by Indian law, Snapx Technologies shall not be liable for any indirect, incidental, consequential, or punitive damages (including but not limited to loss of profits, admissions, or data). <strong className="text-text-primary">Our total cumulative liability to the School for any claims arising out of this agreement shall be strictly limited to the amount actually paid by the School for the Service in the three (3) months preceding the claim.</strong></p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">5</span>
                                    Account Termination
                                </h3>
                                <p>We reserve the right to suspend or terminate access to the Service immediately, without prior notice or liability, if the School breaches these Terms, engages in illegal activities, or fails to pay subscription fees on time. Upon termination, the School's right to use the Service ceases immediately.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">6</span>
                                    Governing Law
                                </h3>
                                <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from or relating to this agreement shall be subject to the exclusive jurisdiction of the courts located in our principal place of business in India.</p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
