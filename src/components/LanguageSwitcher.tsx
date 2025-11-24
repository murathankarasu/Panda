import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-button ${language === 'tr' ? 'active' : ''}`}
        onClick={() => setLanguage('tr')}
        title="Türkçe"
      >
        <span className="flag">🇹🇷</span>
        <span className="lang-text">TR</span>
      </button>
      <button
        className={`lang-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        title="English"
      >
        <span className="flag">🇬🇧</span>
        <span className="lang-text">EN</span>
      </button>
    </div>
  );
}

