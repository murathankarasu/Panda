const DAILY_QUESTS_KEY = 'sila_egitim_daily_quests';
const DAILY_RESET_KEY = 'sila_egitim_daily_reset';

interface DailyQuestProgress {
  date: string; // YYYY-MM-DD formatında
  levelsCompletedToday: number;
  streak: number; // Ardışık gün sayısı
}

export function getToday(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function getDailyQuestProgress(): DailyQuestProgress {
  const today = getToday();
  const stored = localStorage.getItem(DAILY_QUESTS_KEY);
  
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) {
      return data;
    }
  }
  
  // Yeni gün, sıfırla veya streak'i kontrol et
  const lastReset = localStorage.getItem(DAILY_RESET_KEY);
  let streak = 1;
  
  if (lastReset) {
    const lastDate = new Date(lastReset);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Dün görev yapıldıysa streak'i artır
      const yesterdayData = stored ? JSON.parse(stored) : null;
      if (yesterdayData && yesterdayData.date === lastReset && yesterdayData.levelsCompletedToday > 0) {
        streak = yesterdayData.streak + 1;
      }
    } else if (diffDays > 1) {
      streak = 1; // Streak kırıldı
    }
  }
  
  const newData: DailyQuestProgress = {
    date: today,
    levelsCompletedToday: 0,
    streak,
  };
  
  localStorage.setItem(DAILY_QUESTS_KEY, JSON.stringify(newData));
  localStorage.setItem(DAILY_RESET_KEY, today);
  
  return newData;
}

export function incrementLevelCompletedToday(): void {
  const today = getToday();
  const progress = getDailyQuestProgress();
  
  if (progress.date === today) {
    progress.levelsCompletedToday += 1;
    localStorage.setItem(DAILY_QUESTS_KEY, JSON.stringify(progress));
  }
}

export function resetDailyQuests(): void {
  const today = getToday();
  const stored = localStorage.getItem(DAILY_QUESTS_KEY);
  let streak = 1;
  
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date !== today) {
      // Dün görev yapıldıysa streak'i artır
      const yesterdayDate = new Date(data.date);
      const todayDate = new Date(today);
      const diffTime = todayDate.getTime() - yesterdayDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1 && data.levelsCompletedToday > 0) {
        streak = data.streak + 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }
  }
  
  const newData: DailyQuestProgress = {
    date: today,
    levelsCompletedToday: 0,
    streak,
  };
  
  localStorage.setItem(DAILY_QUESTS_KEY, JSON.stringify(newData));
  localStorage.setItem(DAILY_RESET_KEY, today);
}

