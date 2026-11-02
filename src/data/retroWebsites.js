// Simulated 1998 Web Pages & Directory for Internet Explorer
export const retroWebsites = {
  // Default Homepage: 1998 Yahoo-style Search Engine & Directory
  'www.yahoo1998.com': {
    title: 'Yahoo! 1998 - World Wide Web Guide & Search',
    url: 'http://www.yahoo1998.com',
    type: 'yahoo',
    bannerText: "Yahoo! - What's New - Check Hotmail - Chat - My Yahoo!",
    categories: [
      {
        name: 'Computers & Internet',
        desc: 'Hardware, Software, Internet, Web Design, Y2K Bug...',
        sites: [
          { name: "CyberKid98's Personal Web Oasis", url: 'http://www.geocities.com/cyberkid98', desc: '90s animated GIFs, MIDI songs, and Pentium II overclocking.' },
          { name: 'Winamp Skins & MP3 Hub', url: 'http://www.winamp-skins98.net', desc: 'Download Nullsoft Winamp 2.0 skins, visualization plug-ins, and free MP3s.' }
        ]
      },
      {
        name: 'News & Current Events (1998)',
        desc: 'Millennium Bug, Dot-Com Boom, Space Exploration...',
        sites: [
          { name: 'The Millennium Bug (Y2K) Survival Center', url: 'http://www.y2k-survival-1998.org', desc: 'Countdown to the Year 2000, canned beans stockpile guide, and PC BIOS tests.' }
        ]
      },
      {
        name: 'Entertainment & Movies',
        desc: 'Hollywood Blockbusters, Soundtracks, VHS Releases...',
        sites: [
          { name: 'Titanic (1998) Mega Fan Shrine', url: 'http://www.cinema1998.com/titanic', desc: 'Box office records, double-cassette VHS news, Celine Dion lyrics, and Leo DiCaprio gallery.' }
        ]
      },
      {
        name: 'Science & Society',
        desc: 'Space Station MIR, Deep Space 1, Hubble telescope photos...',
        sites: []
      }
    ]
  },

  // a) GeoCities Personal Homepage (Under Construction, Marquee, Guestbook)
  'www.geocities.com/cyberkid98': {
    title: "Welcome to CyberKid98's Radical Homepage - GeoCities SiliconValley",
    url: 'http://www.geocities.com/cyberkid98',
    type: 'geocities',
    user: 'CyberKid98',
    neighborhood: 'SiliconValley/Heights/4491',
    visitorCount: 14892,
    guestbookEntries: [
      { author: 'NeonSurfer98', date: '10/22/1998', msg: 'Radical webpage dude! Love the dancing baby GIF and flaming text divider!' },
      { author: 'MatrixFan_Neo', date: '10/18/1998', msg: 'Took 4 minutes to download on my 33.6k modem but your MIDI background rocks!' },
      { author: 'WebmasterDave', date: '10/12/1998', msg: 'Thanks for trading web banners with my GeoCities site. Link added!' }
    ]
  },

  // b) Y2K Millennium Bug Survival Center
  'www.y2k-survival-1998.org': {
    title: 'THE YEAR 2000 SURVIVAL INITIATIVE - DEFEND AGAINST THE BUG',
    url: 'http://www.y2k-survival-1998.org',
    type: 'y2k',
    warning: 'CRITICAL ALERT: LESS THAN 430 DAYS UNTIL MIDNIGHT JANUARY 1, 2000!',
    checklist: [
      'Install Windows 98 Year 2000 Diagnostic Patch immediately.',
      'Stockpile minimum 60 days of Campbell\'s canned soup and 30 gallons of bottled water.',
      'Withdraw paper cash from your bank before December 31, 1999—ATMs may think it is 1900!',
      'Check if your microwave and VCR clocks support 4-digit years.',
      'Keep a battery-operated transistor radio and spare flashlights in your storm shelter.'
    ]
  },

  // c) Cinema 1998 Titanic Fan Page
  'www.cinema1998.com/titanic': {
    title: 'Titanic (1998) Unofficial Fan Central & Celine Dion Fan Club',
    url: 'http://www.cinema1998.com/titanic',
    type: 'titanic',
    boxOffice: '$1.84 BILLION WORLDWIDE (Highest Grossing Film in History!)',
    vhsNews: 'The 2-Tape Collector\'s Widescreen VHS is now in stock at Blockbuster Video and Suncoast Motion Picture Company!',
    soundtrack: 'Celine Dion - "My Heart Will Go On" has been #1 on the Billboard 200 for 16 consecutive weeks.',
    trivia: [
      'James Cameron spent more money building the replica ship than the original Titanic cost in 1912!',
      'Over 11 Academy Awards won, tying Ben-Hur for the historic world record.',
      'Fans in Tokyo and London have reported seeing the film in theaters over 20 times.'
    ]
  },

  // d) Winamp Skins & 90s MP3 Hub
  'www.winamp-skins98.net': {
    title: 'Winamp Skins 98 - Nullsoft Software & Free MP3 Repository',
    url: 'http://www.winamp-skins98.net',
    type: 'winamp',
    tagline: 'Nullsoft Winamp: "It really whips the llama\'s ass!"',
    version: 'Winamp 2.05 (Now with 10-band Equalizer and DSP/Effect plugins)',
    topSkins: [
      { name: 'Classic Beige 98', downloads: '48,210', size: '142 KB', author: 'Nullsoft' },
      { name: 'Cyber Matrix Neon Green', downloads: '36,440', size: '188 KB', author: 'CyberX' },
      { name: 'Voodoo 3Dfx Black Gold', downloads: '29,105', size: '215 KB', author: 'GlideMaster' },
      { name: 'Anime Sailor Star 98', downloads: '24,800', size: '195 KB', author: 'Otaku98' }
    ],
    mp3s: [
      { title: 'Smash Mouth - All Star (Early Promo).mp3', bitrate: '128 kbps', size: '3.4 MB' },
      { title: 'Fatboy Slim - The Rockafeller Skank.mp3', bitrate: '128 kbps', size: '4.1 MB' },
      { title: 'Cher - Believe.mp3', bitrate: '128 kbps', size: '3.8 MB' },
      { title: 'Aerosmith - I Don\'t Want to Miss a Thing.mp3', bitrate: '128 kbps', size: '4.6 MB' }
    ]
  }
};

// Aliases for user convenience when typing URLs
retroWebsites['yahoo1998.com'] = retroWebsites['www.yahoo1998.com'];
retroWebsites['www.yahoo.com'] = retroWebsites['www.yahoo1998.com'];
retroWebsites['yahoo.com'] = retroWebsites['www.yahoo1998.com'];
retroWebsites['geocities.com/cyberkid98'] = retroWebsites['www.geocities.com/cyberkid98'];
retroWebsites['www.geocities.com'] = retroWebsites['www.geocities.com/cyberkid98'];
retroWebsites['y2k-survival-1998.org'] = retroWebsites['www.y2k-survival-1998.org'];
retroWebsites['cinema1998.com/titanic'] = retroWebsites['www.cinema1998.com/titanic'];
retroWebsites['winamp-skins98.net'] = retroWebsites['www.winamp-skins98.net'];
