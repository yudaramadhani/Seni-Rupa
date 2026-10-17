import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  AlertCircle, 
  Trophy, 
  Sparkles,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SUMMATIVE_QUIZ, MPI_META } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface AssessmentQuizProps {
  onBack: () => void;
  onFinishQuiz: (score: number, passed: boolean) => void;
  onGoToCertificate: () => void;
  studentName: string;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  onBack,
  onFinishQuiz,
  onGoToCertificate,
  studentName
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  const currentQ = SUMMATIVE_QUIZ[currentIdx];
  const isAllAnswered = SUMMATIVE_QUIZ.every(q => answers[q.id]);

  const handleSelectOption = (questionId: number, optionId: string) => {
    if (isSubmitted) return;
    soundEffects.click();
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    soundEffects.fanfare();
    let correctCount = 0;
    SUMMATIVE_QUIZ.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / SUMMATIVE_QUIZ.length) * 100);
    const passed = score >= MPI_META.targetScore;
    setFinalScore(score);
    setIsSubmitted(true);
    onFinishQuiz(score, passed);

    if (passed) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      speechNarrator.speak(
        `Selamat ${studentName}! Kamu berhasil meraih nilai ${score} dan dinyatakan tuntas melampaui KKM 80! Kamu berhak mengunduh Sertifikat Emas Seniman Muda!`
      );
    } else {
      speechNarrator.speak(
        `Nilaimu adalah ${score}. Jangan berkecil hati, kamu bisa membaca kembali materi dan mencoba kuis lagi untuk mencapai nilai minimal 80!`
      );
    }
  };

  const handleRetake = () => {
    soundEffects.click();
    setAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setFinalScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            KKM Kelulusan: {MPI_META.targetScore} Poin
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Header Title */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Asesmen Sumatif Terpadu
              </span>
            </div>
            <h1 className="font-fun text-2xl sm:text-3xl font-extrabold text-white">
              Evaluasi Akhir Teknik Menggambar
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Jawablah 5 soal analitis berikut dengan teliti. Umpan balik & nilai akan ditampilkan setelah seluruh soal selesai!
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl font-fun font-bold">
            {isSubmitted ? `${finalScore}` : `${currentIdx + 1}/${SUMMATIVE_QUIZ.length}`}
          </div>
        </div>

        {/* IF SUBMITTED: SHOW COMPREHENSIVE SCORE & FEEDBACK */}
        {isSubmitted ? (
          <div className="space-y-6">
            {/* Score Result Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border text-center ${
              finalScore >= MPI_META.targetScore
                ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-500/40 shadow-2xl shadow-emerald-500/10'
                : 'bg-gradient-to-b from-amber-950/80 to-slate-900 border-amber-500/40 shadow-2xl shadow-amber-500/10'
            }`}>
              <div className="inline-flex p-3 rounded-full bg-slate-800 border border-slate-700 mb-3">
                {finalScore >= MPI_META.targetScore ? (
                  <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
                ) : (
                  <AlertCircle className="w-10 h-10 text-amber-400" />
                )}
              </div>

              <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {finalScore >= MPI_META.targetScore
                  ? '🎉 Selamat! Kamu Dinyatakan LULUS Kompetensi!'
                  : 'Tetap Semangat! Belajar Lagi dan Coba Ulang!'}
              </h2>

              <div className="text-4xl sm:text-5xl font-fun font-extrabold text-amber-400 my-3">
                {finalScore} <span className="text-lg text-slate-400 font-normal">/ 100 Poin</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {finalScore >= MPI_META.targetScore
                  ? `Kerja luar biasa, ${studentName}! Nilaimu telah melampaui kriteria ketuntasan minimal (${MPI_META.targetScore}). Pemahamanmu mengenai karakteristik 7 teknik menggambar dan prinsip gelap-terang sangat matang!`
                  : `Skormu saat ini ${finalScore} poin (KKM: ${MPI_META.targetScore}). Periksa pembahasan jawaban di bawah untuk memahami konsep yang keliru, lalu klik tombol Coba Ulang Kuis.`}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition cursor-pointer border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4" /> Coba Kuis Lagi
                </button>

                {finalScore >= MPI_META.targetScore && (
                  <button
                    onClick={() => { soundEffects.fanfare(); onGoToCertificate(); }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-fun font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 transition cursor-pointer"
                  >
                    <Award className="w-4 h-4" /> Buka & Unduh e-Sertifikat ➔
                  </button>
                )}
              </div>
            </div>

            {/* DETAILED PEDAGOGICAL FEEDBACK FOR EACH QUESTION */}
            <div className="space-y-4 pt-4">
              <h3 className="font-fun text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Analisis Umpan Balik Lengkap Setiap Soal:
              </h3>

              {SUMMATIVE_QUIZ.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isCorrect
                        ? 'bg-slate-800/80 border-emerald-500/40'
                        : 'bg-slate-800/80 border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-fun font-bold text-slate-300">
                        Soal #{idx + 1}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isCorrect ? '✓ Jawaban Tepat (+20)' : '✗ Belum Tepat (0)'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed mb-3">
                      {q.question}
                    </p>

                    <div className="text-xs space-y-1 bg-slate-900/70 p-3 rounded-xl border border-slate-700/60 mb-2">
                      <div className="text-slate-300">
                        <strong>Jawaban Kamu:</strong> {userAns ? `Opsi ${userAns}` : 'Tidak dijawab'}
                      </div>
                      <div className="text-emerald-300">
                        <strong>Kunci Jawaban Benar:</strong> Opsi {q.correctAnswer}
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl">
                      <strong className="text-amber-300">💡 Pembahasan Ilmiah:</strong> {q.explanation}
                    </div>

                    <div className="mt-2 text-[11px] text-sky-300">
                      🎯 <em>Tujuan Evaluasi: {q.pedagogicalReason}</em>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* QUESTION IN PROGRESS */
          <div>
            {/* Question Progress Dots */}
            <div className="flex items-center gap-2 mb-6">
              {SUMMATIVE_QUIZ.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => { soundEffects.click(); setCurrentIdx(idx); }}
                  className={`flex-1 h-2 rounded-full transition-all cursor-pointer ${
                    currentIdx === idx
                      ? 'bg-amber-400 ring-2 ring-amber-400/40'
                      : answers[q.id]
                      ? 'bg-emerald-400'
                      : 'bg-slate-800'
                  }`}
                  title={`Pindah ke Soal ${idx + 1}`}
                />
              ))}
            </div>

            {/* Current Question Body */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 sm:p-6 mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Soal Kasus #{currentIdx + 1}
              </span>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options?.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-xl font-fun font-extrabold text-xs flex items-center justify-center shrink-0 border transition ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-700 text-slate-300 border-slate-600'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  soundEffects.click();
                  setCurrentIdx(prev => Math.max(0, prev - 1));
                }}
                disabled={currentIdx === 0}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Sebelumnya
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < SUMMATIVE_QUIZ.length - 1 ? (
                  <button
                    onClick={() => {
                      soundEffects.click();
                      setCurrentIdx(prev => Math.min(SUMMATIVE_QUIZ.length - 1, prev + 1));
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
                  >
                    Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isAllAnswered}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 disabled:opacity-40 text-slate-950 font-fun font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-500/20 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Kumpulkan Jawaban
                  </button>
                )}
              </div>
            </div>

            {!isAllAnswered && (
              <div className="mt-3 text-center text-[11px] text-slate-500">
                * Harap jawab seluruh 5 pertanyaan untuk dapat mengumpulkan asesmen.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
