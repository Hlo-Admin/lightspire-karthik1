
import React, { useRef, useEffect, ReactElement, cloneElement } from 'react';

interface MagneticHoverProps {
  children: ReactElement;
  strength?: number;
  className?: string;
}

const MagneticHover: React.FC<MagneticHoverProps> = ({ 
  children, 
  strength = 0.3,
  className = "" 
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height);
      
      if (distance < maxDistance) {
        const moveX = deltaX * strength;
        const moveY = deltaY * strength;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return cloneElement(children, {
    ref: elementRef,
    className: `${children.props.className || ''} ${className} transition-transform duration-200 ease-out`.trim(),
  });
};

export default MagneticHover;
