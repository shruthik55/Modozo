import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
   ANIMATIONS (KEPT FROM ORIGINAL)
══════════════════════════════════════════════ */

const TechpackAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center w-full mt-2 gap-4">
    <div className="relative">
      <motion.div
        animate={active ? { y: 0, opacity: 1 } : { y: 15, opacity: 0.3 }}
        className="relative z-10"
      >
        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
      </motion.div>
    </div>
    <div className="w-40 h-1.5 bg-black/5 rounded-full overflow-hidden border border-black/5">
      <motion.div
        className="h-full"
        style={{ backgroundColor: accentColor }}
        animate={active ? { width: "100%" } : { width: "20%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
    <div className="flex flex-col gap-2 w-full px-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-1.5 bg-black/5 rounded-full w-full relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-40"
            style={{ backgroundColor: accentColor }}
            animate={active ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        </div>
      ))}
    </div>
  </div>
);

const ReviewAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center gap-4 mt-2 w-full">
    <div className="flex -space-x-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.8 }}
          style={{ borderColor: accentColor }}
          className="w-10 h-10 rounded-full bg-black/5 border-2 flex items-center justify-center overflow-hidden"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,0,0,0.25)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </motion.div>
      ))}
    </div>
    <div className="flex flex-col gap-2 w-full px-6">
      {[0, 1].map(i => (
        <div key={i} className="flex items-center justify-between bg-black/5 p-1.5 rounded-lg border border-black/5">
          <div className="h-1 bg-black/10 rounded-full w-20" />
          <motion.div animate={active ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </div>
      ))}
    </div>
    <motion.div
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 5 }}
      style={{ backgroundColor: accentColor, color: "white" }}
      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-sm"
    >
      Approved
    </motion.div>
  </div>
);

const SourcingAnim = ({ active, accentColor }) => (
  <div className="relative w-full h-24 mt-2 flex items-center justify-center px-4">
    <div className="w-full h-px bg-black/5 absolute top-1/2 left-0" />
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center border border-black/5" style={{ borderColor: `${accentColor}44` }}>
        <svg viewBox="0 0 24 24" width="16" height="16" stroke={accentColor} strokeWidth="2" fill="none" className="opacity-80">
          <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 7l2-4h12l2 4" />
        </svg>
      </div>
    </div>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center border border-black/5" style={{ borderColor: `${accentColor}44` }}>
        <svg viewBox="0 0 24 24" width="16" height="16" stroke={accentColor} strokeWidth="2" fill="none" className="opacity-80">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
        </svg>
      </div>
    </div>
    <motion.div
      animate={active ? { x: [ -60, 60 ], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ backgroundColor: accentColor }}
      className="z-20 w-8 h-8 rounded-lg shadow-lg flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="white" strokeWidth="3" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    </motion.div>
  </div>
);

const VendorAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center w-full mt-4 gap-6">
    <div className="flex items-center gap-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 flex flex-col gap-1.5 overflow-hidden">
        <motion.div animate={active ? { x: [-20, 20] } : {}} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="flex gap-4">
          {[1, 2].map(i => <svg key={i} viewBox="0 0 24 24" width="10" height="10" stroke={accentColor} fill="none" className="opacity-70"><polyline points="13 17 18 12 13 7" /><line x1="6" y1="12" x2="18" y2="12" /></svg>)}
        </motion.div>
      </div>
      <div className="w-10 h-10 rounded-full bg-black/5 border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${accentColor}44` }}>
         <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={accentColor} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z" /></svg>
      </div>
      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center border-2" style={{ borderColor: accentColor }}>
         <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={accentColor} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
      </div>
    </div>
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <motion.div key={i} animate={active ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.2 }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ backgroundColor: accentColor }} className="w-1.5 h-1.5 rounded-full" />
      ))}
    </div>
  </div>
);

const SampleAnim = ({ active, accentColor }) => (
  <div className="w-full mt-6 flex flex-col gap-5 px-4">
    <div className="relative h-1 bg-black/10 rounded-full">
      <div className="absolute inset-0 flex justify-between items-center -top-2">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} animate={active && (i === 0 || i === 1) ? { backgroundColor: accentColor, scale: 1.1 } : { backgroundColor: "rgba(0,0,0,0.1)", scale: 1 }} className="w-4 h-4 rounded-full border-2" />
        ))}
      </div>
      <motion.div animate={active ? { width: "50%" } : { width: "10%" }} style={{ backgroundColor: accentColor }} className="absolute h-full rounded-full" />
    </div>
    <div className="flex items-center justify-center gap-3 bg-black/5 py-2 rounded-xl border border-black/5">
       <motion.div animate={active ? { x: [-2, 2, -2] } : {}} transition={{ duration: 1, repeat: Infinity }}>
         <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="black" strokeWidth="1.5"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
       </motion.div>
       <span className="text-[9px] font-extrabold">DHL PKG #4829</span>
    </div>
  </div>
);

const ProductionAnim = ({ active, accentColor }) => {
  const [percent, setPercent] = useState(65);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setPercent(p => (p < 95 ? p + 1 : 65)), 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="w-full mt-4 flex flex-col gap-4 px-6">
      <div className="flex items-center justify-between">
        <motion.div animate={active ? { rotate: 360 } : {}} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black/10 rounded-full flex items-center justify-center" style={{ borderTopColor: accentColor }} />
        <span className="px-2 py-0.5 bg-black rounded text-[7px] font-bold" style={{ color: accentColor }}>LIVE</span>
      </div>
      <div className="flex flex-col gap-2">
        {[ { label: "Fabrication", p: 92 }, { label: "Construction", p: percent } ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-[7px] font-bold opacity-60"><span>{item.label}</span><span>{item.p}%</span></div>
            <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
               <motion.div animate={active ? { width: `${item.p}%` } : { width: "10%" }} style={{ backgroundColor: accentColor, opacity: 0.7 }} className="h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const STEP_ANIMATIONS = [ TechpackAnim, ReviewAnim, SourcingAnim, VendorAnim, SampleAnim, ProductionAnim ];

/* ═════════════════════════════════════════════
   WORKFLOW CARD (REPLACING CUBE FACE)
═════════════════════════════════════════════ */

const WorkflowCard = ({ index, x, rotation, scale, isActive }) => {
  const content = workflowSteps[index];
  const accentColor = workflowColors[index];
  const Anim = STEP_ANIMATIONS[index];

  return (
    <motion.div
      style={{ x, scale, zIndex: 50 - index }}
      className="absolute flex flex-col items-center justify-start py-8 px-6 rounded-[2.5rem] bg-white border-2 border-gray-100 shadow-2xl w-[220px] md:w-[260px] h-[400px] md:h-[460px] shrink-0"
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <span className="font-extrabold text-[10px] uppercase tracking-[0.2em] mb-4 block text-gray-400">
          Step {index + 1}
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-brand-navy leading-tight mb-3 text-center tracking-tight">
          {content.title}
        </h3>
        <p className="text-gray-500 font-medium text-[11px] leading-relaxed text-center px-2">
          {content.desc}
        </p>

        <div className="w-full flex-1 flex items-center justify-center min-h-[160px] mt-4">
          <Anim active={isActive} accentColor={accentColor} />
        </div>
      </div>
      
      {/* Visual Indicator of the bottom accent */}
      <div 
        className="absolute bottom-0 inset-x-0 h-1"
        style={{ backgroundColor: accentColor }}
      />
    </motion.div>
  );
};

/* ═════════════════════════════════════════════
   MAIN SECTION
═════════════════════════════════════════════ */

const WorkflowSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Use smooth spring for the expansion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom cubic-bezier(0.22, 1, 0.36, 1) easing function for smooth dispersion
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  // Dispersion effect mapped with custom easing
  const dispersion = useTransform(smoothProgress, [0.1, 0.75], [0, 1], {
    ease: easeOutQuart,
    clamp: true
  });

  // Responsive values for layout calculation
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-brand-bg-blue">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-start overflow-hidden px-4 md:px-6 pt-20 md:pt-24">
        
        {/* Header */}
        <div className="text-center z-50 w-full px-4 mb-10 md:mb-12 relative">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-3 md:mb-4 tracking-tighter font-serif px-2"
          >
            A Clear Flow From Design to Production
          </motion.h2>
          <p className="text-gray-500 text-sm md:text-lg font-medium max-w-2xl mx-auto">
            Experience a synchronized workflow where every transition is seamless and every step is visible.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative w-full h-[500px] flex items-center justify-center mt-2 md:mt-4">
          {workflowSteps.map((_, i) => {
            // Cards are approx 220-260px wide. We ensure they fit in the viewport.
            // Calculate layout based on window width and specified gaps
            const baseCardWidth = windowWidth < 768 ? 200 : 260;
            const targetGap = windowWidth < 768 ? 16 : 24;
            
            // maxStepSize ensures they fit within screen (40px padding)
            const maxTotalWidth = windowWidth - 40;
            const maxStepSize = maxTotalWidth / 6;
            
            // finalStepSize is the distance between card centers
            const finalStepSize = Math.min(baseCardWidth + targetGap, maxStepSize);
            
            // If the cards are too wide to fit with the gap, we must scale them down
            const availableWidthPerCard = finalStepSize - targetGap;
            const sizeScaleFactor = Math.min(1, availableWidthPerCard / baseCardWidth);
            
            const targetX = (i - 2.5) * finalStepSize;
            
            // X position transformation (uses translateX via framer-motion 'x' prop)
            const x = useTransform(dispersion, [0, 1], [0, targetX]);
            
            // No rotation - cards remain flat as per user request
            const rotation = 0;
            
            // Scale enhancement: blend the spread scale with the size constraint scale
            const spreadScale = useTransform(dispersion, [0, 1], [0.85, 1]);
            const scale = useTransform(spreadScale, (s) => s * sizeScaleFactor);
            
            // Activate cards once they are mostly spread
            const isActive = true;

            return (
              <WorkflowCard 
                key={i} 
                index={i} 
                x={x} 
                rotation={rotation} 
                scale={scale}
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
