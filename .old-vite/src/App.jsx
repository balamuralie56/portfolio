import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import HUD from './components/HUD';
import Hero from './components/Hero';
import About from './components/About';
import SkillsOverlay from './components/SkillsOverlay';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Recruiter from './components/Recruiter';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Tracking Scroll Progress mapping 0 to 6
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      
      // Calculate fraction between 0.0 and 6.0 (7 total sections)
      const rawProgress = (scrollTop / docHeight) * 6;
      setScrollProgress(Math.min(6, Math.max(0, rawProgress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial trigger
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleSelectSkill = (skill, isHover = false) => {
    if (isHover) {
      setHoveredSkill(skill);
    } else {
      setActiveSkill(skill);
    }
  };

  const handleEnterLab = () => {
    // Scroll to about section (index 1)
    const aboutSec = document.getElementById('about-section');
    if (aboutSec) {
      aboutSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roundedSection = Math.round(scrollProgress);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* 3D R3F Background Scene */}
      <ThreeScene
        scrollProgress={scrollProgress}
        activeSkill={activeSkill}
        hoveredSkill={hoveredSkill}
        onSelectSkill={handleSelectSkill}
      />

      {/* Cybernetic HUD (Heads-Up Display) Overlay */}
      <HUD activeSection={roundedSection} totalSections={7} />

      {/* Main HTML Content Scroller */}
      <div className="relative z-10 w-full pointer-events-none flex flex-col">
        {/* Section 0: Hero */}
        <section id="hero-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <Hero onEnterLab={handleEnterLab} />
          </div>
        </section>

        {/* Section 1: About Room */}
        <section id="about-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <About />
          </div>
        </section>

        {/* Section 2: Skills Galaxy */}
        <section id="skills-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <SkillsOverlay
              hoveredSkill={hoveredSkill}
              activeSkill={activeSkill}
              onSelectSkill={handleSelectSkill}
            />
          </div>
        </section>

        {/* Section 3: Project Showcase */}
        <section id="projects-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <Projects />
          </div>
        </section>

        {/* Section 4: Experience Corridor */}
        <section id="experience-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <Experience />
          </div>
        </section>

        {/* Section 5: Achievements Chamber */}
        <section id="achievements-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <Achievements />
          </div>
        </section>

        {/* Section 6: Recruiter Mode */}
        <section id="recruiter-section" className="w-full min-h-screen flex items-center justify-center">
          <div className="w-full pointer-events-auto">
            <Recruiter />
          </div>
        </section>
      </div>

      {/* Cyberpunk Scanline Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] opacity-20" />
    </div>
  );
}
