import React, { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

export const PrankErrorModal = () => {
  const { isSystemFrozen, showPrankModal, confirmPrankModal } = useOS();
  const okButtonRef = useRef(null);

  // Auto-focus OK button when modal appears
  useEffect(() => {
    if (showPrankModal && okButtonRef.current) {
      okButtonRef.current.focus();
    }
  }, [showPrankModal]);

  return (
    <>
      {/* 1. 3-Second Screen Freeze Full-Screen Transparent Overlay */}
      {isSystemFrozen && (
        <div
          className="fixed inset-0 z-[99999] cursor-wait select-none bg-transparent"
          style={{ cursor: 'wait' }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onContextMenu={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      )}

      {/* 2. Classic Win98 Prank Error Dialog (Appears after 3 seconds) */}
      {showPrankModal && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/20 p-4 font-w95 select-none animate-in fade-in zoom-in-95 duration-75">
          {/* 3D Classic Windows 98 Error Window Frame */}
          <div className="w-[90vw] max-w-[360px] mx-auto bg-win-gray win-outset shadow-2xl p-1 text-xs">
            {/* Title Bar */}
            <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold select-none mb-2">
              <div className="flex items-center space-x-1.5 overflow-hidden">
                <span className="truncate tracking-wide">
                  Microsoft Windows 98 - Critical Error
                </span>
              </div>

              {/* Close [X] Button */}
              <button
                onClick={confirmPrankModal}
                title="Close"
                className="win-outset active:win-pressed !p-0 w-4 h-3.5 text-[9px] text-black bg-win-gray flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-4">
                {/* Classic Red Error Cross Icon */}
                <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-red-600 rounded-full border-2 border-black shadow-[2px_2px_0px_#800000]">
                  <span className="text-white text-2xl font-black leading-none pb-0.5 select-none">
                    ✕
                  </span>
                </div>

                {/* Error Message */}
                <div className="flex-1">
                  <p className="font-bold text-black text-sm leading-relaxed select-text">
                    kaisa laga mera mazak chuss 
                  </p>
                </div>
              </div>

              {/* Centered 3D Bevel OK Button */}
              <div className="flex justify-center pt-2">
                <button
                  ref={okButtonRef}
                  onClick={confirmPrankModal}
                  className="win-outset active:win-pressed px-8 py-1.5 bg-win-gray font-bold text-xs text-black border border-black shadow-sm focus:outline-dotted focus:ring-1 focus:ring-black hover:bg-gray-200 cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrankErrorModal;

