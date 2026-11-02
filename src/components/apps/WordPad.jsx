import React, { useState, useRef } from 'react';
import { useOS } from '../../context/OSContext';

export const WordPad = ({ window: win }) => {
  const { playSound } = useOS();

  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [fontSize, setFontSize] = useState('14px');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState('left');

  const editorRef = useRef(null);

  // Default content or from passed .doc file (e.g. school_essay_98.doc)
  const initialText = win.initialData?.content || `THE FUTURE OF THE YEAR 2000 & THE Y2K PHENOMENON
Social Studies Term Essay — Period 4
Student: Alex Vance | October 1998

Welcome to WordPad 1998!
You can format this document using the toolbar buttons above.
Try selecting text or typing your own essay.`;

  const [docContent, setDocContent] = useState(initialText);

  const handleSave = () => {
    playSound('ding');
    alert('Document saved to memory.');
  };

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* 1. Classic WordPad Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0 overflow-x-auto no-scrollbar">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Insert</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Format</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
        <button
          onClick={handleSave}
          className="ml-auto text-[10px] win-outset active:win-pressed px-1.5 py-0.2 bg-win-gray shrink-0"
        >
          💾 Save
        </button>
      </div>

      {/* 2. Formatting Toolbar */}
      <div className="flex items-center gap-1.5 p-1 bg-win-gray border-b border-win-dark shrink-0 overflow-x-auto no-scrollbar">
        {/* Font Family Selector */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="win-inset bg-white px-1.5 py-0.5 text-xs outline-none font-sans"
        >
          <option value="Times New Roman">Times New Roman</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="W95FA">MS Sans Serif</option>
        </select>

        {/* Font Size Selector */}
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="win-inset bg-white px-1 py-0.5 text-xs outline-none w-14"
        >
          <option value="11px">10</option>
          <option value="13px">12</option>
          <option value="15px">14</option>
          <option value="18px">18</option>
          <option value="22px">22</option>
        </select>

        <div className="w-[1px] h-4 bg-win-dark mx-0.5" />

        {/* Bold Button */}
        <button
          onClick={() => { playSound('click'); setIsBold(!isBold); }}
          title="Bold"
          className={`w-6 h-5 font-bold font-serif text-xs ${
            isBold ? 'win-pressed bg-[#d0ccc4]' : 'win-outset bg-win-gray'
          }`}
        >
          B
        </button>

        {/* Italic Button */}
        <button
          onClick={() => { playSound('click'); setIsItalic(!isItalic); }}
          title="Italic"
          className={`w-6 h-5 italic font-serif text-xs ${
            isItalic ? 'win-pressed bg-[#d0ccc4]' : 'win-outset bg-win-gray'
          }`}
        >
          I
        </button>

        {/* Underline Button */}
        <button
          onClick={() => { playSound('click'); setIsUnderline(!isUnderline); }}
          title="Underline"
          className={`w-6 h-5 underline font-serif text-xs ${
            isUnderline ? 'win-pressed bg-[#d0ccc4]' : 'win-outset bg-win-gray'
          }`}
        >
          U
        </button>

        <div className="w-[1px] h-4 bg-win-dark mx-0.5" />

        {/* Align Left */}
        <button
          onClick={() => { playSound('click'); setTextAlign('left'); }}
          title="Align Left"
          className={`w-6 h-5 text-xs ${
            textAlign === 'left' ? 'win-pressed bg-[#d0ccc4]' : 'win-outset bg-win-gray'
          }`}
        >
          ≡
        </button>

        {/* Align Center */}
        <button
          onClick={() => { playSound('click'); setTextAlign('center'); }}
          title="Center"
          className={`w-6 h-5 text-xs ${
            textAlign === 'center' ? 'win-pressed bg-[#d0ccc4]' : 'win-outset bg-win-gray'
          }`}
        >
          ≢
        </button>

        {/* Align Right */}
        <button
          onClick={() => { playSound('click'); setTextAlign('right'); }}
          title="Align Right"
          className={`w-6 h-5 text-xs ${
            textAlign === 'right' ? 'win-pressed bg-[#d0ccc4]' : 'win-outset bg-win-gray'
          }`}
        >
          ≣
        </button>
      </div>

      {/* 3. Vintage WordPad Inch Ruler */}
      <div className="h-4 bg-[#e4e0d8] border-b border-win-dark flex items-center px-6 text-[9px] text-gray-600 font-mono select-none shrink-0">
        <span className="w-12 border-l border-gray-400 pl-0.5">1"</span>
        <span className="w-12 border-l border-gray-400 pl-0.5">2"</span>
        <span className="w-12 border-l border-gray-400 pl-0.5">3"</span>
        <span className="w-12 border-l border-gray-400 pl-0.5">4"</span>
        <span className="w-12 border-l border-gray-400 pl-0.5">5"</span>
        <span className="w-12 border-l border-gray-400 pl-0.5">6"</span>
      </div>

      {/* 4. White Page Area (Editable document canvas) */}
      <div className="flex-1 bg-[#808080] p-4 overflow-y-auto flex justify-center">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setDocContent(e.currentTarget.innerText)}
          style={{
            fontFamily,
            fontSize,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            textAlign,
          }}
          className="w-full max-w-[620px] min-h-[500px] bg-white text-black p-8 shadow-xl outline-none whitespace-pre-wrap leading-relaxed select-text"
        >
          {docContent}
        </div>
      </div>

      {/* 5. Bottom Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>For Help, press F1</span>
        <span>WordPad Document (Rich Text)</span>
      </div>
    </div>
  );
};

export default WordPad;
