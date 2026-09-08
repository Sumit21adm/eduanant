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
    { label: 'Live Demo', href: '/demo' },
    { label: 'Contact', href: '/contact' },
    { label: 'Register', href: '/register' },
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
                className={`sticky top-0 z-50 flex items-center backdrop-blur-md bg-white/90 dark:bg-[#0B1120]/90
                    border-b transition-all duration-500 ${isScrolled
                    ? 'border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5'
                    : 'border-transparent shadow-none'}`}>

                {isScrolled && (
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        className="absolute top-0 left-0 right-0 h-px origin-left"
                        style={{ background: 'linear-gradient(90deg, #1E1B4B, #F59E0B, #FBBF24)' }} />
                )}

                <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-2 py-3 w-full min-w-0">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        {/* Two lockups: the navy half of the mark disappears on a dark
                            ground, so dark mode gets a variant with that half in light
                            slate. Only one is ever rendered, so only one reaches the
                            accessibility tree. */}
                        <motion.div className="flex items-center"
                            animate={{ filter: ['drop-shadow(0 0 6px rgba(0,182,213,0.25))', 'drop-shadow(0 0 16px rgba(0,182,213,0.5))', 'drop-shadow(0 0 6px rgba(0,182,213,0.25))'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                            <img src="/eduanant-logo.svg" alt="EduAnant" className="h-8 sm:h-10 w-auto object-contain dark:hidden" />
                            <img src="/eduanant-logo-dark.svg" alt="EduAnant" className="h-8 sm:h-10 w-auto object-contain hidden dark:block" />
                        </motion.div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname === link.href;
                            return (
                                <Link key={link.label} to={link.href}
                                    className={`relative px-4 py-2 text-sm font-semibold font-display tracking-tight transition-colors group ${isActive ? 'text-[var(--primary-main)] dark:text-white' : 'text-text-secondary hover:text-[var(--primary-main)] dark:hover:text-white'}`}>
                                    {link.label}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 rounded-full ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`}
                                        style={{ background: 'linear-gradient(90deg, #F59E0B, #EA580C)' }} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {/* w-4.5 is not in Tailwind's spacing scale, so this icon was
                            silently falling back to lucide's 24px default and sitting
                            oversized next to the rest of the bar. */}
                        <button onClick={toggleDarkMode} type="button"
                            className="p-2 rounded-full text-text-secondary transition-colors
                                hover:text-[var(--primary-main)] hover:bg-[var(--primary-main)]/10
                                dark:hover:text-amber-400 dark:hover:bg-white/10
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b6d5] focus-visible:ring-offset-2
                                focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1120]"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-pressed={isDarkMode}>
                            {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                        </button>
                        <Link to="/contact"
                            className="flex items-center gap-2 btn-primary text-xs sm:text-sm px-3.5 sm:px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            <PhoneCall className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                            <span className="hidden sm:inline">Book On-Site Demo</span>
                            <span className="sm:hidden">Book Visit</span>
                        </Link>
                        <button onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu — anchored to the bar itself, so it can never drift
                    out of alignment the way a hardcoded top-[64px] offset did */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 top-full z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden" />
                    )}
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -12, scaleY: 0.97 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -12, scaleY: 0.97 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformOrigin: 'top' }}
                            className="absolute top-full inset-x-0 z-40 origin-top bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-xl lg:hidden">
                            <nav className="container mx-auto px-6 py-5 flex flex-col gap-1">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                        <Link to={link.href}
                                            className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-semibold font-display text-text-secondary hover:text-[var(--primary-main)] dark:hover:text-white hover:bg-[var(--primary-main)]/5 transition-all">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <Link to="/contact"
                                    className="mt-2 flex items-center justify-center gap-2 btn-primary px-6 py-3 rounded-xl font-bold">
                                    <PhoneCall className="w-4 h-4" strokeWidth={1.5} /> Book On-Site Demo
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
