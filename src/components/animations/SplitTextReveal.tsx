
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextRevealProps {
  children: React.ReactNode;
  className?: string;
  splitType?: 'lines' | 'words' | 'chars';
  stagger?: number;
  duration?: number;
}

const SplitTextReveal = ({ 
  children, 
  className = "",
  splitType = 'lines',
  stagger = 0.1,
  duration = 0.8
}: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const split = new SplitText(textRef.current, { type: splitType });
      
      gsap.set(split[splitType], { 
        y: 100, 
        opacity: 0 
      });

      gsap.to(split[splitType], {
        y: 0,
        opacity: 1,
        duration,
        ease: "power2.out",
        stagger,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      return () => {
        split.revert();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [splitType, stagger, duration]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default SplitTextReveal;
