import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Beam {
  id: number;
  x: number;
  angle: number;
  width: number;
  duration: number;
  delay: number;
  opacity: number;
}

const Nemophila = () => {
  const [beams, setBeams] = useState<Beam[]>([]);

  useEffect(() => {
    // Detect mobile to limit heavy layers
    const isMobile = window.innerWidth < 768;
    const beamCount = isMobile ? 3 : 5;

    // Generate soft sunset light beams
    const newBeams = Array.from({ length: beamCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 110 - 5, // starting x position (%)
      angle: Math.random() * 20 - 10, // mild tilt angle
      width: Math.random() * 12 + 6, // width in vw
      duration: Math.random() * 6 + 6, // pulse duration
      delay: Math.random() * -5, // negative delay so they start immediately
      opacity: Math.random() * 0.12 + 0.04,
    }));
    setBeams(newBeams);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Sunset glow effect */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-orange-300/15 via-yellow-105/5 to-transparent blur-3xl mix-blend-overlay"></div>
      
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-[-20%] h-[140%] transform-origin-top mix-blend-screen"
          style={{
            left: `${beam.x}%`,
            width: `${beam.width}vw`,
            background: 'linear-gradient(to bottom, rgba(255, 210, 130, 0.4), rgba(255, 180, 80, 0.1) 40%, transparent 100%)',
            rotate: `${beam.angle}deg`,
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: [beam.opacity * 0.5, beam.opacity, beam.opacity * 0.5],
            y: [0, 4, 0]
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
