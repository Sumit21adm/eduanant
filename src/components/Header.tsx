import { Moon, Sun, Menu, X, PhoneCall } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Security', href: '/security' },
    { label: 'Updates', href: '/updates' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on navigation
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-500 ${isScrolled
                    ? 'bg-white/90 dark:bg-[#080e17]/90 backdrop-blur-xl border-b border-[#00b6d5]/10 shadow-lg shadow-[#00b6d5]/5'
                    : 'bg-transparent border-transparent'}`}>

                {isScrolled && (
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        className="absolute top-0 left-0 right-0 h-px origin-left"
                        style={{ background: 'linear-gradient(90deg, #17305a, #00b6d5, #63cae0)' }} />
                )}

                <div className="container mx-auto px-6 flex justify-between items-center py-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <motion.img src="/eduanant-logo.svg" alt="EduAnant" className="h-10 w-auto object-contain"
                            animate={{ filter: ['drop-shadow(0 0 6px rgba(0,182,213,0.3))', 'drop-shadow(0 0 16px rgba(0,182,213,0.6))', 'drop-shadow(0 0 6px rgba(0,182,213,0.3))'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname === link.href;
                            return (
                                <Link key={link.label} to={link.href}
                                    className={`relative px-4 py-2 text-sm font-semibold transition-colors group ${isActive ? 'text-[var(--primary-main)]' : 'text-text-secondary hover:text-[var(--primary-main)]'}`}>
                                    {link.label}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 rounded-full ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`}
                                        style={{ background: 'linear-gradient(90deg, #0091b8, #63cae0)' }} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button onClick={toggleDarkMode}
                            className="p-2 rounded-full text-text-secondary hover:text-[var(--primary-main)] hover:bg-[var(--primary-main)]/10 transition-colors"
                            aria-label="Toggle dark mode">
                            {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                        </button>
                        <Link to="/contact"
                            className="hidden sm:flex items-center gap-2 btn-primary text-sm px-5 py-2.5 rounded-xl font-bold">
                            <PhoneCall className="w-4 h-4" /> Book Demo
                        </Link>
                        <button onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[64px] inset-x-0 z-40 bg-white/95 dark:bg-[#080e17]/95 backdrop-blur-xl border-b border-[#00b6d5]/10 shadow-xl lg:hidden">
                        <nav className="container mx-auto px-6 py-5 flex flex-col gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link to={link.href}
                                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-text-secondary hover:text-[var(--primary-main)] hover:bg-[var(--primary-main)]/5 transition-all">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00b6d5' }} />
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <Link to="/contact"
                                className="mt-2 flex items-center justify-center gap-2 btn-primary px-6 py-3 rounded-xl font-bold">
                                <PhoneCall className="w-4 h-4" /> Book a Free Demo
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
