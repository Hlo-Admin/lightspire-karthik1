
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypingEffectProps {
  strings: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  strings,
  className = '',
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  showCursor = true
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (!el.current) return;

    typed.current = new Typed(el.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      showCursor,
      cursorChar: '|',
      autoInsertCss: true,
    });

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, loop, showCursor]);

  return <span ref={el} className={className} />;
};
