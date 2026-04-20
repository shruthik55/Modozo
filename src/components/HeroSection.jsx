import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo-new.png';

const ITEMS = ["Techpack", "Approval", "Vendor", "Samples", "Production"];

// Scatter positions relative to center (vw/vh units)
// Scatter positions relative to center (Refined for split layout balance)
const scatterPositions = [
  { x: "-14vw", y: "-22vh", rotation: -8 },
  { x: "16vw",  y: "-18vh", rotation:  12 },
  { x: "-15vw", y: "12vh",  rotation: 15 },
  { x: "14vw",  y: "20vh",  rotation: -10 },
  { x: "6vw",   y: "28vh",  rotation: -6 },
];

const SCATTER_TIMES = [0, 0.06, 0.08, 0.32, 0.38, 0.50, 0.52, 0.9, 1];

const ConnectingLine = ({ pos, i }) => {
  const isLeft = pos.x.startsWith('-');
  const angle = Math.atan2(parseFloat(pos.y), parseFloat(pos.x)) * (180 / Math.PI);
  const distance = Math.sqrt(Math.pow(parseFloat(pos.x), 2) + Math.pow(parseFloat(pos.y), 2));

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0, 0],
        width: [`0${pos.x.includes('vw') ? 'vw' : '%' }`, `${distance}${pos.x.includes('vw') ? 'vw' : '%' }`, `${distance}${pos.x.includes('vw') ? 'vw' : '%' }`, `0${pos.x.includes('vw') ? 'vw' : '%' }`, `0${pos.x.includes('vw') ? 'vw' : '%' }`]
      }}
      transition={{
        duration: 16,
        times: [0, 0.1, 0.32, 0.4, 1],
        delay: i * 0.08,
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: '1.5px',
        background: 'linear-gradient(90deg, transparent, #E6B800, transparent)',
        transformOrigin: 'left center',
        rotate: `${angle}deg`,
        zIndex: 0,
        filter: 'drop-shadow(0 0 6px rgba(230,184,0,0.4))'
      }}
    >
      {/* Pulse effect */}
      <motion.div
        animate={{ 
          left: ["0%", "100%"],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.08 + 1,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#E6B800] rounded-full shadow-[0_0_8px_#E6B800]"
      />
    </motion.div>
  );
};

const Navbar = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Workflow Challenges', href: '#challenges' },
    { name: 'Lack of Structure', href: '#structure' },
    { name: 'Solution', href: '#solution' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Features', href: '#features' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];


  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-black/5">
      {/* LEFT: Logo area with vertical alignment and horizontal spacing */}
      <div className="flex items-center min-w-[150px]">
        <a href="#home" className="flex items-center">
          <div className="relative flex flex-col items-start">
            <img 
              src={logo} 
              alt="Modozo" 
              onLoad={() => setLogoLoaded(true)}
              onError={() => setLogoLoaded(false)}
              className={`h-[45px] md:h-[55px] w-auto object-contain transition-transform hover:scale-105 ${!logoLoaded ? 'absolute opacity-0' : 'opacity-100'}`}
            />
            {!logoLoaded && (
              <span className="text-xl font-bold tracking-tighter text-black uppercase">
                Modozo
              </span>
            )}
          </div>
        </a>
      </div>

      {/* CENTER: Navigation Links with gap control */}
      <div className="hidden xl:flex items-center gap-8 ml-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-black hover:[text-shadow:0_1px_4px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* RIGHT: Contact Button & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={scrollToContact}
          className="hidden md:block px-6 py-2.5 bg-[#FFD700] text-black font-semibold text-sm rounded-full shadow-sm hover:scale-105 transition-all duration-300 active:scale-95 whitespace-nowrap"
        >
          Contact Us
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden flex items-center justify-center p-2 text-black hover:text-brand-yellow focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-black/5 flex flex-col py-4 px-6 xl:hidden z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 text-sm font-medium text-black border-b border-gray-100 last:border-none hover:[text-shadow:0_1px_4px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToContact();
            }}
            className="mt-4 px-6 py-3 bg-[#FFD700] text-black font-semibold text-sm rounded-full shadow-sm w-full md:hidden text-center"
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // 16s animation duration + 1s clean pause = 17000ms
    const interval = window.setInterval(() => setAnimKey(prev => prev + 1), 17000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearInterval(interval);
    };
  }, []);

  const activePositions = isMobile ? [
    { x: "-32vw", y: "-22vh", rotation: -8 },
    { x: "32vw",  y: "-18vh", rotation:  12 },
    { x: "-32vw", y: "15vh",  rotation: 15 },
    { x: "32vw",  y: "22vh",  rotation: -10 },
    { x: "0vw",   y: "28vh",  rotation: -6 },
  ] : scatterPositions;

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-4 md:px-6 lg:px-12 overflow-hidden bg-[#F5EBD9] pt-28 pb-12 lg:pt-20 lg:pb-0">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20 z-10 w-full">
        {/* LEFT SIDE: Text Content */}
        <div className="flex-1 text-center lg:text-left w-full lg:max-w-[600px] flex flex-col items-center lg:items-start gap-4 md:gap-5 pt-8 lg:pt-0">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.2] lg:leading-[1.1] font-serif"
          >
            Supercharge Your Fashion Supply Chain with Modozo
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#333333] leading-relaxed font-medium max-w-md md:max-w-xl mx-auto lg:mx-0"
          >
            From techpacks and approvals to vendors, samples, and production tracking — Modozo brings your entire fashion workflow into one connected system.
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
            className="text-sm sm:text-base md:text-lg text-[#666666] leading-relaxed font-light max-w-sm md:max-w-lg mx-auto lg:mx-0"
          >
            Built for fashion brands that want to move faster, stay aligned, and launch collections without operational chaos.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#FFD700] text-black rounded-xl shadow-md font-semibold hover:scale-105 transition-all duration-300 ease-in-out">
              Book a Demo
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-black border-2 border-black rounded-xl font-semibold hover:scale-105 transition-all duration-300 ease-in-out">
              See How It Works
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Animation Container */}
        <div className="flex-1 w-full max-w-[100vw] overflow-hidden lg:overflow-visible relative h-[350px] sm:h-[450px] lg:h-[700px] flex items-center justify-center mt-8 lg:mt-0">
          
          {/* Synchronized Loop Wrapper */}
          <div key={animKey} className="absolute inset-0 flex items-center justify-center pointer-events-none w-full h-full">

            {/* Animated Connecting Lines (Flow) */}
            {ITEMS.map((_, i) => (
              <ConnectingLine key={`line-${i}`} pos={activePositions[i]} i={i} />
            ))}

            {/* ── Phase 1: Scattered floating elements ─────────────────────────── */}
            <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-10">
            {ITEMS.map((label, i) => {
              const pos = activePositions[i];
              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0, 0, 1, 1, 1, 0, 0, 0, 0],
                    scale:   [0.7, 0.7, 1, 1, 0.5, 0, 0, 0, 0.7],
                    x:       [pos.x, pos.x, pos.x, pos.x, "0vw", "0vw", "0vw", "0vw", pos.x],
                    y:       [pos.y, pos.y, pos.y, pos.y, "0vh", "0vh", "0vh", "0vh", pos.y],
                    rotate:  [pos.rotation, pos.rotation, pos.rotation, 0, 0, 0, 0, 0, pos.rotation],
                  }}
                  transition={{
                    duration: 16,
                    times: SCATTER_TIMES,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                  className="absolute -ml-14 -mt-5 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-[#FFD700]/30 rounded-xl shadow-sm text-sm font-semibold tracking-wide text-brand-dark/80 whitespace-nowrap flex items-center scale-75 sm:scale-100 origin-center"
                >
                  {label}
                </motion.div>
              );
            })}
          </div>

          {/* ── Phase 2: Central Brand Logo ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="relative flex items-center justify-center">
              <img 
                src={logo} 
                alt="Modozo" 
                className="w-32 h-auto md:w-48 lg:w-64 object-contain"
              />
            </div>
          </motion.div>

          {/* ── Phase 3: Structured horizontal workflow ─────────────── */}
          <motion.div
            animate={{
              opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0],
              y:       [12, 12, 12, 12, 12, 12, 0, 0, 12],
            }}
            transition={{
              duration: 16,
              times:    [0, 0.06, 0.08, 0.32, 0.38, 0.58, 0.65, 0.86, 1],
              ease: "easeInOut",
            }}
            className="absolute bottom-10 lg:bottom-20 left-0 right-0 flex items-center justify-center gap-0 pointer-events-none z-0 px-4"
          >
            <div className="flex items-center justify-center gap-0 w-full scale-[0.45] sm:scale-75 xl:scale-90 origin-bottom lg:origin-center">
              {ITEMS.map((label, i) => (
                <React.Fragment key={i}>
                  {/* Workflow Card */}
                  <div className="px-4 py-2 bg-white/65 backdrop-blur-md border border-[#FFD700]/40 rounded-xl shadow-sm text-xs font-semibold tracking-wide text-brand-dark/85 whitespace-nowrap flex-shrink-0">
                    {label}
                  </div>

                  {/* Connector arrow between items */}
                  {i < ITEMS.length - 1 && (
                    <div className="flex items-center flex-shrink-0 mx-0.5">
                      <div className="w-6 xl:w-8 h-[2px] bg-[#E6B800] rounded-full shadow-[0_0_8px_rgba(230,184,0,0.4)]" />
                      <div
                        className="w-0 h-0 flex-shrink-0"
                        style={{
                          borderTop: '4px solid transparent',
                          borderBottom: '4px solid transparent',
                          borderLeft: '6px solid #E6B800',
                          filter: 'drop-shadow(0 0 4px rgba(230,184,0,0.4))',
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
