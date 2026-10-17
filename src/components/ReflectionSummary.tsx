import React, { useState } from 'react';
import { Layers, Sparkles, Heart, Smile, ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';
import { TECHNIQUES_DATA } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface ReflectionSummaryProps {
  onBack: () => void;
  onNext: () => void;
  reflection: {
    learned: string;
    liked: string;
    practiceMore: string;
    emoji: string;
  };
  onSaveReflection: (reflection: {
    learned: string;
    liked: string;
    practiceMore: string;
    emoji: string;
  }) => void;
}

export const ReflectionSummary: React.FC<ReflectionSummaryProps> = ({
  onBack,
  onNext,
  reflection,
  onSaveReflection
}) => {
  const [learned, setLearned] = useState(reflection.learned || 'Saya mempelajari cara membedakan teknik media kering seperti arsir dan dussel dengan media basah seperti aquarel dan plakat.');
  const [liked, setLiked] = useState(reflection.liked || 'Mencoba kuas simulasi pointilis dan melihat bagaimana jutaan titik membentuk bayangan buah apel di Virtual Lab!');
  const [practiceMore, setPracticeMore] = useState(reflection.practiceMore || 'Saya ingin melatih teknik dussel menggunakan kertas gosok agar gradasinya semakin halus.');
  const [selectedEmoji, setSelectedEmoji] = useState(reflection.emoji || '🎨');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const emojiOptions = [
    { emoji: '🎨', label: 'Penuh Inspirasi' },
    { emoji: '⭐', label: 'Sangat Percaya Diri' },
    { emoji: '🚀', label: 'Ingin Bereksperimen' },
    { emoji: '💡', label: 'Banyak Hal Baru' },
    { emoji: '✨', label: 'Super Puas' }
  ];

  const handleSave = () => {
    soundEffects.success();
    onSaveReflection({
      learned,
      liked,
      practiceMore,
      emoji: selectedEmoji
    });
    setSavedSuccess(true);
    speechNarrator.speak('Refleksi belajarmu telah tersimpan! Refleksi yang luar biasa untuk calon seniman muda.');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
          onClick={() => { soundEffects.click(); onNext(); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-fun font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-400/20"
        >
          Lihat Sertifikat & Badge <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* RANGKUMAN MATERI INFOGRAFIS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-lime-500/20 text-lime-300 border border-lime-500/30 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Intisari Pembelajaran
          </span>
        </div>

        <h1 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Rangkuman 7 Teknik Dasar Menggambar
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Tabel komparasi cepat untuk mengingat kembali karakteristik penting setiap teknik:
        </p>

        {/* Responsive Summary Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800 text-slate-200 uppercase font-fun text-[11px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="p-3.5">Nama Teknik</th>
                <th className="p-3.5">Prinsip Kerja</th>
                <th className="p-3.5">Sifat Medium</th>
                <th className="p-3.5">Alat Utama</th>
                <th className="p-3.5">Karakteristik Visual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60">
              {TECHNIQUES_DATA.map((tech) => (
                <tr key={tech.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-fun font-bold text-white whitespace-nowrap">
                    {tech.name}
                  </td>
                  <td className="p-3.5 max-w-xs">{tech.tagline}</td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      tech.id === 'aquarel' || tech.id === 'plakat'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {tech.id === 'aquarel' || tech.id === 'plakat' ? 'Media Basah' : 'Media Kering'}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{tech.tools[0]}</td>
                  <td className="p-3.5 text-slate-300">{tech.characteristic[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JURNAL REFLEKSI MANDIRI 3-2-1 */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" /> Refleksi Diri 3-2-1
          </span>
        </div>

        <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Jurnal Refleksi Seniman Muda
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Luangkan waktu sejenak untuk merefleksikan pengalaman belajarmu hari ini:
        </p>

        {/* Emotion selector */}
        <div className="mb-6 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
          <span className="text-xs font-bold text-slate-300 block mb-3">
            Bagaimana perasaanmu setelah menjelajahi materi dan praktik ini?
          </span>
          <div className="flex flex-wrap gap-3">
            {emojiOptions.map((item) => (
              <button
                key={item.emoji}
                onClick={() => {
                  soundEffects.click();
                  setSelectedEmoji(item.emoji);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-fun font-bold flex items-center gap-2 transition cursor-pointer border ${
                  selectedEmoji === item.emoji
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3-2-1 Prompts */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
              3 Hal Baru yang Telah Saya Pelajari:
            </label>
            <textarea
              rows={2}
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Tuliskan di sini..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-sky-300 uppercase tracking-wider block mb-1.5">
              2 Hal yang Paling Saya Sukai / Menarik Perhatian:
            </label>
            <textarea
              rows={2}
              value={liked}
              onChange={(e) => setLiked(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Tuliskan di sini..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1.5">
              1 Hal yang Masih Ingin Saya Latih Lebih Mahir:
            </label>
            <textarea
              rows={2}
              value={practiceMore}
              onChange={(e) => setPracticeMore(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Tuliskan di sini..."
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            {savedSuccess ? '✓ Jurnal berhasil disimpan!' : 'Catatan ini akan dirangkum dalam portofolio belajarmu.'}
          </span>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-fun font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>Simpan Catatan Refleksi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
