'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { personalInfo } from '../utils/data';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden py-20 md:py-28 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Portfolio · Live
        </div>

        <h1 className="font-display font-extrabold tracking-tight mb-2 text-[clamp(34px,6vw,58px)] leading-[1.05]" style={{ color: 'var(--ink)' }}>
          {personalInfo.name}
        </h1>

        <div className="font-mono text-[12.5px] tracking-[0.1em] mb-4" style={{ color: 'var(--arc)' }}>
          {personalInfo.role.toUpperCase()}
        </div>

        <p className="text-[15px] max-w-[58ch] mb-8" style={{ color: 'var(--ink-dim)' }}>
          <b style={{ color: 'var(--ink)' }}>{personalInfo.tagline}.</b> Builds toward production-facing AI systems, ships REST APIs and cloud infrastructure, and treats AI-assisted engineering as a core part of how the work gets done.
        </p>

        <div className="flex flex-wrap gap-2.5 mb-7">
          <a href="#projects" className="font-mono text-[11.5px] tracking-wider uppercase px-4 py-2.5 rounded" style={{ background: 'var(--ember)', color: '#fff' }}>
            View Projects
          </a>
          <a href="/resume.pdf" download className="font-mono text-[11.5px] tracking-wider uppercase px-4 py-2.5 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
            Download Resume
          </a>
          <a href="#contact" className="font-mono text-[11.5px] tracking-wider uppercase px-4 py-2.5 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
            Contact
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a href={`mailto:${personalInfo.contact.email}`} className="font-mono text-[11.5px] px-3.5 py-2 rounded border flex items-center gap-1.5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--ink-dim)' }}>MAIL</span>{personalInfo.contact.email}
          </a>
          <a href={`tel:${personalInfo.contact.phoneHref}`} className="font-mono text-[11.5px] px-3.5 py-2 rounded border flex items-center gap-1.5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--ink-dim)' }}>TEL</span>{personalInfo.contact.phone}
          </a>
          <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="font-mono text-[11.5px] px-3.5 py-2 rounded border flex items-center gap-1.5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--ink-dim)' }}>GH</span>{personalInfo.contact.githubHandle}
          </a>
          <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[11.5px] px-3.5 py-2 rounded border flex items-center gap-1.5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--ink-dim)' }}>IN</span>{personalInfo.contact.linkedinHandle}
          </a>
        </div>
      </div>
    </header>
  );
}
