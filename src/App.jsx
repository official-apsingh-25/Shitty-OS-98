import React, { Suspense, lazy, useState, useEffect } from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { Desktop } from './components/os/Desktop';
import { Taskbar } from './components/os/Taskbar';
import { StartMenu } from './components/os/StartMenu';
import { WindowFrame } from './components/os/WindowFrame';
import { BSOD } from './components/os/BSOD';
import { BootScreen } from './components/os/BootScreen';
import { PrankErrorDialog } from './components/os/PrankErrorDialog';
import { FolderLoadingModal } from './components/os/FolderLoadingModal';
import { PrankErrorModal } from './components/os/PrankErrorModal';

// Lazy-Loaded Mini Apps
const FileExplorer = lazy(() => import('./components/apps/FileExplorer'));
const Notepad = lazy(() => import('./components/apps/Notepad'));
const WordPad = lazy(() => import('./components/apps/WordPad'));
const Paint = lazy(() => import('./components/apps/Paint'));
const Calculator = lazy(() => import('./components/apps/Calculator'));
const InternetExplorer = lazy(() => import('./components/apps/InternetExplorer'));
const OutlookExpress = lazy(() => import('./components/apps/OutlookExpress'));
const PhotoViewer = lazy(() => import('./components/apps/PhotoViewer'));
const Minesweeper = lazy(() => import('./components/apps/Minesweeper'));
const TimeCapsule = lazy(() => import('./components/apps/TimeCapsule'));
const GandhiViewer = lazy(() => import('./components/apps/GandhiViewer'));

const AppRenderer = ({ win }) => {
  switch (win.id) {
    case 'explorer':
      return <FileExplorer window={win} />;
    case 'notepad':
      return <Notepad window={win} />;
    case 'wordpad':
      return <WordPad window={win} />;
    case 'paint':
      return <Paint window={win} />;
    case 'calculator':
      return <Calculator window={win} />;
    case 'internet-explorer':
      return <InternetExplorer window={win} />;
    case 'outlook-express':
      return <OutlookExpress window={win} />;
    case 'photoviewer':
      return <PhotoViewer window={win} />;
    case 'minesweeper':
      return <Minesweeper window={win} />;
    case 'timecapsule':
      return <TimeCapsule window={win} />;
    case 'gandhi-viewer':
      return <GandhiViewer window={win} />;
    default:
      return (
        <div className="p-4 text-center font-w95 text-xs">
          <p className="font-bold text-red-700">Application not found</p>
          <p className="text-gray-600 mt-1">ID: {win.id}</p>
        </div>
      );
  }
};

const LoadingChassis = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-win-gray p-6 font-w95 text-xs">
    <div className="flex items-center space-x-2 mb-2">
      <div className="w-4 h-4 border-2 border-win-navy border-t-transparent animate-spin rounded-full" />
      <span className="font-bold text-black">Starting program...</span>
    </div>
    <span className="text-[11px] text-gray-600">Reading from disk...</span>
  </div>
);

const DesktopShell = () => {
  const { windows, openApp, triggerPrankError } = useOS();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  // 1. Random Desi/Meme Error Popups: Every 45s OR Every 6th Click on the Desktop
  useEffect(() => {
    if (!isBooted) return;

    // Timer trigger: every 45 seconds
    const interval = setInterval(() => {
      triggerPrankError();
    }, 45000);

    // Click trigger: every 6th click anywhere on the desktop
    let clickCount = 0;
    const handleGlobalClick = (e) => {
      // Do not count clicks inside the error popup itself
      if (e.target && e.target.closest && e.target.closest('[data-prank-dialog]')) {
        return;
      }
      clickCount += 1;
      if (clickCount % 6 === 0) {
        triggerPrankError();
      }
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [isBooted, triggerPrankError]);

  // Auto-Open Notepad After Login (Centered with Troll Note & Easter Egg Close Trigger)
  useEffect(() => {
    if (isBooted) {
      openApp('notepad', {
        bypassFreeze: true,
        isDefaultWelcome: true,
        onCloseTrigger: 'gandhi_popup',
        center: true,
        title: 'IMPORTANT_NOTICE.txt - Notepad',
        content: `=====================================================
MICROSOFT WINDOWS 98 SE - CONFIDENTIAL NOTICE
=====================================================

Welcome back, Cyber Surfer!
Your 56k dial-up connection is active and stable.

⚠️ CRITICAL SYSTEM WARNING:
-----------------------------------------------------
Please DO NOT click the close [X] button in the 
top-right corner of this Notepad window!

Closing this window may cause unexpected historical 
anomalies in your cyberspace cache...

You have been warned! 💀

— Windows 98 Cyber Team 1998`
      });
    }
  }, [isBooted, openApp]);

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <>
      {/* Authentic Windows 98 Boot / Logon Overlay with 100% Reliable Intro Music Trigger */}
      {!isBooted && (
        <BootScreen onBootComplete={() => setIsBooted(true)} />
      )}

      <Desktop
        startMenuOpen={startMenuOpen}
        closeStartMenu={() => setStartMenuOpen(false)}
      >
        {/* Active Windows Chassis */}
        {openWindows.map((win) => (
          <WindowFrame key={win.id} window={win}>
            <Suspense fallback={<LoadingChassis />}>
              <AppRenderer win={win} />
            </Suspense>
          </WindowFrame>
        ))}

        {/* Start Menu Popup */}
        <StartMenu
          isOpen={startMenuOpen}
          onClose={() => setStartMenuOpen(false)}
        />

        {/* Bottom Fixed 28px 3D Taskbar */}
        <Taskbar
          startMenuOpen={startMenuOpen}
          toggleStartMenu={() => setStartMenuOpen((prev) => !prev)}
        />

        {/* Full-screen Blue Screen of Death (BSOD) Easter Egg Overlay */}
        <BSOD />

        {/* 1. Funny & Irritating Prank Error Dialog (Runaway OK button + Double Trouble confirmation) */}
        <PrankErrorDialog />

        {/* 4. Fake 99% Stuck Loading Bar for Folders */}
        <FolderLoadingModal />

        {/* 5. 3-Second Screen Freeze & "kaisa laga mera mazak chuss " Prank Error Modal */}
        <PrankErrorModal />
      </Desktop>
    </>
  );
};

export default function App() {
  return (
    <OSProvider>
      <DesktopShell />
    </OSProvider>
  );
}
