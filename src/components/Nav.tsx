'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Logo from './Logo';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)', borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-5">
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-sm tracking-wide flex-shrink-0" style={{ color: 'var(--ink)' }}>
          <Logo className="w-7 h-7 flex-shrink-0" />
          BALAMURALI&nbsp;E
        </a>

        <div className="hidden md:flex gap-1 ml-1.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-wider uppercase px-2.5 py-2 rounded transition-colors"
              style={{ color: 'var(--ink-dim)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ember)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-dim)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title="Toggle theme"
            className="w-8 h-8 rounded flex items-center justify-center border cursor-pointer transition-colors"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink-dim)' }}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="#contact"
            className="font-mono text-[10.5px] tracking-wider uppercase px-3.5 py-2 rounded whitespace-nowrap"
            style={{ background: 'var(--ember)', color: '#fff' }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
