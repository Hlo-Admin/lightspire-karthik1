
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MarqueeTextProps {
  children: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  children,
  speed = 50,
  direction = 'left',
  className = ''
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return;

    const marqueeWidth = marqueeRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;
    const startX = direction === 'left' ? contentWidth : -contentWidth;
    const endX = direction === 'left' ? -contentWidth : contentWidth;

    gsap.set(contentRef.current, { x: startX });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(contentRef.current, {
      x: endX,
      duration: speed,
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={marqueeRef} className={`marquee-container overflow-hidden ${className}`}>
      <div ref={contentRef} className="marquee-content whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};
