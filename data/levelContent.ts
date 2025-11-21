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
};
