
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  type: 'cube' | 'triangle' | 'circle';
}

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 6; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
          speed: Math.random() * 20 + 10,
          type: ['cube', 'triangle', 'circle'][Math.floor(Math.random() * 3)] as 'cube' | 'triangle' | 'circle'
        });
      }
      setElements(newElements);
    };

    createElements();

    const animateElements = () => {
      setElements(prev => prev.map(element => ({
        ...element,
        rotation: element.rotation + element.speed * 0.01,
        y: element.y + Math.sin(Date.now() * 0.001 + element.id) * 0.02
      })));
    };

    const interval = setInterval(animateElements, 16);
    return () => clearInterval(interval);
  }, []);

  const renderElement = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-10 pointer-events-none transition-all duration-1000";
    const style = {
      left: `${element.x}%`,
      top: `${element.y}%`,
      transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
      filter: 'drop-shadow(0 0 20px currentColor)'
    };

    switch (element.type) {
      case 'cube':
        return (
          <div
            key={element.id}
            className={`${baseClasses} w-16 h-16 border-2 border-cyan-400 bg-cyan-400/5`}
            style={style}
          />
        );
      case 'triangle':
        return (
          <div
            key={element.id}
            className={`${baseClasses} w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-purple-400`}
            style={style}
          />
        );
      case 'circle':
        return (
          <div
            key={element.id}
            className={`${baseClasses} w-12 h-12 rounded-full border-2 border-pink-400 bg-pink-400/5`}
            style={style}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
      {elements.map(renderElement)}
    </div>
  );
};
