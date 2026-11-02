# 🪟 Windows 98 Replica (`win98-os`)

An interactive, nostalgic web-based replica of **Microsoft Windows 98** built as a digital time capsule and retro OS simulation. It recreates the classic 3D beveled gray interface, pixelated icons, period-accurate applications, 1998 web directories, hidden lore, and a few hilarious prank surprises.

🔗 **Live Demo:** [Add your Vercel link here, e.g., https://win98-os.vercel.app]

---

## ✨ Key Features

### 🖥️ Classic Desktop & Window Management
- **Authentic Win98 GUI:** Teal (`#008080`) desktop, 3D outset/inset beveled borders, classic navy-to-blue gradient title bars, and optional CRT scanline overlay.
- **Full Window Manager:** Draggable windows, dynamic `z-index` focus management, Minimize to Taskbar, Maximize, and Close controls.
- **Taskbar & Start Menu:** Interactive Start menu popup, active window tabs, system tray audio toggle, and real-time clock.

### 🛠️ Built-in Classic Applications
- **File Explorer (`My Computer`):** Navigate nested 1998 folders, drives, and files.
- **Notepad & WordPad:** Read and edit `.txt` diaries and rich-text `.doc` essays from 1998.
- **MS Paint:** Working HTML5 Canvas with pencil, brush, eraser, line tools, and the classic 16-color palette.
- **Calculator:** Compact 3D beveled arithmetic calculator.
- **Photo Viewer:** Displays low-resolution 1998 photos with a simulated 56k dial-up scanline loading effect.
- **Minesweeper:** Playable classic 9x9 grid game with flag markers and smiley reset button.

### 🌐 1998 Period Web & Email Client
- **Internet Explorer 4.0:** Built-in retro router featuring a **1998 Yahoo! Directory & Search Engine**, **GeoCities Personal Homepage**, **Y2K Millennium Bug Survival Guide**, and 90s pop-culture fan pages.
- **Outlook Express:** 3-pane email client with Inbox, Sent Items, and a mysterious **unsent confession in the Drafts folder**.

### 🥚 Easter Eggs, Lore & Prank Mechanics
- **Custom Boot Intro Audio:** Interactive boot screen that triggers a custom intro soundtrack (`music intro.mp3`) on startup.
- **Authentic "90s PC Hang" Prank:** Opening an application freezes the screen with a waiting hourglass cursor for 3 seconds before popping up a custom Windows 98 prank error dialog (*"kaisa laga mera mazak chuss "*), opening the app right after clicking **OK**.
- **Forgotten Files:** Deleted ICQ chat logs from August 1998 hidden inside the **Recycle Bin** containing clues to a password-protected secret vault.
- **Blue Screen of Death (BSOD):** Attempting to open or delete critical system files in `C:\Windows\System` triggers a full-screen BSOD crash.

---

## 🚀 Tech Stack

- **Frontend Framework:** React.js
- **Build Tool:** Vite (`vite.config.js`)
- **Styling:** Tailwind CSS (`tailwind.config.js`, `postcss.config.js`) + Custom Win98 3D bevel utilities & pixel-art rendering
- **Deployment:** Vercel

---

## 📂 Project Structure

```text
win98-os/
├── public/
│   ├── fonts/          # Retro pixel fonts
│   ├── icons/          # Original 16x16 & 32x32 Windows 98 icons
│   ├── photos-1998/    # Low-res period photographs
│   └── sounds/         # Custom boot intro & classic system audio
├── src/
│   ├── components/
│   │   ├── os/         # Desktop, Taskbar, StartMenu, WindowFrame, PrankModal
│   │   └── apps/       # Explorer, Notepad, WordPad, Paint, Calc, IE, Outlook, Minesweeper
│   ├── context/        # Central OSContext (Window & Process Manager)
│   └── data/           # Virtual File System, 1998 emails, and retro websites
├── index.html
├── tailwind.config.js
└── vite.config.js
