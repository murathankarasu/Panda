import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  tr: {
    // Navigation
    'nav.features': 'Özellikler',
    'nav.how_it_works': 'Nasıl Çalışır?',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    
    // Hero Section
    'hero.subtitle': 'ÖZEL EĞİTİM PLATFORMU',
    'hero.title_fun': 'Eğlenceli',
    'hero.title_learning': 'Öğrenme',
    'hero.description': 'Hayal gücünün öğrenmeyle buluştuğu yer. Çocuklarımız için güvenli, eğlenceli ve öğretici bir dijital dünya.',
    'hero.cta_button': 'HAYDİ BAŞLAYALIM',
    
    // Features Section
    'features.journey_title': 'Renklerle Dolu Bir Yolculuk',
    'features.story_title': 'Her Çocuğun Hikayesi Özeldir',
    'features.intro': 'Özel gereksinimli çocuklar için uzmanlar tarafından hazırlanan içeriklerimizle, öğrenme sürecini bir oyuna dönüştürüyoruz.',
    'features.visual.title': 'Görsel Öğrenme',
    'features.visual.description': 'Otizm ve dikkat eksikliği olan çocuklar için özel tasarlanmış görsel kartlar ve hikayeler ile kavramları daha kolay öğrenin.',
    'features.individual.title': 'Bireysel İlerleme',
    'features.individual.description': 'Her çocuğun öğrenme hızı farklıdır. Yapay zeka destekli sistemimiz, çocuğunuzun seviyesine uygun alıştırmalar sunar.',
    'features.emotional.title': 'Duygusal Gelişim',
    'features.emotional.description': 'Sadece akademik değil, sosyal ve duygusal becerileri de destekleyen senaryolarla bütüncül bir gelişim hedefliyoruz.',
    
    // How It Works
    'how.title': 'Nasıl Başlarım?',
    'how.step1.title': 'Profil Oluştur',
    'how.step1.description': 'Çocuğunuzun ismini girerek kişiselleştirilmiş bir deneyim başlatın.',
    'how.step2.title': 'Seviye Seç',
    'how.step2.description': 'Hazırlık, kelime oyunu veya hikaye modlarından uygun olanı seçin.',
    'how.step3.title': 'Öğrenmeye Başla',
    'how.step3.description': 'İnteraktif oyunlar ve ödüllerle eğlenceli öğrenmenin tadını çıkarın.',
    
    // About Section
    'about.why_title': 'NEDEN ÖZEL ÖĞREN?',
    'about.digital_title': 'Özel Eğitimde Dijital Dönüşüm',
    'about.paragraph1': 'Özel Öğren, özel gereksinimli bireylerin eğitim süreçlerini desteklemek amacıyla geliştirilmiş kapsamlı bir platformdur. Milli Eğitim Bakanlığı müfredatına uygun kazanımları, dijital oyunlaştırma teknikleriyle birleştiriyoruz.',
    'about.paragraph2': 'Platformumuz; kavram öğretimi, günlük yaşam becerileri, iletişim becerileri ve okuma-yazma hazırlık çalışmalarını kapsar. Tablet ve bilgisayar üzerinden erişilebilir yapısıyla, eğitimin sürekliliğini evde de sağlar.',
    'about.feature1': 'Dikkat süresini artıran etkileşimli içerikler',
    'about.feature2': 'Sesli ve görsel yönergelerle bağımsız kullanım',
    'about.feature3': 'Başarı hissini pekiştiren anında geri bildirimler',
    'about.try_button': 'HEMEN DENEYİN',
    
    // Footer
    'footer.title': 'Özel Öğren',
    'footer.description': 'Çocuklarımızın potansiyelini sevgi ve teknolojiyle keşfediyoruz.',
    'footer.quick_access': 'Hızlı Erişim',
    'footer.features': 'Özellikler',
    'footer.how_it_works': 'Nasıl Çalışır?',
    'footer.programs': 'Programlar',
    'footer.support': 'Destek',
    'footer.faq': 'Sıkça Sorulan Sorular',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.contact': 'İletişim',
    'footer.copyright': '© 2025 Özel Öğren Eğitim Platformu. Tüm hakları saklıdır.',
    
    // Auth Screen
    'auth.welcome_back': 'Tekrar Hoş Geldin!',
    'auth.join_us': 'Aramıza Katıl',
    'auth.journey_awaits': 'Eğlenceli öğrenme yolculuğu seni bekliyor.',
    'auth.enter_name_title': 'Başlamak için ismini yaz',
    'auth.enter_name_subtitle': 'Hemen giriş yapıp macerana başlayalım.',
    'auth.name': 'İsim',
    'auth.name_placeholder': 'Adını yaz...',
    'auth.processing': 'İşleniyor...',
    'auth.start_button': 'BAŞLA',
    'auth.default_student': 'Öğrenci',
    'auth.name_required': 'Lütfen ismini gir.',
    'auth.anonymous_error': 'Giriş yapılırken bir sorun oluştu. Lütfen tekrar dene.',
    
    // Welcome Message Screen
    'welcome_msg.great': 'Harika!',
    'welcome_msg.nice_to_meet': 'Memnun oldum',
    'welcome_msg.preparing': 'Maceran hazırlanıyor...',
    
    // Welcome Screen
    'welcome.title': 'Sıla ile Keşfet',
    'welcome.subtitle': 'Türkiye\'yi öğrenmenin en eğlenceli yolu!',
    'welcome.start': 'Haydi Başlayalım',
    'welcome.privacy': 'Gizlilik Politikası',
    'welcome.terms': 'Kullanım Şartları',
    
    // Map View
    'map.nav_map': 'Harita',
    'map.nav_quests': 'Görevler',
    'map.nav_badges': 'Rozetler',
    'map.level': 'Seviye',
    'map.logout': 'Çıkış Yap',
    'map.logout_error': 'Çıkış hatası:',
    'map.continue_adventure': 'Maceraya Devam Et',
    'map.chapters_completed': 'bölüm tamamlandı',
    'map.next': 'Sıradaki',
    'map.chapters': 'Bölüm',
    
    // Badges
    'badges.title': 'Rozet Koleksiyonu',
    'badges.subtitle': 'Başarılarını burada sergile!',
    'badges.unlocked': 'Kazanılan Rozetler',
    'badges.locked': 'Kilitli Rozetler',
    
    // Quests
    'quests.title': 'Günlük Görevler',
    'quests.subtitle': 'Her gün yeni hedefler, yeni başarılar!',
    'quests.daily1': 'Günlük 1 bölüm geç',
    'quests.daily2': 'Günlük 2 bölüm geç',
    'quests.daily3': 'Günlük 3 bölüm geç',
    'quests.progress': 'İlerleme',
    
    // Level Page
    'level.continue': 'Devam Et',
    'level.start': 'Başla',
    'level.completed': 'Tamamlandı',
    'level.locked': 'Kilitli',
    'level.not_found': 'Seviye bulunamadı',
    'level.not_ready': 'Bu seviye henüz hazırlanmamış olabilir.',
    'level.back_to_map': 'Ana Sayfaya Dön',
    'level.true': 'Doğru',
    'level.false': 'Yanlış',
    'level.pause': 'Duraklat',
    'level.play': 'Oku',
    'level.volume': 'Ses Seviyesi',
    'level.question': 'Soru',
    'level.points': 'Puan',
    'level.correct': 'Doğru',
    'level.correct_answer': 'Harika! Doğru kartı seçtin!',
    'level.reward_points': '🎉 +10 Panda Puanı',
    'level.correct_card': 'Doğru kart',
    'level.complete_chapter': 'Bölümü Tamamla',
    
    // Celebration
    'celebration.ready': 'Hazırım',
    'celebration.next': 'İleri',
    'celebration.check': 'Kontrol Et',
    'celebration.finish': 'Bitir',
    'celebration.correct': 'Doğru!',
    'celebration.wrong': 'Tekrar dene',
    'celebration.complete': 'Tebrikler!',
    'celebration.quiz_correct': 'Doğru cevap, tebrikler!',
    'celebration.quiz_try_again': 'Başka bir seçenek dene.',
    'celebration.odd_correct': 'Tebrikler! Farklı olanı buldun.',
    
    // Games
    'game.word': 'Kelime Oyunu',
    'game.match': 'Eşleştirme',
    'game.memory': 'Hafıza',
    'game.color': 'Boyama',
    'game.quiz': 'Test',
    'game.rhythm': 'Ritim',
    'game.timeline': 'Zaman Çizelgesi',
    'game.puzzle': 'Puzzle',
    'game.sorting': 'Sıralama',
    'game.diff': 'Farkı Bul',
    'game.shadow': 'Gölge Eşleştirme',
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Bir hata oluştu',
    'common.retry': 'Tekrar Dene',
    'common.close': 'Kapat',
    'common.back': 'Geri',
    'common.next': 'İleri',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.add': 'Ekle',
    'common.remove': 'Kaldır',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.how_it_works': 'How It Works?',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.subtitle': 'SPECIAL EDUCATION PLATFORM',
    'hero.title_fun': 'Fun',
    'hero.title_learning': 'Learning',
    'hero.description': 'Where imagination meets learning. A safe, fun, and educational digital world for our children.',
    'hero.cta_button': 'LET\'S START',
    
    // Features Section
    'features.journey_title': 'A Journey Full of Colors',
    'features.story_title': 'Every Child\'s Story is Special',
    'features.intro': 'With our content prepared by experts for children with special needs, we turn the learning process into a game.',
    'features.visual.title': 'Visual Learning',
    'features.visual.description': 'Easily learn concepts with specially designed visual cards and stories for children with autism and attention deficit.',
    'features.individual.title': 'Individual Progress',
    'features.individual.description': 'Every child\'s learning pace is different. Our AI-powered system offers exercises tailored to your child\'s level.',
    'features.emotional.title': 'Emotional Development',
    'features.emotional.description': 'We aim for holistic development with scenarios that support not only academic but also social and emotional skills.',
    
    // How It Works
    'how.title': 'How Do I Start?',
    'how.step1.title': 'Create Profile',
    'how.step1.description': 'Start a personalized experience by entering your child\'s name.',
    'how.step2.title': 'Select Level',
    'how.step2.description': 'Choose the appropriate mode from preparation, word game, or story modes.',
    'how.step3.title': 'Start Learning',
    'how.step3.description': 'Enjoy fun learning with interactive games and rewards.',
    
    // About Section
    'about.why_title': 'WHY ÖZEL ÖĞREN?',
    'about.digital_title': 'Digital Transformation in Special Education',
    'about.paragraph1': 'Özel Öğren is a comprehensive platform developed to support the education processes of individuals with special needs. We combine achievements in line with the Ministry of National Education curriculum with digital gamification techniques.',
    'about.paragraph2': 'Our platform covers concept teaching, daily living skills, communication skills, and literacy preparation. With its accessibility via tablet and computer, it ensures the continuity of education at home.',
    'about.feature1': 'Interactive content that increases attention span',
    'about.feature2': 'Independent use with audio and visual instructions',
    'about.feature3': 'Instant feedback reinforcing the sense of achievement',
    'about.try_button': 'TRY NOW',
    
    // Footer
    'footer.title': 'Özel Öğren',
    'footer.description': 'We discover our children\'s potential with love and technology.',
    'footer.quick_access': 'Quick Access',
    'footer.features': 'Features',
    'footer.how_it_works': 'How It Works?',
    'footer.programs': 'Programs',
    'footer.support': 'Support',
    'footer.faq': 'Frequently Asked Questions',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2025 Özel Öğren Education Platform. All rights reserved.',
    
    // Auth Screen
    'auth.welcome_back': 'Welcome Back!',
    'auth.join_us': 'Join Us',
    'auth.journey_awaits': 'An exciting learning journey awaits you.',
    'auth.enter_name_title': 'Enter your name to begin',
    'auth.enter_name_subtitle': 'Jump in instantly with anonymous access.',
    'auth.name': 'Name',
    'auth.name_placeholder': 'Enter your name...',
    'auth.processing': 'Processing...',
    'auth.start_button': 'START',
    'auth.default_student': 'Student',
    'auth.name_required': 'Please enter your name.',
    'auth.anonymous_error': 'Something went wrong while signing you in. Please try again.',
    
    // Welcome Message Screen
    'welcome_msg.great': 'Great!',
    'welcome_msg.nice_to_meet': 'Nice to meet you',
    'welcome_msg.preparing': 'Your adventure is being prepared...',
    
    // Welcome Screen
    'welcome.title': 'Discover with Sıla',
    'welcome.subtitle': 'The most fun way to learn about Turkey!',
    'welcome.start': 'Let\'s Start',
    'welcome.privacy': 'Privacy Policy',
    'welcome.terms': 'Terms of Use',
    
    // Map View
    'map.nav_map': 'Map',
    'map.nav_quests': 'Quests',
    'map.nav_badges': 'Badges',
    'map.level': 'Level',
    'map.logout': 'Log Out',
    'map.logout_error': 'Logout error:',
    'map.continue_adventure': 'Continue Adventure',
    'map.chapters_completed': 'chapters completed',
    'map.next': 'Next',
    'map.chapters': 'Chapters',
    
    // Badges
    'badges.title': 'Badge Collection',
    'badges.subtitle': 'Showcase your achievements here!',
    'badges.unlocked': 'Unlocked Badges',
    'badges.locked': 'Locked Badges',
    
    // Quests
    'quests.title': 'Daily Quests',
    'quests.subtitle': 'New goals, new achievements every day!',
    'quests.daily1': 'Complete 1 chapter daily',
    'quests.daily2': 'Complete 2 chapters daily',
    'quests.daily3': 'Complete 3 chapters daily',
    'quests.progress': 'Progress',
    
    // Level Page
    'level.continue': 'Continue',
    'level.start': 'Start',
    'level.completed': 'Completed',
    'level.locked': 'Locked',
    'level.not_found': 'Level not found',
    'level.not_ready': 'This level may not be ready yet.',
    'level.back_to_map': 'Back to Map',
    'level.true': 'True',
    'level.false': 'False',
    'level.pause': 'Pause',
    'level.play': 'Play',
    'level.volume': 'Volume',
    'level.question': 'Question',
    'level.points': 'Points',
    'level.correct': 'Correct',
    'level.correct_answer': 'Great! You chose the right card!',
    'level.reward_points': '🎉 +10 Panda Points',
    'level.correct_card': 'Correct card',
    'level.complete_chapter': 'Complete Chapter',
    
    // Celebration
    'celebration.ready': 'I am Ready',
    'celebration.next': 'Next',
    'celebration.check': 'Check',
    'celebration.finish': 'Finish',
    'celebration.correct': 'Correct!',
    'celebration.wrong': 'Try Again',
    'celebration.complete': 'Congratulations!',
    'celebration.quiz_correct': 'Correct answer, congratulations!',
    'celebration.quiz_try_again': 'Try another option.',
    'celebration.odd_correct': 'Congratulations! You found the different one.',
    
    // Games
    'game.word': 'Word Game',
    'game.match': 'Matching',
    'game.memory': 'Memory',
    'game.color': 'Coloring',
    'game.quiz': 'Quiz',
    'game.rhythm': 'Rhythm',
    'game.timeline': 'Timeline',
    'game.puzzle': 'Puzzle',
    'game.sorting': 'Sorting',
    'game.diff': 'Spot the Difference',
    'game.shadow': 'Shadow Matching',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.remove': 'Remove',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'en' || saved === 'tr') ? saved : 'tr';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    console.log('🌐 [LANGUAGE] Dil değiştirildi:', { from: language, to: lang });
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['tr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
