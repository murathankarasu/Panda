import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBadges, Badge } from '../utils/badges';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';
import './BadgesScreen.css';

export default function BadgesScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userName, setUserName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Load user name
    const name = localStorage.getItem('userName') || t('auth.default_student');
    setUserName(name);

    const userBadges = getBadges();
    setBadges(userBadges);
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

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <div className="badges-view">
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
          <button className="nav-item" onClick={() => navigate('/quests')}>
            <span className="nav-icon">🎯</span>
            <span>{t('map.nav_quests')}</span>
          </button>
          <button className="nav-item active" onClick={() => navigate('/badges')}>
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
          <h1 className="header-title">{t('badges.title')}</h1>
          <p className="header-subtitle">{t('badges.subtitle')}</p>
        </header>

        {/* Badges Grid */}
        <div className="badges-container">
          {unlockedBadges.length > 0 && (
            <div className="badges-section">
              <h2 className="badges-section-title">{t('badges.unlocked')} ({unlockedBadges.length})</h2>
              <div className="badges-grid">
                {unlockedBadges.map((badge) => (
                  <div key={badge.id} className="badge-card unlocked">
                    <div className="badge-icon-wrapper">{badge.icon}</div>
                    <div className="badge-info">
                      <div className="badge-name">{badge.name}</div>
                      <div className="badge-description">{badge.description}</div>
                      {badge.unlockedDate && (
                        <div className="badge-date">
                          {new Date(badge.unlockedDate).toLocaleDateString('tr-TR')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lockedBadges.length > 0 && (
            <div className="badges-section">
              <h2 className="badges-section-title">{t('badges.locked')} ({lockedBadges.length})</h2>
              <div className="badges-grid">
                {lockedBadges.map((badge) => (
                  <div key={badge.id} className="badge-card locked">
                    <div className="badge-icon-wrapper">{badge.icon}</div>
                    <div className="badge-info">
                      <div className="badge-name">{badge.name}</div>
                      <div className="badge-description">{badge.description}</div>
                    </div>
                    <div className="badge-lock-icon">🔒</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
