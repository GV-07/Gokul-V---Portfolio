import React from 'react';
import { motion, useScroll } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 z-[100] origin-left shadow-[0_0_10px_rgba(99,102,241,0.9)] pointer-events-none transform-gpu will-change-transform"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

