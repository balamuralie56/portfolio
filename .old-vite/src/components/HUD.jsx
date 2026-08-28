import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Volume2, VolumeX, Cpu, Radio } from 'lucide-react';
import { playClick, startBgm, stopBgm } from '../utils/audio';

const diagnosticLogs = [
  "CONNECTING TO SECURE LAB NETWORK...",
  "AI CORES ONLINE // 100% OPERATIONAL",
  "NVIDIA JETSON EDGE NODE SYNC: STABLE",
  "TENSORRT DEPLOYMENT RUNNING: yolo_v8_model.engine",
  "PARALLEL DYNAMIC GRID DETECTOR ACTIVE",
  "HOLOGRAPHIC TIMELINE SYNCHRONIZED",
  "NEON GRID SHADERS: COMPILING...",
  "DATA PIPELINE SYNCED WITH SUPABASE BACKEND",
  "CHATBOT INTERACTIVE CORE: HOSTING LOCALLY",
  "GUINNESS WORLD RECORD AUTHENTICATED",
  "CYBERPUNK CITY SCANNING IN PROGRESS...",
  "SYSTEM STATUS: ALL SYSTEMS NOMINAL"
];

export default function HUD({ activeSection, totalSections }) {
  const [time, setTime] = useState("");
  const logIndexRef = useRef(0);
  const [logs, setLogs] = useState([diagnosticLogs[0]]);
  const [soundEnabled, setSoundEnabled] = useState(false);

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
    "SEC_01_CORE",
    "SEC_02_DESK",
    "SEC_03_GALAXY",
    "SEC_04_PROJECTS",
    "SEC_05_TUNNEL",
    "SEC_06_CHAMBER",
    "SEC_07_TERMINAL"
  ];

  const scrollPercentage = (activeSection / (totalSections - 1)) * 100;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none flex flex-col justify-between p-4 md:p-6 text-[10px] md:text-xs font-mono text-cyan-400">
      {/* Top HUD Bar */}
      <div className="flex justify-between items-start w-full">
        {/* Left Side Info */}
        <div className="flex items-center gap-3 backdrop-blur-md bg-black/30 border border-cyan-500/20 px-3 py-2 rounded-md pointer-events-auto">
          <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          <div>
            <div className="font-bold text-cyan-300 tracking-wider">BALAMURALI.AI // LAB</div>
            <div className="text-[10px] text-cyan-500/80">LATENCY: 12ms | FPS: 60</div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Clock */}
          <div className="backdrop-blur-md bg-black/30 border border-cyan-500/20 px-3 py-2 rounded-md font-bold tracking-widest text-cyan-300">
            {time || "00:00:00.00"}
          </div>
          
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 backdrop-blur-md bg-black/30 border hover:bg-cyan-500/10 cursor-pointer pointer-events-auto transition-colors px-3 py-2 rounded-md font-bold uppercase tracking-wider text-cyan-400 border-cyan-500/30 active:scale-95"
            style={{ borderImage: 'linear-gradient(to right, #06b6d4, #d946ef) 1' }}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce text-cyan-400" />
                <span className="hidden sm:inline">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-cyan-500/50" />
                <span className="hidden sm:inline">Sound OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Middle Side HUD components: Sector Index (Left), Scroll Progress (Right) */}
      <div className="flex justify-between items-center w-full my-auto h-0">
        {/* Active Sector Indicators */}
        <div className="flex flex-col gap-2 backdrop-blur-md bg-black/10 border border-cyan-500/10 p-3 rounded-md pointer-events-auto select-none mt-20">
          <div className="flex items-center gap-1.5 font-bold text-[10px] text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-1">
            <Radio className="w-3 h-3 animate-ping" /> SECTOR_GRID
          </div>
          {sectorNames.map((name, i) => (
            <div
              key={name}
              className={`transition-all duration-300 flex items-center gap-2 ${
                activeSection === i ? 'text-cyan-300 scale-105 font-bold' : 'text-cyan-500/30'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeSection === i ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 'bg-cyan-500/20'}`} />
              <span className="tracking-wide">{name}</span>
            </div>
          ))}
        </div>

        {/* Scroll Bar */}
        <div className="flex flex-col items-center gap-2 pointer-events-auto mt-20 mr-1 md:mr-3">
          <div className="h-40 w-[2px] bg-cyan-950/55 relative rounded overflow-hidden border border-cyan-500/20">
            <div
              className="w-full bg-gradient-to-b from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_#06b6d4] transition-all duration-100 absolute top-0 left-0"
              style={{ height: `${scrollPercentage}%` }}
            />
          </div>
          <span className="text-[9px] text-cyan-500/60 uppercase tracking-widest rotate-90 origin-center translate-y-6">NAV_GRID</span>
        </div>
      </div>

      {/* Bottom HUD Bar: Diagnostic Terminal logs */}
      <div className="flex flex-col md:flex-row justify-between items-end w-full gap-4">
        {/* Terminal Logs Overlay */}
        <div className="backdrop-blur-md bg-black/40 border border-cyan-500/10 p-3 rounded-md w-full max-w-[280px] md:max-w-md pointer-events-auto flex flex-col gap-1 select-text">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold border-b border-cyan-500/20 pb-1 mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC_FEED</span>
          </div>
          <div className="flex flex-col gap-0.5 text-[9px] md:text-[10px] text-cyan-300/80 leading-relaxed max-h-[60px] overflow-hidden">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-1.5">
                <span className="text-cyan-500/50">&gt;&gt;</span>
                <span className="truncate">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Active Panel Details */}
        <div className="hidden md:flex flex-col items-end backdrop-blur-md bg-black/30 border border-cyan-500/15 p-3 rounded-md text-right">
          <span className="text-fuchsia-400 font-bold tracking-wider">SECTOR LOCATION:</span>
          <span className="text-cyan-300 font-bold text-lg tracking-widest">{sectorNames[activeSection]}</span>
          <span className="text-[9px] text-cyan-500/50">COORDINATE_OFFSET: X={activeSection * 100}, Y=-{activeSection * 50}, Z={activeSection * 250}</span>
        </div>
      </div>
    </div>
  );
}
