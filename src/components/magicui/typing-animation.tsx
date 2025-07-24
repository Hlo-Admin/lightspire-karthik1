"use client";

import { cn } from "../../lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  loop?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  loop = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let typingEffect: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    function startTyping() {
      typingEffect = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingEffect);
          if (loop) {
            loopTimeout = setTimeout(() => {
              setDisplayedText("");
              i = 0;
              startTyping();
            }, 1000); // 1s pause before restarting
          }
        }
      }, duration);
    }

    startTyping();

    return () => {
      clearInterval(typingEffect);
      clearTimeout(loopTimeout);
    };
  }, [children, duration, started, loop]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "text-2xl font-bold",
        className
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
