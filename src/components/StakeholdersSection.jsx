import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const stakeholders = [
  "Designers",
  "Brand Teams",
  "Sourcing Managers",
  "Vendors",
  "QA Teams",
  "Tech Teams"
];

const StakeholdersSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [placedCubes, setPlacedCubes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDim = () => setIsMobile(window.innerWidth < 768);
    checkDim();
    window.addEventListener('resize', checkDim);
    return () => window.removeEventListener('resize', checkDim);
  }, []);

  const [faces, setFaces] = useState({ front: stakeholders[0], back: stakeholders[1] });

  // Update hidden face seamlessly before rotation
  useEffect(() => {
    if (currentStep % 2 === 0) {
      setFaces(f => ({ ...f, front: stakeholders[currentStep] }));
    } else {
      setFaces(f => ({ ...f, back: stakeholders[currentStep] }));
    }
  }, [currentStep]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Divide scroll into 7 segments mapping to 6 steps + 1 final resting state
    const state = Math.floor(latest * 7);
    if (state >= 6) {
      setCurrentStep(5);
      setPlacedCubes([0, 1, 2, 3, 4, 5]);
      setIsFinished(true);
    } else {
      setCurrentStep(Math.max(0, state));
      setPlacedCubes(Array.from({ length: state }, (_, i) => i));
      setIsFinished(false);
    }
  });

  return (
    <section ref={containerRef} className="h-[400vh] bg-brand-beige relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-20 w-full">
        <div className="w-full text-center px-4 md:px-12 mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 md:mb-4 font-serif px-2">One Platform. All Stakeholders.</h2>
          <p className="text-brand-dark/70 max-w-xl mx-auto text-sm md:text-lg">
            A single source of truth that aligns every team seamlessly.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-24">
          <div className="relative flex flex-col md:flex-row w-full items-center justify-center gap-2 md:gap-0">
            
            {/* Static Cubes Layer */}
            {stakeholders.map((role, i) => (
              <div key={i} className="w-full md:w-1/6 h-16 md:h-auto md:aspect-square p-1 md:p-1.5 lg:p-5 flex-shrink-0">
                <div className="w-full h-full relative">
                  {placedCubes.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-[#FFD700]/50 backdrop-blur-md rounded-xl md:rounded-2xl lg:rounded-3xl shadow-sm border border-[#FFD700]/40 flex items-center justify-center p-2 md:p-4 text-center"
                    >
                      <span className="text-black font-semibold text-sm md:text-base lg:text-xl leading-tight">{role}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}

            {/* Moving Cube Layer */}
            <motion.div
              className={`absolute top-0 md:bottom-0 left-0 right-0 md:right-auto w-full md:w-1/6 h-16 md:h-auto p-1 md:p-1.5 lg:p-5 z-10 [perspective:1000px] ${isFinished ? 'pointer-events-none' : ''}`}
              initial={false}
              animate={{
                x: isMobile ? 0 : `${currentStep * 100}%`,
                y: isMobile ? `calc(${currentStep * 100}% + ${currentStep * 8}px)` : 0, // 8px for gap-2 gap approximation
                opacity: isFinished ? 0 : 1
              }}
              transition={{
                x: { type: "spring", stiffness: 50, damping: 16, mass: 1 },
                y: { type: "spring", stiffness: 50, damping: 16, mass: 1 },
                opacity: { duration: 0.3 }
              }}
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: currentStep * 180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 bg-[#FFD700]/90 backdrop-blur-xl rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl border border-white/60 flex items-center justify-center p-2 md:p-4 text-center"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <span className="text-black font-semibold text-sm md:text-base lg:text-xl drop-shadow-sm leading-tight">{faces.front}</span>
                </div>
                {/* Back Face */}
                <div 
                  className="absolute inset-0 bg-[#FFD700]/90 backdrop-blur-xl rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl border border-white/60 flex items-center justify-center p-2 md:p-4 text-center"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className="text-black font-semibold text-sm md:text-base lg:text-xl drop-shadow-sm leading-tight">{faces.back}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll helper */}
        <motion.div 
           className="mt-4 text-brand-dark/50 font-medium tracking-wide flex flex-col items-center gap-2"
           animate={{ opacity: isFinished ? 0 : 1 }}
        >
           <span>Scroll to connect</span>
           <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
           >
              &darr;
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StakeholdersSection;
