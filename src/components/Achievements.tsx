'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import { achievements, certifications } from '../utils/data';

export default function Achievements() {
  const fireConfetti = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 70,
      spread: 65,
      startVelocity: 32,
      colors: ['#FF7A1A', '#40C6F0', '#FFB067'],
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  return (
    <section id="achievements" className="py-20 border-b scroll-mt-16 text-depth" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Record
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Achievements &amp; Credentials</h2>

        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {achievements.map((a) => {
            const isRecord = a.title === 'Guinness World Record';
            return (
              <div
                key={a.title}
                onClick={isRecord ? fireConfetti : undefined}
                className="card-3d border p-5"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', cursor: isRecord ? 'pointer' : 'default' }}
                title={isRecord ? 'Click me' : undefined}
              >
                <div className="font-display font-extrabold text-[22px] mb-1.5" style={{ color: 'var(--ember-2)' }}>{a.metric}</div>
                <div className="text-[13px] font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>{a.title}</div>
                <div className="text-[12px]" style={{ color: 'var(--ink-dim)' }}>{a.desc}</div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {certifications.map((c) => (
            <div key={c.title} className="card-3d border p-4.5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', padding: '16px 18px' }}>
              <div className="text-[13px] font-semibold mb-1" style={{ color: 'var(--ink)' }}>{c.title}</div>
              <div className="text-[11.5px] mb-2.5" style={{ color: 'var(--ink-dim)' }}>{c.issuer} · {c.year}</div>
              <div className="font-mono text-[9.5px] break-all" style={{ color: 'var(--ember-2)' }}>ID: {c.cred}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
