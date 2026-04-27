import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 bg-brand-navy text-white border-t border-white/5 overflow-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8 w-full px-2">
        
        {/* CENTER COLUMN: Main CTA (Order 1 on Mobile, Order 2 on Desktop) */}
        <div className="order-1 lg:order-2 flex flex-col items-center text-center max-w-2xl lg:max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-5xl font-bold mb-8 tracking-tight font-serif text-white mx-auto leading-tight relative lg:-translate-x-4 xl:-translate-x-6"
          >
            Launch Collections Faster <br className="hidden md:block" />
            With Less Chaos
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 mb-10 mx-auto font-light leading-relaxed max-w-lg"
          >
            Bring your entire fashion workflow into one connected system built for speed, clarity, and control.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
          >
            <button className="px-8 py-4 bg-brand-gradient text-brand-navy rounded-xl shadow-[0_4px_20px_rgba(255,215,0,0.3)] font-semibold text-lg hover:scale-105 hover:brightness-110 transition-all duration-300">
              Book a Demo
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-xl font-semibold text-lg hover:border-white/50 hover:bg-white/5 transition-all duration-300">
              Talk to Us
            </button>
          </motion.div>
        </div>

        {/* LEFT COLUMN: Company Details (Order 2 on Mobile, Order 1 on Desktop) */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-6 font-serif">
            MODOZO
          </h3>
          
          <div className="flex flex-col gap-3 text-gray-400 font-light tracking-wide text-sm md:text-base">
            <p className="leading-relaxed">
              4th Floor, Sanali Spazio, Inorbit Mall Rd,<br />
              Madhapur, Hyderabad, Telangana, 500081, India
            </p>
            
            <a 
              href="mailto:admin@modozo.fashion" 
              className="hover:text-brand-yellow transition-colors duration-300"
            >
              Email: admin@modozo.fashion
            </a>
            
            <p>
              Contact: +91 9346934833
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Links (Order 3 on Mobile & Desktop) */}
        <div className="order-3 lg:order-3 flex flex-col items-center lg:items-end text-center lg:text-right pt-4">
          <h4 className="text-lg font-semibold text-white/90 mb-6 tracking-tight">
            Do you know us?
          </h4>
          
          <div className="flex flex-col gap-4 text-gray-400">
            <span className="text-sm md:text-base font-normal text-gray-400">
              About Us
            </span>
            
            <span className="text-sm md:text-base font-normal text-gray-400">
              LinkedIn
            </span>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-widest uppercase text-center">
          © {new Date().getFullYear()} Modozo — The Operating System for Fashion Supply Chains
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
