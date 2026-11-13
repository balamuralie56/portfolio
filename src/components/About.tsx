'use client';

import React from 'react';
import { personalInfo, education, hobbies, journeyPhotos } from '../utils/data';

function PhotoFrame({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="w-full sm:w-64 flex-shrink-0">
      <div className="card-3d relative border rounded-sm overflow-hidden" style={{ borderColor: 'var(--line)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={caption} className="w-full h-auto block" style={{ filter: 'grayscale(1) contrast(1.12) brightness(0.94)' }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, var(--arc) 0%, transparent 45%, var(--ember) 100%)',
            mixBlendMode: 'color',
            opacity: 0.55,
          }}
        />
      </div>
      <p className="font-mono text-[10.5px] mt-2.5 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
        <b style={{ color: 'var(--arc)' }}>FIELD LOG // </b>{caption}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 border-b scroll-mt-16 text-depth" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          About
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Origin Record</h2>

        <p className="max-w-[70ch] text-[15px] mb-10" style={{ color: 'var(--ink)' }}>
          {personalInfo.summary}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            {education.map((edu) => (
              <div key={edu.degree} className="pl-4 border-l-2" style={{ borderColor: 'var(--line)' }}>
                <div className="font-display font-bold text-sm mb-0.5" style={{ color: 'var(--ink)' }}>{edu.degree}</div>
                <div className="text-[12.5px]" style={{ color: 'var(--ink)' }}>{edu.institution} · {edu.duration}</div>
                <div className="font-mono text-[10.5px] mt-0.5" style={{ color: 'var(--ember-2)' }}>{edu.score.toUpperCase()}</div>
              </div>
            ))}

            <div className="mt-2">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase mb-2.5" style={{ color: 'var(--ink-dim)' }}>Beyond the Code</div>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((h) => (
                  <span
                    key={h.name}
                    className="chip-3d text-[11.5px] px-2.5 py-1.5 rounded border"
                    style={{ borderColor: 'var(--line)', color: h.category === 'hobby' ? 'var(--ink)' : 'var(--ink-dim)' }}
                  >
                    {h.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {journeyPhotos.map((p) => (
              <PhotoFrame key={p.src} src={p.src} caption={p.caption} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
