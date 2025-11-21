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
import './NameScreen.css';

type AuthMode = 'login' | 'register';

export default function NameScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (userCred: UserCredential) => {
    const user = userCred.user;
    const displayName = name || user.displayName || 'Öğrenci';
    
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
      setError('Google ile giriş yapılamadı. Lütfen tekrar deneyin.');
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
        setError('Bu e-posta adresi zaten kullanımda.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Hatalı şifre.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Kullanıcı bulunamadı.');
      } else if (err.code === 'auth/weak-password') {
        setError('Şifre en az 6 karakter olmalı.');
      } else {
        setError('Bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
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
          <h2>{mode === 'login' ? 'Tekrar Hoş Geldin!' : 'Aramıza Katıl'}</h2>
          <p>Eğlenceli öğrenme yolculuğu seni bekliyor.</p>
        </div>

        {/* Google Button */}
        <button 
          className="google-btn" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          <span>Google ile {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</span>
        </button>

        <div className="auth-divider">
          <span>veya</span>
        </div>

        {/* Email Form */}
        <form className="auth-form" onSubmit={handleEmailAuth}>
          {mode === 'register' && (
            <div className="form-group">
              <label>İsim</label>
              <input
                type="text"
                placeholder="Adını yaz..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>E-posta</label>
            <input
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Şifre</label>
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
            {isLoading ? 'İşleniyor...' : (mode === 'login' ? 'GİRİŞ YAP' : 'KAYIT OL')}
          </button>
        </form>

        {/* Footer / Toggle */}
        <div className="auth-footer">
          <p>
            {mode === 'login' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}
            <button 
              className="toggle-btn"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError(null);
              }}
            >
              {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
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
