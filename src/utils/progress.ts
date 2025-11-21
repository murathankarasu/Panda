import { UserProgress, Level } from '../types';
import { firebaseService } from '../services/firebaseService';

const STORAGE_KEY = 'sila_egitim_progress';

export function saveProgress(progress: UserProgress[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    
    // Firestore Sync (Fire and forget)
    const completedLevels = progress
      .filter(p => p.completed)
      .map(p => p.levelId);
      
    firebaseService.saveProgress(completedLevels).catch(err => {
      console.error('Firestore save error:', err);
    });
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

export async function syncProgress() {
  try {
    const userData = await firebaseService.getUserData();
    if (userData && userData.completedLevels) {
      const localProgress = loadProgress();
      const remoteCompleted: string[] = userData.completedLevels;
      
      // Merge logic: If remote has a completed level not in local, add it
      let changed = false;
      remoteCompleted.forEach(levelId => {
        if (!localProgress.find(p => p.levelId === levelId && p.completed)) {
          const existing = localProgress.find(p => p.levelId === levelId);
          if (existing) {
            existing.completed = true;
          } else {
            localProgress.push({
              levelId,
              completed: true,
              stars: 0, // Default
              lastAttempt: new Date()
            });
          }
          changed = true;
        }
      });
      
      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localProgress));
        return localProgress;
      }
    }
  } catch (error) {
    console.error('Sync error:', error);
  }
  return null;
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
