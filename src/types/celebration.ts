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
  completionMessage: string;
}

export type CelebrationConfigMap = Record<string, CelebrationConfig>;

