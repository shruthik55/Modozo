import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   CSS-BASED FLOW ANIMATION
   Draws continuously looping yellow particles
   along a straight path with strictly sequenced delays
───────────────────────────────────────────── */
const FlowCanvas = () => {
  const DOT_COUNT = 15;
  const DURATION = 6; // seconds

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <style>
        {`
          @keyframes flowLinear {
            0% { left: 14%; opacity: 0; }
            1.5% { opacity: 1; }
            98.5% { opacity: 1; }
            100% { left: 86%; opacity: 0; }
          }
        `}
      </style>

      {/* Guide line (left node → right node) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#FFD700]/12"
        style={{ left: '14%', right: '14%' }}
      />

      {/* Synchronized dots strictly driven by staggered delay */}
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#FFD700]"
          style={{
            animation: `flowLinear ${DURATION}s linear infinite`,
            animationDelay: `-${(DURATION / DOT_COUNT) * i}s`
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   NODE CARDS
───────────────────────────────────────────── */
const NodeCard = ({ label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: 'easeInOut' }}
    className="relative z-10 px-8 py-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-lg font-medium text-center shadow-lg min-w-[130px]"
  >
    {label}
  </motion.div>
);

/* ─────────────────────────────────────────────
   CENTER PLATFORM CARD
───────────────────────────────────────────── */
const PlatformCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.75 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    className="relative z-10 flex flex-col items-center"
  >
    {/* Card body */}
    <motion.div
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      className="px-9 py-6 bg-[#FFD700] rounded-2xl text-black font-semibold text-xl min-w-[170px] text-center"
    >
      Modozo Platform
    </motion.div>

    {/* Label beneath */}
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.9 }}
      className="mt-3 text-xs font-medium text-[#FFD700]/70 tracking-widest uppercase"
    >
      Central Hub
    </motion.span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SECTION EXPORT
───────────────────────────────────────────── */
const SolutionSection = () => {
  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 bg-brand-navy text-white rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden -mt-4 md:-mt-8 z-10 w-full max-w-[100vw]">

      {/* Soft radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[#FFD700] rounded-full blur-[180px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 font-serif leading-tight px-2"
        >
          What If Your Entire Workflow<br className="hidden md:block" /> Worked As One?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
          className="text-white/50 text-base md:text-lg font-light max-w-sm md:max-w-lg mx-auto mb-12 md:mb-20"
        >
          One platform. Every step connected. Nothing lost.
        </motion.p>

        {/* Flow row */}
        <div className="relative hidden md:flex flex-row items-center justify-center gap-0">

          {/* Canvas — spans the full row */}
          <div className="absolute inset-0 hidden md:block" style={{ zIndex: 1 }}>
            <FlowCanvas />
          </div>

          {/* Design node */}
          <NodeCard label="Design" delay={0} />

          {/* Spacer that lets canvas flow through */}
          <div className="hidden md:block flex-1" style={{ minWidth: 60 }} />

          {/* Modozo center */}
          <PlatformCard />

          {/* Spacer */}
          <div className="hidden md:block flex-1" style={{ minWidth: 60 }} />

          {/* Production node */}
          <NodeCard label="Production" delay={0.15} />
        </div>

        {/* Mobile fallback: simple dashed line */}
        <div className="flex md:hidden flex-col items-center gap-2 mt-6">
          {['Design', 'Modozo Platform', 'Production'].map((label, i) => (
            <React.Fragment key={label}>
              <div
                className={`px-8 py-4 rounded-2xl text-base font-medium ${
                  i === 1
                    ? 'bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                {label}
              </div>
              {i < 2 && (
                <motion.div
                  className="w-px h-8 bg-[#FFD700]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;
