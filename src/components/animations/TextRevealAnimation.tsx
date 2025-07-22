
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// @ts-ignore
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextRevealAnimationProps {
  children: string;
  className?: string;
  animationType?: 'reveal' | 'slide' | 'fade' | 'scale' | 'rotate';
  stagger?: number;
  duration?: number;
  delay?: number;
}

export const TextRevealAnimation: React.FC<TextRevealAnimationProps> = ({
  children,
  className = '',
  animationType = 'reveal',
  stagger = 0.05,
  duration = 0.8,
  delay = 0
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<any>(null);

  useEffect(() => {
    if (!textRef.current) return;

    splitRef.current = new SplitText(textRef.current, {
      type: "lines,words,chars",
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char"
    });

    const { chars, words, lines } = splitRef.current;

    // Set initial states
    gsap.set(textRef.current, { perspective: 1000 });

    switch (animationType) {
      case 'reveal':
        gsap.set(chars, { 
          y: 100, 
          opacity: 0,
          rotationX: -90,
          transformOrigin: "0% 50% -50px"
        });
        break;
      case 'slide':
        gsap.set(chars, { x: -50, opacity: 0 });
        break;
      case 'fade':
        gsap.set(chars, { opacity: 0, scale: 0.5 });
        break;
      case 'scale':
        gsap.set(chars, { scale: 0, opacity: 0 });
        break;
      case 'rotate':
        gsap.set(chars, { 
          rotation: () => gsap.utils.random(-180, 180),
          opacity: 0,
          scale: 0.3
        });
        break;
    }

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      delay
    });

    switch (animationType) {
      case 'reveal':
        tl.to(chars, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration,
          stagger,
          ease: "back.out(1.7)"
        });
        break;
      case 'slide':
        tl.to(chars, {
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.out"
        });
        break;
      case 'fade':
        tl.to(chars, {
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          ease: "power2.out"
        });
        break;
      case 'scale':
        tl.to(chars, {
          scale: 1,
          opacity: 1,
          duration,
          stagger,
          ease: "elastic.out(1, 0.3)"
        });
        break;
      case 'rotate':
        tl.to(chars, {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          ease: "back.out(1.7)"
        });
        break;
    }

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, animationType, stagger, duration, delay]);

  return (
    <div ref={textRef} className={`text-reveal-animation ${className}`}>
      {children}
    </div>
  );
};
