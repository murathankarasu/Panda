import { useNavigate } from 'react-router-dom';
import { Level } from '../types';
import { getLevelProgress } from '../utils/progress';
import './MapView.css';

interface MapViewProps {
  levels: Level[];
}

export default function MapView({ levels }: MapViewProps) {
  const navigate = useNavigate();
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

  // Check if level can be unlocked (previous level completed)
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

  // Get next unlocked and not completed level
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

  // Update level unlock status based on previous completion
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
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div className="sidebar-logo">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="sidebar-logo-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.sidebar-logo-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="sidebar-logo-fallback" style={{ display: 'none' }}>🐼</div>
        </div>
        
        <nav className="sidebar-nav">
          <div 
            className="nav-item active" 
            onClick={() => navigate('/map')}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">ÖĞREN</span>
          </div>
          <div 
            className="nav-item" 
            onClick={() => navigate('/quests')}
          >
            <span className="nav-icon">🎯</span>
            <span className="nav-text">GÖREVLER</span>
          </div>
          <div 
            className="nav-item" 
            onClick={() => navigate('/badges')}
          >
            <span className="nav-icon">🏆</span>
            <span className="nav-text">ROZETLER</span>
          </div>
          <div 
            className="nav-item" 
            onClick={() => navigate('/admin')}
          >
            <span className="nav-icon">🛠️</span>
            <span className="nav-text">YÖNETİM</span>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Top Header */}
        <div className="content-header">
          <div className="header-summary">
            <h1 className="header-primary-title">Bayram Macerası</h1>
            <p className="header-caption">
              {completedCount} / {totalLevels} bölüm tamamlandı · %{completionRate}
            </p>
          </div>
          {nextLevel && (
            <button
              className="header-next-button"
              onClick={() => handleLevelClick(nextLevel)}
            >
              <span className="next-label">Sıradaki bölüm</span>
              <span className="next-title">{nextLevel.title}</span>
            </button>
          )}
        </div>

        {/* Units and Levels */}
        <div className="units-container">
          {categories.map(category => {
            const categoryLevels = sortedByCategory[category] || [];

            return (
              <div key={category} className="unit-section">
                {/* Unit Card */}
                <div className="unit-card">
                  <div className="unit-info">
                    <h2 className="unit-title">{category}</h2>
                    {categoryLevels.length > 0 && (
                      <p className="unit-description">
                        Yolculukta {categoryLevels.length} bölüm seni bekliyor.
                      </p>
                    )}
                  </div>
                  {categoryLevels.some(l => {
                    const status = getLevelStatus(l);
                    return status.unlocked && !status.completed;
                  }) && (
                    <button 
                      className="unit-continue-button"
                      onClick={() => {
                        const nextLevel = categoryLevels.find(l => {
                          const status = getLevelStatus(l);
                          return status.unlocked && !status.completed;
                        });
                        if (nextLevel) {
                          handleLevelClick(nextLevel);
                        }
                      }}
                    >
                      <span className="continue-icon">📖</span>
                      DEVAM ET
                    </button>
                  )}
                </div>

                {/* Levels Grid */}
                <div className="levels-grid">
                  {categoryLevels.map((level, index) => {
                    const status = getLevelStatus(level);

                    return (
                      <button
                        key={level.id}
                        className={`level-card ${
                          status.completed
                            ? 'completed'
                            : status.unlocked
                            ? 'active'
                            : 'locked'
                        }`}
                        onClick={() => status.unlocked && handleLevelClick(level)}
                        disabled={!status.unlocked}
                      >
                        <div className="level-card-header">
                          <div className="level-index">
                            {status.completed ? '✓' : index + 1}
                          </div>
                          {status.isCurrent && <span className="level-badge">SIRADAKİ</span>}
                        </div>
                        <div className="level-card-body">
                          <h3 className="level-card-title">{level.title}</h3>
                          <p className="level-card-text">{level.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
