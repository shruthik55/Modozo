import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'framer-motion';

const workflowSteps = [
  { title: "Techpack Upload",     desc: "Structured techpacks are uploaded to begin the workflow." },
  { title: "Review & Approval",   desc: "Brand teams align and approve swiftly." },
  { title: "Sourcing Handoff",    desc: "Sourcing managers coordinate seamlessly." },
  { title: "Vendor Coordination", desc: "Vendors get clear, actionable briefs." },
  { title: "Sample Tracking",     desc: "Samples are tracked without endless emails." },
  { title: "Production Tracking", desc: "Live production visibility from anywhere." },
];

/* ══════════════════════════════════════════════
   STEP 1 — Techpack Upload
   Document with lines appearing like writing
══════════════════════════════════════════════ */
const TechpackAnim = ({ active }) => (
  <div className="flex items-end gap-3 mt-4">
    {/* Pencil icon */}
    <motion.svg
      viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke="rgba(0,0,0,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      animate={active ? { rotate: [-8, 0, -8] } : { rotate: 0 }}
      transition={{ duration: 1.2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </motion.svg>

    {/* Document with stacking lines */}
    <div className="flex flex-col gap-1.5">
      {[90, 70, 85, 55].map((w, i) => (
        <motion.div
          key={i}
          className="h-[3px] bg-black/40 rounded-full origin-left"
          style={{ width: `${w * 0.9}px` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.45, delay: active ? i * 0.13 : 0, ease: 'easeOut' }}
        />
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 2 — Review & Approval
   Avatars + checkmark bounce + glow
══════════════════════════════════════════════ */
const ReviewAnim = ({ active }) => (
  <div className="flex items-center gap-3 mt-4">
    {/* Two user avatars */}
    {[0, 1].map(i => (
      <motion.div
        key={i}
        className="flex flex-col items-center gap-0.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: 0.4, delay: active ? i * 0.15 : 0 }}
      >
        <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
      </motion.div>
    ))}

    {/* Checkmark with glow */}
    <AnimatePresence>
      {active && (
        <motion.div
          key="check"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.35, 1], opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-9 h-9 rounded-full bg-black/15 flex items-center justify-center"
          style={{ boxShadow: active ? '0 0 14px rgba(0,0,0,0.2)' : 'none' }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="rgba(0,0,0,0.65)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.polyline
              points="4 12 9 17 20 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 3 — Sourcing Handoff
   Package moving left → right with arrow
══════════════════════════════════════════════ */
const SourcingAnim = ({ active }) => (
  <div className="relative w-48 h-10 mt-4 overflow-hidden flex items-center">
    {/* Track line */}
    <div className="absolute inset-y-1/2 w-full h-px bg-black/20" />

    {/* Arrowhead at right */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2"
      style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid rgba(0,0,0,0.35)' }}
    />

    {/* Moving package icon */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2"
      animate={active ? { x: [-10, 148] } : { x: -10 }}
      transition={{ duration: 1.1, ease: 'easeInOut', repeat: active ? Infinity : 0, repeatDelay: 0.5 }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="rgba(0,0,0,0.18)" stroke="rgba(0,0,0,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    </motion.div>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 4 — Vendor Coordination
   Two nodes + line drawing + travelling pulse
══════════════════════════════════════════════ */
const VendorAnim = ({ active }) => {
  return (
    <div className="flex items-center gap-2 mt-4 w-48">
      {/* Left node */}
      <motion.div
        className="w-4 h-4 rounded-full bg-black/40 shrink-0"
        animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Line + pulse container */}
      <div className="relative flex-1 h-1 bg-black/10 rounded-full overflow-visible">
        {/* Line fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-black/35 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: active ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* Travelling pulse dot */}
        {active && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-black/55"
            style={{ boxShadow: '0 0 6px rgba(0,0,0,0.35)' }}
            animate={{ left: ['-4%', '104%'] }}
            transition={{ duration: 1, ease: 'linear', repeat: Infinity, delay: 0.65 }}
          />
        )}
      </div>

      {/* Right node */}
      <motion.div
        className="w-4 h-4 rounded-full bg-black/40 shrink-0"
        animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: active ? Infinity : 0, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  );
};

/* ══════════════════════════════════════════════
   STEP 5 — Sample Tracking
   Progress bar + moving package on top
══════════════════════════════════════════════ */
const SampleAnim = ({ active }) => (
  <div className="w-48 mt-4">
    <div className="flex items-center justify-between text-[10px] text-black/50 mb-1.5">
      <span className="font-semibold">Sample Status</span>
      <motion.span
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        In Transit
      </motion.span>
    </div>

    {/* Progress track */}
    <div className="relative w-full h-3 bg-black/10 rounded-full overflow-visible">
      {/* Fill bar */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-black/35 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: active ? '72%' : '0%' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />

      {/* Package icon riding the bar */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        animate={{ left: active ? '72%' : '0%' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,0.5)" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        </svg>
      </motion.div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 6 — Production Tracking
   Spinning gear + looping flow line
══════════════════════════════════════════════ */
const ProductionAnim = ({ active }) => (
  <div className="flex items-center gap-3 mt-4">
    {/* Spinning gear */}
    <motion.svg
      viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke="rgba(0,0,0,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      animate={active ? { rotate: 360 } : { rotate: 0 }}
      transition={{ duration: 3, repeat: active ? Infinity : 0, ease: 'linear' }}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </motion.svg>

    {/* Looping conveyor flow bar */}
    <div className="relative flex-1 h-3 bg-black/10 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 h-full w-10 rounded-full bg-black/30"
        animate={active ? { x: ['-100%', '260%'] } : { x: '-100%' }}
        transition={{ duration: 1.1, ease: 'linear', repeat: active ? Infinity : 0 }}
      />
    </div>
  </div>
);

const STEP_ANIMATIONS = [
  TechpackAnim,
  ReviewAnim,
  SourcingAnim,
  VendorAnim,
  SampleAnim,
  ProductionAnim,
];

/* ══════════════════════════════════════════════
   CUBE FACE
══════════════════════════════════════════════ */
const CubeFace = ({ stepIndex, activeStep, rotateY }) => {
  const content = workflowSteps[stepIndex];
  const isActive = activeStep === stepIndex;
  const Anim = STEP_ANIMATIONS[stepIndex];

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl backdrop-blur-xl border border-white/50 [backface-visibility:hidden] overflow-hidden"
      style={{
        transform: `rotateY(${rotateY}deg)`,
        background: '#FFD700',
        boxShadow: isActive
          ? '0 20px 60px rgba(255,215,0,0.45)'
          : '0 15px 50px rgba(255,215,0,0.25)',
      }}
    >
      <span className="text-[#000000] font-extrabold text-sm uppercase tracking-widest mb-2 block opacity-80 border-b-2 border-black/20 pb-1">
        Step {stepIndex + 1}
      </span>
      <h3 className="text-2xl font-extrabold text-[#000000] leading-tight mb-1 text-center">
        {content.title}
      </h3>
      <p className="text-[#000000] font-semibold text-sm leading-relaxed opacity-70 text-center">
        {content.desc}
      </p>

      {/* Icon-driven step animation */}
      <Anim active={isActive} />
    </div>
  );
};

/* ══════════════════════════════════════════════
   SECTION
══════════════════════════════════════════════ */
const WorkflowSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let newStep = 0;
    if (latest >= 0.98)      newStep = 5;
    else if (latest >= 0.80) newStep = 4;
    else if (latest >= 0.60) newStep = 3;
    else if (latest >= 0.40) newStep = 2;
    else if (latest >= 0.20) newStep = 1;
    if (newStep !== step) setStep(newStep);
  });

  const [moveDist, setMoveDist] = useState('30vw');
  useEffect(() => {
    const checkDim = () => setMoveDist(window.innerWidth < 768 ? '5vw' : '35vw');
    checkDim();
    window.addEventListener('resize', checkDim);
    return () => window.removeEventListener('resize', checkDim);
  }, []);

  const cubeX = useTransform(scrollYProgress, [0, 1], [`-${moveDist}`, moveDist]);
  const dotX  = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const frontStepIndex = step % 2 === 0 ? step         : (step - 1 >= 0 ? step - 1 : 0);
  const backStepIndex  = step % 2 === 1 ? step         : (step + 1 <= 5 ? step + 1 : 5);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-brand-beige">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">

        {/* Header */}
        <div className="absolute top-16 md:top-24 text-center z-10 w-full px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2 md:mb-4 tracking-tight font-serif px-2">
            A Clear Flow From Design to Production
          </h2>
          <p className="text-gray-600 text-sm md:text-lg font-medium">Scroll to see the workflow in action.</p>

          {/* Progress bar */}
          <div className="mt-6 md:mt-8 mx-auto w-full max-w-3xl relative h-1.5 bg-gray-200 rounded-full shadow-inner flex items-center">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const isActive  = step >= i;
              const isCurrent = step === i;
              return (
                <div
                  key={i}
                  className={`absolute h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#FFD700] shadow-[0_0_5px_rgba(255,215,0,0.8)]' : 'bg-gray-300'
                  } ${isCurrent ? 'scale-[1.3] ring-4 ring-[#FFD700]/20 z-0' : 'scale-100 z-0'}`}
                  style={{ left: `${i * 20}%`, transform: 'translateX(-50%)' }}
                />
              );
            })}
            <motion.div
              className="absolute top-1/2 -mt-[7px] h-[14px] w-[14px] rounded-full bg-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.9)] z-10"
              style={{ left: dotX, translateX: '-50%' }}
            />
          </div>
        </div>

        {/* Moving + Flipping Cube */}
        <motion.div
          style={{ x: cubeX, perspective: 1200 }}
          className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] mt-24 md:mt-32 shrink-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotateY: step * 180 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full h-full relative"
          >
            <CubeFace stepIndex={frontStepIndex} activeStep={step} rotateY={0} />
            <CubeFace stepIndex={backStepIndex}  activeStep={step} rotateY={180} />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkflowSection;
