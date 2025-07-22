
import { useEffect, useRef } from 'react';
import * as anime from 'animejs';

interface StrokeRevealProps {
  text: string;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  duration?: number;
}

const StrokeReveal = ({ 
  text,
  className = "",
  strokeColor = "currentColor",
  fillColor = "currentColor",
  strokeWidth = 2,
  duration = 2000
}: StrokeRevealProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && svgRef.current) {
              const textPath = svgRef.current.querySelector('text');
              if (textPath) {
                // Animate stroke dash
                anime.default({
                  targets: textPath,
                  strokeDashoffset: [anime.default.setDashoffset, 0],
                  easing: 'easeInOutSine',
                  duration: duration * 0.7,
                  complete: () => {
                    // Fill animation
                    anime.default({
                      targets: textPath,
                      fill: fillColor,
                      duration: duration * 0.3,
                      easing: 'easeOutQuart'
                    });
                  }
                });
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(svgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [duration, fillColor]);

  return (
    <svg 
      ref={svgRef}
      className={className}
      viewBox="0 0 400 100"
      style={{ width: '100%', height: 'auto' }}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="transparent"
        fontSize="24"
        fontWeight="bold"
        style={{ strokeDasharray: '1000', strokeDashoffset: '1000' }}
      >
        {text}
      </text>
    </svg>
  );
};

export default StrokeReveal;
