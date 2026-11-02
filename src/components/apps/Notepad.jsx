import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

export const Notepad = ({ window: win }) => {
  const { playSound, closeApp } = useOS();

  // Resolve filename and storage key
  const filename = win.initialData?.filename || (win.title && win.title.replace(' - Notepad', '')) || 'Untitled.txt';
  const storageKey = `win98_notepad_${filename}`;

  // Initialize content: from localStorage if previously edited, or from initialData
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) return saved;
    return win.initialData?.content || '';
  });

  const [wordWrap, setWordWrap] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Sync content if initialData changes
  useEffect(() => {
    if (win.initialData?.content !== undefined) {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) {
        setContent(win.initialData.content);
      }
    }
  }, [win.initialData, storageKey]);

  // Save to localStorage
  const handleSave = () => {
    playSound('ding');
    localStorage.setItem(storageKey, content);
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2500);
    alert(`File '${filename}' saved to localStorage successfully.`);
  };

  const handleNew = () => {
    playSound('click');
    if (content.length > 0 && !confirm('Clear current document and create new?')) return;
    setContent('');
  };

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* 1. Classic Menu Bar (File Edit Search Help) */}
      <div className="flex items-center space-x-2 sm:space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0 overflow-x-auto no-scrollbar">
        <div className="relative group">
          <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full w-32 bg-win-gray win-outset shadow-2xl py-0.5 z-50">
            <button
              onClick={handleNew}
              className="w-full text-left px-2 py-0.5 hover:bg-win-navy hover:text-white"
            >
              New
            </button>
            <button
              onClick={handleSave}
              className="w-full text-left px-2 py-0.5 hover:bg-win-navy hover:text-white font-bold"
            >
              Save (Local)
            </button>
            <div className="border-t border-win-dark my-0.5" />
            <button
              onClick={() => closeApp(win.id)}
              className="w-full text-left px-2 py-0.5 hover:bg-win-navy hover:text-white"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="relative group">
          <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full w-28 bg-win-gray win-outset shadow-2xl py-0.5 z-50">
            <button
              onClick={() => setContent('')}
              className="w-full text-left px-2 py-0.5 hover:bg-win-navy hover:text-white"
            >
              Clear All
            </button>
            <button
              onClick={() => setWordWrap(!wordWrap)}
              className="w-full text-left px-2 py-0.5 hover:bg-win-navy hover:text-white"
            >
              Word Wrap: {wordWrap ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <span
          onClick={() => {
            playSound('click');
            const query = prompt('Search text:');
            if (query && content.includes(query)) {
              alert(`Found '${query}' in document.`);
            } else if (query) {
              alert(`Cannot find "${query}"`);
            }
          }}
          className="hover:bg-win-navy hover:text-white px-1 cursor-default"
        >
          Search
        </span>

        <span
          onClick={() => {
            playSound('click');
            alert('Microsoft Notepad\nWindows 98 Second Edition\nLocal file editing enabled.');
          }}
          className="hover:bg-win-navy hover:text-white px-1 cursor-default"
        >
          Help
        </span>

        {/* Quick Save button in menubar */}
        <button
          onClick={handleSave}
          title="Save changes to localStorage"
          className="ml-auto text-[10px] win-outset active:win-pressed px-1.5 py-0.2 bg-win-gray"
        >
          💾 Save
        </button>
      </div>

      {/* 2. Full-height Monospace Textarea in Sunken Inset Viewport */}
      <div className="flex-1 p-0.5 win-inset bg-white m-0.5 flex flex-col overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          wrap={wordWrap ? 'soft' : 'off'}
          placeholder="Type your notes here..."
          className="w-full flex-1 p-2 outline-none resize-none font-mono text-xs bg-white text-black leading-relaxed select-text"
          autoFocus
        />
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>
          {filename} {saveStatus && <b className="text-green-700 ml-2">[{saveStatus}]</b>}
        </span>
        <span className="font-mono">
          Lines: {content.split('\n').length} | Chars: {content.length}
        </span>
      </div>
    </div>
  );
};

export default Notepad;
