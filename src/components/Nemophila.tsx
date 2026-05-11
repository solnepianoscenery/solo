import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const Nemophila = () => {
  const [beams, setBeams] = useState<Array<{ id: number; x: number; angle: number; width: number; duration: number; delay: number; opacity: number }>>([]);

  useEffect(() => {
    // Generate soft sunset light beams
    const newBeams = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 120 - 10, // starting x position (%)
      angle: Math.random() * 30 - 15, // tilt angle
      width: Math.random() * 15 + 5, // width in vw
      duration: Math.random() * 8 + 5, // pulse duration
      delay: Math.random() * 5, // animation delay
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setBeams(newBeams);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Sunset glow effect */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-orange-300/20 via-yellow-100/10 to-transparent blur-3xl mix-blend-overlay"></div>
      
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-[-20%] h-[140%] transform-origin-top mix-blend-screen"
          style={{
            left: `${beam.x}%`,
            width: `${beam.width}vw`,
            background: 'linear-gradient(to bottom, rgba(255, 220, 150, 1), rgba(255, 200, 100, 0.4) 40%, transparent 100%)',
            rotate: `${beam.angle}deg`,
            filter: 'blur(30px)',
          }}
          animate={{
            opacity: [beam.opacity * 0.5, beam.opacity, beam.opacity * 0.5],
            transform: [`translateY(0%) rotate(${beam.angle}deg)`, `translateY(2%) rotate(${beam.angle + 2}deg)`, `translateY(0%) rotate(${beam.angle}deg)`]
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: beam.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Nemophila;
