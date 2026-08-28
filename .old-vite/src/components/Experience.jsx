/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { playHover } from '../utils/audio';
import { experience } from '../utils/data';

export default function Experience() {
  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4 mb-12">
          <Briefcase className="w-6 h-6 text-cyan-400 animate-pulse" />
          <h2 className="text-xl md:text-2xl font-extrabold text-cyan-300 tracking-widest uppercase">
            EXPERIENCE_CORRIDOR
          </h2>
        </div>

        {/* Timeline Corridor Grid */}
        <div className="flex flex-col gap-8 relative select-text">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={playHover}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 rounded-md p-6 relative hover:border-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 shadow-2xl"
            >
              {/* Index Decal */}
              <div className="absolute top-4 right-4 text-[9px] text-fuchsia-500 font-bold uppercase tracking-widest">
                EXP_NODE_0{idx + 1}
              </div>

              {/* Title & Role */}
              <div className="border-b border-cyan-500/10 pb-4 mb-4 select-text">
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider block">
                  {exp.duration}
                </span>
                <h3 className="text-lg font-bold text-cyan-200 uppercase tracking-wide mt-1">
                  {exp.role}
                </h3>
                <span className="text-sm text-fuchsia-400 font-bold">{exp.company}</span>
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-200 font-sans leading-relaxed select-text mb-4">
                {exp.description}
              </p>

              {/* Details Bullet Points */}
              <ul className="flex flex-col gap-2.5 pl-4 relative font-sans text-xs text-slate-300 select-text">
                {exp.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex gap-2.5 items-start">
                    <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-cyan-400 flex-shrink-0" />
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
