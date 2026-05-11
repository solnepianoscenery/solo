import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles for the starry/dust effect
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-solne-light">
      {/* Subtle light gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100 opacity-40 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-solne-gold opacity-[0.1] blur-[150px]"></div>
      <div className="absolute top-[30%] left-[50%] w-[50vw] h-[50vw] rounded-full bg-indigo-50 opacity-30 blur-[130px]"></div>
      
      {/* Particles / Stars */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-200 opacity-40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 2}px rgba(147, 197, 253, 0.5)`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.1, 0.6, 0.1],
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
