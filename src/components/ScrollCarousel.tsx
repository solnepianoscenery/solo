import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const ScrollCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    // Initial check (give browser a moment to render children)
    const timeout = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

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
        className={`md:hidden absolute left-2 top-[30%] -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-[0_4px_12px_rgba(32,45,70,0.1)] pointer-events-none transition-all duration-300 z-10 ${canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
      >
        <ChevronLeft className="w-5 h-5 text-solne-gold animate-[pulse_1.5s_ease-in-out_Infinity] -ml-0.5" />
      </div>

      {/* Right indicator */}
      <div 
        className={`md:hidden absolute right-2 top-[30%] -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-[0_4px_12px_rgba(32,45,70,0.1)] pointer-events-none transition-all duration-300 z-10 ${canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
      >
        <ChevronRight className="w-5 h-5 text-solne-gold animate-[pulse_1.5s_ease-in-out_Infinity] -mr-0.5" />
      </div>
    </div>
  );
};
