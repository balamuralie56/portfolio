'use client';

import React from 'react';
import { Compass, Cpu, Settings } from 'lucide-react';
import { skills } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playHover } from '../utils/audio';

export default function SkillsOverlay() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Group skills by category
  const categories = {
    "AI/ML": skills.filter(s => s.category === "AI/ML" || s.category === "Edge" || s.category === "Core"),
    "Development": skills.filter(s => s.category === "Web" || s.category === "Mobile" || s.category === "Backend" || s.category === "DevOps")
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full select-text flex flex-col lg:flex-row gap-8 items-start justify-between">
        
        {/* Left Side: Orbit Telemetry Instructions */}
        <div className="w-full lg:max-w-xs flex flex-col gap-5">
          <div className={`flex items-center gap-2.5 border-b pb-3 ${
            isDark ? 'border-cyan-500/20' : 'border-blue-200'
          }`}>
            <Compass className={`w-5 h-5 animate-spin-slow ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
            <span className={`text-sm font-bold uppercase tracking-wider ${
              isDark ? 'text-cyan-300' : 'text-blue-800'
            }`}>ORBIT_TELEMETRY</span>
          </div>

          <p className={`font-sans text-[11px] leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            The central 3D core maps current neural engineering vectors. Hover or tap orbiting satellite nodes to retrieve telemetry logs, diagnostic reviews, and active project integrations.
          </p>

          <div className={`p-4 rounded border text-[10px] flex flex-col gap-3 ${
            isDark ? 'bg-slate-950/80 border-cyan-500/20 text-cyan-400/80' : 'bg-white/50 border-blue-200/50 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>ORBIT NODE 01 - 04: Core AI Models</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#76B900]" />
              <span>ORBIT NODE 05 - 08: Edge Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#61DAFB]" />
              <span>ORBIT NODE 09 - 13: Full-Stack Web</span>
            </div>
          </div>
        </div>

        {/* Right Side: Skill Category Cards */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6 select-text">
          {/* AI / ML Core */}
          <div className={`backdrop-blur-xl border p-5 rounded-md shadow-2xl transition-all duration-500 ${
            isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-white/70 border-blue-200/50'
          }`}>
            <div className={`flex items-center gap-2 border-b pb-3 mb-4 ${
              isDark ? 'border-cyan-500/20' : 'border-blue-200'
            }`}>
              <Cpu className={`w-4 h-4 ${isDark ? 'text-fuchsia-400' : 'text-blue-500'}`} />
              <span className={`font-bold text-xs uppercase tracking-wider ${
                isDark ? 'text-cyan-300' : 'text-blue-900'
              }`}>AI_NEURAL_ENG_CORE</span>
            </div>

            <div className="flex flex-col gap-3">
              {categories["AI/ML"].map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={playHover}
                  className={`p-3 rounded border flex flex-col gap-1 transition-all ${
                    isDark 
                      ? 'bg-slate-900/40 border-cyan-500/10 hover:border-cyan-400/40' 
                      : 'bg-white/40 border-blue-200/35 hover:border-blue-300 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-bold uppercase ${isDark ? 'text-cyan-200' : 'text-blue-950'}`}>{s.name}</span>
                    <span className={`text-[9px] uppercase font-bold ${isDark ? 'text-fuchsia-400' : 'text-indigo-600'}`}>{s.category}</span>
                  </div>
                  <p className={`font-sans text-[10px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Full-Stack & Integration */}
          <div className={`backdrop-blur-xl border p-5 rounded-md shadow-2xl transition-all duration-500 ${
            isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-white/70 border-blue-200/50'
          }`}>
            <div className={`flex items-center gap-2 border-b pb-3 mb-4 ${
              isDark ? 'border-cyan-500/20' : 'border-blue-200'
            }`}>
              <Settings className={`w-4 h-4 ${isDark ? 'text-fuchsia-400' : 'text-blue-500'}`} />
              <span className={`font-bold text-xs uppercase tracking-wider ${
                isDark ? 'text-cyan-300' : 'text-blue-900'
              }`}>SYSTEMS_DEV_CORE</span>
            </div>

            <div className="flex flex-col gap-3">
              {categories["Development"].map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={playHover}
                  className={`p-3 rounded border flex flex-col gap-1 transition-all ${
                    isDark 
                      ? 'bg-slate-900/40 border-cyan-500/10 hover:border-cyan-400/40' 
                      : 'bg-white/40 border-blue-200/35 hover:border-blue-300 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-bold uppercase ${isDark ? 'text-cyan-200' : 'text-blue-950'}`}>{s.name}</span>
                    <span className={`text-[9px] uppercase font-bold ${isDark ? 'text-fuchsia-400' : 'text-indigo-600'}`}>{s.category}</span>
                  </div>
                  <p className={`font-sans text-[10px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
