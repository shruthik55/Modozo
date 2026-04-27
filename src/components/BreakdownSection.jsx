import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   MICRO-ANIMATIONS for each detail box
───────────────────────────────────────────── */

// 1. Disconnected Tools — floating circular elements
const DisconnectedAnimation = () => {
  const nodes = [
    { 
      x: '10%', y: '15%', size: 30, dx: -4, dy: -5, delay: 0, 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-[#25D366]"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    },
    { 
      x: '65%', y: '5%', size: 34, dx: 5, dy: 4, delay: 0.3,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px] text-[#107c41]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    },
    { 
      x: '35%', y: '50%', size: 28, dx: 3, dy: -5, delay: 0.6,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-[#EA4335]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    },
    { 
      x: '75%', y: '55%', size: 32, dx: -6, dy: 3, delay: 0.9,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px] text-[#FFBA00]"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
    },
  ];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="relative w-full h-24 mt-4 overflow-visible"
    >
      {/* Soft yellow background glow */}
      <div className="absolute inset-0 bg-[#FFF6CC]/50 rounded-full blur-xl pointer-events-none" />

      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white border border-[#EAEAEA] shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center transform-gpu z-10"
          style={{ left: n.x, top: n.y, width: n.size, height: n.size }}
          animate={{ x: [0, n.dx, 0, -n.dx*0.6, 0], y: [0, n.dy, 0, -n.dy*0.6, 0] }}
          transition={{
            duration: 3.5 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: n.delay
          }}
        >
           {n.icon}
        </motion.div>
      ))}
    </motion.div>
  );
};

// 2. Scattered Communication — scattered uncoordinated communication between people
const NODES = [
  { id: 0, x: 100, y: 70 },
  { id: 1, x: 250, y: 180 },
  { id: 2, x: 400, y: 50 },
  { id: 3, x: 550, y: 200 },
  { id: 4, x: 700, y: 80 },
];

const createBurst = () => {
  let from = Math.floor(Math.random() * NODES.length);
  let to = Math.floor(Math.random() * NODES.length);
  while(to === from) to = Math.floor(Math.random() * NODES.length);
  
  const p1 = NODES[from];
  const p2 = NODES[to];
  
  const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  
  // Start arrow slightly separated from sender, end just before hitting receiver
  const travelDist = Math.max(0, dist - 40); 
  const endX = p1.x + Math.cos(angle * Math.PI / 180) * travelDist;
  const endY = p1.y + Math.sin(angle * Math.PI / 180) * travelDist;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    startX: p1.x,
    startY: p1.y,
    endX,
    endY,
    angle,
    color: Math.random() > 0.8 ? '#FFD54F' : '#9CA3AF', 
    dur: 1.0 + Math.random() * 0.8, // 1.0s to 1.8s short bursts
  };
};

const ScatteredCommAnimation = () => {
  const [arrows, setArrows] = useState([]);

  React.useEffect(() => {
    let isMounted = true;
    
    const spawnArrow = () => {
      if (!isMounted) return;
      
      setArrows(curr => {
        // Render max 6 active connections to avoid clutter while staying busy
        return [...curr, createBurst()].slice(-6);
      });
      
      // Random sporadic spawning
      setTimeout(spawnArrow, 250 + Math.random() * 450);
    };

    spawnArrow();
    setTimeout(spawnArrow, 150);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="relative w-full h-24 mt-4 overflow-hidden rounded-xl bg-[#FAFAFA] border border-gray-100 flex items-center justify-center"
    >
      <div className="absolute inset-0 pointer-events-none bg-[#FFD54F]/[0.08]" />

      <svg className="absolute w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="xMidYMid meet">
        {/* Render Users */}
        {NODES.map((n) => (
          <g key={`node-${n.id}`} transform={`translate(${n.x}, ${n.y})`}>
            <circle cx="0" cy="-6" r="8" fill="#2C2C2C" />
            <path d="M-14 14 C-14 2, 14 2, 14 14" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ))}

        {/* Render Communication Bursts */}
        {arrows.map((a) => (
          <motion.g
             key={a.id}
             initial={{ x: a.startX, y: a.startY, opacity: 0 }}
             animate={{ 
               x: [a.startX, a.endX], 
               y: [a.startY, a.endY], 
               opacity: [0, 1, 1, 0] 
             }}
             transition={{
               duration: a.dur,
               ease: "easeOut",
               times: [0, 0.2, 0.8, 1] // Appear -> Move -> Hold -> Fade out
             }}
          >
             <g transform={`rotate(${a.angle})`}>
                <line x1="20" y1="0" x2="45" y2="0" stroke={a.color} strokeWidth="3" strokeLinecap="round" />
                <path d="M38,-6 L50,0 L38,6 Z" fill={a.color} />
             </g>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
};

// 3. Lack of Visibility — gradual loss of clarity cycle
const VisibilityAnimation = () => {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;
    let initialTimeout;
    
    // Animation Timeline Cycle
    // 0: All clear (3s)
    // 1: Focus 2, degrade others (2.5s)
    // 2: Focus 4, faint 0 (2.5s)
    // 3: Focus 1, faint 5 (2.5s)
    // 4: Focus 3, faint 2 (2.5s)
    // 5: Resetting -> All clear (2s)
    const timeline = [
      { dur: 3000, active: -1, faint: -1 },
      { dur: 2500, active: 2,  faint: -1 },
      { dur: 2500, active: 4,  faint: 0 },
      { dur: 2500, active: 1,  faint: 5 },
      { dur: 2500, active: 3,  faint: 2 },
      { dur: 2000, active: -1, faint: -1 }
    ];

    let currentStep = 0;
    
    const runCycle = () => {
      if (!isMounted) return;
      
      setStep(currentStep);
      const nextDelay = timeline[currentStep].dur;
      
      currentStep = (currentStep + 1) % timeline.length;
      initialTimeout = setTimeout(runCycle, nextDelay);
    };

    initialTimeout = setTimeout(runCycle, 100);

    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
    };
  }, []);

  const timelineConfig = [
      { active: -1, faint: -1 },
      { active: 2,  faint: -1 },
      { active: 4,  faint: 0 },
      { active: 1,  faint: 5 },
      { active: 3,  faint: 2 },
      { active: -1, faint: -1 }
  ];
  
  const current = timelineConfig[step];
  const isReset = step === 0 || step === 5;
  const cards = Array.from({ length: 6 });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="relative w-full h-24 mt-4 overflow-hidden rounded-xl bg-[#FAFAFA] border border-gray-100 p-2"
    >
      <div className="grid grid-cols-3 grid-rows-2 gap-[6px] h-full">
         {cards.map((_, i) => {
           const isActive = i === current.active;
           const isFaint = i === current.faint;
           
           let opacity = 1;
           let blurValues = ["blur(0px)"];
           
           if (isReset) {
              opacity = 1;
           } else if (isActive) {
              opacity = 1;
           } else if (isFaint) {
              // Soft disappear effect
              opacity = 0.15;
              blurValues = ["blur(3px)", "blur(2px)", "blur(3px)"];
           } else {
              // Gradual visibility loss over time based on the cycle
              if (step === 1) opacity = 0.6;
              if (step === 2) opacity = 0.45;
              if (step === 3) opacity = 0.35;
              if (step === 4) opacity = 0.25;
              
              // Gentle blur transition: increase -> reduce -> repeat natively via motion array
              blurValues = ["blur(1px)", "blur(3px)", "blur(1px)"];
           }

           // Loose grid effect via slight positional offset
           const yOffset = i % 3 === 1 ? 'mt-[3px]' : '';

           return (
             <motion.div
               key={i}
               animate={{
                  opacity,
                  filter: blurValues.length > 1 ? blurValues : blurValues[0],
                  borderColor: isActive ? "rgba(255, 213, 79, 0.4)" : "rgba(234, 234, 234, 1)",
                  backgroundColor: isActive ? "rgba(255, 213, 79, 0.05)" : "rgba(255, 255, 255, 1)"
               }}
               transition={{ 
                  duration: 1.2, 
                  ease: "easeInOut",
                  filter: blurValues.length > 1 ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } : { duration: 1.2 }
               }}
               className={`rounded-lg border p-1.5 flex flex-col gap-[3px] relative overflow-hidden justify-center ${yOffset}`}
             >
                {/* Data blocks mimicking lines of text */}
                <div className={`h-[3px] rounded-full transition-colors duration-1000 w-3/4 ${isActive || isReset ? (isActive ? 'bg-[#FFD54F]' : 'bg-[#D1D5DB]') : 'bg-[#D1D5DB]'}`} />
                <div className={`h-[3px] rounded-full transition-colors duration-1000 w-full ${isActive || isReset ? (isActive ? 'bg-[#FFD54F]/50' : 'bg-[#D1D5DB]') : 'bg-[#D1D5DB]'}`} />
                <div className={`h-[3px] rounded-full transition-colors duration-1000 w-1/2 ${isActive || isReset ? (isActive ? 'bg-[#FFD54F]/50' : 'bg-[#D1D5DB]') : 'bg-[#D1D5DB]'}`} />
             </motion.div>
           );
         })}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CARD DATA
───────────────────────────────────────────── */
const cards = [
  {
    id: 'tools',
    title: 'Disconnected Tools',
    brief: 'No central source of truth.',
    details: [
      'Excel for tracking',
      'WhatsApp for updates',
      'Emails for approvals',
      'Files scattered across folders',
    ],
    Animation: DisconnectedAnimation,
  },
  {
    id: 'comm',
    title: 'Scattered Communication',
    brief: 'Conversations happen everywhere.',
    details: [
      'Conversations happen in multiple places',
      'Context gets lost between handoffs',
      'Teams depend on constant follow-ups',
    ],
    Animation: ScatteredCommAnimation,
  },
  {
    id: 'visibility',
    title: 'Lack of Visibility',
    brief: 'No one knows where things stand.',
    details: [
      'Teams cannot see full workflow',
      'Status is always unclear',
      'Decisions are consistently delayed',
    ],
    Animation: VisibilityAnimation,
  },
];

/* ─────────────────────────────────────────────
   PROBLEM CARD
───────────────────────────────────────────── */
const ProblemCard = ({ card, isHovered, onHover, onLeave }) => {
  const { Animation } = card;

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={onLeave}
    >
      {/* ── Main Card ── */}
      <motion.div
        layout
        animate={{
          boxShadow: isHovered
            ? '0 8px 40px rgba(255, 215, 0, 0.25), 0 2px 12px rgba(0,0,0,0.08)'
            : '0 2px 12px rgba(0,0,0,0.06)',
          borderColor: isHovered ? '#FFD700' : '#e5e7eb',
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white border-2 rounded-2xl px-7 py-6 cursor-default select-none relative z-10"
      >
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-[17px] font-semibold text-black">{card.title}</h3>
        </div>
        <p className="text-sm text-gray-500">{card.brief}</p>

        {/* Yellow accent line */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full bg-[#FFD700] origin-left"
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Connection Bridge ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="bridge"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-px bg-[#FFD700] mx-auto origin-top"
            style={{ height: 12 }}
          />
        )}
      </AnimatePresence>

      {/* ── Detail Box ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="bg-[#FFFEF5] border-2 border-[#FFD700] rounded-2xl px-6 py-5 shadow-[0_6px_32px_rgba(255,215,0,0.18)] relative z-20"
          >
            {/* Arrow tip */}
            <div
              className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFFEF5] border-l-2 border-t-2 border-[#FFD700] rotate-45"
              style={{ borderRadius: '2px 0 0 0' }}
            />

            {/* Detail list */}
            <ul className="space-y-2 mt-1">
              {card.details.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3, ease: 'easeOut' }}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="mt-0.5 text-[#FFD700] text-xs">▸</span>
                  {point}
                </motion.li>
              ))}
            </ul>

            {/* Micro-animation area */}
            <Animation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION EXPORT
───────────────────────────────────────────── */
const BreakdownSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-brand-bg-blue overflow-visible">
      <div className="max-w-5xl mx-auto text-center w-full">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="text-3xl md:text-5xl font-bold mb-4 text-black font-serif"
        >
          It&apos;s Not Just Delay<br className="hidden md:block" /> It&apos;s Lack of Structure
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
          className="text-gray-500 text-base md:text-lg mb-14 max-w-xl mx-auto font-light"
        >
          Hover on a problem to explore what's really breaking your workflow.
        </motion.p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <ProblemCard
                card={card}
                isHovered={hovered === card.id}
                onHover={setHovered}
                onLeave={() => setHovered(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BreakdownSection;
