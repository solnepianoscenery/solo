import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const ScrollCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // Use a small buffer to handle browser rounding issues
      const threshold = 5;
      setCanScrollLeft(scrollLeft > threshold);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - threshold);
    }
  };

  useEffect(() => {
    // Initial check (give browser a moment to render children)
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
        checkScroll();
      }
    }, 100);
    
    // Use ResizeObserver for accurate sizing changes
    const resizeObserver = new ResizeObserver(() => checkScroll());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        onScroll={checkScroll}
        className="w-full flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 snap-x snap-mandatory pb-12 md:pb-0 scroll-smooth scroll-pl-6 px-6 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden after:content-[''] after:shrink-0 after:w-2 md:after:hidden"
      >
        {children}
      </div>

      {/* Mobile Scroll Indicators */}
      {/* Left indicator */}
      <div 
        className={`md:hidden absolute left-1 top-[40%] -translate-y-1/2 flex items-center justify-center p-2 pointer-events-none transition-opacity duration-700 z-10 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="bg-white/40 backdrop-blur-md rounded-full w-10 h-10 border border-white/80 shadow-[0_4px_20px_rgba(219,157,100,0.15)] flex items-center justify-center animate-swipe-left">
          <ChevronLeft className="w-5 h-5 text-solne-gold/80" />
        </div>
      </div>

      {/* Right indicator */}
      <div 
        className={`md:hidden absolute right-1 top-[40%] -translate-y-1/2 flex items-center justify-center p-2 pointer-events-none transition-opacity duration-700 z-10 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="bg-white/40 backdrop-blur-md rounded-full w-10 h-10 border border-white/80 shadow-[0_4px_20px_rgba(219,157,100,0.15)] flex items-center justify-center animate-swipe-right">
          <ChevronRight className="w-5 h-5 text-solne-gold/80" />
        </div>
      </div>
    </div>
  );
};
