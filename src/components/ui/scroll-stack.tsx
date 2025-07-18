
import React, { useEffect, useRef, useState } from 'react';

export interface ScrollStackCard {
  title: string;
  subtitle: string;
  badge?: string;
  backgroundImage?: string;
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
  className?: string;
}

const ScrollStack: React.FC<ScrollStackProps> = ({ cards, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
          
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardIndex]));
          } else {
            setVisibleCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(cardIndex);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [cards]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        const cardHeight = cardRect.height;

        // Calculate scroll progress for this card
        const cardCenter = cardTop + cardHeight / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(cardCenter - windowCenter);
        const maxDistance = windowHeight / 2 + cardHeight / 2;
        const progress = Math.max(0, 1 - distanceFromCenter / maxDistance);

        // Apply transforms based on scroll progress
        const scale = 0.8 + (progress * 0.2);
        const opacity = 0.3 + (progress * 0.7);
        const translateY = (1 - progress) * 50;

        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        card.style.opacity = opacity.toString();
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`scroll-stack ${className}`}>
      <div className="space-y-16 py-20">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-card-index={index}
            className={`
              relative rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 
              min-h-[500px] flex items-center justify-center transition-all duration-300 
              ${visibleCards.has(index) ? 'animate-fade-in' : 'opacity-30'}
            `}
            style={{
              backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transformOrigin: 'center center',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center p-8 text-white max-w-4xl">
              {card.badge && (
                <div className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-full mb-6 transform transition-transform duration-300 hover:scale-105">
                  {card.badge}
                </div>
              )}
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {card.title}
              </h3>
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;
export { ScrollStack };
