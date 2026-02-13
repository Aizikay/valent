import React, { useState } from 'react';
import { Globe, User, Palette, ChevronUp } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface FloatingHubProps {
    onOpenTab: (tab: 'lang' | 'theme' | 'admin') => void;
}

const FloatingHub: React.FC<FloatingHubProps> = ({ onOpenTab }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useSettings();

    const menuItems = [
        { id: 'lang' as const, icon: Globe, label: 'Language', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400', hoverBg: 'hover:bg-blue-500' },
        { id: 'admin' as const, icon: User, label: 'Account', bgColor: 'bg-valentine-500/10', textColor: 'text-valentine-400', hoverBg: 'hover:bg-valentine-500' },
        { id: 'theme' as const, icon: Palette, label: 'Themes', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400', hoverBg: 'hover:bg-purple-500' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-4">
            {/* Expanded Menu */}
            <div className={`flex items-center gap-3 bg-glass p-2 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 origin-bottom ${isExpanded ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-12 pointer-events-none'}`}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            onOpenTab(item.id);
                            setIsExpanded(false);
                        }}
                        className="flex flex-col items-center gap-1 group px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
                    >
                        <div className={`p-3 rounded-full ${item.bgColor} ${item.textColor} group-hover:text-white ${item.hoverBg} transition-all`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-tighter">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group relative p-4 rounded-full bg-glass border border-white/20 shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${isExpanded ? 'rotate-180 bg-valentine-600 border-valentine-400 text-white' : 'text-valentine-400 hover:text-white hover:bg-valentine-900/40'}`}
            >
                <div className="absolute inset-0 bg-valentine-500 blur-xl opacity-20 group-hover:opacity-40 animate-pulse rounded-full"></div>
                <ChevronUp className={`w-6 h-6 transition-transform duration-500 ${isExpanded ? 'rotate-0' : 'rotate-0'}`} />
            </button>
        </div>
    );
};

export default FloatingHub;
