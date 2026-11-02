import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { playEwwSound } from '../utils/memeSounds';
import { PRANK_ERROR_MESSAGES } from '../data/prankMessages';

// Default metadata for classic Win98 applications
const APP_METADATA = {
  explorer: {
    title: 'My Computer',
    icon: '/icons/my-computer.svg',
  },
  notepad: {
    title: 'Untitled - Notepad',
    icon: '/icons/notepad.svg',
  },
  wordpad: {
    title: 'Document - WordPad',
    icon: '/icons/wordpad.svg',
  },
  paint: {
    title: 'untitled - Paint',
    icon: '/icons/paint.svg',
  },
  calculator: {
    title: 'Calculator',
    icon: '/icons/calculator.svg',
  },
  minesweeper: {
    title: 'Minesweeper',
    icon: '/icons/minesweeper.svg',
  },
  photoviewer: {
    title: '1998 Photo Viewer',
    icon: '/icons/paint.svg',
  },
  'gandhi-viewer': {
    title: 'gandhi ji with hoties',
    icon: '/icons/paint.svg',
  },
  timecapsule: {
    title: 'Developer Time Capsule 1998',
    icon: '/icons/win98-logo.svg',
  },
  'internet-explorer': {
    title: 'Microsoft Internet Explorer',
    icon: '/icons/internet-explorer.svg',
  },
  'outlook-express': {
    title: 'Outlook Express',
    icon: '/icons/outlook-express.svg',
  },
};

const OSContext = createContext(null);

export const OSProvider = ({ children }) => {
  // 1. Windows Table: [{ id, title, icon, isOpen, isMinimized, isMaximized, zIndex, initialData }]
  const [windows, setWindows] = useState([]);
  
  // 2. Active Window Tracking
  const [activeWindowId, setActiveWindowId] = useState(null);

  // 3. CRT Monitor Scanlines State (ON/OFF)
  const [crtEnabled, setCrtEnabled] = useState(true);

  // 4. Blue Screen of Death (BSOD) Easter Egg State
  const [bsodActive, setBsodActive] = useState(false);

  // 5. Funny & Irritating Prank Error Dialog State
  const [prankError, setPrankError] = useState({
    isOpen: false,
    message: '',
  });

  // 6. Fake 99% Stuck Loading Bar for Folders State
  const [folderLoading, setFolderLoading] = useState({
    isOpen: false,
    folderName: '',
    onComplete: null,
  });

  // 7. 3-Second Screen Freeze & Prank Error Modal States
  const [isSystemFrozen, setIsSystemFrozen] = useState(false);
  const [showPrankModal, setShowPrankModal] = useState(false);
  const [pendingApp, setPendingApp] = useState(null);
  const freezeTimerRef = useRef(null);
  const isFrozenRef = useRef(false);
  const showPrankModalRef = useRef(false);
  const pendingAppRef = useRef(null);

  // Sync cursor and ref flags
  useEffect(() => {
    isFrozenRef.current = isSystemFrozen;
    if (isSystemFrozen) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = '';
    }
  }, [isSystemFrozen]);

  useEffect(() => {
    showPrankModalRef.current = showPrankModal;
  }, [showPrankModal]);

  useEffect(() => {
    pendingAppRef.current = pendingApp;
  }, [pendingApp]);

  useEffect(() => {
    return () => {
      if (freezeTimerRef.current) {
        clearTimeout(freezeTimerRef.current);
      }
    };
  }, []);

  // Stacking z-index counter
  const highestZIndex = useRef(100);

  // Audio Player Helper (Plays from public/sounds, crash-proof)
  const playSound = useCallback((soundName) => {
    try {
      if (!soundName) return;

      let filename = soundName;
      if (soundName === 'startup') filename = 'win98-startup.mp3';
      else if (soundName === 'error' || soundName === 'chord') filename = 'chord-error.mp3';
      else if (soundName === 'click') filename = 'click.mp3';
      
      if (!filename.endsWith('.mp3') && !filename.endsWith('.wav')) {
        filename = `${filename}.mp3`;
      }

      const audioPath = `/sounds/${filename}`;
      const audio = new Audio(audioPath);
      audio.volume = 0.55;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or missing file handled gracefully
        });
      }
    } catch {
      // Safe fallback
    }
  }, []);

  // Trigger BSOD (Easter egg on DO_NOT_DELETE.sys)
  const triggerBsod = useCallback(() => {
    playSound('chord');
    setBsodActive(true);
  }, [playSound]);

  const dismissBsod = useCallback(() => {
    setBsodActive(false);
  }, []);

  // Listen for keydown to dismiss BSOD
  useEffect(() => {
    const handleKeyDown = () => {
      if (bsodActive) {
        setBsodActive(false);
      }
    };
    if (bsodActive) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleKeyDown);
    };
  }, [bsodActive]);

  // Focus Window (Z-index highest + sets active)
  const focusWindow = useCallback((id) => {
    highestZIndex.current += 1;
    const newZ = highestZIndex.current;

    setWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.id === id
          ? { ...win, zIndex: newZ, isMinimized: false }
          : win
      )
    );
    setActiveWindowId(id);
  }, []);

  // Internal direct app launcher (Creates or restores an app window with initialData)
  const launchAppDirectly = useCallback((id, data = null) => {
    playSound('click');
    highestZIndex.current += 1;
    const newZ = highestZIndex.current;

    const defaultInfo = APP_METADATA[id] || {
      title: id.charAt(0).toUpperCase() + id.slice(1),
      icon: '/icons/folder.svg',
    };

    setWindows((prevWindows) => {
      const exists = prevWindows.find((w) => w.id === id);

      if (exists) {
        return prevWindows.map((w) =>
          w.id === id
            ? {
                ...w,
                title: (data && data.title) ? data.title : w.title,
                isOpen: true,
                isMinimized: false,
                zIndex: newZ,
                initialData: data !== null ? data : w.initialData,
              }
            : w
        );
      }

      const newWindow = {
        id,
        title: (data && data.title) ? data.title : defaultInfo.title,
        icon: defaultInfo.icon,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZ,
        initialData: data,
      };

      return [...prevWindows, newWindow];
    });

    setActiveWindowId(id);
  }, [playSound]);

  // Open App (3-Second Screen Freeze Effect + "kaisa laga mera mazak chuss " Prank Dialog)
  const openApp = useCallback((id, data = null) => {
    // If bypassFreeze is set, open app directly without freeze sequence
    if (data?.bypassFreeze) {
      launchAppDirectly(id, data);
      return;
    }

    // Ignore if system is already frozen or prank modal is currently active
    if (isFrozenRef.current || showPrankModalRef.current) {
      return;
    }

    if (freezeTimerRef.current) {
      clearTimeout(freezeTimerRef.current);
    }

    // 1. 3-Second Screen Freeze Effect
    setIsSystemFrozen(true);
    isFrozenRef.current = true;
    setPendingApp({ id, data });
    pendingAppRef.current = { id, data };

    // 2. After 3 Seconds (3000ms), unfreeze, play error sound, and show Prank Error Modal
    freezeTimerRef.current = setTimeout(() => {
      setIsSystemFrozen(false);
      isFrozenRef.current = false;
      playSound('chord');
      setShowPrankModal(true);
      showPrankModalRef.current = true;
    }, 3000);
  }, [launchAppDirectly, playSound]);

  // Dismiss Prank Error Modal and Open the Pending Application
  const confirmPrankModal = useCallback(() => {
    setShowPrankModal(false);
    showPrankModalRef.current = false;
    const toLaunch = pendingAppRef.current;
    if (toLaunch) {
      launchAppDirectly(toLaunch.id, toLaunch.data);
      setPendingApp(null);
      pendingAppRef.current = null;
    }
  }, [launchAppDirectly]);

  // Close App (Closes window, plays "Eww" meme sound, and updates active window)
  const closeApp = useCallback((id) => {
    // 1. Global Window/Folder Close Meme Sound ("Eww" Audio)
    playEwwSound();

    let triggerGandhiPopup = false;

    setWindows((prevWindows) => {
      const closingWin = prevWindows.find((w) => w.id === id);
      if (
        closingWin &&
        closingWin.isOpen &&
        (closingWin.initialData?.onCloseTrigger === 'gandhi_popup' ||
          closingWin.initialData?.isDefaultWelcome)
      ) {
        triggerGandhiPopup = true;
      }

      const updated = prevWindows.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: false,
              isMinimized: false,
              isMaximized: false,
              initialData: w.initialData
                ? { ...w.initialData, isDefaultWelcome: false, onCloseTrigger: null }
                : null,
            }
          : w
      );

      // Recalculate active window
      const remainingVisible = updated.filter((w) => w.isOpen && !w.isMinimized);
      if (remainingVisible.length > 0) {
        const topWin = remainingVisible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        setActiveWindowId(topWin.id);
      } else {
        setActiveWindowId(null);
      }

      return updated;
    });

    // 2. Notepad Close Easter Egg ("Gandhi Ji with Hoties" Image Popup in Center)
    if (triggerGandhiPopup) {
      setTimeout(() => {
        openApp('gandhi-viewer', {
          bypassFreeze: true,
          center: true,
          imageUrl: '/photos-1998/gandhi_ji_with_hoties.jpg',
          title: 'gandhi ji with hoties',
        });
      }, 50);
    }
  }, [openApp]);

  // Minimize App (Minimizes to taskbar and passes focus to next top window)
  const minimizeApp = useCallback((id) => {
    playSound('click');
    setWindows((prevWindows) => {
      const updated = prevWindows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      );

      const remainingVisible = updated.filter((w) => w.isOpen && !w.isMinimized && w.id !== id);
      if (remainingVisible.length > 0) {
        const topWin = remainingVisible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        setActiveWindowId(topWin.id);
      } else {
        setActiveWindowId(null);
      }

      return updated;
    });
  }, [playSound]);

  // Toggle Maximize App
  const toggleMaximizeApp = useCallback((id) => {
    playSound('click');
    setWindows((prevWindows) =>
      prevWindows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
    focusWindow(id);
  }, [playSound, focusWindow]);

  // CRT Monitor Effect Toggle
  const toggleCrt = useCallback(() => {
    playSound('click');
    setCrtEnabled((prev) => !prev);
  }, [playSound]);

  // Trigger Random Desi / Meme Error Popup
  const triggerPrankError = useCallback((customMsg = null) => {
    setPrankError((prev) => {
      if (prev.isOpen) return prev; // Do not stack if already active
      const msg =
        customMsg ||
        PRANK_ERROR_MESSAGES[Math.floor(Math.random() * PRANK_ERROR_MESSAGES.length)];
      return { isOpen: true, message: msg };
    });
    playSound('chord');
  }, [playSound]);

  const closePrankError = useCallback(() => {
    setPrankError({ isOpen: false, message: '' });
  }, []);

  // Open Folder with 99% Stuck Progress Bar Mechanic
  const openFolderWithFakeLoading = useCallback((folderName, onComplete) => {
    playSound('click');
    setFolderLoading({
      isOpen: true,
      folderName: folderName || 'Folder',
      onComplete: onComplete || (() => {}),
    });
  }, [playSound]);

  const closeFolderLoading = useCallback(() => {
    setFolderLoading({ isOpen: false, folderName: '', onComplete: null });
  }, []);

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        openApp,
        closeApp,
        minimizeApp,
        toggleMaximizeApp,
        focusWindow,
        playSound,
        crtEnabled,
        setCrtEnabled,
        toggleCrt,
        bsodActive,
        triggerBsod,
        dismissBsod,
        prankError,
        triggerPrankError,
        closePrankError,
        folderLoading,
        openFolderWithFakeLoading,
        closeFolderLoading,
        isSystemFrozen,
        showPrankModal,
        pendingApp,
        confirmPrankModal,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};

export default OSContext;
