
import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid properties
    const gridSize = 50;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create animated grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const intensity = Math.sin((x + time) * 0.01) * Math.cos((y + time) * 0.01);
          const alpha = Math.max(0, intensity * 0.3);
          
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.beginPath();
          ctx.rect(x, y, gridSize, gridSize);
          ctx.stroke();
        }
      }

      // Create flowing lines
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const yOffset = (canvas.height / 5) * i;
        ctx.moveTo(0, yOffset);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = yOffset + Math.sin((x + time * 2) * 0.01) * 30;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
};
