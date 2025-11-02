// Audio player utility for story narration
// Audio files should be placed in /public/assets/audio/ directory
// Format: 1.mp3, 2.mp3, 3.mp3, etc. (based on level order)

const AUDIO_STORAGE_KEY = 'sila_egitim_audio_volume';

// Map level order to audio file number
// Level order 3 (1.4.1) -> audio/1.mp3
// Level order 4 (1.4.2) -> audio/2.mp3
// etc.
export function getAudioPath(levelOrder: number): string {
  // Skip Dini Bayramlar (order 1, 2) and start from Ramazan Bayramı (order 3)
  // Order 3 -> 1.mp3, Order 4 -> 2.mp3, etc.
  const audioNumber = levelOrder - 2;
  return `/assets/audio/${audioNumber}.mp3`;
}

export function getAudioVolume(): number {
  const stored = localStorage.getItem(AUDIO_STORAGE_KEY);
  if (stored) {
    const volume = parseFloat(stored);
    return isNaN(volume) ? 0.8 : Math.max(0, Math.min(1, volume));
  }
  return 0.8; // Default volume
}

export function setAudioVolume(volume: number): void {
  const clampedVolume = Math.max(0, Math.min(1, volume));
  localStorage.setItem(AUDIO_STORAGE_KEY, clampedVolume.toString());
}

export class StoryAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentPath: string | null = null;
  private onEndCallback: (() => void) | null = null;
  private onErrorCallback: (() => void) | null = null;

  async play(audioPath: string, volume: number = getAudioVolume()): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any currently playing audio
      this.stop();

      // Create new audio element
      this.audio = new Audio(audioPath);
      this.currentPath = audioPath;
      this.audio.volume = volume;

      // Set up event listeners
      this.audio.onended = () => {
        if (this.onEndCallback) {
          this.onEndCallback();
        }
        resolve();
      };

      this.audio.onerror = (error) => {
        if (this.onErrorCallback) {
          this.onErrorCallback();
        }
        reject(error);
      };

      // Play audio
      this.audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        reject(error);
      });
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.currentPath = null;
    }
  }

  pause(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  resume(): void {
    if (this.audio && this.audio.paused) {
      this.audio.play().catch((error) => {
        console.error('Error resuming audio:', error);
      });
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused && !this.audio.ended;
  }

  isPaused(): boolean {
    return this.audio !== null && this.audio.paused;
  }

  onEnd(callback: () => void): void {
    this.onEndCallback = callback;
  }

  onError(callback: () => void): void {
    this.onErrorCallback = callback;
  }

  getCurrentPath(): string | null {
    return this.currentPath;
  }
}

// Export singleton instance
export const audioPlayer = new StoryAudioPlayer();
