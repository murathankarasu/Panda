import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDailyQuestProgress } from '../utils/dailyQuests';
import './QuestsScreen.css';

interface DailyQuest {
  id: string;
  title: string;
  target: number;
  current: number;
  completed: boolean;
}

export default function QuestsScreen() {
  const navigate = useNavigate();
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);

  useEffect(() => {
    // Load daily quest progress
    const dailyProgress = getDailyQuestProgress();
    
    // Define daily quests
    const questTargets = [
      { id: '1', title: 'Günlük 3 bölüm geç', target: 3 },
      { id: '2', title: 'Günlük 5 bölüm geç', target: 5 },
      { id: '3', title: 'Günlük 10 bölüm geç', target: 10 },
    ];

    // Calculate daily quest progress
    const calculatedQuests: DailyQuest[] = questTargets.map(quest => {
      const current = dailyProgress.levelsCompletedToday;
      const completed = current >= quest.target;
      
      return {
        ...quest,
        current: Math.min(current, quest.target),
        completed,
      };
    });

    setDailyQuests(calculatedQuests);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="quests-view">
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
            className="nav-item" 
            onClick={() => handleNavClick('/map')}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">ÖĞREN</span>
          </div>
          <div className="nav-item active">
            <span className="nav-icon">🎯</span>
            <span className="nav-text">GÖREVLER</span>
          </div>
          <div 
            className="nav-item" 
            onClick={() => handleNavClick('/badges')}
          >
            <span className="nav-icon">🏆</span>
            <span className="nav-text">ROZETLER</span>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Header */}
        <div className="quests-header">
          <div className="quests-icon-large">🎯</div>
          <h1 className="quests-title">Görevler</h1>
          <p className="quests-subtitle">Günlük görevleri tamamlayarak ilerle</p>
        </div>

        {/* Daily Quests List */}
        <div className="quests-list">
          {dailyQuests.map((quest) => {
            const progress = getProgressPercentage(quest.current, quest.target);
            
            return (
              <div key={quest.id} className="quest-item">
                <div className="quest-item-left">
                  <span className="quest-icon">📚</span>
                  <span className="quest-description">{quest.title}</span>
                </div>
                <div className="quest-item-right">
                  <div className="quest-progress-text">
                    {quest.current} / {quest.target}
                  </div>
                  <div className="quest-progress-bar">
                    <div 
                      className={`quest-progress-fill ${quest.completed ? 'completed' : 'active'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

