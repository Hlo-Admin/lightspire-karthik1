
import React from 'react';
import ScrollStack, { ScrollStackCard } from '@/components/ui/scroll-stack';

const ScrollStackDemo = () => {
  const stackCards: ScrollStackCard[] = [
    {
      title: "Futuristic UI Components & Templates",
      subtitle:
        "Lightswind UI offers a stunning collection of animated components, modern UI blocks, and ready-to-use templates — all crafted with Tailwind CSS and Framer Motion for a cutting-edge, professional look.",
      badge: "The Future of UI",
      backgroundImage:
        "https://images.pexels.com/photos/6985136/pexels-photo-6985136.jpeg",
    },
    {
      title: "Designed for Developers",
      subtitle:
        "Built with developer experience in mind, Lightswind UI focuses on clean code, intuitive APIs, and seamless integration into modern React projects.",
      badge: "The Philosophy",
      backgroundImage:
        "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg",
    },
    {
      title: "Aesthetic Meets Functionality",
      subtitle:
        "Every component is beautifully designed and fully responsive, blending minimalism with rich interactivity.",
      badge: "The Experience",
      backgroundImage:
        "https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg",
    },
    {
      title: "Tailored for Tailwind",
      subtitle:
        "Lightswind UI components are built from the ground up using Tailwind CSS, ensuring full utility-first styling and design consistency.",
      badge: "The Framework",
    },
    {
      title: "Speed Up Your Workflow",
      subtitle:
        "Focus on building amazing apps — not reinventing buttons, loaders, or navbars. Lightswind UI handles the polish, so you can ship faster.",
      badge: "The Advantage",
    },
  ];

  return (
    <div className="relative py-20">
      {/* Full Example */}
      <div className="text-center px-4 mb-12">
        <h2 className="text-3xl font-bold">Start scroll in this preview section inside to check the preview scroll stack</h2>
      </div>
      <ScrollStack cards={stackCards} className="max-w-6xl mx-auto px-4" />
    </div>
  );
};

export default ScrollStackDemo;
