
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SwipeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let allowScroll = true;
    let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause();
    let currentIndex = 0;
    let swipePanels = panelsRef.current;

    // set z-index levels for the swipe panels
    gsap.set(swipePanels, { zIndex: i => swipePanels.length - i});

    // create an observer and disable it to start
    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
      tolerance: 10,
      preventDefault: true,
      onEnable(self) {
        allowScroll = false;
        scrollTimeout.restart(true);
        // when enabling, we should save the scroll position and freeze it
        let savedScroll = self.scrollY();
        self._restoreScroll = () => self.scrollY(savedScroll);
        document.addEventListener("scroll", self._restoreScroll, {passive: false});
      },
      onDisable: self => document.removeEventListener("scroll", self._restoreScroll)
    });
    intentObserver.disable();

    // handle the panel swipe animations
    function gotoPanel(index: number, isScrollingDown: boolean) {
      // return to normal scroll if we're at the end or back up to the start
      if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
        intentObserver.disable(); // resume native scroll
        return;
      }
      allowScroll = false;
      scrollTimeout.restart(true);
      let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
      gsap.to(target, {
        yPercent: isScrollingDown ? -100 : 0,
        duration: 0.75
      });
      currentIndex = index;
    }

    // pin swipe section and initiate observer
    let scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: "top top",
      end: "+=200",
      onEnter: (self) => {
        if (intentObserver.isEnabled) { return }
        self.scroll(self.start + 1);
        intentObserver.enable();
      },
      onEnterBack: (self) => {
        if (intentObserver.isEnabled) { return }
        self.scroll(self.end - 1);
        intentObserver.enable();
      }
    });

    // Cleanup function
    return () => {
      scrollTrigger.kill();
      intentObserver.disable();
      scrollTimeout.kill();
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el);
    }
  };

  return (
    <div className="relative">
      {/* Description Panel */}
      <div className="description-panel h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8 cinematic-title">Mixed Observer & Scrolling</h1>
          <div className="scroll-down-indicator">
            <span className="text-xl font-medium">Scroll down</span>
            <div className="arrow mt-4 mx-auto w-8 h-8 border-r-2 border-b-2 border-white transform rotate-45 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Swipe Section */}
      <div 
        ref={sectionRef}
        className="swipe-section relative h-screen w-full overflow-hidden"
      >
        <section 
          ref={addToRefs}
          className="panel absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold cinematic-title mb-4">ScrollTrigger.observe() Section</h2>
            <p className="text-xl opacity-90">Swipe or scroll to navigate</p>
          </div>
        </section>

        <section 
          ref={addToRefs}
          className="panel absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold cinematic-title mb-4">Swipe Section 2</h2>
            <p className="text-xl opacity-90">Smooth transitions between panels</p>
          </div>
        </section>

        <section 
          ref={addToRefs}
          className="panel absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold cinematic-title mb-4">Swipe Section 3</h2>
            <p className="text-xl opacity-90">Powered by GSAP ScrollTrigger</p>
          </div>
        </section>

        <section 
          ref={addToRefs}
          className="panel absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold cinematic-title mb-4">Last Swipe Section</h2>
            <p className="text-xl opacity-90">Continue scrolling to resume normal scroll</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SwipeSection;
