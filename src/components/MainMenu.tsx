import React from 'react';
import { 
  Target, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Brush, 
  Gamepad2, 
  CheckCircle2, 
  Award, 
  Layers, 
  HelpCircle,
  Clock,
  ArrowRight,
  Volume2
} from 'lucide-react';
import { ScreenType, StudentProfile } from '../types';
import { MPI_META } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface MainMenuProps {
  onNavigate: (screen: ScreenType) => void;
  student: StudentProfile;
  onOpenDocModal: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onNavigate,
  student,
  onOpenDocModal
}) => {
  const menuItems = [
    {
      id: 'tujuan' as ScreenType,
      title: '1. Tujuan & Kontrak Belajar',
      desc: 'Capaian Pembelajaran (CP), TP, dan nilai Profil Pelajar Pancasila.',
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Orientasi',
      completed: true
    },
    {
      id: 'apersepsi' as ScreenType,
      title: '2. Apersepsi: Rahasia 3D',
      desc: 'Mengapa lingkaran 2D bisa berubah menjadi bola 3D bervolume?',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-600',
      badge: 'Penemuan',
      completed: true
    },
    {
      id: 'materi' as ScreenType,
      title: '3. Eksplorasi 7 Teknik',
      desc: 'Pelajari Arsir, Dussel, Pointilis, Aquarel, Plakat, Blok, dan Linear.',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-700',
      badge: 'Materi Utama',
      completed: student.completedTechniques.length >= 7
    },
    {
      id: 'eksplorasi' as ScreenType,
      title: '4. Peta Konsep & Sejarah',
      desc: 'Klasifikasi media basah vs kering serta linimasa sejarah menggambar.',
      icon: Compass,
      color: 'from-purple-500 to-violet-700',
      badge: 'Wawasan Rupa',
      completed: false
    },
    {
      id: 'simulasi' as ScreenType,
      title: '5. Virtual Lab Menggambar',
      desc: 'Praktik langsung simulasi 7 kuas di kanvas interaktif dengan template apel.',
      icon: Brush,
      color: 'from-pink-500 to-rose-700',
      badge: 'Laboratorium',
      completed: student.badges.includes('b2')
    },
    {
      id: 'latihan' as ScreenType,
      title: '6. Mini Games Latihan',
      desc: 'Tantangan seru: Drag & drop karya, detektif goresan, dan susun urutan.',
      icon: Gamepad2,
      color: 'from-cyan-500 to-blue-700',
      badge: 'Game Edukasi',
      completed: student.badges.includes('b3')
    },
    {
      id: 'asesmen' as ScreenType,
      title: '7. Asesmen Akhir Sumatif',
      desc: 'Uji pemahaman analitis untuk meraih kelulusan minimal 80 poin.',
      icon: CheckCircle2,
      color: 'from-red-500 to-rose-700',
      badge: 'Evaluasi',
      completed: student.isPassed
    },
    {
      id: 'refleksi' as ScreenType,
      title: '8. Refleksi & Rangkuman',
      desc: 'Tuliskan catatan 3-2-1 dan intisari teknik rupa yang kamu pelajari.',
      icon: Layers,
      color: 'from-lime-500 to-green-700',
      badge: 'Penguatan',
      completed: Boolean(student.reflection.learned)
    },
    {
      id: 'sertifikat' as ScreenType,
      title: '9. Sertifikat & Lencana',
      desc: 'Koleksi 4 lencana dan unduh e-Sertifikat resmi Seniman Muda.',
      icon: Award,
      color: 'from-amber-400 to-yellow-600',
      badge: student.isPassed ? 'Buka Terbuka' : 'Perlu Kuis >= 80',
      completed: student.isPassed
    },
    {
      id: 'referensi' as ScreenType,
      title: '10. Glosarium & Referensi',
      desc: 'Kamus istilah seni rupa dan buku panduan rujukan resmi.',
      icon: HelpCircle,
      color: 'from-slate-600 to-slate-800',
      badge: 'Referensi',
      completed: false
    }
  ];

  const handleCardClick = (id: ScreenType) => {
    soundEffects.click();
    onNavigate(id);
  };

  const speakIntro = () => {
    soundEffects.click();
    speechNarrator.speak(`Selamat datang di Pusat Petualangan Belajar, ${student.name}! Pilih salah satu kartu misi untuk mulai belajar atau berlatih teknik menggambar. Target skormu adalah minimal 80 untuk mendapatkan Sertifikat Emas Seniman Muda!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Banner Card */}
      <div className="bg-gradient-to-r from-indigo-900/90 via-slate-900/90 to-purple-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-fun font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Kelas VII · Seni Rupa
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 3 x 40 Menit (Blended)
              </span>
            </div>

            <h1 className="font-fun text-2xl sm:text-4xl font-extrabold text-white">
              Pusat Petualangan: <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300 bg-clip-text text-transparent">7 Teknik Menggambar</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Halo <strong className="text-amber-300">{student.name}</strong> dari <span className="text-slate-200">{student.school}</span>! Pilih misi di bawah ini untuk mengumpulkan XP, bereksperimen di Virtual Lab, dan meraih e-Sertifikat Seniman Muda!
            </p>
          </div>

          {/* Quick Stats & Audio Helper */}
          <div className="flex flex-row md:flex-col items-center sm:items-end gap-3 w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 border-slate-700/60 pt-4 md:pt-0">
            <button
              onClick={speakIntro}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-sky-300 hover:text-white px-3.5 py-2 rounded-xl border border-sky-500/30 text-xs font-semibold transition cursor-pointer"
              title="Dengarkan Panduan Audio"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Maestro</span>
            </button>

            <div className="bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-xl text-right">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Skor Asesmen</div>
              <div className="text-xl font-fun font-extrabold text-amber-400">
                {student.score} <span className="text-xs text-slate-400 font-normal">/ 100 (KKM: {MPI_META.targetScore})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
            <span>Progres Belajar Menyeluruh</span>
            <span className="text-amber-300 font-bold">
              {student.completedTechniques.length}/7 Teknik Dipelajari
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(15, (student.completedTechniques.length / 7) * 70 + (student.isPassed ? 30 : 0)))}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="group cursor-pointer bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-fun text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs font-semibold">
                <span className={item.completed ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-400'}>
                  {item.completed ? '✓ Selesai' : 'Mulai Sekarang'}
                </span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Buka <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Teacher & Pedagogical Documentation Quick Bar */}
      <div className="mt-10 bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-fun font-bold text-sm text-indigo-200">
              Dokumen Rancang Bangun Pembelajaran (23 Poin Lengkap)
            </h4>
            <p className="text-xs text-slate-400">
              Silabus, alur pedagogis, storyboard, rubrik, dan spesifikasi teknologi instruksional siap pakai.
            </p>
          </div>
        </div>

        <button
          onClick={() => { soundEffects.click(); onOpenDocModal(); }}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-fun font-bold text-xs transition shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          Buka Dokumen 23 Poin
        </button>
      </div>
    </div>
  );
};
