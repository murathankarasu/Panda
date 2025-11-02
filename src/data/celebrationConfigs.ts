import { CelebrationConfig, CelebrationConfigMap } from '../types/celebration';

export const CELEBRATION_OVERRIDE_KEY = 'celebration_config_overrides';

export const baseCelebrationConfigs: CelebrationConfigMap = {
  'milli-29-ekim': {
    intro:
      '29 Ekim 1923’te Türkiye Cumhuriyeti ilan edildi. Bu özel günü özgürlüğümüzü ve birlikte yaşamayı hatırlamak için kutluyoruz.',
    videoId: 'u2lm7MSh7Wk',
    prepHints: [
      'Videodaki marşı ailecek söylemeye çalış.',
      'Bayrağını hazırla, birlikte sallayın.',
      'Kutlama için “Hazırım” dediğinde başlıyoruz!'
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
    intro:
      '23 Nisan 1920’de Türkiye Büyük Millet Meclisi açıldı. Atatürk bu günü tüm çocuklara armağan etti.',
    videoId: 'EjCqEMqPgeE',
    prepHints: [
      'Videodaki şarkıya eşlik et.',
      'Sınıfını veya evini balonlarla hayal et.',
      'Ailenle birlikte bayrağını hazırlamayı unutma.'
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
    intro:
      '19 Mayıs 1919’da Atatürk Samsun’a çıkarak Milli Mücadeleyi başlattı. Bu gün gençlere armağan edildi.',
    videoId: 'fatwAQWFZYI',
    prepHints: [
      'Videodaki ritimle ayağa kalkıp hareket et.',
      'Spor yaparken hangi hareketleri sevdiğini paylaş.',
      'Akşam yapılacak fener alayını hayal et.'
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
    intro:
      '30 Ağustos Zafer Bayramı, Büyük Taarruz’un kazanıldığı gündür. Türk milleti bu zaferle özgürlüğünü kanıtladı.',
    videoId: 'PFSyAEqhp9I',
    prepHints: [
      'Videodaki kahramanlık hikayesini dikkatle dinle.',
      'Şehitlerimizi anmak için kısa bir sessizlik yap.',
      'Akşam yapılacak kutlamaları hayal et.'
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
  'dini-ramazan': {
    intro:
      'Ramazan Bayramı paylaşma ve sevinç zamanıdır. Oruçtan sonra kalplerimizi iyilikle doldururuz.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Videodaki ilahiyi dinle, ritmiyle elini hafifçe vur.',
      'İftar sofrasında neler olacağını hayal et.',
      'Bayramlaşma için “Hazırım” de ve başlayalım.'
    ],
    stepTitles: [
      'Hazırlık',
      'Kelime Hazinesi',
      'Değerleri Eşleştir',
      'Anımsama Kartları',
      'Deseni Boya',
      'Bayram Sofrası',
      'Ritimli Bayramlaşma',
      'Günü Planla',
      'Mini Test',
      'Bayramlaşma'
    ],
    wordGame: {
      prompt: 'Bayramın adını harfleri doğru sıraya dizerek tamamla.',
      answer: 'RAMAZAN',
      letterPool: ['R', 'A', 'M', 'A', 'Z', 'A', 'N', 'L', 'I', 'K', 'E', 'Ş']
    },
    matchItems: [
      { id: 'sahur', label: 'Sahur Vakti', badge: '🌙' },
      { id: 'iftar', label: 'İftar Sofrası', badge: '🍽️' },
      { id: 'fitre', label: 'Fitre Paylaşımı', badge: '🎁' }
    ],
    matchTargets: [
      { id: 'gece', prompt: 'Gece erken kalkıp yapılan hazırlık', answer: 'sahur' },
      { id: 'aksam', prompt: 'Günün sonunda paylaşılan soframız', answer: 'iftar' },
      { id: 'yardim', prompt: 'İhtiyaç sahiplerine verilen armağan', answer: 'fitre' }
    ],
    memoryPairs: [
      { id: 'lantern', icon: '🕯️', label: 'Fener' },
      { id: 'mescid', icon: '🕌', label: 'Mescid' },
      { id: 'misvak', icon: '🌿', label: 'Misvak' }
    ],
    colorGrid: {
      palette: [
        { id: 'green', label: 'Yeşil', color: '#15803d' },
        { id: 'gold', label: 'Altın', color: '#f59e0b' },
        { id: 'cream', label: 'Krem', color: '#f5f5dc' }
      ],
      target: [
        ['green', 'gold', 'green'],
        ['gold', 'cream', 'gold'],
        ['green', 'gold', 'green']
      ],
      hint: 'Yeşil hilali çerçevele, ortasında krem ışık ve altın süsler olsun.'
    },
    puzzlePieces: [
      { id: 'table', label: 'İftar Sofrası', icon: '🍽️', color: '#a855f7' },
      { id: 'lantern', label: 'Ramazan Feneri', icon: '🕯️', color: '#f97316' },
      { id: 'dates', label: 'Hurma Tabağı', icon: '🌰', color: '#b45309' },
      { id: 'gift', label: 'Şeker Kutusu', icon: '🍬', color: '#facc15' }
    ],
    puzzleHint: 'Sofrayı kur, feneri yak, hurmaları yerleştir ve şeker kutusunu hazırla.',
    rhythmActions: [
      { id: 'takbir', label: 'Tekbiri söyle', icon: '🕌' },
      { id: 'lantern', label: 'Fener yak', icon: '🕯️' },
      { id: 'share', label: 'İkram et', icon: '🍬' }
    ],
    rhythmSequence: ['takbir', 'lantern', 'share', 'takbir'],
    timeline: [
      { id: 'sahur', label: 'Sahurda uyanırız.' },
      { id: 'namaz', label: 'Bayram namazını kılar, dua ederiz.' },
      { id: 'ziyaret', label: 'Aile ziyaretleriyle bayramlaşırız.' }
    ],
    quiz: {
      question: 'Ramazan Bayramı sabahı ilk yaptığımız şey nedir?',
      options: ['Bayram namazına gitmek', 'Gece oyun oynamak', 'Uyuyakalmak'],
      correctIndex: 0
    },
    completionMessage: 'Ramazan Bayramı paylaşımını harika anlattın!'
  },
  'dini-kurban': {
    intro:
      'Kurban Bayramı paylaşmanın ve yardımlaşmanın bayramıdır. Kurban eti dostlarla ve ihtiyaç sahipleriyle paylaşılır.',
    videoId: 'Sj31ud_iWjk',
    prepHints: [
      'Videodaki marşı ritimle dinle.',
      'Bayram sabahı camideki tekbirleri hayal et.',
      'Paylaşacağın nimetleri düşün ve “Hazırım” de.'
    ],
    stepTitles: [
      'Hazırlık',
      'Kelime Hazinesi',
      'Paylaşımı Eşleştir',
      'Hafıza Kartları',
      'Deseni Boya',
      'Bayram Sofrası',
      'Ritimli Tekbir',
      'Günü Planla',
      'Mini Test',
      'Bayramlaşma'
    ],
    wordGame: {
      prompt: 'Bayramın adını harfleri sıralayarak tamamla.',
      answer: 'KURBAN',
      letterPool: ['K', 'U', 'R', 'B', 'A', 'N', 'E', 'T', 'İ', 'S', 'L', 'M']
    },
    matchItems: [
      { id: 'namaz', label: 'Bayram Namazı', badge: '🕌' },
      { id: 'paylas', label: 'Kurban Paylaşımı', badge: '🎁' },
      { id: 'takbir', label: 'Tekbir Getirmek', badge: '📿' }
    ],
    matchTargets: [
      { id: 'sabah', prompt: 'Bayram sabahı ilk yapılır', answer: 'namaz' },
      { id: 'duygu', prompt: 'Allah’a şükür niyetiyle söylenen söz', answer: 'takbir' },
      { id: 'yardim', prompt: 'Etleri paylaştığımız güzel davranış', answer: 'paylas' }
    ],
    memoryPairs: [
      { id: 'sheep', icon: '🐑', label: 'Koyun' },
      { id: 'salt', icon: '🧂', label: 'Hazırlık Baharatı' },
      { id: 'caldron', icon: '🍲', label: 'Kavurma Tenceresi' }
    ],
    colorGrid: {
      palette: [
        { id: 'green', label: 'Yeşil', color: '#166534' },
        { id: 'brown', label: 'Kahverengi', color: '#92400e' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' }
      ],
      target: [
        ['green', 'white', 'green'],
        ['white', 'brown', 'white'],
        ['green', 'white', 'green']
      ],
      hint: 'Yeşil alanı çevrele, ortasına beyaz yol ve kahverengi paylaşım kazanı yerleştir.'
    },
    puzzlePieces: [
      { id: 'field', label: 'Bayram Alanı', icon: '🌾', color: '#16a34a' },
      { id: 'cami', label: 'Cami Avlusu', icon: '🕌', color: '#2563eb' },
      { id: 'basket', label: 'Paylaşım Sepeti', icon: '🧺', color: '#d97706' },
      { id: 'stew', label: 'Kavurma Kazanı', icon: '🍲', color: '#a16207' }
    ],
    puzzleHint: 'Önce alanı kur, camiyi yerleştir, paylaşım sepetini hazırla ve kavurma kazanıyla tamamla.',
    rhythmActions: [
      { id: 'takbir', label: 'Tekbir söyle', icon: '📿' },
      { id: 'share', label: 'Et paylaştır', icon: '🧺' },
      { id: 'gratitude', label: 'Şükret', icon: '🌟' }
    ],
    rhythmSequence: ['takbir', 'share', 'takbir', 'gratitude'],
    timeline: [
      { id: 'namaz', label: 'Sabah bayram namazına gideriz.' },
      { id: 'kurban', label: 'Kurbanımızı keser ve paylaşırız.' },
      { id: 'ziyaret', label: 'Komşularla bayramlaşır, ikram ederiz.' }
    ],
    quiz: {
      question: 'Kurban Bayramı’nda etleri ne yaparız?',
      options: ['Paylaşırız', 'Saklarız', 'Atarız'],
      correctIndex: 0
    },
    completionMessage: 'Kurban Bayramı’nın paylaşım ruhunu çok güzel anlattın!'
  },
  'kandil-mevlid': {
    intro:
      'Mevlid Kandili, Peygamberimizin doğumunu hatırladığımız, sevgi ve paylaşmanın arttığı özel bir gecedir.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Sakin bir müzik açıp mum ışığını hayal et.',
      'Ailenle birlikte “Hoş geldin ya Resul” demeye hazırlan.',
      'Ziyaret edeceğin kişileri düşün ve bir dua seç.'
    ],
    stepTitles: [
      'Hazırlık',
      'Kelime Hazinesi',
      'Değerleri Eşleştir',
      'Anımsama Kartları',
      'Işık Deseni',
      'Kandil Sofrası',
      'Ritimli Dua',
      'Günü Planla',
      'Mini Test',
      'Kandil Sevinci'
    ],
    wordGame: {
      prompt: 'Kandilimizin adını harfleri sırala.',
      answer: 'MEVLID',
      letterPool: ['M', 'E', 'V', 'L', 'I', 'D', 'A', 'K', 'N', 'S', 'R', 'O']
    },
    matchItems: [
      { id: 'mevlid', label: 'Mevlid Kandili', badge: '🕌' },
      { id: 'dua', label: 'Dua Etmek', badge: '📿' },
      { id: 'simid', label: 'Kandil Simidi', badge: '🍪' }
    ],
    matchTargets: [
      { id: 'gece', prompt: 'Peygamberimizin doğumunu hatırladığımız gece', answer: 'mevlid' },
      { id: 'ibadet', prompt: 'Kalpten söylenen güzel sözler', answer: 'dua' },
      { id: 'ikram', prompt: 'Komşulara paylaşılan tatlı', answer: 'simid' }
    ],
    memoryPairs: [
      { id: 'lantern', icon: '🕯️', label: 'Mum Işığı' },
      { id: 'book', icon: '📖', label: 'Mevlid Kitabı' },
      { id: 'rose', icon: '🌹', label: 'Gül Kokusu' }
    ],
    colorGrid: {
      palette: [
        { id: 'navy', label: 'Gece Mavisi', color: '#1e3a8a' },
        { id: 'gold', label: 'Altın', color: '#f59e0b' },
        { id: 'cream', label: 'Krem', color: '#f5f5dc' }
      ],
      target: [
        ['navy', 'gold', 'navy'],
        ['gold', 'cream', 'gold'],
        ['navy', 'gold', 'navy']
      ],
      hint: 'Gece mavisini çerçeve yap, ortada krem ışık ve altın parıltılar bırak.'
    },
    puzzlePieces: [
      { id: 'mosque', label: 'Mescid Silueti', icon: '🕌', color: '#1d4ed8' },
      { id: 'lantern', label: 'Kandil Feneri', icon: '🕯️', color: '#f97316' },
      { id: 'plate', label: 'Simid Tabağı', icon: '🍪', color: '#d97706' },
      { id: 'letter', label: 'Dua Zarfı', icon: '✉️', color: '#0ea5e9' }
    ],
    puzzleHint: 'Önce mescidi çiz, kandil fenerini as, simit tabağını yerleştir ve dua zarfını ekle.',
    rhythmActions: [
      { id: 'takbir', label: 'Tekbir getir', icon: '📿' },
      { id: 'lantern', label: 'Feneri yak', icon: '🕯️' },
      { id: 'salawat', label: 'Salavat getir', icon: '🌟' }
    ],
    rhythmSequence: ['takbir', 'lantern', 'salawat', 'takbir'],
    timeline: [
      { id: 'hazirlik', label: 'Akşam kandil simidi hazırlanır.' },
      { id: 'dua', label: 'Gece dua edilir, salavat getirilir.' },
      { id: 'ziyaret', label: 'Komşulara kandil simidi ikram edilir.' }
    ],
    quiz: {
      question: 'Mevlid Kandili’nde neyi hatırlarız?',
      options: ['Peygamberimizin doğumunu', 'Sadece tatili', 'Yaz tatilini'],
      correctIndex: 0
    },
    completionMessage: 'Mevlid Kandili’nin sevgisini kalbinde taşıdın, ne güzel!'
  },
  'kandil-regaip': {
    intro:
      'Regaip Kandili rahmet ve bereket gecesidir. Dualarla ve paylaşmayla kalbimizi güzelleştiririz.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Bereketi simgeleyen buğday tanelerini düşün.',
      'Bir dileğini güzelce dile getirmeyi planla.',
      'Sevdiklerine göndereceğin mesajı hazırlayalım.'
    ],
    wordGame: {
      prompt: 'Bereket gecesinin adını tamamla.',
      answer: 'REGAIP',
      letterPool: ['R', 'E', 'G', 'A', 'I', 'P', 'B', 'K', 'L', 'S', 'N', 'U']
    },
    matchItems: [
      { id: 'regaip', label: 'Regaip Kandili', badge: '🌙' },
      { id: 'tesbih', label: 'Tesbih', badge: '📿' },
      { id: 'ikram', label: 'Tatlı Paylaşımı', badge: '🍯' }
    ],
    matchTargets: [
      { id: 'gece', prompt: 'Üç ayların ilk kandili', answer: 'regaip' },
      { id: 'zikir', prompt: 'Dualarda parmaklarımızda olur', answer: 'tesbih' },
      { id: 'paylas', prompt: 'Komşularla paylaşılan ikram', answer: 'ikram' }
    ],
    memoryPairs: [
      { id: 'wheat', icon: '🌾', label: 'Buğday' },
      { id: 'drops', icon: '💧', label: 'Rahmet' },
      { id: 'moon', icon: '🌙', label: 'Hilal' }
    ],
    colorGrid: {
      palette: [
        { id: 'emerald', label: 'Zümrüt', color: '#047857' },
        { id: 'amber', label: 'Kehribar', color: '#fbbf24' },
        { id: 'silver', label: 'Gümüş', color: '#e5e7eb' }
      ],
      target: [
        ['emerald', 'amber', 'emerald'],
        ['amber', 'silver', 'amber'],
        ['emerald', 'amber', 'emerald']
      ],
      hint: 'Zümrüt çember yap, ortada gümüş parıltı ve kehribar damlaları bırak.'
    },
    puzzlePieces: [
      { id: 'courtyard', label: 'Cami Avlusu', icon: '🕌', color: '#0f766e' },
      { id: 'tray', label: 'Tatlı Tepsisi', icon: '🍯', color: '#f59e0b' },
      { id: 'pitcher', label: 'Şerbet İbriki', icon: '🫗', color: '#f97316' },
      { id: 'letter', label: 'Dilek Kartı', icon: '📜', color: '#10b981' }
    ],
    puzzleHint: 'Avluyu hazırla, tatlı tepsisini ve şerbeti koy, en üste dilek kartını yerleştir.',
    rhythmActions: [
      { id: 'dua', label: 'Dua et', icon: '📿' },
      { id: 'share', label: 'İkram götür', icon: '🍯' },
      { id: 'shine', label: 'Fener yak', icon: '🕯️' }
    ],
    rhythmSequence: ['dua', 'share', 'shine', 'dua'],
    timeline: [
      { id: 'hazirlik', label: 'Akşam ikramlar hazırlanır.' },
      { id: 'zikir', label: 'Tesbih ve dualar edilir.' },
      { id: 'ikram', label: 'Komşulara tatlılar götürülür.' }
    ],
    quiz: {
      question: 'Regaip Kandili’nin diğer adı nedir?',
      options: ['Bereket gecesi', 'Sadece tatil', 'Yaz şenliği'],
      correctIndex: 0
    },
    completionMessage: 'Bereketli Regaip gecesini harika anlattın.'
  },
  'kandil-mirac': {
    intro:
      'Miraç Kandili, Peygamberimizin göğe yükseldiği mucizeyi hatırladığımız özel gecedir.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Gökyüzündeki yıldızları düşün ve üç dilek seç.',
      'Seccadeni hayal edip dua edeceğin anı planla.',
      'Ailenle paylaşacağın güzel sözü belirle.'
    ],
    wordGame: {
      prompt: 'Bu mucizevi gecenin adını tamamla.',
      answer: 'MIRAC',
      letterPool: ['M', 'I', 'R', 'A', 'C', 'N', 'L', 'H', 'Z', 'K', 'S', 'T']
    },
    matchItems: [
      { id: 'mirac', label: 'Miraç Gecesi', badge: '🌌' },
      { id: 'seccade', label: 'Seccade', badge: '🧿' },
      { id: 'dua', label: 'Dua', badge: '📿' }
    ],
    matchTargets: [
      { id: 'mucize', prompt: 'Peygamberimizin göğe yükseldiği gece', answer: 'mirac' },
      { id: 'yer', prompt: 'Dua ederken serilir', answer: 'seccade' },
      { id: 'sozcuk', prompt: 'Kalpten söylenen sözler', answer: 'dua' }
    ],
    memoryPairs: [
      { id: 'star', icon: '⭐', label: 'Yıldız' },
      { id: 'ladder', icon: '🪜', label: 'Merdiven' },
      { id: 'cloud', icon: '☁️', label: 'Bulut' }
    ],
    colorGrid: {
      palette: [
        { id: 'indigo', label: 'Gece İndigosu', color: '#3730a3' },
        { id: 'starlight', label: 'Yıldız Işığı', color: '#facc15' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' }
      ],
      target: [
        ['indigo', 'starlight', 'indigo'],
        ['starlight', 'white', 'starlight'],
        ['indigo', 'starlight', 'indigo']
      ],
      hint: 'İndigo gökyüzü çiz, ortada beyaz parıltı ve yıldız ışıkları olsun.'
    },
    puzzlePieces: [
      { id: 'stairs', label: 'Miraç Merdiveni', icon: '🪜', color: '#4c1d95' },
      { id: 'light', label: 'Nur Işığı', icon: '✨', color: '#facc15' },
      { id: 'cloud', label: 'Bulut Perdesi', icon: '☁️', color: '#38bdf8' },
      { id: 'prayer', label: 'Dua Kitabı', icon: '📖', color: '#f97316' }
    ],
    puzzleHint: 'Merdiveni yerleştir, nur ışığını ekle, bulut perdesini çek ve dua kitabını üstte aç.',
    rhythmActions: [
      { id: 'takbir', label: 'Tekbir getir', icon: '📿' },
      { id: 'look', label: 'Yıldızlara bak', icon: '🔭' },
      { id: 'shine', label: 'Nur saç', icon: '✨' }
    ],
    rhythmSequence: ['takbir', 'look', 'shine', 'takbir'],
    timeline: [
      { id: 'hazirlik', label: 'Akşam seccade hazırlanır.' },
      { id: 'dua', label: 'Gece dua edilir, Miraç anlatılır.' },
      { id: 'ikram', label: 'Ertesi gün aileyle paylaşım yapılır.' }
    ],
    quiz: {
      question: 'Miraç gecesi neyi hatırlarız?',
      options: ['Peygamberimizin göğe yükselişini', 'Sadece tatili', 'Deniz kenarını'],
      correctIndex: 0
    },
    completionMessage: 'Miraç Kandili’nin ışığını paylaştın, teşekkürler.'
  },
  'kandil-berat': {
    intro:
      'Berat Kandili, affedilme ve temiz sayfalar açma gecesidir. Dualarla kalbimizi yenileriz.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Yeni bir sayfa açtığını hayal et.',
      'Kendine ve sevdiklerine teşekkür etmeyi planla.',
      'Paylaşacağın kandil notunu hazırla.'
    ],
    wordGame: {
      prompt: 'Temiz sayfalar gecesinin adını yaz.',
      answer: 'BERAT',
      letterPool: ['B', 'E', 'R', 'A', 'T', 'N', 'L', 'V', 'K', 'S', 'D', 'I']
    },
    matchItems: [
      { id: 'berat', label: 'Berat Gecesi', badge: '📜' },
      { id: 'tesbih', label: 'Tesbih', badge: '📿' },
      { id: 'ikram', label: 'Helva Paylaşımı', badge: '🍮' }
    ],
    matchTargets: [
      { id: 'gece', prompt: 'Kalplerin temizlendiği gece', answer: 'berat' },
      { id: 'zikir', prompt: 'Dua ederken avuçlarda tutulur', answer: 'tesbih' },
      { id: 'paylas', prompt: 'Komşulara ikram edilen tatlı', answer: 'ikram' }
    ],
    memoryPairs: [
      { id: 'feather', icon: '🪶', label: 'Temiz Sayfa' },
      { id: 'olive', icon: '🫒', label: 'Bereket Yağı' },
      { id: 'moon', icon: '🌙', label: 'Hilal' }
    ],
    colorGrid: {
      palette: [
        { id: 'teal', label: 'Teal', color: '#0f766e' },
        { id: 'white', label: 'Beyaz', color: '#ffffff' },
        { id: 'amber', label: 'Kehribar', color: '#f59e0b' }
      ],
      target: [
        ['teal', 'white', 'teal'],
        ['white', 'amber', 'white'],
        ['teal', 'white', 'teal']
      ],
      hint: 'Teal çerçeve çiz, ortada beyaz sayfa ve kehribar ışık olsun.'
    },
    puzzlePieces: [
      { id: 'paper', label: 'Yeni Sayfa', icon: '📜', color: '#fcd34d' },
      { id: 'lamp', label: 'Kandil Lambası', icon: '🪔', color: '#fb7185' },
      { id: 'plate', label: 'Helva Tabağı', icon: '🍮', color: '#d97706' },
      { id: 'tesbih', label: 'Tesbih Halkası', icon: '📿', color: '#14b8a6' }
    ],
    puzzleHint: 'Önce yeni sayfayı aç, lambayı yak, helva tabağını koy ve tesbihi yanına yerleştir.',
    rhythmActions: [
      { id: 'dua', label: 'Dua et', icon: '📿' },
      { id: 'write', label: 'Niyet yaz', icon: '🖋️' },
      { id: 'share', label: 'Helva ikram et', icon: '🍮' }
    ],
    rhythmSequence: ['dua', 'write', 'share', 'dua'],
    timeline: [
      { id: 'hazirlik', label: 'Akşam tatlı hazırlanır.' },
      { id: 'dua', label: 'Gece dualar edilir.' },
      { id: 'ikram', label: 'Komşularla helva paylaşılır.' }
    ],
    quiz: {
      question: 'Berat Kandili’nde neyi hatırlarız?',
      options: ['Kalplerin temizlenmesini', 'Sadece oyun oynamayı', 'Deniz kutlamasını'],
      correctIndex: 0
    },
    completionMessage: 'Berat Kandili’nin huzurunu anlattın, çok güzel!'
  },
  'gunler-kadir': {
    intro:
      'Kadir Gecesi, bin aydan hayırlı olan gecedir. Kur’an’ın indirildiği bu gece dualarla değerlendirilir.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Kur’an okunurken duyduğun sesleri hayal et.',
      'Seccadeni ve mushafını zihninde hazırla.',
      'Ailenle birlikte yapacağın duası düşün.'
    ],
    stepTitles: [
      'Hazırlık',
      'Kelime Hazinesi',
      'Değerleri Eşleştir',
      'Anımsama Kartları',
      'Işık Deseni',
      'Kadir Sofrası',
      'Ritimli Dua',
      'Günü Planla',
      'Mini Test',
      'Bayramlaşma'
    ],
    wordGame: {
      prompt: 'Bu özel gecenin adını tamamla.',
      answer: 'KADIR',
      letterPool: ['K', 'A', 'D', 'I', 'R', 'L', 'M', 'N', 'S', 'E', 'T', 'H']
    },
    matchItems: [
      { id: 'kadir', label: 'Kadir Gecesi', badge: '🌌' },
      { id: 'kuran', label: 'Kur’an-ı Kerim', badge: '📖' },
      { id: 'dua', label: 'Dua', badge: '📿' }
    ],
    matchTargets: [
      { id: 'gece', prompt: 'Bin aydan hayırlı gece', answer: 'kadir' },
      { id: 'kitap', prompt: 'Bu gecede indirilen kitap', answer: 'kuran' },
      { id: 'ibadet', prompt: 'Kalpten söylenen sözler', answer: 'dua' }
    ],
    memoryPairs: [
      { id: 'moon', icon: '🌙', label: 'Hilal' },
      { id: 'star', icon: '🌟', label: 'Yıldız' },
      { id: 'book', icon: '📖', label: 'Kur’an' }
    ],
    colorGrid: {
      palette: [
        { id: 'midnight', label: 'Gece', color: '#0f172a' },
        { id: 'gold', label: 'Altın', color: '#facc15' },
        { id: 'silver', label: 'Gümüş', color: '#e2e8f0' }
      ],
      target: [
        ['midnight', 'gold', 'midnight'],
        ['gold', 'silver', 'gold'],
        ['midnight', 'gold', 'midnight']
      ],
      hint: 'Geceyi çevrele, ortada gümüş sayfa ve altın yıldızlar olsun.'
    },
    puzzlePieces: [
      { id: 'seccade', label: 'Seccade', icon: '🧿', color: '#2563eb' },
      { id: 'book', label: 'Kur’an-ı Kerim', icon: '📖', color: '#f97316' },
      { id: 'lamp', label: 'Kandil Işığı', icon: '🪔', color: '#facc15' },
      { id: 'dates', label: 'İkram Tabağı', icon: '🍯', color: '#d97706' }
    ],
    puzzleHint: 'Seccadeyi ser, Kur’anı aç, kandili yak ve ikram tabağını hazırla.',
    rhythmActions: [
      { id: 'takbir', label: 'Tekbir getir', icon: '📿' },
      { id: 'recite', label: 'Kur’an oku', icon: '📖' },
      { id: 'light', label: 'Fener yak', icon: '🪔' }
    ],
    rhythmSequence: ['takbir', 'recite', 'takbir', 'light'],
    timeline: [
      { id: 'hazirlik', label: 'Akşam Kur’an tilaveti için hazırlanırız.' },
      { id: 'dua', label: 'Gece dua eder, Kur’an okuruz.' },
      { id: 'ikram', label: 'Sevdiklerimizle ikram paylaşırız.' }
    ],
    quiz: {
      question: 'Kadir Gecesi neden değerlidir?',
      options: ['Kur’an bu gecede indirildiği için', 'Sadece yaz tatili olduğu için', 'Çok oyun oynandığı için'],
      correctIndex: 0
    },
    completionMessage: 'Kadir Gecesi’ni anlamlı hale getirdin, tebrikler!'
  },
  'gunler-asure': {
    intro:
      'Aşure Günü paylaşmanın tatlı halidir. Çeşitli malzemeler bir araya gelerek bereketli bir tatlı oluşturur.',
    videoId: 'imkRtNN_0Bw',
    prepHints: [
      'Aşure kazanın kokusunu hayal et.',
      'Hangi malzemeleri ekleyeceğini sırala.',
      'Komşularına kimlere götüreceğini düşün.'
    ],
    wordGame: {
      prompt: 'Tatlımızın adını harflerle tamamla.',
      answer: 'ASURE',
      letterPool: ['A', 'S', 'U', 'R', 'E', 'L', 'M', 'K', 'N', 'I', 'T', 'B']
    },
    matchItems: [
      { id: 'asure', label: 'Aşure Tatlısı', badge: '🍲' },
      { id: 'paylas', label: 'Komşuya İkram', badge: '🧺' },
      { id: 'malzeme', label: 'Çoklu Malzeme', badge: '🫘' }
    ],
    matchTargets: [
      { id: 'tatli', prompt: 'Farklı malzemelerin birleştiği tatlı', answer: 'asure' },
      { id: 'komsu', prompt: 'Paylaşılan ikram', answer: 'paylas' },
      { id: 'bereket', prompt: 'Bu tatlıyı özel kılan çeşitlilik', answer: 'malzeme' }
    ],
    memoryPairs: [
      { id: 'wheat', icon: '🌾', label: 'Buğday' },
      { id: 'sugar', icon: '🧂', label: 'Şeker' },
      { id: 'apricot', icon: '🍑', label: 'Kuru Kayısı' }
    ],
    colorGrid: {
      palette: [
        { id: 'clay', label: 'Toprak', color: '#92400e' },
        { id: 'cream', label: 'Krem', color: '#f5f5dc' },
        { id: 'cranberry', label: 'Kızıl', color: '#b91c1c' }
      ],
      target: [
        ['clay', 'cream', 'clay'],
        ['cream', 'cranberry', 'cream'],
        ['clay', 'cream', 'clay']
      ],
      hint: 'Toprak rengi kaseyi çiz, ortada krem tatlı ve kızıl taneler olsun.'
    },
    puzzlePieces: [
      { id: 'pot', label: 'Aşure Kazanı', icon: '🍯', color: '#ca8a04' },
      { id: 'ladle', label: 'Kepçe', icon: '🥄', color: '#9ca3af' },
      { id: 'tray', label: 'İkram Tepsisi', icon: '🧺', color: '#d97706' },
      { id: 'spice', label: 'Tarçın Serpici', icon: '🧂', color: '#a855f7' }
    ],
    puzzleHint: 'Kazanın altını yak, kepçeyi hazırla, tepsiye doldur ve tarçın serpiştir.',
    rhythmActions: [
      { id: 'mix', label: 'Malzemeleri karıştır', icon: '🥄' },
      { id: 'taste', label: 'Tat kontrolü', icon: '🍯' },
      { id: 'share', label: 'Komşuya götür', icon: '🧺' }
    ],
    rhythmSequence: ['mix', 'mix', 'taste', 'share'],
    timeline: [
      { id: 'hazirlik', label: 'Sabah malzemeler hazırlanır.' },
      { id: 'pisirme', label: 'Kazan kaynar, aşure pişer.' },
      { id: 'paylas', label: 'Kaseler komşulara dağıtılır.' }
    ],
    quiz: {
      question: 'Aşure gününde tatlıyı ne yaparız?',
      options: ['Komşularla paylaşırız', 'Saklar kimseye vermeyiz', 'Sadece fotoğraf çekeriz'],
      correctIndex: 0
    },
    completionMessage: 'Aşure Günü’nün tatlı paylaşımını anlattın, eline sağlık!'
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
