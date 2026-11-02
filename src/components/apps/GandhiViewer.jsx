import React, { useState, useRef } from 'react';
import { useOS } from '../../context/OSContext';

const IMAGE_CANDIDATES = [
  '/photos-1998/gandhi_ji_with_hoties.jpg',
  '/photos-1998/gandhi with hoties.jpg',
  '/gandhi_ji_with_hoties.jpg',
  './gandhi_ji_with_hoties.jpg',
  'gandhi_ji_with_hoties.jpg',
];

export const GandhiViewer = ({ window: win }) => {
  const { closeApp, playSound } = useOS();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const currentSrc = win.initialData?.imageUrl || IMAGE_CANDIDATES[imageIndex];

  const handleZoomIn = () => {
    playSound('click');
    setZoom((prev) => Math.min(3.0, Math.round((prev + 0.25) * 100) / 100));
  };

  const handleZoomOut = () => {
    playSound('click');
    setZoom((prev) => Math.max(0.5, Math.round((prev - 0.25) * 100) / 100));
  };

  const handleResetZoom = () => {
    playSound('click');
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleRotate = () => {
    playSound('click');
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFit = () => {
    playSound('click');
    setZoom(0.75);
    setPan({ x: 0, y: 0 });
  };

  const handleImageError = () => {
    if (imageIndex < IMAGE_CANDIDATES.length - 1) {
      setImageIndex((prev) => prev + 1);
    }
  };

  // Dragging / Panning support when zoomed
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(3.0, Math.round((prev + 0.15) * 100) / 100));
    } else {
      setZoom((prev) => Math.max(0.5, Math.round((prev - 0.15) * 100) / 100));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* 1998 Photo Viewer Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Zoom</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Sleek 1998 Action Toolbar */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-white bg-win-gray shrink-0 gap-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-1 shrink-0">
          {/* Zoom In Button */}
          <button
            onClick={handleZoomIn}
            title="Zoom In (or use mouse wheel)"
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 text-black font-bold"
          >
            <span>🔍+</span>
            <span>Zoom In</span>
          </button>

          {/* Zoom Out Button */}
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 text-black"
          >
            <span>🔍-</span>
            <span>Zoom Out</span>
          </button>

          {/* 1:1 Actual Size Button */}
          <button
            onClick={handleResetZoom}
            title="Actual Size (100%)"
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 text-black"
          >
            <span>🔎</span>
            <span>100%</span>
          </button>

          {/* Fit to Window */}
          <button
            onClick={handleFit}
            title="Fit to Window"
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 text-black"
          >
            <span>📐</span>
            <span>Fit</span>
          </button>

          {/* Rotate 90° */}
          <button
            onClick={handleRotate}
            title="Rotate 90 Degrees"
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 text-black"
          >
            <span>🔄</span>
            <span>Rotate</span>
          </button>
        </div>

        {/* Close Button inside toolbar */}
        <button
          onClick={() => closeApp(win.id)}
          title="Close Image Viewer"
          className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray text-red-900 font-bold shrink-0"
        >
          ✕ Close
        </button>
      </div>

      {/* Main Image Viewport Area (Sunken 3D Viewport) */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="flex-1 win-inset bg-[#2b2b2b] p-3 flex flex-col items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing"
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
          }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          <img
            src={currentSrc}
            alt="gandhi ji with hoties"
            onError={handleImageError}
            draggable={false}
            className="photo-1998 pixelated block max-h-[420px] max-w-[480px] w-auto h-auto shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-black"
          />
        </div>

        {/* Vintage Archival Snapshot Caption Pill */}
        <div className="absolute bottom-2 bg-win-gray/95 win-outset px-3 py-1 text-center shadow-lg pointer-events-none">
          <span className="font-bold text-win-navy block text-xs tracking-wider">
            gandhi with hoties.jpg
          </span>
          <span className="text-[10px] text-gray-700">
            Historical Archival Snapshot 1998 • Classified Vault Entry
          </span>
        </div>
      </div>

      {/* Bottom 3-Section Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span className="truncate max-w-[200px]">
          gandhi with hoties.jpg | 529 × 720
        </span>
        <span className="font-mono text-center">
          Zoom: {Math.round(zoom * 100)}% {rotation !== 0 ? `| ${rotation}°` : ''}
        </span>
        <span className="font-mono text-right">
          92.8 KB | 24-bit JPEG
        </span>
      </div>
    </div>
  );
};

export default GandhiViewer;

