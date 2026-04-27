import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** 
 * 1. DESIGN & SAMPLING ANIMATION
 * Garment morphing, feedback, and shipment.
 */
const DesignSamplingAnimation = ({ active }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden bg-brand-bg-blue/50 rounded-2xl border border-brand-yellow/10">
      <div className="relative z-10 scale-110">
        {/* Garment Visual (Simplified Shirt) */}
        <motion.svg 
          width="80" height="80" viewBox="0 0 100 100"
          animate={{
            fill: step === 2 ? "#FFD700" : "#fff",
            scale: step === 2 ? 1.05 : 1
          }}
          className="drop-shadow-sm"
        >
          <path 
            d="M 20 20 L 35 15 L 45 20 L 55 20 L 65 15 L 80 20 L 85 45 L 75 50 L 75 85 L 25 85 L 25 50 L 15 45 Z" 
            stroke="black" strokeWidth="2"
          />
        </motion.svg>

        {/* Feedback Markers */}
        <AnimatePresence>
          {step === 1 && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-4 -left-4 px-2 py-1 bg-white border border-brand-yellow text-[8px] rounded-full font-bold shadow-sm"
              >
                MOD: COLLAR?
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-10 -right-8 px-2 py-1 bg-white border border-brand-yellow text-[8px] rounded-full font-bold shadow-sm"
              >
                ADJUST LENGTH
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Iteration Flash */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            className="absolute inset-0 bg-brand-yellow rounded-full blur-xl"
          />
        )}
      </div>

      {/* Shipment Box */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ x: -150 }}
            animate={{ x: 150 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute bottom-4 flex items-center gap-2"
          >
            <div className="w-6 h-6 bg-brand-yellow rounded flex items-center justify-center border border-black/10 shadow-sm">
              <div className="w-3 h-3 border-t-2 border-l-2 border-black/20" />
            </div>
            <span className="text-[8px] font-bold tracking-widest text-brand-navy/40 uppercase">EXPRESS TO LAB</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-2 text-center w-full">
        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
          {step === 0 && "Design Ready"}
          {step === 1 && "Feedback Cycle"}
          {step === 2 && "Final Iteration"}
          {step === 3 && "Sample Shipped"}
        </span>
      </div>
    </div>
  );
};

/** 
 * 2. BULK PRODUCTION ANIMATION
 * Production grid, QC, progress, and resolution.
 */
const BulkProductionAnimation = ({ active }) => {
  const [percent, setPercent] = useState(0);
  const [hasAlert, setHasAlert] = useState(false);

  useEffect(() => {
    if (!active) {
      setPercent(0);
      setHasAlert(false);
      return;
    }
    const timer = setInterval(() => {
      setPercent(p => {
        if (p >= 100) return 0;
        if (p === 60) setHasAlert(true);
        if (p === 80) setHasAlert(false);
        return p + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center overflow-hidden bg-brand-bg-blue/50 rounded-2xl border border-brand-yellow/10 p-6">
      {/* Production Grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              backgroundColor: i * 10 < percent ? "#FFD700" : "rgba(255,255,255,0.5)",
              borderColor: i * 10 < percent ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)"
            }}
            className="w-4 h-4 rounded-sm border"
          />
        ))}
      </div>

      {/* Progress Bar & Alert */}
      <div className="w-full relative px-4 text-center">
        <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden mb-2">
          <motion.div 
            style={{ width: `${percent}%` }}
            className={`h-full transition-colors duration-300 ${hasAlert ? "bg-red-500" : "bg-brand-yellow"}`}
          />
        </div>
        
        <div className="h-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hasAlert ? (
              <motion.div
                key="alert"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                className="flex items-center gap-1 text-[8px] font-bold text-red-600 uppercase tracking-widest"
              >
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                Material Delay Alert
              </motion.div>
            ) : percent > 0 ? (
              <motion.div
                key="status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[8px] font-bold text-gray-400 uppercase tracking-widest"
              >
                Production Batch #{Math.floor(percent / 10 + 101)} • {percent}%
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* QC Done Indicator */}
      <AnimatePresence>
        {percent >= 100 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full px-2 text-[8px] font-bold"
          >
            QC PASSED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FashionWorkflowsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 bg-white/20 rounded-[2rem] md:rounded-[3.5rem] mx-2 sm:mx-4 md:mx-12 my-6 md:my-8 backdrop-blur-md border border-brand-yellow/30 shadow-sm relative overflow-hidden w-auto max-w-[100vw] box-border">
      
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[100px]" />

      <div className="max-w-[1400px] mx-auto text-center relative z-10 w-full px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">Tailored for Industry</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-5 tracking-tight text-black font-serif leading-tight">
            Built Specifically for Fashion Workflows
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Modozo understands the lifecycle of apparel. Our structured workflow simulations accommodate everything from prototype tweaks to complex bulk manufacturing shifts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {/* Card 1: Design & Sampling */}
          <motion.div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`
              p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border-2 transition-all duration-500 cursor-default flex flex-col h-full w-full
              ${hoveredCard === 1 ? 'border-brand-yellow shadow-2xl' : 'border-gray-50 shadow-sm'}
            `}
          >
            <div className="mb-6 w-full">
              <DesignSamplingAnimation active={hoveredCard === 1 || hoveredCard === null} />
            </div>
            
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-brand-navy tracking-tight">Design & Sampling</h3>
              <p className="text-gray-500 font-light leading-relaxed text-base mb-6">
                Eliminate friction between designers and makers. Manage prototype modifications in real-time, aggregate pattern feedback, and track sample movement globally.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {["Tech Packs", "Pattern Audits", "Sampling Tracking"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded-full tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Bulk Production */}
          <motion.div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`
              p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border-2 transition-all duration-500 cursor-default flex flex-col h-full w-full
              ${hoveredCard === 2 ? 'border-brand-yellow shadow-2xl' : 'border-gray-50 shadow-sm'}
            `}
          >
            <div className="mb-6 w-full">
              <BulkProductionAnimation active={hoveredCard === 2 || hoveredCard === null} />
            </div>
            
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-brand-navy tracking-tight">Bulk Production</h3>
              <p className="text-gray-500 font-light leading-relaxed text-base mb-6">
                Real-time factory floor oversight. From PO issuance to final quality checks, identify material delays before they block your line and ensure strict compliance at every batch.
              </p>

              <div className="flex flex-wrap gap-2">
                {["PO Management", "Live Progress", "Quality Compliance"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded-full tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FashionWorkflowsSection;
