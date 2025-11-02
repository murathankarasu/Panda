import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeMessageScreen.css';

export default function WelcomeMessageScreen() {
  const [userName, setUserName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get name from localStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
      
      // Start animation after a short delay
      setTimeout(() => {
        setIsAnimating(true);
      }, 500);
      
      // Navigate to map after animation (3 seconds)
      setTimeout(() => {
        navigate('/map');
      }, 3500);
    } else {
      // If no name, redirect to name screen
      navigate('/name');
    }
  }, [navigate]);

  return (
    <div className="welcome-message-screen">
      <div className="welcome-message-container">
        {/* Left Side - Big Panda 3.png */}
        <div className="welcome-message-left">
          <div className={`big-panda-welcome ${isAnimating ? 'animate' : ''}`}>
            <img 
              src="/assets/3.png" 
              alt="Panda" 
              className="big-panda-image-welcome"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.parentElement?.querySelector('.big-panda-placeholder-welcome') as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            <div className="big-panda-placeholder-welcome" style={{ display: 'none' }}>
              🐼
            </div>
          </div>
        </div>

        {/* Right Side - Welcome Message */}
        <div className="welcome-message-right">
          <h1 className={`welcome-message-text ${isAnimating ? 'fade-in' : ''}`}>
            Memnun oldum {userName}!
          </h1>
        </div>
      </div>
    </div>
  );
}

