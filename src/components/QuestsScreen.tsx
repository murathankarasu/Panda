import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDailyQuestProgress } from '../utils/dailyQuests';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';
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
  const { t } = useLanguage();
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [userName, setUserName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Load user name
    const name = localStorage.getItem('userName') || t('auth.default_student');
    setUserName(name);

    // Load daily quest progress
    const dailyProgress = getDailyQuestProgress();
    
    // Define daily quests
    const questTargets = [
      { id: '1', title: t('quests.daily1'), target: 1 },
      { id: '2', title: t('quests.daily2'), target: 2 },
      { id: '3', title: t('quests.daily3'), target: 3 },
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
  }, [t]);

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

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="quests-view">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-text">
            <span className="logo-rainbow">Özel</span>
            <span className="logo-white">Öğren</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate('/map')}>
            <span className="nav-icon">🗺️</span>
            <span>{t('map.nav_map')}</span>
          </button>
          <button className="nav-item active" onClick={() => navigate('/quests')}>
            <span className="nav-icon">🎯</span>
            <span>{t('map.nav_quests')}</span>
          </button>
          <button className="nav-item" onClick={() => navigate('/badges')}>
            <span className="nav-icon">🏆</span>
            <span>{t('map.nav_badges')}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="avatar-circle">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-level">{t('auth.default_student')}</span>
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={handleLogout} className="logout-btn">
                  {t('map.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content-area">
        {/* Header */}
        <header className="content-header">
          <h1 className="header-title">{t('quests.title')}</h1>
          <p className="header-subtitle">{t('quests.subtitle')}</p>
        </header>

        {/* Daily Quests List */}
        <div className="quests-grid">
          {dailyQuests.map((quest) => {
            const progress = getProgressPercentage(quest.current, quest.target);
            
            return (
              <div key={quest.id} className={`quest-card ${quest.completed ? 'completed' : ''}`}>
                <div className="quest-icon-wrapper">
                  <span className="quest-icon">{quest.completed ? '✅' : '📜'}</span>
                </div>
                <div className="quest-info">
                  <h3>{quest.title}</h3>
                  <div className="quest-progress-container">
                    <div className="progress-label">
                      <span>{t('quests.progress')}</span>
                      <span>{quest.current} / {quest.target}</span>
                    </div>
                    <div className="quest-progress-track">
                      <div 
                        className="quest-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                {quest.completed && <div className="quest-badge">TAMAMLANDI</div>}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
