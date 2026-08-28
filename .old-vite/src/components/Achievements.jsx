/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Compass, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHover, playSuccess } from '../utils/audio';
import { achievements } from '../utils/data';

export default function Achievements() {
  const triggerCelebration = () => {
    playSuccess();
    
    // Launch a wave of cyberpunk-colored confetti (cyan, purple, pink)
    const count = 100;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#d946ef', '#3b82f6', '#10b981']
    };

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const getIcon = (title) => {
    if (title.includes("Guinness")) return Award;
    if (title.includes("Workshops")) return Compass;
    if (title.includes("Interns")) return Users;
    return Star;
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4 mb-12">
          <Award className="w-6 h-6 text-fuchsia-400" />
          <h2 className="text-xl md:text-2xl font-extrabold text-cyan-300 tracking-widest uppercase">
            ACHIEVEMENTS_CHAMBER
          </h2>
        </div>

        {/* Info Bio */}
        <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed max-w-xl mb-12 select-text">
          Click on any achievement pedestal to download cryptographic validation tokens or trigger celebratory feedback logs.
        </p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 select-text">
          {achievements.map((ach, idx) => {
            const Icon = getIcon(ach.title);
            return (
              <motion.div
                key={idx}
                onClick={triggerCelebration}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 rounded-md p-6 cursor-pointer hover:border-fuchsia-400 hover:bg-fuchsia-500/5 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
              >
                {/* Visual Scanner HUD Highlight */}
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-cyan-400 to-fuchsia-500 opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <span className="text-[9px] text-fuchsia-400 font-bold uppercase tracking-widest block">
                      {ach.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-cyan-200 uppercase tracking-wide mt-1 select-text">
                      {ach.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded border border-cyan-500/20 bg-slate-950/80 flex items-center justify-center text-cyan-300 group-hover:text-fuchsia-400 group-hover:border-fuchsia-500/30 transition-colors">
                    <Icon className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="mt-8 flex items-baseline justify-between gap-4 select-text">
                  <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                    {ach.metric}
                  </span>
                  <span className="text-[8px] text-cyan-500/40 uppercase tracking-widest font-bold group-hover:underline flex items-center gap-1.5">
                    CELEBRATE <Sparkles className="w-2.5 h-2.5" />
                  </span>
                </div>

                <p className="mt-4 pt-4 border-t border-cyan-500/10 text-xs text-slate-300 font-sans leading-relaxed select-text">
                  {ach.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
