import React, { useEffect, useState } from 'react';
import { HeartProps, ProposalState } from '../types';
import { COLORS, FLOATING_HEARTS_COUNT } from '../constants';

interface BackgroundProps {
  state: ProposalState;
}

const Background: React.FC<BackgroundProps> = ({ state }) => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);
  const isCelebration = state === ProposalState.ACCEPTED;

  useEffect(() => {
    const count = isCelebration ? FLOATING_HEARTS_COUNT * 2 : FLOATING_HEARTS_COUNT;
    const newHearts: HeartProps[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: isCelebration ? `${5 + Math.random() * 5}s` : `${10 + Math.random() * 10}s`,
        fontSize: `${20 + Math.random() * 30}px`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: isCelebration ? 0.3 + Math.random() * 0.4 : 0.1 + Math.random() * 0.3,
      },
    }));
    setHearts(newHearts);
  }, [isCelebration]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-transition ${isCelebration ? 'bg-pink-950' : 'bg-slate-950'}`}>
      {/* Base Gradient */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isCelebration ? 'bg-gradient-to-br from-valentine-950 via-pink-900 to-valentine-950 opacity-100' : 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-100'} z-0`}></div>

      {/* Animated Color Shift Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${isCelebration ? 'from-valentine-700/30 via-pink-500/20 to-rose-600/30' : 'from-purple-950/20 via-valentine-950/20 to-slate-900/40'} bg-[length:200%_200%] animate-gradient-x z-0 mix-blend-overlay`}></div>

      {/* Animated Glowing Orbs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] ${isCelebration ? 'bg-rose-500/40' : 'bg-purple-600/20'} rounded-full mix-blend-screen filter blur-[120px] animate-blob-slow orb-optimization opacity-60 transition-colors duration-1000`}></div>
      <div className={`absolute top-[20%] right-[-10%] w-[400px] h-[400px] ${isCelebration ? 'bg-pink-400/30' : 'bg-valentine-500/15'} rounded-full mix-blend-screen filter blur-[100px] animate-blob-reverse animation-delay-2000 orb-optimization opacity-50 transition-colors duration-1000`}></div>
      <div className={`absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] ${isCelebration ? 'bg-valentine-600/30' : 'bg-pink-600/20'} rounded-full mix-blend-screen filter blur-[130px] animate-blob-slow animation-delay-4000 orb-optimization opacity-40 transition-colors duration-1000`}></div>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${isCelebration ? 'animate-bounce-slow' : 'animate-float-slow'} select-none z-10 transition-all duration-1000 will-change-transform`}
          style={heart.style}
        >
          ❤️
        </div>
      ))}

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 z-20 mix-blend-overlay"></div>
    </div>
  );
};

export default Background;