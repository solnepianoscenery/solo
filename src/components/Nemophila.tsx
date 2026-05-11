import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const Nemophila = () => {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number; rotation: number; opacity: number }>>([]);

  useEffect(() => {
    // Generate random Nemophila petals (blue flowers)
    const newPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // starting x position (%)
      delay: Math.random() * 15, // animation delay
      duration: Math.random() * 12 + 12, // fall duration (12-24s)
      size: Math.random() * 8 + 10, // size (10-18px)
      rotation: Math.random() * 360, // initial rotation
      opacity: Math.random() * 0.4 + 0.3, // opacity (0.3-0.7)
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-5%]"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size,
            backgroundColor: '#4A90E2', // Nemophila Blue
            borderRadius: '50% 50% 50% 50%',
            opacity: petal.opacity,
            boxShadow: '0 0 15px rgba(74, 144, 226, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            y: ['-10vh', '150vh'],
            x: [`${petal.x}%`, `${petal.x + (Math.random() * 15 - 7.5)}%`],
            rotate: [petal.rotation, petal.rotation + 720],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Nemophila;
