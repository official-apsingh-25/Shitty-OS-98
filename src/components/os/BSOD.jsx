import React from 'react';
import { useOS } from '../../context/OSContext';

export const BSOD = () => {
  const { bsodActive, dismissBsod } = useOS();

  if (!bsodActive) return null;

  return (
    <div
      onClick={dismissBsod}
      className="fixed inset-0 z-[9999999] bg-[#0000aa] text-white font-mono p-8 select-none flex flex-col items-center justify-center cursor-pointer text-sm leading-relaxed"
    >
      <div className="max-w-2xl w-full">
        {/* Header Tag */}
        <div className="text-center mb-6">
          <span className="bg-[#a8a8a8] text-[#0000aa] font-bold px-3 py-0.5 text-base tracking-widest inline-block">
            Windows
          </span>
        </div>

        {/* Error Details */}
        <p className="mb-4">
          An exception 0E has occurred at 0028:C0011E36 in VxD VMM(01) + 00010E36. This was called from 0028:C0015DE4 in VxD DO_NOT_DELETE(01) + 000021A0.
        </p>

        <p className="mb-6">
          * Press any key to terminate the current application.<br />
          * Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.
        </p>

        {/* Blinking Prompt */}
        <div className="text-center mt-8">
          <span className="text-white text-base tracking-wide">
            Press any key to continue <span className="animate-pulse font-bold">_</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BSOD;

