
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface NeonGlowTextProps {
  children: string;
  className?: string;
  color?: string;
}

export const NeonGlowText: React.FC<NeonGlowTextProps> = ({
  children,
  className = '',
  color = '#0678cf'
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(textRef.current, {
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
      duration: 2,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [color]);

  return (
    <div 
      ref={textRef}
      className={`neon-glow-text ${className}`}
      style={{
        color: color,
        textShadow: `0 0 5px ${color}`
      }}
    >
      {children}
    </div>
  );
};
