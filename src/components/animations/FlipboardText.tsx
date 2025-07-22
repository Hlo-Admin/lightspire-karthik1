
import { useEffect, useRef } from 'react';
import * as anime from 'animejs';

interface FlipboardTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: 'scroll' | 'hover';
}

const FlipboardText = ({ 
  children, 
  className = "",
  delay = 0,
  duration = 800,
  trigger = 'scroll'
}: FlipboardTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (textRef.current && trigger === 'scroll') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime.default({
                targets: textRef.current,
                rotateX: [90, 0],
                opacity: [0, 1],
                easing: 'easeOutQuart',
                duration,
                delay
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(textRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay, duration, trigger]);

  const handleHover = () => {
    if (trigger === 'hover' && textRef.current) {
      anime.default({
        targets: textRef.current,
        rotateX: [0, 10, 0],
        scale: [1, 1.05, 1],
        easing: 'easeOutQuart',
        duration: 400
      });
    }
  };

  return (
    <div 
      ref={textRef} 
      className={className}
      onMouseEnter={trigger === 'hover' ? handleHover : undefined}
      style={{ transformOrigin: 'center bottom' }}
    >
      {children}
    </div>
  );
};

export default FlipboardText;
