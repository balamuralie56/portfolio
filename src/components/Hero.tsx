'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Download, MessageSquare } from 'lucide-react';
import { playClick, playHover } from '../utils/audio';
import { useTheme } from './ThemeProvider';
import { personalInfo } from '../utils/data';

interface HeroProps {
  onNavigate: (sectionIndex: number) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  // Subtitle rotation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIdx((prev) => (prev + 1) % personalInfo.titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Typing effect for the prompt
  useEffect(() => {
    const fullText = "Building Intelligent Systems for the Future.";
    let i = 0;
    setTypedText("");
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative select-none">
      {/* Immersive Main Intro Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className={`w-full max-w-4xl p-6 md:p-10 rounded-lg backdrop-blur-xl border text-center transition-all duration-500 shadow-2xl relative overflow-hidden ${
          isDark 
            ? 'bg-slate-950/90 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]' 
            : 'bg-white/70 border-blue-200/50 shadow-[0_15px_40px_rgba(59,130,246,0.12)]'
        }`}
      >
        {/* Holographic corners design */}
        <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 ${isDark ? 'border-cyan-400' : 'border-blue-500'}`} />
        <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 ${isDark ? 'border-cyan-400' : 'border-blue-500'}`} />
        <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 ${isDark ? 'border-cyan-400' : 'border-blue-500'}`} />
        <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 ${isDark ? 'border-cyan-400' : 'border-blue-500'}`} />

        {/* Technical Status Decal */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className={`flex h-2 w-2 relative`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
          </span>
          <span className={`font-mono text-[9px] uppercase tracking-widest ${isDark ? 'text-cyan-500/80' : 'text-blue-500/80'}`}>
            ENGINE NODE ONLINE // SYSTEM_V4.0
          </span>
        </div>

        {/* Balamurali E Title */}
        <h1 className={`text-4xl md:text-7xl font-extrabold tracking-tighter uppercase font-mono mb-2 ${
          isDark 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700'
        }`}>
          {personalInfo.name}
        </h1>

        {/* Subtitle Rotator */}
        <div className="h-8 md:h-12 overflow-hidden mb-6">
          <motion.div
            key={subtitleIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`text-base md:text-xl font-bold font-mono tracking-wider ${
              isDark ? 'text-fuchsia-400' : 'text-indigo-600'
            }`}
          >
            &lt; {personalInfo.titles[subtitleIdx]} /&gt;
          </motion.div>
        </div>

        {/* Typing prompt */}
        <div className={`font-mono text-xs md:text-sm max-w-xl mx-auto mb-10 h-10 flex items-center justify-center font-sans ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          <span>{typedText}</span>
          <span className={`inline-block w-1.5 h-4 ml-1 animate-pulse ${
            isDark ? 'bg-cyan-400' : 'bg-blue-600'
          }`} />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto">
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              onNavigate(4); // navigate to Project Universe
            }}
            className={`w-full sm:w-auto px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all border flex items-center justify-center gap-2 active:scale-95 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/20 hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Projects</span>
          </button>
          
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              onNavigate(8); // navigate to Recruiter Mode
            }}
            className={`w-full sm:w-auto px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all border flex items-center justify-center gap-2 active:scale-95 ${
              isDark 
                ? 'bg-black/40 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10' 
                : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>

          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              onNavigate(9); // navigate to AI Assistant / Chatbot
            }}
            className={`w-full sm:w-auto px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all border flex items-center justify-center gap-2 active:scale-95 ${
              isDark 
                ? 'bg-black/40 border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500/10' 
                : 'bg-white border-violet-200 text-violet-600 hover:bg-violet-50/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Me</span>
          </button>
        </div>
      </motion.div>

      {/* Down indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className={`absolute bottom-6 flex flex-col items-center gap-1 font-mono text-[9px] pointer-events-auto cursor-pointer ${
          isDark ? 'text-cyan-500/60' : 'text-blue-500/60'
        }`}
        onClick={() => {
          playClick();
          onNavigate(1);
        }}
      >
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </div>
  );
}
