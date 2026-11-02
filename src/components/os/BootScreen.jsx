import React, { useState, useEffect } from 'react';
import { introAudio } from '../../utils/introAudio';

export const BootScreen = ({ onBootComplete }) => {
  const [isBooting, setIsBooting] = useState(false);
  const [bootStatusText, setBootStatusText] = useState('Starting Windows 98...');

  // Fallback Auto-Attempt: Try playing immediately on page load
  useEffect(() => {
    let unmounted = false;

    // 1. Attempt unprompted autoplay
    introAudio.play().catch(() => {
      // Autoplay blocked by modern browser policy - perfectly normal
      // We will play as soon as the user presses any key or clicks the boot dialog
    });

    // 2. Global fallback listeners: Any key press or click boots immediately
    const handleGlobalTrigger = () => {
      if (!unmounted && !isBooting) {
        handleBoot();
      }
    };

    window.addEventListener('keydown', handleGlobalTrigger, { once: true });

    return () => {
      unmounted = true;
      window.removeEventListener('keydown', handleGlobalTrigger);
    };
  }, [isBooting]);

  const handleBoot = () => {
    if (isBooting) return;
    setIsBooting(true);

    // a) Immediately trigger funny intro audio at full volume
    introAudio.play().catch(() => {
      // Audio playback safely attempted
    });

    // b) Show brief funny retro loading sequence before revealing desktop
    setBootStatusText('Connecting to 56k Dial-Up... Loading High Nostalgia...');

    setTimeout(() => {
      setBootStatusText('Configuring Sound Blaster Live! 16-Bit Audio...');
    }, 450);

    setTimeout(() => {
      setBootStatusText('Ready!');
      if (onBootComplete) {
        onBootComplete();
      }
    }, 900);
  };

  return (
    <div
      onClick={handleBoot}
      className="fixed inset-0 z-[9999999] bg-[#008080] flex flex-col items-center justify-center p-4 font-w95 select-none"
    >
      {/* Retro Welcome / Logon Dialog Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] bg-win-gray win-outset shadow-2xl p-2 text-xs"
      >
        {/* Title Bar */}
        <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold mb-3 select-none">
          <div className="flex items-center space-x-1.5">
            <img
              src="/icons/win98-logo.svg"
              alt=""
              className="w-4 h-4 pixelated pointer-events-none"
            />
            <span className="tracking-wide">Welcome to Microsoft Windows 98</span>
          </div>
          <button
            onClick={handleBoot}
            className="win-outset active:win-pressed !p-0 w-3.5 h-3 text-[9px] text-black bg-win-gray"
          >
            ✕
          </button>
        </div>

        {/* Dialog Content */}
        <div className="flex items-start space-x-3 px-2 py-1 mb-3">
          <img
            src="/icons/win98-logo.svg"
            alt="Windows 98"
            className="w-12 h-12 pixelated shrink-0 mt-1 pointer-events-none drop-shadow-md"
          />

          <div className="flex-1 space-y-2">
            <div>
              <p className="font-bold text-black text-sm">
                Click 'OK' or Press Any Key to Boot Windows 98
              </p>
              <p className="text-red-700 font-bold text-[11px] mt-0.5">
                (Warning: High Nostalgia &amp; Funny Music Ahead!)
              </p>
            </div>

            <p className="text-gray-700 text-[11px] leading-tight">
              Type your user name and click OK to log on to the 1998 cyberspace intranet:
            </p>

            {/* Simulated Credentials */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center">
                <span className="w-20 font-bold text-gray-800">User name:</span>
                <input
                  type="text"
                  readOnly
                  value="RetroSurfer_1998"
                  className="flex-1 win-inset bg-white px-2 py-0.5 font-mono text-xs outline-none text-blue-900 font-bold"
                />
              </div>

              <div className="flex items-center">
                <span className="w-20 font-bold text-gray-800">Password:</span>
                <input
                  type="password"
                  readOnly
                  value="1998retro"
                  className="flex-1 win-inset bg-white px-2 py-0.5 font-mono text-xs outline-none text-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Booting Progress Indicator when clicked */}
        {isBooting ? (
          <div className="bg-white win-inset p-2 mb-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1.5">
              <div className="w-3.5 h-3.5 border-2 border-win-navy border-t-transparent animate-spin rounded-full" />
              <span className="font-bold text-blue-900 text-xs">{bootStatusText}</span>
            </div>
            {/* 90s-style blue blocks progress bar */}
            <div className="h-4 win-inset bg-gray-100 p-0.5 overflow-hidden flex">
              <div className="h-full bg-win-navy w-full animate-pulse flex space-x-1 p-0.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-win-blue" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-win-dark my-2 mx-1" />
        )}

        {/* 3D Action Buttons */}
        <div className="flex justify-end space-x-2 px-1 py-1">
          <button
            onClick={handleBoot}
            disabled={isBooting}
            autoFocus
            className="win-outset active:win-pressed px-5 py-1.5 bg-win-gray font-bold text-xs text-black border-2 border-black/80 flex items-center space-x-1"
          >
            <span>OK</span>
          </button>

          <button
            onClick={handleBoot}
            className="win-outset active:win-pressed px-4 py-1.5 bg-win-gray text-xs text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Retro Bottom Tip */}
      <div className="mt-4 text-center text-white/90 drop-shadow-[1px_1px_1px_rgba(0,0,0,1)] text-xs">
        Tip: Press <kbd className="bg-win-gray text-black px-1.5 py-0.5 win-outset font-mono font-bold text-[10px]">ENTER</kbd> or click anywhere on screen to enter Windows 98.
      </div>
    </div>
  );
};

export default BootScreen;

