import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Research from '../components/Research';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Research />
      <Contact />
      <footer className="py-10 text-center font-mono text-[10.5px] text-depth" style={{ color: 'var(--ink-dim)' }}>
        Balamurali E — built with Next.js and Tailwind
      </footer>
    </main>
  );
}
