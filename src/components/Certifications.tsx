'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { certifications } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playClick, playHover } from '../utils/audio';

export default function Certifications() {
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const nextSlide = () => {
    playClick();
    setCurrent((prev) => (prev + 1) % certifications.length);
  };

  const prevSlide = () => {
    playClick();
    setCurrent((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  const activeCert = certifications[current];

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <Award className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            CERTIFICATIONS_CHAMBER
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center pointer-events-auto select-none">
          {/* Active Card Frame */}
          <div className="w-full max-w-xl relative min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.35 }}
                className={`w-full p-6 rounded-md border flex flex-col justify-between shadow-2xl relative min-h-[240px] ${
                  isDark 
                    ? 'bg-slate-950/90 border-cyan-500/30' 
                    : 'bg-white/70 border-blue-200/50 text-slate-800'
                }`}
              >
                {/* Check Shield Icon */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-bold tracking-wider text-green-500">
                  <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                  <span>SECURE_VERIFIED</span>
                </div>

                <div>
                  <span className={`text-[8px] font-bold uppercase tracking-widest block mb-2 ${
                    isDark ? 'text-cyan-500/60' : 'text-blue-500/60'
                  }`}>
                    VERIFIED CREDENTIAL // NODE_0{current + 1}
                  </span>
                  
                  <h3 className={`text-base md:text-lg font-bold uppercase tracking-wide leading-snug ${
                    isDark ? 'text-cyan-200' : 'text-blue-900'
                  }`}>
                    {activeCert.title}
                  </h3>

                  <div className="flex gap-4 items-center mt-3 font-sans text-xs">
                    <div className="flex flex-col">
                      <span className={isDark ? 'text-slate-400 text-[10px]' : 'text-slate-500 text-[10px]'}>ISSUED BY</span>
                      <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{activeCert.issuer}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={isDark ? 'text-slate-400 text-[10px]' : 'text-slate-500 text-[10px]'}>YEAR</span>
                      <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{activeCert.year}</span>
                    </div>
                  </div>
                </div>

                {/* Crypto Check ID */}
                <div className={`mt-6 pt-4 border-t text-[9px] flex flex-col gap-1 ${
                  isDark ? 'border-cyan-500/10 text-cyan-400/80' : 'border-blue-100 text-blue-600'
                }`}>
                  <span className="font-bold tracking-widest">CREDENTIAL_HASH:</span>
                  <span className={`bg-slate-950 p-2 rounded text-[8px] select-all font-mono break-all ${
                    isDark ? 'text-cyan-300/80 border border-cyan-500/10' : 'text-slate-300 border border-blue-900/10'
                  }`}>
                    SHA256//{activeCert.cred}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={prevSlide}
              onMouseEnter={playHover}
              className={`p-2 rounded border cursor-pointer active:scale-90 transition-colors ${
                isDark ? 'border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-200 text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className={`text-[10px] font-bold ${isDark ? 'text-cyan-400/60' : 'text-blue-500/60'}`}>
              PAGE 0{current + 1} / 0{certifications.length}
            </span>
            <button
              onClick={nextSlide}
              onMouseEnter={playHover}
              className={`p-2 rounded border cursor-pointer active:scale-90 transition-colors ${
                isDark ? 'border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-200 text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
