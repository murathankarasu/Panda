export interface Level {
  id: string;
  title: string;
  description: string;
  order: number;
  category: string;
  unlocked: boolean;
  completed: boolean;
  stars: number; // 0-3
}

export interface LevelMedia {
  src: string;
  alt: string;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'image-choice' | 'fill-blank' | 'video-watch' | 'speak';
  question: string;
  options?: string[];
  imageOptions?: Array<{
    label: string;
    image?: string;
    alt?: string;
    emoji?: string;
  }>;
  correctAnswer?: string | number;
  videoUrl?: string;
  explanation?: string;
  reward?: string;
}

export interface LevelContent {
  levelId: string;
  story: string;
  questions: Question[];
  videoUrl?: string;
  heroMedia?: LevelMedia;
}

export interface UserProgress {
  levelId: string;
  completed: boolean;
  stars: number;
  lastAttempt: Date;
}
