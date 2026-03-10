import { Palette } from 'lucide-react';
import type { ThemeType } from '../contexts/ThemeContext';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const themes: { id: ThemeType; name: string; color: string }[] = [
        { id: 'default', name: 'Default Blue', color: 'bg-[#1976d2]' },
        { id: 'royal-purple', name: 'Royal Purple', color: 'bg-[#9c27b0]' },
        { id: 'teal-horizon', name: 'Teal Horizon', color: 'bg-[#009688]' },
        { id: 'midnight-command', name: 'Midnight Indigo', color: 'bg-[#3949ab]' },
        { id: 'crimson-red', name: 'Crimson Red', color: 'bg-[#d32f2f]' },
        { id: 'golden-graphite', name: 'Golden Amber', color: 'bg-[#f57f17]' },
    ];

    return (
        <div className="relative group inline-block">
            <button className="flex items-center gap-2 px-3 py-2 rounded-mui-btn text-text-secondary hover:text-primary-main hover:bg-primary-main/5 transition-colors">
                <Palette className="w-5 h-5 text-primary-main" />
                <span className="hidden sm:inline-block font-medium">Theme</span>
            </button>

            {/* Dropdown styling mirroring MUI Menu */}
            <div className="absolute right-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                <div className="bg-paper rounded-mui-btn shadow-elevation-8 border border-gray-100/10 py-2 ring-1 ring-black/5">
                    <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-gray-100">
                        Select Color
                    </div>
                    <div className="flex flex-col py-1">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors w-full text-left
                  ${theme === t.id
                                        ? 'bg-primary-main/10 text-primary-main font-medium'
                                        : 'text-text-primary hover:bg-black/5'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full ${t.color} shadow-sm border border-black/10`} />
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
