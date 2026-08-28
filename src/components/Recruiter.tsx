'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download, Mail, Phone, Sparkles, Check, X } from 'lucide-react';
import { personalInfo } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playClick, playHover, playSuccess } from '../utils/audio';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Recruiter() {
  const [showSummary, setShowSummary] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!form.name || !form.email || !form.message) return;
    
    setFormStatus('sending');
    setTimeout(() => {
      playSuccess();
      setFormStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  const handleDownload = () => {
    playClick();
    alert("ATS-optimized resume PDF download initiated!");
  };

  const triggerSummary = () => {
    playSuccess();
    setShowSummary(true);
  };

  return (
    <div id="recruiter-terminal" className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-text relative">
        
        {/* Left Column: ATS Resume & QR Code */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
          {/* ATS Resume Viewer */}
          <div className={`backdrop-blur-xl border p-5 rounded-md relative flex flex-col justify-between shadow-2xl transition-colors duration-500 ${
            isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-white/70 border-blue-200/50'
          }`}>
            <div>
              <div className={`flex items-center gap-2 border-b pb-3 mb-4 ${
                isDark ? 'border-cyan-500/20' : 'border-blue-100'
              }`}>
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className={`font-bold text-xs uppercase tracking-wider ${
                  isDark ? 'text-cyan-300' : 'text-blue-900'
                }`}>ATS_RESUME_MATRIX</span>
              </div>
              
              <div className={`border p-4 rounded text-[10px] leading-relaxed font-sans select-text ${
                isDark ? 'border-cyan-500/15 bg-slate-950 text-slate-300' : 'border-blue-100 bg-slate-50 text-slate-700'
              }`}>
                <div className={`font-mono text-xs font-bold text-center uppercase tracking-widest mb-2 border-b pb-2 ${
                  isDark ? 'border-cyan-500/20 text-cyan-300' : 'border-blue-100 text-blue-950'
                }`}>
                  {personalInfo.name}
                </div>
                <div className="text-center font-mono text-[9px] mb-4 text-cyan-500">
                  {personalInfo.titles.join(" | ")}
                </div>
                <div className="mb-4 text-xs">
                  <span className={`font-mono font-bold text-[9px] uppercase tracking-widest block mb-1 ${
                    isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                  }`}>Summary</span>
                  {personalInfo.summary}
                </div>
                <div className="grid grid-cols-2 gap-3 text-[9px]">
                  <div>
                    <span className={`font-mono font-bold text-[8px] uppercase tracking-widest block mb-1 ${
                      isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                    }`}>Credentials</span>
                    <ul className="list-disc pl-3 flex flex-col gap-0.5">
                      <li>YOLOv11 Edge Deploy</li>
                      <li>PyTorch & TensorRT</li>
                      <li>React / Next.js</li>
                      <li>Supabase Backend</li>
                    </ul>
                  </div>
                  <div>
                    <span className={`font-mono font-bold text-[8px] uppercase tracking-widest block mb-1 ${
                      isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                    }`}>Facilitation</span>
                    <ul className="list-disc pl-3 flex flex-col gap-0.5">
                      <li>22+ Tech Workshops</li>
                      <li>10+ Mentored Interns</li>
                      <li>Guinness World Record</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={handleDownload}
                className={`flex-1 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded cursor-pointer border border-cyan-400/30 hover:from-cyan-400 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 pointer-events-auto`}
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD ATS RESUME</span>
              </button>
              
              <button
                onClick={triggerSummary}
                className={`py-3 px-4 font-bold rounded border cursor-pointer transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-95 pointer-events-auto ${
                  isDark 
                    ? 'border-fuchsia-500/40 text-fuchsia-400 bg-slate-950 hover:bg-fuchsia-500/10 hover:shadow-[0_0_12px_rgba(217,70,239,0.3)]' 
                    : 'border-indigo-200 text-indigo-600 bg-white hover:bg-indigo-50 shadow-md'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Why Hire Me?</span>
              </button>
            </div>
          </div>

          {/* QR Code Card */}
          <div className={`backdrop-blur-xl border p-5 rounded-md relative flex items-center gap-4 shadow-2xl transition-colors duration-500 ${
            isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-white/70 border-blue-200/50'
          }`}>
            <div className={`w-20 h-20 border bg-slate-950 flex items-center justify-center rounded p-1.5 flex-shrink-0 ${
              isDark ? 'border-cyan-500/30' : 'border-blue-200'
            }`}>
              <svg viewBox="0 0 100 100" className={`w-full h-full fill-current ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                <rect x="0" y="0" width="25" height="25" />
                <rect x="5" y="5" width="15" height="15" fill="#020617" />
                <rect x="10" y="10" width="5" height="5" />
                <rect x="75" y="0" width="25" height="25" />
                <rect x="80" y="5" width="15" height="15" fill="#020617" />
                <rect x="85" y="10" width="5" height="5" />
                <rect x="0" y="75" width="25" height="25" />
                <rect x="5" y="80" width="15" height="15" fill="#020617" />
                <rect x="10" y="85" width="5" height="5" />
                <rect x="35" y="10" width="10" height="5" />
                <rect x="55" y="0" width="15" height="5" />
                <rect x="40" y="25" width="5" height="15" />
                <rect x="60" y="20" width="10" height="10" />
                <rect x="30" y="45" width="15" height="5" />
                <rect x="85" y="30" width="5" height="10" />
                <rect x="35" y="70" width="20" height="5" />
                <rect x="65" y="80" width="10" height="15" />
                <rect x="45" y="85" width="15" height="5" />
              </svg>
            </div>
            <div className="flex-1 font-mono text-[10px]">
              <span className={`font-bold uppercase tracking-wider block mb-1 ${
                isDark ? 'text-fuchsia-400' : 'text-indigo-600'
              }`}>SECURE_LINK</span>
              <p className={`font-sans leading-normal select-text ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Scan this QR code to load the digital network portfolio directly on a mobile device.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Channels & Dispatch form */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
          {/* Quick Channels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-auto select-none">
            {[
              { label: "Email", val: personalInfo.contact.email, icon: Mail, url: `mailto:${personalInfo.contact.email}` },
              { label: "Phone", val: personalInfo.contact.phone, icon: Phone, url: `tel:${personalInfo.contact.phone}` },
              { label: "GitHub", val: "Balamurali2002", icon: Github, url: personalInfo.contact.github },
              { label: "LinkedIn", val: "balamurali-e", icon: Linkedin, url: personalInfo.contact.linkedin }
            ].map((chan) => {
              const Icon = chan.icon;
              return (
                <a
                  key={chan.label}
                  href={chan.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className={`border rounded p-3 flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                    isDark 
                      ? 'bg-slate-950/90 border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] text-cyan-300' 
                      : 'bg-white border-blue-200/60 hover:border-blue-500 hover:shadow-[0_4px_12px_rgba(59,130,246,0.08)] text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5 animate-pulse" />
                  <span className={`text-[9px] font-bold uppercase tracking-wider block ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>{chan.label}</span>
                </a>
              );
            })}
          </div>

          {/* Dispatch Communications Form */}
          <div className={`backdrop-blur-xl border p-5 rounded-md relative shadow-2xl transition-colors duration-500 ${
            isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-white/70 border-blue-200/50'
          }`}>
            <div className={`flex items-center gap-2 border-b pb-3 mb-4 ${
              isDark ? 'border-cyan-500/20' : 'border-blue-100'
            }`}>
              <Terminal className="w-4 h-4 text-fuchsia-400" />
              <span className={`font-bold text-xs uppercase tracking-wider ${
                isDark ? 'text-cyan-300' : 'text-blue-900'
              }`}>DISPATCH_COMMS_LINK</span>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 pointer-events-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[9px] uppercase tracking-widest font-bold ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>NAME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`border rounded px-3 py-2 text-xs focus:outline-none transition-colors font-sans ${
                      isDark ? 'bg-slate-900 border-cyan-500/25 text-slate-200 focus:border-cyan-400' : 'bg-white border-blue-200 text-slate-800 focus:border-blue-500'
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[9px] uppercase tracking-widest font-bold ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>EMAIL</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`border rounded px-3 py-2 text-xs focus:outline-none transition-colors font-sans ${
                      isDark ? 'bg-slate-900 border-cyan-500/25 text-slate-200 focus:border-cyan-400' : 'bg-white border-blue-200 text-slate-800 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={`text-[9px] uppercase tracking-widest font-bold ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>MESSAGE</label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`border rounded px-3 py-2 text-xs focus:outline-none transition-colors font-sans ${
                    isDark ? 'bg-slate-900 border-cyan-500/25 text-slate-200 focus:border-cyan-400' : 'bg-white border-blue-200 text-slate-800 focus:border-blue-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-extrabold rounded cursor-pointer transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-[0_0_12px_#d946ef] active:scale-95"
              >
                {formStatus === 'sending' ? (
                  <span>DISPATCHING MSG DATA...</span>
                ) : formStatus === 'success' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>MESSAGE DISPATCHED</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>DISPATCH COMMS</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Floating Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-text">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSummary(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className={`relative w-full max-w-lg rounded-md border p-6 pointer-events-auto shadow-2xl transition-colors duration-500 ${
                isDark 
                  ? 'bg-slate-950/95 border-cyan-500/30 text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.15)]' 
                  : 'bg-white border-blue-200 text-slate-800 shadow-[0_20px_55px_rgba(59,130,246,0.12)]'
              }`}
            >
              <button
                onClick={() => setShowSummary(false)}
                className={`absolute top-4 right-4 p-1 rounded-full border cursor-pointer active:scale-90 ${
                  isDark ? 'border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className={`border-b pb-3 mb-4 ${isDark ? 'border-cyan-500/20' : 'border-blue-100'}`}>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-fuchsia-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI_SYNTH_REPORT</span>
                </div>
                <h3 className={`text-sm font-bold uppercase mt-1 ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>
                  WHY HIRE BALAMURALI E?
                </h3>
              </div>

              <div className={`flex flex-col gap-4 text-xs font-sans leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <div className="flex gap-2.5 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDark ? 'bg-cyan-400' : 'bg-blue-600'}`} />
                  <p>
                    <strong>Proven Technical Leadership</strong>: Led a team of 10 interns at FDAI, successfully launching 6 products and optimizing code cycle iteration times by 40%.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDark ? 'bg-cyan-400' : 'bg-blue-600'}`} />
                  <p>
                    <strong>Edge Deep Learning Expertise</strong>: Builds real-time camera computer vision feeds (YOLOv11, YOLOv8) and runs inference optimizations (TensorRT) on edge engines like NVIDIA Jetson Orin Nano.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDark ? 'bg-cyan-400' : 'bg-blue-600'}`} />
                  <p>
                    <strong>Full-Stack Integration</strong>: Combines backend (FastAPI, Express), databases (Supabase, PostgreSQL, MongoDB), and frontends (Next.js, React Native) for true end-to-end AI software engineering.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDark ? 'bg-cyan-400' : 'bg-blue-600'}`} />
                  <p>
                    <strong>Guinness Coder Record</strong>: Certified online computer programming participant (GUVI & AICTE credential hash BWXi2012106P87q6m2), showing high dedication under intense parameters.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
