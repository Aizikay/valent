import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const { t } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      return;
    }
    onSubmit(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-4 pt-12 md:pt-20 relative z-10 animate-fade-in-scale">

      {/* Romantic Floating Stickers */}
      <img
        src="https://media.tenor.com/KtKGnCHTorMAAAAi/cute-love.gif"
        alt=""
        className="fixed top-8 left-8 w-16 h-16 md:w-20 md:h-20 animate-bounce-slow opacity-80 pointer-events-none select-none z-0"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/fE3SrGJGJDkAAAAi/love-heart.gif"
        alt=""
        className="fixed bottom-12 right-8 w-14 h-14 md:w-18 md:h-18 animate-bounce-slow animation-delay-2000 opacity-70 pointer-events-none select-none z-0"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/e1cMObJn4SQAAAAM/red-rose.gif"
        alt=""
        className="fixed top-20 right-10 w-12 h-12 md:w-16 md:h-16 animate-bounce-slow animation-delay-1000 opacity-60 pointer-events-none select-none z-0"
        draggable={false}
      />

      {/* Romantic GIF above card */}
      <div className="mb-2 animate-scale-up-fade">
        <img
          src="https://media.tenor.com/jOmPTv2dXJQAAAAi/love-amor.gif"
          alt="Love"
          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]"
          draggable={false}
        />
      </div>

      <div className="bg-glass p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-slate-800/50 rounded-full shadow-lg mb-6 animate-bounce border border-white/10">
            <Sparkles className="w-8 h-8 text-valentine-300 fill-valentine-700" />
          </div>

          <h2 className="font-hand text-4xl md:text-5xl font-bold text-white mb-4 leading-relaxed tracking-wide drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
            {t.nameInput.title}
          </h2>

          <p className="font-sans text-valentine-100 text-lg md:text-xl leading-relaxed">
            {t.nameInput.subtitle}
          </p>

          <div className="mt-6 bg-slate-900/40 p-4 rounded-xl border border-white/5">
            <p className="font-sans text-valentine-200 font-bold italic">
              "{t.nameInput.question}"
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.nameInput.placeholder}
              className={`w-full px-6 py-4 rounded-2xl border-2 bg-slate-900/60 placeholder-valentine-700/50 text-white font-sans text-lg shadow-inner transition-all duration-300
                    ${isError
                  ? 'border-red-500 animate-shake focus:ring-red-900'
                  : 'border-slate-700 focus:border-valentine-500 focus:ring-4 focus:ring-valentine-900/20 focus:outline-none'
                }
                  `}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full group bg-gradient-to-r from-valentine-600 to-valentine-500 hover:from-valentine-500 hover:to-valentine-400 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border border-valentine-400/20"
          >
            <span className="text-lg">{t.nameInput.button}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          {isError && (
            <p className="text-red-400 text-center font-bold animate-pulse">
              {t.nameInput.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NameInput;