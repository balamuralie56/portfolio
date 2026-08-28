'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const handler = () => setCoarse(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return coarse;
}

function subscribeNever() {
  return () => {};
}

function getWebGLSnapshot(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function getWebGLServerSnapshot(): boolean {
  return false;
}

// The WebGL capability check can only run in the browser, and Hero.tsx (its
// only caller) is server-rendered — a plain useState/useEffect pair would
// either flash the fallback before upgrading (extra render) or, if computed
// eagerly in a lazy initializer, mismatch against the server's HTML entirely.
// useSyncExternalStore is the React-sanctioned way to let a value legitimately
// differ between server and client without either problem: it renders the
// server snapshot (false) through hydration, then swaps to the real client
// value in the next commit, no warning.
export function useWebGLSupported() {
  return useSyncExternalStore(subscribeNever, getWebGLSnapshot, getWebGLServerSnapshot);
}

export function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, []);
  return pointer;
}

export type SectionId = 'about' | 'skills' | 'experience' | 'projects' | 'achievements' | 'contact';

export function goToSection(id: SectionId, reduced: boolean) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
