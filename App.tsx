import React, { useState, useRef, useEffect } from 'react';
import { Music2, Play, Pause, MoreVertical, Share2, Download, X, Link2, Heart, Plus, Sparkles } from 'lucide-react';
import Background from './components/Background';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import NameInput from './components/NameInput';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';
import LanguagePopup from './components/LanguagePopup';
import FloatingHub from './components/FloatingHub';
import AdminPanel from './components/AdminPanel';
import { useSettings } from './context/SettingsContext';
import { ProposalState } from './types';
import { Language } from './translations';
import { database, Invite } from './lib/database';

const SONGS = [
  { id: 1, name: "♬ Golden Brown X Love Story (Slowed) ♬", url: "https://files.catbox.moe/394tiy.mp3", pos: "-left-8 md:-left-20 -bottom-10", tail: "bottom-0 left-10 rotate-45" },
  { id: 2, name: "♬ Ruth B feat Dean Lewis 28 ♬", url: "https://files.catbox.moe/9eeeo7.mp3", pos: "-left-8 md:-left-20 -top-12", tail: "top-0 left-10 rotate-[225deg]" },
  { id: 3, name: "♬ Chad Graham - Rewrite the Stars ♬", url: "https://files.catbox.moe/o4ho5l.mp3", pos: "-right-8 md:-right-20 -top-12", tail: "top-0 right-10 rotate-[135deg]" },
  { id: 4, name: "♬ Maria Olafs - Symphony (Zara Larsson cover acoustic) ♬", url: "https://files.catbox.moe/3xgaox.mp3", pos: "-right-8 md:-right-20 -bottom-10", tail: "bottom-0 right-10 rotate-[315deg]" },
];

const AudioWave: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => (
  <div className="flex items-end gap-[3px] h-5 px-1">
    {[1, 2, 3, 4, 5].map((bar) => (
      <div
        key={bar}
        className={`w-[3px] rounded-full transition-all duration-150 ${isPlaying ? 'audio-wave-bar bg-gradient-to-t from-valentine-500 to-valentine-300' : 'bg-valentine-600/50 h-1'}`}
        style={{ animationDelay: isPlaying ? `${bar * 0.12}s` : '0s' }}
      />
    ))}
  </div>
);

const App: React.FC = () => {
  const { setLanguage } = useSettings();
  const [proposalState, setProposalState] = useState<ProposalState>(ProposalState.INPUT_NAME);
  const [nickname, setNickname] = useState<string>('');
  const [activeSongId, setActiveSongId] = useState<number | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showLangPopup, setShowLangPopup] = useState<boolean>(() => !localStorage.getItem('valentine_lang_chosen'));
  const [customInvite, setCustomInvite] = useState<Invite | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(() => localStorage.getItem('valentine_user'));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'lang' | 'theme' | 'admin'>('lang');
  const [forceLoginTab, setForceLoginTab] = useState(false);

  const openSettings = (tab: 'lang' | 'theme' | 'admin') => {
    setSettingsTab(tab);
    setIsSettingsOpen(true);
  };

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('valentine_user');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const loginParam = params.get('login');
    const pathParts = window.location.pathname.split('/').filter(Boolean);

    if (loginParam === 'true') {
      setForceLoginTab(true);
    }
    let invite = null;
    if (id) {
      invite = database.getInviteById(id);
    } else if (pathParts.length >= 2) {
      const [username, slug] = pathParts;
      invite = database.getInviteByPath(username, slug);
    }
    if (invite) {
      setCustomInvite(invite);
      setNickname(invite.targetName);
      setProposalState(ProposalState.ASKING);
    }
  }, []);

  const handleLangConfirm = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('valentine_lang_chosen', lang);
    setShowLangPopup(false);
  };

  const handleLangCancel = () => {
    setLanguage('en');
    localStorage.setItem('valentine_lang_chosen', 'en');
    setShowLangPopup(false);
  };

  const handleNameSubmit = (name: string) => {
    setNickname(name);
    setProposalState(ProposalState.ASKING);
  };

  const playSong = (id: number, url: string) => {
    if (audioRef.current) {
      if (activeSongId === id && !audioRef.current.paused) {
        audioRef.current.pause();
        setActiveSongId(null);
      } else {
        audioRef.current.src = url;
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(err => console.log("Music play error:", err));
        setActiveSongId(id);
      }
    }
  };

  const toggleMenu = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleShare = (url: string, id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => window.open(url, '_blank'));
    setMenuOpenId(null);
  };

  const handleDownload = async (url: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpenId(null);
    const fileName = name.replace(/[♬\s]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') + '.mp3';
    const triggerDownload = (blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(blobUrl); }, 200);
    };
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) { triggerDownload(await response.blob()); return; }
    } catch (_) { }
    window.open(url, '_blank');
  };

  const handleAccept = () => {
    const yaySound = new Audio("https://files.catbox.moe/xah8ku.mp3");
    yaySound.volume = 0.6;
    yaySound.play().catch(err => console.log("Sound play error:", err));
    setProposalState(ProposalState.ACCEPTED);
  };

  const showMusicBubbles = !!customInvite && proposalState !== ProposalState.ACCEPTED;
  const isPlaying = (id: number) => activeSongId === id;

  return (
    <div className="min-h-screen w-full overflow-hidden selection:bg-valentine-500 selection:text-white relative bg-transition" style={{ backgroundColor: 'var(--val-950)' }}>
      <Background state={proposalState} />

      {showLangPopup ? (
        <LanguagePopup onConfirm={handleLangConfirm} onCancel={handleLangCancel} />
      ) : (
        <>
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            initialTab={settingsTab}
            onLogin={handleLogin}
          />
          <FloatingHub onOpenTab={openSettings} />
          <audio ref={audioRef} loop />
          {menuOpenId !== null && (
            <div className="fixed inset-0 z-[59]" onClick={() => setMenuOpenId(null)} />
          )}
          {showMusicBubbles && (
            <div className="fixed inset-0 z-[60] pointer-events-none flex flex-col items-center justify-start pt-16 md:pt-24">
              <div className="relative w-full max-w-2xl h-[480px] md:h-[550px]">
                {SONGS.map((song) => (
                  <div key={song.id} className={`absolute ${song.pos} animate-bounce-slow pointer-events-auto`}>
                    <div className={`relative flex items-center gap-2 bg-glass rounded-2xl border transition-all duration-500 shadow-[0_0_25px_rgba(236,72,153,0.15)] group ${isPlaying(song.id) ? 'px-3 py-2.5 border-valentine-400/50 ring-2 ring-valentine-500/30 min-w-[220px] md:min-w-[260px]' : 'px-4 py-3 border-valentine-400/20 hover:border-valentine-400/40 cursor-pointer rounded-full'}`} onClick={() => !isPlaying(song.id) && playSong(song.id, song.url)}>
                      <button onClick={(e) => { e.stopPropagation(); playSong(song.id, song.url); }} className={`flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 ${isPlaying(song.id) ? 'w-9 h-9 bg-gradient-to-br from-valentine-400 to-valentine-600 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'w-8 h-8 bg-valentine-500'}`}>
                        {isPlaying(song.id) ? <Pause className="w-4 h-4 text-white fill-white" /> : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />}
                      </button>
                      {isPlaying(song.id) ? (
                        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
                          <AudioWave isPlaying={true} />
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="song-marquee">
                              <span className="font-bold text-xs text-valentine-100 whitespace-nowrap">{song.name}</span>
                            </div>
                            <p className="text-[10px] text-valentine-400 font-medium mt-0.5">Now Playing</p>
                          </div>
                        </div>
                      ) : (
                        <span className="font-bold text-sm text-valentine-200 whitespace-nowrap pr-1 group-hover:text-white transition-colors">{song.name.length > 20 ? song.name.slice(0, 20) + '…' : song.name}</span>
                      )}
                      {isPlaying(song.id) && (
                        <button onClick={(e) => toggleMenu(song.id, e)} className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-valentine-800/50 transition-all duration-200">
                          <MoreVertical className="w-4 h-4 text-valentine-300" />
                        </button>
                      )}
                      {!isPlaying(song.id) && (
                        <div className={`absolute ${song.tail} w-4 h-4 bg-glass border-r border-b border-valentine-400/20 -z-10`}></div>
                      )}
                    </div>
                    {menuOpenId === song.id && (
                      <div className="absolute top-full right-0 mt-2 w-52 bg-glass rounded-xl border border-valentine-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden animate-scale-up-fade z-[70]">
                        <div className="p-1">
                          <button onClick={(e) => handleShare(song.url, song.id, e)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-valentine-200 hover:bg-valentine-800/40 hover:text-white transition-all duration-200 group/item">
                            <div className="w-8 h-8 rounded-full bg-valentine-900/50 flex items-center justify-center group-hover/item:bg-valentine-700/50 transition-colors">
                              {copiedId === song.id ? <Link2 className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-valentine-400" />}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold">{copiedId === song.id ? 'Link Copied!' : 'Share Link'}</p>
                              <p className="text-[10px] text-valentine-400/70">Copy song URL</p>
                            </div>
                          </button>
                          <button onClick={(e) => handleDownload(song.url, song.name, e)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-valentine-200 hover:bg-valentine-800/40 hover:text-white transition-all duration-200 group/item">
                            <div className="w-8 h-8 rounded-full bg-valentine-900/50 flex items-center justify-center group-hover/item:bg-valentine-700/50 transition-colors">
                              <Download className="w-4 h-4 text-valentine-400" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold">Download</p>
                              <p className="text-[10px] text-valentine-400/70">Save to device</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                    {copiedId === song.id && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-scale-up-fade whitespace-nowrap shadow-lg">✓ Link copied!</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <main className="relative z-10 p-4">
            {proposalState === ProposalState.INPUT_NAME && (
              !customInvite ? (
                <div className="max-w-md mx-auto mt-20 md:mt-32">
                  <div className="bg-glass p-8 rounded-[2.5rem] border border-white/10 shadow-2xl animate-scale-up-fade">
                    <AdminPanel onLogin={handleLogin} initialIsRegister={!forceLoginTab} />
                  </div>
                </div>
              ) : (
                <NameInput onSubmit={handleNameSubmit} />
              )
            )}
            {proposalState === ProposalState.ASKING && (
              <Proposal onAccept={handleAccept} nickname={nickname} invite={customInvite} />
            )}
            {proposalState === ProposalState.ACCEPTED && (
              <Celebration invite={customInvite} />
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;