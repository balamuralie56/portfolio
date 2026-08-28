'use client';

import React from 'react';
import { experience } from '../utils/data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-b scroll-mt-16" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Active Posting
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Deployment Record</h2>

        <div className="border rounded-sm p-6 md:p-7" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <div className="font-display font-bold text-base" style={{ color: 'var(--ink)' }}>{experience.role}</div>
            <div className="font-mono text-[11px]" style={{ color: 'var(--arc)' }}>{experience.duration.toUpperCase()}</div>
          </div>
          <div className="text-[13px] mb-4" style={{ color: 'var(--ink-dim)' }}>{experience.company}</div>

          <ul className="flex flex-col gap-3">
            {experience.bullets.map((b) => (
              <li key={b.title} className="text-[13.5px] pl-5 relative" style={{ color: 'var(--ink)' }}>
                <span
                  className="absolute left-0 top-[6px] w-[7px] h-[7px] rotate-45"
                  style={{ border: '1.5px solid var(--ember)' }}
                />
                <b>{b.title}</b> — {b.desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
