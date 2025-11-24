import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="welcome-container">
      {/* Dark Hero Section */}
      <header className="hero-section">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-logo">
            <div className="nav-logo-text">
              <span className="logo-rainbow">Özel</span>
              <span className="logo-white">Öğren</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#ozellikler">{t('nav.features')}</a>
            <a href="#nasil-calisir">{t('nav.how_it_works')}</a>
            <a href="#hakkimizda">{t('nav.about')}</a>
            <LanguageSwitcher />
            <a href="#iletisim" className="nav-contact-btn">{t('nav.contact')}</a>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="hero-content">
          <div className="hero-text-area">
            <h2 className="hero-subtitle">{t('hero.subtitle')}</h2>
            <h1 className="hero-title">
              <span className="title-white">{t('hero.title_fun')}</span>
              <span className="title-color">{t('hero.title_learning')}</span>
            </h1>
            <p className="hero-description">
              {t('hero.description')}
            </p>
            <button className="cta-button" onClick={() => navigate('/name')}>
              {t('hero.cta_button')}
            </button>
          </div>
          
          {/* Rainbow Decoration */}
          <div className="rainbow-stream">
            <div className="rainbow-color red"></div>
            <div className="rainbow-color orange"></div>
            <div className="rainbow-color yellow"></div>
            <div className="rainbow-color green"></div>
            <div className="rainbow-color blue"></div>
          </div>

          {/* Panda Character */}
          <div className="hero-character">
            <img src="/assets/1.png" alt="Sevimli Panda Karakteri" className="floating-panda" />
          </div>
        </div>

        {/* Wave Transition */}
        <div className="wave-separator">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#FFF9E5" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </header>

      {/* Features Section - SEO Rich */}
      <section className="info-section" id="ozellikler">
        <div className="section-header">
          <h3>{t('features.journey_title')}</h3>
          <h2>{t('features.story_title')}</h2>
          <p className="section-intro">
            {t('features.intro')}
          </p>
        </div>

        <div className="cards-grid">
          <div className="info-card blue">
            <div className="card-icon">🎨</div>
            <h4>{t('features.visual.title')}</h4>
            <p>
              {t('features.visual.description')}
            </p>
          </div>
          <div className="info-card green">
            <div className="card-icon">🌱</div>
            <h4>{t('features.individual.title')}</h4>
            <p>
              {t('features.individual.description')}
            </p>
          </div>
          <div className="info-card red">
            <div className="card-icon">❤️</div>
            <h4>{t('features.emotional.title')}</h4>
            <p>
              {t('features.emotional.description')}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="nasil-calisir">
        <div className="wave-top">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path fill="#FFF9E5" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="container">
          <h2 className="section-title-white">{t('how.title')}</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <h4>{t('how.step1.title')}</h4>
              <p>{t('how.step1.description')}</p>
            </div>
            <div className="step-arrow">➜</div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h4>{t('how.step2.title')}</h4>
              <p>{t('how.step2.description')}</p>
            </div>
            <div className="step-arrow">➜</div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h4>{t('how.step3.title')}</h4>
              <p>{t('how.step3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed SEO Content Section */}
      <section className="about-section" id="hakkimizda">
        <div className="about-content">
          <div className="about-image">
             <img src="/assets/2.png" alt="Arkadaş Panda ve Eğitim Materyalleri" className="friend-panda" />
          </div>
          <div className="about-text">
            <h3>{t('about.why_title')}</h3>
            <h2>{t('about.digital_title')}</h2>
            <p>
              {t('about.paragraph1')}
            </p>
            <p>
              {t('about.paragraph2')}
            </p>
            <ul className="feature-list">
              <li>✅ {t('about.feature1')}</li>
              <li>✅ {t('about.feature2')}</li>
              <li>✅ {t('about.feature3')}</li>
            </ul>
            <button className="secondary-button" onClick={() => navigate('/name')}>
              {t('about.try_button')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer" id="iletisim">
        <div className="footer-content">
          <div className="footer-col">
            <h4>{t('footer.title')}</h4>
            <p>{t('footer.description')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.quick_access')}</h4>
            <a href="#ozellikler">{t('footer.features')}</a>
            <a href="#nasil-calisir">{t('footer.how_it_works')}</a>
            <a href="#programlar">{t('footer.programs')}</a>
          </div>
          <div className="footer-col">
            <h4>{t('footer.support')}</h4>
            <a href="#">{t('footer.faq')}</a>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.contact')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
