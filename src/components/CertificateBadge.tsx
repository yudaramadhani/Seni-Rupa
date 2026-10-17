import React from 'react';
import { 
  Award, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Compass,
  Brush,
  Gamepad2
} from 'lucide-react';
import { StudentProfile, Badge } from '../types';
import { BADGES_LIST, MPI_META } from '../data/mpiContent';
import { soundEffects } from '../utils/audio';

interface CertificateBadgeProps {
  onBack: () => void;
  onGoToQuiz: () => void;
  student: StudentProfile;
}

export const CertificateBadge: React.FC<CertificateBadgeProps> = ({
  onBack,
  onGoToQuiz,
  student
}) => {
  const isPassed = student.isPassed && student.score >= MPI_META.targetScore;

  // Format today's date in Indonesian
  const todayFormatted = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const handlePrint = () => {
    soundEffects.fanfare();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Top Nav (hidden on print) */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        {isPassed && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/30 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak / Unduh e-Sertifikat
          </button>
        )}
      </div>

      {/* SECTION 1: 4 BADGES OF MASTERY (hidden on print) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl print:hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Lencana Keahlian (Badges)
          </span>
        </div>

        <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Koleksi Lencana Seniman Muda
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Selesaikan aktivitas untuk membuka ke-4 lencana prestasi berikut:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES_LIST.map((badge) => {
            let isUnlocked = false;
            if (badge.id === 'b1') isUnlocked = student.completedTechniques.length >= 7;
            if (badge.id === 'b2') isUnlocked = student.badges.includes('b2');
            if (badge.id === 'b3') isUnlocked = student.badges.includes('b3');
            if (badge.id === 'b4') isUnlocked = student.isPassed && student.score >= 80;

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-400/50 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white shadow-xl ${
                    isUnlocked ? `bg-gradient-to-br ${badge.color}` : 'bg-slate-800 border border-slate-700'
                  }`}>
                    {isUnlocked ? (
                      <Award className="w-8 h-8" />
                    ) : (
                      <Lock className="w-6 h-6 text-slate-500" />
                    )}
                  </div>

                  <h3 className="font-fun font-bold text-sm text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                    {badge.description}
                  </p>
                </div>

                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isUnlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                }`}>
                  {isUnlocked ? '✓ Terbuka' : badge.criteria}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: OFFICIAL CERTIFICATE */}
      {isPassed ? (
        <div className="relative bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border-8 border-double border-amber-600 print:border-amber-700 print:shadow-none print:m-0 print:p-8 max-w-4xl mx-auto overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="text-[280px] font-fun font-black">ART</span>
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 text-amber-600 text-xl">⚜️</div>
          <div className="absolute top-3 right-3 text-amber-600 text-xl">⚜️</div>
          <div className="absolute bottom-3 left-3 text-amber-600 text-xl">⚜️</div>
          <div className="absolute bottom-3 right-3 text-amber-600 text-xl">⚜️</div>

          <div className="text-center relative z-10 space-y-4">
            {/* Header */}
            <div>
              <div className="inline-block bg-amber-100 border border-amber-300 text-amber-800 font-fun font-bold text-xs uppercase px-4 py-1 rounded-full mb-2 tracking-widest">
                KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
              </div>
              <h2 className="font-fun text-2xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                SERTIFIKAT KELULUSAN PRESTASI
              </h2>
              <p className="font-script text-lg sm:text-xl text-amber-700 font-bold -mt-1">
                Seniman Muda Berprestasi — Kurikulum Merdeka Fase D
              </p>
            </div>

            <div className="text-xs text-slate-600 font-medium">
              Sertifikat Nomor Registrasi: ART-SMP7/{Math.floor(100000 + Math.random() * 900000)}/2026
            </div>

            <div className="py-2">
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                Diberikan dengan penuh kehormatan kepada:
              </p>
              <h3 className="font-fun text-3xl sm:text-5xl font-extrabold text-indigo-950 mt-1 mb-2 tracking-wide underline decoration-amber-400 decoration-wavy underline-offset-8">
                {student.name || 'Sahabat Seni'}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                {student.school || 'SMP Belajar Merdeka'}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Telah berhasil menyelesaikan seluruh rangkaian materi, eksplorasi kanvas virtual, dan lulus Asesmen Sumatif pada mata pelajaran <strong>Seni Rupa (Kelas VII Semester 1)</strong> materi <strong>"Teknik Menggambar (Arsir, Dussel, Pointilis, Aquarel, Plakat, Blok, Linear)"</strong> dengan capaian nilai:
            </p>

            {/* Score & Predicate Stamp */}
            <div className="inline-flex items-center gap-6 bg-amber-50 border-2 border-amber-400 rounded-2xl px-6 py-3 my-2 shadow-inner">
              <div className="text-left">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Nilai Asesmen</span>
                <span className="text-2xl sm:text-3xl font-fun font-black text-amber-600">
                  {student.score} <span className="text-xs font-normal text-slate-500">/ 100</span>
                </span>
              </div>
              <div className="h-8 w-px bg-amber-300"></div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Predikat Kelulusan</span>
                <span className="text-sm sm:text-base font-fun font-extrabold text-emerald-700">
                  {student.score >= 90 ? 'SANGAT MAHIR (CUMLAUDE)' : 'MAHIR & KOMPETEN'}
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 grid grid-cols-2 gap-8 items-end max-w-lg mx-auto text-center border-t border-slate-200 mt-4">
              <div>
                <p className="text-[11px] text-slate-500 mb-1 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Tanggal Terbit:
                </p>
                <p className="text-xs font-semibold text-slate-800">{todayFormatted}</p>
                <div className="mt-4 font-script text-xl text-indigo-900 font-bold">
                  Seno Pramudya, M.Pd.
                </div>
                <div className="border-t border-slate-400 pt-1 text-[11px] font-bold text-slate-700">
                  Maestro Seno (Pendidik Seni)
                </div>
              </div>

              <div className="flex flex-col items-center">
                {/* Official Gold Embossed Stamp */}
                <div className="w-20 h-20 rounded-full border-4 border-amber-500 bg-amber-100 flex flex-col items-center justify-center text-amber-800 p-1 shadow-md">
                  <Award className="w-6 h-6 text-amber-600" />
                  <span className="text-[8px] font-black uppercase text-center tracking-tighter mt-0.5">
                    TERVERIFIKASI
                  </span>
                  <span className="text-[7px] text-slate-600">FASE D SMP</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-2">
                  Segel Digital Resmi MPI
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* LOCKED CERTIFICATE PROMPT */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4 border border-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="font-fun text-2xl font-extrabold text-white mb-2">
            e-Sertifikat Masih Terkunci!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Untuk menerbitkan e-Sertifikat resmi berpredikat Seniman Muda dengan namamu, kamu harus menyelesaikan <strong>Kuis Asesmen Sumatif</strong> dengan nilai minimal <strong>{MPI_META.targetScore} Poin</strong>.
          </p>

          <button
            onClick={() => { soundEffects.click(); onGoToQuiz(); }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/30 cursor-pointer"
          >
            Kerjakan Kuis Asesmen Sekarang ➔
          </button>
        </div>
      )}
    </div>
  );
};
