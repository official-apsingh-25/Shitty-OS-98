import React from 'react';
import { useOS } from '../../context/OSContext';

export const TimeCapsule = () => {
  const { playSound, triggerBsod } = useOS();

  return (
    <div className="flex-1 flex flex-col bg-black text-green-400 font-mono p-4 overflow-y-auto select-text text-xs leading-relaxed border-2 border-green-500 shadow-2xl">
      {/* ASCII Logo Banner */}
      <pre className="text-[10px] text-green-300 font-bold leading-tight select-none mb-3 overflow-x-auto text-center">
{`
 __        _____ _   _ ____   _____      ______   ___  ___  
 \\ \\      / /_ _| \\ | |  _ \\ / _ \\ \\    / / ___| / _ \\( _ ) 
  \\ \\ /\\ / / | ||  \\| | | | | | | \\ \\  / /\\___ \\| (_) / _ \\ 
   \\ V  V /  | || |\\  | |_| | |_| |\\ \\/ /  ___) |\\__, \\ (_) |
    \\_/\\_/  |___|_| \\_|____/ \\___/  \\__/  |____/   /_/ \\___/ 
`}
      </pre>

      <div className="border-b border-green-700 pb-2 mb-3 text-center">
        <h2 className="text-sm font-bold text-yellow-300 tracking-wider">
          *** DEVELOPER TIME CAPSULE: CODENAME MEMPHIS ***
        </h2>
        <span className="text-[11px] text-green-500">
          Archived: October 1998 | Unlocked via Secret Run Command ("1998" / "matrix")
        </span>
      </div>

      <div className="space-y-3 text-[11px] text-green-300">
        <p>
          <span className="text-yellow-400 font-bold">&gt; GREETINGS, TIME TRAVELER:</span>
          <br />
          If you are reading this in the 21st century, you have uncovered the secret Developer Time Capsule embedded inside this Windows 98 Web OS engine!
        </p>

        <p>
          In 1998, personal computing was magical. Computers made physical noises—hard drives rattled with pride, 56k modems sang their iconic screeching handshake, and CRT monitors glowed with warm phosphors in dark bedrooms.
        </p>

        <div className="bg-gray-950 p-2.5 border border-green-600 win-inset">
          <span className="font-bold text-cyan-300 block mb-1">SYSTEM HARDWARE BENCHMARKS (1998):</span>
          <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-green-400">
            <li>CPU: Intel Pentium II Klamath @ 350MHz</li>
            <li>RAM: 64MB PC100 SDRAM (Cost: $120.00!)</li>
            <li>Graphics: 3Dfx Voodoo2 12MB PCI 3D Accelerator (Glide API)</li>
            <li>Audio: Creative Labs Sound Blaster Live! with EAX environmental audio</li>
            <li>Storage: Quantum Fireball 6.4GB IDE Hard Drive (FAT32 partition)</li>
          </ul>
        </div>

        <p>
          This project was handcrafted with passion using React 18, Vite, and Tailwind CSS to preserve every single pixel, bevel, and nostalgic quirk of Microsoft Windows 98 Second Edition.
        </p>
      </div>

      {/* Interactive Time Capsule Easter Egg Controls */}
      <div className="mt-4 pt-3 border-t border-green-700 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => playSound('startup')}
            className="win-outset active:win-pressed px-2.5 py-1 bg-win-gray text-black font-bold text-[10px]"
          >
            🎵 Play Startup Chime
          </button>
          <button
            onClick={() => playSound('chord')}
            className="win-outset active:win-pressed px-2.5 py-1 bg-win-gray text-black font-bold text-[10px]"
          >
            ⚠️ Play Chord Error
          </button>
          <button
            onClick={triggerBsod}
            className="win-outset active:win-pressed px-2.5 py-1 bg-win-gray text-red-700 font-bold text-[10px]"
          >
            💥 Trigger BSOD
          </button>
        </div>

        <span className="text-[10px] text-green-500 font-mono">
          Memory: 65,536 KB OK
        </span>
      </div>
    </div>
  );
};

export default TimeCapsule;

