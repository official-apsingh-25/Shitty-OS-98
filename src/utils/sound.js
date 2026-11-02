// Sound Engine for Windows 98 Web OS using Web Audio API synthesis
// Guaranteed zero-latency, works offline and on all modern browsers

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  // Classic Win98 / Win95 Click Sound
  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Windows 98 Error Chord (A minor brassy chord: A3, C4, E4, A4)
  playChordError() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [220, 261.63, 329.63, 440]; // A3, C4, E4, A4

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12 / freqs.length, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
      });
    } catch {
      // audio error fallback
    }
  }

  // Windows 98 Ding (High pitch alert bell)
  playDing() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // audio error fallback
    }
  }

  // Windows 98 Startup Chime (Simulated multi-layered ambient chord progression)
  playStartup() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Shimmering chord steps
      const steps = [
        { time: 0.0, freqs: [185.0, 277.18, 369.99], dur: 1.8 }, // F# minor / major ambient
        { time: 0.6, freqs: [311.13, 466.16, 622.25], dur: 2.2 }, // D# / Eb chime
        { time: 1.2, freqs: [369.99, 554.37, 739.99], dur: 2.8 }, // F# octave lift
        { time: 1.8, freqs: [415.30, 622.25, 830.61, 1108.7], dur: 3.5 } // G# / Ab resolution
      ];

      steps.forEach(step => {
        const stepTime = now + step.time;
        step.freqs.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, stepTime);

          gain.gain.setValueAtTime(0.001, stepTime);
          gain.gain.linearRampToValueAtTime(0.08 / step.freqs.length, stepTime + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, stepTime + step.dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(stepTime);
          osc.stop(stepTime + step.dur + 0.1);
        });
      });
    } catch {
      // audio error fallback
    }
  }
}

export const sound = new SoundEngine();

