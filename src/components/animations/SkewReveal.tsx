
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SkewRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  duration?: number;
  delay?: number;
}

const SkewReveal = ({ 
  children, 
  className = "",
  direction = 'left',
  duration = 0.8,
  delay = 0
}: SkewRevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        x: direction === 'left' ? -100 : 100,
        skewX: direction === 'left' ? -15 : 15,
        opacity: 0
      }}
      whileInView={{
        x: 0,
        skewX: 0,
        opacity: 1
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default SkewReveal;
