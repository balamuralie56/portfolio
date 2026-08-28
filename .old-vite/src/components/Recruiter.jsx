/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Download, QrCode, Terminal, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { playClick, playHover, playSuccess } from '../utils/audio';
import { personalInfo, chatbotContext } from '../utils/data';

export default function Recruiter() {
  // Contact Form State
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'sending', 'success', 'error'

  // Chatbot State
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "SECURE CHANNEL ESTABLISHED. I am Balamurali's digital clone. How can I assist your team today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleFormSubmit = (e) => {
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

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    playClick();

    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    // AI simulation delay
    setTimeout(() => {
      let botResponse = chatbotContext.fallback;
      const lowerText = userText.toLowerCase();

      // Find best match in QA pairs
      const matchedPair = chatbotContext.qaPairs.find(pair => 
        lowerText.includes(pair.q) || pair.q.split(' ').every(word => lowerText.includes(word))
      );

      if (matchedPair) {
        botResponse = matchedPair.a;
      } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
        botResponse = "Salutations! I'm online. Ask me about Balamurali's technical skills, experience at FDAI, or achievements.";
      } else if (lowerText.includes("help")) {
        botResponse = "Direct probes include: 'skills', 'experience', 'contact', 'resume', or 'citysense'. What diagnostics do you require?";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      playSuccess();
    }, 1200);
  };

  // Pre-selected Chat suggestions
  const suggestions = [
    "What are your core skills?",
    "Tell me about your Guinness World Record",
    "How can I contact you?",
    "Tell me about CitySense"
  ];

  return (
    <div id="recruiter-terminal" className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-text">
        
        {/* Left Column: ATS Resume & QR Code */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
          {/* Resume Viewer */}
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 rounded-md relative flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">ATS_RESUME_MATRIX</span>
              </div>
              
              <div className="border border-cyan-500/15 bg-slate-950 p-4 rounded text-[10px] text-slate-300 leading-relaxed font-sans select-text">
                <div className="font-mono text-xs font-bold text-cyan-300 text-center uppercase tracking-widest mb-2 border-b border-cyan-500/20 pb-2">
                  {personalInfo.name}
                </div>
                <div className="text-center font-mono text-[9px] mb-4 text-cyan-400">
                  {personalInfo.titles.join(" | ")}
                </div>
                <div className="mb-4">
                  <span className="font-mono font-bold text-[9px] text-fuchsia-400 uppercase tracking-widest block mb-1">Summary</span>
                  {personalInfo.summary}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-mono font-bold text-[9px] text-fuchsia-400 uppercase tracking-widest block mb-1">Credentials</span>
                    <ul className="list-disc pl-3 flex flex-col gap-0.5">
                      <li>YOLOv11 & Edge AI</li>
                      <li>PyTorch & TensorRT</li>
                      <li>React & React Native</li>
                      <li>Supabase & Postgre</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-[9px] text-fuchsia-400 uppercase tracking-widest block mb-1">Facilitation</span>
                    <ul className="list-disc pl-3 flex flex-col gap-0.5">
                      <li>22+ AI Workshops</li>
                      <li>10+ Mentored Interns</li>
                      <li>Guinness World Record</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                alert("ATS optimized resume PDF download initiated!");
              }}
              className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded cursor-pointer border border-cyan-400/30 hover:from-cyan-400 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 pointer-events-auto"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME PDF</span>
            </button>
          </div>

          {/* QR Code Card */}
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 rounded-md relative flex items-center gap-4 shadow-2xl">
            <div className="w-20 h-20 border border-cyan-500/30 bg-slate-950 flex items-center justify-center rounded p-1.5 flex-shrink-0">
              {/* Responsive SVG QR Code */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 fill-current">
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
                <rect x="50" y="40" width="5" height="15" />
                <rect x="70" y="45" width="20" height="10" />
                <rect x="85" y="30" width="5" height="10" />

                <rect x="35" y="70" width="20" height="5" />
                <rect x="65" y="80" width="10" height="15" />
                <rect x="45" y="85" width="15" height="5" />
                <rect x="30" y="60" width="5" height="5" />
                <rect x="60" y="65" width="5" height="10" />
                <rect x="85" y="70" width="10" height="15" />
              </svg>
            </div>
            <div className="flex-1 font-mono text-[10px]">
              <span className="text-fuchsia-400 font-bold uppercase tracking-wider block mb-1">SECURE_LINK</span>
              <p className="text-slate-300 font-sans leading-normal select-text">
                Scan this QR code to load the digital network portfolio directly on a mobile device.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Chatbot & Contact Form */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
          {/* Chatbot Interface */}
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 rounded-md relative flex flex-col h-[320px] shadow-2xl">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">CLONE_TERMINAL_V4</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-fuchsia-400 font-semibold animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Chat Messages Panel */}
            <div className="flex-1 overflow-y-auto mb-3 flex flex-col gap-2.5 p-2 bg-slate-950/80 rounded border border-cyan-500/10 text-[10px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <span className="text-[8px] text-cyan-500/50 uppercase tracking-widest font-bold mb-0.5">
                    {msg.sender === 'user' ? 'USER_PROBE' : 'CLONE_RESPONSE'}
                  </span>
                  <div
                    className={`p-2.5 rounded font-sans leading-relaxed select-text ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600/25 border border-cyan-400/40 text-slate-100'
                        : 'bg-slate-900 border border-cyan-500/10 text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex flex-col items-start max-w-[85%]">
                  <span className="text-[8px] text-cyan-500/50 uppercase tracking-widest font-bold mb-0.5">CLONE_RESPONSE</span>
                  <div className="p-2.5 rounded bg-slate-900 border border-cyan-500/10 text-slate-400 font-sans italic animate-pulse">
                    Typing data stream...
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Suggestions */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(sug);
                  }}
                  className="px-2.5 py-1 text-[9px] border border-cyan-500/25 bg-slate-900 hover:border-cyan-400 text-cyan-300 rounded cursor-pointer whitespace-nowrap transition-colors pointer-events-auto"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleChatSubmit} className="flex gap-2 pointer-events-auto">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter query (e.g. skills, contact)..."
                className="flex-1 bg-slate-900 border border-cyan-500/35 rounded px-3 py-2 text-[10px] text-slate-200 placeholder-cyan-600/30 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-2.5 rounded flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 p-5 rounded-md relative shadow-2xl">
            <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4">
              <Terminal className="w-4 h-4 text-fuchsia-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">DISPATCH_COMMS_LINK</span>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 pointer-events-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">NAME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm(e.target.value)}
                    className="bg-slate-900 border border-cyan-500/25 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm(e.target.value)}
                    className="bg-slate-900 border border-cyan-500/25 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">MESSAGE</label>
                <textarea
                  required
                  rows="3"
                  value={form.message}
                  onChange={(e) => setForm(e.target.value)}
                  className="bg-slate-900 border border-cyan-500/25 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
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
                    <Send className="w-4 h-4" />
                    <span>DISPATCH COMMS</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
