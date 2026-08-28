'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bot } from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';
import { chatbotContext } from '../utils/data';
import { useTheme } from './ThemeProvider';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface AIChatbotProps {
  onNavigate: (sectionIdx: number) => void;
}

export default function AIChatbot({ onNavigate }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "SECURE CHANNEL ESTABLISHED. I am Balamurali's digital twin clone. Ask me about my deep learning, projects, or contact details." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const submitQuery = (text: string) => {
    if (!text.trim()) return;
    playClick();

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = chatbotContext.fallback;
      const lower = text.toLowerCase();

      // Find best match in QA pairs
      const matched = chatbotContext.qaPairs.find((pair) => 
        lower.includes(pair.q) || pair.q.split(' ').every(word => lower.includes(word))
      );

      if (matched) {
        botResponse = matched.a;
      } else if (lower.includes("hello") || lower.includes("hi")) {
        botResponse = "Salutations! I'm online. Ask me about Balamurali's technical skills, experience at FDAI, or achievements.";
      } else if (lower.includes("resume")) {
        botResponse = "You can download my ATS-optimized, high-fidelity resume from the Recruiter Mode panel in Sector 09. Would you like to jump there?";
        onNavigate(8); // Navigate to Recruiter Mode
      } else if (lower.includes("project")) {
        botResponse = "I have developed 10 major project architectures including ForgeAI (local LLM OS) and CitySense (YOLOv11 edge monitoring). Jump to Sector 05 to inspect them!";
        onNavigate(4); // Navigate to projects
      } else if (lower.includes("contact")) {
        botResponse = "You can reach me directly via email at balamuralie56@gmail.com, call +91 90872 77096, or check out Sector 09 for all links.";
        onNavigate(8); // Navigate to recruiter
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      playSuccess();
    }, 1200);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(inputValue);
  };

  const suggestions = [
    "Tell me about CitySense",
    "Tell me about ForgeAI",
    "What are your core skills?",
    "Show Resume",
    "Contact Balamurali"
  ];

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <MessageSquare className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            CLONE_TERMINAL_V4
          </h2>
        </div>

        {/* Chat Interface Container */}
        <div className={`backdrop-blur-xl border p-5 rounded-md relative flex flex-col h-[420px] shadow-2xl transition-colors duration-500 ${
          isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-white/70 border-blue-200/50'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 mb-3 ${
            isDark ? 'border-cyan-500/20' : 'border-blue-100'
          }`}>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span className={`font-bold text-xs uppercase tracking-wider ${
                isDark ? 'text-cyan-300' : 'text-blue-900'
              }`}>CLONE_BOT_V4</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-fuchsia-400 font-semibold animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Chat Messages Panel */}
          <div className={`flex-1 overflow-y-auto mb-3 flex flex-col gap-2.5 p-3 rounded border text-[10px] select-text ${
            isDark ? 'bg-slate-950 border-cyan-500/10' : 'bg-slate-50 border-blue-100'
          }`}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <span className={`text-[8px] uppercase tracking-widest font-bold mb-0.5 ${
                  msg.sender === 'user' 
                    ? isDark ? 'text-cyan-500/50' : 'text-blue-500/50'
                    : isDark ? 'text-fuchsia-500/50' : 'text-indigo-500/50'
                }`}>
                  {msg.sender === 'user' ? 'USER_PROBE' : 'CLONE_RESPONSE'}
                </span>
                <div
                  className={`p-2.5 rounded font-sans leading-relaxed select-text border ${
                    msg.sender === 'user'
                      ? isDark 
                        ? 'bg-cyan-600/20 border-cyan-500/30 text-slate-100' 
                        : 'bg-blue-600 border-blue-500 text-white'
                      : isDark
                        ? 'bg-slate-900 border-cyan-500/10 text-slate-200'
                        : 'bg-white border-blue-100 text-slate-700 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex flex-col items-start max-w-[85%]">
                <span className={`text-[8px] uppercase tracking-widest font-bold mb-0.5 ${
                  isDark ? 'text-fuchsia-500/50' : 'text-indigo-500/50'
                }`}>CLONE_RESPONSE</span>
                <div className={`p-2.5 rounded font-sans italic animate-pulse border ${
                  isDark ? 'bg-slate-900 border-cyan-500/10 text-slate-400' : 'bg-white border-blue-100 text-slate-400'
                }`}>
                  Typing data stream...
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions Buttons */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none pointer-events-auto">
            {suggestions.map((sug) => (
              <button
                key={sug}
                onClick={() => submitQuery(sug)}
                className={`px-2.5 py-1.5 text-[9px] border rounded cursor-pointer whitespace-nowrap transition-colors ${
                  isDark 
                    ? 'border-cyan-500/25 bg-slate-900 hover:border-cyan-400 text-cyan-300' 
                    : 'border-blue-200 bg-white hover:border-blue-500 text-blue-600 shadow-sm'
                }`}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleChatSubmit} className="flex gap-2 pointer-events-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter diagnostic query (e.g. skills, contact, citysense)..."
              className={`flex-1 border rounded px-3 py-2 text-[10px] focus:outline-none font-sans ${
                isDark 
                  ? 'bg-slate-900 border-cyan-500/35 text-slate-200 placeholder-cyan-600/30 focus:border-cyan-400' 
                  : 'bg-white border-blue-200 text-slate-800 placeholder-blue-600/30 focus:border-blue-500 shadow-sm'
              }`}
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded flex items-center justify-center cursor-pointer transition-colors active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
