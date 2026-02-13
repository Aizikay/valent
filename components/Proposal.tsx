import React, { useState } from 'react';
import { Heart, Sparkles, Plus } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

import { database, Invite } from '../lib/database';

interface ProposalProps {
  onAccept: () => void;
  nickname: string;
  invite?: Invite | null;
}

const Proposal: React.FC<ProposalProps> = ({ onAccept, nickname, invite }) => {
  const [noCount, setNoCount] = useState(0);
  const { t } = useSettings();

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    if (invite) {
      database.addAnswer(invite.id, {
        name: nickname,
        answer: 'no',
        timestamp: Date.now()
      });
    }
  };

  const handleYesClick = () => {
    if (invite) {
      database.addAnswer(invite.id, {
        name: nickname,
        answer: 'yes',
        timestamp: Date.now()
      });
    }
    onAccept();
  };

  const getNoText = () => {
    return t.proposal.no_phrases[Math.min(noCount, t.proposal.no_phrases.length - 1)];
  };

  const MAX_CLICKS = 10;
  const showNoButton = noCount < MAX_CLICKS;

  const baseSize = 1.5;
  const growAmount = 0.25;
  const currentSize = Math.min(baseSize + (noCount * growAmount), 4.0);

  const titleText = t.proposal.title.replace('{name}', nickname);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-4 pt-8 md:pt-16 relative z-10 animate-scale-up-fade overflow-x-hidden">
      {/* Decorative side elements */}
      <div className="absolute top-20 left-10 md:left-20 animate-bounce-slow text-valentine-500/20">
        <Heart className="w-12 h-12 fill-current" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 animate-bounce-slow animation-delay-2000 text-valentine-500/20">
        <Heart className="w-16 h-16 fill-current" />
      </div>

      {/* Romantic GIF Stickers */}
      <img
        src="https://media.tenor.com/fE3SrGJGJDkAAAAi/love-heart.gif"
        alt=""
        className="fixed top-6 right-16 w-14 h-14 md:w-20 md:h-20 animate-bounce-slow opacity-70 pointer-events-none select-none z-0"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/KtKGnCHTorMAAAAi/cute-love.gif"
        alt=""
        className="fixed bottom-16 left-12 w-14 h-14 md:w-18 md:h-18 animate-bounce-slow animation-delay-1000 opacity-70 pointer-events-none select-none z-0"
        draggable={false}
      />
      <img
        src="https://media.tenor.com/e1cMObJn4SQAAAAM/red-rose.gif"
        alt=""
        className="fixed top-28 left-6 w-12 h-12 md:w-16 md:h-16 animate-bounce-slow animation-delay-2000 opacity-60 pointer-events-none select-none z-0"
        draggable={false}
      />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 md:gap-6 py-4 md:py-6">

        {/* Header Section */}
        <div className="text-center space-y-6 md:space-y-8 flex-shrink-0 relative">
          <div className="relative inline-block group cursor-pointer">
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-valentine-500 fill-valentine-900/30 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] animate-pulse-fast transition-transform group-hover:scale-110 duration-300" />
            <div className="absolute inset-0 bg-valentine-400/20 blur-xl rounded-full animate-pulse-slow -z-10 scale-150"></div>
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h1 className="font-hand text-4xl md:text-6xl font-bold text-white leading-tight tracking-wide drop-shadow-lg px-4 relative z-10">
            {invite ? invite.slogan : (
              <>
                {t.proposal.title.split('{name}')[0]}
                <br className="md:hidden" />
                <span className="text-valentine-400 underline decoration-wavy decoration-valentine-600 underline-offset-8 mt-2 inline-block">
                  {nickname}
                </span>
                {t.proposal.title.split('{name}')[1]}
              </>
            )}
          </h1>
          {invite?.explanation && (
            <p className="text-valentine-200/80 text-lg md:text-xl font-medium mt-4 max-w-lg mx-auto italic">
              "{invite.explanation}"
            </p>
          )}
        </div>

        {/* Romantic GIF between title and buttons */}
        <div className="animate-scale-up-fade">
          <img
            src="https://media.tenor.com/jOmPTv2dXJQAAAAi/love-amor.gif"
            alt="Love bear"
            className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_20px_rgba(236,72,153,0.4)] mx-auto"
            draggable={false}
          />
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full mt-4 min-h-[160px] transition-all duration-500">

          {/* YES BUTTON */}
          <div className="relative group">
            <div className="absolute inset-0 bg-valentine-500 blur-lg opacity-50 group-hover:opacity-100 group-hover:blur-2xl rounded-full animate-pulse-slow transition-all duration-300"></div>
            <button
              onClick={handleYesClick}
              style={{
                fontSize: `${currentSize}rem`,
                padding: '0.75em 1.5em',
              }}
              className="relative bg-gradient-to-br from-valentine-500 to-valentine-700 group-hover:from-valentine-400 group-hover:to-valentine-600 text-white font-bold rounded-full animate-glow group-hover:animate-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-110 group-hover:-rotate-2 group-active:scale-95 z-20 whitespace-nowrap border-2 border-valentine-300/30 group-hover:border-white/50 leading-none shadow-xl group-hover:shadow-[0_0_50px_rgba(236,72,153,0.8)]"
            >
              {t.proposal.yes}
            </button>

            {/* Small sparkles for the YES button */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-valentine-200 animate-pulse animation-delay-1000 pointer-events-none" />
            <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-valentine-300 animate-pulse pointer-events-none" />
          </div>

          {/* NO BUTTON */}
          {showNoButton && (
            <button
              onClick={handleNoClick}
              className={`
               group relative px-8 py-3 rounded-full font-bold border-2 border-valentine-700/50 
               text-valentine-200 hover:bg-valentine-900/40 hover:text-white hover:border-valentine-500 hover:shadow-[0_0_15px_rgba(219,39,119,0.3)]
               transition-all duration-200 ease-out whitespace-nowrap text-lg md:text-xl
               select-none flex-shrink-0 backdrop-blur-sm
               ${noCount > 0 ? 'animate-shake' : ''}
             `}
            >
              <span className="relative z-10 drop-shadow-sm group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">
                {getNoText()}
              </span>
            </button>
          )}
        </div>

        {/* Footer/Status Text */}
        <div className="h-16 flex flex-col items-center justify-center mt-4 px-4 text-center w-full gap-4">
          {!showNoButton ? (
            <div className="animate-bounce bg-valentine-900/50 px-6 py-2 rounded-xl border border-valentine-700/50 backdrop-blur-sm shadow-lg">
              <p className="text-valentine-300 font-bold text-lg">
                {t.proposal.footer_no_choice}
              </p>
            </div>
          ) : (
            noCount > 1 && (
              <p className="text-valentine-300/80 font-sans italic text-base md:text-lg animate-pulse">
                {noCount > 5 ? t.proposal.footer_crying : noCount > 2 ? t.proposal.footer_heartbreak : ""}
              </p>
            )
          )}

          {invite && (
            <button
              onClick={() => window.location.href = window.location.origin + '/?login=true'}
              className="text-valentine-400 text-sm font-bold hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-valentine-500"
            >
              <Plus className="w-4 h-4" />
              Create your own Valentine
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Proposal;