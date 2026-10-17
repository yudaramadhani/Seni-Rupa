import React, { useState } from 'react';
import { ScreenType, StudentProfile } from './types';
import { Header } from './components/Header';
import { HeroStart } from './components/HeroStart';
import { MainMenu } from './components/MainMenu';
import { LearningObjectives } from './components/LearningObjectives';
import { Aperception } from './components/Aperception';
import { MaterialViewer } from './components/MaterialViewer';
import { InteractiveExploration } from './components/InteractiveExploration';
import { VirtualLabDrawing } from './components/VirtualLabDrawing';
import { PracticeGames } from './components/PracticeGames';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { ReflectionSummary } from './components/ReflectionSummary';
import { CertificateBadge } from './components/CertificateBadge';
import { ReferencesGlossary } from './components/ReferencesGlossary';
import { PedagogicalDocModal } from './components/PedagogicalDocModal';
import { soundEffects } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);
  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);
  const [xp, setXp] = useState<number>(50);

  const [student, setStudent] = useState<StudentProfile>({
    name: 'Bintang Rupa',
    school: 'SMP Negeri 1 Merdeka',
    grade: 'Kelas VII',
    score: 0,
    completedTechniques: ['arsir'],
    badges: [],
    quizAnswers: {},
    isPassed: false,
    reflection: {
      learned: '',
      liked: '',
      practiceMore: '',
      emoji: '🎨'
    }
  });

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAwardXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (!student.badges.includes(badgeId)) {
      setStudent(prev => ({
        ...prev,
        badges: [...prev.badges, badgeId]
      }));
      handleAwardXp(25);
    }
  };

  const handleCompleteTechnique = (techId: string) => {
    if (!student.completedTechniques.includes(techId)) {
      const nextList = [...student.completedTechniques, techId];
      setStudent(prev => ({
        ...prev,
        completedTechniques: nextList
      }));
      handleAwardXp(20);

      if (nextList.length >= 7) {
        handleUnlockBadge('b1'); // Unlocked all 7 techniques
      }
    }
  };

  const handleFinishQuiz = (score: number, passed: boolean) => {
    setStudent(prev => ({
      ...prev,
      score,
      isPassed: passed
    }));

    if (passed) {
      handleUnlockBadge('b4');
      handleAwardXp(50);
    }
  };

  const handleSaveReflection = (reflectionData: {
    learned: string;
    liked: string;
    practiceMore: string;
    emoji: string;
  }) => {
    setStudent(prev => ({
      ...prev,
      reflection: reflectionData
    }));
    handleAwardXp(20);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isLargeFont ? 'text-lg' : 'text-base'}`}>
      {/* Universal Header (hidden on start splash screen) */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        studentName={student.name}
        xp={xp}
        onOpenDocModal={() => setDocModalOpen(true)}
        isLargeFont={isLargeFont}
        onToggleFontSize={() => setIsLargeFont(!isLargeFont)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full pb-12">
        {currentScreen === 'start' && (
          <HeroStart
            studentName={student.name}
            setStudentName={(name) => setStudent(prev => ({ ...prev, name }))}
            schoolName={student.school}
            setSchoolName={(school) => setStudent(prev => ({ ...prev, school }))}
            onStart={() => handleNavigate('menu')}
          />
        )}

        {currentScreen === 'menu' && (
          <MainMenu
            onNavigate={handleNavigate}
            student={student}
            onOpenDocModal={() => setDocModalOpen(true)}
          />
        )}

        {currentScreen === 'tujuan' && (
          <LearningObjectives
            onBack={() => handleNavigate('menu')}
            onNext={() => handleNavigate('apersepsi')}
          />
        )}

        {currentScreen === 'apersepsi' && (
          <Aperception
            onBack={() => handleNavigate('menu')}
            onNext={() => handleNavigate('materi')}
          />
        )}

        {currentScreen === 'materi' && (
          <MaterialViewer
            onBack={() => handleNavigate('menu')}
            onGoToLab={() => handleNavigate('simulasi')}
            completedTechniques={student.completedTechniques}
            onCompleteTechnique={handleCompleteTechnique}
          />
        )}

        {currentScreen === 'eksplorasi' && (
          <InteractiveExploration
            onBack={() => handleNavigate('menu')}
            onNext={() => handleNavigate('simulasi')}
          />
        )}

        {currentScreen === 'simulasi' && (
          <VirtualLabDrawing
            onBack={() => handleNavigate('menu')}
            onUnlockBadge={handleUnlockBadge}
            studentName={student.name}
          />
        )}

        {currentScreen === 'latihan' && (
          <PracticeGames
            onBack={() => handleNavigate('menu')}
            onNext={() => handleNavigate('asesmen')}
            onAwardXp={handleAwardXp}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {currentScreen === 'asesmen' && (
          <AssessmentQuiz
            onBack={() => handleNavigate('menu')}
            onFinishQuiz={handleFinishQuiz}
            onGoToCertificate={() => handleNavigate('sertifikat')}
            studentName={student.name}
          />
        )}

        {currentScreen === 'refleksi' && (
          <ReflectionSummary
            onBack={() => handleNavigate('menu')}
            onNext={() => handleNavigate('sertifikat')}
            reflection={student.reflection}
            onSaveReflection={handleSaveReflection}
          />
        )}

        {currentScreen === 'sertifikat' && (
          <CertificateBadge
            onBack={() => handleNavigate('menu')}
            onGoToQuiz={() => handleNavigate('asesmen')}
            student={student}
          />
        )}

        {currentScreen === 'referensi' && (
          <ReferencesGlossary
            onBack={() => handleNavigate('menu')}
            onOpenDocModal={() => setDocModalOpen(true)}
          />
        )}
      </main>

      {/* 23-Point Pedagogical Design Blueprint Document Modal */}
      <PedagogicalDocModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
      />
    </div>
  );
}
