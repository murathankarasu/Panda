import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBadges, Badge } from '../utils/badges';
import './BadgesScreen.css';

export default function BadgesScreen() {
  const navigate = useNavigate();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const userBadges = getBadges();
    setBadges(userBadges);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <div className="badges-view">
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
          <div 
            className="nav-item" 
            onClick={() => handleNavClick('/quests')}
          >
            <span className="nav-icon">🎯</span>
            <span className="nav-text">GÖREVLER</span>
          </div>
          <div className="nav-item active">
            <span className="nav-icon">🏆</span>
            <span className="nav-text">ROZETLER</span>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Header */}
        <div className="badges-header">
          <div className="badges-icon-large">🏆</div>
          <h1 className="badges-title">Rozetler</h1>
          <p className="badges-subtitle">Başarılarınızı toplayın ve gösterin</p>
        </div>

        {/* Badges Grid */}
        <div className="badges-container">
          {unlockedBadges.length > 0 && (
            <div className="badges-section">
              <h2 className="badges-section-title">Kazanılan Rozetler ({unlockedBadges.length})</h2>
              <div className="badges-grid">
                {unlockedBadges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="badge-item unlocked"
                  >
                    <div className="badge-icon">{badge.icon}</div>
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
              <h2 className="badges-section-title">Kilitli Rozetler ({lockedBadges.length})</h2>
              <div className="badges-grid">
                {lockedBadges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="badge-item locked"
                  >
                    <div className="badge-icon">{badge.icon}</div>
                    <div className="badge-info">
                      <div className="badge-name">{badge.name}</div>
                      <div className="badge-description">{badge.description}</div>
                    </div>
                    <div className="badge-lock-overlay">🔒</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

