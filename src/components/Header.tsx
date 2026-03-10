import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm' : 'bg-transparent border-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-3">
                    <img src="/logo.png" alt="EduAnant Logo" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold tracking-tight text-text-primary">EduAnant</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-1 justify-center space-x-8">
                    {['Features', 'Demo', 'Pricing', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-text-secondary hover:text-primary-main transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full text-text-secondary hover:text-primary-main hover:bg-primary-main/10 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <ThemeSwitcher />
                    <a href="#demo" className="hidden sm:inline-block btn-primary">
                        Try Demo
                    </a>
                </div>
            </div>
        </header>
    );
}
