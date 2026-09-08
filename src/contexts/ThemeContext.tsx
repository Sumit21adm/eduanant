import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export type ThemeType = 'default' | 'royal-purple' | 'teal-horizon' | 'midnight-command' | 'crimson-red' | 'golden-graphite';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** The device's own light/dark setting, when the browser reports one. */
function getSystemPrefersDark(): boolean {
    try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
        return false;
    }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize theme from localStorage or default
    const [theme, setTheme] = useState<ThemeType>(() => {
        return (localStorage.getItem('app-color-theme') as ThemeType) || 'default';
    });

    // A visitor who has never chosen gets whatever their device is already set
    // to; an explicit choice always wins and is the only thing we persist.
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('app-dark-mode');
        if (saved !== null) return saved === 'true';
        return getSystemPrefersDark();
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            // Written only here: storing it on mount would freeze the very first
            // visit and stop the page from following the device thereafter.
            try { localStorage.setItem('app-dark-mode', String(next)); } catch { /* private mode */ }
            return next;
        });
    };

    // Keep following the device until the visitor expresses a preference.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e: MediaQueryListEvent) => {
            let saved: string | null = null;
            try { saved = localStorage.getItem('app-dark-mode'); } catch { /* ignore */ }
            if (saved === null) setIsDarkMode(e.matches);
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        // Handle Color Theme
        localStorage.setItem('app-color-theme', theme);
        document.documentElement.classList.remove(
            'theme-royal-purple',
            'theme-teal-horizon',
            'theme-midnight-command',
            'theme-crimson-red',
            'theme-golden-graphite'
        );

        if (theme !== 'default') {
            document.documentElement.classList.add(`theme-${theme}`);
        }
    }, [theme]);

    // useLayoutEffect, not useEffect: the class must land before the browser
    // paints, otherwise toggling shows one frame of the outgoing theme.
    useLayoutEffect(() => {
        // Apply only — persistence happens in toggleDarkMode, so an untouched
        // visit keeps following the device.
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
