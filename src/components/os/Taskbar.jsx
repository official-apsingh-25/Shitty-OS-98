import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { introAudio } from '../../utils/introAudio';

export const Taskbar = ({ startMenuOpen, toggleStartMenu }) => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeApp,
    crtEnabled,
    toggleCrt,
  } = useOS();

  const [time, setTime] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(introAudio.isPlaying);

  // Subscribe to Intro Music state (playing / paused)
  useEffect(() => {
    return introAudio.subscribe((playing) => {
      setIsMusicPlaying(playing);
    });
  }, []);

  // Live real-time clock in HH:MM AM/PM format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = windows.filter((w) => w.isOpen);

  const handleTabClick = (win) => {
    if (win.isMinimized) {
      focusWindow(win.id);
    } else if (activeWindowId === win.id) {
      minimizeApp(win.id);
    } else {
      focusWindow(win.id);
    }
  };

  const handleMusicToggle = () => {
    introAudio.toggle();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[28px] bg-win-gray win-outset z-[9999] flex items-center justify-between px-0.5 select-none font-w95">
      {/* Start Button & Active Window Tabs Container */}
      <div className="flex items-center space-x-1 h-full py-0.5 flex-1 overflow-hidden pr-2">
        {/* Classic 3D Start Button */}
        <button
          id="start-button"
          onClick={toggleStartMenu}
          className={`h-full px-2 flex items-center space-x-1.5 font-bold text-xs ${
            startMenuOpen ? 'win-pressed bg-[#d4d0c8]' : 'win-outset bg-win-gray'
          }`}
        >
          <img
            src="/icons/win98-logo.svg"
            alt="Windows 98"
            className="w-4 h-4 pointer-events-none pixelated"
          />
          <span className="leading-none pt-0.5 text-black">Start</span>
        </button>

        {/* Vintage Divider Bar */}
        <div className="w-[2px] h-[80%] border-l border-win-dark border-r border-white my-auto mx-0.5" />

        {/* 3D Tabs for All Open Windows */}
        <div className="flex items-center space-x-1 h-full flex-1 overflow-x-auto no-scrollbar">
          {openWindows.map((win) => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => handleTabClick(win)}
                title={win.title}
                className={`h-full min-w-[110px] max-w-[160px] flex items-center space-x-1.5 px-2 text-left text-xs truncate ${
                  isActive
                    ? 'win-inset bg-[#d0ccc4] font-bold text-black'
                    : 'win-outset bg-win-gray font-normal text-black'
                }`}
              >
                {win.icon && (
                  <img
                    src={win.icon}
                    alt=""
                    className="w-3.5 h-3.5 shrink-0 pointer-events-none pixelated"
                  />
                )}
                <span className="truncate leading-none pt-0.5">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sunken System Tray (Right Side) */}
      <div className="h-[80%] win-inset px-2 flex items-center space-x-2 bg-win-gray shrink-0 text-xs text-black">
        {/* CRT Monitor Effect Quick Toggle */}
        <button
          onClick={toggleCrt}
          title={`CRT Monitor Effect: ${crtEnabled ? 'ON' : 'OFF'}`}
          className="text-[11px] hover:opacity-80 px-1 border border-transparent hover:border-win-dark active:win-inset"
        >
          {crtEnabled ? '📺' : '💻'}
        </button>

        {/* Speaker Volume Icon: Replays / Toggles Funny Intro Music */}
        <button
          onClick={handleMusicToggle}
          title={
            isMusicPlaying
              ? '🎵 Intro Music: Playing (Click to Pause)'
              : '🎵 Intro Music: Paused (Click to Play)'
          }
          className={`flex items-center p-0.5 rounded-none border border-transparent hover:border-win-dark active:win-pressed ${
            isMusicPlaying ? 'bg-yellow-200/50' : 'hover:opacity-80'
          }`}
        >
          <img
            src="/icons/volume.svg"
            alt="Volume"
            className={`w-3.5 h-3.5 pixelated ${isMusicPlaying ? 'animate-pulse' : ''}`}
          />
        </button>

        {/* Live Clock (HH:MM AM/PM) */}
        <span className="font-w95 text-[11px] font-normal tracking-wide whitespace-nowrap pl-1">
          {time}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;
