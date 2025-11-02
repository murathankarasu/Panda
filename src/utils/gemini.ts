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
 * Generate personalized feedback for a student
 */
export async function generateFeedback(
  levelId: string,
  performance: { correct: number; total: number }
): Promise<GeminiResponse> {
  const prompt = `Öğrenci ${levelId} seviyesinde ${performance.correct}/${performance.total} soruyu doğru cevapladı. Özel eğitimli çocuklar için uygun, cesaret verici ve pozitif bir geri bildirim hazırla. Türkçe yaz.`;

  return getAIAssistance(prompt, 'Özel eğitim platformu için geri bildirim üretiyorsun.');
}

/**
 * Generate hints for difficult questions
 */
export async function generateHint(question: string, levelContext: string): Promise<GeminiResponse> {
  const prompt = `Öğrenci şu soruda yardıma ihtiyaç duyuyor: "${question}". Özel eğitimli çocuklar için anlaşılır ve destekleyici bir ipucu ver. Doğru cevabı söyleme, sadece ipucu ver.`;

  return getAIAssistance(prompt, levelContext);
}

