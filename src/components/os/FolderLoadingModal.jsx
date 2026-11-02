import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

export const FolderLoadingModal = () => {
  const { folderLoading, closeFolderLoading } = useOS();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Loading Folder...');
  const timerRef = useRef([]);

  useEffect(() => {
    // Clear any previous timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    if (!folderLoading?.isOpen) {
      setProgress(0);
      setStatusText('Loading Folder...');
      return;
    }

    const folderName = folderLoading.folderName || 'Folder';
    setProgress(0);
    setStatusText(`Loading Folder: ${folderName}... (0%)`);

    // 1. Progress from 0% to 99% in 0.5 seconds (500ms)
    const startTime = Date.now();
    const duration = 500; // 0.5s

    const stepInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(99, Math.floor((elapsed / duration) * 99));
      setProgress(pct);

      if (pct < 99) {
        setStatusText(`Loading Folder: ${folderName}... (${pct}%)`);
      } else {
        clearInterval(stepInterval);
        setProgress(99);

        // 2. Pause at 99% for 2.0 seconds with "Ruko zara, sabar karo... (99%)"
        setStatusText('Ruko zara, sabar karo... (99%)');

        const pauseTimer = setTimeout(() => {
          // 3. Complete and open folder!
          setProgress(100);
          setStatusText('Directory Loaded. Opening...');

          const finishTimer = setTimeout(() => {
            const cb = folderLoading.onComplete;
            closeFolderLoading();
            if (cb && typeof cb === 'function') {
              cb();
            }
          }, 150);

          timerRef.current.push(finishTimer);
        }, 2000); // 2 second pause at 99%

        timerRef.current.push(pauseTimer);
      }
    }, 45);

    timerRef.current.push(stepInterval);

    return () => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current.forEach(clearInterval);
    };
  }, [folderLoading?.isOpen, folderLoading?.folderName, folderLoading?.onComplete, closeFolderLoading]);

  if (!folderLoading?.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/30 font-w95 select-none p-4">
      {/* 3D Classic Windows 98 Dialog Chassis */}
      <div className="w-full max-w-[390px] bg-win-gray win-outset shadow-2xl p-1 text-xs">
        {/* Title Bar */}
        <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold select-none mb-3">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <img
              src="/icons/folder-open.svg"
              alt=""
              className="w-4 h-4 pixelated pointer-events-none"
            />
            <span className="truncate">Windows Explorer - Opening Folder</span>
          </div>

          <button
            disabled
            className="win-outset !p-0 w-3.5 h-3 text-[9px] text-gray-500 bg-win-gray cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div className="px-3 py-2 space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="/icons/folder.svg"
              alt="Folder"
              className="w-8 h-8 pixelated shrink-0 animate-bounce"
            />
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-black text-xs truncate">
                {folderLoading.folderName || 'Selected Folder'}
              </p>
              <p className={`text-[11px] truncate font-semibold mt-0.5 ${
                progress === 99 ? 'text-red-700 animate-pulse' : 'text-blue-900'
              }`}>
                {statusText}
              </p>
            </div>
          </div>

          {/* Authentic 90s Segmented Blue Progress Bar */}
          <div className="h-5 win-inset bg-white p-0.5 overflow-hidden relative flex">
            <div
              style={{
                width: `${progress}%`,
                transition: progress === 99 ? 'none' : 'width 0.05s linear',
              }}
              className="h-full bg-win-navy flex overflow-hidden"
            >
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-full border-r border-win-gray shrink-0 bg-win-navy"
                />
              ))}
            </div>
          </div>

          {/* Subtle 1998 Dial-Up/Drive Reading Footer */}
          <div className="flex justify-between items-center text-[10px] text-gray-600 font-mono pt-1">
            <span>Reading FAT32 sector index...</span>
            <span className="font-bold text-black">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderLoadingModal;

