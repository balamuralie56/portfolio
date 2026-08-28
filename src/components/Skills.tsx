'use client';

import React from 'react';
import { skillGroups } from '../utils/data';

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-b scroll-mt-16" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Loadout
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Systems Arsenal</h2>

        <div className="grid gap-px border" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', background: 'var(--line)', borderColor: 'var(--line)' }}>
          {skillGroups.map((group) => (
            <div key={group.title} className="p-5" style={{ background: 'var(--surface)' }}>
              <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase mb-3 flex items-center gap-2" style={{ color: 'var(--ember-2)' }}>
                <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'var(--ember)' }} />
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[13px] pl-3.5 relative" style={{ color: 'var(--ink)' }}>
                    <span className="absolute left-0" style={{ color: 'var(--arc)' }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
