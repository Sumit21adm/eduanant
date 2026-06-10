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
                            <strong className="text-text-primary">Last updated:</strong> June 10, 2026 &nbsp;·&nbsp; Applies to: EduAnant web platform & EduAnant mobile app (package: <code className="text-xs bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">cloud.eduanant.app</code>)
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

                            <section className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-500/20">
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-[#00b6d5]/10 text-[#00b6d5] flex items-center justify-center text-sm font-black shrink-0">7</span>
                                    Mobile App — Additional Terms
                                </h3>
                                <p className="mb-4">The EduAnant mobile application (package name: <code className="text-xs bg-white/50 dark:bg-white/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/30">cloud.eduanant.app</code>) provides access to the school portals. By downloading or using the mobile app, you agree to these Terms in full, as well as the <a href="https://play.google.com/intl/en_us/about/play-terms/" target="_blank" rel="noopener noreferrer" className="text-[#00b6d5] hover:underline font-semibold">Google Play / Apple App Store Terms of Service</a>.</p>
                                <ul className="space-y-2 list-none">
                                    {[
                                        ['App updates', 'We may release updates to the mobile app at any time. Continued use of the app after an update constitutes acceptance of any revised terms. We recommend enabling auto-updates.'],
                                        ['Availability', 'We do not guarantee the app will remain available on application stores indefinitely. We reserve the right to withdraw or unpublish the app with reasonable notice.'],
                                        ['Web service dependency', 'The app requires an active internet connection and a valid EduAnant account provisioned by a subscribing School. The app has no standalone functionality without the web service.'],
                                        ['App permissions', 'The app requests INTERNET, CAMERA (for face recognition attendance), POST_NOTIFICATIONS, and local BIOMETRICS permissions as outlined in our Privacy Policy.'],
                                    ].map(([title, desc]) => (
                                        <li key={title} className="flex gap-3 items-start">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#00b6d5] shrink-0" />
                                            <span><strong className="text-text-primary">{title}:</strong> {desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">8</span>
                                    Acceptable Use & Prohibited Activities
                                </h3>
                                <p className="mb-4">You agree not to use EduAnant (web or Android app) to:</p>
                                <ul className="space-y-2 list-none">
                                    {[
                                        'Reverse engineer, decompile, disassemble, or attempt to extract the source code of the app or platform',
                                        'Scrape, crawl, or use automated tools to extract data from the platform without written authorization',
                                        'Attempt to circumvent authentication, security controls, or rate limits',
                                        'Use the platform to store, transmit, or process data unrelated to school management',
                                        'Resell, sublicense, or white-label the service without a formal reseller agreement with Snapx Technologies',
                                        'Violate any applicable Indian law, including the IT Act 2000, DPDP Act 2023, or any state-level regulations',
                                    ].map((item) => (
                                        <li key={item} className="flex gap-3 items-start">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">9</span>
                                    Changes to These Terms
                                </h3>
                                <p>We reserve the right to modify these Terms at any time. Material changes will be communicated to subscribing Schools via email at least 14 days before they take effect. Continued use of the service or app after the effective date of updated Terms constitutes your acceptance of the changes. The current version is always available at <a href="https://eduanant.cloud/terms-of-service" className="text-[#00b6d5] hover:underline font-semibold">eduanant.cloud/terms-of-service</a>.</p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
