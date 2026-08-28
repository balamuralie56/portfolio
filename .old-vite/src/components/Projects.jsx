/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, Cpu, GitFork, ArrowLeft, Play, Server, Layers } from 'lucide-react';
import { playClick, playHover, playSuccess } from '../utils/audio';
import { projects } from '../utils/data';

// Simulation canvases to represent AI actions
const ProjectSim = ({ type }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 180;
    };
    resize();
    window.addEventListener('resize', resize);

    // Simulation settings
    const boxes = [];
    const particles = [];
    const plateChars = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    // Set up particles/objects
    if (type === 'citysense') {
      for (let i = 0; i < 6; i++) {
        boxes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() + 0.2) * 1.5,
          vy: (Math.random() - 0.5) * 0.5,
          w: 40 + Math.random() * 20,
          h: 30 + Math.random() * 15,
          label: Math.random() > 0.4 ? "CAR" : "TRUCK",
          conf: (90 + Math.random() * 9).toFixed(1)
        });
      }
    } else if (type === 'bacteria') {
      for (let i = 0; i < 20; i++) {
        boxes.push({
          x: 40 + Math.random() * (canvas.width - 80),
          y: 30 + Math.random() * (canvas.height - 60),
          r: 5 + Math.random() * 12,
          pulse: Math.random() * Math.PI,
          cType: Math.random() > 0.6 ? "E.coli" : "Staph"
        });
      }
    } else if (type === 'rezoe') {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 3 + 1,
          vy: -Math.random() * 0.8 - 0.2
        });
      }
    } else if (type === 'intrusion') {
      // Intrusion wireframe grid scanner
    }

    const draw = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Cyberpunk grid backdrop
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (type === 'citysense') {
        // Draw highway lanes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animate vehicle tracking
        boxes.forEach((box) => {
          box.x += box.vx;
          if (box.x > canvas.width + box.w) box.x = -box.w;
          
          // Draw bounding box
          ctx.strokeStyle = box.label === 'CAR' ? '#06b6d4' : '#d946ef';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(box.x, box.y, box.w, box.h);
          
          // Draw corner highlights
          ctx.fillStyle = box.label === 'CAR' ? '#22d3ee' : '#f472b6';
          ctx.fillRect(box.x - 2, box.y - 2, 6, 2);
          ctx.fillRect(box.x - 2, box.y - 2, 2, 6);
          ctx.fillRect(box.x + box.w - 4, box.y - 2, 6, 2);
          ctx.fillRect(box.x + box.w - 2, box.y - 2, 2, 6);
          ctx.fillRect(box.x - 2, box.y + box.h - 2, 6, 2);
          ctx.fillRect(box.x - 2, box.y + box.h - 4, 2, 6);
          ctx.fillRect(box.x + box.w - 4, box.y + box.h - 2, 6, 2);
          ctx.fillRect(box.x + box.w - 2, box.y + box.h - 4, 2, 6);

          // Bounding label
          ctx.fillStyle = box.label === 'CAR' ? '#06b6d4' : '#d946ef';
          ctx.font = '8px monospace';
          ctx.fillText(`${box.label} ${box.conf}%`, box.x, box.y - 5);
        });

        // Floating target reticle
        const reticleX = canvas.width / 2 + Math.cos(frame * 0.02) * 50;
        const reticleY = canvas.height / 2 + Math.sin(frame * 0.03) * 30;
        ctx.strokeStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(reticleX, reticleY, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(reticleX - 22, reticleY); ctx.lineTo(reticleX + 22, reticleY);
        ctx.moveTo(reticleX, reticleY - 22); ctx.lineTo(reticleX, reticleY + 22);
        ctx.stroke();
        ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
        ctx.font = '8px monospace';
        ctx.fillText("TARGET LOCK: EDGE_01", reticleX + 20, reticleY - 5);
        
      } else if (type === 'bacteria') {
        // Draw petri dish border
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 85, 0, Math.PI * 2);
        ctx.stroke();

        // Draw and count colonies
        boxes.forEach((colony, idx) => {
          colony.pulse += 0.02;
          const currR = colony.r + Math.sin(colony.pulse) * 0.6;
          
          ctx.fillStyle = colony.cType === 'E.coli' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(217, 70, 239, 0.15)';
          ctx.strokeStyle = colony.cType === 'E.coli' ? '#22d3ee' : '#f472b6';
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.arc(colony.x, colony.y, currR, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Spot center
          ctx.fillStyle = colony.cType === 'E.coli' ? '#06b6d4' : '#d946ef';
          ctx.beginPath();
          ctx.arc(colony.x, colony.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Scan line sweep
        const scanY = (canvas.height / 2) + Math.sin(frame * 0.03) * 80;
        ctx.strokeStyle = 'rgba(217, 70, 239, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 80, scanY);
        ctx.lineTo(canvas.width / 2 + 80, scanY);
        ctx.stroke();

        ctx.fillStyle = '#06b6d4';
        ctx.font = '9px monospace';
        ctx.fillText(`TOTAL COLONY COUNT: ${boxes.length}`, 15, 20);
        ctx.fillText("CV SCANNER ACTIVE: UNET_V2", 15, 32);

      } else if (type === 'rezoe') {
        // Floating cyber real estate nodes
        particles.forEach((p) => {
          p.y += p.vy;
          if (p.y < 0) p.y = canvas.height;
          ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Holographic building mesh wireframe
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.lineWidth = 1;
        const startX = canvas.width / 2 - 50;
        const startY = canvas.height - 15;
        const w = 100;
        const h = 100;
        
        ctx.strokeRect(startX, startY - h, w, h);
        
        // Dynamic valuation line chart
        ctx.strokeStyle = '#d946ef';
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
          const px = i * (canvas.width / 20);
          const py = canvas.height - 40 + Math.sin(i * 0.4 + frame * 0.05) * 20;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        ctx.fillStyle = '#f5f5f7';
        ctx.font = '9px monospace';
        ctx.fillText("AI ESTATE ESTIMATOR // pgvector SEARCH", 15, 20);
        
      } else if (type === 'intrusion') {
        // Intrusion scanner grid
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i += 30) {
          ctx.moveTo(i, 0); ctx.lineTo(i + 20, canvas.height);
        }
        ctx.stroke();

        // Warning trigger box
        const pulse = Math.abs(Math.sin(frame * 0.05));
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.4 + pulse * 0.6})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - 60, canvas.height / 2 - 30, 120, 60);
        
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
        ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 - 30, 120, 60);

        ctx.fillStyle = '#ef4444';
        ctx.font = '10px monospace';
        ctx.fillText("PERIMETER ALERT: INTRUDER DETECTED", canvas.width / 2 - 95, canvas.height / 2 + 5);
        ctx.fillText("SMS DISPATCHED // 5G LINK", canvas.width / 2 - 65, canvas.height / 2 + 20);

      } else if (type === 'numberplate') {
        // Oriented bounding box scanning plate
        ctx.strokeStyle = '#06b6d4';
        ctx.strokeRect(canvas.width / 2 - 80, 70, 160, 45);
        
        ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
        ctx.fillRect(canvas.width / 2 - 80, 70, 160, 45);

        // Character segment highlights
        ctx.strokeStyle = 'rgba(217, 70, 239, 0.5)';
        for (let i = 0; i < 8; i++) {
          ctx.strokeRect(canvas.width / 2 - 70 + i * 17.5, 75, 14, 35);
        }

        // Output read character
        ctx.fillStyle = '#22d3ee';
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText("TN-07-BY-4890", canvas.width / 2, 60);

        ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.font = '9px monospace';
        ctx.fillText("OCR ANALYZER: YOLOv8 + EASYOCR", canvas.width / 2, 135);

      } else if (type === 'certificate') {
        // Rendering certificate frame mockup
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.strokeRect(canvas.width / 2 - 110, 25, 220, 130);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(canvas.width / 2 - 110, 25, 220, 130);

        // Security QR mock block
        ctx.fillStyle = '#d946ef';
        ctx.fillRect(canvas.width / 2 + 70, 115, 30, 30);
        
        // Lines of text
        ctx.fillStyle = '#22d3ee';
        ctx.font = '10px sans-serif';
        ctx.fillText("CERTIFICATE OF EXCELLENCE", canvas.width / 2 - 75, 60);
        
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px sans-serif';
        ctx.fillText("Awarded to: Balamurali E", canvas.width / 2 - 75, 80);
        ctx.fillText("Hash Verified: SHA-256 x87d9f...", canvas.width / 2 - 75, 100);

        ctx.fillStyle = 'rgba(217, 70, 239, 0.7)';
        ctx.font = '8px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`EMAILS DISPATCHED: ${Math.floor(frame / 3) % 1000 + 4200}`, 15, 20);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [type]);

  return <canvas ref={canvasRef} className="w-full rounded bg-slate-950 border border-cyan-500/20 shadow-inner" />;
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (proj) => {
    playSuccess();
    setSelectedProject(proj);
  };

  const closeProject = () => {
    playClick();
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 relative font-mono text-cyan-400">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4 mb-10">
          <FolderGit2 className="w-6 h-6 text-fuchsia-400" />
          <h2 className="text-xl md:text-2xl font-extrabold text-cyan-300 tracking-widest uppercase">
            PROJECT_SHOWCASE
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openProject(proj)}
              onMouseEnter={playHover}
              className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 rounded-md p-5 flex flex-col justify-between min-h-[220px] cursor-pointer hover:border-cyan-400 hover:bg-cyan-500/5 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 relative group shadow-2xl"
            >
              {/* Corner tech decals */}
              <div className="absolute top-2 right-2 text-[8px] text-cyan-400 uppercase tracking-widest font-bold">
                {proj.techStack[0]}
              </div>

              <div>
                <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-2 group-hover:text-fuchsia-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed select-text line-clamp-3">
                  {proj.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-cyan-500/10 flex justify-between items-center text-[10px]">
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {proj.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 border border-cyan-500/20 rounded bg-cyan-950/60 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-fuchsia-400 font-bold group-hover:underline flex items-center gap-1">
                  VIEW_DATA <Play className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Detailed Panel Modal */}
      <FramerAnimatePresence>
        {selectedProject && (
          <framerMotion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <framerMotion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-950 border border-cyan-500/40 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative select-text shadow-2xl"
              style={{ boxShadow: '0 0 35px rgba(6,182,212,0.2)' }}
            >
              {/* Back Button */}
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 md:top-6 md:right-6 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 p-2 rounded cursor-pointer pointer-events-auto transition-colors flex items-center justify-center text-cyan-400"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Title & Stats */}
              <div className="border-b border-cyan-500/20 pb-4 mb-6 pr-8">
                <span className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest font-mono">
                  PROJECT_DIAGNOSTICS_DATA
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold uppercase text-cyan-300 mt-1 select-text">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Area: Tech stack, Simulation Visual, Details */}
                <div className="md:col-span-6 flex flex-col gap-6">
                  {/* Simulation Video Panel */}
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5 font-mono">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" /> SIMULATED_CORE_BEHAVIOR
                    </div>
                    <ProjectSim type={selectedProject.id} />
                  </div>

                  {/* Core Tech Stack */}
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2.5 flex items-center gap-1.5 font-mono">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> INTEGRATED_TECHNOLOGIES
                    </div>
                    <div className="flex flex-wrap gap-1.5 select-text">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs border border-cyan-500/20 rounded bg-cyan-950/60 text-cyan-300 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="text-xs leading-relaxed font-sans text-slate-300 flex flex-col gap-3.5 select-text">
                    <p className="font-bold font-mono text-cyan-400">SYSTEM PROFILE:</p>
                    <p className="border-l-2 border-cyan-500/30 pl-3.5 select-text">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                </div>

                {/* Right Area: Architecture Diagram & Links */}
                <div className="md:col-span-6 flex flex-col gap-6">
                  {/* Architecture Diagram */}
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5 font-mono">
                      <Server className="w-3.5 h-3.5 text-cyan-400" /> PIPELINE_ARCHITECTURE_SCHEMATIC
                    </div>

                    <div className="border border-cyan-500/25 bg-black/70 rounded p-4 flex flex-col gap-3 font-mono text-[10px] select-text">
                      {selectedProject.details.architecture.map((node) => (
                        <div key={node.step} className="flex gap-3 relative group">
                          {/* Dot connector */}
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full border border-cyan-500/40 bg-slate-950 text-cyan-400 font-bold flex items-center justify-center text-[9px] shadow-[0_0_6px_rgba(6,182,212,0.2)]">
                              {node.step}
                            </div>
                            {node.step !== "5" && (
                              <div className="w-[1px] h-full bg-cyan-500/10 min-h-[16px] my-1" />
                            )}
                          </div>
                          
                          <div className="flex-1 pb-1">
                            <span className="text-cyan-200 font-bold uppercase tracking-wider block">
                              {node.title}
                            </span>
                            <span className="text-slate-300 font-sans text-[9px] block mt-0.5 leading-relaxed">
                              {node.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-auto">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 border border-cyan-500/40 hover:bg-cyan-500/10 rounded font-bold cursor-pointer text-xs tracking-widest uppercase flex items-center justify-center gap-2 text-cyan-400 transition-colors"
                    >
                      <GitFork className="w-4 h-4" />
                      <span>GITHUB REPO</span>
                    </a>
                    
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-cyan-500 text-black font-extrabold hover:bg-cyan-400 rounded cursor-pointer text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_12px_#06b6d4] transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE DEMO</span>
                    </a>
                  </div>
                </div>
              </div>
            </framerMotion.div>
          </framerMotion.div>
        )}
      </FramerAnimatePresence>
    </div>
  );
}
