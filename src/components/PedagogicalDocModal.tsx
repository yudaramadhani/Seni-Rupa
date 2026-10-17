import React, { useState } from 'react';
import { X, Copy, Check, Download, BookOpen, Sparkles } from 'lucide-react';
import { PEDAGOGICAL_BLUEPRINT } from '../data/mpiContent';
import { soundEffects } from '../utils/audio';

interface PedagogicalDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogicalDocModal: React.FC<PedagogicalDocModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    soundEffects.click();
    navigator.clipboard.writeText(PEDAGOGICAL_BLUEPRINT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    soundEffects.fanfare();
    const element = document.createElement('a');
    const file = new Blob([PEDAGOGICAL_BLUEPRINT], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Rancangan_Lengkap_MPI_Seni_Rupa_SMP_7_Teknik_23_Poin.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fun font-bold text-base sm:text-lg text-white">
                Dokumen Rancangan Lengkap MPI (23 Poin Format Instruksional)
              </h3>
              <p className="text-xs text-indigo-300">
                Seni Rupa SMP Kelas VII · Kurikulum Merdeka Fase D
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Salin Seluruh Teks"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow"
              title="Unduh Berkas Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh (.md)</span>
            </button>

            <button
              onClick={() => { soundEffects.click(); onClose(); }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap select-text bg-slate-950/70">
          {PEDAGOGICAL_BLUEPRINT}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>Format terstruktur 23 Butir Pengembang Instruksional</span>
          <button
            onClick={() => { soundEffects.click(); onClose(); }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-fun font-bold text-xs transition cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
