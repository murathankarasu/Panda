import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInAnonymously,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { firebaseService } from '../services/firebaseService';
import { useLanguage } from '../contexts/LanguageContext';
import './NameScreen.css';

export default function NameScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnonymousLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('auth.name_required'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Eğer daha önce anonim giriş yapıldıysa mevcut oturumu kullan
      let user = auth.currentUser;
      if (user && !user.isAnonymous) {
        await signOut(auth);
        user = null;
      }

      if (!user) {
        const result = await signInAnonymously(auth);
        user = result.user;
      }

      const displayName = name.trim() || t('auth.default_student');

      if (user) {
        await updateProfile(user, { displayName });
        localStorage.setItem('sila_egitim_userid', user.uid);
      }

      localStorage.setItem('userName', displayName);

      // Firestore'a kullanıcı kaydı
      await firebaseService.initializeUser(displayName);
      navigate('/welcome-message');
    } catch (err: any) {
      console.error(err);
      setError(t('auth.anonymous_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text-color">Özel</span>
            <span className="logo-text-white">Öğren</span>
          </div>
          <h2>{t('auth.enter_name_title')}</h2>
          <p>{t('auth.enter_name_subtitle')}</p>
        </div>

        {/* Name Form */}
        <form className="auth-form" onSubmit={handleAnonymousLogin}>
          <div className="form-group">
            <label>{t('auth.name')}</label>
            <input
              type="text"
              placeholder={t('auth.name_placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? t('auth.processing') : t('auth.start_button')}
          </button>
        </form>
      </div>

      {/* Background Decor */}
      <div className="auth-decor">
        <div className="rainbow-circle"></div>
        <img src="/assets/1.png" alt="Panda" className="auth-panda" />
      </div>
    </div>
  );
}
