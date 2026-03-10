import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'default' | 'royal-purple' | 'teal-horizon' | 'midnight-command' | 'crimson-red' | 'golden-graphite';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize theme from localStorage or default
    const [theme, setTheme] = useState<ThemeType>(() => {
        return (localStorage.getItem('app-color-theme') as ThemeType) || 'default';
    });

    // Initialize dark mode from localStorage or force true as default
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('app-dark-mode');
        if (saved !== null) {
            return saved === 'true';
        }
        return true; // Default to Dark Mode
    });

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

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

    useEffect(() => {
        // Handle Dark Mode
        localStorage.setItem('app-dark-mode', String(isDarkMode));
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
