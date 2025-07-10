
import { useEffect, useRef } from 'react';

export const MorphingCanvas = () => {
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

    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create morphing 3D-like object in center
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Create multiple layers for depth
      for (let layer = 0; layer < 3; layer++) {
        const offset = layer * 50;
        const alpha = 0.3 - (layer * 0.1);
        
        // Morphing shape
        ctx.beginPath();
        const sides = 6;
        const radius = 150 + Math.sin(time * 0.02) * 50 + offset;
        
        for (let i = 0; i <= sides; i++) {
          const angle = (i / sides) * Math.PI * 2 + time * 0.01;
          const morphFactor = Math.sin(time * 0.03 + i) * 0.3;
          const currentRadius = radius + morphFactor * 30;
          
          const x = Math.cos(angle) * currentRadius;
          const y = Math.sin(angle) * currentRadius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        
        // Gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, ${alpha * 0.2})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Stroke
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 2})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      ctx.restore();

      // Add light flares
      for (let i = 0; i < 5; i++) {
        const flareX = centerX + Math.sin(time * 0.01 + i * 2) * 300;
        const flareY = centerY + Math.cos(time * 0.015 + i * 1.5) * 200;
        const flareSize = 20 + Math.sin(time * 0.02 + i) * 10;
        
        const flareGradient = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, flareSize);
        flareGradient.addColorStop(0, 'rgba(6, 182, 212, 0.8)');
        flareGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
        flareGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.beginPath();
        ctx.arc(flareX, flareY, flareSize, 0, Math.PI * 2);
        ctx.fillStyle = flareGradient;
        ctx.fill();
      }

      // Interactive light following mouse
      const mouseDistance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );
      const mouseInfluence = Math.max(0, 1 - mouseDistance / 300);
      
      if (mouseInfluence > 0) {
        const mouseGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        mouseGradient.addColorStop(0, `rgba(236, 72, 153, ${mouseInfluence * 0.3})`);
        mouseGradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        ctx.fillStyle = mouseGradient;
        ctx.fill();
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-1"
    />
  );
};
