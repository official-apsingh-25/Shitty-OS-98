import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { retroWebsites } from '../../data/retroWebsites';

export const InternetExplorer = () => {
  const { playSound } = useOS();

  const DEFAULT_HOME = 'www.yahoo1998.com';
  const [urlInput, setUrlInput] = useState('http://www.yahoo1998.com');
  const [currentHost, setCurrentHost] = useState(DEFAULT_HOME);
  const [history, setHistory] = useState([DEFAULT_HOME]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Search Engine query state for Yahoo!
  const [searchQuery, setSearchQuery] = useState('');

  // Clean raw URL into lookup key
  const cleanUrl = (raw) => {
    return raw
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/$/, '')
      .toLowerCase();
  };

  const navigateTo = (target) => {
    playSound('click');
    setIsLoading(true);
    const cleaned = cleanUrl(target);
    setUrlInput(`http://${cleaned}`);

    setTimeout(() => {
      setCurrentHost(cleaned);
      setHistory((prev) => [...prev.slice(0, historyIdx + 1), cleaned]);
      setHistoryIdx((prev) => prev + 1);
      setIsLoading(false);
    }, 280);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      playSound('click');
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setCurrentHost(prev);
      setUrlInput(`http://${prev}`);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      playSound('click');
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      setCurrentHost(next);
      setUrlInput(`http://${next}`);
    }
  };

  const handleRefresh = () => {
    playSound('click');
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 250);
  };

  const handleHome = () => {
    navigateTo(DEFAULT_HOME);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput) {
      navigateTo(urlInput);
    }
  };

  const page = retroWebsites[currentHost];

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* 1. Classic IE 4.0 Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Go</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Favorites</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* 2. Navigation Toolbar */}
      <div className="flex items-center justify-between px-1.5 py-1 border-b border-win-dark bg-win-gray shrink-0">
        <div className="flex items-center space-x-1">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={historyIdx === 0}
            className={`win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 ${
              historyIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>⬅</span>
            <span>Back</span>
          </button>

          {/* Forward Button */}
          <button
            onClick={handleForward}
            disabled={historyIdx >= history.length - 1}
            className={`win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 ${
              historyIdx >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>Forward</span>
            <span>➡</span>
          </button>

          {/* Stop / Refresh */}
          <button
            onClick={handleRefresh}
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>

          {/* Home Button */}
          <button
            onClick={handleHome}
            className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1"
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
        </div>

        {/* Spinning IE Animated Globe Logo */}
        <div className="w-6 h-6 win-inset bg-black flex items-center justify-center mr-1">
          <div
            className={`w-4 h-4 rounded-full border-2 border-white/60 border-t-yellow-400 ${
              isLoading ? 'animate-spin' : ''
            }`}
          />
        </div>
      </div>

      {/* 3. Address Bar */}
      <form
        onSubmit={handleUrlSubmit}
        className="flex items-center px-1.5 py-1 border-b border-white bg-win-gray space-x-2 shrink-0"
      >
        <span className="text-gray-700 font-bold">Address</span>
        <div className="flex-1 flex items-center win-inset bg-white px-1.5 py-0.5">
          <img src="/icons/internet-explorer.svg" alt="" className="w-3.5 h-3.5 mr-1 pixelated" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 outline-none font-mono text-xs text-black"
          />
        </div>
        <button type="submit" className="win-outset active:win-pressed px-3 py-0.5 bg-win-gray font-bold">
          Go
        </button>
      </form>

      {/* 4. Browser Viewport Area (1998 Web Canvas) */}
      <div className="flex-1 win-inset bg-white overflow-y-auto p-4 select-text">
        {page ? (
          <div>
            {/* ========================================================= */}
            {/* a) DEFAULT HOMEPAGE: YAHOO! 1998 SEARCH ENGINE & DIRECTORY */}
            {/* ========================================================= */}
            {page.type === 'yahoo' && (
              <div className="max-w-2xl mx-auto font-serif">
                {/* Yahoo Banner Header */}
                <div className="text-center pb-2 border-b-2 border-red-700 mb-3">
                  <h1 className="text-4xl font-extrabold text-red-600 tracking-wider font-serif inline-block cursor-pointer hover:opacity-90">
                    YAHOO!
                  </h1>
                  <p className="text-[11px] text-blue-900 mt-1 space-x-2">
                    <span className="hover:underline cursor-pointer">What's New</span> •
                    <span className="hover:underline cursor-pointer">Check Email</span> •
                    <span className="hover:underline cursor-pointer">Yahoo! Chat</span> •
                    <span className="hover:underline cursor-pointer">Help</span>
                  </p>
                </div>

                {/* Working 1998 Search Box */}
                <div className="flex justify-center mb-5">
                  <div className="flex items-center space-x-1.5 p-1 bg-yellow-50 win-outset">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search 1998 Web directory or enter keywords..."
                      className="win-inset bg-white px-2 py-1 text-xs font-mono w-72 outline-none"
                    />
                    <button
                      onClick={() => playSound('click')}
                      className="win-outset active:win-pressed px-3 py-1 bg-win-gray font-bold text-xs"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Quick Shortcuts Pill Row */}
                <div className="bg-blue-50 border border-blue-200 p-2 text-center text-xs mb-4">
                  <b className="text-blue-950 mr-2">Featured 1998 Links:</b>
                  <span
                    onClick={() => navigateTo('www.geocities.com/cyberkid98')}
                    className="text-blue-700 underline font-bold cursor-pointer mx-1.5"
                  >
                    CyberKid98's Homepage
                  </span>
                  |
                  <span
                    onClick={() => navigateTo('www.y2k-survival-1998.org')}
                    className="text-red-700 underline font-bold cursor-pointer mx-1.5"
                  >
                    Y2K Bug Center
                  </span>
                  |
                  <span
                    onClick={() => navigateTo('www.cinema1998.com/titanic')}
                    className="text-blue-700 underline font-bold cursor-pointer mx-1.5"
                  >
                    Titanic Fan Shrine
                  </span>
                  |
                  <span
                    onClick={() => navigateTo('www.winamp-skins98.net')}
                    className="text-green-800 underline font-bold cursor-pointer mx-1.5"
                  >
                    Winamp MP3s
                  </span>
                </div>

                {/* Directory Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {page.categories.map((cat, idx) => {
                    const filteredSites = cat.sites.filter(
                      (s) =>
                        !searchQuery ||
                        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.desc.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    return (
                      <div key={idx} className="border border-gray-300 p-2.5 bg-gray-50/50">
                        <h3 className="font-bold text-sm text-blue-900 border-b border-gray-300 pb-1 mb-1.5 font-sans">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-gray-600 mb-2 italic">{cat.desc}</p>

                        {/* Sites List */}
                        {filteredSites.length > 0 ? (
                          <ul className="space-y-1.5 pl-2">
                            {filteredSites.map((site, sIdx) => (
                              <li key={sIdx}>
                                <span
                                  onClick={() => navigateTo(site.url)}
                                  className="text-blue-800 hover:text-red-600 underline font-bold cursor-pointer block"
                                >
                                  {site.name}
                                </span>
                                <span className="text-[10px] text-gray-700">{site.desc}</span>
                              </li>
                            ))}
                          </ul>
                        ) : searchQuery ? (
                          <span className="text-[11px] text-gray-400 italic">No matches in this category</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-6 text-[10px] text-gray-500 border-t border-gray-200 pt-2 font-mono">
                  Copyright © 1994-1998 Yahoo! Inc. All rights reserved.
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* b) GEOCITIES CYBERKID98 PERSONAL HOMEPAGE                 */}
            {/* ========================================================= */}
            {page.type === 'geocities' && (
              <div className="max-w-xl mx-auto bg-black text-green-400 p-6 font-mono border-4 border-yellow-400 shadow-2xl">
                {/* 90s Animated Marquee */}
                <div className="bg-yellow-400 text-black py-1 px-2 font-bold text-xs text-center overflow-hidden mb-4">
                  <marquee scrollamount="5" behavior="scroll" direction="left">
                    *** WELCOME TO CYBERKID98'S RADICAL WEB OASIS! BEST VIEWED IN NETSCAPE 4.0 OR IE 4.0 IN 800x600 RESOLUTION! ***
                  </marquee>
                </div>

                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold text-yellow-300 animate-pulse">
                    ~*~ CYBERKID98'S 1998 HOMEPAGE ~*~
                  </h1>
                  <p className="text-xs text-yellow-500 mt-1">
                    GeoCities Neighborhood: <span className="text-white">{page.neighborhood}</span>
                  </p>
                  <div className="my-2 bg-yellow-400 text-black font-bold p-1 inline-block text-xs">
                    🚧 UNDER CONSTRUCTION - WATCH YOUR STEP! 🚧
                  </div>
                </div>

                <div className="border border-green-500 p-3 mb-4 text-xs bg-gray-950">
                  <p className="mb-2">Hey cool surfin' dude! Thanks for stoppin' by my cyber page.</p>
                  <p className="mb-2 text-cyan-300">
                    RIG SPECS: Intel Pentium II 350MHz | 64MB SDRAM | Sound Blaster Live! | 56k USRobotics Modem.
                  </p>
                  <p className="text-yellow-300">
                    SECRET HINT: If you explore the desktop, check out the Recycle Bin for forgotten ICQ chat logs!
                  </p>
                </div>

                {/* Guestbook Signatures */}
                <div className="border-t border-green-700 pt-3">
                  <h3 className="font-bold text-yellow-400 text-xs mb-2">Guestbook Signatures:</h3>
                  <div className="space-y-2 text-[11px]">
                    {page.guestbookEntries.map((gb, i) => (
                      <div key={i} className="bg-gray-900 p-2 border border-gray-700">
                        <div className="flex justify-between text-yellow-400 font-bold mb-1">
                          <span>{gb.author}</span>
                          <span className="text-gray-400 text-[10px]">{gb.date}</span>
                        </div>
                        <span className="text-green-300">{gb.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hit Counter */}
                <div className="text-center mt-6 text-xs text-gray-400">
                  You are web visitor #: <span className="bg-gray-800 text-yellow-300 px-2 py-1 font-mono font-bold tracking-widest">{page.visitorCount}</span>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* c) Y2K MILLENNIUM BUG DEFENSE CENTER                      */}
            {/* ========================================================= */}
            {page.type === 'y2k' && (
              <div className="max-w-xl mx-auto font-sans bg-amber-50 p-4 border-4 border-red-700 shadow-xl">
                <div className="bg-red-700 text-white p-3 text-center mb-4">
                  <h1 className="text-2xl font-bold tracking-wide font-mono">
                    THE YEAR 2000 CRISIS DEFENSE CENTER
                  </h1>
                  <p className="text-xs mt-1 text-yellow-300 font-bold">{page.warning}</p>
                </div>

                <div className="bg-white border-2 border-red-500 p-3 mb-4 text-xs">
                  <h2 className="font-bold text-sm text-red-800 mb-2">Emergency Survival Checklist:</h2>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    {page.checklist.map((item, idx) => (
                      <li key={idx} className="font-medium">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-900 text-white p-3 text-xs leading-relaxed">
                  <span className="font-bold text-yellow-300 block mb-1">Notice for Microsoft Windows 98 Users:</span>
                  <p>
                    Windows 98 Second Edition includes native 4-digit date rollover compliance. However, third-party DOS accounting software may still experience date arithmetic corruption.
                  </p>
                </div>

                <div className="text-center mt-4 text-[10px] text-gray-500">
                  Maintained by Citizens for Millennium Readiness • Updated October 1998
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* d) CINEMA 1998: TITANIC FAN SHRINE                        */}
            {/* ========================================================= */}
            {page.type === 'titanic' && (
              <div className="max-w-xl mx-auto bg-slate-900 text-slate-100 p-5 font-serif border-2 border-blue-400 shadow-2xl">
                <div className="text-center pb-3 border-b border-blue-400 mb-4">
                  <h1 className="text-3xl font-extrabold text-blue-300 tracking-wider">
                    TITANIC (1998)
                  </h1>
                  <p className="text-xs text-yellow-300 italic mt-1 font-sans">
                    "Nothing on Earth Could Come Between Them"
                  </p>
                </div>

                <div className="bg-blue-950/80 border border-blue-700 p-3 mb-4 text-xs">
                  <span className="font-bold text-yellow-400 block mb-1">BOX OFFICE PHENOMENON:</span>
                  <p className="text-slate-200">{page.boxOffice}</p>
                  <p className="text-yellow-200 mt-2 font-sans">{page.vhsNews}</p>
                </div>

                <div className="border border-slate-700 p-3 mb-4 text-xs bg-black/40">
                  <span className="font-bold text-cyan-300 block mb-1">RECORD BREAKING SOUNDTRACK:</span>
                  <p className="text-slate-300">{page.soundtrack}</p>
                </div>

                <div className="text-xs">
                  <h3 className="font-bold text-yellow-400 mb-1.5">Did You Know? (Trivia):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300 text-[11px]">
                    {page.trivia.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* e) WINAMP SKINS 98 & MP3 REPOSITORY                       */}
            {/* ========================================================= */}
            {page.type === 'winamp' && (
              <div className="max-w-xl mx-auto bg-slate-800 text-white p-5 font-sans border-2 border-yellow-400 shadow-2xl">
                <div className="text-center pb-2 border-b border-yellow-400 mb-4">
                  <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wide font-mono">
                    WINAMP SKINS 98
                  </h1>
                  <p className="text-xs text-slate-300 italic">{page.tagline}</p>
                  <span className="text-[10px] text-cyan-400 block mt-1 font-mono">{page.version}</span>
                </div>

                {/* Top Skins Table */}
                <div className="mb-4">
                  <h3 className="font-bold text-xs text-yellow-300 mb-1.5 font-mono">Top Downloaded Winamp Skins:</h3>
                  <div className="win-inset bg-slate-900 p-1">
                    <table className="w-full text-left text-xs text-slate-200">
                      <thead>
                        <tr className="border-b border-slate-700 text-yellow-400 text-[10px]">
                          <th className="p-1">Skin Name</th>
                          <th className="p-1">Author</th>
                          <th className="p-1">Size</th>
                          <th className="p-1">Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.topSkins.map((skin, i) => (
                          <tr key={i} className="border-b border-slate-800 hover:bg-slate-700 cursor-pointer">
                            <td className="p-1 text-cyan-300 font-bold">{skin.name}</td>
                            <td className="p-1">{skin.author}</td>
                            <td className="p-1">{skin.size}</td>
                            <td className="p-1 text-yellow-200">{skin.downloads}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Popular MP3s */}
                <div>
                  <h3 className="font-bold text-xs text-yellow-300 mb-1.5 font-mono">Featured MP3 Downloads (128kbps Stereo):</h3>
                  <ul className="space-y-1 text-xs">
                    {page.mp3s.map((mp3, i) => (
                      <li key={i} className="flex justify-between bg-slate-900 p-1.5 border border-slate-700">
                        <span className="text-green-400 font-mono">🎵 {mp3.title}</span>
                        <span className="text-slate-400 text-[11px]">{mp3.size}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 404 / Cannot Find Server */
          <div className="max-w-md mx-auto py-10 font-sans">
            <h1 className="text-xl font-bold text-blue-900 mb-3">The page cannot be displayed</h1>
            <p className="text-xs text-gray-800 mb-4">
              The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings.
            </p>
            <div className="border-t border-gray-300 pt-3 text-xs space-y-2 text-gray-700">
              <p>Please try the following:</p>
              <ul className="list-disc pl-5 space-y-1 text-blue-800">
                <li>
                  <span onClick={handleHome} className="underline cursor-pointer font-bold">
                    Click here to return to Yahoo! 1998 Homepage
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 5. Bottom Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>{isLoading ? 'Opening page...' : 'Done'}</span>
        <span className="flex items-center space-x-1">
          <img src="/icons/internet-explorer.svg" alt="" className="w-3 h-3 pixelated" />
          <span>Internet zone</span>
        </span>
      </div>
    </div>
  );
};

export default InternetExplorer;
