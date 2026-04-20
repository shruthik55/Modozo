import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/** 
 * ANIMATED COUNTER COMPONENT
 * Counts up to a target number when in view.
 */
const AnimatedCounter = ({ value, suffix = "", duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number from value string if needed (e.g., "3x" -> 3)
  const target = parseFloat(value);
  const isInteger = Number.isInteger(target);

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const currentCount = progress * target;
        
        setCount(isInteger ? Math.floor(currentCount) : currentCount.toFixed(1));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, target, duration, delay, isInteger]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/**
 * MICRO-ANIMATION: Faster Approvals
 * Sequential steps moving L->R with a checkmark pop
 */
const ApprovalsAnimation = ({ active }) => (
  <div className="relative w-full h-16 flex items-center justify-center overflow-hidden">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        initial={{ x: -60, opacity: 0 }}
        animate={active ? { 
          x: [null, -20 + i * 20, 100], 
          opacity: [0, 1, 1, 0] 
        } : { opacity: 0 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: i * 0.4,
          times: [0, 0.2, 0.8, 1]
        }}
        className="absolute w-8 h-10 bg-white/10 border border-white/20 rounded-md flex items-center justify-center"
      >
        <div className="w-4 h-1 bg-white/20 rounded-full" />
      </motion.div>
    ))}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={active ? { scale: [0, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bg-brand-yellow w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.5)]"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </motion.div>
  </div>
);

/**
 * MICRO-ANIMATION: Reduced Delays
 * Slow-to-fast progress timeline
 */
const DelaysAnimation = ({ active }) => (
  <div className="w-full h-16 flex items-center justify-center px-6">
    <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
      <motion.div
        initial={{ left: "-100%" }}
        animate={active ? { left: ["-100%", "100%"] } : { left: "-100%" }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "circIn" // Slow start, fast finish
        }}
        className="absolute h-full w-full bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={active ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "circIn" }}
        className="absolute h-full bg-brand-yellow/30"
      />
    </div>
  </div>
);

/**
 * MICRO-ANIMATION: Improved Visibility
 * Hidden elements becoming clear
 */
const VisibilityAnimation = ({ active }) => (
  <div className="relative w-full h-16 flex items-center justify-center gap-2">
    {[0, 1, 2].map(i => (
      <div key={i} className="relative">
        <motion.div 
          animate={active ? { opacity: 0 } : { opacity: 0.2 }}
          className="w-10 h-10 border border-white/10 rounded-lg"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ delay: i * 0.3, duration: 0.5 }}
          className="absolute inset-0 bg-brand-yellow/20 border border-brand-yellow/50 rounded-lg flex items-center justify-center"
        >
          <div className="w-4 h-4 text-brand-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </motion.div>
      </div>
    ))}
  </div>
);

/**
 * MICRO-ANIMATION: Efficiency Boost
 * Scattered elements merging into a straight line
 */
const EfficiencyAnimation = ({ active }) => (
  <div className="relative w-full h-16 flex items-center justify-center">
    {[
      { y: -20, delay: 0 },
      { y: 0, delay: 0.2 },
      { y: 20, delay: 0.4 }
    ].map((pos, i) => (
      <motion.div
        key={i}
        initial={{ x: -40, y: pos.y, opacity: 0 }}
        animate={active ? { 
          x: [null, 0, 80], 
          y: [pos.y, 0, 0],
          opacity: [0, 1, 0] 
        } : { opacity: 0 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: pos.delay,
          ease: "easeInOut"
        }}
        className="absolute w-3 h-3 bg-brand-yellow rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]"
      />
    ))}
    <motion.div 
      animate={active ? { scaleX: [0, 1], opacity: [0, 0.2, 0] } : { opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-32 h-0.5 bg-brand-yellow origin-left"
    />
  </div>
);

/**
 * MESSY VS CLEAN FLOW VISUALS
 */
const BeforeAfterVisual = () => {
  const [isAfter, setIsAfter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAfter(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-80 mb-16 rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-6 bg-brand-dark shadow-inner">
      {/* Label Toggle */}
      <div className="absolute top-6 left-6 right-6 flex justify-between px-4 z-20">
        <motion.span 
          animate={{ opacity: isAfter ? 0.3 : 1 }}
          className="text-xs uppercase tracking-widest font-bold text-gray-400"
        >
          Before: Chaos
        </motion.span>
        <motion.span 
          animate={{ opacity: isAfter ? 1 : 0.3 }}
          className="text-xs uppercase tracking-widest font-bold text-brand-yellow"
        >
          After: Modozo
        </motion.span>
      </div>

      {/* Before Scene (Messy Workflow) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${isAfter ? 'opacity-0' : 'opacity-100'}`}>
        <svg width="400" height="200" viewBox="0 0 400 200" className="opacity-40">
          {[0, 1, 2, 3].map(i => (
            <motion.path
              key={i}
              d={`M 50 ${60 + i * 25} L 150 ${40 + i * 40} L 250 ${90 - i * 20} L 350 ${50 + i * 30}`}
              stroke={i === 0 ? "#ff4444" : "#888"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                x: [0, Math.random() * 5, -Math.random() * 5, 0],
                y: [0, Math.random() * 5, -Math.random() * 5, 0]
              }}
              transition={{ 
                pathLength: { duration: 2, delay: i * 0.2 },
                x: { duration: 2, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
          <circle cx="50" cy="100" r="4" fill="#666" />
          <circle cx="350" cy="100" r="4" fill="#666" />
        </svg>
        <div className="absolute bottom-10 text-[10px] text-gray-500 font-mono tracking-tighter uppercase">
          Disconnected Tools • Delayed Approvals • Hidden Status
        </div>
      </div>

      {/* After Scene (Clean Flow) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${isAfter ? 'opacity-100' : 'opacity-0'}`}>
        <svg width="400" height="200" viewBox="0 0 400 200">
          <motion.path
            d="M 50 100 L 150 100 L 250 100 L 350 100"
            stroke="#FFD700"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50" cy="100" r="5" fill="#FFD700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <motion.circle
            cx="150" cy="100" r="5" fill="#FFD700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.circle
            cx="250" cy="100" r="5" fill="#FFD700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          />
          <motion.circle
            cx="350" cy="100" r="5" fill="#FFD700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          />
          
          {/* Pulsing data points */}
          <motion.circle
            r="8" fill="#FFD700" opacity="0.2"
            animate={{ x: [50, 350] }}
            initial={{ x: 50, y: 100 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <div className="absolute bottom-10 text-[10px] text-brand-yellow font-mono tracking-tighter uppercase">
          Unified Platform • 100% Visibility • Real-time Sync
        </div>
      </div>

      {/* Divider */}
      <motion.div 
        animate={{ left: isAfter ? "100%" : "0%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-y-0 left-1/2 w-0.5 bg-white/20 z-10 hidden md:block"
      />
    </div>
  );
};

const ImpactSection = () => {
  const impacts = [
    { title: "Faster Approvals", value: "3", suffix: "x Speed", Animation: ApprovalsAnimation },
    { title: "Reduced Delays", value: "40", suffix: "% Savings", Animation: DelaysAnimation },
    { title: "Improved Visibility", value: "100", suffix: "% Live", Animation: VisibilityAnimation },
    { title: "Efficiency Boost", value: "2.5", suffix: "x Faster", Animation: EfficiencyAnimation }
  ];

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 bg-brand-dark text-white rounded-t-[2rem] md:rounded-t-[3.5rem] relative overflow-hidden w-full max-w-[100vw]">
      
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight font-serif text-white px-2">
            The Impact on Your Business
          </h2>
          <p className="text-gray-400 text-sm md:text-xl font-light max-w-2xl mx-auto px-2">
            Experience the transformation from fractured legacy processes to 
            a modern, high-speed fashion supply chain.
          </p>
        </motion.div>

        {/* Visual Transformation */}
        <BeforeAfterVisual />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-brand-yellow/30 transition-colors group flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className="w-full mb-4">
                <item.Animation active={true} />
              </div>
              
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-black text-brand-yellow tracking-tighter">
                  <AnimatedCounter value={item.value} delay={i * 0.2} />
                </span>
                <span className="text-lg font-bold ml-1 text-white/90">{item.suffix.split(' ')[0]}</span>
              </div>
              
              <p className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                {item.title}
              </p>

              {/* Progress bar decoration */}
              <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeOut" }}
                  className="h-full bg-brand-yellow w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote/Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-24 text-center border-t border-white/10 pt-16"
        >
          <p className="text-xl md:text-3xl font-light italic text-white/80 max-w-3xl mx-auto leading-relaxed">
            "We didn't just digitize our process; we reinvented how we create, 
            slashing weeks off our production cycle."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
