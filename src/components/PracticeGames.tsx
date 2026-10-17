import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Trophy, 
  Volume2, 
  RotateCcw,
  MoveDown,
  MoveUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MINI_GAMES_DATA } from '../data/mpiContent';
import { soundEffects, speechNarrator } from '../utils/audio';

interface PracticeGamesProps {
  onBack: () => void;
  onNext: () => void;
  onAwardXp: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const PracticeGames: React.FC<PracticeGamesProps> = ({
  onBack,
  onNext,
  onAwardXp,
  onUnlockBadge
}) => {
  const [activeTab, setActiveTab] = useState<'drag' | 'detective' | 'sorting'>('drag');

  // Misi 1 Drag Drop state
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // targetId -> cardId
  const [dragFeedback, setDragFeedback] = useState<string | null>(null);

  // Misi 2 Detective Case state
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const [caseAnswers, setCaseAnswers] = useState<Record<number, number>>({});
  const [caseFeedback, setCaseFeedback] = useState<string | null>(null);

  // Misi 3 Step Sorting state
  const [stepOrder, setStepOrder] = useState<string[]>(['s3', 's1', 's4', 's2']); // scrambled initially
  const [sortSolved, setSortSolved] = useState<boolean>(false);

  // Handle Drag Card Select
  const handleSelectCard = (cardId: string) => {
    soundEffects.click();
    setSelectedCard(cardId);
  };

  const handleAssignToTarget = (targetId: string) => {
    if (!selectedCard) return;
    soundEffects.click();
    setMatches(prev => ({ ...prev, [targetId]: selectedCard }));
    setSelectedCard(null);
  };

  const checkDragAnswers = () => {
    const { cards, targets } = MINI_GAMES_DATA.dragDropGame;
    let correctCount = 0;
    targets.forEach(t => {
      const card = cards.find(c => c.targetId === t.id);
      if (card && matches[t.id] === card.id) {
        correctCount++;
      }
    });

    if (correctCount === targets.length) {
      soundEffects.fanfare();
      confetti({ particleCount: 70, spread: 60 });
      setDragFeedback('🎉 Sempurna! Semua 5 karya seni berhasil dipasangkan dengan teknik yang tepat! (+30 XP)');
      onAwardXp(30);
    } else {
      soundEffects.wrong();
      setDragFeedback(`Kamu berhasil memasangkan ${correctCount} dari 5 karya seni. Periksa petunjuk dan coba pasangkan kembali ya!`);
    }
  };

  const resetDragGame = () => {
    soundEffects.click();
    setMatches({});
    setSelectedCard(null);
    setDragFeedback(null);
  };

  // Detective Game Answer
  const handleSelectCaseOption = (optIdx: number) => {
    soundEffects.click();
    const currentCase = MINI_GAMES_DATA.detectiveGame.cases[currentCaseIdx];
    const isCorrect = currentCase.options[optIdx].correct;
    setCaseAnswers(prev => ({ ...prev, [currentCase.id]: optIdx }));
    setCaseFeedback(currentCase.options[optIdx].reason);

    if (isCorrect) {
      soundEffects.success();
      onAwardXp(15);
    } else {
      soundEffects.wrong();
    }
  };

  // Sorting Game Move
  const moveStep = (index: number, direction: 'up' | 'down') => {
    soundEffects.click();
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= stepOrder.length) return;

    const newOrder = [...stepOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setStepOrder(newOrder);
  };

  const checkStepOrder = () => {
    const isCorrect = stepOrder[0] === 's1' && stepOrder[1] === 's2' && stepOrder[2] === 's3' && stepOrder[3] === 's4';
    if (isCorrect) {
      soundEffects.fanfare();
      confetti({ particleCount: 80, spread: 70 });
      setSortSolved(true);
      onAwardXp(30);
      onUnlockBadge('b3');
    } else {
      soundEffects.wrong();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { soundEffects.click(); onBack(); }}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Menu Utama
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.click();
              speechNarrator.speak('Selamat datang di Mini Games Tantangan Rupa! Selesaikan Misi Pasang Kartu, Detektif Goresan, dan Urutan Menggambar untuk meraih lencana Master Detektif Rupa!');
            }}
            className="flex items-center gap-2 text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/60 px-4 py-2 rounded-xl border border-sky-500/40 text-xs font-semibold transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4" /> Panduan Suara
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5" /> Game-Based Learning Rupa
          </span>
        </div>

        <h1 className="font-fun text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Arena Latihan & Mini Games Tantangan
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Kumpulkan XP, selesaikan 3 misi rupa, dan uji ketajaman analisismu sebelum kuis sumatif!
        </p>

        {/* Game Mode Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <button
            onClick={() => { soundEffects.click(); setActiveTab('drag'); }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-fun font-bold transition cursor-pointer whitespace-nowrap border ${
              activeTab === 'drag'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Misi 1: Pasangkan Kartu Karya
          </button>
          <button
            onClick={() => { soundEffects.click(); setActiveTab('detective'); }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-fun font-bold transition cursor-pointer whitespace-nowrap border ${
              activeTab === 'detective'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Misi 2: Detektif Goresan Rupa
          </button>
          <button
            onClick={() => { soundEffects.click(); setActiveTab('sorting'); }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-fun font-bold transition cursor-pointer whitespace-nowrap border ${
              activeTab === 'sorting'
                ? 'bg-purple-500 text-slate-950 border-purple-400 shadow-lg'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Misi 3: Susun Urutan Menggambar
          </button>
        </div>

        {/* TAB 1: DRAG & DROP GAME */}
        {activeTab === 'drag' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
              <h3 className="font-fun font-bold text-base text-cyan-300 mb-1">
                {MINI_GAMES_DATA.dragDropGame.title}
              </h3>
              <p className="text-xs text-slate-300">
                {MINI_GAMES_DATA.dragDropGame.instruction} Klik kartu nama teknik, lalu klik kotak karya seni yang cocok!
              </p>
            </div>

            {/* Cards Available */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Kartu Teknik Tersedia:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {MINI_GAMES_DATA.dragDropGame.cards.map((card) => {
                  const isAssigned = Object.values(matches).includes(card.id);
                  const isSelected = selectedCard === card.id;

                  return (
                    <button
                      key={card.id}
                      onClick={() => handleSelectCard(card.id)}
                      disabled={isAssigned}
                      className={`px-4 py-2.5 rounded-xl font-fun font-bold text-xs transition cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300 scale-105 shadow-md shadow-amber-500/20'
                          : isAssigned
                          ? 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed line-through'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                    >
                      {card.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Artwork Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MINI_GAMES_DATA.dragDropGame.targets.map((target) => {
                const assignedCardId = matches[target.id];
                const assignedCard = MINI_GAMES_DATA.dragDropGame.cards.find(c => c.id === assignedCardId);

                return (
                  <div
                    key={target.id}
                    onClick={() => handleAssignToTarget(target.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      assignedCard
                        ? 'bg-slate-800/90 border-cyan-500/40'
                        : selectedCard
                        ? 'bg-cyan-950/30 border-dashed border-cyan-400 animate-pulse'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-fun font-bold text-sm text-white">
                        {target.title}
                      </h4>
                      {assignedCard ? (
                        <span className="text-[11px] font-fun font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {assignedCard.name}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                          Kotak Kosong
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      💡 Petunjuk: {target.hint}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Feedback message */}
            {dragFeedback && (
              <div className="p-4 rounded-2xl bg-slate-800 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200">
                {dragFeedback}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={resetDragGame}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ulangi Pasangan
              </button>

              <button
                onClick={checkDragAnswers}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Periksa Pasangan Jawaban
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DETECTIVE SCENARIO GAME */}
        {activeTab === 'detective' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Studi Kasus #{currentCaseIdx + 1} dari {MINI_GAMES_DATA.detectiveGame.cases.length}
              </span>
              <div className="flex gap-1.5">
                {MINI_GAMES_DATA.detectiveGame.cases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundEffects.click();
                      setCurrentCaseIdx(idx);
                      setCaseFeedback(null);
                    }}
                    className={`w-7 h-7 rounded-lg font-fun font-bold text-xs cursor-pointer ${
                      currentCaseIdx === idx ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Statement */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
              <h3 className="font-fun font-bold text-sm text-amber-400 mb-2">
                Situasi Seniman:
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                "{MINI_GAMES_DATA.detectiveGame.cases[currentCaseIdx].situation}"
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Solusi Teknik Terbaik:
              </span>
              {MINI_GAMES_DATA.detectiveGame.cases[currentCaseIdx].options.map((opt, oIdx) => {
                const currentCaseId = MINI_GAMES_DATA.detectiveGame.cases[currentCaseIdx].id;
                const isSelected = caseAnswers[currentCaseId] === oIdx;

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectCaseOption(oIdx)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? opt.correct
                          ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-lg'
                          : 'bg-rose-950/40 border-rose-400 text-white'
                        : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-amber-300 font-fun font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">
                        {opt.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Case Feedback */}
            {caseFeedback && (
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-amber-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
                💡 <strong className="text-amber-300">Analisis Maestro:</strong> {caseFeedback}
              </div>
            )}

            {/* Next case button */}
            <div className="flex justify-end pt-4 border-t border-slate-800">
              {currentCaseIdx < MINI_GAMES_DATA.detectiveGame.cases.length - 1 ? (
                <button
                  onClick={() => {
                    soundEffects.click();
                    setCurrentCaseIdx(prev => prev + 1);
                    setCaseFeedback(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-fun font-bold text-xs transition cursor-pointer"
                >
                  Kasus Selanjutnya ➔
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundEffects.click();
                    setActiveTab('sorting');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-fun font-bold text-xs transition cursor-pointer"
                >
                  Lanjut ke Misi 3 (Susun Urutan) ➔
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STEP SORTING GAME */}
        {activeTab === 'sorting' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
              <h3 className="font-fun font-bold text-base text-purple-300 mb-1">
                {MINI_GAMES_DATA.stageSortingGame.title}
              </h3>
              <p className="text-xs text-slate-300">
                {MINI_GAMES_DATA.stageSortingGame.instruction} Gunakan tombol panah Naik atau Turun untuk memindahkan posisi langkah hingga terurut 1 sampai 4!
              </p>
            </div>

            {/* Steps list with reorder buttons */}
            <div className="space-y-3">
              {stepOrder.map((stepId, index) => {
                const step = MINI_GAMES_DATA.stageSortingGame.steps.find(s => s.id === stepId);
                if (!step) return null;

                return (
                  <div
                    key={stepId}
                    className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 font-fun font-bold text-sm flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {step.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => moveStep(index, 'up')}
                        disabled={index === 0}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300 transition cursor-pointer"
                        title="Geser ke Atas"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveStep(index, 'down')}
                        disabled={index === stepOrder.length - 1}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300 transition cursor-pointer"
                        title="Geser ke Bawah"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {sortSolved && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400/40 text-xs sm:text-sm text-emerald-200 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <strong>Hebat Sekali!</strong> 4 tahapan berkarya menggambar telah tersusun dengan benar! Kamu telah membuka Lencana "Master Detektif Rupa" (+30 XP).
                </div>
              </div>
            )}

            {/* Check Order Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  soundEffects.click();
                  setStepOrder(['s4', 's2', 's1', 's3']);
                  setSortSolved(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Acak Ulang
              </button>

              <button
                onClick={checkStepOrder}
                className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                Periksa Susunan Langkah
              </button>
            </div>
          </div>
        )}

        {/* Global Next Step to Summative Quiz */}
        <div className="flex justify-end pt-8 mt-6 border-t border-slate-800">
          <button
            onClick={() => { soundEffects.click(); onNext(); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-fun font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/30 cursor-pointer"
          >
            Lanjut ke Kuis Asesmen Akhir Sumatif <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
