import React, { useState } from 'react';
import { Compass, Clock, ArrowLeft, ArrowRight, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { CONCEPT_MAP, HISTORY_TIMELINE } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface InteractiveExplorationProps {
  onBack: () => void;
  onNext: () => void;
}

export const InteractiveExploration: React.FC<InteractiveExplorationProps> = ({
  onBack,
  onNext
}) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const speakExploration = () => {
    soundEffects.click();
    speechNarrator.speak(
      `Peta Konsep Teknik Menggambar: Secara umum terbagi menjadi Media Kering seperti arsir, dussel, dan pointilis, serta Media Basah seperti aquarel dan plakat. Sejarah teknik menggambar telah dimulai sejak 40.000 tahun Sebelum Masehi di Gua Leang-Leang Maros Indonesia!`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        <button
          onClick={speakExploration}
          className="flex items-center gap-2 text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/60 px-4 py-2 rounded-xl border border-sky-500/40 text-xs font-semibold transition cursor-pointer"
        >
          <Volume2 className="w-4 h-4" /> Dengarkan Ringkasan
        </button>
      </div>

      {/* Main Container */}
      <div className="space-y-8">
        {/* SECTION 1: PETA KONSEP */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Struktur Ilmu Seni Rupa
            </span>
          </div>

          <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {CONCEPT_MAP.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Klik kategori di bawah ini untuk melihat bagaimana ke-7 teknik dikelompokkan berdasarkan sifat medium dan efek rupa:
          </p>

          {/* Category Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {CONCEPT_MAP.categories.map((cat, idx) => {
              const isSelected = activeCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundEffects.click();
                    setActiveCategory(idx);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-fun font-bold block mb-1">
                    {cat.category}
                  </span>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Techniques under selected category */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Teknik yang Termasuk dalam {CONCEPT_MAP.categories[activeCategory].category}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONCEPT_MAP.categories[activeCategory].techniques.map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-700/80 rounded-xl p-4">
                  <span className="font-fun font-bold text-amber-300 text-sm block mb-1">
                    {item.name}
                  </span>
                  <div className="text-[11px] text-slate-300 mb-2">
                    <strong className="text-slate-400">Fokus:</strong> {item.focus}
                  </div>
                  <div className="text-[10px] bg-slate-800 text-sky-300 px-2 py-1 rounded inline-block">
                    Media: {item.medium}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: TIMELINE SEJARAH TEKNIK MENGGAMBAR */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Lintas Sejarah Seni Rupa
            </span>
          </div>

          <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Linimasa Sejarah: Evolusi Teknik Menggambar Dunia & Nusantara
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-8">
            Dari lukisan gua manusia purba di Sulawesi hingga kanvas digital abad ke-21:
          </p>

          {/* Timeline Stream */}
          <div className="relative border-l-2 border-indigo-500/40 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {HISTORY_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:border-amber-400/50 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-fun font-bold text-amber-400">
                      📅 {item.era}
                    </span>
                    <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-fun text-base sm:text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => { soundEffects.click(); onNext(); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/30 cursor-pointer"
          >
            Masuk ke Virtual Lab Menggambar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
