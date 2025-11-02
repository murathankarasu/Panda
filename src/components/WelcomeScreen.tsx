import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // İsim giriş ekranına yönlendir
    navigate('/name');
  };

  const pandaImages = [
    { src: '/assets/1.png', className: 'panda-1' },
    { src: '/assets/2.png', className: 'panda-2' },
    { src: '/assets/3.png', className: 'panda-3' },
    { src: '/assets/4.png', className: 'panda-4' },
    { src: '/assets/5.png', className: 'panda-5' },
  ];

  return (
    <div className="welcome-screen">
      {/* Header */}
      <div className="welcome-header">
        <div className="logo">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="logo-image"
            onError={(e) => {
              // Fallback to emoji if image not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'logo-icon-fallback';
              fallback.textContent = '🐼';
              target.parentElement?.appendChild(fallback);
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="welcome-main">
        {/* Left Side - Panda Characters */}
        <div className="pandas-container">
          {pandaImages.map((panda, index) => (
            <div key={index} className={`panda-wrapper ${panda.className}`}>
              <img 
                src={panda.src} 
                alt={`Panda ${index + 1}`} 
                className="panda-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.parentElement?.querySelector('.panda-placeholder') as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className="panda-placeholder" style={{ display: 'none' }}>
                🐼
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Text and CTA */}
        <div className="welcome-content">
          <h1 className="welcome-title">
            Özel eğitimde interaktif öğrenme ile geliş, pratik yap ve başarıya ulaş.
          </h1>
          
          <button 
            onClick={handleGetStarted}
            className="get-started-button"
          >
            BAŞLA
          </button>
        </div>
      </div>
    </div>
  );
}

