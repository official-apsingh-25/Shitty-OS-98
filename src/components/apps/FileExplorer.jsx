import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { initialFileSystem, findParentNode } from '../../data/fileSystem';
import { isTouchOrMobile } from '../../utils/device';

export const FileExplorer = ({ window: win }) => {
  const { openApp, playSound, triggerBsod, openFolderWithFakeLoading } = useOS();

  // Root file system tree
  const cDrive = initialFileSystem.children[0];
  const recycleBin = initialFileSystem.children[1];

  // Resolve initial folder from win.initialData
  const resolveInitialFolder = () => {
    if (win.initialData?.folderId === 'my-documents') {
      return cDrive.children.find((c) => c.id === 'my-documents') || cDrive;
    }
    if (win.initialData?.folderId === 'recycle-bin') {
      return recycleBin;
    }
    return cDrive;
  };

  const [currentFolder, setCurrentFolder] = useState(resolveInitialFolder);
  const [history, setHistory] = useState([resolveInitialFolder()]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Password Verification Modal State
  const [passwordTarget, setPasswordTarget] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Navigation handlers
  const navigateTo = (folder) => {
    playSound('click');
    setCurrentFolder(folder);
    setHistory((prev) => [...prev.slice(0, historyIdx + 1), folder]);
    setHistoryIdx((prev) => prev + 1);
    setSelectedItemId(null);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      playSound('click');
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setCurrentFolder(prev);
      setSelectedItemId(null);
    }
  };

  const handleUp = () => {
    if (currentFolder.id === 'c-drive' || currentFolder.id === 'root' || currentFolder.id === 'recycle-bin') {
      return;
    }
    playSound('click');
    const parent = findParentNode(initialFileSystem, currentFolder.id);
    if (parent) {
      navigateTo(parent);
    }
  };

  // Double-click file/folder launcher
  const handleItemDoubleClick = (item) => {
    // 1. Password Protected check
    if (item.isProtected && !item.unlocked) {
      playSound('chord');
      setPasswordTarget(item);
      setPasswordInput('');
      setPasswordError(false);
      return;
    }

    // 2. Folder Navigation (With Fake 99% Stuck Loading Bar)
    if (item.type === 'folder' || item.type === 'drive') {
      openFolderWithFakeLoading(item.name, () => {
        navigateTo(item);
      });
      return;
    }

    // 3. Routing according to file extension
    playSound('click');

    // Easter Egg: DO_NOT_DELETE.sys triggers BSOD
    if (item.name === 'DO_NOT_DELETE.sys') {
      triggerBsod();
      return;
    }

    if (item.type === 'txt') {
      openApp('notepad', {
        title: `${item.name} - Notepad`,
        content: item.content || '',
      });
    } else if (item.type === 'doc') {
      openApp('wordpad', {
        title: `${item.name} - WordPad`,
        content: item.content || '',
      });
    } else if (item.type === 'image') {
      openApp('photoviewer', {
        title: `${item.name} - 1998 Photo Viewer`,
        imageUrl: item.imageUrl,
        name: item.name,
      });
    } else if (item.type === 'sys') {
      openApp('notepad', {
        title: `${item.name} - System File`,
        content: item.content || '',
      });
    } else if (item.appId) {
      openApp(item.appId);
    }
  };

  // Password Unlock handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === passwordTarget.password) {
      playSound('ding');
      passwordTarget.unlocked = true;
      const target = passwordTarget;
      setPasswordTarget(null);

      // Open the unlocked file
      openApp('notepad', {
        title: `${target.name} (Decrypted) - Notepad`,
        content: target.content,
      });
    } else {
      playSound('error');
      setPasswordError(true);
    }
  };

  const getPathString = (folder) => {
    return folder.path || folder.name;
  };

  // Helper to get appropriate icon per file type
  const getItemIcon = (item) => {
    if (item.type === 'folder' || item.type === 'drive') return '/icons/folder.svg';
    if (item.isProtected) return '/icons/folder-locked.svg';
    if (item.type === 'txt') return '/icons/file-text.svg';
    if (item.type === 'doc') return '/icons/wordpad.svg';
    if (item.type === 'image') return '/icons/paint.svg';
    if (item.appId === 'notepad') return '/icons/notepad.svg';
    if (item.appId === 'wordpad') return '/icons/wordpad.svg';
    if (item.appId === 'paint') return '/icons/paint.svg';
    if (item.appId === 'calculator') return '/icons/calculator.svg';
    if (item.appId === 'minesweeper') return '/icons/minesweeper.svg';
    return '/icons/file-text.svg';
  };

  const childrenItems = currentFolder.children || [];

  return (
    <div className="flex-1 flex flex-col bg-win-gray select-none font-w95 text-xs h-full">
      {/* 1. Classic Win98 Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0 overflow-x-auto no-scrollbar">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* 2. Navigation Toolbar with Back & Up buttons */}
      <div className="flex items-center space-x-1 px-1.5 py-1 border-b border-white bg-win-gray shrink-0 overflow-x-auto no-scrollbar">
        <button
          onClick={handleBack}
          disabled={historyIdx === 0}
          className={`win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 ${
            historyIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Back"
        >
          <span>⬅</span>
          <span>Back</span>
        </button>

        <button
          onClick={handleUp}
          disabled={currentFolder.id === 'c-drive' || currentFolder.id === 'root' || currentFolder.id === 'recycle-bin'}
          className={`win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 ${
            currentFolder.id === 'c-drive' || currentFolder.id === 'recycle-bin'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          title="Up one level"
        >
          <span>⬆</span>
          <span>Up</span>
        </button>

        <div className="w-[1px] h-4 bg-win-dark mx-1" />

        {/* Address Bar */}
        <div className="flex-1 flex items-center space-x-1 px-1">
          <span className="text-gray-700">Address:</span>
          <div className="flex-1 win-inset bg-white px-1.5 py-0.5 text-black flex items-center">
            <img src="/icons/folder.svg" alt="" className="w-3.5 h-3.5 mr-1 pixelated" />
            <span className="truncate">{getPathString(currentFolder)}</span>
          </div>
        </div>
      </div>

      {/* 3. Main Explorer Body (Dual Pane / Left Panel + Item Grid) */}
      <div className="flex-1 flex overflow-hidden win-inset bg-white m-1">
        {/* Left Side Classic Web-View Panel (Responsive: hidden on mobile to give room to files) */}
        <div className="hidden sm:flex sm:w-36 md:w-40 bg-[#d4d0c8] p-2 border-r border-win-dark flex-col justify-between shrink-0 select-none">
          <div>
            <div className="flex items-center space-x-1.5 mb-2">
              <img src="/icons/folder-open.svg" alt="" className="w-6 h-6 pixelated" />
              <span className="font-bold text-xs truncate text-blue-900">{currentFolder.name}</span>
            </div>
            <div className="border-t border-win-dark my-1" />
            <p className="text-[10px] text-gray-700 leading-normal">
              Double-click (or tap on mobile) a file or folder to open its contents.
            </p>
            {selectedItemId && (
              <div className="mt-3 text-[10px] text-gray-800 bg-white win-inset p-1.5">
                <span className="font-bold block truncate">
                  {childrenItems.find((c) => c.id === selectedItemId)?.name}
                </span>
                <span className="text-gray-500 block">
                  {childrenItems.find((c) => c.id === selectedItemId)?.size || ''}
                </span>
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-600 border-t border-win-dark pt-1">
            <span>{childrenItems.length} object(s)</span>
          </div>
        </div>

        {/* Right Side Item View Grid */}
        <div
          onClick={() => setSelectedItemId(null)}
          className="flex-1 p-2 sm:p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 content-start overflow-y-auto"
        >
          {childrenItems.length > 0 ? (
            childrenItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              const iconSrc = getItemIcon(item);

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItemId(item.id);
                    // Smart Single-Tap for Mobile
                    if (isTouchOrMobile()) {
                      handleItemDoubleClick(item);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    // Classic Double-Click for Desktop
                    handleItemDoubleClick(item);
                  }}
                  className={`flex flex-col items-center justify-start p-1.5 cursor-default ${
                    isSelected ? 'bg-win-navy text-white' : 'hover:bg-blue-50 text-black'
                  }`}
                >
                  <img
                    src={iconSrc}
                    alt={item.name}
                    className="w-8 h-8 mb-1 pointer-events-none pixelated"
                  />
                  <span className="text-[11px] text-center break-words max-w-full leading-tight select-none">
                    {item.name}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-gray-500 italic p-4 text-center">
              (This folder is empty)
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Status Bar with Total Items Count */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>{childrenItems.length} object(s) (plus 0 hidden)</span>
        <span>Local intranet zone</span>
      </div>

      {/* Classic Windows 98 Password Prompt Modal */}
      {passwordTarget && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 font-w95 p-3">
          <div className="w-[90vw] max-w-[340px] bg-win-gray win-outset p-2 text-xs shadow-2xl">
            <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold mb-2">
              <span>Security Access Required</span>
              <button
                onClick={() => setPasswordTarget(null)}
                className="win-outset active:win-pressed !p-0 w-3.5 h-3 text-[9px] text-black bg-win-gray"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-2 p-1">
              <img src="/icons/folder-locked.svg" alt="" className="w-8 h-8 pixelated" />
              <div>
                <p className="font-bold text-black">{passwordTarget.name}</p>
                <p className="text-gray-700 text-[11px]">
                  This archive is locked. Please enter the decryption key:
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-2">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password..."
                  className="w-full win-inset bg-white px-2 py-1 outline-none text-xs font-mono"
                  autoFocus
                />
              </div>

              {passwordError && (
                <p className="text-red-700 font-bold mb-2 text-[11px]">
                  Incorrect Password! Hint: Check the deleted chat in Recycle Bin!
                </p>
              )}

              <div className="flex justify-end space-x-2">
                <button type="submit" className="win-outset active:win-pressed px-3 py-1 bg-win-gray font-bold">
                  OK
                </button>
                <button
                  type="button"
                  onClick={() => setPasswordTarget(null)}
                  className="win-outset active:win-pressed px-3 py-1 bg-win-gray"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
