import { UserProgress, Level } from '../types';

const STORAGE_KEY = 'sila_egitim_progress';

export function saveProgress(progress: UserProgress[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Progress kaydedilemedi:', error);
  }
}

export function loadProgress(): UserProgress[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Progress yüklenemedi:', error);
  }
  return [];
}

export function updateLevelProgress(levelId: string, stars: number, completed: boolean) {
  const progress = loadProgress();
  const existingIndex = progress.findIndex(p => p.levelId === levelId);
  
  const newProgress: UserProgress = {
    levelId,
    completed,
    stars,
    lastAttempt: new Date(),
  };

  if (existingIndex >= 0) {
    progress[existingIndex] = newProgress;
  } else {
    progress.push(newProgress);
  }

  saveProgress(progress);
  return progress;
}

export function getLevelProgress(levelId: string): UserProgress | null {
  const progress = loadProgress();
  return progress.find(p => p.levelId === levelId) || null;
}

export function unlockNextLevel(levels: Level[], completedLevelId: string): Level | null {
  const completedLevel = levels.find(l => l.id === completedLevelId);
  if (!completedLevel) return null;

  // Find the next level in order
  const nextLevel = levels.find(
    l => l.order === completedLevel.order + 1 && !l.unlocked
  );

  if (nextLevel) {
    nextLevel.unlocked = true;
    return nextLevel;
  }

  return null;
}

