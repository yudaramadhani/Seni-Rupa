export type ScreenType = 
  | 'start'
  | 'menu'
  | 'tujuan'
  | 'apersepsi'
  | 'materi'
  | 'eksplorasi'
  | 'simulasi'
  | 'latihan'
  | 'asesmen'
  | 'refleksi'
  | 'rangkuman'
  | 'sertifikat'
  | 'referensi'
  | 'dokumen';

export interface Technique {
  id: string;
  name: string;
  alias: string;
  icon: string;
  color: string;
  tagline: string;
  description: string;
  characteristic: string[];
  tools: string[];
  steps: string[];
  bestUsedFor: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  visualType: 'hatching' | 'smudge' | 'stippling' | 'wash' | 'opaque' | 'silhouette' | 'line';
  tipMaestro: string;
  sampleWorks: {
    title: string;
    caption: string;
  };
}

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'drag-drop-match';
  question: string;
  contextImage?: string;
  options?: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  pedagogicalReason: string;
  // For drag-drop matching
  pairs?: {
    item: string;
    target: string;
  }[];
}

export interface StudentProfile {
  name: string;
  school: string;
  grade: string;
  score: number;
  completedTechniques: string[];
  badges: string[];
  quizAnswers: Record<number, string>;
  isPassed: boolean;
  reflection: {
    learned: string;
    liked: string;
    practiceMore: string;
    emoji: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  criteria: string;
  unlocked: boolean;
}
