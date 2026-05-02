import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-text-secondary">How we handle and protect your school's data.</p>
                    </div>

                    <div className="bg-white/80 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                        <p className="text-sm text-text-secondary mb-10 pb-4 border-b border-gray-200 dark:border-white/10">
                            <strong className="text-text-primary">Last updated:</strong> May 2026
                        </p>
                        
                        <div className="space-y-10 text-text-secondary leading-relaxed text-base md:text-lg">
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">1</span>
                                    Introduction and Role
                                </h3>
                                <p>This Privacy Policy outlines how EduAnant (operated by Snapx Technologies) collects, uses, and protects data. Under the Digital Personal Data Protection (DPDP) Act, 2023, EduAnant primarily acts as a <strong className="text-text-primary">Data Processor</strong> for the schools (the <strong className="text-text-primary">Data Fiduciary</strong>) that use our platform.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">2</span>
                                    Collection and Use of Data
                                </h3>
                                <p>We process personal data (including student, parent, and staff details) solely for the purpose of providing our School Management System services. The types of data processed are determined by the subscribing School. We strictly do not sell, rent, or monetize this data to any third parties.</p>
                            </section>
                            
                            <section className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/50 dark:border-white/10">
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center text-sm font-black shrink-0">3</span>
                                    Processing of Children's Data
                                </h3>
                                <p>In compliance with the DPDP Act 2023, processing data of individuals under 18 requires verifiable parental consent. <strong className="text-text-primary">It is the strict legal responsibility of the subscribing School</strong> to obtain this consent before entering any student data into the EduAnant platform. EduAnant relies entirely on the School's authorization to process this data.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">4</span>
                                    Data Security & Sub-processors
                                </h3>
                                <p>We implement industry-standard security measures (including encryption in transit and at rest) to protect data. We may use trusted third-party infrastructure providers (e.g., cloud hosting, SMS gateways) to deliver our services. By using our platform, you consent to this necessary sub-processing.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">5</span>
                                    Data Retention
                                </h3>
                                <p>We retain data only as long as the School's subscription remains active. Upon termination of the subscription or upon written request from the School, we will securely delete or anonymize the data within 60 days, except where retention is required by Indian law.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-[#00b6d5]/10 text-[#00b6d5] flex items-center justify-center text-sm font-black shrink-0">6</span>
                                    Grievance Redressal
                                </h3>
                                <p>For any privacy-related concerns, data breaches, or data rights requests, please contact our Grievance Officer immediately at <a href="mailto:contact@eduanant.com" className="text-[#00b6d5] hover:underline font-semibold">contact@eduanant.com</a>. We aim to respond to all valid requests within 30 days.</p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
