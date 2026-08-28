/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Calendar, BookOpen, Briefcase, Info, Coffee, Radio } from 'lucide-react';
import { playClick, playHover } from '../utils/audio';
import { experience, education } from '../utils/data';

export default function About() {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredDeskItem, setHoveredDeskItem] = useState(null);

  // Dynamically build timeline from resume data models
  const timelineData = [
    ...experience.map((exp, idx) => ({
      id: `exp-${idx}`,
      type: "experience",
      year: exp.duration,
      title: exp.role,
      sub: exp.company,
      desc: exp.description
    })),
    ...education.map((edu, idx) => ({
      id: `edu-${idx}`,
      type: "education",
      year: edu.duration,
      title: edu.degree,
      sub: edu.institution,
      desc: `${edu.score} | Academic Profile`
    }))
  ];

  const filteredTimeline = timelineData.filter(item => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  const deskItems = [
    { name: "NVIDIA Jetson Board", desc: "Optimized with TensorRT pipelines for edge workloads.", icon: Cpu },
    { name: "Synthetic Espresso", desc: "Heuristic caffeine pipeline: 98.4% uptime.", icon: Coffee },
    { name: "AI Camera Feed", desc: "YOLOv11 monitoring sector elements at intersection portals.", icon: Radio }
  ];

  return (
    <div className="min-h-screen py-20 flex flex-col justify-center px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left side: Interactive Digital Desk Mockup */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 rounded-md relative shadow-2xl">
            {/* HUD Header */}
            <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-cyan-500/20 pb-2 mb-4">
              <Cpu className="w-4 h-4 animate-spin-slow" />
              <span>LAB_WORKSTATION_STATE</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans select-text">
              Hover over desk items to activate Balamurali's laboratory equipment and inspect diagnostic logs.
            </p>

            {/* Virtual Desk Interactive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {deskItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      playHover();
                      setHoveredDeskItem(item);
                    }}
                    onMouseLeave={() => setHoveredDeskItem(null)}
                    onClick={playClick}
                    className={`p-4 border rounded cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 backdrop-blur-sm ${
                      hoveredDeskItem?.name === item.name
                        ? 'border-fuchsia-500 bg-fuchsia-500/15 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                        : 'border-cyan-500/20 bg-cyan-950/20 hover:border-cyan-400/50 hover:bg-cyan-500/5'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${hoveredDeskItem?.name === item.name ? 'animate-pulse' : ''}`} />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-200">{item.name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>

            {/* Active Desk Item Diagnostic Display */}
            <div className="min-h-[90px] border border-cyan-500/15 bg-black/60 rounded-md p-3 text-[10px] text-slate-300 leading-relaxed relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[8px] text-cyan-500/40 uppercase tracking-widest font-bold">DESK_TEL</div>
              <AnimatePresence mode="wait">
                {hoveredDeskItem ? (
                  <motion.div
                    key={hoveredDeskItem.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex flex-col gap-1 select-text"
                  >
                    <span className="text-fuchsia-400 font-bold tracking-widest">{hoveredDeskItem.name}</span>
                    <span className="font-sans text-slate-300">{hoveredDeskItem.desc}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-1.5 h-12 text-slate-400"
                  >
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span>HOVER DESK WIDGET TO ACTIVATE READINGS</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right side: Timeline Hologram (Education & Experience) */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 md:p-6 rounded-md relative select-text shadow-2xl">
            {/* Diagonal Grid Accents */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-cyan-400/30 rounded-tr" />
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-fuchsia-400" />
                <span className="font-bold text-lg text-cyan-300 tracking-wider">HOLO_TIMELINE</span>
              </div>
              
              {/* Timeline filters */}
              <div className="flex gap-2">
                {["all", "experience", "education"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-3 py-1 text-[10px] tracking-widest font-bold uppercase rounded cursor-pointer transition-all border ${
                      activeTab === tab
                        ? 'bg-cyan-500 text-black border-cyan-400 font-extrabold shadow-[0_0_10px_#06b6d4]'
                        : 'border-cyan-500/25 text-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-950/20'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* List of timeline items */}
            <div className="relative border-l border-cyan-500/20 ml-2.5 pl-6 flex flex-col gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTimeline.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="relative group"
                  >
                    {/* Floating Node Icon */}
                    <div className="absolute -left-[35px] top-0 w-[18px] h-[18px] rounded-full border border-cyan-400 bg-black flex items-center justify-center shadow-[0_0_8px_#06b6d4] transition-colors group-hover:border-fuchsia-400 group-hover:shadow-[0_0_8px_#d946ef]">
                      {item.type === "experience" ? (
                        <Briefcase className="w-2.5 h-2.5 text-cyan-400 group-hover:text-fuchsia-400" />
                      ) : (
                        <BookOpen className="w-2.5 h-2.5 text-cyan-400 group-hover:text-fuchsia-400" />
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-fuchsia-400 font-bold tracking-widest">{item.year}</span>
                      <h3 className="text-cyan-200 font-bold uppercase text-sm group-hover:text-cyan-100 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-semibold">{item.sub}</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
