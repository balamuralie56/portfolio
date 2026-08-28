'use client';

import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import ThreeScene from '../components/ThreeScene';
import HUD from '../components/HUD';
import Hero from '../components/Hero';
import About from '../components/About';
import SkillsOverlay from '../components/SkillsOverlay';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Research from '../components/Research';
import Recruiter from '../components/Recruiter';
import AIChatbot from '../components/AIChatbot';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialise Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight || 1;
      const progress = scrollY / height;
      setScrollProgress(progress);
      setActiveSection(Math.min(Math.round(progress), 9));
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animation frame loop for Lenis
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const goToSection = (sectionIndex: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(sectionIndex * window.innerHeight);
    } else {
      window.scrollTo({
        top: sectionIndex * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="relative select-none w-full scrollbar-none overflow-x-hidden">
      {/* 3D WebGL Canvas Layer */}
      <ThreeScene scrollProgress={scrollProgress} />

      {/* Heads-up-display telemetry HUD overlay */}
      <HUD activeSection={activeSection} totalSections={10} />

      {/* Scrollable sections container */}
      <div className="relative z-10 w-full">
        {/* Section 0: Hero */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <Hero onNavigate={goToSection} />
          </div>
        </section>

        {/* Section 1: About */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <About />
          </div>
        </section>

        {/* Section 2: Skills Galaxy */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <SkillsOverlay />
          </div>
        </section>

        {/* Section 3: Experience Corridor */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <Experience />
          </div>
        </section>

        {/* Section 4: Project Universe */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <Projects />
          </div>
        </section>

        {/* Section 5: Achievements Chamber */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <Achievements />
          </div>
        </section>

        {/* Section 6: Certifications Carousel */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <Certifications />
          </div>
        </section>

        {/* Section 7: Research Interests */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <Research />
          </div>
        </section>

        {/* Section 8: Recruiter Mode */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <Recruiter />
          </div>
        </section>

        {/* Section 9: AI Assistant */}
        <section className="h-screen w-full relative flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full h-full overflow-y-auto scrollbar-none">
            <AIChatbot onNavigate={goToSection} />
          </div>
        </section>
      </div>
    </main>
  );
}
