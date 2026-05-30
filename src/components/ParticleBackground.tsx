import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  backgroundColor: string;
  boxShadow: string;
  xKeyframes: number[];
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Detect mobile to lower particle density
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 12 : 28;

    // Generate stable particles
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const isOrange = Math.random() > 0.5;
      const color = isOrange ? '#FDBA74' : '#93C5FD';
      const shadowColor = isOrange ? 'rgba(253, 186, 116, 0.4)' : 'rgba(147, 197, 253, 0.4)';
      const drift = Math.random() * 40 - 20;

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * -10, // negative delay so they start pre-animated
        backgroundColor: color,
        boxShadow: `0 0 ${size * 1.5}px ${shadowColor}`,
        xKeyframes: [0, drift, 0],
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-solne-light"
      style={{
        background: `radial-gradient(circle at 85% 10%, rgba(253, 186, 116, 0.12) 0%, transparent 60%),
                     radial-gradient(circle at 10% 90%, rgba(147, 197, 253, 0.18) 0%, transparent 60%),
                     radial-gradient(circle at 30% 40%, rgba(199, 210, 254, 0.12) 0%, transparent 60%),
                     radial-gradient(circle at 80% 85%, rgba(244, 203, 213, 0.12) 0%, transparent 50%),
                     #FAF9F6`,
      }}
    >
      {/* Particles / Stars */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.backgroundColor,
            boxShadow: p.boxShadow,
          }}
          animate={{
            y: [0, -120, 0],
            x: p.xKeyframes,
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
