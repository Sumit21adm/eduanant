import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function PricingSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const yGlow = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={containerRef} id="pricing" className="py-24 relative overflow-x-clip">
            {/* Ambient Background Glow */}
            <motion.div
                style={{ y: yGlow }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-main/10 dark:bg-primary-main/5 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Infinite Scalability
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-6xl font-black text-text-primary mb-6 tracking-tight leading-tight"
                    >
                        Enterprise <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent">Ready</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        EduAnant is built to scale from single-campus schools to vast university networks. Our pricing scales with your needs.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-3xl mx-auto group"
                >
                    {/* Glowing border effect on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-main via-secondary-main to-primary-main rounded-[2rem] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative bg-paper dark:bg-[#111318]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">

                        {/* Shimmer line */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent"></div>

                        <div className="bg-primary-main/5 dark:bg-primary-main/10 p-8 sm:p-12 text-center border-b border-primary-main/10 dark:border-white/5 relative overflow-hidden">
                            {/* Inner abstract glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary-main/10 to-transparent opacity-50 pointer-events-none"></div>

                            <h3 className="text-2xl font-black text-text-primary mb-2 relative z-10">Custom Enterprise Plan</h3>
                            <p className="text-text-secondary mb-8 relative z-10">Tailored implementation for large institutions</p>

                            <h4 className="text-5xl md:text-6xl font-black mb-4 relative z-10">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-main to-secondary-main">
                                    Let's Talk
                                </span>
                            </h4>
                            <p className="text-sm text-text-secondary uppercase tracking-widest font-bold relative z-10">Custom Pricing</p>
                        </div>

                        <div className="p-8 sm:p-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-12">
                                {[
                                    "Unlimited Students & Staff",
                                    "Priority 24/7 Support",
                                    "Custom Module Development",
                                    "Dedicated Account Manager",
                                    "Full API Access",
                                    "On-Premise Deployment Options"
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="flex items-center gap-3 group/item"
                                    >
                                        <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700 bg-background dark:bg-black/40 flex items-center justify-center group-hover/item:border-primary-main group-hover/item:bg-primary-main/10 transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-main opacity-80 group-hover/item:opacity-100" />
                                        </div>
                                        <span className="text-text-secondary font-medium group-hover/item:text-text-primary transition-colors">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <a href="#contact" className="relative group/btn w-full sm:w-auto">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-main to-secondary-main rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-500"></div>
                                    <button className="relative w-full sm:w-auto btn-primary text-lg px-12 py-4 flex items-center justify-center gap-2 rounded-xl backdrop-blur-md">
                                        Request Partnership
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
