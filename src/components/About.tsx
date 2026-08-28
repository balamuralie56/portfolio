'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, Award, Compass, Heart, Book, Globe, Leaf, Eye } from 'lucide-react';
import { playClick, playHover } from '../utils/audio';
import { useTheme } from './ThemeProvider';
import { education, hobbiesAndInterests } from '../utils/data';

interface JourneyItem {
  title: string;
  subtitle: string;
  date: string;
  desc: string;
  image: string;
}

const journeyItems: JourneyItem[] = [
  {
    title: "B.Sc Graduation Day",
    subtitle: "Madras Christian College (MCC) / University of Madras",
    date: "May 2023",
    desc: "Successfully graduated with an 82% score in Computer Science, marking the start of my computational research pathway.",
    image: "/images/B.sc Graduvation.jpeg"
  },
  {
    title: "GUVI Technical Educator",
    subtitle: "SRM University Bootcamp Series",
    date: "September 2023",
    desc: "Invited to teach full stack architectures and algorithmic frameworks. Facilitated labs for over 300+ students.",
    image: "/images/GUVI Class at SRM.jpeg"
  },
  {
    title: "AI in Microbiology Keynote",
    subtitle: "Vels University (VELS)",
    date: "January 2024",
    desc: "Delivered a workshop on deep neural network architectures applied to microbiology and clinical data pipelines.",
    image: "/images/AI in microbio vels.jpeg"
  },
  {
    title: "The Purpose of Artificial Intelligence",
    subtitle: "Vels University Guest Lecture",
    date: "February 2024",
    desc: "Explaining convolutional filters, deep networks, and their real-world impact in bioinformatics counters.",
    image: "/images/purpose of AI.jpeg"
  },
  {
    title: "Microbiology Workshop (Vels Team)",
    subtitle: "Collaborative Practical Session 1",
    date: "July 2024",
    desc: "Leading microbiology research scholars in deploying YOLO detectors to compute cell counts in real time.",
    image: "/images/microbio vels work 1.jpeg"
  },
  {
    title: "Biotechnology Lab Deployments",
    subtitle: "Collaborative Practical Session 2",
    date: "August 2024",
    desc: "Demonstrating how Edge AI engines run locally on hardware accelerators inside biochemical laboratories.",
    image: "/images/micro bio vels2.jpeg"
  },
  {
    title: "Honors & Academic Awards",
    subtitle: "Facilitator Credentials & Achievements",
    date: "December 2024",
    desc: "Received professional recognition from university heads for bridging AI tools with biological sciences.",
    image: "/images/honor movements.jpeg"
  },
  {
    title: "Vels University Session 1",
    subtitle: "Neural Network Foundations",
    date: "February 2025",
    desc: "Breaking down weight matrices and convolutional filters for non-CS students.",
    image: "/images/vels Workshop1.jpeg"
  },
  {
    title: "Vels University Session 2",
    subtitle: "Object Detection Workflows",
    date: "March 2025",
    desc: "Interactive coding lab teaching students how to label custom image datasets.",
    image: "/images/vels workshop2.jpeg"
  },
  {
    title: "Vels University Session 3",
    subtitle: "Edge AI Deployments",
    date: "April 2025",
    desc: "Configuring TensorRT execution engines and benchmarking frame latency metrics.",
    image: "/images/vels work3.jpeg"
  }
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery' | 'life'>('timeline');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const bios = [
    {
      icon: Award,
      title: "TECHNICAL LEAD",
      desc: "Directed a team of 10 interns at FDAI, deploying YOLO models and microservice networks, accelerating codebase iteration by 40%."
    },
    {
      icon: Compass,
      title: "WORKSHOP FACILITATOR",
      desc: "Delivered 22+ professional tech workshops for CS, Biotech, and Microbiology students, covering Neural Networks and AI pipelines."
    },
    {
      icon: GraduationCap,
      title: "ACADEMIC BACKGROUND",
      desc: "Graduating with M.Sc in Information Technology from the University of Madras (75%) and B.Sc in Computer Science (82%)."
    }
  ];

  const handleTabChange = (tab: 'timeline' | 'gallery' | 'life') => {
    playClick();
    setActiveTab(tab);
  };

  const getHobbyIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("chess")) return Trophy;
    if (n.includes("read")) return Book;
    if (n.includes("poem")) return Feather;
    if (n.includes("shuttle") || n.includes("play")) return Heart;
    if (n.includes("politics") || n.includes("news")) return Globe;
    if (n.includes("agri")) return Leaf;
    return Compass;
  };

  const Trophy = Award; // Fallback
  const Feather = Heart; // Fallback

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 font-mono text-cyan-400 relative">
      <div className="max-w-5xl mx-auto w-full select-text">
        {/* Section Header */}
        <div className={`flex items-center gap-3 border-b pb-4 mb-12 ${
          isDark ? 'border-cyan-500/20' : 'border-blue-200'
        }`}>
          <User className={`w-6 h-6 ${isDark ? 'text-fuchsia-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${
            isDark ? 'text-cyan-300' : 'text-blue-800'
          }`}>
            ABOUT_ME_PEDESTAL
          </h2>
        </div>

        {/* Narrative & Core Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Description & Credentials */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className={`text-xs md:text-sm font-sans leading-relaxed select-text ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              I am a Deep Learning Engineer and Full Stack AI Developer specializing in model optimization, real-time computer vision networks, and edge deployments. I specialize in training YOLO detection models, compressing parameter weights using TensorRT, and deploying responsive systems to embedded devices (NVIDIA Jetson) and high-performance serverless backends.
            </p>
            
            <p className={`text-xs md:text-sm font-sans leading-relaxed select-text ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Currently serving as the Technical Lead at FDAI, I combine system engineering skills with soft-computing training methodologies, teaching AI processes to students and industry founders while deploying production-grade code.
            </p>

            {/* Bios List */}
            <div className="flex flex-col gap-4 mt-2">
              {bios.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className={`flex gap-4 p-4 rounded-md border transition-all ${
                      isDark 
                        ? 'bg-slate-900/60 border-cyan-500/10 hover:border-cyan-500/30' 
                        : 'bg-white/50 border-blue-200/40 hover:border-blue-300 shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-md border flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'border-cyan-500/25 bg-slate-950 text-cyan-300' : 'border-blue-200 bg-blue-50 text-blue-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                        isDark ? 'text-cyan-200' : 'text-blue-900'
                      }`}>
                        {b.title}
                      </h4>
                      <p className={`font-sans text-[11px] leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Tab Corridor */}
          <div className="lg:col-span-6 flex flex-col gap-6 w-full">
            {/* Tab Navigation buttons */}
            <div className={`flex border rounded p-1 pointer-events-auto ${
              isDark ? 'border-cyan-500/20 bg-slate-950/40' : 'border-blue-200 bg-white/40'
            }`}>
              {(['timeline', 'gallery', 'life'] as const).map((tabId) => {
                const label = tabId === 'timeline' ? 'Timeline' : tabId === 'gallery' ? 'Workshops' : 'Life Orbit';
                return (
                  <button
                    key={tabId}
                    onClick={() => handleTabChange(tabId)}
                    className={`flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-wider rounded cursor-pointer transition-all active:scale-95 ${
                      activeTab === tabId
                        ? isDark
                          ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
                          : 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.15)]'
                        : isDark
                          ? 'text-cyan-500/60 hover:text-cyan-400'
                          : 'text-blue-500/60 hover:text-blue-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents Frame */}
            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6 pl-5 relative select-text"
                  >
                    <div className={`absolute top-1 bottom-1 left-1.5 w-[2px] ${
                      isDark ? 'bg-cyan-500/20' : 'bg-blue-100'
                    }`} />

                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className={`relative p-4 rounded-md border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                          isDark 
                            ? 'bg-slate-950/90 border-cyan-500/30 hover:border-cyan-400' 
                            : 'bg-white/70 border-blue-200/50 hover:border-blue-400'
                        }`}
                      >
                        <div className={`absolute top-5 -left-[22px] w-2.5 h-2.5 rounded-full border-2 ${
                          isDark ? 'bg-slate-950 border-cyan-400' : 'bg-white border-blue-600'
                        }`} />
                        <span className={`text-[9px] font-semibold tracking-wider block mb-1 ${
                          isDark ? 'text-cyan-400/80' : 'text-blue-500/80'
                        }`}>
                          {edu.duration}
                        </span>
                        <h4 className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                          isDark ? 'text-cyan-200' : 'text-blue-900'
                        }`}>
                          {edu.degree}
                        </h4>
                        <span className={`text-[10px] font-bold block mb-1.5 ${
                          isDark ? 'text-fuchsia-400' : 'text-indigo-600'
                        }`}>
                          {edu.score}
                        </span>
                        <p className={`font-sans text-[10px] ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {edu.institution}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 pointer-events-auto select-none"
                  >
                    <span className={`text-[9px] uppercase tracking-widest font-bold ${
                      isDark ? 'text-cyan-500/60' : 'text-blue-500/60'
                    }`}>THE_RESEARCHERS_JOURNEY (10 CHAPTERS)</span>
                    
                    <div className="max-h-[460px] overflow-y-auto pr-2 flex flex-col gap-6 relative pl-5 select-text">
                      <div className={`absolute top-2 bottom-2 left-1.5 w-[2px] ${
                        isDark ? 'bg-cyan-500/20' : 'bg-blue-100'
                      }`} />

                      {journeyItems.map((item, idx) => (
                        <div
                          key={idx}
                          className={`relative p-4 rounded border backdrop-blur-xl transition-all duration-300 flex flex-col sm:flex-row gap-4 items-center sm:items-start ${
                            isDark 
                              ? 'bg-slate-950/90 border-cyan-500/20 hover:border-cyan-400' 
                              : 'bg-white/70 border-blue-200/50 hover:border-blue-400 hover:shadow-md'
                          }`}
                        >
                          <div className={`absolute top-6 -left-[22px] w-2.5 h-2.5 rounded-full border-2 ${
                            isDark ? 'bg-slate-950 border-cyan-400' : 'bg-white border-blue-600'
                          }`} />

                          {/* Image Thumbnail */}
                          <div
                            onClick={() => {
                              playClick();
                              setSelectedImg(item.image);
                            }}
                            className={`w-28 h-20 rounded border overflow-hidden flex-shrink-0 cursor-pointer relative group ${
                              isDark ? 'border-cyan-500/20' : 'border-blue-200'
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                          </div>

                          {/* Text description */}
                          <div className="flex-1 text-center sm:text-left">
                            <span className={`text-[8px] font-semibold tracking-wider block mb-0.5 ${
                              isDark ? 'text-cyan-400/80' : 'text-blue-500/80'
                            }`}>
                              {`${item.date} // ${item.subtitle.toUpperCase()}`}
                            </span>
                            <h4 className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                              isDark ? 'text-cyan-200' : 'text-blue-900'
                            }`}>
                              {item.title}
                            </h4>
                            <p className={`font-sans text-[10px] leading-relaxed ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'life' && (
                  <motion.div
                    key="life"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6 select-text"
                  >
                    {/* Hobbies Section */}
                    <div>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest border-b pb-2 mb-3 flex items-center gap-1.5 ${
                        isDark ? 'text-fuchsia-400 border-fuchsia-500/20' : 'text-indigo-600 border-indigo-100'
                      }`}>
                        PERSONAL_HOBBIES
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {hobbiesAndInterests.filter(x => x.category === 'hobby').map((h, idx) => {
                          const Icon = getHobbyIcon(h.name);
                          return (
                            <div
                              key={idx}
                              onMouseEnter={playHover}
                              className={`p-3 rounded border flex flex-col gap-1 transition-all ${
                                isDark 
                                  ? 'bg-slate-950/90 border-cyan-500/20 hover:border-cyan-400' 
                                  : 'bg-white/70 border-blue-200/50 hover:border-blue-500 shadow-sm'
                              }`}
                            >
                              <div className="flex justify-between items-center text-xs">
                                <span className={`font-bold uppercase ${isDark ? 'text-cyan-200' : 'text-blue-900'}`}>{h.name}</span>
                                <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                              </div>
                              <p className={`font-sans text-[9px] leading-relaxed ${
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              }`}>
                                {h.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interests Section */}
                    <div>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest border-b pb-2 mb-3 flex items-center gap-1.5 ${
                        isDark ? 'text-fuchsia-400 border-fuchsia-500/20' : 'text-indigo-600 border-indigo-100'
                      }`}>
                        DAILY_INTERESTS
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {hobbiesAndInterests.filter(x => x.category === 'interest').map((h, idx) => {
                          const Icon = getHobbyIcon(h.name);
                          return (
                            <div
                              key={idx}
                              onMouseEnter={playHover}
                              className={`p-3 rounded border flex flex-col gap-1 transition-all ${
                                isDark 
                                  ? 'bg-slate-950/90 border-cyan-500/20 hover:border-cyan-400' 
                                  : 'bg-white/70 border-blue-200/50 hover:border-blue-500 shadow-sm'
                              }`}
                            >
                              <div className="flex justify-between items-center text-xs">
                                <span className={`font-bold uppercase ${isDark ? 'text-cyan-200' : 'text-blue-900'}`}>{h.name}</span>
                                <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                              </div>
                              <p className={`font-sans text-[9px] leading-relaxed ${
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              }`}>
                                {h.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Workshop Images */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative max-w-3xl max-h-[85vh] overflow-hidden rounded border p-2 pointer-events-auto shadow-2xl ${
                isDark ? 'bg-slate-950 border-cyan-500/30' : 'bg-white border-blue-200'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImg}
                alt="Workshop View"
                className="max-w-full max-h-[80vh] object-contain rounded"
              />
              <button
                onClick={() => setSelectedImg(null)}
                className={`absolute top-4 right-4 p-1.5 rounded-full border cursor-pointer ${
                  isDark ? 'border-cyan-500/20 text-cyan-400 bg-slate-950' : 'border-blue-200 text-blue-600 bg-white shadow'
                }`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
