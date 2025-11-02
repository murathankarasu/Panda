import { loadProgress } from './progress';
import { levels } from '../data/levels';

const BADGES_KEY = 'sila_egitim_badges';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export function getBadges(): Badge[] {
  const progress = loadProgress();
  const completedLevels = progress.filter(p => p.completed);
  
  // Ünite bazında tamamlanan level'ları kontrol et
  const levelsByCategory = levels.reduce((acc, level) => {
    if (level.category === 'Dini Bayramlar') return acc;
    if (!acc[level.category]) {
      acc[level.category] = [];
    }
    acc[level.category].push(level);
    return acc;
  }, {} as Record<string, Array<typeof levels[number]>>);
  
  const badges: Badge[] = [
    {
      id: 'first_level',
      name: 'İlk Adım',
      description: 'İlk bölümü tamamla',
      icon: '🌟',
      unlocked: completedLevels.length >= 1,
    },
    {
      id: 'three_levels',
      name: 'Hızlı Öğrenci',
      description: '3 bölüm tamamla',
      icon: '⚡',
      unlocked: completedLevels.length >= 3,
    },
    {
      id: 'ten_levels',
      name: 'Uzman',
      description: '10 bölüm tamamla',
      icon: '🎓',
      unlocked: completedLevels.length >= 10,
    },
    {
      id: 'ramazan_bayrami_unit',
      name: 'Bayram Uzmanı',
      description: 'Ramazan Bayramı ünitesini tamamla',
      icon: '🌙',
      unlocked: checkUnitCompleted('Ramazan Bayramı', levelsByCategory, progress),
    },
    {
      id: 'daily_streak_3',
      name: 'Tutarlı',
      description: '3 gün üst üste çalış',
      icon: '🔥',
      unlocked: getDailyStreak() >= 3,
    },
    {
      id: 'daily_streak_7',
      name: 'Kararlı',
      description: '7 gün üst üste çalış',
      icon: '💪',
      unlocked: getDailyStreak() >= 7,
    },
  ];
  
  // Badge unlock tarihlerini kontrol et ve yeni unlock olanları kaydet
  const stored = localStorage.getItem(BADGES_KEY);
  const storedBadges: Badge[] = stored ? JSON.parse(stored) : [];
  
  badges.forEach(badge => {
    const storedBadge = storedBadges.find((b: Badge) => b.id === badge.id);
    if (storedBadge && storedBadge.unlockedDate) {
      badge.unlockedDate = storedBadge.unlockedDate;
    } else if (badge.unlocked && !badge.unlockedDate) {
      // Yeni unlock olan badge
      badge.unlockedDate = new Date().toISOString();
    }
  });
  
  // Yeni unlock olan badge'leri kaydet
  const hasNewUnlocks = badges.some(b => b.unlocked && b.unlockedDate && 
    !storedBadges.find((sb: Badge) => sb.id === b.id && sb.unlockedDate));
  
  if (hasNewUnlocks) {
    saveBadges(badges);
  }
  
  return badges;
}

function checkUnitCompleted(category: string, levelsByCategory: Record<string, Array<typeof levels[number]>>, progress: any[]): boolean {
  const categoryLevels = levelsByCategory[category];
  if (!categoryLevels) return false;
  
  return categoryLevels.every(level => {
    const levelProgress = progress.find(p => p.levelId === level.id);
    return levelProgress?.completed || level.completed;
  });
}

function getDailyStreak(): number {
  const stored = localStorage.getItem('sila_egitim_daily_quests');
  if (stored) {
    const data = JSON.parse(stored);
    const today = new Date().toISOString().split('T')[0];
    const storedDate = data.date || '';
    
    if (storedDate === today) {
      return data.streak || 1;
    }
  }
  return 1;
}

function saveBadges(badges: Badge[]): void {
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
}

