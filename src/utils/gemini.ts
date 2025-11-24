import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// Note: You'll need to add GEMINI_API_KEY to your .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export interface GeminiResponse {
  text: string;
  error?: string;
}

/**
 * Get AI assistance for educational content
 */
export async function getAIAssistance(
  prompt: string,
  context?: string
): Promise<GeminiResponse> {
  if (!genAI || !API_KEY) {
    return {
      text: '',
      error: 'Gemini API anahtarı bulunamadı. Lütfen .env dosyasına VITE_GEMINI_API_KEY ekleyin.',
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const fullPrompt = context
      ? `${context}\n\nKullanıcı Sorusu: ${prompt}\n\nLütfen özel eğitimli çocuklar için uygun, anlaşılır ve pozitif bir dil kullanarak cevap ver.`
      : `${prompt}\n\nLütfen özel eğitimli çocuklar için uygun, anlaşılır ve pozitif bir dil kullanarak cevap ver.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return { text };
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.',
    };
  }
}

/**
 * Generate structured JSON content for games
 */
export async function generateGameContent(
  gameType: 'word' | 'match' | 'quiz' | 'rhythm' | 'timeline' | 'sorting' | 'oddOneOut' | 'silhouette' | 'puzzle',
  topic: string
): Promise<{ data: any; error?: string }> {
  if (!genAI || !API_KEY) {
    return { data: null, error: 'Gemini API anahtarı bulunamadı.' };
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const schemas: Record<string, string> = {
    word: `{
      "prompt": "Kelimeyi bulmak için harfleri kullan",
      "answer": "CUMHURİYET",
      "letterPool": ["C", "U", "M", "H", "U", "R", "İ", "Y", "E", "T", "X", "Z"]
    }`,
    match: `[
      { "id": "m1", "label": "Elma", "badge": "🍎" },
      { "id": "m2", "label": "Armut", "badge": "🍐" }
    ] ve targets: [
      { "id": "t1", "prompt": "Kırmızı meyve", "answer": "m1" },
      { "id": "t2", "prompt": "Yeşil meyve", "answer": "m2" }
    ] formatında tek obje: { "matchItems": [], "matchTargets": [] }`,
    quiz: `{
      "question": "Soru metni",
      "options": ["Seçenek 1", "Seçenek 2", "Seçenek 3"],
      "correctIndex": 0
    }`,
    rhythm: `{
      "rhythmSequence": ["clap", "stomp", "clap"],
      "rhythmActions": [
        { "id": "clap", "icon": "👏", "label": "Alkış" },
        { "id": "stomp", "icon": "🦶", "label": "Ayak" }
      ]
    }`,
    timeline: `[
      { "id": "event1", "label": "Olay 1", "order": 1 },
      { "id": "event2", "label": "Olay 2", "order": 2 }
    ]`,
    sorting: `{
      "categories": [
        { "id": "cat1", "label": "Kategori 1", "color": "#FF5733", "icon": "🍎" },
        { "id": "cat2", "label": "Kategori 2", "color": "#33FF57", "icon": "🥦" }
      ],
      "items": [
        { "id": "i1", "label": "Öğe 1", "icon": "🍅", "category": "cat1" },
        { "id": "i2", "label": "Öğe 2", "icon": "🥕", "category": "cat2" }
      ]
    }`,
    oddOneOut: `{
      "items": [
        { "id": "o1", "icon": "🍎", "isOdd": false },
        { "id": "o2", "icon": "🍎", "isOdd": false },
        { "id": "o3", "icon": "🍐", "isOdd": true }
      ]
    }`
  };

  const prompt = `
    "${topic}" konusuyla ilgili, özel eğitimli çocuklar (hafif düzey zihinsel yetersizlik, otizm) için bir "${gameType}" oyunu içeriği oluştur.
    
    Kesinlikle sadece aşağıdaki JSON formatında çıktı ver. Markdown yok, açıklama yok, sadece JSON.
    JSON Formatı:
    ${schemas[gameType] || schemas['quiz']}
    
    Kurallar:
    1. Türkçe karakter kullanabilirsin.
    2. İçerik basit ve anlaşılır olsun.
    3. Emojileri bol kullan.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Temizlik (Markdown bloklarını kaldır)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(text);
    return { data };
  } catch (error) {
    console.error('AI Content Generation Error:', error);
    return { data: null, error: 'İçerik üretilirken hata oluştu.' };
  }
}
