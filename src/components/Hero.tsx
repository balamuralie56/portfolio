'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { personalInfo } from '../utils/data';
import { useWebGLSupported, useIsCoarsePointer } from './3d/hooks';

const WorkspaceScene = dynamic(() => import('./3d/WorkspaceScene'), { ssr: false });

// The original static hero — also the WebGL-unavailable fallback, and what
// renders (briefly, or permanently on unsupported devices) before the 3D
// support check resolves. Never a blank screen either way.
function HeroFallback() {
  return (
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
  );
}

export default function Hero() {
  const use3D = useWebGLSupported();
  const coarse = useIsCoarsePointer();

  return (
    <header
      id="top"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--line)', minHeight: use3D ? '88vh' : undefined }}
    >
      {use3D ? (
        <>
          <WorkspaceScene coarse={coarse} />
          {/* Minimal overlay — the room is the primary visual, this is a label, not a panel */}
          <div className="relative pointer-events-none px-6 py-6 flex flex-col h-full justify-between" style={{ minHeight: '88vh' }}>
            <div
              className="self-start font-mono text-[10.5px] tracking-[0.14em] uppercase px-3 py-2 rounded border pointer-events-auto"
              style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface) 78%, transparent)', color: 'var(--ink-dim)' }}
            >
              <span style={{ color: 'var(--ink)' }}>{personalInfo.name}</span> — {personalInfo.role}
            </div>
            <div
              className="self-center font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded pointer-events-none"
              style={{ background: 'color-mix(in srgb, var(--surface) 65%, transparent)', color: 'var(--ink-dim)' }}
            >
              Look around · click an object to explore
            </div>
          </div>
        </>
      ) : (
        <div className="py-20 md:py-28">
          <HeroFallback />
        </div>
      )}
    </header>
  );
}
