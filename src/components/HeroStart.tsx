import React, { useState } from 'react';
import { Sparkles, Maximize2, Palette, ShieldCheck, ChevronRight, Music } from 'lucide-react';
import { requestAppFullscreen } from '../utils/fullscreen';
import { soundEffects, speechNarrator } from '../utils/audio';

interface HeroStartProps {
  studentName: string;
  setStudentName: (name: string) => void;
  schoolName: string;
  setSchoolName: (school: string) => void;
  onStart: () => void;
}

export const HeroStart: React.FC<HeroStartProps> = ({
  studentName,
  setStudentName,
  schoolName,
  setSchoolName,
  onStart
}) => {
  const [localName, setLocalName] = useState(studentName || 'Bintang Rupa');
  const [localSchool, setLocalSchool] = useState(schoolName || 'SMP Negeri 1');
  const [isStarting, setIsStarting] = useState(false);

  const handleStartFullscreen = async () => {
    setIsStarting(true);
    soundEffects.fanfare();

    // Set updated profile
    setStudentName(localName.trim() || 'Sahabat Seni');
    setSchoolName(localSchool.trim() || 'SMP Belajar Merdeka');

    // Speech welcome
    speechNarrator.speak(`Halo ${localName.trim() || 'Sahabat Seni'}! Selamat datang di Art Explorer, Petualangan 7 Teknik Menggambar Seni Rupa SMP Kelas 7. Bersama saya, Maestro Seno! Mari kita mulai!`);

    // Mandatory Programmatic HTML5 Fullscreen API trigger
    try {
      await requestAppFullscreen();
    } catch (e) {
      console.warn('Fullscreen triggered with fallback:', e);
    }

    setTimeout(() => {
      onStart();
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-radial from-slate-900 via-indigo-950 to-slate-950">
      {/* Background Decorative Art Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow bubbles */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-3xl"></div>

        {/* Floating Cartoon Art Icons */}
        <div className="absolute top-[12%] left-[8%] animate-float text-amber-400 opacity-60">
          <Palette className="w-14 h-14" />
        </div>
        <div className="absolute top-[20%] right-[10%] animate-float text-rose-400 opacity-60 [animation-delay:1.5s]">
          <span className="text-5xl">✏️</span>
        </div>
        <div className="absolute bottom-[18%] left-[12%] animate-float text-sky-400 opacity-60 [animation-delay:2.5s]">
          <span className="text-5xl">🎨</span>
        </div>
        <div className="absolute bottom-[15%] right-[14%] animate-float text-emerald-400 opacity-60 [animation-delay:3s]">
          <span className="text-5xl">🖌️</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* Level Tag & Subject */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-indigo-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-4 backdrop-blur-md shadow-lg shadow-amber-500/10">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
            MULTIMEDIA PEMBELAJARAN INTERAKTIF (MPI) · SENI RUPA SMP KELAS VII
          </span>
        </div>

        {/* Title Lockup */}
        <h1 className="font-fun text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-sky-300 bg-clip-text text-transparent drop-shadow-md">
            ART-EXPLORER
          </span>
        </h1>
        <p className="font-fun text-lg sm:text-2xl text-slate-200 font-semibold mb-4">
          Petualangan Menjelajah <span className="text-amber-400 underline decoration-wavy decoration-rose-500 underline-offset-4">7 Teknik Menggambar</span>
        </p>

        {/* Avatar Maestro Seno Card */}
        <div className="relative my-4 flex flex-col items-center">
          {/* Avatar Graphic */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-1 shadow-2xl shadow-rose-500/30 animate-pulse-subtle">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-white/20">
                {/* Custom Vector Cartoon Painter Maestro Seno */}
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <rect width="120" height="120" fill="#1e1b4b" />
                  {/* Skin head */}
                  <ellipse cx="60" cy="62" rx="30" ry="32" fill="#fed7aa" />
                  {/* Painter French Beret (Topi Baret Pelukis Merah) */}
                  <path d="M26 46 C26 24, 94 24, 94 46 C94 52, 26 52, 26 46 Z" fill="#e11d48" />
                  <ellipse cx="60" cy="28" rx="8" ry="4" fill="#be123c" />
                  <circle cx="60" cy="24" r="3" fill="#9f1239" />
                  {/* Hair */}
                  <path d="M30 46 C26 58, 28 68, 30 72" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
                  <path d="M90 46 C94 58, 92 68, 90 72" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
                  {/* Eyes friendly with twinkle */}
                  <ellipse cx="48" cy="58" rx="4" ry="5" fill="#0f172a" />
                  <ellipse cx="72" cy="58" rx="4" ry="5" fill="#0f172a" />
                  <circle cx="50" cy="56" r="1.5" fill="#ffffff" />
                  <circle cx="74" cy="56" r="1.5" fill="#ffffff" />
                  {/* Eyebrows */}
                  <path d="M42 50 Q48 46 54 50" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M66 50 Q72 46 78 50" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Painter moustache */}
                  <path d="M48 68 Q60 74 60 70 Q60 74 72 68 Q60 69 48 68 Z" fill="#451a03" />
                  {/* Happy Smile */}
                  <path d="M50 74 Q60 84 70 74" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Rosy cheeks */}
                  <circle cx="38" cy="65" r="5" fill="#fb7185" opacity="0.6" />
                  <circle cx="82" cy="65" r="5" fill="#fb7185" opacity="0.6" />
                  {/* Striped artist shirt collar & scarf */}
                  <path d="M36 94 L84 94 L90 120 L30 120 Z" fill="#3b82f6" />
                  <path d="M46 94 L54 120" stroke="#ffffff" strokeWidth="3" />
                  <path d="M64 94 L72 120" stroke="#ffffff" strokeWidth="3" />
                  <path d="M52 92 Q60 98 68 92" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 font-fun font-bold text-xs px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow">
              Guru Seni
            </div>
          </div>

          {/* Speech bubble */}
          <div className="mt-3 bg-slate-800/90 border border-slate-700/80 rounded-2xl px-5 py-3 max-w-md shadow-xl backdrop-blur-md relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-l border-t border-slate-700/80 rotate-45"></div>
            <p className="text-slate-200 text-sm leading-relaxed">
              <span className="text-amber-400 font-bold">"Hai Calon Maestro!</span> Saya <strong className="text-sky-300">Maestro Seno</strong>. Siap menjelajah rahasia arsir, dussel, hingga aquarel untuk membuat gambarmu hidup dan bervolume 3D?"
            </p>
          </div>
        </div>

        {/* Student Profile Inputs Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 max-w-lg w-full backdrop-blur-md shadow-2xl">
          <div className="text-left mb-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
              Nama Peserta Didik
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="Ketik namamu di sini..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              maxLength={35}
            />
          </div>

          <div className="text-left mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
              Asal Sekolah / Kelas
            </label>
            <input
              type="text"
              value={localSchool}
              onChange={(e) => setLocalSchool(e.target.value)}
              placeholder="Contoh: SMPN 1 Cemerlang - Kelas VII A"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
              maxLength={40}
            />
          </div>
        </div>

        {/* MANDATORY TRIGGER: BIG START BUTTON FOR FULLSCREEN */}
        <div className="w-full max-w-md flex flex-col items-center">
          <button
            onClick={handleStartFullscreen}
            disabled={isStarting}
            className="w-full group cursor-pointer relative overflow-hidden bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 hover:from-amber-300 hover:via-rose-400 hover:to-indigo-500 text-slate-950 font-fun font-bold text-xl sm:text-2xl py-4 sm:py-5 px-8 rounded-2xl shadow-2xl shadow-rose-500/40 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-2 border-white/30 flex items-center justify-center gap-3"
            aria-label="Mulai Petualangan dengan Fullscreen Otomatis"
          >
            {/* Shimmer light effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            
            <Maximize2 className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.5]" />
            <span className="tracking-wide text-slate-950 uppercase font-black">
              {isStarting ? 'MEMBUKA LAYAR PENUH...' : 'START (MULAI PETUALANGAN)'}
            </span>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Fullscreen Notice Tag */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-amber-300/90 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>⚡ Tombol <strong>START</strong> otomatis mengaktifkan mode <strong>Layar Penuh (Fullscreen)</strong></span>
          </div>

          <div className="mt-2 text-[11px] text-slate-400">
            Kurikulum Merdeka Seni Rupa SMP · Alokasi 3 x 40 Menit · Dilengkapi Simulasi Lab & Audio Narasi
          </div>
        </div>
      </div>
    </div>
  );
};
