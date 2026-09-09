import {
    Moon, Sun, Menu, X, PhoneCall, ChevronRight,
    Home, Layers, ShieldCheck, Zap, IndianRupee, MonitorPlay, Mail, UserPlus,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

/** icon + a one-line "what is this" for the mobile sheet, where there is room
 *  to say it and a bare list of eight words gives a visitor nothing to aim at. */
const NAV_LINKS = [
    { label: 'Home', href: '/', icon: Home, hint: 'What EduAnant is' },
    { label: 'Features', href: '/features', icon: Layers, hint: 'All 16 modules' },
    { label: 'Security', href: '/security', icon: ShieldCheck, hint: 'Your data, your server' },
    { label: 'Updates', href: '/updates', icon: Zap, hint: 'What shipped, and when' },
    { label: 'Pricing', href: '/pricing', icon: IndianRupee, hint: '₹20 per student a month' },
    { label: 'Live Demo', href: '/demo', icon: MonitorPlay, hint: 'Open the real thing' },
    { label: 'Contact', href: '/contact', icon: Mail, hint: 'Book a school visit' },
    { label: 'Register', href: '/register', icon: UserPlus, hint: 'Start onboarding' },
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

    // While the sheet is open the page behind it must not scroll, and Escape
    // must close it — both expected of anything covering the whole screen.
    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [mobileOpen]);

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
                                    className={`relative px-2.5 xl:px-4 py-2 text-sm font-semibold font-display tracking-tight transition-colors group ${isActive ? 'text-[var(--primary-main)] dark:text-white' : 'text-text-secondary hover:text-[var(--primary-main)] dark:hover:text-white'}`}>
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
                        <button onClick={() => setMobileOpen(true)} type="button"
                            aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="mobile-menu"
                            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <Menu className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
                {/* Mobile menu — a full-screen sheet.
                    The previous version was a translucent dropdown anchored under
                    the bar: the page showed through it, headline text collided with
                    the links, and it stopped partway down the screen. A menu needs
                    an opaque surface of its own. */}
            </motion.header>

            {/* Deliberately a sibling of <motion.header>, not a child.
                framer-motion leaves a transform on the header for its entrance
                animation, and a transformed ancestor becomes the containing block
                for position:fixed — which sized this sheet to the header instead
                of the viewport. Computed style still reported "fixed", so only
                looking at it on a device caught it. */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        id="mobile-menu"
                        className="fixed inset-0 z-[60] lg:hidden flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120]">

                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-white/10 shrink-0">
                            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center shrink-0">
                                <img src="/eduanant-logo.svg" alt="EduAnant" className="h-8 w-auto object-contain dark:hidden" />
                                <img src="/eduanant-logo-dark.svg" alt="EduAnant" className="h-8 w-auto object-contain hidden dark:block" />
                            </Link>
                            <div className="flex items-center gap-1">
                                <button type="button" onClick={toggleDarkMode}
                                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                    className="p-2.5 rounded-xl text-text-secondary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b6d5]">
                                    {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                                </button>
                            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"
                                className="p-2.5 -mr-1 rounded-xl text-text-secondary hover:text-[var(--primary-main)] dark:hover:text-white
                                    hover:bg-slate-100 dark:hover:bg-white/10 transition-colors
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b6d5]">
                                <X className="w-6 h-6" strokeWidth={1.5} />
                            </button>
                            </div>
                        </div>

                        <nav className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 space-y-1">
                            {NAV_LINKS.map((link, i) => {
                                const isActive = link.href === '/' ? pathname === '/' : pathname === link.href;
                                return (
                                    <motion.div key={link.label}
                                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.04 + i * 0.035, duration: 0.3 }}>
                                        <Link to={link.href}
                                            className={`group flex items-center gap-3.5 px-3 py-3 rounded-2xl transition-colors
                                                ${isActive
                                                    ? 'bg-[#00b6d5]/10 dark:bg-[#00b6d5]/[0.12] ring-1 ring-[#00b6d5]/30'
                                                    : 'hover:bg-slate-100 dark:hover:bg-white/[0.05]'}`}>
                                            <span className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors
                                                ${isActive
                                                    ? 'bg-[#00b6d5] text-[#0F172A]'
                                                    : 'bg-slate-100 dark:bg-white/[0.06] text-text-secondary group-hover:text-[var(--primary-main)] dark:group-hover:text-white'}`}>
                                                <link.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className={`block font-display font-bold text-[17px] leading-tight
                                                    ${isActive ? 'text-[var(--primary-main)] dark:text-white' : 'text-text-primary'}`}>
                                                    {link.label}
                                                </span>
                                                <span className="block text-[12px] text-text-secondary leading-tight mt-0.5">{link.hint}</span>
                                            </span>
                                            <ChevronRight className="w-4 h-4 shrink-0 text-text-secondary/40 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        <div className="px-4 sm:px-6 py-4 border-t border-slate-200/80 dark:border-white/10 shrink-0
                            pb-[max(1rem,env(safe-area-inset-bottom))]">
                            <Link to="/contact"
                                className="flex items-center justify-center gap-2 btn-primary w-full px-6 py-4 rounded-xl font-bold text-base">
                                <PhoneCall className="w-4 h-4" strokeWidth={1.5} /> Book On-Site Demo
                            </Link>
                            <a href="tel:+917903612979"
                                className="mt-2 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-semibold
                                    text-text-secondary hover:text-[var(--brand-cyan-deep)] transition-colors">
                                Or call +91 79036 12979
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
