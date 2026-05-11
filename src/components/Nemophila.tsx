import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const Nemophila = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number; size: number; color: string }>>([]);

  useEffect(() => {
    // Generate sparkling lights to reflect sunset on Nemophila
    const newSparkles = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // starting x position (%)
      y: Math.random() * 100, // cover the entire screen
      delay: Math.random() * 5, // animation delay
      duration: Math.random() * 4 + 3, // twinkle duration (3-7s)
      size: Math.random() * 4 + 1, // size (1-5px)
      // Colors: Gold, Warm Orange, White/Sky shimmer
      color: Math.random() > 0.7 ? '#FFD700' : (Math.random() > 0.5 ? '#FFA500' : (Math.random() > 0.5 ? '#FFFFFF' : '#87CEEB')),
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Sunset glow effect along the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-400/10 via-yellow-200/5 to-transparent blur-3xl mix-blend-overlay"></div>
      
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.color}`,
          }}
          animate={{
            opacity: [0, Math.random() * 0.9 + 0.5, 0],
            scale: [0.3, 1.5, 0.3],
            y: [0, -40], // Slight upward drift
            x: [0, Math.random() * 20 - 10], // Slight side drift
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sparkle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Nemophila;
