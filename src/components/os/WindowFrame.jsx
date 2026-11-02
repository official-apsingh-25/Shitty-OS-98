import React, { useRef, useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

const DEFAULT_BOUNDS = {
  explorer: { width: 580, height: 400 },
  notepad: { width: 480, height: 360 },
  wordpad: { width: 560, height: 420 },
  paint: { width: 620, height: 460 },
  calculator: { width: 260, height: 320, resizable: false },
  minesweeper: { width: 280, height: 340, resizable: false },
  'internet-explorer': { width: 680, height: 480 },
  'outlook-express': { width: 640, height: 440 },
  photoviewer: { width: 560, height: 440 },
  'gandhi-viewer': { width: 520, height: 560, resizable: true },
};

export const WindowFrame = ({ window: win, children }) => {
  const {
    activeWindowId,
    focusWindow,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
  } = useOS();

  const isActive = activeWindowId === win.id;
  const config = DEFAULT_BOUNDS[win.id] || { width: 500, height: 380, resizable: true };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Responsive dimensions for mobile devices
  const responsiveWidth = isMobile
    ? Math.min(config.width, Math.floor(window.innerWidth * 0.95))
    : config.width;
  const responsiveHeight = isMobile
    ? Math.min(config.height, Math.floor((window.innerHeight - 32) * 0.8))
    : config.height;

  const [size, setSize] = useState({
    width: responsiveWidth,
    height: responsiveHeight,
  });

  // Calculate spawn coordinates: centered on mobile or if center is requested, else staggered
  const [position, setPosition] = useState(() => {
    if (isMobile) {
      const centerX = Math.max(4, Math.floor((window.innerWidth - responsiveWidth) / 2));
      const centerY = Math.max(6, Math.floor((window.innerHeight - 28 - responsiveHeight) / 2));
      return { x: centerX, y: centerY };
    }
    if (win.initialData?.center) {
      const centerX = Math.max(10, Math.floor((window.innerWidth - config.width) / 2));
      const centerY = Math.max(10, Math.floor((window.innerHeight - 28 - config.height) / 2));
      return { x: centerX, y: centerY };
    }
    const offset = ((win.id.charCodeAt(0) * 23) % 100);
    return {
      x: Math.min(80 + offset, Math.max(30, window.innerWidth - config.width - 30)),
      y: Math.min(50 + offset, Math.max(30, window.innerHeight - config.height - 60)),
    };
  });

  // Re-center when opened or re-opened
  useEffect(() => {
    if (win.isOpen) {
      if (isMobile) {
        const curW = Math.min(config.width, Math.floor(window.innerWidth * 0.95));
        const curH = Math.min(config.height, Math.floor((window.innerHeight - 28) * 0.8));
        setSize({ width: curW, height: curH });
        setPosition({
          x: Math.max(4, Math.floor((window.innerWidth - curW) / 2)),
          y: Math.max(6, Math.floor((window.innerHeight - 28 - curH) / 2)),
        });
      } else if (win.initialData?.center) {
        const centerX = Math.max(10, Math.floor((window.innerWidth - config.width) / 2));
        const centerY = Math.max(10, Math.floor((window.innerHeight - 28 - config.height) / 2));
        setPosition({ x: centerX, y: centerY });
      }
    }
  }, [win.isOpen, win.initialData?.center, isMobile, config.width, config.height]);

  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const windowStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Handle Dragging via Pointer Events
  const handlePointerDown = (e) => {
    // Only primary button or touch can drag
    if (e.button !== undefined && e.button !== 0) return;
    if (win.isMaximized) return;
    focusWindow(win.id);
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    windowStart.current = { ...position, w: size.width, h: size.height };
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      // Clamp position within desktop bounds
      const minX = -size.width + 80;
      const maxX = window.innerWidth - 40;
      const minY = 0;
      const maxY = window.innerHeight - 28;

      const newX = Math.max(minX, Math.min(maxX, windowStart.current.x + dx));
      const newY = Math.max(minY, Math.min(maxY, windowStart.current.y + dy));

      setPosition({ x: newX, y: newY });
    } else if (isResizing.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      const newW = Math.max(200, windowStart.current.w + dx);
      const newH = Math.max(140, windowStart.current.h + dy);

      setSize({ width: newW, height: newH });
    }
  };

  const handlePointerUp = (e) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
    if (isResizing.current) {
      isResizing.current = false;
    }
  };

  // Handle Dragging via Mobile Touch Events
  const handleTouchStart = (e) => {
    if (win.isMaximized || !e.touches || e.touches.length === 0) return;
    focusWindow(win.id);
    isDragging.current = true;
    const t = e.touches[0];
    dragStart.current = { x: t.clientX, y: t.clientY };
    windowStart.current = { ...position, w: size.width, h: size.height };
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStart.current.x;
    const dy = t.clientY - dragStart.current.y;

    const minX = -size.width + 60;
    const maxX = window.innerWidth - 30;
    const minY = 0;
    const maxY = window.innerHeight - 28;

    const newX = Math.max(minX, Math.min(maxX, windowStart.current.x + dx));
    const newY = Math.max(minY, Math.min(maxY, windowStart.current.y + dy));

    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Handle Resizing
  const handleResizeStart = (e) => {
    if (win.isMaximized || config.resizable === false) return;
    e.stopPropagation();
    focusWindow(win.id);
    isResizing.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    windowStart.current = { ...position, w: size.width, h: size.height };
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const isResizable = config.resizable !== false;

  return (
    <div
      onMouseDown={() => focusWindow(win.id)}
      onTouchStart={() => focusWindow(win.id)}
      style={{
        position: 'absolute',
        left: win.isMaximized ? '0px' : `${position.x}px`,
        top: win.isMaximized ? '0px' : `${position.y}px`,
        width: win.isMaximized ? '100vw' : `${size.width}px`,
        height: win.isMaximized ? 'calc(100dvh - 28px)' : `${size.height}px`,
        maxWidth: win.isMaximized ? '100vw' : '95vw',
        maxHeight: win.isMaximized ? 'calc(100dvh - 28px)' : '82dvh',
        zIndex: win.zIndex,
      }}
      className="win-outset bg-win-gray flex flex-col shadow-lg overflow-hidden select-none font-w95"
    >
      {/* 3D Beveled Title Bar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={() => isResizable && toggleMaximizeApp(win.id)}
        style={{
          background: isActive
            ? 'linear-gradient(90deg, #000080 0%, #1084d0 100%)'
            : 'linear-gradient(90deg, #808080 0%, #b5b5b5 100%)',
          color: isActive ? '#ffffff' : '#c0c0c0',
          touchAction: 'none',
        }}
        className="h-6 px-1 flex items-center justify-between select-none cursor-default font-bold shrink-0"
      >
        {/* Title Bar Left: Icon + Title */}
        <div className="flex items-center space-x-1.5 overflow-hidden pr-2">
          {win.icon && (
            <img
              src={win.icon}
              alt=""
              className="w-4 h-4 shrink-0 pointer-events-none pixelated"
            />
          )}
          <span className="truncate text-xs font-w95 tracking-wide leading-none pt-0.5">
            {win.title}
          </span>
        </div>

        {/* Title Bar Right: Working 3D Bevel Buttons (Touch-Friendly Target on Mobile) */}
        <div
          className="flex items-center space-x-1 shrink-0"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Minimize Button */}
          <button
            onClick={() => minimizeApp(win.id)}
            title="Minimize"
            className="w-[22px] h-[22px] sm:w-4 sm:h-3.5 min-w-[22px] min-h-[22px] sm:min-w-[16px] sm:min-h-[14px] bg-win-gray win-outset active:win-pressed !p-0 font-w95 font-bold text-xs sm:text-[9px] flex items-center justify-center text-black leading-none"
          >
            _
          </button>
          
          {/* Maximize / Restore Button */}
          {isResizable && (
            <button
              onClick={() => toggleMaximizeApp(win.id)}
              title={win.isMaximized ? 'Restore' : 'Maximize'}
              className="w-[22px] h-[22px] sm:w-4 sm:h-3.5 min-w-[22px] min-h-[22px] sm:min-w-[16px] sm:min-h-[14px] bg-win-gray win-outset active:win-pressed !p-0 font-w95 font-bold text-xs sm:text-[9px] flex items-center justify-center text-black leading-none"
            >
              {win.isMaximized ? '❐' : '□'}
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={() => closeApp(win.id)}
            title="Close"
            className="w-[22px] h-[22px] sm:w-4 sm:h-3.5 min-w-[22px] min-h-[22px] sm:min-w-[16px] sm:min-h-[14px] bg-win-gray win-outset active:win-pressed !p-0 font-w95 font-bold text-xs sm:text-[10px] flex items-center justify-center text-black leading-none ml-0.5"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-win-gray p-0.5">
        {children}
      </div>

      {/* 3D Resize Grip (Bottom-Right Corner) */}
      {isResizable && !win.isMaximized && (
        <div
          onPointerDown={handleResizeStart}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-nwse-resize z-50 flex items-end justify-end p-0.5"
        >
          <div className="w-2.5 h-2.5 flex flex-col items-end justify-end space-y-0.5 opacity-60">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-0.5 bg-black" />
            </div>
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-0.5 bg-black" />
              <div className="w-0.5 h-0.5 bg-black" />
            </div>
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-0.5 bg-black" />
              <div className="w-0.5 h-0.5 bg-black" />
              <div className="w-0.5 h-0.5 bg-black" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WindowFrame;
