import React, { useState } from 'react';
import { Settings, X, Globe, Palette, Info, Phone, UserPlus } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { themes } from '../themes';
import { Language } from '../translations';
import AdminPanel from './AdminPanel';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'lang' | 'theme' | 'about' | 'admin';
    onLogin?: (username: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, initialTab = 'lang', onLogin }) => {
    const { language, setLanguage, theme, setTheme, t } = useSettings();
    const [activeTab, setActiveTab] = useState<'lang' | 'theme' | 'about' | 'admin'>(initialTab);

    // Update active tab when initialTab changes
    React.useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'sw', label: 'Swahili', flag: '🇹🇿' },
        { code: 'fr', label: 'French', flag: '🇫🇷' },
        { code: 'es', label: 'Spanish', flag: '🇪🇸' },
        { code: 'ru', label: 'Russian', flag: '🇷🇺' },
        { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
        { code: 'ko', label: 'Korean', flag: '🇰🇷' },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale">
                    <div className="bg-glass rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[80vh]">

                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-valentine-900/20 to-slate-900/40">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Settings className="w-6 h-6 text-valentine-400" />
                                Settings
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-white/70" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10">
                            <button
                                onClick={() => setActiveTab('lang')}
                                className={`flex-1 p-4 text-sm font-bold flex flex-col items-center gap-1 transition-colors ${activeTab === 'lang' ? 'bg-white/5 text-valentine-400' : 'text-white/50 hover:text-white/80'}`}
                            >
                                <Globe className="w-5 h-5" />
                                {t.settings.language}
                            </button>
                            <button
                                onClick={() => setActiveTab('theme')}
                                className={`flex-1 p-4 text-sm font-bold flex flex-col items-center gap-1 transition-colors ${activeTab === 'theme' ? 'bg-white/5 text-valentine-400' : 'text-white/50 hover:text-white/80'}`}
                            >
                                <Palette className="w-5 h-5" />
                                {t.settings.theme}
                            </button>
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`flex-1 p-4 text-sm font-bold flex flex-col items-center gap-1 transition-colors ${activeTab === 'about' ? 'bg-white/5 text-valentine-400' : 'text-white/50 hover:text-white/80'}`}
                            >
                                <Info className="w-5 h-5" />
                                {t.settings.about}
                            </button>
                            <button
                                onClick={() => setActiveTab('admin')}
                                className={`flex-1 p-4 text-sm font-bold flex flex-col items-center gap-1 transition-colors ${activeTab === 'admin' ? 'bg-white/5 text-valentine-400' : 'text-white/50 hover:text-white/80'}`}
                            >
                                <UserPlus className="w-5 h-5" />
                                Account
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {/* Admin Tab */}
                            {activeTab === 'admin' && (
                                <AdminPanel onLogin={onLogin} />
                            )}

                            {/* Language Tab */}
                            {activeTab === 'lang' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code)}
                                            className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${language === lang.code ? 'bg-valentine-600/20 border-valentine-500 text-white' : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'}`}
                                        >
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className="font-medium">{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Theme Tab */}
                            {activeTab === 'theme' && (
                                <div className="space-y-4">
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme(t.id)}
                                            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all group ${theme.id === t.id ? 'bg-white/10 border-valentine-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                        >
                                            <span className={`font-medium ${theme.id === t.id ? 'text-white' : 'text-white/70'}`}>{t.name}</span>
                                            <div className="flex gap-2">
                                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.colors[500] }}></div>
                                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.colors[700] }}></div>
                                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.colors[900] }}></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* About Tab */}
                            {activeTab === 'about' && (
                                <div className="space-y-6 text-center">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h3 className="text-xl font-bold text-white mb-2">{t.about.title}</h3>
                                        <p className="text-white/70 leading-relaxed text-sm">
                                            {t.about.description}
                                        </p>
                                        <p className="text-valentine-400/80 text-sm mt-4 font-mono">
                                            {t.about.description2}
                                        </p>
                                    </div>

                                    <a
                                        href="https://wa.me/+255612431951"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full p-4 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/50 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Phone className="w-5 h-5 fill-current" />
                                        <span className="font-bold">{t.settings.contact}</span>
                                    </a>
                                    <p className="text-xs text-white/30">
                                        WhatsApp: +255 612 431 951
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsModal;
