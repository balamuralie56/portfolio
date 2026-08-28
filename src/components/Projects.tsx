'use client';

import React from 'react';
import { projects, labItems, publicRepo } from '../utils/data';

function CitySenseViz() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto block">
      <line x1="0" y1="112" x2="240" y2="112" stroke="var(--line)" strokeWidth={1} />
      <g stroke="var(--ink-dim)" strokeWidth={1.4}>
        <line x1="46" y1="112" x2="46" y2="52" /><circle cx="46" cy="48" r="4" fill="var(--ember-2)" />
        <line x1="118" y1="112" x2="118" y2="34" /><circle cx="118" cy="30" r="4" fill="var(--ember-2)" />
        <line x1="188" y1="112" x2="188" y2="58" /><circle cx="188" cy="54" r="4" fill="var(--ember-2)" />
      </g>
      <rect x="98" y="26" width="40" height="90" fill="none" stroke="var(--arc)" strokeWidth={1.2} />
      <text x="100" y="22" fontFamily="Share Tech Mono, monospace" fontSize={9} fill="var(--arc)">POLE 0.79</text>
      <rect x="168" y="50" width="40" height="66" fill="none" stroke="var(--arc)" strokeWidth={1.2} />
      <text x="170" y="46" fontFamily="Share Tech Mono, monospace" fontSize={9} fill="var(--arc)">POLE 0.43</text>
      <line x1="0" y1="80" x2="240" y2="80" stroke="var(--ember)" strokeWidth={1} strokeDasharray="3 4" />
    </svg>
  );
}

function EomsViz() {
  const cells: { x: number; y: number; stroke: string; width?: number }[] = [
    { x: 18, y: 30, stroke: 'var(--arc)' }, { x: 52, y: 30, stroke: 'var(--arc)' },
    { x: 86, y: 30, stroke: 'var(--ember)', width: 1.4 }, { x: 120, y: 30, stroke: 'var(--line)' },
    { x: 18, y: 58, stroke: 'var(--line)' }, { x: 52, y: 58, stroke: 'var(--line)' },
    { x: 86, y: 58, stroke: 'var(--line)' }, { x: 120, y: 58, stroke: 'var(--arc)' },
    { x: 18, y: 86, stroke: 'var(--line)' }, { x: 52, y: 86, stroke: 'var(--line)' },
    { x: 86, y: 86, stroke: 'var(--line)' }, { x: 120, y: 86, stroke: 'var(--line)' },
  ];
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto block">
      <text x="18" y="20" fontFamily="Share Tech Mono, monospace" fontSize={8} fill="var(--ink-dim)">SEAT_GRID</text>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={30} height={24} fill="none" stroke={c.stroke} strokeWidth={c.width ?? 1.2} />
      ))}
      <path d="M205 95 A16 16 0 1 1 201 83" fill="none" stroke="var(--ink-dim)" strokeWidth={2} />
      <polygon points="199,81 201,89 209,85" fill="var(--ink-dim)" />
      <text x="168" y="112" fontFamily="Share Tech Mono, monospace" fontSize={8} fill="var(--ink-dim)">UNDO_ENABLED</text>
    </svg>
  );
}

function AlprViz() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto block">
      <rect x="40" y="52" width="150" height="36" rx="12" fill="var(--surface-2)" stroke="var(--line)" strokeWidth={1.2} />
      <rect x="78" y="30" width="76" height="28" rx="10" fill="var(--surface-2)" stroke="var(--line)" strokeWidth={1.2} />
      <circle cx="72" cy="92" r="13" fill="var(--bg)" stroke="var(--ink-dim)" strokeWidth={1.2} />
      <circle cx="176" cy="92" r="13" fill="var(--bg)" stroke="var(--ink-dim)" strokeWidth={1.2} />
      <rect x="156" y="78" width="34" height="14" fill="none" stroke="var(--ember)" strokeWidth={1.3} />
      <g stroke="var(--ember)" strokeWidth={1.3} fill="none">
        <path d="M154 76 v-4 h6" /><path d="M192 76 v-4 h-6" />
        <path d="M154 94 v4 h6" /><path d="M192 94 v4 h-6" />
      </g>
      <line x1="156" y1="85" x2="190" y2="85" stroke="var(--arc)" strokeWidth={1} />
      <text x="150" y="112" fontFamily="Share Tech Mono, monospace" fontSize={8} fill="var(--arc)">PLATE_ID: LOCKED</text>
    </svg>
  );
}

const VIZ: Record<string, () => React.ReactElement> = {
  citysense: CitySenseViz,
  eoms: EomsViz,
  alpr: AlprViz,
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 border-b scroll-mt-16" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Verified Builds
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Field Operations</h2>

        <div className="grid gap-4.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {projects.map((p) => {
            const Viz = VIZ[p.id];
            return (
              <div key={p.id} className="border p-1" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
                <div className="border" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
                  {Viz && <Viz />}
                </div>
                <div className="p-4.5 pb-5" style={{ padding: '18px 16px 20px' }}>
                  <div className="font-display font-bold text-[14.5px] mb-2" style={{ color: 'var(--ink)' }}>{p.title}</div>
                  <div className="text-[12.5px] mb-3.5" style={{ color: 'var(--ink-dim)' }}>{p.description}</div>
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[9.5px] tracking-wide uppercase px-1.5 py-0.5 rounded border" style={{ color: 'var(--arc)', borderColor: 'color-mix(in srgb, var(--arc) 40%, transparent)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="font-mono text-[10px] tracking-wide uppercase flex items-center gap-1.5" style={{ color: 'var(--ink-dim)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--ink-dim)' }} />
                    {p.statusLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7">
          <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--ink-dim)' }}>In the Lab — Active R&amp;D</div>
          <div className="flex flex-wrap gap-2.5">
            {labItems.map((item) => (
              <div key={item.name} className="border border-dashed px-3 py-2 text-[12px] rounded-sm" style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}>
                <b style={{ color: 'var(--ink)' }}>{item.name}</b> — {item.desc}
                <span className="font-mono text-[9px] ml-1.5" style={{ color: 'var(--ember-2)' }}>{item.status}</span>
              </div>
            ))}
            <a
              href={publicRepo.url}
              target="_blank"
              rel="noreferrer"
              className="border border-dashed px-3 py-2 text-[12px] rounded-sm no-underline"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}
            >
              <b style={{ color: 'var(--ink)' }}>{publicRepo.name}</b> — {publicRepo.desc}
              <span className="font-mono text-[9px] ml-1.5" style={{ color: 'var(--ember-2)' }}>PUBLIC ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
