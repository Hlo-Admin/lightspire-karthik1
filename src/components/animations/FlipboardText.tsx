
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// @ts-ignore
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface FlipboardTextProps {
  children: string;
  className?: string;
  stagger?: number;
}

export const FlipboardText: React.FC<FlipboardTextProps> = ({
  children,
  className = '',
  stagger = 0.1
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "chars" });
    const { chars } = split;

    gsap.set(textRef.current, { perspective: 1000 });
    gsap.set(chars, { 
      rotationY: -180,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(chars, {
      rotationY: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      ease: "back.out(1.7)"
    });

    return () => {
      split.revert();
    };
  }, [children, stagger]);

  return (
    <div ref={textRef} className={`flipboard-text ${className}`}>
      {children}
    </div>
  );
};
