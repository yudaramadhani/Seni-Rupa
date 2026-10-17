import React, { useState } from 'react';
import { Sparkles, Sun, Eye, ArrowLeft, ArrowRight, Volume2, Info } from 'lucide-react';
import { APERCEPTION_DATA } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface AperceptionProps {
  onBack: () => void;
  onNext: () => void;
}

export const Aperception: React.FC<AperceptionProps> = ({ onBack, onNext }) => {
  // Light angle: 0 (left) to 100 (right)
  const [lightPos, setLightPos] = useState<number>(30);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const speakAperception = () => {
    soundEffects.click();
    speechNarrator.speak(
      `Coba kamu geser tombol matahari di atas bola! Lihat bagaimana bayangan bergerak dan membuat bola tampak bulat nyata. Inilah rahasia teknik menggambar: pencahayaan menciptakan ilusi tiga dimensi!`
    );
  };

  const highlightX = 25 + (lightPos / 100) * 50;
  const castShadowOffset = ((lightPos - 50) / 50) * 45;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Menu
        </button>

        <button
          onClick={speakAperception}
          className="flex items-center gap-2 text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/60 px-4 py-2 rounded-xl border border-sky-500/40 text-xs font-semibold transition cursor-pointer"
        >
          <Volume2 className="w-4 h-4" /> Dengarkan Penjelasan
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Apersepsi Interaktif
          </span>
        </div>

        <h1 className="font-fun text-2xl sm:text-4xl font-extrabold text-white mb-3">
          {APERCEPTION_DATA.title}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {APERCEPTION_DATA.hook}
        </p>

        {/* INTERACTIVE LIGHTING SIMULATOR */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 mb-8 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-fun text-lg font-bold text-amber-400 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400 animate-spin" /> Eksperimen Arah Sumber Cahaya
              </h3>
              <p className="text-xs text-slate-400">
                Geser pengatur arah sinar matahari untuk melihat perubahan ilusi volume 3D!
              </p>
            </div>

            {/* Slider */}
            <div className="w-full sm:w-64 flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 font-bold">Kiri</span>
              <input
                type="range"
                min="0"
                max="100"
                value={lightPos}
                onChange={(e) => {
                  soundEffects.click();
                  setLightPos(Number(e.target.value));
                }}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-bold">Kanan</span>
            </div>
          </div>

          {/* Canvas comparison area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center py-4">
            {/* Box 1: Flat 2D */}
            <div className="flex flex-col items-center">
              <div className="w-52 h-52 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-4 relative shadow-inner">
                {/* SVG 2D Circle */}
                <svg viewBox="0 0 100 100" className="w-36 h-36">
                  <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
                </svg>
                <div className="absolute top-2 left-2 bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded">
                  2D Garis Datar
                </div>
              </div>
              <h4 className="font-fun font-bold text-sm text-slate-300 mt-3">
                {APERCEPTION_DATA.comparison.flat.title}
              </h4>
              <p className="text-xs text-slate-400 text-center max-w-xs mt-1">
                {APERCEPTION_DATA.comparison.flat.desc}
              </p>
            </div>

            {/* Box 2: 3D Volumetric Shaded Sphere */}
            <div className="flex flex-col items-center">
              <div className="w-52 h-52 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-center p-4 relative shadow-2xl shadow-amber-500/10">
                {/* Dynamic SVG 3D Shaded Sphere */}
                <svg viewBox="0 0 120 120" className="w-44 h-44 overflow-visible">
                  <defs>
                    <radialGradient
                      id="sphere3D"
                      cx={`${highlightX}%`}
                      cy="30%"
                      r="70%"
                      fx={`${highlightX}%`}
                      fy="30%"
                    >
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="25%" stopColor="#fbbf24" />
                      <stop offset="55%" stopColor="#b45309" />
                      <stop offset="85%" stopColor="#451a03" />
                      <stop offset="100%" stopColor="#1e1b4b" />
                    </radialGradient>

                    <pattern id="hatchPat" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="6" stroke="#000000" strokeWidth="0.8" opacity="0.4" />
                    </pattern>
                  </defs>

                  {/* Cast Shadow on Floor */}
                  <ellipse
                    cx={60 - castShadowOffset}
                    cy="105"
                    rx="40"
                    ry="9"
                    fill="#020617"
                    opacity="0.8"
                  />

                  {/* Main Shaded Sphere */}
                  <circle cx="60" cy="55" r="42" fill="url(#sphere3D)" />
                  <circle cx="60" cy="55" r="42" fill="url(#hatchPat)" opacity="0.3" />

                  {/* Sun Icon Position Indicator */}
                  <g transform={`translate(${20 + (lightPos / 100) * 80}, 5)`}>
                    <circle cx="0" cy="0" r="7" fill="#f59e0b" />
                    <line x1="0" y1="-10" x2="0" y2="-12" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="0" y1="10" x2="0" y2="12" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="-10" y1="0" x2="-12" y2="0" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="10" y1="0" x2="12" y2="0" stroke="#f59e0b" strokeWidth="2" />
                  </g>
                </svg>

                <div className="absolute top-2 left-2 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/40">
                  3D Bervolume (Teknik Arsir)
                </div>
              </div>
              <h4 className="font-fun font-bold text-sm text-amber-300 mt-3">
                {APERCEPTION_DATA.comparison.shaded.title}
              </h4>
              <p className="text-xs text-slate-300 text-center max-w-xs mt-1">
                {APERCEPTION_DATA.comparison.shaded.desc}
              </p>
            </div>
          </div>
        </div>

        {/* 5 Light Zones Inspector */}
        <h3 className="font-fun text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-sky-400" /> 5 Zona Penting dalam Menggambar Gelap-Terang
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Klik setiap zona di bawah ini untuk melihat peran pentingnya dalam menghasilkan karya yang hidup:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {APERCEPTION_DATA.lightZones.map((zone, idx) => {
            const isSelected = activeZone === zone.name;
            return (
              <div
                key={idx}
                onClick={() => {
                  soundEffects.click();
                  setActiveZone(isSelected ? null : zone.name);
                }}
                className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-fun font-bold text-amber-300">
                    {zone.name}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
                    Zona #{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {zone.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={() => { soundEffects.click(); onNext(); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/30 cursor-pointer"
          >
            Jelajahi 7 Teknik Menggambar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
