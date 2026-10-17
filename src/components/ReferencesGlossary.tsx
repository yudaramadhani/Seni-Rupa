import React from 'react';
import { BookOpen, HelpCircle, ArrowLeft, ExternalLink, Bookmark } from 'lucide-react';
import { GLOSSARY, REFERENCES } from '../data/mpiContent';
import { soundEffects } from '../utils/audio';

interface ReferencesGlossaryProps {
  onBack: () => void;
  onOpenDocModal: () => void;
}

export const ReferencesGlossary: React.FC<ReferencesGlossaryProps> = ({
  onBack,
  onOpenDocModal
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        <button
          onClick={() => { soundEffects.click(); onOpenDocModal(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fun font-bold text-xs transition cursor-pointer shadow-lg shadow-indigo-600/30"
        >
          <BookOpen className="w-4 h-4" /> Buka Rancangan 23 Poin Lengkap
        </button>
      </div>

      {/* GLOSARIUM ISTILAH SENI RUPA */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Kamus Istilah Rupa
          </span>
        </div>

        <h1 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Glosarium Seni Rupa: Teknik Menggambar
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Kamus istilah penting yang sering digunakan dalam proses berkarya seni rupa:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOSSARY.map((item, idx) => (
            <div key={idx} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4">
              <span className="font-fun font-bold text-amber-300 text-sm block mb-1">
                {item.term}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.def}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DAFTAR REFERENSI RESMI */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" /> Sumber Rujukan
          </span>
        </div>

        <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Daftar Pustaka & Referensi Resmi
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Buku pedoman guru dan literatur akademik yang mendasari pengembangan MPI ini:
        </p>

        <div className="space-y-3">
          {REFERENCES.map((ref, idx) => (
            <div key={idx} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
              <h4 className="font-fun font-bold text-sm text-white mb-1">
                "{ref.title}"
              </h4>
              <p className="text-xs text-slate-400">
                Oleh <span className="text-slate-300 font-medium">{ref.author}</span> ({ref.year}). Diterbitkan oleh {ref.publisher}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
