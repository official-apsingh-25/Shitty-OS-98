import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

export const StartMenu = ({ isOpen, onClose }) => {
  const {
    openApp,
    crtEnabled,
    toggleCrt,
    playSound,
    openFolderWithFakeLoading
  } = useOS();

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [runInput, setRunInput] = useState('');
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (!e.target.closest('#start-button')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRunSubmit = (e) => {
    e.preventDefault();
    const cmd = runInput.trim().toLowerCase();
    if (cmd === '1998' || cmd === 'matrix' || cmd === 'timecapsule') openApp('timecapsule');
    else if (cmd === 'notepad' || cmd === 'notepad.exe') openApp('notepad');
    else if (cmd === 'calc' || cmd === 'calculator') openApp('calculator');
    else if (cmd === 'paint' || cmd === 'mspaint') openApp('paint');
    else if (cmd === 'wordpad' || cmd === 'write') openApp('wordpad');
    else if (cmd === 'minesweeper' || cmd === 'winmine') openApp('minesweeper');
    else if (cmd === 'explorer' || cmd === 'c:') openApp('explorer');
    else if (cmd === 'iexplore' || cmd === 'ie') openApp('internet-explorer');
    else if (cmd === 'mail' || cmd === 'outlook') openApp('outlook-express');
    else {
      playSound('error');
      alert(`Cannot find '${runInput}'. Make sure you typed the name correctly, and then try again.`);
    }
    setShowRunModal(false);
    setRunInput('');
    onClose();
  };

  return (
    <>
      <div
        ref={menuRef}
        className="fixed bottom-[28px] left-0 z-[9999] flex bg-win-gray win-outset shadow-2xl font-w95 select-none text-xs"
        style={{ width: '224px' }}
      >
        {/* Left Side Vertical Blue 'Windows 98' Banner Strip */}
        <div className="w-8 bg-gradient-to-t from-win-navy via-win-navy to-win-blue flex items-end justify-center py-4 select-none shrink-0">
          <span
            className="text-white font-bold text-base tracking-widest uppercase transform -rotate-90 origin-bottom whitespace-nowrap opacity-95"
            style={{ textShadow: '1px 1px 0px #000' }}
          >
            Windows<span className="font-light ml-1 text-slate-300">98</span>
          </span>
        </div>

        {/* Right Menu Items List */}
        <div className="flex-1 py-1 flex flex-col justify-between">
          <div className="space-y-0.5">
            {/* Programs Submenu with Arrow */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveSubmenu('programs')}
            >
              <div className="flex items-center justify-between px-3 py-1.5 hover:bg-win-navy hover:text-white cursor-default">
                <div className="flex items-center space-x-2.5">
                  <img src="/icons/folder.svg" alt="" className="w-5 h-5 pointer-events-none pixelated" />
                  <span>Programs</span>
                </div>
                <span className="text-[10px]">▶</span>
              </div>

              {/* Programs Cascading Submenu */}
              {activeSubmenu === 'programs' && (
                <div
                  className="absolute left-[99%] top-0 w-52 bg-win-gray win-outset shadow-2xl py-1 z-[10000]"
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <button
                    onClick={() => { openApp('notepad'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/notepad.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>Notepad</span>
                  </button>

                  <button
                    onClick={() => { openApp('wordpad'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/wordpad.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>WordPad</span>
                  </button>

                  <button
                    onClick={() => { openApp('paint'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/paint.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>MS Paint</span>
                  </button>

                  <button
                    onClick={() => { openApp('calculator'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/calculator.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>Calculator</span>
                  </button>

                  <button
                    onClick={() => { openApp('minesweeper'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/minesweeper.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>Minesweeper</span>
                  </button>

                  <div className="border-t border-win-dark my-1 mx-2" />

                  <button
                    onClick={() => { openApp('internet-explorer'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/internet-explorer.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>Internet Explorer</span>
                  </button>

                  <button
                    onClick={() => { openApp('outlook-express'); onClose(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/outlook-express.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>Outlook Express</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      openFolderWithFakeLoading('Local Disk (C:)', () => {
                        openApp('explorer');
                      });
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <img src="/icons/my-computer.svg" alt="" className="w-5 h-5 pixelated" />
                    <span>Windows Explorer</span>
                  </button>
                </div>
              )}
            </div>

            {/* Documents */}
            <button
              onClick={() => {
                onClose();
                openFolderWithFakeLoading('My Documents', () => {
                  openApp('explorer', { folderId: 'my-documents' });
                });
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white cursor-default"
            >
              <img src="/icons/folder.svg" alt="" className="w-5 h-5 pointer-events-none pixelated" />
              <span>Documents</span>
            </button>

            {/* Settings (with CRT Effect Toggle) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveSubmenu('settings')}
            >
              <div className="flex items-center justify-between px-3 py-1.5 hover:bg-win-navy hover:text-white cursor-default">
                <div className="flex items-center space-x-2.5">
                  <img src="/icons/folder.svg" alt="" className="w-5 h-5 pointer-events-none pixelated" />
                  <span>Settings</span>
                </div>
                <span className="text-[10px]">▶</span>
              </div>

              {activeSubmenu === 'settings' && (
                <div
                  className="absolute left-[99%] top-0 w-48 bg-win-gray win-outset shadow-2xl py-1 z-[10000]"
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <button
                    onClick={toggleCrt}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-win-navy hover:text-white"
                  >
                    <span>CRT Monitor Effect</span>
                    <span className="font-bold">{crtEnabled ? '[ON]' : '[OFF]'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Help */}
            <button
              onClick={() => {
                openApp('notepad', {
                  content: `MICROSOFT WINDOWS 98 HELP
=============================
Welcome to Windows 98 Second Edition Web OS.
• Double-click desktop icons to launch apps.
• Use the Start button to navigate the system.
• Drag windows by their title bars.
• Use the CRT toggle in Settings or the system tray to adjust display aesthetics.`
                });
                onClose();
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white cursor-default"
            >
              <img src="/icons/file-text.svg" alt="" className="w-5 h-5 pointer-events-none pixelated" />
              <span>Help Topics</span>
            </button>

            {/* Run... */}
            <button
              onClick={() => {
                setShowRunModal(true);
                onClose();
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white cursor-default"
            >
              <img src="/icons/win98-logo.svg" alt="" className="w-5 h-5 pointer-events-none pixelated" />
              <span>Run...</span>
            </button>
          </div>

          <div className="border-t border-win-dark my-1 mx-2" />

          {/* Shut Down / Restart */}
          <button
            onClick={() => {
              setShowShutdownModal(true);
              onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-1.5 text-left hover:bg-win-navy hover:text-white cursor-default"
          >
            <img src="/icons/shutdown.svg" alt="" className="w-5 h-5 pointer-events-none pixelated" />
            <span className="font-bold">Shut Down...</span>
          </button>
        </div>
      </div>

      {/* Classic Run Modal Dialog */}
      {showRunModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/30 font-w95">
          <div className="w-80 bg-win-gray win-outset p-2 text-xs">
            <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold mb-2">
              <span>Run</span>
              <button
                onClick={() => setShowRunModal(false)}
                className="win-outset active:win-pressed !p-0 w-3.5 h-3 text-[9px] text-black bg-win-gray"
              >
                ✕
              </button>
            </div>
            <p className="mb-2">Type the name of a program, folder, or document to open:</p>
            <form onSubmit={handleRunSubmit}>
              <div className="flex items-center space-x-2 mb-3">
                <label className="font-bold">Open:</label>
                <input
                  type="text"
                  value={runInput}
                  onChange={(e) => setRunInput(e.target.value)}
                  placeholder="notepad, calc, paint, minesweeper..."
                  className="flex-1 win-inset bg-white px-1.5 py-0.5 outline-none font-mono text-xs"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="submit" className="win-outset active:win-pressed px-3 bg-win-gray">OK</button>
                <button type="button" onClick={() => setShowRunModal(false)} className="win-outset active:win-pressed px-3 bg-win-gray">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Classic Windows 98 Shut Down Modal Dialog */}
      {showShutdownModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 font-w95">
          <div className="w-80 bg-win-gray win-outset p-2 text-xs shadow-2xl">
            <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold mb-2">
              <span>Shut Down Windows</span>
              <button
                onClick={() => setShowShutdownModal(false)}
                className="win-outset active:win-pressed !p-0 w-3.5 h-3 text-[9px] text-black bg-win-gray"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <img src="/icons/win98-logo.svg" alt="" className="w-8 h-8 pixelated" />
              <div>
                <p className="font-bold text-sm">What do you want the computer to do?</p>
                <p className="text-gray-700 mt-1">Restart Windows 98 Web Edition.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => window.location.reload()}
                className="win-outset active:win-pressed px-4 py-1 bg-win-gray font-bold"
              >
                Restart
              </button>
              <button
                onClick={() => setShowShutdownModal(false)}
                className="win-outset active:win-pressed px-3 py-1 bg-win-gray"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartMenu;
