# Sıla Abla - Özel Eğitim Platformu

Özel eğitimli çocuklar için interaktif eğitim platformu. Dini Bayramlar konusunda eğitici içerikler, hikayeler ve sorular içerir.

## 🎯 Proje Hakkında

Bu platform, özel eğitimli çocuklar için tasarlanmış, kullanıcı dostu bir eğitim uygulamasıdır. Ramazan Bayramı konularını hikaye formatında anlatır ve interaktif sorularla öğrenmeyi pekiştirir.

## ✨ Özellikler

### 🗺️ Öğrenme Haritası
- Unit bazlı seviye sistemi
- Seviyeleri tamamladıkça açılan kilit sistemi
- Modern ve temiz kart tasarımları
- Sol sidebar ile kolay navigasyon

### 📚 Hikaye Anlatımı
- Her seviye için özel hikayeler
- Görsel destekli içerik (WebP ve PNG formatları)
- Dinamik görsel yükleme (order1.webp, order2.webp vb.)

### 🔊 Sesli Okuma (TTS)
- Google Translate TTS entegrasyonu
- Ayarlanabilir ses seviyesi
- Çocuklara uygun ses hızı
- Play/Pause kontrolü

### 🎮 İnteraktif Sorular
- Her hikayeden sonra konuyla ilgili sorular
- Çoktan seçmeli soru tipleri
- Anlık geri bildirim

### 🏆 Rozetler ve Görevler
- Ünite tamamlama rozetleri
- Günlük görev sistemi
- İlerleme takibi
- Rozet koleksiyonu görünümü

### 📊 İlerleme Takibi
- LocalStorage ile kalıcı kayıt
- Kullanıcı ismi kaydı
- Seviye tamamlama durumu
- Günlük aktivite takibi

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcıda açın:**
```
http://localhost:5173
```

### Production Build

```bash
npm run build
```

Build sonrası dosyalar `dist/` klasöründe oluşturulur.

```bash
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── components/           # React bileşenleri
│   ├── WelcomeScreen.tsx          # Hoş geldin ekranı
│   ├── NameScreen.tsx             # İsim girme ekranı
│   ├── WelcomeMessageScreen.tsx   # Karşılama mesajı ekranı
│   ├── MapView.tsx                # Ana öğrenme haritası
│   ├── LevelPage.tsx              # Seviye detay sayfası
│   ├── QuestsScreen.tsx           # Görevler ekranı
│   └── BadgesScreen.tsx           # Rozetler ekranı
├── data/                # Veri dosyaları
│   ├── levels.ts                  # Seviye tanımları
│   └── levelContent.ts            # Seviye içerikleri ve sorular
├── utils/               # Yardımcı fonksiyonlar
│   ├── tts.ts                     # Text-to-speech servisi
│   ├── progress.ts                # İlerleme takibi
│   ├── badges.ts                  # Rozet yönetimi
│   └── dailyQuests.ts             # Günlük görev yönetimi
└── types.ts             # TypeScript tipleri
```

## 🎨 Ekranlar ve Özellikler

### 1. Hoş Geldin Ekranı
- Panda karakterleri (1.png - 5.png)
- Beyaz arka plan
- "GET STARTED" butonu ile başlangıç

### 2. İsim Girme Ekranı
- Kullanıcıdan isim alma
- Panda görseli ile modern tasarım
- "GÖNDER" butonu ile devam

### 3. Karşılama Mesajı
- "Memnun oldum [isim]!" mesajı
- Animasyonlu geçiş
- Otomatik harita görünümüne yönlendirme

### 4. Öğrenme Haritası (Map View)
- Sol sidebar navigasyon (ÖĞREN, GÖREVLER, ROZETLER)
- Unit kartları (koyu mavi arka plan)
- Seviye yolu görünümü
- Tamamlanmış, aktif ve kilitli seviye durumları

### 5. Seviye Sayfası
- Sol tarafta hikaye görseli
- Sağ tarafta hikaye metni
- TTS kontrol butonu (siyah, play ikonu)
- Ses seviyesi ayarı
- Soru ekranı

### 6. Görevler Ekranı
- Günlük görevler (3 bölüm, 5 bölüm, 10 bölüm)
- İlerleme çubukları (tamamlanan: yeşil, devam eden: siyah)
- Sol sidebar navigasyon

### 7. Rozetler Ekranı
- Açılmış ve kilitli rozetler
- Ünite tamamlama rozetleri
- Koleksiyon görünümü

## 🎨 Tasarım Özellikleri

- **Renkler:**
  - Koyu mavi (#1e3a5f) - Unit kartları
  - Siyah (#000000) - Butonlar, aktif seviyeler
  - Yeşil (#22c55e) - Tamamlanan görevler
  - Beyaz arka plan - Ana tema

- **Typography:**
  - Ana başlıklar: 56pt bold
  - Alt başlıklar: 20pt regular
  - Buton metinleri: Büyük harf, bold

- **Responsive:**
  - Mobil ve tablet uyumlu
  - Esnek layout yapısı

## 📦 Bağımlılıklar

### Ana Bağımlılıklar
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.0

### Geliştirme Bağımlılıkları
- `typescript` ^5.2.2
- `vite` ^5.0.8
- `@vitejs/plugin-react` ^4.2.1

## 🔧 Yapılandırma

### TTS Ayarları
TTS ses seviyesi LocalStorage'da `sila_egitim_tts_volume` anahtarı ile saklanır.

### İlerleme Kaydı
Tüm kullanıcı ilerlemesi LocalStorage'da saklanır:
- `userName` - Kullanıcı ismi
- `sila_egitim_progress` - Seviye ilerlemesi
- `sila_egitim_daily_quests` - Günlük görev ilerlemesi
- `sila_egitim_badges` - Rozet durumu

## 📝 Seviye Yapısı

Her seviye şu bilgileri içerir:
- `id` - Benzersiz seviye kimliği
- `title` - Seviye başlığı
- `description` - Seviye açıklaması
- `order` - Sıralama (1'den başlar)
- `category` - Ünite kategorisi
- `unlocked` - Açık/kilitli durumu
- `completed` - Tamamlanma durumu

## 🎯 Kullanım

1. **İlk Kullanım:**
   - Hoş geldin ekranından "GET STARTED" butonuna tıklayın
   - İsminizi girin ve "GÖNDER" butonuna basın
   - Karşılama mesajından sonra otomatik olarak harita görünümüne yönlendirilirsiniz

2. **Seviye Oynama:**
   - Harita görünümünde bir seviyeye tıklayın
   - Hikayeyi dinleyin (TTS butonu ile)
   - Soruları cevaplayın
   - Seviye tamamlandığında bir sonraki seviye açılır

3. **Görevler:**
   - Sol sidebar'dan "GÖREVLER" sekmesine tıklayın
   - Günlük hedeflerinizi görün
   - Tamamlanan görevler yeşil çubukla gösterilir

4. **Rozetler:**
   - Sol sidebar'dan "ROZETLER" sekmesine tıklayın
   - Kazandığınız rozetleri görün
   - Ünite tamamlama rozetleri otomatik olarak açılır

## 🛠️ Geliştirme

### Yeni Seviye Ekleme

1. `src/data/levels.ts` dosyasına yeni seviye ekleyin
2. `src/data/levelContent.ts` dosyasına seviye içeriği ve sorularını ekleyin
3. Görsel dosyalarını `public/assets/` klasörüne ekleyin (orderX.webp veya orderX.png)

### Yeni Rozet Ekleme

1. `src/utils/badges.ts` dosyasında rozet tanımlarını güncelleyin
2. Rozet görsellerini `public/assets/` klasörüne ekleyin

## 📄 Lisans

MIT

## 👤 Geliştirici

Murathan

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce:
1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın
