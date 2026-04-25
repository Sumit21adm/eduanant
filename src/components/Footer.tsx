import { Mail, Phone, MessageCircle, ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="pt-20 pb-10 relative overflow-hidden border-t border-[#00b6d5]/10">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-8 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,182,213,0.15), transparent)' }} />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* CTA band */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="rounded-3xl p-8 sm:p-12 mb-14 overflow-hidden relative text-center"
                    style={{ background: 'linear-gradient(135deg, #17305a 0%, #0f6187 35%, #00b6d5 70%, #63cae0 100%)' }}>
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white'/%3E%3C/svg%3E\")" }} />
                    <img src="/eduanant-logo.svg" alt="" aria-hidden className="w-24 mx-auto mb-5 opacity-90" />
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Ready to modernise your school?</h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto text-base">
                        Join the growing list of Indian schools that have left behind registers, Excel sheets, and fragmented software — for one complete system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="tel:+917903612979"
                            className="flex items-center justify-center gap-2 bg-white text-[#0f6187] font-black px-7 py-3.5 rounded-xl hover:bg-[#f0faff] transition-all text-sm shadow-lg">
                            <Phone className="w-4 h-4" /> Call Us: +91 79036 12979
                        </a>
                        <a href="https://wa.me/917903612979" target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all text-sm backdrop-blur-sm">
                            <MessageCircle className="w-4 h-4" /> WhatsApp Us
                        </a>
                    </div>
                </motion.div>

                {/* Links grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-gray-200/50 dark:border-white/10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <img src="/eduanant-logo.svg" alt="EduAnant" className="w-36 mb-5" />
                        <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-5">
                            India's most complete school management application — built from scratch for Indian schools, by an Indian team.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#00b6d5' }} />
                            <span>Snapx Technologies · India</span>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-wider text-text-primary mb-5">Product</h4>
                        <ul className="space-y-3">
                            {[{l:'Features',h:'/features'},{l:'Live Demo',h:'/contact'},{l:'Pricing',h:'/pricing'},{l:'Security',h:'/security'},{l:'Updates',h:'/updates'}].map(({l,h}) => (
                                <li key={l}>
                                    <Link to={h} className="text-sm text-text-secondary hover:text-[var(--primary-main)] transition-colors">{l}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-wider text-text-primary mb-5">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:contact@eduanant.com"
                                    className="flex items-center gap-3 text-text-secondary hover:text-[var(--primary-main)] transition-colors group">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center border group-hover:border-[#00b6d5] transition-colors"
                                        style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.06)' }}>
                                        <Mail className="w-4 h-4" style={{ color: '#00b6d5' }} />
                                    </div>
                                    <span className="text-sm">contact@eduanant.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+917903612979"
                                    className="flex items-center gap-3 text-text-secondary hover:text-[var(--primary-main)] transition-colors group">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center border group-hover:border-[#00b6d5] transition-colors"
                                        style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.06)' }}>
                                        <Phone className="w-4 h-4" style={{ color: '#00b6d5' }} />
                                    </div>
                                    <span className="text-sm">+91 79036 12979</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/917903612979" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-text-secondary hover:text-[var(--primary-main)] transition-colors group">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center border group-hover:border-[#00b6d5] transition-colors"
                                        style={{ borderColor: 'rgba(0,182,213,0.2)', background: 'rgba(0,182,213,0.06)' }}>
                                        <MessageCircle className="w-4 h-4" style={{ color: '#00b6d5' }} />
                                    </div>
                                    <span className="text-sm">WhatsApp</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                        <span>© {year} EduAnant · Snapx Technologies</span>
                        <span className="hidden sm:inline opacity-30">·</span>
                        <span className="flex items-center gap-1">
                            Built with ❤️ for Indian schools
                        </span>
                    </div>
                    <div className="flex items-center gap-5">
                        <a href="#" className="hover:text-[var(--primary-main)] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[var(--primary-main)] transition-colors">Terms of Use</a>
                        <a href="https://github.com/Sumit21adm" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-[var(--primary-main)] transition-colors">
                            GitHub <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
