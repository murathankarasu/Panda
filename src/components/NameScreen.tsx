import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NameScreen.css';

export default function NameScreen() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      // İsmi localStorage'a kaydet
      localStorage.setItem('userName', name.trim());
      
      // Hoş geldin mesajı ekranına yönlendir
      navigate('/welcome-message');
    }
  };

  return (
    <div className="name-screen">
      <div className="name-screen-container">
        {/* Left Side - Big Panda */}
        <div className="name-screen-left">
          <div className="big-panda">
            <img 
              src="/assets/1.png" 
              alt="Panda" 
              className="big-panda-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.parentElement?.querySelector('.big-panda-placeholder') as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            <div className="big-panda-placeholder" style={{ display: 'none' }}>
              🐼
            </div>
          </div>
        </div>

        {/* Right Side - Name Form */}
        <div className="name-screen-right">
          <h1 className="name-question">
            İsmin nedir?
          </h1>
          
          <form className="name-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="name-input"
              placeholder="İsmini yaz..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              maxLength={20}
            />
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={!name.trim()}
            >
              GÖNDER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

