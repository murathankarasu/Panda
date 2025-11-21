export interface MatchItem {
  id: string;
  label: string;
  badge: string;
}

export interface MatchTarget {
  id: string;
  prompt: string;
  answer: string;
}

export interface TimelineItem {
  id: string;
  label: string;
}

export interface QuizConfig {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface MemoryPair {
  id: string;
  icon: string;
  label: string;
}

export interface ColorPaletteItem {
  id: string;
  label: string;
  color: string;
}

export interface ColorConfig {
  palette: ColorPaletteItem[];
  target: string[][];
  hint: string;
}

export interface PuzzlePiece {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface RhythmAction {
  id: string;
  label: string;
  icon: string;
}

export interface WordGameConfig {
  prompt: string;
  answer: string;
  letterPool: string[];
}

// Yeni Oyun Tipleri
export interface SortingItem {
  id: string;
  label: string;
  icon: string;
  category: 'left' | 'right';
}

export interface SortingCategory {
  id: 'left' | 'right';
  label: string;
  icon: string;
  color: string;
}

export interface SortingGameConfig {
  items: SortingItem[];
  categories: [SortingCategory, SortingCategory];
}

export interface SilhouettePair {
  id: string;
  icon: string;
  label: string;
  color: string;
}

export interface OddOneOutItem {
  id: string;
  icon: string;
  isOdd: boolean;
}

export interface OddOneOutConfig {
  items: OddOneOutItem[];
}

export interface CelebrationConfig {
  intro: string;
  videoId: string;
  prepHints: string[];
  stepTitles?: string[];
  wordGame: WordGameConfig;
  matchItems: MatchItem[];
  matchTargets: MatchTarget[];
  memoryPairs: MemoryPair[];
  colorGrid: ColorConfig;
  puzzlePieces: PuzzlePiece[];
  puzzleHint: string;
  rhythmActions: RhythmAction[];
  rhythmSequence: string[];
  timeline: TimelineItem[];
  quiz: QuizConfig;
  // Opsiyonel olarak ekliyoruz, mevcut veri bozulmasın diye
  sortingGame?: SortingGameConfig; 
  silhouetteGame?: SilhouettePair[];
  oddOneOutGame?: OddOneOutConfig;
  completionMessage: string;
}

export type CelebrationConfigMap = Record<string, CelebrationConfig>;
