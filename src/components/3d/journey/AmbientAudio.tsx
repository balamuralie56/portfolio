'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Traditional Carnatic veena (Viriboni, Bhairavi ragam) — CC0, Wikimedia
// Commons, no attribution required. See public/ASSET_LICENSES.md.
//
// Browsers block audio with sound before a user gesture, so this starts
// on the first real interaction rather than on mount. `scroll` events
// don't bubble to window (and drei's ScrollControls captures scroll on
// its own nested element anyway), so `wheel`/`pointerdown`/`keydown` are
// used instead — all of which do bubble, and between them cover mouse,
// trackpad, touch, and keyboard scrolling.
export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const userToggled = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoStart = () => {
      if (userToggled.current) return;
      audio.volume = 0.32;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    const events: (keyof WindowEventMap)[] = ['wheel', 'pointerdown', 'keydown'];
    events.forEach((evt) => window.addEventListener(evt, tryAutoStart, { once: true, passive: true }));
    return () => events.forEach((evt) => window.removeEventListener(evt, tryAutoStart));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    userToggled.current = true;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.32;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/veena-viriboni.ogg" loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? 'Mute background music' : 'Play background music'}
        title={playing ? 'Traditional veena — playing' : 'Traditional veena — muted'}
        className="pointer-events-auto flex items-center justify-center w-9 h-9 rounded border"
        style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface) 78%, transparent)', color: 'var(--ink-dim)' }}
      >
        {playing ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </>
  );
}
