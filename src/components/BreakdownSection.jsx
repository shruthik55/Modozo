import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   MICRO-ANIMATIONS for each detail box
───────────────────────────────────────────── */

// 1. Disconnected Tools — floating scattered labels
const DisconnectedAnimation = () => {
  const tools = [
    { label: '📊 Excel',    x: 0,   y: 0,   dx: -6, dy: -4 },
    { label: '💬 WhatsApp', x: 80,  y: 5,   dx: 5,  dy: -6 },
    { label: '📧 Email',    x: 20,  y: 48,  dx: -4, dy: 6  },
    { label: '📁 Files',    x: 100, y: 46,  dx: 7,  dy: 5  },
  ];
  return (
    <div className="relative w-full h-20 overflow-visible mt-3">
      {tools.map((t, i) => (
        <motion.span
          key={i}
          className="absolute text-[11px] font-medium bg-white border border-gray-200 rounded-full px-2 py-0.5 shadow-sm text-gray-700 whitespace-nowrap"
          style={{ left: t.x, top: t.y }}
          animate={{ x: [0, t.dx, 0, -t.dx * 0.6, 0], y: [0, t.dy, 0, -t.dy * 0.6, 0] }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {t.label}
        </motion.span>
      ))}
    </div>
  );
};

// 2. Scattered Communication — random chat bubbles appearing & stacking
const ScatteredCommAnimation = () => {
  const bubbles = [
    { text: 'Update?',       left: 0,   delay: 0    },
    { text: 'Already sent!', left: 70,  delay: 0.6  },
    { text: 'Which file?',   left: 20,  delay: 1.2  },
    { text: 'See email…',    left: 90,  delay: 1.8  },
    { text: 'Who approved?', left: 10,  delay: 2.4  },
  ];
  return (
    <div className="relative w-full h-20 overflow-visible mt-3">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] bg-[#FFF9E0] border border-[#FFD700]/40 rounded-2xl px-2.5 py-1 shadow-sm text-gray-700 whitespace-nowrap"
          style={{ left: b.left, top: i * 10 }}
          animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
            repeatDelay: 3,
          }}
        >
          {b.text}
        </motion.div>
      ))}
    </div>
  );
};

// 3. Lack of Visibility — stalling progress bar + fading eye
const VisibilityAnimation = () => {
  return (
    <div className="mt-3 space-y-2">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-500 w-14 shrink-0">Status</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full"
            animate={{ width: ['0%', '65%', '65%', '20%', '0%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.span
          className="text-[10px] text-gray-400 w-6"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ?%
        </motion.span>
      </div>

      {/* Eye icon fading */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-500 w-14 shrink-0">Visibility</span>
        <motion.span
          className="text-lg"
          animate={{ opacity: [1, 0.1, 1], filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          👁️
        </motion.span>
        <span className="text-[10px] text-gray-400 italic">unclear</span>
      </div>
    </div>
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
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-brand-beige overflow-visible">
      <div className="max-w-5xl mx-auto text-center w-full">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="text-3xl md:text-5xl font-bold mb-4 text-black font-serif"
        >
          It&apos;s Not Just Delay —<br className="hidden md:block" /> It&apos;s Lack of Structure
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
