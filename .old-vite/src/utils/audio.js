let audioCtx = null;
let bgmOsc = null;
let bgmGain = null;
let bgmLfo = null;
let bgmInterval = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export const playClick = () => {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
};

export const playHover = () => {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.setValueAtTime(1600, audioCtx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
};

export const playSweep = () => {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(85, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(885, audioCtx.currentTime + 0.6);

    filter.type = 'lowpass';
    filter.Q.setValueAtTime(8, audioCtx.currentTime);
    filter.frequency.setValueAtTime(200, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc2.start();
    osc.stop(audioCtx.currentTime + 0.6);
    osc2.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
};

export const playSuccess = () => {
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
};

export const startBgm = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    if (bgmOsc) return; // Already playing

    const now = audioCtx.currentTime;

    // Create main ambient pad oscillator
    bgmOsc = audioCtx.createOscillator();
    bgmGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    bgmOsc.type = 'sawtooth';
    bgmOsc.frequency.setValueAtTime(55, now); // Low A

    // Create an LFO to modulate filter cutoff (creates the moving ambient space feeling)
    bgmLfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    bgmLfo.frequency.setValueAtTime(0.15, now); // Very slow sweep (0.15Hz)
    lfoGain.gain.setValueAtTime(300, now); // Sweep filter frequency by 300Hz

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(5, now);

    bgmGain.gain.setValueAtTime(0.0, now);
    bgmGain.gain.linearRampToValueAtTime(0.04, now + 2.0); // Slow fade in

    // Connect LFO to filter frequency
    bgmLfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    bgmOsc.connect(filter);
    filter.connect(bgmGain);
    bgmGain.connect(audioCtx.destination);

    bgmOsc.start(now);
    bgmLfo.start(now);

    // Cyberpunk ambient arpeggiator / soundscapes (generative backdrop)
    let noteIndex = 0;
    const melody = [110.00, 164.81, 220.00, 196.00, 146.83]; // A2, E3, A3, G3, D3
    
    bgmInterval = setInterval(() => {
      if (!audioCtx || audioCtx.state === 'suspended') return;
      const noteTime = audioCtx.currentTime;
      
      const mOsc = audioCtx.createOscillator();
      const mGain = audioCtx.createGain();
      const mFilter = audioCtx.createBiquadFilter();

      mOsc.type = 'sine';
      mOsc.frequency.setValueAtTime(melody[noteIndex], noteTime);
      
      mFilter.type = 'lowpass';
      mFilter.frequency.setValueAtTime(600, noteTime);

      mGain.gain.setValueAtTime(0.0, noteTime);
      mGain.gain.linearRampToValueAtTime(0.015, noteTime + 0.5);
      mGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 4.0);

      mOsc.connect(mFilter);
      mFilter.connect(mGain);
      mGain.connect(audioCtx.destination);

      mOsc.start(noteTime);
      mOsc.stop(noteTime + 4.0);

      noteIndex = (noteIndex + 1) % melody.length;
    }, 4000);

  } catch (e) {
    console.warn("BGM start failed:", e);
  }
};

export const stopBgm = () => {
  try {
    if (bgmOsc) {
      bgmOsc.stop();
      bgmOsc.disconnect();
      bgmOsc = null;
    }
    if (bgmLfo) {
      bgmLfo.stop();
      bgmLfo.disconnect();
      bgmLfo = null;
    }
    if (bgmGain) {
      bgmGain.disconnect();
      bgmGain = null;
    }
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  } catch (e) {
    console.warn("BGM stop failed:", e);
  }
};
