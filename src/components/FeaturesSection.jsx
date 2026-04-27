import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/** 
 * ORIGINAL MICRO-ANIMATIONS (RECOVERED)
 */

// 1. Unified Workflow: Elements align into a clean flow
const WorkflowAnimation = ({ active }) => (
  <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
    <div className="flex gap-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: i % 2 === 0 ? -10 : 10, opacity: 0.6, scale: 0.95 }}
          animate={active 
            ? { y: 0, opacity: 1, scale: 1.1 } 
            : { y: i % 2 === 0 ? -10 : 10, opacity: 0.6, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-lg flex items-center justify-center border border-black/5 shadow-sm"
        >
          <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-brand-yellow/50" />
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
    <motion.div
      animate={active ? { 
        scale: [1, 1.15, 1],
        boxShadow: [
          "0 0 20px rgba(255,215,0,0.4)",
          "0 0 40px rgba(255,215,0,0.7)", 
          "0 0 20px rgba(255,215,0,0.4)"
        ]
      } : { 
        scale: 1,
        boxShadow: "0 0 10px rgba(255,215,0,0.2)"
      }}
      transition={{ duration: active ? 2 : 4, repeat: Infinity }}
      className="w-10 h-10 md:w-12 md:h-12 bg-brand-yellow rounded-full z-10 flex items-center justify-center border-4 border-white shadow-xl"
    >
      <div className="w-2 h-2 bg-black/40 rounded-full" />
    </motion.div>

    {[
      { x: -80, delay: 0 },
      { x: 80, delay: 0.8 },
      { x: -80, y: -25, delay: 1.6 },
      { x: 80, y: 25, delay: 2.4 }
    ].map((m, i) => (
      <motion.div
        key={i}
        initial={{ x: m.x, y: m.y || 0, opacity: 0, scale: 0.8 }}
        animate={active 
          ? { 
              x: [m.x, 0], 
              y: [m.y || 0, 0],
              opacity: [0.3, 1, 1, 0.3],
              scale: [0.9, 1, 1, 0.9]
            } 
          : { 
              opacity: [0.1, 0.3, 0.1],
              x: m.x * 0.7, 
              y: (m.y || 0) * 0.7,
              scale: 0.8
            }
        }
        transition={{ 
          duration: active ? 2.5 : 5, 
          repeat: Infinity, 
          delay: m.delay,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1]
        }}
        className="absolute px-2 md:px-3 py-1 bg-white border border-gray-100 rounded-full shadow-md z-0 flex items-center gap-1"
      >
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-yellow rounded-full" />
        <div className="w-4 h-1 md:w-6 md:h-1 bg-gray-200 rounded-full" />
      </motion.div>
    ))}
  </div>
);

// 3. Real-time Visibility: Dashboard elements update
const VisibilityAnimation = ({ active }) => (
  <div className="w-full h-32 flex flex-col justify-center gap-2 px-10 md:px-14">
    {[70, 45, 90].map((w, i) => (
      <div key={i} className="h-2.5 md:h-3 bg-black/5 rounded-full overflow-hidden w-full">
        <motion.div
          initial={{ width: "20%" }}
          animate={active ? { width: `${w}%` } : { width: "30%" }}
          transition={{ duration: active ? 1 : 2, delay: i * 0.1, ease: "easeInOut" }}
          className="h-full bg-brand-yellow"
        />
      </div>
    ))}
    <div className="flex gap-2 mt-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500"
        />
      ))}
    </div>
  </div>
);

// 4. Dynamic Collaboration: Hub-based collaboration network
const CollaborationAnimation = ({ active }) => {
  const outerNodes = [
    { x: -50, y: -30 }, { x: 50, y: -30 },
    { x: 50, y: 30 }, { x: -50, y: 30 },
  ];

  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-visible">
      <div className="relative">
        <svg className="absolute inset-x-[-100px] inset-y-[-100px] w-[200px] h-[200px] pointer-events-none">
          <g transform="translate(100, 100)">
            {outerNodes.map((node, i) => (
              <React.Fragment key={i}>
                <motion.line
                  x1={0} y1={0} x2={node.x} y2={node.y}
                  stroke="#FFD700"
                  strokeWidth="1.5"
                  strokeOpacity={active ? 0.5 : 0.2}
                  initial={{ pathLength: 0.3 }}
                  animate={active ? { pathLength: 1 } : { pathLength: 0.3 }}
                  transition={{ duration: 1 }}
                />
                {active && (
                  <motion.circle
                    r="2" fill="#FFD700"
                    animate={{
                      cx: [node.x, 0, outerNodes[(i + 1) % 4].x],
                      cy: [node.y, 0, outerNodes[(i + 1) % 4].y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                  />
                )}
              </React.Fragment>
            ))}
          </g>
        </svg>

        <motion.div
          animate={active ? { 
            scale: [1, 1.1, 1],
            boxShadow: ["0 0 5px #FFD700", "0 0 15px #FFD700", "0 0 5px #FFD700"]
          } : { scale: 0.9 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-yellow rounded-full z-20 border-2 border-white flex items-center justify-center shadow-lg"
        >
          <div className="w-1.5 h-1.5 bg-black/30 rounded-full" />
        </motion.div>

        {outerNodes.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-10 border-2 border-brand-yellow flex items-center justify-center shadow-sm"
            style={{ left: pos.x, top: pos.y }}
          />
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
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: active ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
        className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-brand-yellow/80 to-transparent"
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
    title: "Communication",
    desc: "Eliminate email chains. Every update and file in a single thread.",
    Animation: CommunicationAnimation
  },
  {
    title: "Real-time Visibility",
    desc: "Instant live updates on status changes across your supply chain.",
    Animation: VisibilityAnimation
  },
  {
    title: "Dynamic Collaboration",
    desc: "Connect your entire design team and global vendor ecosystem.",
    Animation: CollaborationAnimation
  },
  {
    title: "Precision Control",
    desc: "Maintain strict quality standards with automated checks and live oversight.",
    Animation: ControlAnimation
  }
];

const FeatureStrip = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`
        flex items-center w-full px-6 md:px-10 h-[90px] md:h-[105px]
        bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.05)]
        group cursor-default transition-all duration-400 border border-transparent
        ${isHovered ? 'shadow-[0_12px_24px_rgba(0,0,0,0.08)] border-brand-yellow/30' : ''}
        ${isEven ? 'flex-row' : 'flex-row-reverse'}
      `}
    >
      {/* 50% Text Section */}
      <div className={`w-1/2 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
        <h3 className="text-[14px] md:text-[16px] font-bold text-brand-navy tracking-tight leading-tight mb-1">
          {feature.title}
        </h3>
        <p className="text-[11px] md:text-[12px] text-gray-400 font-medium leading-tight max-w-[280px]">
          {feature.desc}
        </p>
      </div>

      {/* 50% Animation Section */}
      <div className="w-1/2 flex items-center justify-center">
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.4 }}
          className="w-full flex items-center justify-center overflow-visible"
        >
          <feature.Animation active={isHovered} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-brand-bg-blue overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-serif"
          >
            What Makes This Powerful
          </motion.h2>
        </div>

        {/* Feature Strips List */}
        <div className="flex flex-col gap-4 md:gap-5 max-w-4xl mx-auto">
          {featureData.map((feature, index) => (
            <FeatureStrip key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
