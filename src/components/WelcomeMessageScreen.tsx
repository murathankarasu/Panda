import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './WelcomeMessageScreen.css';

export default function WelcomeMessageScreen() {
  const [userName, setUserName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Get name from localStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
      
      // Start animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 100);
      
      // Navigate to map
      setTimeout(() => {
        navigate('/map');
      }, 3500);
    } else {
      navigate('/name');
    }
  }, [navigate]);

  return (
    <div className="welcome-message-screen">
      <div className="welcome-message-content">
        <div className={`character-container ${isAnimating ? 'slide-in' : ''}`}>
          <img src="/assets/3.png" alt="Panda" className="welcome-character" />
          <div className="confetti-bg"></div>
        </div>
        
        <div className={`text-container ${isAnimating ? 'fade-up' : ''}`}>
          <h2 className="welcome-greeting">{t('welcome_msg.great')}</h2>
          <h1 className="welcome-name">
            {t('welcome_msg.nice_to_meet')}, <br />
            <span className="name-highlight">{userName}</span>!
          </h1>
          <p className="loading-text">{t('welcome_msg.preparing')}</p>
          <div className="loading-bar">
            <div className="loading-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
