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

const workflowColors = [
  "#4DA3FF", // Step 1: Techpack (Blue)
  "#4CAF50", // Step 2: Review (Green)
  "#9C6BFF", // Step 3: Sourcing (Purple)
  "#FF8A65", // Step 4: Vendor (Coral)
  "#FFD54F", // Step 5: Sample (Yellow)
  "#26C6DA", // Step 6: Production (Teal)
];

/* ══════════════════════════════════════════════
   STEP 1 — Techpack Upload
   Document with lines appearing like writing
══════════════════════════════════════════════ */
const TechpackAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center w-full mt-6 gap-4">
    <div className="relative">
      {/* File Icon */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
      </motion.div>
      <motion.div 
        className="absolute -inset-4 rounded-full blur-xl opacity-20"
        style={{ backgroundColor: accentColor }}
        animate={active ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
    
    {/* Progress bar */}
    <div className="w-48 h-1.5 bg-black/5 rounded-full overflow-hidden border border-black/5">
      <motion.div
        className="h-full"
        style={{ backgroundColor: accentColor }}
        initial={{ width: 0 }}
        animate={active ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>

    {/* Structured layout list appearance */}
    <div className="flex flex-col gap-2 w-full px-8">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 bg-black/10 rounded-full w-full relative overflow-hidden"
          initial={{ opacity: 0, x: -5 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
          transition={{ delay: 1.2 + i * 0.15 }}
        >
          <motion.div 
            className="absolute inset-0 opacity-40"
            style={{ backgroundColor: accentColor }}
            animate={active ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 + i * 0.1 }}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 2 — Review & Approval
   Avatars + checkmark bounce + glow
══════════════════════════════════════════════ */
const ReviewAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center gap-5 mt-6 w-full">
    <div className="flex -space-x-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: i * 0.1 }}
          style={{ borderColor: accentColor }}
          className="w-10 h-10 rounded-full bg-black/5 border-2 flex items-center justify-center overflow-hidden"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,0,0,0.25)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-col gap-3 w-full px-6">
      {[0, 1].map(i => (
        <div key={i} className="flex items-center justify-between bg-black/5 p-2 rounded-lg border border-black/5">
          <div className="h-1.5 bg-black/10 rounded-full w-24" />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.8 + i * 0.4, type: "spring", stiffness: 200 }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: 1.8 }}
      style={{ backgroundColor: accentColor, color: "white" }}
      className="px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md"
    >
      Approved
    </motion.div>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 3 — Sourcing Handoff
   Package moving left → right with arrow
══════════════════════════════════════════════ */
const SourcingAnim = ({ active, accentColor }) => (
  <div className="relative w-full h-24 mt-6 flex items-center justify-center px-4">
    <div className="w-full h-px bg-black/5 absolute top-1/2 left-0" />
    
    {/* Left Node */}
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
      <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center border border-black/5" style={{ borderColor: `${accentColor}44` }}>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke={accentColor} strokeWidth="2" fill="none" className="opacity-80">
          <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 7l2-4h12l2 4" />
        </svg>
      </div>
      <span className="text-[8px] font-bold opacity-30">BRAND</span>
    </div>

    {/* Right Node */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
      <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center border border-black/5" style={{ borderColor: `${accentColor}44` }}>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke={accentColor} strokeWidth="2" fill="none" className="opacity-80">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
        </svg>
      </div>
      <span className="text-[8px] font-bold opacity-30">SOURCING</span>
    </div>

    {/* Moving Packet */}
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={active ? { x: [ -80, 80, -80 ], opacity: [0, 1, 1, 0, 0] } : { x: -80, opacity: 0 }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ backgroundColor: accentColor }}
      className="z-20 w-8 h-8 rounded-lg shadow-lg flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="white" strokeWidth="3" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    </motion.div>

    {/* Glow pulse on transfer */}
    <motion.div 
      className="absolute blur-xl rounded-full w-20 h-20 opacity-15"
      style={{ backgroundColor: accentColor }}
      animate={active ? { x: [ -80, 80, -80 ] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/* ══════════════════════════════════════════════
   STEP 4 — Vendor Coordination
   Two nodes + line drawing + travelling pulse
══════════════════════════════════════════════ */
const VendorAnim = ({ active, accentColor }) => {
  return (
    <div className="flex flex-col items-center w-full mt-6 gap-6">
      <div className="flex items-center gap-10 relative">
        {/* Connection Arrows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 flex flex-col gap-1.5 overflow-hidden">
          <motion.div
            animate={active ? { x: [-20, 20] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="flex gap-4"
          >
            {[1, 2, 3].map(i => (
              <svg key={i} viewBox="0 0 24 24" width="12" height="12" stroke={accentColor} fill="none" className="opacity-70">
                <polyline points="13 17 18 12 13 7" /><line x1="6" y1="12" x2="18" y2="12" />
              </svg>
            ))}
          </motion.div>
          <motion.div
            animate={active ? { x: [20, -20] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="flex gap-4"
          >
            {[1, 2, 3].map(i => (
              <svg key={i} viewBox="0 0 24 24" width="12" height="12" stroke={accentColor} fill="none" className="opacity-70 rotate-180">
                <polyline points="13 17 18 12 13 7" /><line x1="6" y1="12" x2="18" y2="12" />
              </svg>
            ))}
          </motion.div>
        </div>

        {/* Nodes */}
        <div className="w-12 h-12 rounded-full bg-black/5 border-2 border-dashed flex items-center justify-center relative" style={{ borderColor: `${accentColor}44` }}>
           <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={accentColor} strokeWidth="2" className="opacity-70">
             <path d="M21 15a2 2 0 0 1-2 2H7l4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z" />
           </svg>
        </div>
        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center border-2" style={{ borderColor: accentColor }}>
           <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={accentColor} strokeWidth="2">
             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
           </svg>
        </div>
      </div>
      
      {/* Message pulse */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={active ? { opacity: [0.2, 1, 0.2] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            style={{ backgroundColor: accentColor }}
            className="w-1.5 h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   STEP 5 — Sample Tracking
   Progress bar + moving package on top
══════════════════════════════════════════════ */
const SampleAnim = ({ active, accentColor }) => (
  <div className="w-full mt-8 flex flex-col gap-6 px-4">
    <div className="relative h-1 bg-black/10 rounded-full">
      {/* Progress handle points */}
      <div className="absolute inset-0 flex justify-between items-center -top-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <motion.div 
              animate={active ? { backgroundColor: i === 0 || i === 1 ? accentColor : "rgba(0,0,0,0.1)" } : {}}
              className="w-5 h-5 rounded-full bg-black/10 border-4 z-10" 
              style={{ borderColor: active && (i === 0 || i === 1) ? accentColor : "transparent" }}
            />
            <span className="text-[7px] font-bold opacity-40 uppercase tracking-tighter">
              {i === 0 ? "Request" : i === 1 ? "Transit" : "Arrived"}
            </span>
          </div>
        ))}
      </div>
      
      {/* Fill Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={active ? { width: "50%" } : { width: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundColor: accentColor }}
        className="absolute h-full rounded-full"
      />
    </div>

    <div className="flex items-center justify-center gap-3 bg-black/5 py-2 rounded-xl border border-black/5">
       <motion.div
         animate={active ? { x: [-2, 2, -2] } : {}}
         transition={{ duration: 1, repeat: Infinity }}
       >
         <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="black" strokeWidth="1.5">
           <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
           <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
         </svg>
       </motion.div>
       <div className="flex flex-col">
         <span className="text-[10px] font-extrabold leading-none">DHL PKG #4829</span>
         <span className="text-[8px] font-bold opacity-40">In Route to HQ</span>
       </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   STEP 6 — Production Tracking
   Spinning gear + looping flow line
══════════════════════════════════════════════ */
const ProductionAnim = ({ active, accentColor }) => {
  const [percent, setPercent] = useState(65);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPercent(p => (p < 99 ? p + 1 : 65));
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="w-full mt-6 flex flex-col gap-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <motion.div 
             animate={active ? { rotate: 360 } : {}}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="w-6 h-6 border-2 border-black/10 rounded-full flex items-center justify-center"
             style={{ borderTopColor: accentColor }}
           >
             <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }} />
           </motion.div>
           <span className="text-[10px] font-extrabold uppercase">Live Production</span>
        </div>
        <div className="px-2 py-0.5 bg-black rounded text-[8px] font-bold animate-pulse" style={{ color: accentColor }}>
          STAGE 4
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {[ 
          { label: "Fabrication", p: 92 },
          { label: "Construction", p: percent },
          { label: "Quality Control", p: 0 }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-[8px] font-bold opacity-60">
              <span>{item.label}</span>
              <span>{item.p}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
               <motion.div
                 initial={{ width: 0 }}
                 animate={active ? { width: `${item.p}%` } : { width: 0 }}
                 transition={{ duration: 1, delay: i * 0.1 }}
                 style={{ backgroundColor: accentColor, opacity: 0.7 }}
                 className="h-full"
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const accentColor = workflowColors[stepIndex];
  const Anim = STEP_ANIMATIONS[stepIndex];

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-start py-10 px-8 rounded-2xl [backface-visibility:hidden] overflow-hidden"
      style={{
        transform: `rotateY(${rotateY}deg)`,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
        borderTop: `3px solid ${accentColor}`,
        borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
        borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        opacity: 1,
      }}
    >
      {/* Subtle Bottom Accent Glow */}
      <div 
        className="absolute inset-x-0 bottom-0 h-32 z-0 opacity-10 blur-3xl pointer-events-none"
        style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }}
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        <span className="font-extrabold text-[10px] uppercase tracking-[0.2em] mb-3 block text-gray-600">
          Step {stepIndex + 1}
        </span>
        <h3 className="text-2xl font-extrabold text-black leading-tight mb-2 text-center tracking-tight">
          {content.title}
        </h3>
        <p className="text-gray-600 font-semibold text-[11px] leading-relaxed text-center max-w-[220px]">
          {content.desc}
        </p>

        {/* Icon-driven step animation */}
        <div className="w-full flex-1 flex items-center justify-center min-h-[140px]">
          <Anim active={isActive} accentColor={accentColor} />
        </div>
      </div>
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

          {/* Progress bar dots */}
          <div className="mt-6 md:mt-8 mx-auto w-full max-w-3xl relative h-1.5 bg-gray-200/50 rounded-full flex items-center">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const isActive  = step >= i;
              const isCurrent = step === i;
              const dotColor = workflowColors[i];
              return (
                <div
                  key={i}
                  className={`absolute h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    isActive ? '' : 'bg-gray-300'
                  } ${isCurrent ? 'scale-[1.3] ring-4 z-10' : 'scale-100 z-0'}`}
                  style={{ 
                    left: `${i * 20}%`, 
                    transform: 'translateX(-50%)',
                    backgroundColor: isActive ? dotColor : '#D1D5DB',
                    boxShadow: isActive ? `0 0 10px ${dotColor}66` : 'none',
                    ringColor: isCurrent ? `${dotColor}33` : 'transparent'
                  }}
                />
              );
            })}
            <motion.div
              className="absolute top-1/2 -mt-[7px] h-[14px] w-[14px] rounded-full shadow-lg z-20"
              style={{ 
                left: dotX, 
                translateX: '-50%',
                backgroundColor: workflowColors[step]
              }}
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
