import { Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="py-16 relative overflow-hidden">

            {/* Cinematic Watermark */}
            <div className="absolute -bottom-24 -right-24 opacity-[0.03] dark:opacity-[0.02] pointer-events-none transform -rotate-12 scale-[3]">
                <img src="/logo.png" alt="" aria-hidden="true" className="w-[400px] h-[400px] grayscale filter" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-gray-200/50 dark:border-white/10 pb-12">

                    {/* Brand & About */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/logo.png" alt="EduAnant Logo" className="w-12 h-12 object-contain drop-shadow-sm" />
                            <span className="text-2xl font-bold tracking-tight text-text-primary">EduAnant</span>
                        </div>
                        <p className="text-text-secondary leading-relaxed max-w-sm mb-6">
                            The Infinite Ecosystem for Modern Education. Built from the ground up to scale, adapt, and evolve with your institution's needs.
                        </p>
                        <div className="hidden items-center gap-2 px-4 py-2 bg-background dark:bg-black/40 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm">
                            <span className="text-sm text-text-secondary">Proudly built by</span>
                            <a href="https://www.snapxtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-text-primary hover:text-primary-main flex items-center gap-1 transition-colors">
                                SNAPX TECHNOLOGIES <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold tracking-wider text-text-primary uppercase mb-6">Product</h4>
                        <ul className="space-y-4">
                            {['Features', 'Demo', 'Pricing', 'Documentation'].map((link) => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase()}`} className="text-text-secondary hover:text-primary-main transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-sm font-bold tracking-wider text-text-primary uppercase mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:contact@eduananth.com" className="flex items-center gap-3 text-text-secondary hover:text-primary-main transition-colors group">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary-main/10 flex items-center justify-center group-hover:bg-primary-main group-hover:text-white transition-colors">
                                        <Mail className="w-4 h-4 text-primary-main group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-sm break-words">contact@eduananth.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+917903612979" className="flex items-center gap-3 text-text-secondary hover:text-primary-main transition-colors group">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary-main/10 flex items-center justify-center group-hover:bg-primary-main group-hover:text-white transition-colors">
                                        <Phone className="w-4 h-4 text-primary-main group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-sm">+91 7903612979</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 text-sm">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                        <span className="text-text-secondary">&copy; {new Date().getFullYear()} EduAnant. All rights reserved.</span>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                        <p className="flex items-center gap-1.5 text-text-secondary">
                            in Collaboration with <span className="font-mono text-xs bg-gradient-to-r from-primary-main/20 to-secondary-main/20 text-primary-main dark:text-primary-100 px-2 py-0.5 rounded-md">Antigravity</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary-main transition-colors text-text-secondary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary-main transition-colors text-text-secondary">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
