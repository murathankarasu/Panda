import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Level } from './types';
import { levels } from './data/levels';
import { loadProgress } from './utils/progress';
import WelcomeScreen from './components/WelcomeScreen';
import NameScreen from './components/NameScreen';
import WelcomeMessageScreen from './components/WelcomeMessageScreen';
import MapView from './components/MapView';
import QuestsScreen from './components/QuestsScreen';
import BadgesScreen from './components/BadgesScreen';
import LevelPage from './components/LevelPage';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [levelsWithProgress, setLevelsWithProgress] = useState<Level[]>(levels);
  const [isLoading, setIsLoading] = useState(true);

  const refreshLevels = useCallback(() => {
    const progress = loadProgress();

    setLevelsWithProgress(prevLevels => {
      const sortedLevels = [...prevLevels].sort((a, b) => a.order - b.order);

      // Grupla ve her kategori içindeki sıralamayı hazırla
      const levelsByCategory = sortedLevels.reduce((acc, level) => {
        if (!acc[level.category]) {
          acc[level.category] = [];
        }
        acc[level.category].push(level);
        return acc;
      }, {} as Record<string, Level[]>);

      const sortedByCategory = Object.keys(levelsByCategory).reduce((acc, category) => {
        acc[category] = levelsByCategory[category].slice().sort((a, b) => a.order - b.order);
        return acc;
      }, {} as Record<string, Level[]>);
      
      return sortedLevels.map(level => {
        const levelProgress = progress.find(p => p.levelId === level.id);
        const categoryLevels = sortedByCategory[level.category] || [];
        const levelIndex = categoryLevels.findIndex(l => l.id === level.id);

        let updatedLevel = { ...level };

        if (levelProgress) {
          updatedLevel.completed = levelProgress.completed;
          updatedLevel.stars = levelProgress.stars;
        }

        if (levelIndex === 0) {
          // Kategorinin ilk bölümü her zaman açık
          updatedLevel.unlocked = true;
        } else if (levelIndex > 0) {
          const prevCategoryLevel = categoryLevels[levelIndex - 1];
          if (prevCategoryLevel) {
            const prevProgress = progress.find(p => p.levelId === prevCategoryLevel.id);
            const prevCompleted = prevProgress?.completed || prevCategoryLevel.completed;
            updatedLevel.unlocked = Boolean(prevCompleted);
          }
        }

        return updatedLevel;
      });
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshLevels();
  }, [refreshLevels]);

  useEffect(() => {
    const handleProgressUpdated = () => {
      refreshLevels();
    };

    window.addEventListener('progress-updated', handleProgressUpdated);
    return () => {
      window.removeEventListener('progress-updated', handleProgressUpdated);
    };
  }, [refreshLevels]);

  if (isLoading) {
    return <div className="loading-screen">Yükleniyor...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<WelcomeScreen />} 
        />
        <Route 
          path="/name" 
          element={<NameScreen />} 
        />
        <Route 
          path="/welcome-message" 
          element={<WelcomeMessageScreen />} 
        />
        <Route 
          path="/map" 
          element={<MapView levels={levelsWithProgress} />} 
        />
        <Route 
          path="/quests" 
          element={<QuestsScreen />} 
        />
        <Route 
          path="/badges" 
          element={<BadgesScreen />} 
        />
        <Route 
          path="/admin" 
          element={<AdminDashboard />} 
        />
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
