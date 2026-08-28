'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, X, Terminal, ExternalLink, Shield, Cpu, Activity, Play, Code } from 'lucide-react';
import { projects, Project } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playClick, playHover, playSweep } from '../utils/audio';

export default function Projects() {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  // Animate mock console text inside modal when project is loaded
  useEffect(() => {
    if (!selectedProj) {
      if (consoleLogs.length > 0) {
        setTimeout(() => {
          setConsoleLogs([]);
        }, 0);
      }
      return;
    }

    const mockLogs = [
      `INITIALIZING SECURITY SHIELD ON '${selectedProj.title.toUpperCase()}'...`,
      "INGESTING REPOSITORY STRUCTURES AND FILES...",
      "COMPILING DYNAMIC SHADER AND TELEMETRY PIPELINES...",
      "SYSTEM STATUS: ONLINE // EXECUTING COMPILED BUNDLES.",
      `RESOLVED DATA STACKS: ${selectedProj.techStack.join(", ")}`
    ];

    setTimeout(() => {
      setConsoleLogs([mockLogs[0]]);
    }, 0);
    
    let progress = 0;
    const timer = setInterval(() => {
      const next = progress + 1;
      if (next < mockLogs.length) {
        setConsoleLogs((curr) => [...curr, mockLogs[next]]);
        progress = next;
      } else {
        clearInterval(timer);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [selectedProj, consoleLogs.length]);

  const openProject = (proj: Project) => {
    playSweep();
    setSelectedProj(proj);
  };

  const closeProject = () => {
    playClick();
    setSelectedProj(null);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-6xl mx-auto w-full select-none">
        
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <FolderGit2 className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            PROJECT_UNIVERSE
          </h2>
        </div>

        {/* Info Bio */}
        <p className={`text-xs md:text-sm font-sans leading-relaxed max-w-xl mb-12 select-text ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Explore Balamurali&apos;s 10 major project architectures. Click on any sector grid to review internal schema pipelines, core features, and live repositories.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 select-text">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              onClick={() => openProject(proj)}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`backdrop-blur-xl border rounded-md p-5 cursor-pointer flex flex-col justify-between h-[230px] group transition-all duration-300 shadow-2xl relative overflow-hidden ${
                isDark 
                  ? 'bg-slate-950/90 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1' 
                  : 'bg-white/70 border-blue-200/50 hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] hover:-translate-y-1'
              }`}
            >
              {/* Dynamic top bar decoration */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-indigo-600' : 'from-blue-500 to-indigo-500'
              } opacity-40 group-hover:opacity-100 transition-opacity`} />

              <div>
                {/* Index Decal */}
                <div className="flex justify-between items-center text-[8px] font-bold mb-3 uppercase tracking-widest">
                  <span className={isDark ? 'text-cyan-500/80' : 'text-blue-500/80'}>{proj.category}</span>
                  <span className={isDark ? 'text-fuchsia-400' : 'text-indigo-600'}>GRID_NODE_0{idx + 1}</span>
                </div>

                {/* Title */}
                <h3 className={`text-base font-extrabold uppercase tracking-wide group-hover:text-cyan-300 transition-colors ${
                  isDark ? 'text-cyan-200' : 'text-blue-900'
                }`}>
                  {proj.title}
                </h3>

                {/* Summary */}
                <p className={`text-[11px] font-sans leading-relaxed mt-2 line-clamp-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {proj.description}
                </p>
              </div>

              {/* Tags & Actions footer */}
              <div className="mt-4 pt-3 border-t border-cyan-500/10 flex justify-between items-center text-[9px]">
                <div className="flex gap-1.5 flex-wrap max-w-[70%]">
                  {proj.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        isDark ? 'bg-cyan-950/40 text-cyan-400/80' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className={`font-bold flex items-center gap-1 group-hover:underline ${
                  isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                }`}>
                  DIAGNOSE <Play className="w-2 h-2 animate-pulse" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Immersive Project Modal Details */}
        <AnimatePresence>
          {selectedProj && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeProject}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-md border p-6 pointer-events-auto shadow-2xl transition-colors duration-500 ${
                  isDark 
                    ? 'bg-slate-950/95 border-cyan-500/30 text-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.15)]' 
                    : 'bg-white border-blue-200 text-slate-800 shadow-[0_20px_50px_rgba(59,130,246,0.15)]'
                }`}
              >
                {/* Close Button */}
                <button
                  onClick={closeProject}
                  className={`absolute top-4 right-4 p-1.5 rounded-full border cursor-pointer active:scale-90 ${
                    isDark ? 'border-cyan-500/25 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className={`border-b pb-4 mb-6 ${
                  isDark ? 'border-cyan-500/20' : 'border-blue-100'
                }`}>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${
                    isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                  }`}>
                    PROJECT_TELEMETRY // {selectedProj.category.toUpperCase()}
                  </span>
                  <h3 className={`text-xl font-bold uppercase mt-1 ${
                    isDark ? 'text-cyan-300' : 'text-blue-900'
                  }`}>
                    {selectedProj.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Diagnostics logs & Features */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    {/* Live Interface Preview Screenshot if available */}
                    {selectedProj.details.screenshot && (
                      <div className={`border rounded overflow-hidden relative group transition-all duration-300 ${
                        isDark ? 'border-cyan-500/20 hover:border-cyan-500/40 bg-slate-950/40' : 'border-blue-200 hover:border-blue-300 shadow-sm bg-white/40'
                      }`}>
                        <div className={`text-[8px] font-bold px-3 py-1.5 border-b uppercase tracking-widest flex items-center justify-between ${
                          isDark ? 'border-cyan-500/15 bg-slate-950/80 text-cyan-300' : 'border-blue-100 bg-blue-50/50 text-blue-800'
                        }`}>
                          <span>INTELLIGENT_INTERFACE_SCAN.IMG</span>
                          <span className="animate-pulse">ONLINE</span>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedProj.details.screenshot}
                          alt={`${selectedProj.title} Screenshot`}
                          className="w-full h-auto max-h-[220px] object-cover"
                        />
                      </div>
                    )}

                    {/* Live Console Logs */}
                    <div className="border border-cyan-500/15 bg-slate-950 p-4 rounded flex flex-col gap-1.5 font-mono text-[9px] text-cyan-400/90 select-text max-h-[140px] overflow-y-auto">
                      <div className="flex items-center gap-1.5 border-b border-cyan-500/20 pb-1 mb-1.5 font-bold">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>MOD_DIAGNOSTICS.LOG</span>
                      </div>
                      {consoleLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-1.5">
                          <span className="text-cyan-500/40">&gt;&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features checklist */}
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 ${
                        isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                      }`}>
                        <Shield className="w-3.5 h-3.5" /> CORE_SPECIFICATIONS
                      </h4>
                      <ul className="flex flex-col gap-2 pl-4 text-xs font-sans">
                        {selectedProj.features.map((feature, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                              isDark ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 'bg-blue-600'
                            }`} />
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack tags */}
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 ${
                        isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                      }`}>
                        <Cpu className="w-3.5 h-3.5" /> COMPILED_DEPENDENCY_STACK
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                              isDark ? 'bg-slate-900 border border-cyan-500/20 text-cyan-300' : 'bg-blue-50 border border-blue-100 text-blue-800'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Architecture flows & Links */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Architecture flow grid */}
                    <div className={`p-4 rounded border ${
                      isDark ? 'bg-slate-900/40 border-cyan-500/15' : 'bg-slate-50 border-blue-100'
                    }`}>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-1.5 ${
                        isDark ? 'text-cyan-300' : 'text-blue-900'
                      }`}>
                        <Activity className="w-3.5 h-3.5" /> ARCHITECT_FLOW
                      </h4>
                      <div className="flex flex-col gap-3 relative pl-4 text-[10px] font-sans">
                        <div className={`absolute top-1 bottom-1 left-1 w-[1px] border-l border-dashed ${
                          isDark ? 'border-cyan-500/30' : 'border-blue-300'
                        }`} />
                        {selectedProj.details.architecture.map((step) => (
                          <div key={step.step} className="relative flex gap-3 items-start">
                            {/* Point badge */}
                            <span className={`absolute -left-[20px] w-3 h-3 rounded-full text-[7px] font-mono font-bold flex items-center justify-center border ${
                              isDark ? 'bg-slate-950 border-cyan-400 text-cyan-300' : 'bg-white border-blue-600 text-blue-600'
                            }`}>
                              {step.step}
                            </span>
                            <div>
                              <span className={`font-mono font-bold uppercase block text-[9px] ${
                                isDark ? 'text-cyan-200' : 'text-blue-900'
                              }`}>{step.title}</span>
                              <span className={`text-[10px] ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}>{step.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions Links */}
                    <div className="flex gap-3 pointer-events-auto">
                      <a
                        href={selectedProj.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex-1 py-3 border text-center font-bold font-mono text-xs uppercase tracking-wider rounded cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95 ${
                          isDark 
                            ? 'bg-slate-950 border-cyan-500/35 text-cyan-400 hover:bg-cyan-500/10' 
                            : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Code className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                      
                      <a
                        href={selectedProj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex-1 py-3 text-center font-bold font-mono text-xs uppercase tracking-wider rounded cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95 ${
                          isDark 
                            ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400/20 hover:from-cyan-400' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
