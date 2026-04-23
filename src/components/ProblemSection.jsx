import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BlinkingDelayTracker = () => {
  const [position, setPosition] = useState(0);
  
  // Trigger exactly every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev + 1) % 4);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  // Preset offsets drifting across the uppermost horizontal bounds
  const alignments = [
    { left: "15%", top: "15%" },
    { left: "42%", top: "12%", x: "-50%" },
    { right: "25%", top: "20%" },
    { left: "70%", top: "16%" },
  ];

  return (
    <motion.div
      key={position}
      initial={{ opacity: 0, y: 4 }}
      // Fade in (0.3s) + Stay visible (0.8s) + Fade out (0.3s) = 1.4s
      animate={{ opacity: [0, 0.8, 0.8, 0], y: [4, 0, 0, -4] }}
      transition={{ duration: 1.4, times: [0, 0.21, 0.78, 1], ease: "easeInOut" }}
      className="absolute pointer-events-none z-20 flex items-center gap-1.5"
      style={alignments[position]}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
      <span className="text-[10px] text-gray-500 font-medium tracking-wide">
        Silent delay detected
      </span>
    </motion.div>
  );
};

const HiddenFrictionVisual = ({ scrollYProgress }) => {
  // Gradually introduce subtle disruptions based on scroll depth.
  // 0.3 to 0.8 represents the transition window vertically passing center-screen.

  // Initial imports and helper components retained above
  // Visualizing the breaking point for the data flows
  // (We removed the scroll-bound useTransform hooks and tied opacity directly into the breakdown loop)

  const blocks = [
    { label: "Design", info: "Techpacks built in silos" },
    { label: "Review", info: "Comments lost in email" },
    { label: "Source", info: "Vendors lack context" },
    { label: "Produce", info: "Silent errors slip in" }
  ];
  
  // Periodically shifting autonomous box disruption (every 8s loop)
  // Dur = 8s total. times=[0, 0.625, 0.8125, 1]. 
  // Stable (0s to 5s), Breakdown (5s to 6.5s), Reset (6.5s to 8s).
  const periodicDrifts = [
    { y: [0, 0, -8, 0], x: [0, 0, 4, 0], r: [0, 0, -2, 0] },
    { y: [0, 0, 10, 0], x: [0, 0, -5, 0], r: [0, 0, 3, 0] },
    { y: [0, 0, -6, 0], x: [0, 0, -4, 0], r: [0, 0, -1, 0] },
    { y: [0, 0, 12, 0], x: [0, 0, 6, 0], r: [0, 0, 4, 0] }
  ];

  return (
    <div className="relative w-full h-[300px] sm:h-[350px] flex items-center justify-between py-6 bg-gray-50/50 rounded-3xl border border-gray-100 shadow-sm overflow-hidden px-4 sm:px-10">
      
      {/* LAGGING CONNECTIONS & FLOW INTERRUPTION with 8-second Fade Disruption */}
      <motion.div 
        animate={{ opacity: [1, 1, 0.1, 1] }} 
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.625, 0.8125, 1],
          delay: 1.2 
        }}
        className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none"
      >
        {/* Intended Perfect Pipeline (Static grey background axis) */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 z-0 rounded-full" />
        
        <svg className="w-full h-full relative" fill="none">
          {[0, 1].map((i) => (
            <motion.line
              key={i}
              x1="3%" y1="50%" x2="97%" y2="50%"
              strokeWidth="3"
              strokeLinecap="round"
              stroke="#111827"
              animate={{
                pathLength: [0, 0.25, 0.25, 0.25, 0.25, 0],
                // Brief pause in flow at 40% to communicate interruption
                pathOffset: [0, 0, 0.4, 0.4, 0.75, 1] 
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 2, // stagger pulses independently
                ease: "easeInOut",
                times: [0, 0.15, 0.45, 0.55, 0.85, 1]
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Structured Process Cards gradually breaking alignment cleanly */}
      <div className="flex justify-between items-center w-full z-10 relative">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            // MISALIGNMENT CORRECTION: Start offset, messy rotation, snap into perfection
            initial={{ opacity: 0, y: i % 2 === 0 ? 25 : -25, rotate: i % 2 === 0 ? -4 : 4 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              rotate: 0,
              // MICRO SHAKE EFFECT
              x: [0, -2, 2, -1, 1, 0] 
            }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{
              // DESYNC FLOW: staggered and uneven entrance (card 2 lags additionally)
              duration: 0.7,
              delay: i * 0.2 + (i === 1 ? 0.3 : 0), 
              ease: "easeOut",
              x: { delay: i * 0.2 + 0.7, duration: 0.4 } // Shake happens after snap
            }}
            className="flex-1 max-w-[70px] sm:max-w-[100px] flex group"
          >
            {/* The looping drifting node */}
            <motion.div
              animate={{
                y: periodicDrifts[i].y,
                x: periodicDrifts[i].x,
                rotate: periodicDrifts[i].r,
                borderColor: ["#e5e7eb", "#e5e7eb", "#fca5a5", "#e5e7eb"],
                boxShadow: [
                  "0px 4px 6px rgba(0,0,0,0.05)", 
                  "0px 4px 6px rgba(0,0,0,0.05)", 
                  "0px 8px 15px rgba(239,68,68,0.15)", 
                  "0px 4px 6px rgba(0,0,0,0.05)"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.625, 0.8125, 1],
                delay: 1.2 + (i * 0.1) // Start roughly when entrance shakes finish
              }}
              className="w-full aspect-[4/3] flex items-center justify-center bg-white rounded-lg border shadow-sm relative cursor-default transition-colors duration-300"
            >
              <span className="text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap">{block.label}</span>
              
              {/* HOVER INTERACTION: Expansion Info Box */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[130px] bg-[#111827] text-white text-[9px] sm:text-[10px] py-2 px-3 rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-50 text-center shadow-lg">
                <span className="leading-snug">{block.info}</span>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#111827]"></div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Dynamic System Observations mapping the delays natively */}
      <BlinkingDelayTracker />

    </div>
  );
};

const ProblemSection = () => {
  const containerRef = useRef(null);
  
  // Create a scroll-tied timeline matching component intersection with screen center
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 40%"]
  });

  const problems = [
    "Processes appear structured, but execution is fragmented",
    "Teams move forward — but not together",
    "Information exists — but not where it’s needed",
    "Delays accumulate silently over time"
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white rounded-t-[2rem] md:rounded-t-[3rem] shadow-sm py-16 md:py-24 px-4 sm:px-6 md:px-20 overflow-hidden w-full max-w-[100vw]"
    >

      {/* Subtle Tension Background Grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* LEFT SIDE: Subtle Disconnect Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          {/* STAGGERED TEXT ANIMATION */}
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-black relative z-10 font-serif leading-tight pr-4"
          >
            Everything Looks Fine Until It Doesn’t
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-base md:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 font-medium relative z-10"
          >
            The problem isn’t visible at first. It builds up across every step.
          </motion.p>

          <motion.ul 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
            }}
            className="flex flex-col gap-5 max-w-md mx-auto lg:mx-0 w-full relative z-10"
          >
            {problems.map((text, i) => (
              <motion.li 
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 10 } }
                }}
                className="flex items-start gap-4 text-left"
              >
                <div className="mt-[6px] flex-shrink-0 w-4 h-4 rounded-full border-2 border-red-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                </div>
                <span className="text-gray-700 font-medium text-base md:text-lg">{text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT SIDE: Subtly Breaking Scroll Interaction */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* The scroll-tied visual effect */}
            <HiddenFrictionVisual scrollYProgress={scrollYProgress} />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
