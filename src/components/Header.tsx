import React, { useState, useEffect } from 'react';
import { 
  Maximize, 
  Minimize, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Type, 
  Home, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { ScreenType } from '../types';
import { soundEffects, isSoundActive, setSoundActive, isVoiceActive, setVoiceActive, speechNarrator } from '../utils/audio';
import { isAppFullscreen, toggleAppFullscreen } from '../utils/fullscreen';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  studentName: string;
  xp: number;
  onOpenDocModal: () => void;
  isLargeFont: boolean;
  onToggleFontSize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  studentName,
  xp,
  onOpenDocModal,
  isLargeFont,
  onToggleFontSize
}) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(isAppFullscreen());
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    soundEffects.click();
    const result = await toggleAppFullscreen();
    setFullscreen(result);
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundActive(next);
    if (next) soundEffects.click();
  };

  const handleToggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    setVoiceActive(next);
    if (next) {
      soundEffects.click();
      speechNarrator.speak('Suara narator diaktifkan.');
    } else {
      speechNarrator.stop();
    }
  };

  if (currentScreen === 'start') {
    return null; // Keep start splash screen clean and focused
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Student badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { soundEffects.click(); onNavigate('menu'); }}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
            title="Kembali ke Menu Utama"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-fun font-bold text-lg bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300 bg-clip-text text-transparent">
                ART-EXPLORER
              </span>
              <p className="text-[11px] text-slate-400 -mt-1 font-medium">Seni Rupa SMP Kelas VII</p>
            </div>
          </button>

          {/* Student Tag */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-slate-300 font-medium">
              Siswa: <span className="text-amber-300 font-semibold">{studentName || 'Sahabat Seni'}</span>
            </span>
          </div>
        </div>

        {/* XP and Badges indicator */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-full px-3 py-1 text-amber-300 font-fun font-bold text-xs sm:text-sm">
            <span>✨</span>
            <span>{xp} XP</span>
          </div>

          {/* Quick Screen Navigation Chips (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => { soundEffects.click(); onNavigate('menu'); }}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium flex items-center gap-1 ${
                currentScreen === 'menu' ? 'bg-amber-500 text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Menu
            </button>
            <button
              onClick={() => { soundEffects.click(); onNavigate('materi'); }}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                currentScreen === 'materi' ? 'bg-amber-500 text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              7 Teknik
            </button>
            <button
              onClick={() => { soundEffects.click(); onNavigate('simulasi'); }}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                currentScreen === 'simulasi' ? 'bg-amber-500 text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Virtual Lab
            </button>
            <button
              onClick={() => { soundEffects.click(); onNavigate('latihan'); }}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                currentScreen === 'latihan' ? 'bg-amber-500 text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Mini Games
            </button>
            <button
              onClick={() => { soundEffects.click(); onNavigate('asesmen'); }}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                currentScreen === 'asesmen' ? 'bg-amber-500 text-slate-900 font-bold shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Kuis Sumatif
            </button>
          </nav>

          {/* Action Tools: Fullscreen, Audio, Voice, Font, Doc */}
          <div className="flex items-center gap-1.5">
            {/* Fullscreen API Button */}
            <button
              onClick={handleToggleFullscreen}
              className={`p-2 rounded-xl border transition-all ${
                fullscreen
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title={fullscreen ? 'Keluar Layar Penuh (ESC)' : 'Mode Layar Penuh (Fullscreen)'}
              aria-label="Toggle Fullscreen"
            >
              {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Sound FX Button */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition-all ${
                soundOn
                  ? 'bg-slate-800 text-emerald-300 border-emerald-500/40 hover:bg-slate-700'
                  : 'bg-slate-800 text-rose-400 border-slate-700'
              }`}
              title={soundOn ? 'Efek Suara Aktif' : 'Efek Suara Nonaktif'}
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Voice Narration Button */}
            <button
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl border transition-all ${
                voiceOn
                  ? 'bg-slate-800 text-sky-300 border-sky-500/40 hover:bg-slate-700'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
              title={voiceOn ? 'Narasi Suara (TTS) Aktif' : 'Narasi Suara Dimatikan'}
              aria-label="Toggle Voice"
            >
              {voiceOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            {/* Font Size Toggle Button */}
            <button
              onClick={() => { soundEffects.click(); onToggleFontSize(); }}
              className={`p-2 rounded-xl border transition-all ${
                isLargeFont
                  ? 'bg-amber-500/30 text-amber-300 border-amber-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title={isLargeFont ? 'Ukuran Teks Besar' : 'Ukuran Teks Standar'}
              aria-label="Toggle Font Size"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Teacher Blueprint 23-Point Modal Trigger */}
            <button
              onClick={() => { soundEffects.click(); onOpenDocModal(); }}
              className="p-2 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 transition-all flex items-center gap-1"
              title="Lihat Rancangan Konsep Lengkap (23 Butir)"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-semibold">Panduan 23 Poin</span>
            </button>

            {/* Mobile Menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-3 pb-2 border-t border-slate-800 mt-2 grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => { soundEffects.click(); onNavigate('menu'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-amber-400" /> Menu Utama
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('tujuan'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" /> Tujuan & CP
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('apersepsi'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> Apersepsi 2D/3D
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('materi'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-purple-400" /> 7 Teknik Menggambar
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('simulasi'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <span>🎨</span> Virtual Lab
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('latihan'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <span>🎮</span> Mini Games
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('asesmen'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <span>📝</span> Kuis Sumatif
          </button>
          <button
            onClick={() => { soundEffects.click(); onNavigate('sertifikat'); setMobileMenuOpen(false); }}
            className="p-2 rounded-lg bg-slate-800 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
          >
            <span>🏆</span> Sertifikat
          </button>
        </div>
      )}
    </header>
  );
};
