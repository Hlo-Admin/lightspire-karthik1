
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
}

const MaskReveal = ({ 
  children, 
  className = "", 
  direction = 'bottom', 
  duration = 1 
}: MaskRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const clipPaths = {
        left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
      };

      gsap.set(containerRef.current, {
        clipPath: clipPaths[direction]
      });

      gsap.to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [direction, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default MaskReveal;
