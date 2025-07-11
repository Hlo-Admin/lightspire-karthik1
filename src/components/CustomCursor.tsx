
import React, { useState, useEffect, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'click' | 'creative'>('default');
  const [cursorLabel, setCursorLabel] = useState('');
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"]')) {
        setIsHovering(true);
        setCursorType('click');
        setCursorLabel('Click');
      } else if (target.matches('.creative-section, [data-cursor="creative"]')) {
        setIsHovering(true);
        setCursorType('creative');
        setCursorLabel('Explore');
      } else if (target.matches('img, video, .media-element')) {
        setIsHovering(true);
        setCursorType('view');
        setCursorLabel('View');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('default');
      setCursorLabel('');
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], img, video, .creative-section, [data-cursor="creative"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const getCursorClasses = () => {
    let baseClasses = "fixed pointer-events-none z-50 transition-all duration-300 ease-out";
    
    if (isClicking) {
      return `${baseClasses} w-8 h-8 border-2 border-cyan-400 rounded-full bg-cyan-400/20 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-75`;
    }
    
    if (isHovering) {
      switch (cursorType) {
        case 'click':
          return `${baseClasses} w-12 h-12 border-2 border-purple-400 rounded-full bg-purple-400/20 shadow-[0_0_30px_rgba(168,85,247,0.6)] scale-110`;
        case 'view':
          return `${baseClasses} w-10 h-10 border-2 border-pink-400 rounded-full bg-pink-400/20 shadow-[0_0_25px_rgba(236,72,153,0.6)] scale-105`;
        case 'creative':
          return `${baseClasses} w-14 h-14 border-2 border-cyan-400 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 shadow-[0_0_35px_rgba(6,182,212,0.8)] scale-110 rotate-45`;
        default:
          return `${baseClasses} w-6 h-6 border border-white/60 rounded-full bg-white/10`;
      }
    }
    
    return `${baseClasses} w-6 h-6 border border-white/60 rounded-full bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.3)]`;
  };

  const getTrailClasses = () => {
    return "fixed pointer-events-none z-40 w-12 h-12 border border-white/20 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-400/10 transition-all duration-500 ease-out";
  };

  return (
    <>
      {/* Trailing cursor */}
      <div
        ref={trailRef}
        className={getTrailClasses()}
        style={{
          left: cursorPosition.x - 24,
          top: cursorPosition.y - 24,
          transform: `scale(${isHovering ? 1.2 : 0.8})`,
        }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={getCursorClasses()}
        style={{
          left: cursorPosition.x - (isHovering ? (cursorType === 'creative' ? 28 : 24) : 12),
          top: cursorPosition.y - (isHovering ? (cursorType === 'creative' ? 28 : 24) : 12),
        }}
      >
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-1 h-1 bg-white rounded-full transition-all duration-300 ${isClicking ? 'scale-150' : 'scale-100'}`} />
        </div>
        
        {/* Cursor icon for creative sections */}
        {cursorType === 'creative' && (
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <div className="w-4 h-4 border border-cyan-400 bg-cyan-400/20 rounded-sm animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Cursor label */}
      {cursorLabel && (
        <div
          className="fixed pointer-events-none z-50 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded backdrop-blur-sm transition-all duration-300"
          style={{
            left: cursorPosition.x + 20,
            top: cursorPosition.y - 30,
            opacity: isHovering ? 1 : 0,
          }}
        >
          {cursorLabel}
        </div>
      )}
      
      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-30 w-20 h-20 border border-cyan-400/50 rounded-full animate-ping"
          style={{
            left: cursorPosition.x - 40,
            top: cursorPosition.y - 40,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
