'use client';

import React, { useState } from 'react';
import { personalInfo } from '../utils/data';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 scroll-mt-16 text-depth">
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: 'var(--ember)' }}>
          <span className="w-6 h-px" style={{ background: 'var(--ember)' }} />
          Open a Channel
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8" style={{ color: 'var(--ink)' }}>Contact</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-wrap gap-2.5 mb-5">
              <a href={`mailto:${personalInfo.contact.email}`} className="chip-3d font-mono text-[11.5px] px-3.5 py-2 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--ink-dim)' }}>MAIL </span>{personalInfo.contact.email}
              </a>
              <a href={`tel:${personalInfo.contact.phoneHref}`} className="chip-3d font-mono text-[11.5px] px-3.5 py-2 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--ink-dim)' }}>TEL </span>{personalInfo.contact.phone}
              </a>
              <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="chip-3d font-mono text-[11.5px] px-3.5 py-2 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--ink-dim)' }}>GH </span>{personalInfo.contact.githubHandle}
              </a>
              <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="chip-3d font-mono text-[11.5px] px-3.5 py-2 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--ink-dim)' }}>IN </span>{personalInfo.contact.linkedinHandle}
              </a>
              <span className="chip-3d font-mono text-[11.5px] px-3.5 py-2 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}>
                <span style={{ color: 'var(--ink-dim)' }}>LOC </span>{personalInfo.contact.location}
              </span>
            </div>
            <div className="chip-3d font-mono text-[10.5px] border rounded-sm p-3.5" style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}>
              <b style={{ color: 'var(--ember-2)' }}>NOTE // </b>
              this form opens your email client with the message pre-filled — no backend, no fake &ldquo;sending…&rdquo; state, just a real email.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label htmlFor="name" className="block font-mono text-[10px] tracking-[0.08em] uppercase mb-1.5" style={{ color: 'var(--ink-dim)' }}>Name</label>
              <input
                id="name" type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="chip-3d w-full rounded-sm px-3 py-2.5 text-[13.5px] border focus:outline-none"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-[10px] tracking-[0.08em] uppercase mb-1.5" style={{ color: 'var(--ink-dim)' }}>Email</label>
              <input
                id="email" type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="chip-3d w-full rounded-sm px-3 py-2.5 text-[13.5px] border focus:outline-none"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-[10px] tracking-[0.08em] uppercase mb-1.5" style={{ color: 'var(--ink-dim)' }}>Message</label>
              <textarea
                id="message" required rows={4} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="chip-3d w-full rounded-sm px-3 py-2.5 text-[13.5px] border focus:outline-none"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>
            <button
              type="submit"
              className="card-3d self-start font-mono text-[11.5px] tracking-wider uppercase px-5 py-3 rounded-sm cursor-pointer"
              style={{ background: 'var(--ember)', color: '#fff' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
