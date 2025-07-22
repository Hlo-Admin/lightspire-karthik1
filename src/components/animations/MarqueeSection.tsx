
import React from 'react';
import { MarqueeText } from './MarqueeText';
import { NeonGlowText } from './NeonGlowText';

const MarqueeSection: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
      {/* Top Marquee */}
      <div className="mb-8">
        <MarqueeText 
          speed={30} 
          direction="left"
          className="text-6xl md:text-8xl font-bold"
        >
          <NeonGlowText color="#0678cf">
            ANIMATION • CREATIVITY • INNOVATION • STORYTELLING • 
          </NeonGlowText>
        </MarqueeText>
      </div>
      
      {/* Bottom Marquee */}
      <MarqueeText 
        speed={25} 
        direction="right"
        className="text-4xl md:text-6xl font-light"
      >
        <NeonGlowText color="#06b6d4">
          PREMIUM QUALITY • AWARD WINNING • GLOBALLY RECOGNIZED • 
        </NeonGlowText>
      </MarqueeText>
    </div>
  );
};

export default MarqueeSection;
