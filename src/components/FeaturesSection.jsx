import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** 
 * MICRO-ANIMATIONS 
 */

// 1. Unified Workflow: Elements align into a clean flow
const WorkflowAnimation = ({ active }) => (
  <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
    <div className="flex gap-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: i % 2 === 0 ? -20 : 20, opacity: 0 }}
          animate={active ? { y: 0, opacity: 1 } : { y: i % 2 === 0 ? -20 : 20, opacity: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center border border-black/5"
        >
          <div className="w-6 h-6 rounded bg-brand-yellow/50" />
        </motion.div>
      ))}
    </div>
    {active && (
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute h-0.5 bg-brand-yellow top-1/2 left-1/4 right-1/4 origin-left z-[-1]"
      />
    )}
  </div>
);

// 2. Centralized Communication: Messages converge into one point
const CommunicationAnimation = ({ active }) => (
  <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
    {/* Central Hub */}
    <motion.div
      animate={active ? { 
        scale: [1, 1.15, 1],
        boxShadow: [
          "0 0 20px rgba(255,215,0,0.3)",
          "0 0 40px rgba(255,215,0,0.6)", 
          "0 0 20px rgba(255,215,0,0.3)"
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-12 h-12 bg-brand-yellow rounded-full z-10 flex items-center justify-center border-4 border-white shadow-xl"
    >
      <div className="w-2 h-2 bg-black/40 rounded-full" />
    </motion.div>

    {/* Messages */}
    {[
      { x: -100, delay: 0 },
      { x: 100, delay: 0.8 },
      { x: -100, y: -30, delay: 1.6 },
      { x: 100, y: 30, delay: 2.4 }
    ].map((m, i) => (
      <motion.div
        key={i}
        initial={{ x: m.x, y: m.y || 0, opacity: 0, scale: 0.8 }}
        animate={active 
          ? { 
              x: [m.x, 0], 
              y: [m.y || 0, 0],
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.2]
            } 
          : { opacity: 0 }
        }
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          delay: m.delay,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1]
        }}
        className="absolute px-3 py-1 bg-white border border-gray-100 rounded-full shadow-md z-0 flex items-center gap-1"
      >
        <div className="w-2 h-2 bg-brand-yellow rounded-full" />
        <div className="w-6 h-1 bg-gray-200 rounded-full" />
      </motion.div>
    ))}
  </div>
);

// 3. Real-time Visibility: Dashboard elements update
const VisibilityAnimation = ({ active }) => (
  <div className="w-full h-32 flex flex-col justify-center gap-2 px-8">
    {[70, 40, 90].map((w, i) => (
      <div key={i} className="h-3 bg-black/10 rounded-full overflow-hidden w-full">
        <motion.div
          initial={{ width: "20%" }}
          animate={active ? { width: `${w}%` } : { width: "20%" }}
          transition={{ duration: 1, delay: i * 0.1, ease: "easeInOut" }}
          className="h-full bg-brand-yellow"
        />
      </div>
    ))}
    <div className="flex gap-2 mt-1">
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
      ))}
    </div>
  </div>
);

// 4. Dynamic Collaboration: Hub-based collaboration network
const CollaborationAnimation = ({ active }) => {
  const centerNode = { x: 0, y: 0 };
  const outerNodes = [
    { x: -55, y: -35 },
    { x: 55, y: -35 },
    { x: 55, y: 35 },
    { x: -55, y: 35 },
  ];

  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-visible">
      <div className="relative">
        {/* Connection Lines (Center to Outers) */}
        <svg className="absolute inset-x-[-100px] inset-y-[-100px] w-[200px] h-[200px] pointer-events-none">
          <g transform="translate(100, 100)">
            {outerNodes.map((node, i) => (
              <React.Fragment key={i}>
                <motion.line
                  x1={centerNode.x}
                  y1={centerNode.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="#FFD700"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
                
                {/* Data Pulses: Node -> Center -> Node */}
                {active && (
                  <motion.circle
                    r="2.5"
                    fill="#FFD700"
                    animate={{
                      cx: [node.x, centerNode.x, outerNodes[(i + 1) % 4].x],
                      cy: [node.y, centerNode.y, outerNodes[(i + 1) % 4].y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </g>
        </svg>

        {/* Central Hub Node */}
        <motion.div
          animate={active ? { 
            scale: [1, 1.1, 1],
            boxShadow: ["0 0 0px #FFD700", "0 0 15px #FFD700", "0 0 0px #FFD700"]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-yellow rounded-full z-20 border-2 border-white flex items-center justify-center shadow-lg"
        >
          <div className="w-1.5 h-1.5 bg-black/30 rounded-full" />
        </motion.div>

        {/* Surrounding Nodes */}
        {outerNodes.map((pos, i) => (
          <motion.div
            key={i}
            animate={active ? { 
              scale: [1, 1.2, 1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-10 border-2 border-brand-yellow flex items-center justify-center shadow-sm"
            style={{ left: pos.x, top: pos.y }}
          >
            <div className="w-1 h-1 bg-black/10 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 5. Precision Control: Continuous flow animation
const ControlAnimation = ({ active }) => (
  <div className="w-full h-32 flex items-center justify-center px-10">
    <div className="w-full h-1 relative bg-black/5 rounded-full overflow-hidden">
      <motion.div
        animate={active ? { x: ["-100%", "100%"] } : { x: "-100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
      />
      {active && [0,1,2].map(i => (
        <motion.div
          key={i}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
          className="absolute h-full w-[10px] bg-brand-yellow blur-[2px]"
        />
      ))}
    </div>
  </div>
);

const featureData = [
  {
    title: "Unified Workflow",
    desc: "Seamless synchronization from design techpacks to production floors.",
    Animation: WorkflowAnimation
  },
  {
    title: "Centralized Communication",
    desc: "Eliminate email chains. Every update, approval, and file in one single thread.",
    Animation: CommunicationAnimation
  },
  {
    title: "Real-time Visibility",
    desc: "Instant live updates on sourcing, sampling, and manufacturing statuses.",
    Animation: VisibilityAnimation
  },
  {
    title: "Dynamic Collaboration",
    desc: "Connect your entire ecosystem like designers, brand teams, and global vendors.",
    Animation: CollaborationAnimation
  },
  {
    title: "Precision Control",
    desc: "Maintain strict quality standards with automated checks and live oversight.",
    Animation: ControlAnimation
  }
];

const FeatureCard = ({ item, index, isHovered, onHover, isAnyHovered }) => {
  return (
    <motion.div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        z: isHovered ? 50 : 0,
        opacity: isAnyHovered && !isHovered ? 0.4 : 1,
        filter: isAnyHovered && !isHovered ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`
        w-full sm:w-[320px] min-h-[480px]
        relative group cursor-default px-6 py-10 lg:px-8 rounded-[2.5rem] bg-white border-2 
        ${isHovered ? 'border-brand-yellow shadow-2xl z-20 brightness-105' : 'border-gray-100 shadow-sm z-10'}
        flex flex-col items-center text-center transition-shadow duration-500
      `}
    >
      <div className="w-full h-36 mb-8 overflow-hidden flex items-center justify-center">
        <item.Animation active={isHovered} />
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-brand-dark tracking-tight">
        {item.title}
      </h3>
      
      <p className="text-gray-500 font-light leading-relaxed">
        {item.desc}
      </p>

      {/* Decorative arrow that appears on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="mt-6 text-brand-yellow text-2xl font-bold"
      >
        →
      </motion.div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-16 md:py-32 px-0 sm:px-6 overflow-hidden bg-brand-beige">
      {/* Background Dimming Overlay */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-dark/5 backdrop-blur-[2px] z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-8 tracking-tighter font-serif leading-tight"
          >
            What Makes This Powerful
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto font-light"
          >
            Premium features designed for the next generation of fashion brands.
          </motion.p>
        </div>

        {/* Feature Cards Container - 3+2 Centered Responsive Layout */}
        <div className="flex flex-wrap justify-center gap-8 max-w-[1100px] mx-auto px-6 py-10">
          {featureData.map((item, index) => (
            <FeatureCard
              key={index}
              item={item}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
              isAnyHovered={hoveredIndex !== null}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
