// High-Reliability Intro Audio Manager for Windows 98 Web OS
// Handles encoded spaces, multiple fallback paths, volume 1.0, and Autoplay policies

const CANDIDATE_URLS = [
  encodeURI('/sounds/music intro.mp3'),
  encodeURI('/sounds/intro music.mp3'),
  encodeURI('/music intro.mp3'),
  '/sounds/music intro.mp3',
  '/sounds/intro music.mp3',
];

class IntroAudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.listeners = new Set();
    this.hasUserInteracted = false;
    this.currentCandidateIdx = 0;
  }

  initAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(CANDIDATE_URLS[0]);
      this.audio.volume = 1.0; // Full volume

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', () => {
        // Automatically try next fallback path if first candidate fails
        if (this.currentCandidateIdx < CANDIDATE_URLS.length - 1) {
          this.currentCandidateIdx += 1;
          this.audio.src = CANDIDATE_URLS[this.currentCandidateIdx];
          this.audio.load();
          if (this.isPlaying) {
            this.audio.play().catch(() => {});
          }
        }
      });
    }
    return this.audio;
  }

  play() {
    try {
      const audio = this.initAudio();
      if (!audio) return Promise.reject(new Error('No Audio context'));

      audio.currentTime = 0;
      audio.volume = 1.0;

      const promise = audio.play();
      if (promise !== undefined) {
        return promise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            this.isPlaying = false;
            this.notify();
            throw err;
          });
      }
      this.isPlaying = true;
      this.notify();
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play().catch(() => {});
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.isPlaying);
      } catch {}
    });
  }
}

export const introAudio = new IntroAudioManager();

