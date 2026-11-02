import React, { useRef, useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

// Classic 1998 16-Color Palette
const PALETTE_16 = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'
];

export const Paint = () => {
  const { playSound } = useOS();
  const canvasRef = useRef(null);

  const [tool, setTool] = useState('pencil'); // 'pencil', 'brush', 'eraser', 'line'
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [canvasSnapshot, setCanvasSnapshot] = useState(null);

  // Initialize white canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setIsDrawing(true);
    setLineStart(coords);
    setCanvasSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : selectedColor;
    ctx.lineWidth = tool === 'eraser' ? 10 : tool === 'brush' ? 4 : 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool !== 'line') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === 'line' && canvasSnapshot) {
      // Restore snapshot to preview line while dragging
      ctx.putImageData(canvasSnapshot, 0, 0);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lineStart.x, lineStart.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setCanvasSnapshot(null);
    }
  };

  const clearCanvas = () => {
    playSound('click');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* 1. Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0">
        <span onClick={clearCanvas} className="hover:bg-win-navy hover:text-white px-1 cursor-default">New</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Image</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* 2. Main Workspace (Left Tool Rail + Canvas) */}
      <div className="flex-1 flex overflow-hidden p-1">
        {/* Left Tool Rail */}
        <div className="w-16 bg-win-gray win-outset p-1 flex flex-col items-center space-y-1 mr-1 shrink-0">
          <div className="grid grid-cols-2 gap-1 w-full">
            {/* Pencil */}
            <button
              onClick={() => { playSound('click'); setTool('pencil'); }}
              title="Pencil (1px)"
              className={`h-6 win-outset flex items-center justify-center text-xs ${
                tool === 'pencil' ? 'win-pressed bg-[#d0ccc4]' : 'bg-win-gray'
              }`}
            >
              ✏️
            </button>

            {/* Brush */}
            <button
              onClick={() => { playSound('click'); setTool('brush'); }}
              title="Brush (4px)"
              className={`h-6 win-outset flex items-center justify-center text-xs ${
                tool === 'brush' ? 'win-pressed bg-[#d0ccc4]' : 'bg-win-gray'
              }`}
            >
              🖌️
            </button>

            {/* Eraser */}
            <button
              onClick={() => { playSound('click'); setTool('eraser'); }}
              title="Eraser (White)"
              className={`h-6 win-outset flex items-center justify-center text-xs ${
                tool === 'eraser' ? 'win-pressed bg-[#d0ccc4]' : 'bg-win-gray'
              }`}
            >
              🧹
            </button>

            {/* Line */}
            <button
              onClick={() => { playSound('click'); setTool('line'); }}
              title="Straight Line"
              className={`h-6 win-outset flex items-center justify-center font-bold text-xs ${
                tool === 'line' ? 'win-pressed bg-[#d0ccc4]' : 'bg-win-gray'
              }`}
            >
              ╱
            </button>
          </div>

          <div className="border-t border-win-dark w-full my-1" />

          {/* Clear Canvas Button */}
          <button
            onClick={clearCanvas}
            title="Clear all drawings"
            className="w-full win-outset active:win-pressed py-1 bg-win-gray text-[10px] text-center font-bold leading-tight"
          >
            Clear Canvas
          </button>
        </div>

        {/* Canvas Viewport in Sunken Border */}
        <div className="flex-1 win-inset bg-[#808080] p-2 overflow-auto flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={520}
            height={340}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="bg-white shadow-lg cursor-crosshair block"
          />
        </div>
      </div>

      {/* 3. Bottom 16-Color Palette Box */}
      <div className="h-10 bg-win-gray border-t border-win-dark flex items-center px-2 space-x-3 shrink-0">
        {/* Active Color Preview Box */}
        <div className="w-6 h-6 win-inset bg-white p-0.5 shrink-0" title="Active Drawing Color">
          <div
            style={{ backgroundColor: selectedColor }}
            className="w-full h-full win-outset border border-black/20"
          />
        </div>

        {/* 16 Colors Grid (2 Rows of 8) */}
        <div className="grid grid-rows-2 grid-flow-col gap-1">
          {PALETTE_16.map((color) => (
            <button
              key={color}
              onClick={() => { playSound('click'); setSelectedColor(color); }}
              style={{ backgroundColor: color }}
              title={color}
              className={`w-4 h-3.5 win-outset border border-black/20 ${
                selectedColor === color ? 'ring-1 ring-black' : ''
              }`}
            />
          ))}
        </div>

        <div className="text-[11px] text-gray-700 ml-auto">
          Tool: <b className="uppercase">{tool}</b> | 520 x 340px
        </div>
      </div>

      {/* 4. Bottom Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>For Help, click Help Topics on the Help Menu.</span>
        <span>Paint 1998 Edition</span>
      </div>
    </div>
  );
};

export default Paint;
