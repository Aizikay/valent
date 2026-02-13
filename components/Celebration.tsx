import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Stars, Sparkles, Music, Volume2, VolumeX, Plus } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { Invite } from '../lib/database';

const Celebration: React.FC<{ invite?: Invite | null }> = ({ invite }) => {
  const [extraHearts, setExtraHearts] = useState<{ id: number; left: string; delay: string; size: string; duration: string }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t, theme } = useSettings();

  useEffect(() => {
    // Generate side hearts for background
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${15 + Math.random() * 25}px`,
      duration: `${5 + Math.random() * 5}s`
    }));
    setExtraHearts(hearts);

    // Celebration Confetti logic
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const heart = confetti.shapeFromPath({
      path: 'M167 430.701C167 430.701 44.5 351.5 44.5 241C44.5 130.5 167 130.5 167 130.5C167 130.5 289.5 130.5 289.5 241C289.5 351.5 167 430.701 167 430.701Z'
    });

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;
      const particleCount = 2;

      // Use theme colors for confetti
      const confettiColors = [
        theme.colors[500],
        theme.colors[600],
        theme.colors[400],
        '#ffffff'
      ];

      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: confettiColors,
        shapes: [heart, 'circle'],
        scalar: 1.2
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: confettiColors,
        shapes: [heart, 'circle'],
        scalar: 1.2
      });

      if (Math.random() > 0.8) {
        confetti({
          particleCount: 15,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: [theme.colors[500], theme.colors[600], theme.colors[200]],
          shapes: [heart]
        });
      }
      requestAnimationFrame(frame);
    };

    frame();

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [theme.colors[500], theme.colors[600], theme.colors[400], '#ffffff'],
      shapes: [heart, 'circle']
    });

  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">

      {/* Romantic GIF Stickers */}
      <img
        src="https://media.tenor.com/KtKGnCHTorMAAAAi/cute-love.gif"
        alt=""
        className="fixed top-8 left-6 w-16 h-16 md:w-24 md:h-24 animate-bounce-slow opacity-80 pointer-events-none select-none z-20"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/fE3SrGJGJDkAAAAi/love-heart.gif"
        alt=""
        className="fixed top-8 right-6 w-14 h-14 md:w-20 md:h-20 animate-bounce-slow animation-delay-1000 opacity-75 pointer-events-none select-none z-20"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/e1cMObJn4SQAAAAM/red-rose.gif"
        alt=""
        className="fixed bottom-20 left-8 w-12 h-12 md:w-16 md:h-16 animate-bounce-slow animation-delay-2000 opacity-70 pointer-events-none select-none z-20"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/_C-bBPrLbz4AAAAi/heart-love.gif"
        alt=""
        className="fixed bottom-24 right-8 w-14 h-14 md:w-18 md:h-18 animate-bounce-slow opacity-75 pointer-events-none select-none z-20"
        draggable={false}
      />

      {/* Celebration Specific Background Hearts */}
      {extraHearts.map((h) => (
        <div
          key={h.id}
          className="fixed bottom-[-50px] animate-heart-float pointer-events-none text-valentine-500/40 z-0"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration
          }}
        >
          ❤️
        </div>
      ))}

      {/* Main Content Card */}
      <div className="relative z-10 bg-glass p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(236,72,153,0.3)] border border-valentine-400/20 max-w-2xl w-full animate-scale-up-fade">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-valentine-500 blur-2xl opacity-40 animate-pulse"></div>
            <div className="bg-gradient-to-br from-valentine-400 to-valentine-600 p-6 rounded-full shadow-2xl relative">
              <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex justify-center gap-2 text-valentine-300">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">Forever Yours</span>
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>

          <h1 className="font-hand text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-valentine-200 to-white animate-gradient-x py-2 px-4">
            {invite ? `${invite.targetName} Accepted!` : t.celebration.title}
          </h1>

          <div className="space-y-4 px-4">
            <p className="font-sans text-xl md:text-2xl text-valentine-100 leading-relaxed italic">
              "{invite ? invite.slogan : t.celebration.quote}"
            </p>
            {invite?.explanation && (
              <p className="font-sans text-lg text-valentine-300/80">
                {invite.explanation}
              </p>
            )}
            {!invite && (
              <p className="font-sans text-lg text-valentine-300/80">
                {t.celebration.message}
              </p>
            )}
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-valentine-900/40 rounded-full border border-valentine-700/50 text-valentine-200 shadow-inner">
              <Stars className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{t.celebration.tags[0]}</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-valentine-900/40 rounded-full border border-valentine-700/50 text-valentine-200 shadow-inner">
              <Music className="w-5 h-5 text-valentine-400" />
              <span className="font-bold">{t.celebration.tags[1]}</span>
            </div>
          </div>

          {invite && (
            <div className="pt-4">
              <button
                onClick={() => window.location.href = window.location.origin + '/?login=true'}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-valentine-600 text-valentine-300 hover:text-white font-bold rounded-xl border border-white/10 hover:border-valentine-400 transition-all duration-300 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Create your own Valentine
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Romantic Celebration GIF */}
      <div className="mt-8 animate-scale-up-fade">
        <img
          src="https://media.tenor.com/jOmPTv2dXJQAAAAi/love-amor.gif"
          alt="Love celebration"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_25px_rgba(236,72,153,0.5)] mx-auto"
          draggable={false}
        />
      </div>

      {/* Interactive Floating Quote */}
      <div className="mt-8 animate-bounce-slow text-valentine-400 flex flex-col items-center gap-2">
        <div className="w-1 h-12 bg-gradient-to-b from-transparent to-valentine-500/50 rounded-full"></div>
        <p className="text-sm font-bold tracking-widest uppercase opacity-60">{t.celebration.footer}</p>
      </div>
    </div>
  );
};

export default Celebration;