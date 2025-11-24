import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  UserCredential 
} from 'firebase/auth';
import { auth } from '../firebase';
import { firebaseService } from '../services/firebaseService';
import { useLanguage } from '../contexts/LanguageContext';
import './NameScreen.css';

type AuthMode = 'login' | 'register';

export default function NameScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (userCred: UserCredential) => {
    const user = userCred.user;
    const displayName = name || user.displayName || t('auth.default_student');
    
    // LocalStorage güncelle
    localStorage.setItem('userName', displayName);
    
    // Firestore'a kullanıcı kaydı
    await firebaseService.initializeUser(displayName);
    
    navigate('/welcome-message');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleSuccess(result);
    } catch (err: any) {
      console.error(err);
      setError(t('auth.google_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let result: UserCredential;
      if (mode === 'register') {
        result = await createUserWithEmailAndPassword(auth, email, password);
        // İsim güncelleme
        if (name && auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: name });
        }
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      await handleSuccess(result);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError(t('auth.email_in_use'));
      } else if (err.code === 'auth/wrong-password') {
        setError(t('auth.wrong_password'));
      } else if (err.code === 'auth/user-not-found') {
        setError(t('auth.user_not_found'));
      } else if (err.code === 'auth/weak-password') {
        setError(t('auth.weak_password'));
      } else {
        setError(t('auth.general_error'));
      }
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
          <h2>{mode === 'login' ? t('auth.welcome_back') : t('auth.join_us')}</h2>
          <p>{t('auth.journey_awaits')}</p>
        </div>

        {/* Google Button */}
        <button 
          className="google-btn" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          <span>{mode === 'login' ? t('auth.google_login') : t('auth.google_register')}</span>
        </button>

        <div className="auth-divider">
          <span>{t('auth.or')}</span>
        </div>

        {/* Email Form */}
        <form className="auth-form" onSubmit={handleEmailAuth}>
          {mode === 'register' && (
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
          )}
          
          <div className="form-group">
            <label>{t('auth.email')}</label>
            <input
              type="email"
              placeholder={t('auth.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('auth.password')}</label>
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? t('auth.processing') : (mode === 'login' ? t('auth.login_button') : t('auth.register_button'))}
          </button>
        </form>

        {/* Footer / Toggle */}
        <div className="auth-footer">
          <p>
            {mode === 'login' ? t('auth.no_account') : t('auth.have_account')}
            <button 
              className="toggle-btn"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError(null);
              }}
            >
              {mode === 'login' ? t('auth.register_link') : t('auth.login_link')}
            </button>
          </p>
        </div>
      </div>

      {/* Background Decor */}
      <div className="auth-decor">
        <div className="rainbow-circle"></div>
        <img src="/assets/1.png" alt="Panda" className="auth-panda" />
      </div>
    </div>
  );
}
