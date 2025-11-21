import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { levels } from '../data/levels';
import { levelContent } from '../data/levelContent';
import { baseCelebrationConfigs } from '../data/celebrationConfigs';
import { Level, LevelContent } from '../types';
import { CelebrationConfig } from '../types/celebration';

const USERS_COLLECTION = 'users';
const LEVELS_COLLECTION = 'levels';
const CONTENT_COLLECTION = 'level_contents';
const CELEBRATION_COLLECTION = 'celebration_configs';

export const firebaseService = {
  // Kullanıcı Kimliği Yönetimi
  getUserId: () => {
    let userId = localStorage.getItem('sila_egitim_userid');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('sila_egitim_userid', userId);
    }
    return userId;
  },

  // Kullanıcı Verileri
  initializeUser: async (name: string) => {
    const userId = firebaseService.getUserId();
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name,
        createdAt: new Date().toISOString(),
        progress: {},
        badges: [],
        dailyQuests: {
          date: new Date().toDateString(),
          completedCount: 0
        }
      });
    } else {
      // İsim güncellenebilir
      await updateDoc(userRef, { name });
    }
    return userId;
  },

  getUserData: async () => {
    const userId = firebaseService.getUserId();
    const userRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
  },

  saveProgress: async (completedLevels: string[]) => {
    const userId = firebaseService.getUserId();
    const userRef = doc(db, USERS_COLLECTION, userId);
    // Progress'i map olarak saklayalım veya array
    await updateDoc(userRef, {
      completedLevels // Basitçe array olarak güncelleyelim
    });
  },

  saveBadge: async (badgeId: string) => {
    const userId = firebaseService.getUserId();
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      const badges = data.badges || [];
      if (!badges.includes(badgeId)) {
        await updateDoc(userRef, {
          badges: [...badges, badgeId]
        });
      }
    }
  },

  // İçerik Yönetimi
  getLevels: async (): Promise<Level[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, LEVELS_COLLECTION));
      if (querySnapshot.empty) {
        console.log('Firestore levels empty, using local data');
        return levels;
      }
      const fetchedLevels: Level[] = [];
      querySnapshot.forEach((doc) => {
        fetchedLevels.push(doc.data() as Level);
      });
      return fetchedLevels.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching levels:', error);
      return levels; // Fallback to local
    }
  },

  getLevelContent: async (levelId: string): Promise<LevelContent | undefined> => {
    try {
      const docRef = doc(db, CONTENT_COLLECTION, levelId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as LevelContent;
      }
      return levelContent[levelId as keyof typeof levelContent];
    } catch (error) {
      console.error('Error fetching content:', error);
      return levelContent[levelId as keyof typeof levelContent];
    }
  },

  // Celebration Configs (Videolu Seviyeler)
  getCelebrationConfig: async (levelId: string): Promise<CelebrationConfig | null> => {
    try {
      const docRef = doc(db, CELEBRATION_COLLECTION, levelId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as CelebrationConfig;
      }
      // Fallback to local base config
      return baseCelebrationConfigs[levelId] || null;
    } catch (error) {
      console.error('Error fetching celebration config:', error);
      return baseCelebrationConfigs[levelId] || null;
    }
  },

  saveCelebrationConfig: async (levelId: string, config: CelebrationConfig) => {
    const docRef = doc(db, CELEBRATION_COLLECTION, levelId);
    await setDoc(docRef, config);
  },

  // Veri Yükleme (Admin/Geliştirici için)
  seedData: async () => {
    const batch = writeBatch(db);

    // Levels
    levels.forEach(level => {
      const ref = doc(db, LEVELS_COLLECTION, level.id);
      batch.set(ref, level);
    });

    // Content
    Object.entries(levelContent).forEach(([id, content]) => {
      const ref = doc(db, CONTENT_COLLECTION, id);
      batch.set(ref, content);
    });

    // Celebration Configs
    Object.entries(baseCelebrationConfigs).forEach(([id, config]) => {
      const ref = doc(db, CELEBRATION_COLLECTION, id);
      batch.set(ref, config);
    });

    await batch.commit();
    console.log('Data seeded to Firestore');
  }
};

