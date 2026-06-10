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
                            <strong className="text-text-primary">Last updated:</strong> June 10, 2026 &nbsp;·&nbsp; Applies to: EduAnant web platform & EduAnant mobile app (package: <code className="text-xs bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">cloud.eduanant.app</code>)
                        </p>
                        
                        <div className="space-y-10 text-text-secondary leading-relaxed text-base md:text-lg">
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">1</span>
                                    Introduction and Role
                                </h3>
                                <p>This Privacy Policy outlines how EduAnant (operated by Snapx Technologies) collects, uses, and protects data across our web platform and our mobile application ("EduAnant", available on Google Play and Apple App Store). Under the Digital Personal Data Protection (DPDP) Act, 2023, EduAnant primarily acts as a <strong className="text-text-primary">Data Processor</strong> for the schools (the <strong className="text-text-primary">Data Fiduciary</strong>) that use our platform.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">2</span>
                                    Collection and Use of Data
                                </h3>
                                <p>We process personal data (including student, parent, and staff details) solely for the purpose of providing our School Management System services. The types of data processed are determined by the subscribing School. We strictly do not sell, rent, or monetize this data to any third parties.</p>
                                <ul className="mt-4 space-y-2 list-none">
                                    {[
                                        ['Name & contact details', 'School administrators, staff, parents — for account management and communication'],
                                        ['Student records', 'Academic, attendance, fee data — entered and controlled by the subscribing School'],
                                        ['Usage & session data', 'Login timestamps, IP address, browser/device info — for security and service improvement'],
                                        ['SMS logs', 'Records of notifications sent via our integrated SMS gateway — retained for 90 days'],
                                    ].map(([item, desc]) => (
                                        <li key={item} className="flex gap-3 items-start">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#00b6d5] shrink-0" />
                                            <span><strong className="text-text-primary">{item}:</strong> {desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            
                            <section className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-500/20">
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                     <span className="w-8 h-8 rounded-lg bg-[#00b6d5]/10 text-[#00b6d5] flex items-center justify-center text-sm font-black shrink-0">3</span>
                                    Mobile App & Device Permissions
                                </h3>
                                <p className="mb-4">The EduAnant mobile application (package name: <strong className="text-text-primary">cloud.eduanant.app</strong>) provides access to the school portals and supports native features like push notifications. The app itself does <strong className="text-text-primary">not collect or store any personal data</strong> on our servers beyond what is required to maintain your login session and deliver notifications.</p>
                                <p className="mb-4 font-semibold text-text-primary">Permissions requested by the app:</p>
                                <ul className="space-y-2 list-none">
                                    {[
                                        ['INTERNET', 'Required to access and load the school portal service.'],
                                        ['CAMERA', 'Required solely to allow the school portal to perform face recognition attendance check-in. The app does not save or transmit photos/videos from your camera feed to our servers.'],
                                        ['POST_NOTIFICATIONS', 'Required to receive push notifications for announcements, messages, and student alerts from your school.'],
                                        ['BIOMETRICS (Face ID / Fingerprint)', 'Used exclusively for local secure login. Biometric verification is processed entirely on the user\'s device and is never sent to our servers.'],
                                    ].map(([perm, desc]) => (
                                        <li key={perm} className="flex gap-3 items-start">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#00b6d5] shrink-0" />
                                            <span><strong className="text-text-primary">{perm}:</strong> {desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            
                            <section className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/50 dark:border-white/10">
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center text-sm font-black shrink-0">4</span>
                                    Processing of Children's Data
                                </h3>
                                <p>In compliance with the DPDP Act 2023, processing data of individuals under 18 requires verifiable parental consent. <strong className="text-text-primary">It is the strict legal responsibility of the subscribing School</strong> to obtain this consent before entering any student data into the EduAnant platform. EduAnant relies entirely on the School's authorization to process this data. The EduAnant app is intended for use by school administrators and staff, not directly by children.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">5</span>
                                    Data Security & Sub-processors
                                </h3>
                                <p>We implement industry-standard security measures (including TLS encryption in transit and AES-256 encryption at rest) to protect data. We may use trusted third-party infrastructure providers (e.g., cloud hosting, SMS gateways) to deliver our services. By using our platform, you consent to this necessary sub-processing. We do not share your data with advertisers or analytics platforms.</p>
                            </section>

                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">6</span>
                                    Cookies & Local Storage
                                </h3>
                                <p>Our web service uses essential cookies and browser local storage to maintain your login session and store user preferences (such as theme and language). We do not use third-party tracking cookies or advertising cookies. Clearing your browser/app data will log you out of the service.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 text-text-primary flex items-center justify-center text-sm font-black shrink-0">7</span>
                                    Data Retention
                                </h3>
                                <p>We retain data only as long as the School's subscription remains active. Upon termination of the subscription or upon written request from the School, we will securely delete or anonymize the data within 60 days, except where retention is required by Indian law.</p>
                            </section>

                            <section className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-200/50 dark:border-green-500/20">
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-black shrink-0">8</span>
                                    Your Rights & Data Deletion
                                </h3>
                                <p className="mb-4">You have the right to access, correct, or request deletion of your personal data at any time. To exercise any of these rights:</p>
                                <ul className="space-y-2 list-none mb-4">
                                    {[
                                        'Email us at eduanant.cloud@gmail.com with subject line "Data Request"',
                                        'Specify whether you want access, correction, or deletion of your data',
                                        'We will verify your identity and respond within 30 days',
                                        'For account/data deletion: all personal data associated with your account will be permanently erased within 60 days of a verified request',
                                    ].map((item) => (
                                        <li key={item} className="flex gap-3 items-start">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-400">Note: All data deletion requests are handled manually by our team to ensure complete and verified removal across all systems. We do not offer a one-click delete — this protects schools from accidental loss of critical academic data.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-[#00b6d5]/10 text-[#00b6d5] flex items-center justify-center text-sm font-black shrink-0">9</span>
                                    Grievance Redressal
                                </h3>
                                <p>For any privacy-related concerns, data breaches, or data rights requests, please contact our Grievance Officer immediately at <a href="mailto:eduanant.cloud@gmail.com" className="text-[#00b6d5] hover:underline font-semibold">eduanant.cloud@gmail.com</a>. We aim to respond to all valid requests within 30 days. This policy may be updated periodically — we will notify subscribing Schools of any material changes via email.</p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
