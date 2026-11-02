import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

export const Calculator = () => {
  const { playSound } = useOS();

  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  // Input numbers
  const inputDigit = (digit) => {
    playSound('click');
    if (waitingForNext) {
      setDisplay(String(digit));
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  // Decimal point
  const inputDecimal = () => {
    playSound('click');
    if (waitingForNext) {
      setDisplay('0.');
      setWaitingForNext(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Backspace
  const handleBackspace = () => {
    playSound('click');
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Clear (C)
  const handleClear = () => {
    playSound('click');
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(false);
  };

  // Basic Calculation Arithmetic
  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? 'Error' : a / b;
      default: return b;
    }
  };

  // Operators (+, -, *, /)
  const handleOperator = (nextOp) => {
    playSound('click');
    const currentValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operator) {
      const result = calculate(prevValue, currentValue, operator);
      setDisplay(String(result));
      setPrevValue(result === 'Error' ? null : result);
    }

    setWaitingForNext(true);
    setOperator(nextOp);
  };

  // Equals (=)
  const handleEquals = () => {
    playSound('click');
    if (!operator || prevValue === null) return;
    const currentValue = parseFloat(display);
    const result = calculate(prevValue, currentValue, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(true);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') inputDigit(parseInt(e.key, 10));
      else if (e.key === '.') inputDecimal();
      else if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
      else if (e.key === 'Enter' || e.key === '=') handleEquals();
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') handleClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs p-2 select-none h-full justify-between">
      {/* Menu Bar */}
      <div className="flex items-center space-x-3 px-1 pb-1 border-b border-win-dark text-black text-[11px] shrink-0">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Sunken LCD-style Display */}
      <div className="win-inset bg-white p-2 my-2 flex items-center justify-end overflow-hidden shrink-0">
        <span className="font-mono text-base font-bold tracking-wider text-black truncate">
          {display}
        </span>
      </div>

      {/* Backspace & Clear (C) Row */}
      <div className="flex items-center space-x-2 mb-2 shrink-0">
        <button
          onClick={handleBackspace}
          className="flex-1 win-outset active:win-pressed py-1 bg-win-gray text-red-700 font-bold"
        >
          Backspace
        </button>
        <button
          onClick={handleClear}
          className="flex-1 win-outset active:win-pressed py-1 bg-win-gray text-red-700 font-bold"
        >
          C
        </button>
      </div>

      {/* 4x4 Keypad Grid (0-9, Operators, Equals) */}
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {/* Row 1 */}
        <button
          onClick={() => inputDigit(7)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          7
        </button>
        <button
          onClick={() => inputDigit(8)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          8
        </button>
        <button
          onClick={() => inputDigit(9)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          9
        </button>
        <button
          onClick={() => handleOperator('/')}
          className="win-outset active:win-pressed bg-win-gray text-red-700 font-bold text-sm"
        >
          /
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit(4)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          4
        </button>
        <button
          onClick={() => inputDigit(5)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          5
        </button>
        <button
          onClick={() => inputDigit(6)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          6
        </button>
        <button
          onClick={() => handleOperator('*')}
          className="win-outset active:win-pressed bg-win-gray text-red-700 font-bold text-sm"
        >
          *
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit(1)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          1
        </button>
        <button
          onClick={() => inputDigit(2)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          2
        </button>
        <button
          onClick={() => inputDigit(3)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          3
        </button>
        <button
          onClick={() => handleOperator('-')}
          className="win-outset active:win-pressed bg-win-gray text-red-700 font-bold text-sm"
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit(0)}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="win-outset active:win-pressed bg-win-gray text-blue-900 font-bold text-sm"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="win-outset active:win-pressed bg-win-gray text-red-700 font-bold text-sm"
        >
          =
        </button>
        <button
          onClick={() => handleOperator('+')}
          className="win-outset active:win-pressed bg-win-gray text-red-700 font-bold text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Calculator;
