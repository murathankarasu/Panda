import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();

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
            <a href="#ozellikler">Özellikler</a>
            <a href="#nasil-calisir">Nasıl Çalışır?</a>
            <a href="#hakkimizda">Hakkımızda</a>
            <a href="#iletisim" className="nav-contact-btn">İletişim</a>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="hero-content">
          <div className="hero-text-area">
            <h2 className="hero-subtitle">ÖZEL EĞİTİM PLATFORMU</h2>
            <h1 className="hero-title">
              <span className="title-white">Eğlenceli</span>
              <span className="title-color">Öğrenme</span>
            </h1>
            <p className="hero-description">
              Hayal gücünün öğrenmeyle buluştuğu yer. Çocuklarımız için güvenli, 
              eğlenceli ve öğretici bir dijital dünya.
            </p>
            <button className="cta-button" onClick={() => navigate('/name')}>
              HAYDİ BAŞLAYALIM
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
          <h3>Renklerle Dolu Bir Yolculuk</h3>
          <h2>Her Çocuğun Hikayesi Özeldir</h2>
          <p className="section-intro">
            Özel gereksinimli çocuklar için uzmanlar tarafından hazırlanan içeriklerimizle, 
            öğrenme sürecini bir oyuna dönüştürüyoruz.
          </p>
        </div>

        <div className="cards-grid">
          <div className="info-card blue">
            <div className="card-icon">🎨</div>
            <h4>Görsel Öğrenme</h4>
            <p>
              Otizm ve dikkat eksikliği olan çocuklar için özel tasarlanmış 
              görsel kartlar ve hikayeler ile kavramları daha kolay öğrenin.
            </p>
          </div>
          <div className="info-card green">
            <div className="card-icon">🌱</div>
            <h4>Bireysel İlerleme</h4>
            <p>
              Her çocuğun öğrenme hızı farklıdır. Yapay zeka destekli sistemimiz, 
              çocuğunuzun seviyesine uygun alıştırmalar sunar.
            </p>
          </div>
          <div className="info-card red">
            <div className="card-icon">❤️</div>
            <h4>Duygusal Gelişim</h4>
            <p>
              Sadece akademik değil, sosyal ve duygusal becerileri de destekleyen 
              senaryolarla bütüncül bir gelişim hedefliyoruz.
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
          <h2 className="section-title-white">Nasıl Başlarım?</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <h4>Profil Oluştur</h4>
              <p>Çocuğunuzun ismini girerek kişiselleştirilmiş bir deneyim başlatın.</p>
            </div>
            <div className="step-arrow">➜</div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h4>Seviye Seç</h4>
              <p>Hazırlık, kelime oyunu veya hikaye modlarından uygun olanı seçin.</p>
            </div>
            <div className="step-arrow">➜</div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h4>Öğrenmeye Başla</h4>
              <p>İnteraktif oyunlar ve ödüllerle eğlenceli öğrenmenin tadını çıkarın.</p>
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
            <h3>NEDEN ÖZEL ÖĞREN?</h3>
            <h2>Özel Eğitimde Dijital Dönüşüm</h2>
            <p>
              Özel Öğren, <strong>özel gereksinimli bireylerin</strong> eğitim süreçlerini desteklemek amacıyla geliştirilmiş kapsamlı bir platformdur. 
              Milli Eğitim Bakanlığı müfredatına uygun kazanımları, dijital oyunlaştırma teknikleriyle birleştiriyoruz.
            </p>
            <p>
              Platformumuz; <strong>kavram öğretimi</strong>, <strong>günlük yaşam becerileri</strong>, 
              <strong>iletişim becerileri</strong> ve <strong>okuma-yazma hazırlık</strong> çalışmalarını kapsar. 
              Tablet ve bilgisayar üzerinden erişilebilir yapısıyla, eğitimin sürekliliğini evde de sağlar.
            </p>
            <ul className="feature-list">
              <li>✅ Dikkat süresini artıran etkileşimli içerikler</li>
              <li>✅ Sesli ve görsel yönergelerle bağımsız kullanım</li>
              <li>✅ Başarı hissini pekiştiren anında geri bildirimler</li>
            </ul>
            <button className="secondary-button" onClick={() => navigate('/name')}>
              HEMEN DENEYİN
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer" id="iletisim">
        <div className="footer-content">
          <div className="footer-col">
            <h4>Özel Öğren</h4>
            <p>Çocuklarımızın potansiyelini sevgi ve teknolojiyle keşfediyoruz.</p>
          </div>
          <div className="footer-col">
            <h4>Hızlı Erişim</h4>
            <a href="#ozellikler">Özellikler</a>
            <a href="#nasil-calisir">Nasıl Çalışır?</a>
            <a href="#programlar">Programlar</a>
          </div>
          <div className="footer-col">
            <h4>Destek</h4>
            <a href="#">Sıkça Sorulan Sorular</a>
            <a href="#">Gizlilik Politikası</a>
            <a href="#">İletişim</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Özel Öğren Eğitim Platformu. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
