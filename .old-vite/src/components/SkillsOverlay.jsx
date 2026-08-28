/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, Sparkles, Star } from 'lucide-react';
import { playClick, playHover } from '../utils/audio';
import { skills } from '../utils/data';

export default function SkillsOverlay({ hoveredSkill, activeSkill, onSelectSkill }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Core", "AI/ML", "Edge", "Mobile", "Backend"];
  
  const filteredSkills = skills.filter(s => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  const displaySkill = hoveredSkill || activeSkill || skills[0];

  return (
    <div className="min-h-screen py-20 flex flex-col justify-center px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Skills Categorized Panel */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 md:p-6 rounded-md relative flex-1 shadow-2xl">
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-cyan-400/30 rounded-tl" />
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Orbit className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                <span className="font-bold text-lg text-cyan-300 tracking-wider">SKILLS_GALAXY</span>
              </div>
              
              {/* Category Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2 py-0.5 text-[9px] tracking-wider font-bold uppercase rounded cursor-pointer transition-all border ${
                      selectedCategory === cat
                        ? 'bg-fuchsia-500 text-black border-fuchsia-400 font-extrabold shadow-[0_0_10px_#d946ef]'
                        : 'border-cyan-500/20 text-cyan-500/60 hover:text-cyan-300 hover:bg-cyan-950/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6 select-text">
              Our 3D engine represents Balamurali's tech stack as orbiting planets. Click on any planetary node to target it, or hover below to inspect system details.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSkills.map((s) => {
                const isSelected = activeSkill?.name === s.name;
                const isHovered = hoveredSkill?.name === s.name;
                
                return (
                  <button
                    key={s.name}
                    onMouseEnter={() => {
                      playHover();
                      onSelectSkill(s, true); // true for hover
                    }}
                    onMouseLeave={() => {
                      onSelectSkill(null, true);
                    }}
                    onClick={() => {
                      playClick();
                      onSelectSkill(s, false); // false for permanent select
                    }}
                    className={`flex items-center justify-between p-3.5 border rounded cursor-pointer transition-all duration-300 text-left backdrop-blur-sm ${
                      isSelected || isHovered
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.2)] scale-[1.02]'
                        : 'border-cyan-500/15 bg-cyan-950/30 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_6px_var(--planet-color)]"
                        style={{ 
                          backgroundColor: s.color,
                          '--planet-color': s.color 
                        }}
                      />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-100">{s.name}</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 border border-cyan-500/20 rounded bg-cyan-950/60 text-cyan-400 font-semibold select-text">
                      {s.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Skill HUD Info Card */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-1 lg:order-2">
          <div className="backdrop-blur-xl bg-gradient-to-br from-slate-950 to-cyan-950/30 border border-cyan-500/30 p-5 md:p-6 rounded-md relative flex flex-col justify-between min-h-[300px] select-text shadow-2xl">
            {/* Holographic scanner effect line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanner pointer-events-none" />
            
            <div className="flex justify-between items-start border-b border-cyan-500/20 pb-3 mb-4">
              <div>
                <div className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest font-mono">PLANETARY_NODE_DATA</div>
                <h3 className="text-xl font-extrabold tracking-widest text-cyan-300 uppercase mt-1">
                  {displaySkill.name}
                </h3>
              </div>
              <div 
                className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center shadow-[0_0_12px_var(--pcolor)]"
                style={{ 
                  borderColor: displaySkill.color,
                  '--pcolor': displaySkill.color 
                }}
              >
                <Star 
                  className="w-4 h-4" 
                  style={{ color: displaySkill.color }} 
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 text-xs font-sans text-slate-300">
              <p className="leading-relaxed border-l-2 border-cyan-500/30 pl-3.5 py-1 select-text">
                {displaySkill.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="border border-cyan-500/10 bg-black/60 rounded p-2.5 font-mono">
                  <div className="text-[8px] text-cyan-500/50 uppercase tracking-widest font-bold">ORBITAL_SPEED</div>
                  <div className="text-cyan-300 font-bold mt-1 text-sm">{displaySkill.speed} AU/s</div>
                </div>
                <div className="border border-cyan-500/10 bg-black/60 rounded p-2.5 font-mono">
                  <div className="text-[8px] text-cyan-500/50 uppercase tracking-widest font-bold">GRAVITATIONAL_PULL</div>
                  <div className="text-cyan-300 font-bold mt-1 text-sm">{displaySkill.size} G</div>
                </div>
              </div>
            </div>

            <div className="border-t border-cyan-500/15 pt-4 mt-6 text-[9px] font-mono text-cyan-500/60 uppercase tracking-widest flex justify-between">
              <span>SECTOR: ORBIT_COORDINATE</span>
              <span>NODE_OK // 200</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
