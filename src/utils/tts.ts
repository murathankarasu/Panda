// Text-to-Speech utility using Web Speech API with Google TTS fallback
const TTS_STORAGE_KEY = 'sila_egitim_tts_volume';

const supportsSpeechSynthesis =
  typeof window !== 'undefined' &&
  typeof window.speechSynthesis !== 'undefined' &&
  typeof window.SpeechSynthesisUtterance !== 'undefined';

const speechSynth: SpeechSynthesis | null = supportsSpeechSynthesis ? window.speechSynthesis : null;
let currentAudio: HTMLAudioElement | null = null;
let isCurrentlySpeaking = false;

export interface TTSSettings {
  volume: number; // 0-1 arası
}

export function getTTSVolume(): number {
  const stored = localStorage.getItem(TTS_STORAGE_KEY);
  if (stored) {
    const volume = parseFloat(stored);
    return isNaN(volume) ? 0.8 : Math.max(0, Math.min(1, volume));
  }
  return 0.8; // Default volume
}

export function setTTSVolume(volume: number): void {
  const clampedVolume = Math.max(0, Math.min(1, volume));
  localStorage.setItem(TTS_STORAGE_KEY, clampedVolume.toString());
}

// Split text into chunks for Google Translate TTS (max ~200 characters per request)
function splitTextIntoChunks(text: string, maxLength: number = 200): string[] {
  const chunks: string[] = [];
  let currentChunk = '';
  
  const sentences = text.split(/[.!?]\s+/);
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += (currentChunk ? '. ' : '') + sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk + '.');
      }
      currentChunk = sentence;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk + (currentChunk.endsWith('.') ? '' : '.'));
  }
  
  return chunks.length > 0 ? chunks : [text];
}

// Get audio URL from Google Translate TTS (free, no API key needed)
function getGoogleTTSUrl(text: string): string {
  const encodedText = encodeURIComponent(text);
  const lang = 'tr'; // Turkish
  // Using Google Translate TTS API (free, public endpoint)
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodedText}`;
}

// Play audio chunks sequentially (Google TTS fallback)
async function playAudioChunks(chunks: string[], volume: number): Promise<void> {
  const audioElements: HTMLAudioElement[] = [];
  
  for (let i = 0; i < chunks.length; i++) {
    if (!isCurrentlySpeaking) {
      // Stop all audio elements if user stopped
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      break; // User stopped playback
    }
    
    const audioUrl = getGoogleTTSUrl(chunks[i]);
    const audio = new Audio(audioUrl);
    audio.volume = volume;
    audio.playbackRate = 1.0; // Normal speed
    audioElements.push(audio);
    
    // Keep reference to current audio for stopping
    currentAudio = audio;
    
    await new Promise<void>((resolve, reject) => {
      audio.onended = () => {
        resolve();
      };
      audio.onerror = () => {
        reject(new Error('Audio playback failed'));
      };
      audio.play().catch(reject);
    });
    
    // Small delay between chunks for better flow
    if (i < chunks.length - 1 && isCurrentlySpeaking) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

async function speakWithSpeechSynthesis(text: string, volume: number): Promise<HTMLAudioElement | null> {
  if (!speechSynth) {
    return null;
  }

  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1;
    utterance.volume = Math.max(0, Math.min(1, volume));

    utterance.onend = () => {
      isCurrentlySpeaking = false;
    };

    utterance.onerror = () => {
      isCurrentlySpeaking = false;
    };

    // Cancel any ongoing speech before starting new one
    speechSynth.cancel();

    isCurrentlySpeaking = true;
    speechSynth.speak(utterance);

    // Return dummy audio element for compatibility with existing code
    resolve(new Audio());
  });
}

async function speakWithGoogleTTS(text: string, volume: number): Promise<HTMLAudioElement | null> {
  try {
    const chunks = splitTextIntoChunks(text, 200);
    isCurrentlySpeaking = true;

    playAudioChunks(chunks, volume)
      .then(() => {
        isCurrentlySpeaking = false;
        currentAudio = null;
      })
      .catch((error) => {
        console.error('Error playing TTS chunks:', error);
        isCurrentlySpeaking = false;
        currentAudio = null;
      });

    const dummyAudio = new Audio();
    currentAudio = dummyAudio;
    return dummyAudio;
  } catch (error) {
    console.error('Error speaking text:', error);
    isCurrentlySpeaking = false;
    return null;
  }
}

export async function speakText(text: string, volume?: number): Promise<HTMLAudioElement | null> {
  // Stop any currently playing audio
  stopSpeaking();

  const audioVolume = volume !== undefined ? volume : getTTSVolume();

  if (supportsSpeechSynthesis) {
    return speakWithSpeechSynthesis(text, audioVolume);
  }

  return speakWithGoogleTTS(text, audioVolume);
}

export function stopSpeaking(): void {
  isCurrentlySpeaking = false;

  if (supportsSpeechSynthesis && speechSynth) {
    speechSynth.cancel();
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentAudio.src && currentAudio.src.startsWith('blob:')) {
      URL.revokeObjectURL(currentAudio.src);
    }
    currentAudio = null;
  }

  if (typeof document !== 'undefined') {
    document.querySelectorAll('audio').forEach(audio => {
      if (audio.src.includes('translate_tts')) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }
}

export function isSpeaking(): boolean {
  if (supportsSpeechSynthesis && speechSynth) {
    return isCurrentlySpeaking || speechSynth.speaking;
  }

  return isCurrentlySpeaking;
}
