// Global Meme Sound Utility for Windows 98 OS Replica
// Handles "Eww" Audio playback on window/folder close

let ewwAudio = null;

const EWW_CANDIDATE_PATHS = [
  '/sounds/eww.mp3',
  '/sounds/eww song.mp3',
  '/eww.mp3',
  './eww.mp3',
  '/assets/eww.mp3',
];

export const playEwwSound = () => {
  try {
    if (typeof window === 'undefined') return;

    if (!ewwAudio) {
      ewwAudio = new Audio(EWW_CANDIDATE_PATHS[0]);

      // Automatically fallback if a candidate URL cannot be loaded
      let candidateIdx = 0;
      ewwAudio.addEventListener('error', () => {
        if (candidateIdx < EWW_CANDIDATE_PATHS.length - 1) {
          candidateIdx += 1;
          ewwAudio.src = EWW_CANDIDATE_PATHS[candidateIdx];
          ewwAudio.load();
        }
      });
    }

    // Reset audio.currentTime = 0 before playing so that closing multiple windows
    // quickly triggers the sound every single time without delay.
    ewwAudio.currentTime = 0;
    ewwAudio.volume = 1.0;

    const playPromise = ewwAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback with fresh Audio object if browser interrupts or blocks
        try {
          const fresh = new Audio(EWW_CANDIDATE_PATHS[1]);
          fresh.currentTime = 0;
          fresh.volume = 1.0;
          fresh.play().catch(() => {
            const rootFresh = new Audio(EWW_CANDIDATE_PATHS[2]);
            rootFresh.currentTime = 0;
            rootFresh.volume = 1.0;
            rootFresh.play().catch(() => {});
          });
        } catch {}
      });
    }
  } catch (err) {
    console.error('Error in playEwwSound:', err);
  }
};

