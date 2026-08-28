'use client';

import React from 'react';
import { researchInterests } from '../utils/data';

export default function Research() {
  return (
    <section id="research" className="py-20 border-b scroll-mt-16" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Research Frontier
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Learning In Progress</h2>

        <div className="flex flex-col gap-4 max-w-[70ch]">
          {researchInterests.map((r, i) => (
            <div key={r.name} className="flex gap-3.5">
              <div className="font-mono text-[11px] pt-0.5 w-6 flex-shrink-0" style={{ color: 'var(--ink-dim)' }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h4 className="font-display font-bold text-[13px] mb-1" style={{ color: 'var(--ink)' }}>{r.name}</h4>
                <p className="text-[12.5px]" style={{ color: 'var(--ink-dim)' }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
