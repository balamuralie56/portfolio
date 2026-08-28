/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Sparkles } from 'lucide-react';
import { playClick } from '../utils/audio';

export default function Hero({ onEnterLab }) {
  const [typedText, setTypedText] = useState("");
  const introString = "Deep Learning Engineer | Technical Lead | Full Stack AI Developer";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + introString.charAt(index));
      index++;
      if (index >= introString.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-4 text-center select-none font-mono">
      {/* Decorative Cybernetic Frame */}
      <div className="absolute top-[15%] w-full max-w-4xl border border-cyan-500/10 h-[60vh] pointer-events-none flex justify-between p-2">
        <div className="border-t-2 border-l-2 border-cyan-400 w-6 h-6" />
        <div className="border-t-2 border-r-2 border-fuchsia-400 w-6 h-6" />
        <div className="self-end border-b-2 border-l-2 border-fuchsia-400 w-6 h-6" />
        <div className="self-end border-b-2 border-r-2 border-cyan-400 w-6 h-6" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 max-w-3xl"
      >
        {/* Hacker Code Title tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-full text-cyan-400 text-xs uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>PROJECT_BALAMURALI_AI_LAB_V4.0</span>
        </div>

        {/* Big Neon Title */}
        <h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase relative select-text"
          style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(217, 70, 239, 0.2)' }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-500">
            BALAMURALI E
          </span>
        </h1>

        {/* Typing Intro sub-header */}
        <div className="mt-6 min-h-[24px] text-cyan-300 font-bold text-sm md:text-base tracking-widest select-text">
          <span>{typedText}</span>
          <span className="animate-ping ml-1 text-fuchsia-500">|</span>
        </div>

        {/* Short bio */}
        <p className="mt-8 text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-sans select-text">
          Building computer vision pipelines at the edge, scaling hybrid cloud AI architectures, and orchestrating deep neural nets. Explore the futuristic smart city lab workspace below.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              playClick();
              onEnterLab();
            }}
            className="w-48 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded cursor-pointer border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] hover:from-cyan-400 hover:to-indigo-500 transition-all active:scale-95 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            <span>ENTER LAB</span>
          </button>
          
          <a
            href="#recruiter-terminal"
            onClick={playClick}
            className="w-48 py-3 border border-fuchsia-500/50 hover:border-fuchsia-400 bg-black/40 hover:bg-fuchsia-500/10 text-fuchsia-400 font-bold rounded cursor-pointer transition-all active:scale-95 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>RECRUITER MODE</span>
          </a>
        </div>
      </motion.div>

      {/* Background HUD Matrix Decals */}
      <div className="absolute bottom-[10%] text-cyan-500/20 text-[9px] flex gap-8 select-none pointer-events-none hidden md:flex">
        <span>LOC_X: 43.19.88</span>
        <span>SECTOR: GRID_CORE</span>
        <span>SYS_STATUS: ACTIVE</span>
        <span>NODE: LAB_01</span>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1.5 text-cyan-400/60 animate-bounce">
        <span className="text-[9px] tracking-widest">SCROLL_DOWN</span>
        <div className="w-1.5 h-3 border border-cyan-400 rounded-full flex justify-center p-[2px]">
          <div className="w-0.5 h-1 bg-cyan-400 rounded-full animate-scroll-dot" />
        </div>
      </div>
    </div>
  );
}
