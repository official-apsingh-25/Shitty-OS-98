import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

const DEFAULT_GALLERY = [
  {
    name: 'pc_setup_1998.bmp',
    url: '/photos-1998/pc-setup.svg',
    caption: 'My Beige Pentium II Battlestation (Sound Blaster + CRT)',
    dimensions: '320 x 240',
    size: '48 KB',
    date: '10/18/1998',
  },
  {
    name: 'office_cubicle_1998.bmp',
    url: '/photos-1998/cubicle.svg',
    caption: "Dad's Y2K Compliance IT Office & Java Station",
    dimensions: '320 x 240',
    size: '42 KB',
    date: '09/20/1998',
  },
  {
    name: 'family_roadtrip_98.bmp',
    url: '/photos-1998/family_vacation_98.svg',
    caption: "Summer Vacation '98 - Lake Tahoe in the Minivan",
    dimensions: '320 x 240',
    size: '56 KB',
    date: '07/14/1998',
  },
  {
    name: 'basement_lan_party.bmp',
    url: '/photos-1998/lan_party_98.svg',
    caption: 'All-Night Quake II & Doom LAN Session with Kevin',
    dimensions: '320 x 240',
    size: '52 KB',
    date: '10/24/1998',
  }
];

export const PhotoViewer = ({ window: win }) => {
  const { playSound } = useOS();

  // Find initial image index if an imageUrl or name was passed
  const initialIdx = DEFAULT_GALLERY.findIndex(
    (img) => img.url === win.initialData?.imageUrl || img.name === win.initialData?.name
  );

  const [currentIndex, setCurrentIndex] = useState(initialIdx !== -1 ? initialIdx : 0);
  const [zoom, setZoom] = useState(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDialupLoading, setIsDialupLoading] = useState(true);

  const currentPhoto = DEFAULT_GALLERY[currentIndex] || DEFAULT_GALLERY[0];

  // Simulated 56k Dial-up Progressive Scanline Loading Effect
  useEffect(() => {
    setIsDialupLoading(true);
    setLoadProgress(0);

    const stepInterval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          setIsDialupLoading(false);
          return 100;
        }
        // Progressive scan chunks (resembles 56k modem line buffering)
        return prev + 12;
      });
    }, 110);

    return () => clearInterval(stepInterval);
  }, [currentIndex]);

  const handlePrev = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : DEFAULT_GALLERY.length - 1));
  };

  const handleNext = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev < DEFAULT_GALLERY.length - 1 ? prev + 1 : 0));
  };

  const reloadDialup = () => {
    playSound('click');
    setIsDialupLoading(true);
    setLoadProgress(0);
    const stepInterval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          setIsDialupLoading(false);
          return 100;
        }
        return prev + 14;
      });
    }, 110);
  };

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Image</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-white bg-win-gray shrink-0">
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handlePrev}
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1"
          >
            <span>◀</span>
            <span>Prev</span>
          </button>

          <button
            onClick={handleNext}
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1"
          >
            <span>Next</span>
            <span>▶</span>
          </button>

          <div className="w-[1px] h-4 bg-win-dark mx-1" />

          <button
            onClick={() => setZoom((z) => (z === 1 ? 1.4 : 1))}
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray"
          >
            {zoom === 1 ? '🔍 Zoom In' : '🔎 Actual Size'}
          </button>

          <button
            onClick={reloadDialup}
            title="Simulate 56k Dial-Up download lines"
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1"
          >
            <span>🔄</span>
            <span>Reload 56k</span>
          </button>
        </div>

        {/* Dial-up Speed readout */}
        <div className="text-[10px] text-gray-700 font-mono">
          {isDialupLoading ? `Downloading: ${loadProgress}% (V.90 53.3Kbps)` : '100% Loaded'}
        </div>
      </div>

      {/* Main Picture Display Canvas */}
      <div className="flex-1 win-inset bg-[#505050] p-4 flex flex-col items-center justify-center overflow-auto relative">
        <div className="relative shadow-2xl border border-black bg-black max-w-full max-h-full flex items-center justify-center">
          {/* Dial-up Scanline Mask Overlay */}
          <div
            style={{
              clipPath: `inset(0 0 ${100 - loadProgress}% 0)`,
              transition: 'clip-path 0.1s linear',
            }}
            className="relative overflow-hidden"
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.name}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
              }}
              className="photo-1998 pixelated block max-h-[320px] max-w-[480px] w-auto h-auto transition-transform duration-150"
            />

            {/* Scanline line cursor when actively rendering */}
            {isDialupLoading && (
              <div
                style={{ top: `${loadProgress}%` }}
                className="absolute left-0 right-0 h-1 bg-yellow-400 opacity-80 pointer-events-none shadow-[0_0_8px_#ffff00]"
              />
            )}
          </div>
        </div>

        {/* 1998 Photo Caption Box */}
        <div className="mt-3 bg-win-gray win-outset px-3 py-1 text-center max-w-md shadow-md">
          <span className="font-bold text-blue-900 block text-xs">{currentPhoto.name}</span>
          <span className="text-[11px] text-gray-700">{currentPhoto.caption}</span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>
          Photo {currentIndex + 1} of {DEFAULT_GALLERY.length} | {currentPhoto.dimensions} pixels
        </span>
        <span className="font-mono">{currentPhoto.size} | 24-bit TrueColor</span>
      </div>
    </div>
  );
};

export default PhotoViewer;

