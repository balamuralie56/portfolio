'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { experience } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playHover } from '../utils/audio';

export default function Experience() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <Briefcase className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            EXPERIENCE_CORRIDOR
          </h2>
        </div>

        {/* Corridor Grid */}
        <div className="flex flex-col gap-8 relative select-text">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={playHover}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`backdrop-blur-xl border rounded-md p-6 relative transition-all duration-300 shadow-2xl ${
                isDark 
                  ? 'bg-slate-950/90 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'bg-white/70 border-blue-200/50 hover:border-blue-400 hover:bg-blue-50/5 hover:shadow-[0_8px_25px_rgba(59,130,246,0.08)]'
              }`}
            >
              {/* Index Decal */}
              <div className={`absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest ${
                isDark ? 'text-fuchsia-500' : 'text-indigo-600'
              }`}>
                EXP_NODE_0{idx + 1}
              </div>

              {/* Title & Role */}
              <div className={`border-b pb-4 mb-4 select-text ${
                isDark ? 'border-cyan-500/10' : 'border-blue-100'
              }`}>
                <span className={`text-[10px] font-semibold tracking-wider block ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {exp.duration}
                </span>
                <h3 className={`text-lg font-bold uppercase tracking-wide mt-1 ${
                  isDark ? 'text-cyan-200' : 'text-blue-900'
                }`}>
                  {exp.role}
                </h3>
                <span className={`text-sm font-bold ${
                  isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                }`}>{exp.company}</span>
              </div>

              {/* Summary Description */}
              <p className={`text-xs font-sans leading-relaxed select-text mb-4 ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}>
                {exp.description}
              </p>

              {/* Details Bullet Points */}
              <ul className={`flex flex-col gap-2.5 pl-4 relative font-sans text-xs select-text ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {exp.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex gap-2.5 items-start">
                    <ArrowRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      isDark ? 'text-cyan-400' : 'text-blue-600'
                    }`} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
