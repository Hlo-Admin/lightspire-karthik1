
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number>();

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

    const particles: Particle[] = [];
    // Reduced particle count for better performance
    const maxParticles = 50;
    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981'];

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 2 - 0.5,
        size: Math.random() * 2 + 0.5, // Smaller particles
        opacity: Math.random() * 0.6 + 0.2, // Reduced opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 200 + 100 // Shorter life for better performance
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      // Skip animation if not visible to save performance
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Calculate fade effect
        const lifeFactor = 1 - (particle.life / particle.maxLife);
        const currentOpacity = particle.opacity * lifeFactor;

        // Skip drawing if opacity is too low
        if (currentOpacity < 0.01) {
          particles[index] = createParticle();
          return;
        }

        // Optimized drawing - reduced glow effect
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        
        // Simplified glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Remove dead particles and create new ones
        if (particle.life >= particle.maxLife || particle.y < -10) {
          particles[index] = createParticle();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-5"
    />
  );
};
