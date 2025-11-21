import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Level } from '../types';
import { getLevelProgress } from '../utils/progress';
import { firebaseService } from '../services/firebaseService';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './MapView.css';

interface MapViewProps {
  levels: Level[];
}

export default function MapView({ levels }: MapViewProps) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Öğrenci';
    setUserName(name);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userName');
      localStorage.removeItem('sila_egitim_userid');
      navigate('/');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  const sortedLevels = [...levels].sort((a, b) => a.order - b.order);

  // Group levels by category (Units)
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

  const categories = Array.from(new Set(sortedLevels.map(level => level.category)));
  const totalLevels = sortedLevels.length;
  const completedCount = sortedLevels.reduce((count, level) => {
    const progress = getLevelProgress(level.id);
    const isCompleted = progress?.completed || level.completed;
    return isCompleted ? count + 1 : count;
  }, 0);
  const completionRate = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;

  const handleLevelClick = (level: Level) => {
    if (level.unlocked) {
      navigate(`/level/${level.id}`);
    }
  };

  const canUnlock = (level: Level): boolean => {
    const categoryLevels = sortedByCategory[level.category] || [];
    const levelIndex = categoryLevels.findIndex(l => l.id === level.id);

    if (levelIndex === 0) return true;
    if (levelIndex < 0) return false;

    const prevCategoryLevel = categoryLevels[levelIndex - 1];
    if (!prevCategoryLevel) return true;

    const prevProgress = getLevelProgress(prevCategoryLevel.id);
    return Boolean(prevProgress?.completed || prevCategoryLevel.completed);
  };

  const getNextUnlockedLevel = (): Level | null => {
    for (const level of sortedLevels) {
      const unlocked = canUnlock(level);
      if (unlocked) {
        const progress = getLevelProgress(level.id);
        const completed = progress?.completed || level.completed;
        if (!completed) {
          return level;
        }
      }
    }
    return null;
  };

  const getLevelStatus = (
    level: Level
  ): { unlocked: boolean; completed: boolean; isCurrent: boolean } => {
    const progress = getLevelProgress(level.id);
    const completed = progress?.completed || level.completed;
    const unlocked = canUnlock(level);
    const nextUnlocked = getNextUnlockedLevel();
    const isCurrent = nextUnlocked?.id === level.id;

    return { unlocked, completed, isCurrent };
  };

  const nextLevel = getNextUnlockedLevel();

  return (
    <div className="map-view">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-text">
            <span className="logo-rainbow">Özel</span>
            <span className="logo-white">Öğren</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => navigate('/map')}>
            <span className="nav-icon">🗺️</span>
            <span>Harita</span>
          </button>
          <button className="nav-item" onClick={() => navigate('/quests')}>
            <span className="nav-icon">🎯</span>
            <span>Görevler</span>
          </button>
          <button className="nav-item" onClick={() => navigate('/badges')}>
            <span className="nav-icon">🏆</span>
            <span>Rozetler</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="avatar-circle">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-level">Seviye {Math.floor(completedCount / 5) + 1}</span>
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={handleLogout} className="logout-btn">
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="map-content">
        <header className="map-header">
          <div>
            <h1>Maceraya Devam Et</h1>
            <p className="progress-text">
              {completedCount}/{totalLevels} bölüm tamamlandı • %{completionRate}
            </p>
          </div>
          {nextLevel && (
            <button className="continue-btn" onClick={() => handleLevelClick(nextLevel)}>
              <span>Sıradaki: {nextLevel.title}</span>
              <span className="btn-arrow">→</span>
            </button>
          )}
        </header>

        <div className="levels-container">
          {categories.map(category => {
            const categoryLevels = sortedByCategory[category] || [];
            return (
              <div key={category} className="unit-section">
                <div className="unit-header">
                  <h2>{category}</h2>
                  <span className="unit-count">{categoryLevels.length} Bölüm</span>
                </div>
                
                <div className="levels-grid">
                  {categoryLevels.map((level, index) => {
                    const status = getLevelStatus(level);
                    return (
                      <button
                        key={level.id}
                        className={`level-node ${status.completed ? 'completed' : ''} ${status.isCurrent ? 'current' : ''} ${!status.unlocked ? 'locked' : ''}`}
                        onClick={() => status.unlocked && handleLevelClick(level)}
                        disabled={!status.unlocked}
                      >
                        <div className="node-content">
                          {status.completed ? '✓' : status.unlocked ? index + 1 : '🔒'}
                        </div>
                        <div className="level-info">
                          <h3>{level.title}</h3>
                          <p>{level.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
