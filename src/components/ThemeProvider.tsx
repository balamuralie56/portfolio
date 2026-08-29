'use client';

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'balamurali-theme';

function subscribeNever() {
  return () => {};
}

function getStoredTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : 'dark';
}

// Matches layout.tsx's hardcoded "dark" class on <html> — the server has no
// way to know the visitor's saved preference, so this must agree with that
// static default or hydration mismatches (exactly the bug this file used to
// have, on the Sun/Moon icon specifically).
function getServerTheme(): Theme {
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore, not useState+useEffect: this is the one hook
  // React actually guarantees resolves the server/client mismatch itself —
  // it renders getServerTheme() through hydration, then the real
  // localStorage-derived value in the next commit, with no warning and no
  // "set state in an effect" lint violation (there's no effect at all).
  const storedTheme = useSyncExternalStore(subscribeNever, getStoredTheme, getServerTheme);

  // A session-local override so a click can change the active theme
  // immediately without waiting on (or writing to) the external-store path
  // above. null = "no override yet, use storedTheme".
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? storedTheme;

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setOverride(next); // set state in the click handler — not an effect, so nothing to flag
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
