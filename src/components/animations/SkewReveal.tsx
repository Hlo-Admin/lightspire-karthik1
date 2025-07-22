
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
  const variants = {
    hidden: {
      x: direction === 'left' ? -100 : 100,
      skewX: direction === 'left' ? -15 : 15,
      opacity: 0
    },
    visible: {
      x: 0,
      skewX: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default SkewReveal;
