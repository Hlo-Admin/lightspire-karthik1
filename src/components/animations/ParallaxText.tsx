
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxText = ({ children, className = "", speed = 0.5 }: ParallaxTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxText;
