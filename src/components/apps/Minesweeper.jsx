import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useOS } from '../../context/OSContext';

const ROWS = 9;
const COLS = 9;
const TOTAL_MINES = 10;

const NUMBER_COLORS = [
  '',
  '#0000ff', // 1: Blue
  '#008000', // 2: Green
  '#ff0000', // 3: Red
  '#000080', // 4: Navy
  '#800000', // 5: Maroon
  '#008080', // 6: Teal
  '#000000', // 7: Black
  '#808080', // 8: Gray
];

export const Minesweeper = () => {
  const { playSound } = useOS();

  const [grid, setGrid] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle' | 'playing' | 'won' | 'lost'
  const [isCellPressed, setIsCellPressed] = useState(false);
  const [timer, setTimer] = useState(0);
  const [flagsPlaced, setFlagsPlaced] = useState(0);
  const timerRef = useRef(null);

  // Initialize a fresh new board
  const initializeBoard = useCallback(() => {
    // 1. Create empty board
    const newGrid = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          row: r,
          col: c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        });
      }
      newGrid.push(row);
    }

    // 2. Randomly plant 10 mines
    let planted = 0;
    while (planted < TOTAL_MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        planted++;
      }
    }

    // 3. Calculate adjacent mines count for each cell
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].adjacentMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameStatus('idle');
    setTimer(0);
    setFlagsPlaced(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    initializeBoard();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initializeBoard]);

  // Timer Tick
  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer((t) => (t < 999 ? t + 1 : 999));
      }, 1000);
    } else if (gameStatus === 'won' || gameStatus === 'lost') {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  // Flood fill reveal
  const revealEmptyNeighbors = (board, r, c) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS &&
          !board[nr][nc].isRevealed &&
          !board[nr][nc].isFlagged
        ) {
          board[nr][nc].isRevealed = true;
          if (board[nr][nc].adjacentMines === 0 && !board[nr][nc].isMine) {
            revealEmptyNeighbors(board, nr, nc);
          }
        }
      }
    }
  };

  // Left click cell handler
  const handleCellClick = (r, c) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return;
    const cell = grid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    playSound('click');

    // Start timer on first move
    if (gameStatus === 'idle') {
      setGameStatus('playing');
    }

    const nextGrid = grid.map((row) => row.map((item) => ({ ...item })));

    // Hit a mine -> Game Over
    if (cell.isMine) {
      playSound('chord');
      setGameStatus('lost');
      // Reveal all mines
      nextGrid.forEach((row) =>
        row.forEach((item) => {
          if (item.isMine) item.isRevealed = true;
        })
      );
      setGrid(nextGrid);
      return;
    }

    // Safe cell reveal
    nextGrid[r][c].isRevealed = true;
    if (nextGrid[r][c].adjacentMines === 0) {
      revealEmptyNeighbors(nextGrid, r, c);
    }

    // Check Win Condition: all non-mine cells revealed
    let unrevealedSafeCells = 0;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!nextGrid[i][j].isMine && !nextGrid[i][j].isRevealed) {
          unrevealedSafeCells++;
        }
      }
    }

    if (unrevealedSafeCells === 0) {
      playSound('ding');
      setGameStatus('won');
    }

    setGrid(nextGrid);
  };

  // Right click flag handler
  const handleCellRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameStatus === 'won' || gameStatus === 'lost') return;
    const cell = grid[r][c];
    if (cell.isRevealed) return;

    playSound('click');

    const nextGrid = grid.map((row) => row.map((item) => ({ ...item })));
    const willBeFlagged = !cell.isFlagged;
    nextGrid[r][c].isFlagged = willBeFlagged;

    setFlagsPlaced((prev) => (willBeFlagged ? prev + 1 : prev - 1));
    setGrid(nextGrid);
  };

  // Smiley icon computation
  const getSmileyFace = () => {
    if (gameStatus === 'lost') return '😵';
    if (gameStatus === 'won') return '😎';
    if (isCellPressed) return '😮';
    return '🙂';
  };

  const remainingMines = Math.max(-99, TOTAL_MINES - flagsPlaced);
  const formattedMines = String(remainingMines).padStart(3, '0');
  const formattedTimer = String(timer).padStart(3, '0');

  return (
    <div className="flex-1 flex flex-col items-center bg-win-gray p-2 select-none font-w95 text-xs h-full justify-between">
      {/* 1. Menu Bar */}
      <div className="w-full flex items-center space-x-3 pb-1 border-b border-win-dark text-black text-[11px] shrink-0">
        <span onClick={initializeBoard} className="hover:bg-win-navy hover:text-white px-1 cursor-default">
          Game
        </span>
        <span onClick={() => alert('Minesweeper 1998\nCreated for Windows 98 Web OS')} className="hover:bg-win-navy hover:text-white px-1 cursor-default">
          Help
        </span>
      </div>

      {/* 2. Top Sunken Panel: Mine Counter + Smiley + Timer */}
      <div className="w-full win-inset bg-win-gray p-1.5 flex items-center justify-between mb-2 shrink-0">
        {/* Left: Red LCD Mine Counter */}
        <div className="bg-black text-red-600 font-mono font-bold text-lg px-1.5 py-0.5 win-inset tracking-widest leading-none">
          {formattedMines}
        </div>

        {/* Center: Classic Smiley Face Reset Button */}
        <button
          onClick={initializeBoard}
          title="Restart Game"
          className="win-outset active:win-pressed bg-win-gray w-7 h-7 flex items-center justify-center text-base"
        >
          {getSmileyFace()}
        </button>

        {/* Right: Red LCD Seconds Elapsed Timer */}
        <div className="bg-black text-red-600 font-mono font-bold text-lg px-1.5 py-0.5 win-inset tracking-widest leading-none">
          {formattedTimer}
        </div>
      </div>

      {/* 3. 9x9 Minesweeper Grid in Sunken Border */}
      <div
        className="win-inset bg-win-gray p-1 grid grid-cols-9 gap-0.5 shrink-0"
        onMouseDown={() => setIsCellPressed(true)}
        onMouseUp={() => setIsCellPressed(false)}
        onMouseLeave={() => setIsCellPressed(false)}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => handleCellRightClick(e, r, c)}
                style={{
                  color: cell.isRevealed && !cell.isMine ? NUMBER_COLORS[cell.adjacentMines] : undefined,
                }}
                className={`w-5 h-5 flex items-center justify-center text-xs font-bold leading-none ${
                  cell.isRevealed
                    ? 'win-inset bg-[#c0c0c0]'
                    : 'win-outset bg-win-gray active:win-inset'
                }`}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    '💣'
                  ) : cell.adjacentMines > 0 ? (
                    cell.adjacentMines
                  ) : (
                    ''
                  )
                ) : cell.isFlagged ? (
                  '🚩'
                ) : (
                  ''
                )}
              </button>
            );
          })
        )}
      </div>

      {/* 4. Bottom Legend Status */}
      <div className="w-full text-center text-[10px] text-gray-600 pt-1 border-t border-win-dark shrink-0">
        Left-Click: Open | Right-Click: 🚩 Flag
      </div>
    </div>
  );
};

export default Minesweeper;

