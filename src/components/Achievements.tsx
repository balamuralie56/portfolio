'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Users, Star, Sparkles } from 'lucide-react';
import { achievements } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playHover, playSuccess } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Achievements() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const triggerCelebration = () => {
    playSuccess();
    
    // Burst particles
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const getIcon = (title: string) => {
    if (title.includes("Guinness")) return Award;
    if (title.includes("Workshops")) return Compass;
    if (title.includes("Interns") || title.includes("Lead")) return Users;
    return Star;
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <Award className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            ACHIEVEMENTS_CHAMBER
          </h2>
        </div>

        {/* Info Bio */}
        <p className={`text-xs md:text-sm font-sans leading-relaxed max-w-xl mb-12 select-text ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Click on any achievement pedestal to download validation tokens or trigger celebratory feedback logs.
        </p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 select-text pointer-events-auto">
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
                className={`backdrop-blur-xl border rounded-md p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-2xl ${
                  isDark 
                    ? 'bg-slate-950/90 border-cyan-500/30 hover:border-fuchsia-400 hover:bg-fuchsia-500/5 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]' 
                    : 'bg-white/70 border-blue-200/50 hover:border-indigo-500 hover:bg-indigo-50/5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]'
                }`}
              >
                {/* Visual Highlight Line */}
                <div className={`absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b opacity-50 group-hover:opacity-100 transition-opacity ${
                  isDark ? 'from-cyan-400 to-fuchsia-500' : 'from-blue-500 to-indigo-500'
                }`} />

                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <span className={`text-[9px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                    }`}>
                      {ach.subtitle}
                    </span>
                    <h3 className={`text-base font-bold uppercase tracking-wide mt-1 select-text ${
                      isDark ? 'text-cyan-200' : 'text-blue-900'
                    }`}>
                      {ach.title}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded border flex items-center justify-center transition-all ${
                    isDark 
                      ? 'border-cyan-500/20 bg-slate-950 text-cyan-300 group-hover:text-fuchsia-400 group-hover:border-fuchsia-500/30' 
                      : 'border-blue-200 bg-blue-50 text-blue-600 group-hover:text-indigo-600 group-hover:border-indigo-500/30'
                  }`}>
                    <Icon className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="mt-8 flex items-baseline justify-between gap-4 select-text">
                  <span className={`text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${
                    isDark ? 'from-cyan-400 to-fuchsia-400' : 'from-blue-600 to-indigo-600'
                  }`}>
                    {ach.metric}
                  </span>
                  <span className={`text-[8px] uppercase tracking-widest font-bold group-hover:underline flex items-center gap-1.5 ${
                    isDark ? 'text-cyan-500/40' : 'text-blue-500/40'
                  }`}>
                    CELEBRATE <Sparkles className="w-2.5 h-2.5" />
                  </span>
                </div>

                <p className={`mt-4 pt-4 border-t text-xs font-sans leading-relaxed select-text ${
                  isDark ? 'border-cyan-500/10 text-slate-300' : 'border-blue-100 text-slate-600'
                }`}>
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
