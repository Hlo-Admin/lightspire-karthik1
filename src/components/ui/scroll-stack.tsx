
import React from 'react';

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
  return (
    <div className={`scroll-stack ${className}`}>
      <div className="space-y-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 min-h-[400px] flex items-center justify-center"
            style={{
              backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center p-8 text-white">
              {card.badge && (
                <div className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
                  {card.badge}
                </div>
              )}
              <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;
export { ScrollStack };
