import React from 'react';
import { Target, CheckCircle2, Award, Clock, ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { LEARNING_OBJECTIVES, MPI_META } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface LearningObjectivesProps {
  onBack: () => void;
  onNext: () => void;
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({
  onBack,
  onNext
}) => {
  const readAloud = () => {
    soundEffects.click();
    const speechText = `Tujuan Pembelajaran: Pada akhir kegiatan ini, peserta didik mampu memahami karakteristik 7 teknik dasar menggambar, menganalisis hubungan kerapatan goresan terhadap volume 3D, mempraktikkan simulasi menggambar di virtual lab, dan menyelesaikan tantangan berkarya dengan nilai minimal 80.`;
    speechNarrator.speak(speechText);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Menu
        </button>

        <button
          onClick={readAloud}
          className="flex items-center gap-2 text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/60 px-4 py-2 rounded-xl border border-sky-500/40 text-xs font-semibold transition cursor-pointer"
        >
          <Volume2 className="w-4 h-4" /> Bacakan Tujuan
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-r from-blue-900/80 via-slate-900 to-indigo-900/80 border border-blue-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-fun text-2xl sm:text-3xl font-extrabold text-white">
              Tujuan & Kontrak Pembelajaran
            </h1>
            <p className="text-xs text-blue-300">
              Seni Rupa SMP Kelas VII · Alokasi Waktu: {MPI_META.timeAllocation}
            </p>
          </div>
        </div>

        {/* Capaian Pembelajaran Box */}
        <div className="mt-5 bg-slate-800/90 border border-blue-500/20 rounded-2xl p-4 sm:p-5">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
            Capaian Pembelajaran (Fase D - Kelas VII)
          </span>
          <p className="text-slate-200 text-sm leading-relaxed">
            {LEARNING_OBJECTIVES.cp}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Specific Learning Objectives */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 shadow-lg">
          <h2 className="font-fun text-lg font-bold text-amber-300 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-amber-400" /> Tujuan Pembelajaran (TP)
          </h2>
          <ul className="space-y-3">
            {LEARNING_OBJECTIVES.tp.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Indicators of Success (IKTP) */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 shadow-lg">
          <h2 className="font-fun text-lg font-bold text-emerald-300 flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-emerald-400" /> Indikator Ketercapaian (IKTP)
          </h2>
          <ul className="space-y-3">
            {LEARNING_OBJECTIVES.iktp.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  ✓
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Profil Pelajar Pancasila Card */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 mb-8">
        <h3 className="font-fun text-base font-bold text-sky-300 flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-sky-400" /> Dimensi Profil Pelajar Pancasila
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LEARNING_OBJECTIVES.profilPancasila.map((dim, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4">
              <span className="text-sm font-fun font-bold text-amber-300 block mb-1">
                {dim.title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Kriteria Penilaian / Passing Grade */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎯</div>
          <div>
            <h4 className="font-fun font-bold text-amber-300 text-sm">
              Target Ketercapaian Minimal: {MPI_META.targetScore} Poin
            </h4>
            <p className="text-xs text-slate-300">
              Selesaikan Kuis Asesmen Sumatif dengan nilai minimal 80 untuk membuka Sertifikat Emas Seniman Muda Kelas VII!
            </p>
          </div>
        </div>

        <button
          onClick={() => { soundEffects.click(); onNext(); }}
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-400/20 cursor-pointer"
        >
          Lanjut ke Apersepsi ➔
        </button>
      </div>
    </div>
  );
};
