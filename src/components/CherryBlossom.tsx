import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CherryBlossom = () => {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number; rotation: number }>>([]);

  useEffect(() => {
    // Generate random cherry blossom petals
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // starting x position (%)
      delay: Math.random() * 10, // animation delay
      duration: Math.random() * 10 + 10, // fall duration (10-20s)
      size: Math.random() * 10 + 8, // size (8-18px)
      rotation: Math.random() * 360, // initial rotation
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
            height: petal.size * 1.2,
            backgroundColor: '#ffd1dc',
            borderRadius: '50% 0 50% 50%',
            opacity: 0.6,
            boxShadow: '0 0 10px rgba(255, 209, 220, 0.5)',
          }}
          animate={{
            y: ['-10vh', '150vh'],
            x: [`${petal.x}%`, `${petal.x + (Math.random() * 20 - 10)}%`],
            rotate: [petal.rotation, petal.rotation + 360],
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

export default CherryBlossom;
