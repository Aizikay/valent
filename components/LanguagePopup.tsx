import React, { useState } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { Language } from '../translations';

interface LanguagePopupProps {
    onConfirm: (lang: Language) => void;
    onCancel: () => void;
}

const languages: { code: Language; label: string; flag: string; nativeLabel: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸', nativeLabel: 'English' },
    { code: 'sw', label: 'Swahili', flag: '🇹🇿', nativeLabel: 'Kiswahili' },
    { code: 'fr', label: 'French', flag: '🇫🇷', nativeLabel: 'Français' },
    { code: 'es', label: 'Spanish', flag: '🇪🇸', nativeLabel: 'Español' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺', nativeLabel: 'Русский' },
    { code: 'zh', label: 'Chinese', flag: '🇨🇳', nativeLabel: '中文' },
    { code: 'ko', label: 'Korean', flag: '🇰🇷', nativeLabel: '한국어' },
];

const LanguagePopup: React.FC<LanguagePopupProps> = ({ onConfirm, onCancel }) => {
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [isClosing, setIsClosing] = useState(false);

    const handleConfirm = () => {
        setIsClosing(true);
        setTimeout(() => onConfirm(selectedLang), 400);
    };

    const handleCancel = () => {
        setIsClosing(true);
        setTimeout(() => onCancel(), 400);
    };

    return (
        <div
            className={`language-popup-overlay ${isClosing ? 'popup-closing' : ''}`}
        >
            {/* Decorative floating hearts in background */}
            <div className="popup-heart popup-heart-1">💕</div>
            <div className="popup-heart popup-heart-2">💖</div>
            <div className="popup-heart popup-heart-3">✨</div>
            <div className="popup-heart popup-heart-4">💗</div>
            <div className="popup-heart popup-heart-5">💝</div>

            <div
                className={`language-popup-card ${isClosing ? 'popup-card-closing' : ''}`}
            >
                {/* Glow ring */}
                <div className="popup-glow-ring" />

                {/* Header */}
                <div className="popup-header">
                    <div className="popup-icon-wrapper">
                        <Globe className="popup-icon" />
                    </div>
                    <h2 className="popup-title">Choose Your Language</h2>
                    <p className="popup-subtitle">
                        Select your preferred language to continue 💌
                    </p>
                </div>

                {/* Language Grid */}
                <div className="popup-lang-grid">
                    {languages.map((lang, index) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelectedLang(lang.code)}
                            className={`popup-lang-btn ${selectedLang === lang.code ? 'popup-lang-active' : ''}`}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            <span className="popup-lang-flag">{lang.flag}</span>
                            <div className="popup-lang-text">
                                <span className="popup-lang-name">{lang.label}</span>
                                <span className="popup-lang-native">{lang.nativeLabel}</span>
                            </div>
                            {selectedLang === lang.code && (
                                <div className="popup-lang-check">
                                    <Check className="popup-check-icon" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Buttons */}
                <div className="popup-buttons">
                    <button
                        onClick={handleCancel}
                        className="popup-btn popup-btn-cancel"
                    >
                        <X className="popup-btn-icon" />
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="popup-btn popup-btn-ok"
                    >
                        <Check className="popup-btn-icon" />
                        OK
                    </button>
                </div>

                {/* Footer hint */}
                <p className="popup-footer-hint">
                    Default: English · You can change this later in Settings ⚙️
                </p>
            </div>
        </div>
    );
};

export default LanguagePopup;
