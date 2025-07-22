
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypedAnimationProps {
  strings: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
  startDelay?: number;
  showCursor?: boolean;
  loop?: boolean;
}

const TypedAnimation = ({ 
  strings, 
  className = "", 
  typeSpeed = 50, 
  backSpeed = 50, 
  startDelay = 0,
  showCursor = false,
  loop = false 
}: TypedAnimationProps) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        startDelay,
        showCursor,
        loop,
        cursorChar: '|',
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, startDelay, showCursor, loop]);

  return <span ref={el} className={className} />;
};

export default TypedAnimation;
