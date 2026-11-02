import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { playEwwSound } from '../../utils/memeSounds';

export const PrankErrorDialog = () => {
  const { prankError, closePrankError } = useOS();
  const [step, setStep] = useState('error'); // 'error' | 'confirm'
  const [dodgeCount, setDodgeCount] = useState(0);
  const [closeDodgeCount, setCloseDodgeCount] = useState(0);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [closeBtnOffset, setCloseBtnOffset] = useState({ x: 0, y: 0 });

  // Reset state whenever a new error dialog is opened
  useEffect(() => {
    if (prankError?.isOpen) {
      setStep('error');
      setDodgeCount(0);
      setCloseDodgeCount(0);
      setButtonOffset({ x: 0, y: 0 });
      setCloseBtnOffset({ x: 0, y: 0 });
    }
  }, [prankError?.isOpen]);

  if (!prankError?.isOpen) return null;

  // Runaway OK Button Dodge Mechanic (Jumps 3 times, stays still on 4th attempt)
  const handleOkMouseEnter = () => {
    if (step !== 'error') return;

    if (dodgeCount < 3) {
      const jumps = [
        { x: -110, y: -45 },
        { x: 100, y: -40 },
        { x: -90, y: 35 },
        { x: 80, y: 30 },
        { x: 0, y: -50 },
        { x: -120, y: 0 },
        { x: 90, y: -20 },
      ];
      const nextJump = jumps[(dodgeCount + Math.floor(Math.random() * jumps.length)) % jumps.length];
      setButtonOffset(nextJump);
      setDodgeCount((prev) => prev + 1);
    } else {
      // 4th attempt: Stay still so user can finally click!
      setButtonOffset({ x: 0, y: 0 });
    }
  };

  // Runaway [X] Title Bar Button Dodge Mechanic
  const handleCloseBtnMouseEnter = () => {
    if (step !== 'error') return;

    if (closeDodgeCount < 3) {
      const jumps = [
        { x: -35, y: 30 },
        { x: 25, y: 35 },
        { x: -50, y: 15 },
        { x: 30, y: 20 },
      ];
      const next = jumps[closeDodgeCount % jumps.length];
      setCloseBtnOffset(next);
      setCloseDodgeCount((prev) => prev + 1);
    } else {
      setCloseBtnOffset({ x: 0, y: 0 });
    }
  };

  // When user successfully clicks OK or [X] on the error popup
  const handleInitialClick = () => {
    playEwwSound();
    // Transition to Requirement 3: "Double Trouble" Confirmation Loop
    setStep('confirm');
    setButtonOffset({ x: 0, y: 0 });
    setCloseBtnOffset({ x: 0, y: 0 });
  };

  // Final confirmation close
  const handleFinalChoice = () => {
    playEwwSound();
    closePrankError();
  };

  return (
    <div
      data-prank-dialog="true"
      className="fixed inset-0 z-[9999998] flex items-center justify-center bg-black/20 p-3 font-w95 select-none"
    >
      {/* 3D Classic Windows 98 Error Window Frame */}
      <div className="w-[90vw] max-w-[360px] mx-auto bg-win-gray win-outset shadow-2xl p-1 text-xs animate-in fade-in zoom-in-95 duration-100">
        {/* Title Bar */}
        <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold select-none mb-2">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <span className="text-sm">⚠️</span>
            <span className="tracking-wide truncate">System Natak Error ⚠️</span>
          </div>

          {/* Dodging [X] Close Button */}
          <button
            onMouseEnter={handleCloseBtnMouseEnter}
            onTouchStart={handleCloseBtnMouseEnter}
            onClick={handleInitialClick}
            style={{
              transform: `translate(${closeBtnOffset.x}px, ${closeBtnOffset.y}px)`,
              transition: 'transform 0.12s ease-out',
            }}
            title={closeDodgeCount < 3 ? 'Catch me if you can! 😜' : 'Close'}
            className="win-outset active:win-pressed !p-0 w-4 h-3.5 text-[9px] text-black bg-win-gray flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3">
          {step === 'error' ? (
            // Stage 1: The Funny Prank Error Message
            <div className="flex items-start space-x-3 mb-6">
              {/* Retro Warning/Error Triangle Icon */}
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-yellow-400 border-2 border-black rounded-none shadow-[2px_2px_0px_#000000]">
                <span className="text-2xl font-black text-black leading-none">!</span>
              </div>

              <div className="flex-1 space-y-1">
                <p className="font-bold text-black text-xs leading-relaxed">
                  {prankError.message}
                </p>
                <p className="text-[10px] text-gray-600 font-mono">
                  Error Code: DESI_PRANK_0x420 | Severity: Mazedaar
                </p>
              </div>
            </div>
          ) : (
            // Stage 2: "Double Trouble" Confirmation Loop
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-blue-500 border-2 border-black rounded-none shadow-[2px_2px_0px_#000000] text-xl">
                🥺
              </div>

              <div className="flex-1 space-y-1.5">
                <p className="font-bold text-red-700 text-sm leading-tight">
                  Pakka band karna hai? Main bura maan jaunga 🥺
                </p>
                <p className="text-[11px] text-gray-700">
                  Aapka faisla antim hoga. Soch samajh ke chunav karein:
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons Section */}
          {step === 'error' ? (
            <div className="relative h-12 flex items-center justify-center border-t border-win-dark/50 pt-2">
              {/* Irritating Dodge OK Button */}
              <button
                onMouseEnter={handleOkMouseEnter}
                onTouchStart={handleOkMouseEnter}
                onClick={handleInitialClick}
                style={{
                  transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
                  transition: 'transform 0.12s ease-out',
                }}
                className={`win-outset active:win-pressed px-6 py-1.5 bg-win-gray text-xs font-bold text-black border border-black shadow-md flex items-center space-x-1 ${
                  dodgeCount < 3 ? 'cursor-pointer hover:bg-yellow-200' : 'cursor-pointer ring-2 ring-blue-600'
                }`}
              >
                <span>OK</span>
                {dodgeCount > 0 && dodgeCount < 3 && (
                  <span className="text-[9px] text-red-600 font-mono">({3 - dodgeCount} left)</span>
                )}
              </button>
            </div>
          ) : (
            // Double Trouble Choice Buttons: "Haan Bhai" & "Sorry"
            <div className="flex items-center justify-end space-x-3 border-t border-win-dark/50 pt-3">
              <button
                onClick={handleFinalChoice}
                className="win-outset active:win-pressed px-4 py-1.5 bg-win-gray text-xs font-bold text-black hover:bg-gray-200 border border-black/80 flex items-center space-x-1"
              >
                <span>Haan Bhai</span>
              </button>

              <button
                onClick={handleFinalChoice}
                className="win-outset active:win-pressed px-5 py-1.5 bg-win-gray text-xs font-bold text-blue-900 hover:bg-blue-100 border border-black/80 flex items-center space-x-1"
              >
                <span>Sorry</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrankErrorDialog;
