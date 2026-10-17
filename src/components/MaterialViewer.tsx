import React, { useState } from 'react';
import { 
  PenTool, 
  Feather, 
  CircleDot, 
  Droplet, 
  Palette, 
  Layers, 
  Activity, 
  CheckCircle, 
  Volume2, 
  ArrowLeft, 
  ArrowRight, 
  Brush, 
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { TECHNIQUES_DATA } from '../data/mpiContent';
import { Technique, ScreenType } from '../types';
import { soundEffects, speechNarrator } from '../utils/audio';

interface MaterialViewerProps {
  onBack: () => void;
  onGoToLab: () => void;
  completedTechniques: string[];
  onCompleteTechnique: (id: string) => void;
}

export const MaterialViewer: React.FC<MaterialViewerProps> = ({
  onBack,
  onGoToLab,
  completedTechniques,
  onCompleteTechnique
}) => {
  const [activeTab, setActiveTab] = useState<string>('arsir');
  const [isScratching, setIsScratching] = useState(false);

  const currentTech: Technique = TECHNIQUES_DATA.find(t => t.id === activeTab) || TECHNIQUES_DATA[0];

  const handleTabChange = (id: string) => {
    soundEffects.click();
    setActiveTab(id);
    speechNarrator.stop();
  };

  const speakCurrentTech = () => {
    soundEffects.click();
    const narration = `${currentTech.name}. ${currentTech.tagline}. ${currentTech.description} Tips Maestro: ${currentTech.tipMaestro}`;
    speechNarrator.speak(narration);
  };

  const handleMarkComplete = () => {
    if (!completedTechniques.includes(currentTech.id)) {
      soundEffects.success();
      onCompleteTechnique(currentTech.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={speakCurrentTech}
            className="flex items-center gap-2 text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/60 px-4 py-2 rounded-xl border border-sky-500/40 text-xs font-semibold transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4" /> Narasi Suara
          </button>
          <button
            onClick={() => { soundEffects.click(); onGoToLab(); }}
            className="flex items-center gap-2 text-amber-300 hover:text-white bg-amber-950/60 hover:bg-amber-900/60 px-4 py-2 rounded-xl border border-amber-500/40 text-xs font-semibold transition cursor-pointer"
          >
            <Brush className="w-4 h-4 text-amber-400" /> Buka di Virtual Lab
          </button>
        </div>
      </div>

      {/* 7 Technique Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {TECHNIQUES_DATA.map((tech) => {
          const isActive = tech.id === activeTab;
          const isDone = completedTechniques.includes(tech.id);

          return (
            <button
              key={tech.id}
              onClick={() => handleTabChange(tech.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap text-xs font-fun font-bold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{tech.name}</span>
              {isDone && <CheckCircle className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />}
            </button>
          );
        })}
      </div>

      {/* Main Material Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Technique Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                Teknik Dasar Seni Rupa
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                currentTech.difficulty === 'Mudah' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                currentTech.difficulty === 'Sedang' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                Tingkat: {currentTech.difficulty}
              </span>
            </div>

            <h1 className="font-fun text-3xl sm:text-4xl font-extrabold text-white">
              {currentTech.name}
            </h1>
            <p className="text-sm font-medium text-amber-300 mt-1">
              {currentTech.alias} — <span className="text-slate-300 font-normal">{currentTech.tagline}</span>
            </p>
          </div>

          {/* Mark Complete Action Button */}
          <button
            onClick={handleMarkComplete}
            disabled={completedTechniques.includes(currentTech.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-fun font-bold text-xs transition cursor-pointer shadow-lg ${
              completedTechniques.includes(currentTech.id)
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {completedTechniques.includes(currentTech.id) ? '✓ Materi Sudah Dipelajari' : 'Tandai Selesai (+20 XP)'}
            </span>
          </button>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Description & Characteristics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
              <h3 className="font-fun font-bold text-base text-sky-300 mb-2">
                Pengertian Teknik
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                {currentTech.description}
              </p>
            </div>

            {/* Characteristic List */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
              <h3 className="font-fun font-bold text-base text-amber-300 mb-3">
                Ciri Khas & Karakteristik Visual
              </h3>
              <ul className="space-y-2.5">
                {currentTech.characteristic.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Materials Required */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
              <h3 className="font-fun font-bold text-base text-emerald-300 mb-3">
                Alat & Bahan Utama yang Dibutuhkan
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentTech.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-medium"
                  >
                    🛠️ {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Micro-Canvas Visualizer & Artwork Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visualizer card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Simulasi Mikro Tekstur Goresan
              </span>

              {/* Dynamic SVG Visual Representation of the technique */}
              <div 
                className="w-full h-56 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden group cursor-crosshair"
                onMouseEnter={() => { soundEffects.pencilScratch(); setIsScratching(true); }}
                onMouseLeave={() => setIsScratching(false)}
              >
                {/* Visualizer based on technique */}
                {currentTech.visualType === 'hatching' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    {/* Sphere with hatching lines */}
                    <circle cx="100" cy="80" r="55" fill="#1e293b" />
                    {/* Hatching lines */}
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1={60 + i * 4}
                        y1={50 + i * 2}
                        x2={110 + i * 2}
                        y2={115 + (i % 3) * 3}
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        opacity={0.3 + (i / 18) * 0.7}
                      />
                    ))}
                    {/* Cross-hatching for darker shadow */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={`ch-${i}`}
                        x1={85 + i * 3}
                        y1={115 - i * 2}
                        x2={135 + i * 2}
                        y2={65 + (i % 2) * 3}
                        stroke="#e2e8f0"
                        strokeWidth="1.8"
                        opacity={0.4 + (i / 12) * 0.6}
                      />
                    ))}
                  </svg>
                )}

                {currentTech.visualType === 'smudge' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    <defs>
                      <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" />
                      </filter>
                    </defs>
                    <circle cx="100" cy="80" r="55" fill="#0f172a" />
                    <ellipse cx="85" cy="65" rx="35" ry="30" fill="#a855f7" filter="url(#blurFilter)" opacity="0.6" />
                    <ellipse cx="125" cy="95" rx="30" ry="25" fill="#3b0764" filter="url(#blurFilter)" opacity="0.8" />
                    <circle cx="75" cy="55" r="14" fill="#f5d0fe" filter="url(#blurFilter)" opacity="0.7" />
                  </svg>
                )}

                {currentTech.visualType === 'stippling' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    <circle cx="100" cy="80" r="55" fill="#1e1b4b" />
                    {/* Stippling dots distribution */}
                    {Array.from({ length: 140 }).map((_, i) => {
                      const angle = Math.random() * Math.PI * 2;
                      // cluster more dots on the bottom-right (shadow side)
                      const dist = 10 + Math.pow(Math.random(), 0.6) * 44;
                      const cx = 100 + Math.cos(angle) * dist + (dist > 25 ? 12 : 0);
                      const cy = 80 + Math.sin(angle) * dist + (dist > 25 ? 12 : 0);
                      const r = Math.random() > 0.8 ? 1.5 : 1.0;
                      return (
                        <circle key={i} cx={cx} cy={cy} r={r} fill="#ec4899" opacity={0.6 + Math.random() * 0.4} />
                      );
                    })}
                  </svg>
                )}

                {currentTech.visualType === 'wash' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    <defs>
                      <linearGradient id="waterWash" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 30,50 Q 80,20 140,40 Q 180,60 170,110 Q 130,150 70,130 Q 20,110 30,50 Z"
                      fill="url(#waterWash)"
                      stroke="#7dd3fc"
                      strokeWidth="1"
                    />
                    <path
                      d="M 60,60 Q 110,40 130,70 Q 150,110 110,120 Q 70,120 60,60 Z"
                      fill="#0369a1"
                      opacity="0.3"
                    />
                  </svg>
                )}

                {currentTech.visualType === 'opaque' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    {/* Layered thick opaque paint strokes */}
                    <rect x="30" y="30" width="140" height="40" rx="6" fill="#f59e0b" />
                    <rect x="45" y="55" width="125" height="45" rx="6" fill="#ef4444" />
                    <rect x="25" y="85" width="135" height="40" rx="6" fill="#3b82f6" />
                    <circle cx="140" cy="65" r="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                  </svg>
                )}

                {currentTech.visualType === 'silhouette' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    {/* Sunset background */}
                    <defs>
                      <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                    <rect x="20" y="20" width="160" height="120" rx="12" fill="url(#sunset)" />
                    {/* Pure black tree silhouette */}
                    <path
                      d="M 100,140 L 98,90 Q 70,75 50,70 Q 80,60 96,80 Q 85,50 80,35 Q 95,45 100,70 Q 115,40 130,30 Q 120,55 106,78 Q 125,70 150,75 Q 120,85 102,92 L 102,140 Z"
                      fill="#09090b"
                    />
                  </svg>
                )}

                {currentTech.visualType === 'line' && (
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    {/* Precise architectural contour line art */}
                    <circle cx="100" cy="80" r="50" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                    <ellipse cx="100" cy="80" rx="50" ry="22" fill="none" stroke="#818cf8" strokeWidth="1.5" />
                    <line x1="100" y1="30" x2="100" y2="130" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 60,65 Q 100,50 140,65" fill="none" stroke="#6366f1" strokeWidth="2" />
                    <path d="M 60,95 Q 100,110 140,95" fill="none" stroke="#6366f1" strokeWidth="2" />
                  </svg>
                )}

                <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
                  Arahkan kursor untuk simulasi
                </div>
              </div>

              {/* Sample Work Caption */}
              <div className="mt-3 text-left w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-fun font-bold text-amber-300 block">
                  {currentTech.sampleWorks.title}
                </span>
                <p className="text-[11px] text-slate-300 leading-normal mt-0.5">
                  {currentTech.sampleWorks.caption}
                </p>
              </div>
            </div>

            {/* Maestro Seno Pro Tip */}
            <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-xs font-fun font-bold text-amber-300 block">
                  Tips Emas Maestro Seno
                </span>
                <p className="text-xs text-slate-200 leading-relaxed mt-1">
                  "{currentTech.tipMaestro}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Step-by-Step Procedure */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="font-fun font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> 4 Langkah Menerapkan {currentTech.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentTech.steps.map((step, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 font-fun font-extrabold text-sm flex items-center justify-center mb-2 border border-amber-500/30">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {step}
                  </p>
                </div>
                <div className="mt-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Tahap #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
