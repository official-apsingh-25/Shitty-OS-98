// Virtual File System for Windows 98 Web OS
// Period-accurate 1998 lore, files, and nested directories

export const initialFileSystem = {
  id: 'root',
  name: 'My Computer',
  type: 'root',
  children: [
    {
      id: 'c-drive',
      name: 'Local Disk (C:)',
      type: 'drive',
      path: 'C:\\',
      icon: 'drive',
      children: [
        {
          id: 'my-documents',
          name: 'My Documents',
          type: 'folder',
          path: 'C:\\My Documents',
          icon: 'folder-documents',
          children: [
            {
              id: 'diary-oct98',
              name: 'diary_oct1998.txt',
              type: 'txt',
              path: 'C:\\My Documents\\diary_oct1998.txt',
              icon: 'notepad',
              appId: 'notepad',
              size: '4 KB',
              modified: '10/18/1998 11:42 PM',
              content: `[OCTOBER 18, 1998 - 11:42 PM]

Finally saved up enough summer job money to bring home my brand new Pentium II 350MHz tower with 64MB of PC100 SDRAM and a Sound Blaster Live! soundcard! Windows 98 boots up with that glorious, shimmering Brian Eno chime in under 45 seconds.

Tonight I plugged in my USRobotics 56k V.90 external Faxmodem. That screeching handshake sound (BEEP... BOOP... KRRRR-SHHHHHH-DING-DONG... CHHHHHH!) is music to my ears. Connected at 50,666 bps without dropping carrier once!

Dave and Sarah were waiting on ICQ (my ICQ# is 4491028). The iconic 'Uh-Oh!' message sound woke up Dad down the hall, but it was worth it. Dave sent me an MP3 of Smash Mouth over DCC file transfer—it took 24 minutes to download, but the audio clarity is mind-blowing compared to cassette tapes.

We spent half the night arguing about whether our PCs will survive the Y2K bug. Sarah says her dad bought 100 gallons of drinking water and canned beans. I hid my secret notes in C:\\Windows\\System\\secret_vault.txt just in case.`
            },
            {
              id: 'school-essay-98',
              name: 'school_essay_98.doc',
              type: 'doc',
              path: 'C:\\My Documents\\school_essay_98.doc',
              icon: 'wordpad',
              appId: 'wordpad',
              size: '28 KB',
              modified: '10/12/1998 04:15 PM',
              content: `THE FUTURE OF THE YEAR 2000 & THE Y2K PHENOMENON
Social Studies Term Essay — Period 4
Student: Alex Vance | October 1998

As humanity approaches the threshold of the 21st century, our global society finds itself at once astonished by the lightning pace of technological progress and terrified by an impending chronological catastrophe: The Year 2000 Problem, colloquially known worldwide as 'The Y2K Bug'.

The origins of this computer crisis date back to the early decades of electronic computing in the 1960s and 70s. When memory was precious and measured in scarce magnetic core bytes, software engineers deliberately recorded calendar years using only two digits—'68' for 1968, '98' for 1998.

When the global clock strikes 00:00:00 on January 1, 2000, millions of legacy mainframe COBOL programs may misinterpret '00' as the year 1900. Media pundits warn of air traffic radar blackouts, municipal water grid shutdowns, and banking systems deducting negative 100 years of compound interest.

Yet here on Windows 98, Microsoft has already deployed Year 2000 diagnostic patches. Humanity's resilience and engineering genius will surely steer us safely past midnight into the glorious new Millennium.`
            },
            {
              id: 'monthly-budget-98',
              name: 'monthly_budget_98.txt',
              type: 'txt',
              path: 'C:\\My Documents\\monthly_budget_98.txt',
              icon: 'notepad',
              appId: 'notepad',
              size: '2 KB',
              modified: '10/01/1998 08:30 PM',
              content: `PERSONAL BUDGET & EXPENSES — OCTOBER 1998
==========================================
Allowance & Part-time Computer Lab Gig:  $210.00

EXPENDITURES:
• EarthLink Dial-Up Unlimited 56k Internet:  $19.95
• CompUSA Spindle of 10 Blank 650MB CD-Rs:   $18.50
• Box of 10 Imation 1.44MB 3.5" Floppy Disks:  $7.99
• Blockbuster Video Rentals (Titanic VHS + 2):  $9.50
• Friday Night LAN Party Pizza & 2L Mountain Dew: $14.25
• Half-Life Pre-order Deposit at Babbage's:  $10.00
• 2 Rolls of Kodak 35mm Film + 1-Hour Photo:  $12.80
------------------------------------------
TOTAL EXPENSES:                              $92.99
REMAINING SAVINGS (For Voodoo2 3D Card):    $117.01`
            },
            {
              id: 'my-pictures-folder',
              name: 'My Pictures',
              type: 'folder',
              path: 'C:\\My Documents\\My Pictures',
              icon: 'folder',
              children: [
                {
                  id: 'pic-pc-setup',
                  name: 'pc_setup_1998.bmp',
                  type: 'image',
                  path: 'C:\\My Documents\\My Pictures\\pc_setup_1998.bmp',
                  icon: 'image',
                  imageUrl: '/photos-1998/pc-setup.svg',
                  size: '48 KB',
                  dimensions: '320 x 240',
                  caption: 'My Beige Pentium II Battlestation (Sound Blaster + CRT)',
                  modified: '09/14/1998 02:15 PM'
                },
                {
                  id: 'pic-cubicle',
                  name: 'office_cubicle_1998.bmp',
                  type: 'image',
                  path: 'C:\\My Documents\\My Pictures\\office_cubicle_1998.bmp',
                  icon: 'image',
                  imageUrl: '/photos-1998/cubicle.svg',
                  size: '42 KB',
                  dimensions: '320 x 240',
                  caption: "Dad's Y2K Compliance IT Office & Java Station",
                  modified: '09/20/1998 06:40 PM'
                },
                {
                  id: 'pic-family-trip',
                  name: 'family_roadtrip_98.bmp',
                  type: 'image',
                  path: 'C:\\My Documents\\My Pictures\\family_roadtrip_98.bmp',
                  icon: 'image',
                  imageUrl: '/photos-1998/family_vacation_98.svg',
                  size: '56 KB',
                  dimensions: '320 x 240',
                  caption: "Summer Vacation '98 - Lake Tahoe in the Minivan",
                  modified: '07/14/1998 05:20 PM'
                },
                {
                  id: 'pic-lan-party',
                  name: 'basement_lan_party.bmp',
                  type: 'image',
                  path: 'C:\\My Documents\\My Pictures\\basement_lan_party.bmp',
                  icon: 'image',
                  imageUrl: '/photos-1998/lan_party_98.svg',
                  size: '52 KB',
                  dimensions: '320 x 240',
                  caption: 'All-Night Quake II & Doom LAN Session with Kevin',
                  modified: '10/24/1998 03:10 AM'
                },
                {
                  id: 'pic-gandhi-archive',
                  name: 'gandhi with hoties.jpg',
                  type: 'image',
                  path: 'C:\\My Documents\\My Pictures\\gandhi with hoties.jpg',
                  icon: 'image',
                  imageUrl: '/photos-1998/gandhi_ji_with_hoties.jpg',
                  size: '92 KB',
                  dimensions: '529 x 720',
                  caption: 'Historical Archival Snapshot 1998',
                  modified: '10/28/1998 04:20 PM'
                }
              ]
            }
          ]
        },
        {
          id: 'windows-folder',
          name: 'WINDOWS',
          type: 'folder',
          path: 'C:\\WINDOWS',
          icon: 'folder',
          children: [
            {
              id: 'system-folder',
              name: 'System',
              type: 'folder',
              path: 'C:\\WINDOWS\\System',
              icon: 'folder',
              children: [
                {
                  id: 'secret-vault',
                  name: 'secret_vault.txt',
                  type: 'txt',
                  path: 'C:\\WINDOWS\\System\\secret_vault.txt',
                  icon: 'notepad',
                  appId: 'notepad',
                  isProtected: true,
                  password: '1998',
                  size: '3 KB',
                  modified: '10/28/1998 03:33 AM',
                  content: `CONGRATULATIONS! YOU UNLOCKED THE SECRET 1998 ARCHIVES!
=====================================================
ACCESS GRANTED: LEVEL 5 SECURITY CLEARANCE
CODENAME: MEMPHIS (Windows 98 Internal Dev Name)

If you are reading this in the future:
1. Did the Y2K bug bring down the power grid? (We hope not!)
2. Is Half-Life the greatest first-person shooter ever made?
3. Did everyone switch from Netscape Navigator to Internet Explorer?
4. Are modems obsolete yet? What speed are you downloading files at?

Thank you for visiting Windows 98 Web OS! You cracked the retro password puzzle!`
                },
                {
                  id: 'do-not-delete',
                  name: 'DO_NOT_DELETE.sys',
                  type: 'sys',
                  path: 'C:\\WINDOWS\\System\\DO_NOT_DELETE.sys',
                  icon: 'file-text',
                  size: '128 KB',
                  modified: '05/11/1998 08:00 AM',
                  content: `*** CRITICAL 16/32-BIT HYBRID KERNEL DRIVER ***
================================================
WARNING: This driver (VMM32.VXD / KRNL386.EXE) manages protected-mode virtual memory, page faults, and real-mode MS-DOS interrupt vector routing.

Modifying, relocating, or deleting this file will cause immediate Kernel Panic and Blue Screen of Death (BSOD) Error:
*** STOP: 0x0000000A (0x00000000, 0x00000002, 0x00000000, 0x80386000)
IRQL_NOT_LESS_OR_EQUAL

Microsoft Windows 98 Second Edition Operating System.`
                }
              ]
            }
          ]
        },
        {
          id: 'program-files',
          name: 'Program Files',
          type: 'folder',
          path: 'C:\\Program Files',
          icon: 'folder',
          children: [
            {
              id: 'accessories',
              name: 'Accessories',
              type: 'folder',
              path: 'C:\\Program Files\\Accessories',
              icon: 'folder',
              children: [
                { id: 'app-notepad-exe', name: 'NOTEPAD.EXE', type: 'app', icon: 'notepad', appId: 'notepad', size: '128 KB' },
                { id: 'app-wordpad-exe', name: 'WORDPAD.EXE', type: 'app', icon: 'wordpad', appId: 'wordpad', size: '320 KB' },
                { id: 'app-paint-exe', name: 'MSPAINT.EXE', type: 'app', icon: 'paint', appId: 'paint', size: '440 KB' },
                { id: 'app-calc-exe', name: 'CALC.EXE', type: 'app', icon: 'calculator', appId: 'calculator', size: '96 KB' },
                { id: 'app-minesweeper-exe', name: 'WINMINE.EXE', type: 'app', icon: 'minesweeper', appId: 'minesweeper', size: '84 KB' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      type: 'folder',
      path: 'Recycle Bin',
      icon: 'recycle-bin',
      children: [
        {
          id: 'icq-chat-98',
          name: 'icq_chat_aug98.txt',
          type: 'txt',
          path: 'Recycle Bin\\icq_chat_aug98.txt',
          icon: 'notepad',
          appId: 'notepad',
          size: '3 KB',
          modified: '08/30/1998 02:40 AM',
          content: `ICQ CHAT LOG: Alex_98 (4491028) & CyberDave (3981102)
Date: August 30, 1998 | Connection: Direct Peer-to-Peer
======================================================
[02:14:02] CyberDave: hey alex u there?
[02:14:15] Alex_98: yeah just downloading the new Winamp 2.0 skin
[02:14:48] CyberDave: did u hear what mr henderson said in computer science today?
[02:15:10] Alex_98: about the Y2K bug on bank mainframes?
[02:15:32] CyberDave: yeah! he says if the date rolls to 00 everything locked in system vaults will freeze forever.
[02:16:05] Alex_98: lol im not worried. i locked all my secret files inside C:\\Windows\\System\\secret_vault.txt anyway.
[02:16:30] CyberDave: wait what is the password if your PC crashes?
[02:16:55] Alex_98: haha its easy to remember. just the current year: "1998". Don't tell anyone!
[02:17:20] CyberDave: sweet. hey let's play Quake II deathmatch tomorrow.
[02:17:40] Alex_98: deal. mom is telling me to get off the phone line now. cya on IRC tomorrow!`
        },
        {
          id: 'old-todo-deleted',
          name: 'old_todo_deleted.txt',
          type: 'txt',
          path: 'Recycle Bin\\old_todo_deleted.txt',
          icon: 'notepad',
          appId: 'notepad',
          size: '1 KB',
          modified: '09/01/1998 10:15 AM',
          content: `TO-DO LIST (SUMMER 1998 - COMPLETED / DISCARDED):
[X] Return Titanic 2-tape VHS edition to Blockbuster before 6 PM
[X] Defrag C: drive with Windows 98 disk defragmenter
[X] Install DirectX 6.0 drivers from PC Gamer demo disc
[X] Sign up for 500 free America Online (AOL) trial CD in the mail
[ ] Check if the year 2000 millennium bug will wipe my GeoCities page`
        }
      ]
    }
  ]
};

// Helper: Recursively search the file system tree by ID
export function findItemById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findItemById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// Helper: Find parent of a node
export function findParentNode(root, targetId) {
  if (!root.children) return null;
  for (const child of root.children) {
    if (child.id === targetId) return root;
    const found = findParentNode(child, targetId);
    if (found) return found;
  }
  return null;
}
