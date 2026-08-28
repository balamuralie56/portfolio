'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Activity, Cpu, Network, Shield, Binary } from 'lucide-react';
import { researchInterests } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playHover } from '../utils/audio';

export default function Research() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getIcon = (name: string) => {
    if (name.includes("Vision")) return Microscope;
    if (name.includes("Multimodal")) return Network;
    if (name.includes("Edge")) return Cpu;
    if (name.includes("Healthcare")) return Activity;
    if (name.includes("Biotechnology")) return Binary;
    return Shield;
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full select-text">
        
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <Microscope className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            RESEARCH_CHAMBER
          </h2>
        </div>

        {/* Info Bio */}
        <p className={`text-xs md:text-sm font-sans leading-relaxed max-w-xl mb-12 select-text ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Reviewing research parameters and academic domains. Balamurali&apos;s research profiles combine computer vision models with real-world edge devices and biotechnological countertops.
        </p>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text pointer-events-auto">
          {researchInterests.map((interest, idx) => {
            const Icon = getIcon(interest.name);
            return (
              <motion.div
                key={idx}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`backdrop-blur-xl border rounded-md p-5 flex flex-col justify-between min-h-[170px] shadow-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-950/90 border-cyan-500/30 hover:border-cyan-400' 
                    : 'bg-white/70 border-blue-200/50 hover:border-blue-500'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className={`text-xs font-bold uppercase tracking-wider leading-snug flex-1 ${
                      isDark ? 'text-cyan-200' : 'text-blue-900'
                    }`}>
                      {interest.name}
                    </h3>
                    <div className={`w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'border-cyan-500/20 bg-slate-950 text-cyan-300' : 'border-blue-100 bg-blue-50 text-blue-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className={`font-sans text-[11px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {interest.desc}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-[8px] uppercase tracking-widest font-bold ${
                  isDark ? 'border-cyan-500/10 text-cyan-500/50' : 'border-blue-100 text-blue-500/50'
                }`}>
                  SEC_FIELD_0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
