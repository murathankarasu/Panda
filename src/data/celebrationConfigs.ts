import { CelebrationConfig, CelebrationConfigMap } from '../types/celebration';

export const CELEBRATION_OVERRIDE_KEY = 'celebration_config_overrides';

export const baseCelebrationConfigs: CelebrationConfigMap = {
  'milli-29-ekim': {
    id: 'milli-29-ekim',
    intro:
      '29 Ekim 1923\'te Türkiye Cumhuriyeti ilan edildi. Bu özel günü özgürlüğümüzü ve birlikte yaşamayı hatırlamak için kutluyoruz.',
    videoId: 'u2lm7MSh7Wk',
    prepHints: [
      'Videodaki marşı ailecek söylemeye çalış.',
      'Bayrağını hazırla, birlikte sallayın.',
      'Kutlama için “Hazırım” dediğinde başlıyoruz!'
    ],
    stepTitles: [
      'Hazırlık', 'Kelime Oyunu', 'Simgeleri Eşleştir', 'Hafıza Oyunu',
      'Boyama', 'Gölge Eşleştirme', 'Kategorileştirme', 'Kutlama İnşası',
      'Ritim', 'Günü Sırala', 'Farkı Bul', 'Mini Test', 'Kutlama'
    ],
    wordGame: {
      prompt: 'Cumhuriyetimizin adını harfleri doğru sıraya dizerek tamamla.',
      answer: 'CUMHURIYET',
      letterPool: ['C', 'U', 'M', 'H', 'U', 'R', 'I', 'Y', 'E', 'T', 'A', 'L'],
    },
    matchItems: [
      { id: '29ekim', label: '29 Ekim 1923', badge: '📅' },
      { id: 'bayrak', label: 'Türk Bayrağı', badge: '🚩' },
      { id: 'soz', label: '“Efendiler, yarın Cumhuriyeti ilan edeceğiz.”', badge: '🗣️' },
    ],
    matchTargets: [
      { id: 'tarih', prompt: 'Cumhuriyetin ilan edildiği tarih', answer: '29ekim' },
      { id: 'sembol', prompt: 'Cumhuriyetin sembolü', answer: 'bayrak' },
      { id: 'soz', prompt: 'Atatürk’ün 28 Ekim gecesi söylediği söz', answer: 'soz' },
    ],
    memoryPairs: [
      { id: 'yunus', icon: '🛳️', label: 'Bandırma Vapuru' },
      { id: 'harf', icon: '📜', label: 'Cumhuriyet Belgesi' },
      { id: 'marsh', icon: '🎺', label: 'Marş' },
    ],
    colorGrid: {
      palette: [
        { id: 'red', label: 'Kırmızı', color: '#ef4444' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' },
      ],
      target: [
        ['red', 'red', 'red'],
        ['red', 'white', 'red'],
        ['red', 'red', 'red'],
      ],
      hint: 'Ortadaki kareyi beyaz bırak, diğer kareleri kırmızıya boya.',
    },
    silhouetteGame: [
      { id: 'ataturk', icon: '👤', label: 'Atatürk', color: '#2D2D2D' },
      { id: 'flag', icon: '🚩', label: 'Bayrak', color: '#ef4444' },
      { id: 'map', icon: '🗺️', label: 'Türkiye', color: '#54A0FF' },
    ],
    sortingGame: {
      categories: [
        { id: 'left', label: 'Bayramda Yaparız', icon: '🎉', color: '#1DD1A1' },
        { id: 'right', label: 'Sıradan Gün', icon: '🏠', color: '#FF6B6B' },
      ],
      items: [
        { id: 's1', label: 'Bayrak Asmak', icon: '🚩', category: 'left' },
        { id: 's2', label: 'Erken Uyumak', icon: '😴', category: 'right' },
        { id: 's3', label: 'Şiir Okumak', icon: '🎤', category: 'left' },
        { id: 's4', label: 'Televizyon İzlemek', icon: '📺', category: 'right' },
      ],
    },
    oddOneOutGame: {
      items: [
        { id: 'o1', icon: '🇹🇷', isOdd: false },
        { id: 'o2', icon: '🇹🇷', isOdd: false },
        { id: 'o3', icon: '🇹🇷', isOdd: false },
        { id: 'o4', icon: '🍕', isOdd: true },
      ]
    },
    puzzlePieces: [
      { id: 'fabric', label: 'Kırmızı Kumaş', icon: '🟥', color: '#dc2626' },
      { id: 'crescent', label: 'Hilal Şablonu', icon: '🌙', color: '#f97316' },
      { id: 'star', label: 'Yıldız Parıltısı', icon: '⭐', color: '#facc15' },
      { id: 'pole', label: 'Bayrak Gönderi', icon: '🎏', color: '#2563eb' },
    ],
    puzzleHint: 'Bayrağın temelini ser, hilali ve yıldızı yerleştir, ardından göndere bağla.',
    rhythmActions: [
      { id: 'drum', label: 'Davula vur', icon: '🥁' },
      { id: 'flag', label: 'Bayrak salla', icon: '🚩' },
      { id: 'star', label: 'Yıldızla parla', icon: '⭐' },
    ],
    rhythmSequence: ['drum', 'flag', 'drum', 'star'],
    timeline: [
      { id: 'bayrak', label: 'Sabah bayraklarımızı asarız.' },
      { id: 'toren', label: 'Okullarda tören ve şiirler olur.' },
      { id: 'kutlama', label: 'Akşam coşkulu kutlamalara katılırız.' },
    ],
    quiz: {
      question: 'Cumhuriyet Bayramı bize neyi hatırlatır?',
      options: ['Bağımsızlık ve özgürlük', 'Yalnızca tatil yapmayı', 'Havai fişek izlemeyi'],
      correctIndex: 0,
    },
    completionMessage: 'Cumhuriyetimizin değerlerini çok güzel öğrendin!'
  },
  'milli-23-nisan': {
    id: 'milli-23-nisan',
    intro:
      '23 Nisan 1920\'de Türkiye Büyük Millet Meclisi açıldı. Atatürk bu günü tüm çocuklara armağan etti.',
    videoId: 'EjCqEMqPgeE',
    prepHints: [
      'Videodaki şarkıya eşlik et.',
      'Sınıfını veya evini balonlarla hayal et.',
      'Ailenle birlikte bayrağını hazırlamayı unutma.'
    ],
    stepTitles: [
      'Hazırlık', 'Kelime Oyunu', 'Simgeleri Eşleştir', 'Hafıza Oyunu',
      'Boyama', 'Gölge Eşleştirme', 'Kategorileştirme', 'Kutlama İnşası',
      'Ritim', 'Günü Sırala', 'Farkı Bul', 'Mini Test', 'Kutlama'
    ],
    wordGame: {
      prompt: 'Bayramın adını harfleri sıraya dizerek yaz.',
      answer: 'EGEMENLIK',
      letterPool: ['E', 'G', 'E', 'M', 'E', 'N', 'L', 'I', 'K', 'Ç', 'O', 'A'],
    },
    matchItems: [
      { id: '23nisan', label: '23 Nisan 1920', badge: '📅' },
      { id: 'cocuk', label: 'Çocuk Bayramı', badge: '🎈' },
      { id: 'hediye', label: 'Atatürk’ün çocuklara hediyesi', badge: '🎁' },
    ],
    matchTargets: [
      { id: 'tarih', prompt: 'TBMM’nin açıldığı günü seç', answer: '23nisan' },
      { id: 'isim', prompt: 'Bayramın adını seç', answer: 'cocuk' },
      { id: 'armağan', prompt: 'Atatürk’ün çocuklara armağanı', answer: 'hediye' },
    ],
    memoryPairs: [
      { id: 'balon', icon: '🎈', label: 'Balon' },
      { id: 'maskot', icon: '🐾', label: 'Maskot' },
      { id: 'nota', icon: '🎵', label: 'Şarkı' },
    ],
    colorGrid: {
      palette: [
        { id: 'red', label: 'Kırmızı', color: '#ef4444' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' },
        { id: 'blue', label: 'Mavi', color: '#3b82f6' },
      ],
      target: [
        ['red', 'white', 'red'],
        ['white', 'blue', 'white'],
        ['red', 'white', 'red'],
      ],
      hint: 'Ortada mavi çizgi kalsın; kenarlarda kırmızı beyaz bayrak çerçevesi olsun.',
    },
    silhouetteGame: [
      { id: 'world', icon: '🌍', label: 'Dünya', color: '#3b82f6' },
      { id: 'kite', icon: '🪁', label: 'Uçurtma', color: '#f59e0b' },
      { id: 'child', icon: '👧', label: 'Çocuk', color: '#ec4899' },
    ],
    sortingGame: {
      categories: [
        { id: 'left', label: 'Çocukların', icon: '🎈', color: '#54A0FF' },
        { id: 'right', label: 'Yetişkinlerin', icon: '👔', color: '#95a5a6' },
      ],
      items: [
        { id: 's1', label: 'Oyuncak', icon: '🧸', category: 'left' },
        { id: 's2', label: 'Kravat', icon: '👔', category: 'right' },
        { id: 's3', label: 'Balon', icon: '🎈', category: 'left' },
        { id: 's4', label: 'Evrak Çantası', icon: '💼', category: 'right' },
      ],
    },
    oddOneOutGame: {
      items: [
        { id: 'o1', icon: '🎈', isOdd: false },
        { id: 'o2', icon: '🎈', isOdd: false },
        { id: 'o3', icon: '🎈', isOdd: false },
        { id: 'o4', icon: '🌵', isOdd: true },
      ]
    },
    puzzlePieces: [
      { id: 'stage', label: 'Şenlik Sahnesi', icon: '🎪', color: '#fb923c' },
      { id: 'balloons', label: 'Balon Süsleri', icon: '🎈', color: '#facc15' },
      { id: 'flags', label: 'Bayrak Dizisi', icon: '🚩', color: '#ef4444' },
      { id: 'joy', label: 'Kutlama Neşesi', icon: '🎉', color: '#38bdf8' },
    ],
    puzzleHint: 'Şenlik sahnesini kurup balon ve bayraklarla süsle, en üste çocukların gülüşünü ekle.',
    rhythmActions: [
      { id: 'hop', label: 'Zıpla', icon: '🪩' },
      { id: 'clap', label: 'Ritme tıkla', icon: '🔔' },
      { id: 'twirl', label: 'Dön', icon: '🎠' },
    ],
    rhythmSequence: ['hop', 'clap', 'hop', 'twirl'],
    timeline: [
      { id: 'sus', label: 'Sabah sınıfımızı süsleriz.' },
      { id: 'goster', label: 'Öğle saatlerinde gösteriler yaparız.' },
      { id: 'aile', label: 'Akşam ailemizle kutlarız.' },
    ],
    quiz: {
      question: '23 Nisan’ı çocuklara kim armağan etti?',
      options: ['Atatürk', 'Öğretmenler', 'Arkadaşlarımız'],
      correctIndex: 0,
    },
    completionMessage: 'Harika! 23 Nisan coşkusunu paylaştın.'
  },
  'milli-19-mayis': {
    id: 'milli-19-mayis',
    intro:
      '19 Mayıs 1919\'da Atatürk Samsun\'a çıkarak Milli Mücadeleyi başlattı. Bu gün gençlere armağan edildi.',
    videoId: 'fatwAQWFZYI',
    prepHints: [
      'Videodaki ritimle ayağa kalkıp hareket et.',
      'Spor yaparken hangi hareketleri sevdiğini paylaş.',
      'Akşam yapılacak fener alayını hayal et.'
    ],
    stepTitles: [
      'Hazırlık', 'Kelime Oyunu', 'Simgeleri Eşleştir', 'Hafıza Oyunu',
      'Boyama', 'Gölge Eşleştirme', 'Kategorileştirme', 'Kutlama İnşası',
      'Ritim', 'Günü Sırala', 'Farkı Bul', 'Mini Test', 'Kutlama'
    ],
    wordGame: {
      prompt: 'Gençliğe armağan edilen bu günün adını tamamla.',
      answer: 'GENCLIK',
      letterPool: ['G', 'E', 'N', 'C', 'L', 'I', 'K', 'S', 'O', 'R', 'U', 'T'],
    },
    matchItems: [
      { id: 'samsun', label: 'Samsun’a çıkış', badge: '🚢' },
      { id: 'genclik', label: 'Gençlik ve Spor', badge: '🏃' },
      { id: 'fener', label: 'Fener alayı yürüyüşü', badge: '🔥' },
    ],
    matchTargets: [
      { id: 'baslangic', prompt: 'Milli Mücadelenin başladığı yer', answer: 'samsun' },
      { id: 'isim', prompt: 'Bayramın adı', answer: 'genclik' },
      { id: 'aksam', prompt: 'Akşam yapılan renkli yürüyüş', answer: 'fener' },
    ],
    memoryPairs: [
      { id: 'torch', icon: '🔥', label: 'Meşale' },
      { id: 'ball', icon: '🏀', label: 'Spor' },
      { id: 'ship', icon: '⛴️', label: 'Bandırma' },
    ],
    colorGrid: {
      palette: [
        { id: 'blue', label: 'Mavi', color: '#1d4ed8' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' },
        { id: 'orange', label: 'Turuncu', color: '#f97316' },
      ],
      target: [
        ['blue', 'white', 'blue'],
        ['white', 'orange', 'white'],
        ['blue', 'white', 'blue'],
      ],
      hint: 'Ortada turuncu ateş, etrafında mavi-beyaz halkalar oluştur.',
    },
    silhouetteGame: [
      { id: 'ship', icon: '⛴️', label: 'Gemi', color: '#1d4ed8' },
      { id: 'torch', icon: '🔥', label: 'Meşale', color: '#f97316' },
      { id: 'ball', icon: '🏀', label: 'Top', color: '#ea580c' },
    ],
    sortingGame: {
      categories: [
        { id: 'left', label: 'Spor İçin', icon: '🏃', color: '#10b981' },
        { id: 'right', label: 'Uyku İçin', icon: '🛌', color: '#6366f1' },
      ],
      items: [
        { id: 's1', label: 'Spor Ayakkabı', icon: '👟', category: 'left' },
        { id: 's2', label: 'Yastık', icon: '🛌', category: 'right' },
        { id: 's3', label: 'Eşofman', icon: '👕', category: 'left' },
        { id: 's4', label: 'Battaniye', icon: '🛏️', category: 'right' },
      ],
    },
    oddOneOutGame: {
      items: [
        { id: 'o1', icon: '⚽', isOdd: false },
        { id: 'o2', icon: '⚽', isOdd: false },
        { id: 'o3', icon: '⚽', isOdd: false },
        { id: 'o4', icon: '🍔', isOdd: true },
      ]
    },
    puzzlePieces: [
      { id: 'ship', label: 'Bandırma Gemisi', icon: '🚢', color: '#1d4ed8' },
      { id: 'torch', label: 'Meşale Ateşi', icon: '🔥', color: '#f97316' },
      { id: 'youth', label: 'Gençlik Adımı', icon: '👟', color: '#0ea5e9' },
      { id: 'banner', label: 'Ritmik Pankart', icon: '🎽', color: '#9333ea' },
    ],
    puzzleHint: 'Gemiyi yerleştir, meşaleyi yak, gençlik adımlarını ekle, pankartla tamamla.',
    rhythmActions: [
      { id: 'step', label: 'Adım at', icon: '🥾' },
      { id: 'torch', label: 'Meşale kaldır', icon: '🔥' },
      { id: 'whistle', label: 'Düdük çal', icon: '📣' },
    ],
    rhythmSequence: ['step', 'torch', 'step', 'whistle'],
    timeline: [
      { id: 'bayrak', label: 'Sabah bayrak töreni yapılır.' },
      { id: 'spor', label: 'Gün boyunca spor gösterileri izlenir.' },
      { id: 'fener', label: 'Akşam fener alayı yürüyüşüne katılırız.' },
    ],
    quiz: {
      question: '19 Mayıs bizlere neyi hatırlatır?',
      options: ['Milli Mücadelenin başlangıcını', 'Yaz tatilinin başladığını', 'Sadece bayrak sallamayı'],
      correctIndex: 0,
    },
    completionMessage: 'Gençlik bayramının ruhunu çok güzel yaşadın!'
  },
  'milli-30-agustos': {
    id: 'milli-30-agustos',
    intro:
      '30 Ağustos Zafer Bayramı, Büyük Taarruz\'un kazanıldığı gündür. Türk milleti bu zaferle özgürlüğünü kanıtladı.',
    videoId: 'PFSyAEqhp9I',
    prepHints: [
      'Videodaki kahramanlık hikayesini dikkatle dinle.',
      'Şehitlerimizi anmak için kısa bir sessizlik yap.',
      'Akşam yapılacak kutlamaları hayal et.'
    ],
    stepTitles: [
      'Hazırlık', 'Kelime Oyunu', 'Simgeleri Eşleştir', 'Hafıza Oyunu',
      'Boyama', 'Gölge Eşleştirme', 'Kategorileştirme', 'Kutlama İnşası',
      'Ritim', 'Günü Sırala', 'Farkı Bul', 'Mini Test', 'Kutlama'
    ],
    wordGame: {
      prompt: 'Bu büyük zaferin adını harflerle tamamla.',
      answer: 'ZAFER',
      letterPool: ['Z', 'A', 'F', 'E', 'R', 'L', 'K', 'O', 'U'],
    },
    matchItems: [
      { id: 'taarruz', label: 'Büyük Taarruz', badge: '⚔️' },
      { id: 'zafer', label: 'Zafer Bayramı', badge: '🏅' },
      { id: 'bayrak', label: 'Türk Bayrağı', badge: '🚩' },
    ],
    matchTargets: [
      { id: 'savas', prompt: '30 Ağustos’ta kazanılan muharebenin adı', answer: 'taarruz' },
      { id: 'isim', prompt: 'Günün adı', answer: 'zafer' },
      { id: 'sembol', prompt: 'Zaferin gururlu sembolü', answer: 'bayrak' },
    ],
    memoryPairs: [
      { id: 'shield', icon: '🛡️', label: 'Kalkan' },
      { id: 'medal', icon: '🎖️', label: 'Madalya' },
      { id: 'firework', icon: '🎆', label: 'Kutlama' },
    ],
    colorGrid: {
      palette: [
        { id: 'red', label: 'Kırmızı', color: '#ef4444' },
        { id: 'gold', label: 'Altın', color: '#f59e0b' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' },
      ],
      target: [
        ['red', 'gold', 'red'],
        ['gold', 'white', 'gold'],
        ['red', 'gold', 'red'],
      ],
      hint: 'Ortadaki beyaz ışığı altın çerçeveyle, dışını kırmızıyla tamamla.',
    },
    silhouetteGame: [
      { id: 'medal', icon: '🏅', label: 'Madalya', color: '#f59e0b' },
      { id: 'soldier', icon: '🪖', label: 'Asker', color: '#15803d' },
      { id: 'star', icon: '⭐', label: 'Yıldız', color: '#facc15' },
    ],
    sortingGame: {
      categories: [
        { id: 'left', label: 'Zafer İçin', icon: '🏆', color: '#f59e0b' },
        { id: 'right', label: 'Yemek İçin', icon: '🍔', color: '#ef4444' },
      ],
      items: [
        { id: 's1', label: 'Madalya', icon: '🏅', category: 'left' },
        { id: 's2', label: 'Hamburger', icon: '🍔', category: 'right' },
        { id: 's3', label: 'Kupa', icon: '🏆', category: 'left' },
        { id: 's4', label: 'Pizza', icon: '🍕', category: 'right' },
      ],
    },
    oddOneOutGame: {
      items: [
        { id: 'o1', icon: '🏅', isOdd: false },
        { id: 'o2', icon: '🏅', isOdd: false },
        { id: 'o3', icon: '🏅', isOdd: false },
        { id: 'o4', icon: '🧸', isOdd: true },
      ]
    },
    puzzlePieces: [
      { id: 'platform', label: 'Zafer Platformu', icon: '🏛️', color: '#b91c1c' },
      { id: 'hero', label: 'Komutan Heykeli', icon: '🪖', color: '#f97316' },
      { id: 'garland', label: 'Şeref Çelengi', icon: '🌿', color: '#22c55e' },
      { id: 'lights', label: 'Işık Gösterisi', icon: '🎆', color: '#facc15' },
    ],
    puzzleHint: 'Önce platformu kur, heykeli yerleştir, çelengini ekle, ışıklarla kutla.',
    rhythmActions: [
      { id: 'salute', label: 'Selam ver', icon: '🎖️' },
      { id: 'drum', label: 'Davula vur', icon: '🥁' },
      { id: 'flag', label: 'Bayrak salla', icon: '🚩' },
    ],
    rhythmSequence: ['salute', 'drum', 'flag', 'drum'],
    timeline: [
      { id: 'sehit', label: 'Sabah şehitlik ziyareti yapılır.' },
      { id: 'gecit', label: 'Öğlen resmî geçitler izlenir.' },
      { id: 'isikh', label: 'Akşam ışık ve havai fişek gösterileri olur.' },
    ],
    quiz: {
      question: '30 Ağustos Zafer Bayramı bize neyi hatırlatır?',
      options: ['Büyük Zaferi', 'Sadece tatili', 'Spor yarışlarını'],
      correctIndex: 0,
    },
    completionMessage: 'Zafer coşkusunu yüreğinde hissettin, tebrikler!'
  },
};

const cloneConfig = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export const loadCelebrationOverrides = (): Partial<CelebrationConfigMap> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.localStorage.getItem(CELEBRATION_OVERRIDE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as Partial<CelebrationConfigMap>;
  } catch (error) {
    console.error('Overrides okunamadı:', error);
    return {};
  }
};

export const saveCelebrationOverrides = (overrides: Partial<CelebrationConfigMap>) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CELEBRATION_OVERRIDE_KEY, JSON.stringify(overrides));
  } catch (error) {
    console.error('Overrides kaydedilemedi:', error);
  }
};

export const getCelebrationConfig = (levelId: string): CelebrationConfig => {
  const base = baseCelebrationConfigs[levelId];
  if (!base) {
    throw new Error(`Bilinmeyen kutlama seviyesi: ${levelId}`);
  }
  const overrides = loadCelebrationOverrides();
  const override = overrides[levelId];
  return cloneConfig(override ?? base);
};

export const getCelebrationConfigMap = (): CelebrationConfigMap => {
  const overrides = loadCelebrationOverrides();
  const entries = Object.entries(baseCelebrationConfigs).map(([id, base]) => [
    id,
    cloneConfig(overrides[id] ?? base)
  ] as const);
  return Object.fromEntries(entries) as CelebrationConfigMap;
};

export const updateCelebrationOverride = (levelId: string, config: CelebrationConfig | null) => {
  const overrides = { ...loadCelebrationOverrides() };
  if (config) {
    overrides[levelId] = cloneConfig(config);
  } else {
    delete overrides[levelId];
  }
  saveCelebrationOverrides(overrides);
};
