import React from 'react';
import { motion } from 'framer-motion';

const Cube = ({ index, title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 80, y: -20, rotateY: -45 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ perspective: 1000 }}
      className="flex flex-col items-center justify-center p-6 bg-white/30 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden w-[250px] h-[250px] shrink-0 snap-center"
    >
      <span className="text-black font-extrabold text-sm uppercase tracking-wider mb-3 relative z-10">Step {index + 1}</span>
      <h3 className="text-xl font-extrabold text-black leading-tight text-center mb-3 relative z-10">{title}</h3>
      <p className="text-sm font-semibold text-black/70 text-center leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
};

export default Cube;
