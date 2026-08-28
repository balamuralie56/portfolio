'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Volume2, VolumeX, Cpu, Radio, Sun, Moon } from 'lucide-react';
import { playClick, startBgm, stopBgm } from '../utils/audio';
import { useTheme } from './ThemeProvider';

const diagnosticLogs = [
  "CONNECTING TO SECURE LAB NETWORK...",
  "AI CORES ONLINE // 100% OPERATIONAL",
  "NVIDIA JETSON EDGE NODE SYNC: STABLE",
  "TENSORRT DEPLOYMENT RUNNING: yolo_v11_model.engine",
  "PARALLEL DYNAMIC GRID DETECTOR ACTIVE",
  "HOLOGRAPHIC TIMELINE SYNCHRONIZED",
  "NEON GRID SHADERS: COMPILING...",
  "DATA PIPELINE SYNCED WITH SUPABASE BACKEND",
  "CHATBOT INTERACTIVE CORE: HOSTING LOCALLY",
  "GUINNESS WORLD RECORD AUTHENTICATED",
  "SYSTEM STATUS: ALL SYSTEMS NOMINAL"
];

interface HUDProps {
  activeSection: number;
  totalSections: number;
}

export default function HUD({ activeSection, totalSections }: HUDProps) {
  const [time, setTime] = useState("");
  const logIndexRef = useRef(0);
  const [logs, setLogs] = useState([diagnosticLogs[0]]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      const secs = String(date.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
      setTime(`${hours}:${mins}:${secs}.${ms}`);
    };
    const timer = setInterval(updateTime, 50);
    return () => clearInterval(timer);
  }, []);

  // Scrolling System Logs
  useEffect(() => {
    const interval = setInterval(() => {
      logIndexRef.current = (logIndexRef.current + 1) % diagnosticLogs.length;
      const nextLog = diagnosticLogs[logIndexRef.current];
      setLogs((curr) => {
        const updated = [...curr, nextLog];
        if (updated.length > 4) updated.shift();
        return updated;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    playClick();
    if (soundEnabled) {
      stopBgm();
      setSoundEnabled(false);
    } else {
      startBgm();
      setSoundEnabled(true);
    }
  };

  const sectorNames = [
    "SEC_01_HERO",
    "SEC_02_ABOUT",
    "SEC_03_SKILLS",
    "SEC_04_CORRIDOR",
    "SEC_05_UNIVERSE",
    "SEC_06_CHAMBER",
    "SEC_07_CERTS",
    "SEC_08_RESEARCH",
    "SEC_09_RECRUITER",
    "SEC_10_ASSISTANT"
  ];

  const scrollPercentage = (activeSection / (totalSections - 1)) * 100;

  // Theme-specific style variables
  const isDark = theme === 'dark';
  
  return (
    <div className={`fixed inset-0 pointer-events-none z-45 select-none flex flex-col justify-between p-4 md:p-6 text-[10px] md:text-xs font-mono transition-colors duration-500 ${
      isDark ? 'text-cyan-400' : 'text-blue-600'
    }`}>
      {/* Top HUD Bar */}
      <div className="flex justify-between items-start w-full">
        {/* Left Side Info */}
        <div className={`flex items-center gap-3 backdrop-blur-md px-3 py-2 rounded-md pointer-events-auto border transition-colors ${
          isDark 
            ? 'bg-black/30 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
            : 'bg-white/60 border-blue-200/50 shadow-[0_4px_12px_rgba(59,130,246,0.08)]'
        }`}>
          <Cpu className={`w-4 h-4 animate-pulse ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
          <div>
            <div className={`font-bold tracking-wider ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
              BALAMURALI.AI // LAB
            </div>
            <div className={`text-[10px] ${isDark ? 'text-cyan-500/80' : 'text-blue-500/80'}`}>
              PLATFORM: {theme.toUpperCase()}_MODE | LATENCY: 14ms
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
          {/* Theme Toggle Switcher */}
          <button
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            className={`flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all active:scale-95 ${
              isDark 
                ? 'bg-black/30 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_8px_#06b6d4]' 
                : 'bg-white/60 border-blue-200/50 text-blue-600 hover:bg-blue-50/50 hover:shadow-[0_4px_10px_rgba(59,130,246,0.15)]'
            }`}
            title="Toggle theme mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Clock */}
          <div className={`backdrop-blur-md px-3 py-2 rounded-md font-bold tracking-widest border transition-colors ${
            isDark 
              ? 'bg-black/30 border-cyan-500/20 text-cyan-300' 
              : 'bg-white/60 border-blue-200/50 text-blue-700'
          }`}>
            {time || "00:00:00.00"}
          </div>
          
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 backdrop-blur-md border cursor-pointer transition-all px-3 py-2 rounded-md font-bold uppercase tracking-wider active:scale-95 ${
              isDark 
                ? 'bg-black/30 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10' 
                : 'bg-white/60 border-blue-200/50 text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span className="hidden sm:inline">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 opacity-50" />
                <span className="hidden sm:inline">Sound OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Middle Side HUD components: Sector Index (Left), Scroll Progress (Right) */}
      <div className="flex justify-between items-center w-full my-auto h-0">
        {/* Active Sector Indicators */}
        <div className={`flex flex-col gap-1.5 backdrop-blur-md border p-3 rounded-md pointer-events-auto select-none mt-20 transition-all ${
          isDark 
            ? 'bg-black/20 border-cyan-500/10' 
            : 'bg-white/40 border-blue-200/40 shadow-sm'
        }`}>
          <div className={`flex items-center gap-1.5 font-bold text-[9px] border-b pb-1 mb-1 ${
            isDark ? 'text-fuchsia-400 border-fuchsia-500/30' : 'text-blue-600 border-blue-200'
          }`}>
            <Radio className="w-3 h-3 animate-ping" /> SECTOR_GRID
          </div>
          {sectorNames.map((name, i) => (
            <div
              key={name}
              className={`transition-all duration-300 flex items-center gap-2 text-[9px] ${
                activeSection === i 
                  ? isDark 
                    ? 'text-cyan-300 scale-105 font-bold' 
                    : 'text-blue-700 scale-105 font-bold'
                  : isDark 
                    ? 'text-cyan-500/30' 
                    : 'text-blue-500/30'
              }`}
            >
              <div className={`w-1 h-1 rounded-full ${
                activeSection === i 
                  ? isDark 
                    ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' 
                    : 'bg-blue-600 shadow-[0_0_8px_#3b82f6]' 
                  : 'bg-slate-500/25'
              }`} />
              <span className="tracking-wide">{name}</span>
            </div>
          ))}
        </div>

        {/* Scroll Bar */}
        <div className="flex flex-col items-center gap-2 pointer-events-auto mt-20 mr-1 md:mr-3">
          <div className={`h-40 w-[2px] relative rounded overflow-hidden border ${
            isDark ? 'bg-cyan-950/25 border-cyan-500/20' : 'bg-blue-100 border-blue-200'
          }`}>
            <div
              className={`w-full transition-all duration-100 absolute top-0 left-0 ${
                isDark 
                  ? 'bg-gradient-to-b from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_#06b6d4]' 
                  : 'bg-gradient-to-b from-blue-400 to-indigo-600'
              }`}
              style={{ height: `${scrollPercentage}%` }}
            />
          </div>
          <span className={`text-[8px] uppercase tracking-widest rotate-90 origin-center translate-y-6 ${
            isDark ? 'text-cyan-500/50' : 'text-blue-500/50'
          }`}>NAV_GRID</span>
        </div>
      </div>

      {/* Bottom HUD Bar: Diagnostic Terminal logs */}
      <div className="flex flex-col md:flex-row justify-between items-end w-full gap-4">
        {/* Terminal Logs Overlay */}
        <div className={`backdrop-blur-md border p-3 rounded-md w-full max-w-[280px] md:max-w-md pointer-events-auto flex flex-col gap-1 select-text transition-colors duration-500 ${
          isDark 
            ? 'bg-black/40 border-cyan-500/10' 
            : 'bg-white/60 border-blue-200/40 shadow-sm'
        }`}>
          <div className={`flex items-center gap-1.5 font-bold border-b pb-1 mb-1 ${
            isDark ? 'text-cyan-400 border-cyan-500/20' : 'text-blue-700 border-blue-200'
          }`}>
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC_FEED</span>
          </div>
          <div className={`flex flex-col gap-0.5 text-[8px] md:text-[9px] leading-relaxed max-h-[60px] overflow-hidden ${
            isDark ? 'text-cyan-300/80' : 'text-blue-600/80'
          }`}>
            {logs.map((log, index) => (
              <div key={index} className="flex gap-1.5">
                <span className={isDark ? 'text-cyan-500/40' : 'text-blue-500/40'}>&gt;&gt;</span>
                <span className="truncate">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Active Panel Details */}
        <div className={`hidden md:flex flex-col items-end backdrop-blur-md border p-3 rounded-md text-right transition-colors duration-500 ${
          isDark 
            ? 'bg-black/30 border-cyan-500/15' 
            : 'bg-white/60 border-blue-200/30'
        }`}>
          <span className={isDark ? 'text-fuchsia-400 font-bold tracking-wider' : 'text-indigo-600 font-bold tracking-wider'}>
            SECTOR LOCATION:
          </span>
          <span className={`font-bold text-base tracking-widest ${isDark ? 'text-cyan-300' : 'text-blue-800'}`}>
            {sectorNames[activeSection]}
          </span>
          <span className={`text-[8px] ${isDark ? 'text-cyan-500/50' : 'text-blue-500/50'}`}>
            COORDINATE: X={activeSection * 100}, Y=-{activeSection * 50}, Z={activeSection * 200}
          </span>
        </div>
      </div>
    </div>
  );
}
