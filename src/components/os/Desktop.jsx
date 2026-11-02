import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

const DESKTOP_ICONS = [
  { id: 'explorer', title: 'My Computer', icon: '/icons/my-computer.svg' },
  { id: 'explorer', title: 'My Documents', icon: '/icons/folder.svg', data: { folderId: 'my-documents' } },
  { id: 'explorer', title: 'Recycle Bin', icon: '/icons/recycle-bin.svg', data: { folderId: 'recycle-bin' } },
  { id: 'internet-explorer', title: 'Internet Explorer', icon: '/icons/internet-explorer.svg' },
  { id: 'outlook-express', title: 'Outlook Express', icon: '/icons/outlook-express.svg' },
  { id: 'notepad', title: 'Notepad', icon: '/icons/notepad.svg' },
  { id: 'wordpad', title: 'WordPad', icon: '/icons/wordpad.svg' },
  { id: 'paint', title: 'MS Paint', icon: '/icons/paint.svg' },
  { id: 'calculator', title: 'Calculator', icon: '/icons/calculator.svg' },
  { id: 'minesweeper', title: 'Minesweeper', icon: '/icons/minesweeper.svg' },
];

export const Desktop = ({ children, startMenuOpen, closeStartMenu }) => {
  const { openApp, crtEnabled, playSound, openFolderWithFakeLoading } = useOS();
  const [selectedIconIdx, setSelectedIconIdx] = useState(null);
  const [marquee, setMarquee] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const desktopRef = useRef(null);

  // Close context menu on global click
  useEffect(() => {
    const handleGlobalClick = () => {
      setContextMenu(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Marquee Selection Logic
  const handleMouseDown = (e) => {
    if (e.target !== desktopRef.current && !e.target.classList.contains('desktop-bg')) {
      return;
    }
    if (closeStartMenu) closeStartMenu();
    setSelectedIconIdx(null);
    setContextMenu(null);

    const rect = desktopRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setMarquee({ startX, startY, currentX: startX, currentY: startY });
  };

  const handleMouseMove = (e) => {
    if (!marquee) return;
    const rect = desktopRef.current.getBoundingClientRect();
    setMarquee((prev) => ({
      ...prev,
      currentX: e.clientX - rect.left,
      currentY: e.clientY - rect.top,
    }));
  };

  const handleMouseUp = () => {
    if (marquee) {
      setMarquee(null);
    }
  };

  // Right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    if (closeStartMenu) closeStartMenu();
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 150),
      y: Math.min(e.clientY, window.innerHeight - 160),
    });
  };

  const handleIconClick = (e, idx) => {
    e.stopPropagation();
    if (closeStartMenu) closeStartMenu();
    setSelectedIconIdx(idx);
  };

  const handleIconDoubleClick = (e, item) => {
    e.stopPropagation();
    // 4. Fake 99% Stuck Loading Bar for Folders
    if (item.id === 'explorer') {
      const folderName =
        item.data?.folderId === 'my-documents'
          ? 'My Documents'
          : item.data?.folderId === 'recycle-bin'
          ? 'Recycle Bin'
          : 'My Computer';

      openFolderWithFakeLoading(folderName, () => {
        openApp(item.id, item.data || null);
      });
    } else {
      openApp(item.id, item.data || null);
    }
  };

  return (
    <div
      ref={desktopRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      className="desktop-bg relative w-screen h-screen bg-win-teal overflow-hidden select-none font-w95"
    >
      {/* Vertical Grid of Desktop Icons on Left Side */}
      <div className="absolute top-3 left-3 bottom-[32px] flex flex-col flex-wrap items-start content-start gap-y-3.5 gap-x-3 pointer-events-none">
        {DESKTOP_ICONS.map((item, idx) => {
          const isSelected = selectedIconIdx === idx;
          return (
            <div
              key={`${item.id}-${idx}`}
              onClick={(e) => handleIconClick(e, idx)}
              onDoubleClick={(e) => handleIconDoubleClick(e, item)}
              className="pointer-events-auto flex flex-col items-center justify-start w-[76px] p-1 cursor-default group"
            >
              <div className="relative w-8 h-8 flex items-center justify-center mb-1">
                <img
                  src={item.icon}
                  alt={item.title}
                  className={`w-8 h-8 pointer-events-none pixelated ${
                    isSelected ? 'filter drop-shadow-[0_0_1px_#000080]' : ''
                  }`}
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-win-navy/35 pointer-events-none" />
                )}
              </div>
              <span
                style={{
                  backgroundColor: isSelected ? '#000080' : 'transparent',
                  color: '#ffffff',
                  outline: isSelected ? '1px dotted #ffffff' : 'none',
                }}
                className={`text-center font-w95 text-[11px] leading-tight px-1 py-0.5 max-w-full break-words select-none ${
                  !isSelected ? 'drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]' : ''
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dotted Rubberband Selection Box */}
      {marquee && (
        <div
          className="absolute border border-dotted border-white bg-win-navy/20 pointer-events-none z-10"
          style={{
            left: `${Math.min(marquee.startX, marquee.currentX)}px`,
            top: `${Math.min(marquee.startY, marquee.currentY)}px`,
            width: `${Math.abs(marquee.currentX - marquee.startX)}px`,
            height: `${Math.abs(marquee.currentY - marquee.startY)}px`,
          }}
        />
      )}

      {/* Desktop Right Click Context Menu */}
      {contextMenu && (
        <div
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed z-[99999] w-36 bg-win-gray win-outset shadow-2xl py-1 text-xs font-w95 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { playSound('click'); setContextMenu(null); }}
            className="w-full text-left px-3 py-1 hover:bg-win-navy hover:text-white"
          >
            Arrange Icons
          </button>
          <button
            onClick={() => { playSound('click'); setContextMenu(null); }}
            className="w-full text-left px-3 py-1 hover:bg-win-navy hover:text-white"
          >
            Refresh
          </button>
          <div className="border-t border-win-dark my-1 mx-1" />
          <button
            onClick={() => {
              openApp('notepad', { title: 'New Text Document.txt' });
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-1 hover:bg-win-navy hover:text-white"
          >
            New Document
          </button>
          <div className="border-t border-win-dark my-1 mx-1" />
          <button
            onClick={() => {
              openApp('notepad', {
                title: 'Display Properties',
                content: `WINDOWS 98 DISPLAY PROPERTIES:
Resolution: 1024 x 768 True Color (32-bit)
Color Palette: 16.7 Million Colors
Monitor: 17-inch Super VGA CRT
Adapter: 3Dfx Voodoo2 12MB PCI`
              });
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-1 hover:bg-win-navy hover:text-white"
          >
            Properties
          </button>
        </div>
      )}

      {/* Render Open Windows */}
      {children}

      {/* CRT Scanlines and Vignette Effect */}
      {crtEnabled && (
        <>
          <div className="crt-overlay" />
          <div className="crt-vignette" />
        </>
      )}
    </div>
  );
};

export default Desktop;
