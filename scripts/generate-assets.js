import fs from 'fs';
import path from 'path';

const icons = {
  'win98-logo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
    <rect x="1" y="1" width="6" height="6" fill="#ff3333"/>
    <rect x="8" y="1" width="6" height="6" fill="#33cc33"/>
    <rect x="1" y="8" width="6" height="6" fill="#0066ff"/>
    <rect x="8" y="8" width="6" height="6" fill="#ffcc00"/>
  </svg>`,

  'my-computer.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <rect x="4" y="3" width="24" height="17" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
    <rect x="6" y="5" width="20" height="13" fill="#008080"/>
    <rect x="8" y="7" width="16" height="9" fill="#000080"/>
    <rect x="10" y="8" width="12" height="7" fill="#1084d0"/>
    <rect x="12" y="20" width="8" height="4" fill="#808080"/>
    <rect x="7" y="24" width="18" height="3" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
    <rect x="21" y="25" width="2" height="1" fill="#00ff00"/>
  </svg>`,

  'recycle-bin.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <polygon points="8,8 24,8 21,28 11,28" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
    <rect x="6" y="5" width="20" height="3" fill="#808080" stroke="#000000" stroke-width="1"/>
    <rect x="12" y="3" width="8" height="2" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
    <line x1="13" y1="10" x2="13" y2="25" stroke="#008000" stroke-width="2"/>
    <line x1="16" y1="10" x2="16" y2="25" stroke="#008000" stroke-width="2"/>
    <line x1="19" y1="10" x2="19" y2="25" stroke="#008000" stroke-width="2"/>
  </svg>`,

  'network-neighborhood.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <rect x="3" y="4" width="12" height="10" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
    <rect x="5" y="6" width="8" height="6" fill="#008080"/>
    <rect x="17" y="4" width="12" height="10" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
    <rect x="19" y="6" width="8" height="6" fill="#008080"/>
    <line x1="9" y1="15" x2="9" y2="22" stroke="#000" stroke-width="2"/>
    <line x1="23" y1="15" x2="23" y2="22" stroke="#000" stroke-width="2"/>
    <line x1="4" y1="22" x2="28" y2="22" stroke="#000" stroke-width="2"/>
    <line x1="16" y1="22" x2="16" y2="26" stroke="#000" stroke-width="2"/>
    <rect x="12" y="26" width="8" height="3" fill="#ffff00" stroke="#000" stroke-width="1"/>
  </svg>`,

  'internet-explorer.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <circle cx="16" cy="16" r="12" fill="#1084d0" stroke="#000080" stroke-width="1.5"/>
    <ellipse cx="16" cy="16" rx="14" ry="5" fill="none" stroke="#ffcc00" stroke-width="2.5" transform="rotate(-25 16 16)"/>
    <text x="9" y="23" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#ffffff">e</text>
  </svg>`,

  'outlook-express.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <rect x="4" y="7" width="24" height="18" fill="#ffffff" stroke="#000000" stroke-width="1"/>
    <polygon points="4,7 16,17 28,7" fill="#dfdfdf" stroke="#000000" stroke-width="1"/>
    <polygon points="4,25 12,16" stroke="#808080" stroke-width="1"/>
    <polygon points="28,25 20,16" stroke="#808080" stroke-width="1"/>
    <rect x="18" y="3" width="10" height="10" fill="#000080"/>
    <text x="19" y="11" font-family="monospace" font-size="8" fill="#ffcc00" font-weight="bold">OE</text>
  </svg>`,

  'notepad.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <rect x="6" y="3" width="20" height="26" fill="#ffffff" stroke="#000" stroke-width="1"/>
    <rect x="6" y="3" width="4" height="26" fill="#80c0ff"/>
    <line x1="12" y1="8" x2="22" y2="8" stroke="#808080" stroke-width="1"/>
    <line x1="12" y1="12" x2="24" y2="12" stroke="#808080" stroke-width="1"/>
    <line x1="12" y1="16" x2="20" y2="16" stroke="#808080" stroke-width="1"/>
    <line x1="12" y1="20" x2="23" y2="20" stroke="#808080" stroke-width="1"/>
    <rect x="20" y="18" width="8" height="12" fill="none" stroke="#c0c0c0" stroke-width="1"/>
    <line x1="25" y1="14" x2="17" y2="26" stroke="#ffcc00" stroke-width="2"/>
  </svg>`,

  'wordpad.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <rect x="5" y="3" width="22" height="26" fill="#ffffff" stroke="#000" stroke-width="1"/>
    <rect x="8" y="6" width="16" height="4" fill="#dfdfdf"/>
    <text x="9" y="18" font-family="serif" font-weight="bold" font-size="12" fill="#000080">A</text>
    <line x1="18" y1="13" x2="23" y2="13" stroke="#000000" stroke-width="2"/>
    <line x1="18" y1="17" x2="23" y2="17" stroke="#000000" stroke-width="2"/>
    <line x1="9" y1="22" x2="23" y2="22" stroke="#000000" stroke-width="1"/>
    <line x1="9" y1="25" x2="20" y2="25" stroke="#000000" stroke-width="1"/>
  </svg>`,

  'paint.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <path d="M6 18 C6 10, 14 5, 22 7 C28 9, 29 16, 26 21 C24 24, 21 23, 19 25 C17 27, 18 29, 14 29 C9 29, 6 24, 6 18 Z" fill="#ffffcc" stroke="#000000" stroke-width="1"/>
    <circle cx="12" cy="12" r="2" fill="#ff0000"/>
    <circle cx="18" cy="10" r="2" fill="#00aa00"/>
    <circle cx="23" cy="14" r="2" fill="#0000ff"/>
    <circle cx="14" cy="22" r="2" fill="#ffcc00"/>
    <rect x="16" y="14" width="3" height="14" fill="#8b4513" transform="rotate(40 16 14)"/>
    <rect x="25" y="21" width="3" height="5" fill="#c0c0c0" transform="rotate(40 25 21)"/>
    <polygon points="28,26 31,29 27,30" fill="#000" transform="rotate(40 28 26)"/>
  </svg>`,

  'calculator.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <rect x="5" y="3" width="22" height="26" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
    <rect x="8" y="6" width="16" height="5" fill="#ffffff" stroke="#808080" stroke-width="1"/>
    <rect x="8" y="13" width="3" height="3" fill="#000080"/>
    <rect x="13" y="13" width="3" height="3" fill="#000080"/>
    <rect x="18" y="13" width="3" height="3" fill="#000080"/>
    <rect x="8" y="18" width="3" height="3" fill="#000080"/>
    <rect x="13" y="18" width="3" height="3" fill="#000080"/>
    <rect x="18" y="18" width="3" height="3" fill="#000080"/>
    <rect x="8" y="23" width="3" height="3" fill="#000080"/>
    <rect x="13" y="23" width="3" height="3" fill="#000080"/>
    <rect x="18" y="23" width="3" height="3" fill="#000080"/>
    <rect x="23" y="13" width="3" height="6" fill="#ff0000"/>
    <rect x="23" y="20" width="3" height="6" fill="#000080"/>
  </svg>`,

  'folder.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <polygon points="4,7 13,7 15,10 27,10 27,25 4,25" fill="#ffcc00" stroke="#000" stroke-width="1"/>
    <polygon points="5,11 28,11 26,25 3,25" fill="#ffe066" stroke="#000" stroke-width="1"/>
  </svg>`,

  'folder-open.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <polygon points="4,7 13,7 15,10 26,10 26,22 4,22" fill="#ffcc00" stroke="#000" stroke-width="1"/>
    <polygon points="2,25 7,13 29,13 25,25" fill="#ffe066" stroke="#000" stroke-width="1"/>
  </svg>`,

  'folder-locked.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <polygon points="4,7 13,7 15,10 27,10 27,25 4,25" fill="#ffcc00" stroke="#000" stroke-width="1"/>
    <polygon points="5,11 28,11 26,25 3,25" fill="#ffe066" stroke="#000" stroke-width="1"/>
    <rect x="18" y="18" width="10" height="8" fill="#ff3333" stroke="#000" stroke-width="1"/>
    <path d="M20 18 V15 C20 13 26 13 26 15 V18" fill="none" stroke="#000" stroke-width="2"/>
  </svg>`,

  'file-text.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
    <polygon points="6,3 21,3 26,8 26,29 6,29" fill="#ffffff" stroke="#000" stroke-width="1"/>
    <polygon points="21,3 21,8 26,8" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
    <line x1="10" y1="10" x2="18" y2="10" stroke="#000" stroke-width="1"/>
    <line x1="10" y1="14" x2="22" y2="14" stroke="#000" stroke-width="1"/>
    <line x1="10" y1="18" x2="22" y2="18" stroke="#000" stroke-width="1"/>
    <line x1="10" y1="22" x2="18" y2="22" stroke="#000" stroke-width="1"/>
  </svg>`,

  'volume.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
    <polygon points="2,6 6,6 9,3 9,13 6,10 2,10" fill="#000000"/>
    <path d="M11 5 C12 6.5, 12 9.5, 11 11" fill="none" stroke="#000000" stroke-width="1.5"/>
    <path d="M13 3 C15 5.5, 15 10.5, 13 13" fill="none" stroke="#000000" stroke-width="1.5"/>
  </svg>`,

  'shutdown.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <circle cx="12" cy="12" r="9" fill="none" stroke="#cc0000" stroke-width="2"/>
    <line x1="12" y1="4" x2="12" y2="12" stroke="#cc0000" stroke-width="2.5"/>
  </svg>`
};

const iconsDir = path.resolve('public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

for (const [name, content] of Object.entries(icons)) {
  fs.writeFileSync(path.join(iconsDir, name), content.trim());
}

// Also generate 2 sample retro dithered images for photos-1998
const photosDir = path.resolve('public/photos-1998');
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

const svgSetup = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#2d3748"/>
  <rect x="40" y="20" width="160" height="130" fill="#e2e8f0" stroke="#718096" stroke-width="4"/>
  <rect x="55" y="35" width="130" height="100" fill="#008080"/>
  <text x="65" y="80" fill="#ffffff" font-family="monospace" font-size="14">PENTIUM II 350</text>
  <text x="65" y="105" fill="#ffff00" font-family="monospace" font-size="12">64MB SDRAM</text>
  <rect x="100" y="150" width="40" height="20" fill="#cbd5e0"/>
  <rect x="70" y="170" width="100" height="10" fill="#a0aec0"/>
  <rect x="220" y="40" width="70" height="150" fill="#e2e8f0" stroke="#718096" stroke-width="3"/>
  <rect x="235" y="60" width="40" height="12" fill="#718096"/>
  <rect x="235" y="80" width="40" height="12" fill="#718096"/>
  <circle cx="255" cy="115" r="4" fill="#48bb78"/>
  <rect x="30" y="195" width="180" height="25" fill="#e2e8f0" stroke="#a0aec0" stroke-width="2"/>
  <rect x="230" y="200" width="25" height="35" fill="#e2e8f0" rx="6"/>
</svg>`;

const svgCubicle = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#4a5568"/>
  <rect x="20" y="20" width="280" height="140" fill="#718096"/>
  <rect x="50" y="40" width="80" height="60" fill="#e2e8f0"/>
  <rect x="55" y="45" width="70" height="50" fill="#000080"/>
  <text x="60" y="75" fill="#ffffff" font-family="sans-serif" font-size="10">WIN 98 SE</text>
  <rect x="160" y="30" width="40" height="50" fill="#ecc94b"/>
  <text x="165" y="55" fill="#000000" font-family="sans-serif" font-size="8">Y2K BUG</text>
  <text x="165" y="68" fill="#e53e3e" font-family="sans-serif" font-size="8">DON'T PANIC</text>
  <rect x="0" y="160" width="320" height="80" fill="#a0aec0"/>
  <circle cx="240" cy="190" r="16" fill="#e2e8f0" stroke="#4a5568" stroke-width="2"/>
  <text x="233" y="194" fill="#000" font-size="10" font-family="sans-serif">JAVA</text>
</svg>`;

fs.writeFileSync(path.join(photosDir, 'pc-setup.svg'), svgSetup);
fs.writeFileSync(path.join(photosDir, 'cubicle.svg'), svgCubicle);

console.log('Successfully generated public assets.');

