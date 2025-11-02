import { LevelContent } from '../types';

export const levelContent: Record<string, LevelContent> = {
  'milli-29-ekim': {
    levelId: 'milli-29-ekim',
    story:
      '29 Ekim 1923’te Türkiye Cumhuriyeti kuruldu. O günden bu yana her 29 Ekim’de bayrağımızı sallayıp törenlere katılarak Cumhuriyet coşkusunu kutlarız. Atatürk’ün “Efendiler, yarın Cumhuriyeti ilan edeceğiz.” sözü bizlere özgürlüğümüzü ve birlikteliğimizi hatırlatır.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="260" text-anchor="middle" dominant-baseline="central">🇹🇷</text></svg>',
      alt: '29 Ekim Cumhuriyet Bayramı duygusunu anlatan emoji',
    },
    questions: [
      {
        id: 'm29-q1',
        type: 'image-choice',
        question: 'Cumhuriyet Bayramı neden kutlanır?',
        imageOptions: [
          {
            label: 'Cumhuriyet kuruldu',
            emoji: '🇹🇷',
            alt: 'Cumhuriyet Bayramı töreninde bayrak sallayan öğrenciler',
          },
          {
            label: 'Sadece havai fişek görmek için',
            emoji: '🎆',
            alt: 'Gece gökyüzünde havai fişekler',
          },
          {
            label: 'Doğum günü pastası kesmek için',
            emoji: '🎂',
            alt: 'Renkli mumlarla süslenmiş doğum günü pastası',
          },
        ],
        correctAnswer: 0,
        explanation: 'Cumhuriyet Bayramı, Türkiye Cumhuriyeti’nin kurulduğu günü kutladığımız özel gündür.',
        reward: '🇹🇷 15 Panda Puanı',
      },
      {
        id: 'm29-q2',
        type: 'image-choice',
        question: '29 Ekim’de nasıl kutlama yaparız?',
        imageOptions: [
          {
            label: 'Törende yürürüz',
            emoji: '🪧',
            alt: 'Tören yürüyüşü yapan öğrenciler',
          },
          {
            label: 'Havuza gideriz',
            emoji: '🏊',
            alt: 'Havuzda yüzen çocuk',
          },
          {
            label: 'Kütüphanede yalnız kalırız',
            emoji: '📚',
            alt: 'Sessizce kitap okuyan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Cumhuriyet Bayramı törenlerle, yürüyüşlerle ve coşkulu kutlamalarla yaşanır.',
        reward: '🥁 15 Panda Puanı',
      },
      {
        id: 'm29-q3',
        type: 'image-choice',
        question: 'Atatürk’ün “Efendiler yarın Cumhuriyeti ilan edeceğiz.” dediği anı seç!',
        imageOptions: [
          {
            label: 'Atatürk konuşuyor',
            emoji: '🗣️',
            alt: 'Atatürk kürsüde konuşma yaparken',
          },
          {
            label: 'Doğum günü eğlencesi',
            emoji: '🎈',
            alt: 'Balonlarla süslü doğum günü partisi',
          },
          {
            label: 'Sınıfta ders zamanı',
            emoji: '🧑‍🏫',
            alt: 'Tahtada yazı yazan öğretmen',
          },
        ],
        correctAnswer: 0,
        explanation: 'Atatürk’ün tarihi konuşması Cumhuriyetimizin ilanını müjdeler.',
        reward: '🗣️ 15 Panda Puanı',
      },
      {
        id: 'm29-q4',
        type: 'image-choice',
        question: 'Cumhuriyet Bayramı’nda yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: '😊',
            alt: 'Gülümseyen çocuk',
          },
          {
            label: 'Ağlarım',
            emoji: '😢',
            alt: 'Ağlayan çocuk',
          },
          {
            label: 'Somurturum',
            emoji: '😐',
            alt: 'Somurtan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayram coşkusu gülümsememize sebep olur.',
        reward: '😊 10 Panda Puanı',
      },
      {
        id: 'm29-q5',
        type: 'image-choice',
        question: '29 Ekim’de Türk bayrağını nasıl sallarsın?',
        imageOptions: [
          {
            label: 'Bayrağımı gururla sallarım',
            emoji: '🚩',
            alt: 'Türk bayrağı sallayan çocuk',
          },
          {
            label: 'Balon uçururum',
            emoji: '🎈',
            alt: 'Gökyüzüne balon bırakan çocuklar',
          },
          {
            label: 'Kitap okurum',
            emoji: '📖',
            alt: 'Kitap okuyan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayrağımızı sallamak Cumhuriyet coşkusunu göstermenin en güzel yollarından biridir.',
        reward: '🚩 10 Panda Puanı',
      },
      {
        id: 'm29-q6',
        type: 'image-choice',
        question: '29 Ekim’de yapılan resmi töreni seç!',
        imageOptions: [
          {
            label: 'Resmî geçit izlerim',
            emoji: '🎖️',
            alt: 'Resmî geçit yapan askerler',
          },
          {
            label: 'Piknik yaparım',
            emoji: '🧺',
            alt: 'Piknik yapan aile',
          },
          {
            label: 'Televizyon izlerim',
            emoji: '📺',
            alt: 'Televizyon karşısında oturan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Resmî geçitler ve törenler 29 Ekim coşkusunun bir parçasıdır.',
        reward: '🎖️ 15 Panda Puanı',
      },
    ],
  },
  'milli-23-nisan': {
    levelId: 'milli-23-nisan',
    story:
      '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı’nı Atatürk tüm çocuklara armağan etti. Türkiye Büyük Millet Meclisi’nin açılışını ve çocukların neşesini kutladığımız bu günde okullarımızda gösteriler yapılır, bayraklar sallanır.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="260" text-anchor="middle" dominant-baseline="central">🎈</text></svg>',
      alt: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı coşkusunu anlatan emoji',
    },
    questions: [
      {
        id: 'm23-q1',
        type: 'image-choice',
        question: '23 Nisan bayramını kim çocuklara armağan etti?',
        imageOptions: [
          {
            label: 'Atatürk',
            emoji: '🗣️',
            alt: 'Atatürk çocuklarla birlikte',
          },
          {
            label: 'Güneş',
            emoji: '☀️',
            alt: 'Gökyüzünde gülen güneş',
          },
          {
            label: 'Penguen',
            emoji: '🐧',
            alt: 'Kart üstünde penguen',
          },
        ],
        correctAnswer: 0,
        explanation: 'Atatürk, 23 Nisan’ı tüm dünya çocuklarına armağan etti.',
        reward: '🎁 15 Panda Puanı',
      },
      {
        id: 'm23-q2',
        type: 'image-choice',
        question: '23 Nisan’da neyi kutlarız?',
        imageOptions: [
          {
            label: 'TBMM’nin açılışını',
            emoji: '🏛️',
            alt: 'Türkiye Büyük Millet Meclisi’nin ilk binası',
          },
          {
            label: 'Lunapark açılışını',
            emoji: '🎡',
            alt: 'Lunaparkta dönen büyük salıncak',
          },
          {
            label: 'Pasta kesmeyi',
            emoji: '🎂',
            alt: 'Çilekli pasta',
          },
        ],
        correctAnswer: 0,
        explanation: '23 Nisan’da Türkiye Büyük Millet Meclisi’nin açılışını kutlarız.',
        reward: '🏛️ 15 Panda Puanı',
      },
      {
        id: 'm23-q3',
        type: 'image-choice',
        question: 'Okullarda 23 Nisan’ı nasıl kutlarız?',
        imageOptions: [
          {
            label: 'Sahnede gösteri yaparız',
            emoji: '🎤',
            alt: 'Sahnede dans eden öğrenciler',
          },
          {
            label: 'Sınıfta yalnız otururuz',
            emoji: '🧑‍🏫',
            alt: 'Boş sınıfta tek başına oturan çocuk',
          },
          {
            label: 'Uykuya dalarız',
            emoji: '😴',
            alt: 'Yastığına sarılan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: '23 Nisan’da okullarda sahne gösterileri ve şarkılarla kutlama yaparız.',
        reward: '🎤 10 Panda Puanı',
      },
      {
        id: 'm23-q4',
        type: 'image-choice',
        question: '23 Nisan’da çocuklara hediye edilen sevinci göster!',
        imageOptions: [
          {
            label: 'Dünyanın çocukları birlikte',
            emoji: '🌍',
            alt: 'Farklı ülkelerden çocuklar el ele',
          },
          {
            label: 'Sevimli kedi',
            emoji: '🐱',
            alt: 'Uykulu kedi',
          },
          {
            label: 'Yaramaz köpek',
            emoji: '🐶',
            alt: 'Koşan yavru köpek',
          },
        ],
        correctAnswer: 0,
        explanation: '23 Nisan tüm çocukların bayramıdır, mutlulukları paylaşılır.',
        reward: '🌍 15 Panda Puanı',
      },
      {
        id: 'm23-q5',
        type: 'image-choice',
        question: '23 Nisan’da yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Kocaman gülümserim',
            emoji: '😊',
            alt: 'Gülerek bayrak sallayan çocuklar',
          },
          {
            label: 'Canım sıkılır',
            emoji: '😒',
            alt: 'Üzgün çocuk',
          },
          {
            label: 'Hiç tepki vermem',
            emoji: '😶',
            alt: 'Somurtkan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: '23 Nisan coşkusu bizi güldürür ve sevindirir.',
        reward: '😄 10 Panda Puanı',
      },
    ],
  },
  'milli-19-mayis': {
    levelId: 'milli-19-mayis',
    story:
      '19 Mayıs 1919’da Atatürk Samsun’a çıktı ve Milli Mücadele başladı. Bu gün gençliğe armağan edildi. Spor gösterileri, marşlar ve gülümseyen yüzlerle 19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramı’nı kutlarız.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="260" text-anchor="middle" dominant-baseline="central">🏃</text></svg>',
      alt: '19 Mayıs Gençlik ve Spor Bayramı coşkusunu anlatan emoji',
    },
    questions: [
      {
        id: 'm19-q1',
        type: 'image-choice',
        question: '19 Mayıs neden kutlanır?',
        imageOptions: [
          {
            label: 'Atatürk’ün Samsun’a çıkışı',
            emoji: '🗣️',
            alt: 'Atatürk Samsun’da askerlerle birlikte',
          },
          {
            label: 'Lunapark açıldı',
            emoji: '🎡',
            alt: 'Lunaparktaki büyük salıncak',
          },
          {
            label: 'Pastayla kutlama',
            emoji: '🎂',
            alt: 'Çikolatalı pasta',
          },
        ],
        correctAnswer: 0,
        explanation: '19 Mayıs, Atatürk’ün Samsun’a çıkarak Milli Mücadeleyi başlatmasının yıldönümüdür.',
        reward: '🚢 15 Panda Puanı',
      },
      {
        id: 'm19-q2',
        type: 'image-choice',
        question: '19 Mayıs bayramı kime armağan edilmiştir?',
        imageOptions: [
          {
            label: 'Gençlere',
            emoji: '🏃',
            alt: 'Spor yapan gençler',
          },
          {
            label: 'Sadece öğretmenlere',
            emoji: '👩‍🏫',
            alt: 'Tahtada ders anlatan öğretmen',
          },
          {
            label: 'Minik kedilere',
            emoji: '🐱',
            alt: 'Küçük kedi',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramın adı Gençlik ve Spor Bayramıdır; Atatürk bu günü gençlere armağan etti.',
        reward: '🏀 15 Panda Puanı',
      },
      {
        id: 'm19-q3',
        type: 'image-choice',
        question: 'Okullarda 19 Mayıs’ı nasıl kutlarız?',
        imageOptions: [
          {
            label: 'Spor gösterisi yaparız',
            emoji: '🤸',
            alt: 'Sahada spor yapan öğrenciler',
          },
          {
            label: 'Sessizce otururuz',
            emoji: '😶',
            alt: 'Sınıfta oturan çocuk',
          },
          {
            label: 'Oyun konsolu oynarız',
            emoji: '🎮',
            alt: 'Oyun kolu',
          },
        ],
        correctAnswer: 0,
        explanation: '19 Mayıs’ta spor gösterileri ve gençlik etkinlikleri yapılır.',
        reward: '🤸 10 Panda Puanı',
      },
      {
        id: 'm19-q4',
        type: 'image-choice',
        question: '19 Mayıs’ta yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: '😊',
            alt: 'Gülümseyen genç',
          },
          {
            label: 'Somurturum',
            emoji: '😐',
            alt: 'Somurtan çocuk',
          },
          {
            label: 'Uyurum',
            emoji: '😴',
            alt: 'Uyuyan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: '19 Mayıs coşkusu bizi neşeyle gülümsetir.',
        reward: '😀 10 Panda Puanı',
      },
    ],
  },
  'milli-30-agustos': {
    levelId: 'milli-30-agustos',
    story:
      '30 Ağustos Zafer Bayramı, Büyük Taarruz’un kazanıldığı günü anlatır. Türk ordusunun cesareti ve Atatürk’ün önderliği sayesinde bağımsızlığımız pekişti. Bu günde törenler yapılır, bayraklar sallanır.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="260" text-anchor="middle" dominant-baseline="central">🛡️</text></svg>',
      alt: '30 Ağustos Zafer Bayramı gururunu anlatan emoji',
    },
    questions: [
      {
        id: 'm30-q1',
        type: 'image-choice',
        question: '30 Ağustos Zafer Bayramı neden kutlanır?',
        imageOptions: [
          {
            label: 'Büyük Zafer kazanıldı',
            emoji: '🏅',
            alt: 'Bayrağını tutan asker',
          },
          {
            label: 'Dondurma festivali var',
            emoji: '🍦',
            alt: 'Renkli dondurmalar',
          },
          {
            label: 'Kamp kurduk',
            emoji: '🏕️',
            alt: 'Kamp alanında çadır',
          },
        ],
        correctAnswer: 0,
        explanation: '30 Ağustos, Büyük Taarruz’un zaferle sonuçlandığı günü kutlarız.',
        reward: '🏅 15 Panda Puanı',
      },
      {
        id: 'm30-q2',
        type: 'image-choice',
        question: 'Zafer Bayramı’nda nasıl kutlama yapılır?',
        imageOptions: [
          {
            label: 'Resmî tören izleriz',
            emoji: '🪧',
            alt: 'Resmî geçit yapan askerler',
          },
          {
            label: 'Sahil kenarında yalnız otururuz',
            emoji: '😶',
            alt: 'Deniz kenarında tek başına oturan çocuk',
          },
          {
            label: 'Sessizce televizyon izleriz',
            emoji: '📺',
            alt: 'Televizyon karşısındaki çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Zafer Bayramı törenlerle ve resmî geçitlerle kutlanır.',
        reward: '🥁 10 Panda Puanı',
      },
      {
        id: 'm30-q3',
        type: 'image-choice',
        question: 'Zafer Bayramı kimlere armağan edilmiştir?',
        imageOptions: [
          {
            label: 'Askerlere ve millete',
            emoji: '🪖',
            alt: 'Selam veren askerler',
          },
          {
            label: 'Sadece kedilere',
            emoji: '🐱',
            alt: 'Uykulu kedi',
          },
          {
            label: 'Deniz kabuklarına',
            emoji: '🌊',
            alt: 'Renkli deniz kabukları',
          },
        ],
        correctAnswer: 0,
        explanation: 'Zafer Bayramı, kahraman askerlerimize ve milletimize armağandır.',
        reward: '🛡️ 15 Panda Puanı',
      },
      {
        id: 'm30-q4',
        type: 'image-choice',
        question: '30 Ağustos’ta yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: '😊',
            alt: 'Gülen çocuk',
          },
          {
            label: 'Kaşlarımı çatıp kızarım',
            emoji: '😡',
            alt: 'Kaşlarını çatmış çocuk',
          },
          {
            label: 'Uyumaya giderim',
            emoji: '🛏️',
            alt: 'Uyuyan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Zafer coşkusu bizi mutlu eder.',
        reward: '😀 10 Panda Puanı',
      },
      {
        id: 'm30-q5',
        type: 'image-choice',
        question: 'Türk bayrağını hangi şekilde sallarsın?',
        imageOptions: [
          {
            label: 'Bayrağımı gururla sallarım',
            emoji: '🚩',
            alt: 'Türk bayrağını havada tutan çocuk',
          },
          {
            label: 'Şemsiye sallarım',
            emoji: '☂️',
            alt: 'Şemsiye tutan çocuk',
          },
          {
            label: 'Oyuncak ayı sallarım',
            emoji: '🧸',
            alt: 'Oyuncak ayı',
          },
        ],
        correctAnswer: 0,
        explanation: 'Zafer Bayramı’nda bayrak sallamak gururumuzu gösterir.',
        reward: '🚩 10 Panda Puanı',
      },
    ],
  },
  'dini-ramazan': {
    levelId: 'dini-ramazan',
    story:
      'Ramazan Bayramı, oruç ayının bitiminde ailelerin buluştuğu, büyüklerin ellerinin öpüldüğü, bolca gülümsendiği şeker tadında bir bayramdır. Bayram günü ev ziyaretleri yapılır, “İyi bayramlar” dileği dillerden düşmez.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">RAMAZAN</text></svg>',
      alt: 'Ramazan Bayramı sevincini anlatan başlık',
    },
    questions: [
      {
        id: 'ramazan-q1',
        type: 'image-choice',
        question: 'Ramazan Bayramı hangi günden sonra kutlanır?',
        imageOptions: [
          {
            label: 'Oruç ayı bittikten sonra',
            emoji: 'ORUÇ',
            alt: 'Bayram sabahı sarılan aile',
          },
          {
            label: 'Sadece yaz tatilinde',
            emoji: 'SADEC',
            alt: 'Denizde yüzen çocuk',
          },
          {
            label: 'Kar yağınca',
            emoji: 'KAR',
            alt: 'Karda oynayan çocuklar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Ramazan Bayramı, Ramazan ayı tamamlanınca kutlanır.',
        reward: '🌙 15 Panda Puanı',
      },
      {
        id: 'ramazan-q2',
        type: 'image-choice',
        question: 'Bayramda yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen bir çocuk',
          },
          {
            label: 'Üzülürüm',
            emoji: 'ÜZÜLÜ',
            alt: 'Ağlayan çocuk',
          },
          {
            label: 'Somurturum',
            emoji: 'SOMUR',
            alt: 'Somurtan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramlar sevinçli günlerdir, gülümseriz.',
        reward: '😊 10 Panda Puanı',
      },
      {
        id: 'ramazan-q3',
        type: 'image-choice',
        question: 'Ramazan Bayramı’nda neler toplarız?',
        imageOptions: [
          {
            label: 'Renkli şekerler',
            emoji: 'RENKL',
            alt: 'Renkli şekeri olan kase',
          },
          {
            label: 'Oyuncak araba',
            emoji: 'OYUNC',
            alt: 'Oyuncak araba',
          },
          {
            label: 'Tahta kaşık',
            emoji: 'TAHTA',
            alt: 'Tahta kaşık',
          },
        ],
        correctAnswer: 0,
        explanation: 'Ramazan Bayramı’nda şeker ve çikolata toplarız.',
        reward: '🍬 15 Panda Puanı',
      },
      {
        id: 'ramazan-q4',
        type: 'image-choice',
        question: 'Bayramda büyüklerinin elini nasıl öpersin?',
        imageOptions: [
          {
            label: 'Saygıyla öperim',
            emoji: 'SAYGI',
            alt: 'Büyüğünün elini öpen çocuk',
          },
          {
            label: 'Uzak dururum',
            emoji: 'UZAK',
            alt: 'Uzakta bekleyen çocuk',
          },
          {
            label: 'Sadece bakarım',
            emoji: 'SADEC',
            alt: 'El sallayan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Ramazan Bayramı’nda büyüklerimizin elini öperek bayramlaşırız.',
        reward: '🤲 15 Panda Puanı',
      },
      {
        id: 'ramazan-q5',
        type: 'image-choice',
        question: 'Babanın elini öperken hangi görüntü sana benziyor?',
        imageOptions: [
          {
            label: 'Baba ile bayramlaşma',
            emoji: 'BABA',
            alt: 'Babasıyla sarılan çocuk',
          },
          {
            label: 'Arkadaşımla konuşurum',
            emoji: 'ARKAD',
            alt: 'Parkta konuşan çocuklar',
          },
          {
            label: 'Oyuncak ayı',
            emoji: 'OYUNC',
            alt: 'Oyuncak ayı',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda babamızın elini öper “İyi bayramlar baba” deriz.',
        reward: '👨‍👦 10 Panda Puanı',
      },
      {
        id: 'ramazan-q6',
        type: 'image-choice',
        question: 'Annenin elini öperken hangisi doğru?',
        imageOptions: [
          {
            label: 'Anneye sarılırım',
            emoji: 'ANNEY',
            alt: 'Annesiyle sarılan çocuk',
          },
          {
            label: 'Oyuncak bebekle oynarım',
            emoji: 'OYUNC',
            alt: 'Oyuncak bebek',
          },
          {
            label: 'Yastığa saklanırım',
            emoji: 'YASTI',
            alt: 'Yastığına sarılan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Annelerimizin elini öperken gülümser ve “İyi bayramlar” deriz.',
        reward: '💞 10 Panda Puanı',
      },
      {
        id: 'ramazan-q7',
        type: 'image-choice',
        question: 'Dedenin elini öperken hangi kareyi seçersin?',
        imageOptions: [
          {
            label: 'Dede ve torun',
            emoji: 'DEDE',
            alt: 'Dedesinin elini tutan çocuk',
          },
          {
            label: 'Oyun oynarım',
            emoji: 'OYUN',
            alt: 'Oyun parkında koşan çocuklar',
          },
          {
            label: 'Koltukta yatarım',
            emoji: 'KOLTU',
            alt: 'Koltukta uzanan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda dedelerimizin elini öper, hatırını sorarız.',
        reward: '🧓 10 Panda Puanı',
      },
      {
        id: 'ramazan-q8',
        type: 'image-choice',
        question: 'Anneanneni ziyaret ederken hangi görüntü seni anlatır?',
        imageOptions: [
          {
            label: 'Anneannemle bayramlaşırım',
            emoji: 'ANNEA',
            alt: 'Anneannesine sarılan çocuk',
          },
          {
            label: 'Bilgisayar oynarım',
            emoji: 'BILGI',
            alt: 'Bilgisayar karşısında çocuk',
          },
          {
            label: 'Bisiklet sürerim',
            emoji: 'BISIK',
            alt: 'Bisiklete binen çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda anneannelerimizi ziyaret edip elini öperiz.',
        reward: '👵 10 Panda Puanı',
      },
      {
        id: 'ramazan-q9',
        type: 'image-choice',
        question: 'Babaannenle bayramlaşmayı seç!',
        imageOptions: [
          {
            label: 'Babaannemin elini öperim',
            emoji: 'BABAA',
            alt: 'Babaannesiyle sohbet eden çocuk',
          },
          {
            label: 'Top sektiririm',
            emoji: 'TOP',
            alt: 'Top sektiren çocuk',
          },
          {
            label: 'Kumdan kale yaparım',
            emoji: 'KUMDA',
            alt: 'Kumda oynayan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Babaannelerimizin elini öpmek bayramın güzel adetidir.',
        reward: '❤️ 10 Panda Puanı',
      },
      {
        id: 'ramazan-q10',
        type: 'image-choice',
        question: 'Amcanla bayramlaşırken hangisi doğrudur?',
        imageOptions: [
          {
            label: 'Amcama sarılırım',
            emoji: 'AMCAM',
            alt: 'Amcasıyla el sıkışan çocuk',
          },
          {
            label: 'Çiçek sularım',
            emoji: 'ÇIÇEK',
            alt: 'Çiçek sulayan çocuk',
          },
          {
            label: 'Uyurum',
            emoji: 'UYURU',
            alt: 'Yastığa sarılan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Amcalarımıza da “İyi bayramlar” diyerek elini öperiz.',
        reward: '👨‍👧‍👦 10 Panda Puanı',
      },
      {
        id: 'ramazan-q11',
        type: 'image-choice',
        question: 'Teyzenle bayramlaşmayı göster!',
        imageOptions: [
          {
            label: 'Teyzeme sarılırım',
            emoji: 'TEYZE',
            alt: 'Teyzesiyle sarılan çocuk',
          },
          {
            label: 'Uzakta dururum',
            emoji: 'UZAKT',
            alt: 'Tek başına bankta oturan çocuk',
          },
          {
            label: 'Oyuncak araba sürerim',
            emoji: 'OYUNC',
            alt: 'Oyuncak araba',
          },
        ],
        correctAnswer: 0,
        explanation: 'Teyzelerimizi sevgiyle karşılar “İyi bayramlar” deriz.',
        reward: '👩‍👧 10 Panda Puanı',
      },
      {
        id: 'ramazan-q12',
        type: 'image-choice',
        question: 'Bayramda evine misafir geldiğinde ne yaparsın?',
        imageOptions: [
          {
            label: 'Gülerek karşılarım',
            emoji: 'GÜLER',
            alt: 'Kapıda misafir karşılayan çocuk',
          },
          {
            label: 'Kapıyı kapatırım',
            emoji: 'KAPIY',
            alt: 'Kapıyı kapatan çocuk',
          },
          {
            label: 'Saklanırım',
            emoji: 'SAKLA',
            alt: 'Perdenin arkasına saklanan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Misafirlerimizi güler yüzle karşılayıp bayramlaşırız.',
        reward: '🏠 15 Panda Puanı',
      },
      {
        id: 'ramazan-q13',
        type: 'image-choice',
        question: 'Teyzen geldiğinde ne söylersin?',
        imageOptions: [
          {
            label: 'İyi bayramlar teyze!',
            emoji: 'İYI',
            alt: 'Teyzesine sarılan çocuk',
          },
          {
            label: 'Görüşürüz',
            emoji: 'GÖRÜŞ',
            alt: 'El sallayan çocuk',
          },
          {
            label: 'Hiç konuşmam',
            emoji: 'HIÇ',
            alt: 'Bankta yalnız oturan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda teyzemize “İyi bayramlar” deriz.',
        reward: '🗣️ 10 Panda Puanı',
      },
      {
        id: 'ramazan-q14',
        type: 'image-choice',
        question: 'Teyzen “İyi bayramlar” dediğinde ne yaparsın?',
        imageOptions: [
          {
            label: 'Ben de “İyi bayramlar” derim',
            emoji: 'BEN',
            alt: 'Selamlaşan iki kişi',
          },
          {
            label: 'Sessiz kalırım',
            emoji: 'SESSI',
            alt: 'Sessizce oturan çocuk',
          },
          {
            label: 'Konuyu değiştiririm',
            emoji: 'KONUY',
            alt: 'Başka şey konuşan çocuklar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramlaşmanın en güzel tarafı “İyi bayramlar” sözünü paylaşmaktır.',
        reward: '💬 10 Panda Puanı',
      },
      {
        id: 'ramazan-q15',
        type: 'image-choice',
        question: 'Dayın geldiğinde hangi sahne seni anlatır?',
        imageOptions: [
          {
            label: 'Dayıma sarılırım',
            emoji: 'DAYIM',
            alt: 'Dayısıyla sarılan çocuk',
          },
          {
            label: 'Pencereye bakarım',
            emoji: 'PENCE',
            alt: 'Pencereden dışarı bakan çocuk',
          },
          {
            label: 'Telefonla oynarım',
            emoji: 'TELEF',
            alt: 'Telefonla oynayan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda dayımıza sarılıp “İyi bayramlar” deriz.',
        reward: '👔 10 Panda Puanı',
      },
      {
        id: 'ramazan-q16',
        type: 'image-choice',
        question: 'Dayın sana ne getirir?',
        imageOptions: [
          {
            label: 'Şeker getirir',
            emoji: 'ŞEKER',
            alt: 'Bayram şekeri dolu tabak',
          },
          {
            label: 'Top getirir',
            emoji: 'TOP',
            alt: 'Renkli top',
          },
          {
            label: 'Ütü getirir',
            emoji: 'ÜTÜ',
            alt: 'Ütü aleti',
          },
        ],
        correctAnswer: 0,
        explanation: 'Dayılarımız bayramda genellikle şeker ya da küçük hediyeler getirir.',
        reward: '🍭 10 Panda Puanı',
      },
      {
        id: 'ramazan-q17',
        type: 'image-choice',
        question: 'Bayramda sen ne söylersin?',
        imageOptions: [
          {
            label: 'İyi bayramlar!',
            emoji: 'İYI',
            alt: 'El sallayan gülümseyen çocuk',
          },
          {
            label: 'Güle güle',
            emoji: 'GÜLE',
            alt: 'Elveda diyen iki kişi',
          },
          {
            label: 'Hoş geldin',
            emoji: 'HOŞ',
            alt: 'Hoş geldin yazısı',
          },
        ],
        correctAnswer: 0,
        explanation: 'Ramazan Bayramı’nda herkes birbirine “İyi bayramlar” der.',
        reward: '🎉 15 Panda Puanı',
      },
    ],
  },
  'dini-kurban': {
    levelId: 'dini-kurban',
    story:
      'Kurban Bayramı paylaşmanın, yardımlaşmanın bayramıdır. Kurban kesilir, etler paylaşılır, koyunlar görülür ve camiler ziyaret edilir. Aile büyüklerinin eli öpülür, misafirler ağırlanır, leziz kavurmalar yenir.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">KURBAN</text></svg>',
      alt: 'Kurban Bayramı paylaşımını anlatan başlık',
    },
    questions: [
      {
        id: 'kurban-q1',
        type: 'image-choice',
        question: 'Kurban Bayramı’nda yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen kız çocuğu',
          },
          {
            label: 'Somurturum',
            emoji: 'SOMUR',
            alt: 'Somurtan çocuk',
          },
          {
            label: 'Hiç bakmam',
            emoji: 'HIÇ',
            alt: 'Perdenin arkasına saklanan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayram sevinci gülümsememizi sağlar.',
        reward: '😄 10 Panda Puanı',
      },
      {
        id: 'kurban-q2',
        type: 'image-choice',
        question: 'Kurban Bayramı’nda hangi hayvanı görürüz?',
        imageOptions: [
          {
            label: 'Koyun',
            emoji: 'KOYUN',
            alt: 'Çimenlikte duran koyun',
          },
          {
            label: 'Balina',
            emoji: 'BALIN',
            alt: 'Denizde yüzen balina',
          },
          {
            label: 'Penguen',
            emoji: 'PENGU',
            alt: 'Penguen',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kurban Bayramı’nda koyun, keçi gibi kurbanlık hayvanlar olunur.',
        reward: '🐑 15 Panda Puanı',
      },
      {
        id: 'kurban-q3',
        type: 'image-choice',
        question: 'Koyun hangi sesi çıkarır?',
        imageOptions: [
          {
            label: '“Mee” der',
            emoji: 'MEE',
            alt: 'Seslenen koyun',
          },
          {
            label: '“Vov” der',
            emoji: 'VOV',
            alt: 'Havlayan köpek',
          },
          {
            label: '“Miyav” der',
            emoji: 'MIYAV',
            alt: 'Miyavlayan kedi',
          },
        ],
        correctAnswer: 0,
        explanation: 'Koyunların çıkardığı ses “mee” olarak duyulur.',
        reward: '🔊 10 Panda Puanı',
      },
      {
        id: 'kurban-q4',
        type: 'image-choice',
        question: 'Koyunun kaç ayağı vardır?',
        imageOptions: [
          {
            label: 'Dört ayağı vardır',
            emoji: 'DÖRT',
            alt: 'Ayakta duran koyun',
          },
          {
            label: 'İki ayağı vardır',
            emoji: 'İKI',
            alt: 'Tek ayağını kaldırmış koyun',
          },
          {
            label: 'Altı ayağı vardır',
            emoji: 'ALTI',
            alt: 'Yavrulayan koyun',
          },
        ],
        correctAnswer: 0,
        explanation: 'Koyunların dört ayağı vardır.',
        reward: '🐾 10 Panda Puanı',
      },
      {
        id: 'kurban-q5',
        type: 'image-choice',
        question: 'Koyunu nerede görürüz?',
        imageOptions: [
          {
            label: 'Kurban Bayramı’nda görürüz',
            emoji: 'KURBA',
            alt: 'Ahırda bekleyen koyun',
          },
          {
            label: 'Sınıfta görürüz',
            emoji: 'SINIF',
            alt: 'Sınıfta oturan çocuklar',
          },
          {
            label: 'Bilgisayarda görürüz',
            emoji: 'BILGI',
            alt: 'Bilgisayar oyunu',
          },
        ],
        correctAnswer: 0,
        explanation: 'Koyunları özellikle Kurban Bayramı günlerinde görürüz.',
        reward: '👀 10 Panda Puanı',
      },
      {
        id: 'kurban-q6',
        type: 'image-choice',
        question: 'Kurban Bayramı’nda büyüklerinin elini öper misin?',
        imageOptions: [
          {
            label: 'Evet, elini öperim',
            emoji: 'EVET',
            alt: 'Büyüğünün elini öpen çocuk',
          },
          {
            label: 'Hayır, saklanırım',
            emoji: 'HAYIR',
            alt: 'Saklanan çocuk',
          },
          {
            label: 'Sadece telefonumu kullanırım',
            emoji: 'SADEC',
            alt: 'Telefonla oynayan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda büyüklerimizin elini öperiz.',
        reward: '🤝 10 Panda Puanı',
      },
      {
        id: 'kurban-q7',
        type: 'image-choice',
        question: 'Kurban Bayramı’nda kimleri ağırlar, kimlere gideriz?',
        imageOptions: [
          {
            label: 'Misafirler gelir',
            emoji: 'MISAF',
            alt: 'Kapıda misafir karşılayan çocuk',
          },
          {
            label: 'Sadece yalnız kalırım',
            emoji: 'SADEC',
            alt: 'Bankta yalnız oturan çocuk',
          },
          {
            label: 'Kuyruğa girerim',
            emoji: 'KUYRU',
            alt: 'Sıraya girmiş insanlar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda misafirler gelir, biz de akrabalarımızı ziyaret ederiz.',
        reward: '🏡 15 Panda Puanı',
      },
      {
        id: 'kurban-q8',
        type: 'image-choice',
        question: 'Bayramda ne giyeriz?',
        imageOptions: [
          {
            label: 'Yeni bayramlık kıyafetler',
            emoji: 'YENI',
            alt: 'Askıda renkli kıyafetler',
          },
          {
            label: 'Sadece pijama',
            emoji: 'SADEC',
            alt: 'Pijama takımı',
          },
          {
            label: 'Deniz kıyafeti',
            emoji: 'DENIZ',
            alt: 'Deniz kıyafeti',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kurban Bayramı’nda temiz ve yeni kıyafetler giyeriz.',
        reward: '👗 10 Panda Puanı',
      },
      {
        id: 'kurban-q9',
        type: 'image-choice',
        question: 'Kurban Bayramı’nda hangi yemek yenir?',
        imageOptions: [
          {
            label: 'Kavurma',
            emoji: 'KAVUR',
            alt: 'Tabağa servis edilen et kavurma',
          },
          {
            label: 'Dondurma',
            emoji: 'DONDU',
            alt: 'Renkli dondurmalar',
          },
          {
            label: 'Sadece salata',
            emoji: 'SADEC',
            alt: 'Salata tabağı',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayramda et kavurma sıkça hazırlanır.',
        reward: '🍲 15 Panda Puanı',
      },
      {
        id: 'kurban-q10',
        type: 'image-choice',
        question: 'Kurban Bayramı’nda nereye gideriz?',
        imageOptions: [
          {
            label: 'Camiye gideriz',
            emoji: 'CAMIY',
            alt: 'Cami avlusu',
          },
          {
            label: 'Sirk alanına gideriz',
            emoji: 'SIRK',
            alt: 'Sirk çadırı',
          },
          {
            label: 'Alışveriş merkezine gideriz',
            emoji: 'ALIŞV',
            alt: 'Kalabalık alışveriş merkezi',
          },
        ],
        correctAnswer: 0,
        explanation: 'Bayram namazı için camiye gideriz.',
        reward: '🕌 15 Panda Puanı',
      },
    ],
  },
  'kandil-mevlid': {
    levelId: 'kandil-mevlid',
    story:
      'Mevlid Kandili, Peygamber Efendimizin doğum gecesidir. Bu gecede camiler ışıklarla süslenir, aile büyükleri ziyaret edilir, kandil simidi paylaşılır ve yüzler gülümser.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">MEVLİD</text></svg>',
      alt: 'Mevlid Kandili başlığı',
    },
    questions: [
      {
        id: 'mevlid-q1',
        type: 'image-choice',
        question: 'Mevlid Kandili’nde yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen kız çocuğu',
          },
          {
            label: 'Kaşlarımı çatıp kızarım',
            emoji: 'KAŞLA',
            alt: 'Kızgın bakışlı çocuk',
          },
          {
            label: 'Uyurum',
            emoji: 'UYURU',
            alt: 'Uyuyan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandillerde sevinçle gülümseriz.',
        reward: '😊 10 Panda Puanı',
      },
      {
        id: 'mevlid-q2',
        type: 'image-choice',
        question: 'Mevlid Kandili’nde nereye gideriz?',
        imageOptions: [
          {
            label: 'Camiye gideriz',
            emoji: 'CAMIY',
            alt: 'Gece aydınlatılmış cami',
          },
          {
            label: 'Sadece lunaparka gideriz',
            emoji: 'SADEC',
            alt: 'Lunapark',
          },
          {
            label: 'Sahilde yalnız yürürüz',
            emoji: 'SAHIL',
            alt: 'Sahilde yürüyen çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Mevlid Kandili’nde camilere gidilir, dualar edilir.',
        reward: '🕌 15 Panda Puanı',
      },
      {
        id: 'mevlid-q3',
        type: 'image-choice',
        question: 'Mevlid Kandili’nde kimi ziyaret ederiz?',
        imageOptions: [
          {
            label: 'Aile büyüklerini ziyaret ederiz',
            emoji: 'AILE',
            alt: 'Büyükanne ve büyükbaba ile çocuk',
          },
          {
            label: 'Yalnız başıma gezerim',
            emoji: 'YALNI',
            alt: 'Tek başına yürüyen çocuk',
          },
          {
            label: 'Hiç kimseyle görüşmem',
            emoji: 'HIÇ',
            alt: 'Bankta yalnız oturan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandil gecelerinde aile büyüklerimizi ziyaret ederiz.',
        reward: '🏠 15 Panda Puanı',
      },
      {
        id: 'mevlid-q4',
        type: 'image-choice',
        question: 'Mevlid Kandili’nde ne paylaşırız?',
        imageOptions: [
          {
            label: 'Kandil simidi dağıtırız',
            emoji: 'KANDI',
            alt: 'Kandil simidi tabak içinde',
          },
          {
            label: 'Pizza paylaşırız',
            emoji: 'PIZZA',
            alt: 'Pizza dilimleri',
          },
          {
            label: 'Sadece oyuncak paylaşırız',
            emoji: 'SADEC',
            alt: 'Legolarla oynayan çocuklar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Mevlid Kandili’nde kandil simidi ikram ederiz.',
        reward: '🥯 15 Panda Puanı',
      },
    ],
  },
  'kandil-regaip': {
    levelId: 'kandil-regaip',
    story:
      'Regaip Kandili rahmet ve bereket gecesidir. Camilerde dualar edilir, aile büyükleri ziyaret edilir ve kandil simidi paylaşılır. Yüzler gülümser, gönüller yumuşar.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">REGAİP</text></svg>',
      alt: 'Regaip Kandili başlığı',
    },
    questions: [
      {
        id: 'regaip-q1',
        type: 'image-choice',
        question: 'Regaip Kandili’nde yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen küçük kız',
          },
          {
            label: 'Somurturum',
            emoji: 'SOMUR',
            alt: 'Somurtan çocuk',
          },
          {
            label: 'Uyurum',
            emoji: 'UYURU',
            alt: 'Uyuyan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Regaip Kandili’ni sevinçle karşılarız.',
        reward: '😊 10 Panda Puanı',
      },
      {
        id: 'regaip-q2',
        type: 'image-choice',
        question: 'Regaip Kandili’nde nereye gideriz?',
        imageOptions: [
          {
            label: 'Camiye gideriz',
            emoji: 'CAMIY',
            alt: 'Regaip Kandili’nde cami',
          },
          {
            label: 'Kaydırak parkına gideriz',
            emoji: 'KAYDI',
            alt: 'Kaydıraklı park',
          },
          {
            label: 'Oyuncak mağazasına gideriz',
            emoji: 'OYUNC',
            alt: 'Oyuncak mağazası',
          },
        ],
        correctAnswer: 0,
        explanation: 'Regaip gecesinde camilere gidilir.',
        reward: '🕌 15 Panda Puanı',
      },
      {
        id: 'regaip-q3',
        type: 'image-choice',
        question: 'Regaip Kandili’nde kimleri ziyaret ederiz?',
        imageOptions: [
          {
            label: 'Aile büyüklerini ziyaret ederiz',
            emoji: 'AILE',
            alt: 'Büyüklerine sarılan çocuk',
          },
          {
            label: 'Yalnız gezerim',
            emoji: 'YALNI',
            alt: 'Tek başına yürüyen çocuk',
          },
          {
            label: 'Kimseyle görüşmem',
            emoji: 'KIMSE',
            alt: 'Bankta yalnız oturan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandillerde aile büyüklerimizi ziyaret ederiz.',
        reward: '🏡 15 Panda Puanı',
      },
      {
        id: 'regaip-q4',
        type: 'image-choice',
        question: 'Regaip Kandili’nde ne ikram ederiz?',
        imageOptions: [
          {
            label: 'Kandil simidi',
            emoji: 'KANDI',
            alt: 'Susamlı kandil simidi',
          },
          {
            label: 'Patates kızartması',
            emoji: 'PATAT',
            alt: 'Patates kızartması',
          },
          {
            label: 'Sadece çikolata',
            emoji: 'SADEC',
            alt: 'Çikolata',
          },
        ],
        correctAnswer: 0,
        explanation: 'Regaip Kandili’nde kandil simidi dağıtırız.',
        reward: '🥯 15 Panda Puanı',
      },
    ],
  },
  'kandil-mirac': {
    levelId: 'kandil-mirac',
    story:
      'Miraç Kandili, Peygamber Efendimizin göğe yükseldiği mucizevi yolculuğu anlatır. Bu gecede camiler aydınlanır, dualar edilir, aile büyükleri ziyaret edilir ve kandil simidi ikram edilir.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">MİRAÇ</text></svg>',
      alt: 'Miraç Kandili başlığı',
    },
    questions: [
      {
        id: 'mirac-q1',
        type: 'image-choice',
        question: 'Miraç Kandili’nde yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen çocuk',
          },
          {
            label: 'Kızarım',
            emoji: 'KIZAR',
            alt: 'Kızgın bakışlı çocuk',
          },
          {
            label: 'Üzülürüm',
            emoji: 'ÜZÜLÜ',
            alt: 'Ağlayan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandillerde sevinçle gülümseriz.',
        reward: '🙂 10 Panda Puanı',
      },
      {
        id: 'mirac-q2',
        type: 'image-choice',
        question: 'Miraç Kandili’nde nereye gideriz?',
        imageOptions: [
          {
            label: 'Camiye gideriz',
            emoji: 'CAMIY',
            alt: 'Gece aydınlatılmış cami',
          },
          {
            label: 'Oyun parkına gideriz',
            emoji: 'OYUN',
            alt: 'Oyun parkında oynayan çocuklar',
          },
          {
            label: 'Sadece alışverişe gideriz',
            emoji: 'SADEC',
            alt: 'Alışveriş arabası',
          },
        ],
        correctAnswer: 0,
        explanation: 'Miraç gecesinde camilere gidip dua ederiz.',
        reward: '🕌 15 Panda Puanı',
      },
      {
        id: 'mirac-q3',
        type: 'image-choice',
        question: 'Miraç Kandili’nde kimleri ziyaret ederiz?',
        imageOptions: [
          {
            label: 'Aile büyüklerini ziyaret ederiz',
            emoji: 'AILE',
            alt: 'Torunlarıyla sohbet eden büyükanne ve büyükbaba',
          },
          {
            label: 'Kimseyi ziyaret etmem',
            emoji: 'KIMSE',
            alt: 'Yalnız çocuk',
          },
          {
            label: 'Sadece arkadaşlarımla oynarım',
            emoji: 'SADEC',
            alt: 'Arkadaşlarıyla oynayan çocuklar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandillerde büyüklerimizi ziyaret etmek güzel bir gelenektir.',
        reward: '🏠 15 Panda Puanı',
      },
      {
        id: 'mirac-q4',
        type: 'image-choice',
        question: 'Miraç Kandili’nde ne ikram ederiz?',
        imageOptions: [
          {
            label: 'Kandil simidi dağıtırız',
            emoji: 'KANDI',
            alt: 'Tabakta kandil simidi',
          },
          {
            label: 'Hamburger ikram ederiz',
            emoji: 'HAMBU',
            alt: 'Hamburger',
          },
          {
            label: 'Sadece meyve suyu ikram ederiz',
            emoji: 'SADEC',
            alt: 'Bardakta meyve suyu',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandillerde kandil simidi paylaşmak adettendir.',
        reward: '🥯 15 Panda Puanı',
      },
    ],
  },
  'kandil-berat': {
    levelId: 'kandil-berat',
    story:
      'Berat Kandili affedilme ve bağışlanma gecesidir. Camilerde dualar edilir, aile büyükleri ziyaret edilir ve kandil simidi ikram edilir. Kalpler yumuşar, yüzler güler.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">BERAT</text></svg>',
      alt: 'Berat Kandili başlığı',
    },
    questions: [
      {
        id: 'berat-q1',
        type: 'image-choice',
        question: 'Berat Kandili’nde yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen kız çocuğu',
          },
          {
            label: 'Kaşlarımı çatarım',
            emoji: 'KAŞLA',
            alt: 'Kaşlarını çatmış çocuk',
          },
          {
            label: 'Üzülürüm',
            emoji: 'ÜZÜLÜ',
            alt: 'Ağlayan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Berat Kandili’nde sevinçle gülümseriz.',
        reward: '😊 10 Panda Puanı',
      },
      {
        id: 'berat-q2',
        type: 'image-choice',
        question: 'Berat Kandili’nde nereye gideriz?',
        imageOptions: [
          {
            label: 'Camiye gideriz',
            emoji: 'CAMIY',
            alt: 'Gece cami manzarası',
          },
          {
            label: 'Lunaparka gideriz',
            emoji: 'LUNAP',
            alt: 'Lunaparktaki salıncak',
          },
          {
            label: 'Sahilde yürürüz',
            emoji: 'SAHIL',
            alt: 'Sahilde yürüyen çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Berat Kandili’nde camilere gidip dua ederiz.',
        reward: '🕌 15 Panda Puanı',
      },
      {
        id: 'berat-q3',
        type: 'image-choice',
        question: 'Berat Kandili’nde kimi ziyaret ederiz?',
        imageOptions: [
          {
            label: 'Aile büyüklerini ziyaret ederiz',
            emoji: 'AILE',
            alt: 'Torunlarıyla sohbet eden büyükler',
          },
          {
            label: 'Hiç kimseyi ziyaret etmem',
            emoji: 'HIÇ',
            alt: 'Yalnız oturan çocuk',
          },
          {
            label: 'Sadece oyuncaklarımla oynarım',
            emoji: 'SADEC',
            alt: 'Oyuncaklarıyla oynayan çocuklar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandil gecelerinde aile büyüklerimizi ziyaret eder, ellerini öperiz.',
        reward: '🏡 15 Panda Puanı',
      },
      {
        id: 'berat-q4',
        type: 'image-choice',
        question: 'Berat Kandili’nde ne ikram ederiz?',
        imageOptions: [
          {
            label: 'Kandil simidi',
            emoji: 'KANDI',
            alt: 'Kandil simidi tabak içinde',
          },
          {
            label: 'Patlamış mısır',
            emoji: 'PATLA',
            alt: 'Patlamış mısır',
          },
          {
            label: 'Sadece çikolata',
            emoji: 'SADEC',
            alt: 'Çikolata parçaları',
          },
        ],
        correctAnswer: 0,
        explanation: 'Berat gecesinde kandil simidi ikram edilir.',
        reward: '🥯 15 Panda Puanı',
      },
    ],
  },
  'gunler-kadir': {
    levelId: 'gunler-kadir',
    story:
      'Kadir Gecesi, Kur’an-ı Kerim’in indirilmeye başlandığı gecedir. Bu gecede camilerde dualar edilir, aileler ziyaret edilir, kandil simidi paylaşılır ve yüzler gülümser.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">KADİR</text></svg>',
      alt: 'Kadir Gecesi başlığı',
    },
    questions: [
      {
        id: 'kadir-q1',
        type: 'image-choice',
        question: 'Kadir Gecesi’nde yüzün nasıl olur?',
        imageOptions: [
          {
            label: 'Gülümserim',
            emoji: 'GÜLÜM',
            alt: 'Gülen çocuk',
          },
          {
            label: 'Üzülürüm',
            emoji: 'ÜZÜLÜ',
            alt: 'Ağlayan çocuk',
          },
          {
            label: 'Somurturum',
            emoji: 'SOMUR',
            alt: 'Somurtan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kadir Gecesi’nde sevinç ve huzurla gülümseriz.',
        reward: '😊 10 Panda Puanı',
      },
      {
        id: 'kadir-q2',
        type: 'image-choice',
        question: 'Kadir Gecesi’nde nereye gideriz?',
        imageOptions: [
          {
            label: 'Camiye gideriz',
            emoji: 'CAMIY',
            alt: 'Gece ışıklarıyla cami',
          },
          {
            label: 'Lunaparka gideriz',
            emoji: 'LUNAP',
            alt: 'Lunapark',
          },
          {
            label: 'Sadece evde otururuz',
            emoji: 'SADEC',
            alt: 'Evde oturan çocuk',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kadir Gecesi’nde camilere gidilir, dua edilir.',
        reward: '🕌 15 Panda Puanı',
      },
      {
        id: 'kadir-q3',
        type: 'image-choice',
        question: 'Kadir Gecesi’nde kimi ziyaret ederiz?',
        imageOptions: [
          {
            label: 'Aile büyüklerini ziyaret ederiz',
            emoji: 'AILE',
            alt: 'Büyükanne ve büyükbaba ile torun',
          },
          {
            label: 'Kimseyle görüşmem',
            emoji: 'KIMSE',
            alt: 'Yalnız çocuk',
          },
          {
            label: 'Arkadaşlarımla parkta oynarım',
            emoji: 'ARKAD',
            alt: 'Parkta oynayan çocuklar',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kadir Gecesi’nde aile büyüklerini ziyaret eder, dualar ederiz.',
        reward: '🏡 15 Panda Puanı',
      },
      {
        id: 'kadir-q4',
        type: 'image-choice',
        question: 'Kadir Gecesi’nde ne ikram ederiz?',
        imageOptions: [
          {
            label: 'Kandil simidi',
            emoji: 'KANDI',
            alt: 'Kandil simidi',
          },
          {
            label: 'Sadece cips',
            emoji: 'SADEC',
            alt: 'Cips tabağı',
          },
          {
            label: 'Dondurma',
            emoji: 'DONDU',
            alt: 'Dondurma külahı',
          },
        ],
        correctAnswer: 0,
        explanation: 'Kandil gecelerinde kandil simidi ikram edilir.',
        reward: '🥯 15 Panda Puanı',
      },
    ],
  },
  'gunler-asure': {
    levelId: 'gunler-asure',
    story:
      'Aşure Günü’nde pek çok tatlı malzeme bir araya getirilir, aşure pişirilir ve komşulara dağıtılır. Tatlı aşurenin içinde buğday, şeker, ceviz, kuru kayısı, incir gibi pek çok lezzet vardır.',
    heroMedia: {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23eef2ff"/><text x="50%" y="50%" font-size="200" text-anchor="middle" dominant-baseline="central" font-family="Arial" fill="%233256ba">AŞURE</text></svg>',
      alt: 'Aşure Günü başlığı',
    },
    questions: [
      {
        id: 'asure-q1',
        type: 'image-choice',
        question: 'Aşurenin içinde ne vardır?',
        imageOptions: [
          {
            label: 'Şeker bulunur',
            emoji: 'ŞEKER',
            alt: 'Şeker taneleri',
          },
          {
            label: 'Salatalık bulunur',
            emoji: 'SALAT',
            alt: 'Salatalık',
          },
          {
            label: 'Patates bulunur',
            emoji: 'PATAT',
            alt: 'Patatesler',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşurenin içinde şeker vardır.',
        reward: '🍬 10 Panda Puanı',
      },
      {
        id: 'asure-q2',
        type: 'image-choice',
        question: 'Aşurenin içinde hangi tahıl bulunur?',
        imageOptions: [
          {
            label: 'Buğday',
            emoji: 'BUĞDA',
            alt: 'Buğday başakları',
          },
          {
            label: 'Makarna',
            emoji: 'MAKAR',
            alt: 'Makarna',
          },
          {
            label: 'Patlamış mısır',
            emoji: 'PATLA',
            alt: 'Patlamış mısır',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşurenin ana malzemelerinden biri buğdaydır.',
        reward: '🌾 10 Panda Puanı',
      },
      {
        id: 'asure-q3',
        type: 'image-choice',
        question: 'Aşurenin içinde hangi kuru yemiş bulunur?',
        imageOptions: [
          {
            label: 'Ceviz',
            emoji: 'CEVIZ',
            alt: 'Kırılmış ceviz',
          },
          {
            label: 'Fındık kabuğu',
            emoji: 'FINDI',
            alt: 'Fındık',
          },
          {
            label: 'Yer fıstığı',
            emoji: 'YER',
            alt: 'Yer fıstığı',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşurenin içinde ceviz bulunur.',
        reward: '🥜 10 Panda Puanı',
      },
      {
        id: 'asure-q4',
        type: 'image-choice',
        question: 'Aşurenin içinde hangi kuru meyve bulunur?',
        imageOptions: [
          {
            label: 'Kuru kayısı',
            emoji: 'KURU',
            alt: 'Kurumuş kayısı taneleri',
          },
          {
            label: 'Karpuz',
            emoji: 'KARPU',
            alt: 'Karpuz dilimleri',
          },
          {
            label: 'Sadece muz',
            emoji: 'SADEC',
            alt: 'Muz',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşure yapılırken kuru kayısı kullanılır.',
        reward: '🍑 10 Panda Puanı',
      },
      {
        id: 'asure-q5',
        type: 'image-choice',
        question: 'Aşurenin içinde hangi meyve bulunur?',
        imageOptions: [
          {
            label: 'İncir',
            emoji: 'İNCIR',
            alt: 'İncir taneleri',
          },
          {
            label: 'Çilek',
            emoji: 'ÇILEK',
            alt: 'Çilek',
          },
          {
            label: 'Elma',
            emoji: 'ELMA',
            alt: 'Elma',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşurenin içinde kuru incir bulunur.',
        reward: '🍈 10 Panda Puanı',
      },
      {
        id: 'asure-q6',
        type: 'image-choice',
        question: 'Aşurenin tadı nasıldır?',
        imageOptions: [
          {
            label: 'Tatlıdır',
            emoji: 'TATLI',
            alt: 'Tatlı aşure kasesi',
          },
          {
            label: 'Acıdır',
            emoji: 'ACIDI',
            alt: 'Acı biber',
          },
          {
            label: 'Tuzludur',
            emoji: 'TUZLU',
            alt: 'Tuz döken el',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşure tatlı bir yiyecektir.',
        reward: '🍯 10 Panda Puanı',
      },
      {
        id: 'asure-q7',
        type: 'image-choice',
        question: 'Aşure Günü’nde ne yaparız?',
        imageOptions: [
          {
            label: 'Komşulara aşure dağıtırız',
            emoji: 'KOMŞU',
            alt: 'Komşulara aşure ikram eden tabaklar',
          },
          {
            label: 'Sadece kendimiz yeriz',
            emoji: 'SADEC',
            alt: 'Yalnız başına yemek yiyen çocuk',
          },
          {
            label: 'Hiç aşure yapmayız',
            emoji: 'HIÇ',
            alt: 'Boş masa',
          },
        ],
        correctAnswer: 0,
        explanation: 'Aşure Günü’nde pişirdiğimiz aşureyi komşularımızla paylaşırız.',
        reward: '🍲 15 Panda Puanı',
      },
    ],
  },
};
