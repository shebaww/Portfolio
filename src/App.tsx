import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import PaperPage from './pages/PaperPage';
import { useDecode } from './hooks/useDecode';
import { useExplode } from './hooks/useExplode';
import './App.css';

const ANCHORS = ['home', 'about', 'career', 'papers', 'projects', 'coursework'];

const PARTICLES_OPTIONS: ISourceOptions = {
  id: 'tsparticles',
  background: { color: { value: 'transparent' } },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: 'push' },
      onHover: { enable: true, mode: 'repulse' },
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: '#7c3aed' },
    links: { color: '#3b82f6', distance: 150, enable: true, opacity: 0.3, width: 1 },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: false,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true }, value: 60 },
    opacity: { value: 0.4 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={PARTICLES_OPTIONS}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

function Navbar({ isBarHidden, isMenuOpen, toggleMenu, scrollToSection }: {
  isBarHidden: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  scrollToSection: (id: string) => void;
}) {
  const { ref: decodeRef, onMouseEnter, onMouseLeave } = useDecode();
  const explodeRef = useExplode();

  const nameRef = (el: HTMLHeadingElement | null) => {
    (decodeRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (explodeRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <div className={`nav-bar${isBarHidden ? ' hidden' : ''}`} role="navigation" aria-label="Main Navigation">
      <div className="top-bar">
        <h3 className="name-header" ref={nameRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          Evan Goldman
        </h3>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
          &#9776;
        </button>
      </div>
      <nav className={`nav-header${isMenuOpen ? ' open' : ''}`}>
        {ANCHORS.map((anchor) => (
          <div key={anchor}>
            <a onClick={() => scrollToSection(anchor)} tabIndex={0} onKeyUp={(e) => e.key === 'Enter' && scrollToSection(anchor)} role="button" aria-label={`Scroll to ${anchor} section`}>
              <h3 className="nav-item">{anchor}</h3>
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
}

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    const hexChars = '0123456789ABCDEF';
    const prefixes = ['[kernel]', '[sys]', '[net]', '[gpu]', '[auth]', '[mem]', '[drone]', '[ai]', '[slam]'];
    let progress = 0;

    const interval = setInterval(() => {
      if (progress >= 100) { clearInterval(interval); return; }
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const address = '0x' + Array.from({ length: 8 }, () => hexChars[Math.floor(Math.random() * 16)]).join('');
      setBootLines(prev => {
        const next = [...prev, `${prefix} Loading block at ${address} ... OK`];
        return next.length > 25 ? next.slice(-25) : next;
      });
      progress += Math.random() * 3;
      if (progress > 100) progress = 100;
      setBootProgress(Math.floor(progress));
    }, 40);

    const t1 = setTimeout(() => setFadeOut(true), 3200);
    const t2 = setTimeout(() => onDoneRef.current(), 4000);
    return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className={`splash-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="terminal-content">
        <div className="boot-logs">
          {bootLines.map((line, i) => <p key={i} className="boot-line">{line}</p>)}
        </div>
        {bootProgress > 0 && (
          <div className="boot-progress-container">
            <div className="boot-progress-bar" style={{ width: `${bootProgress}%` }} />
            <div className="boot-progress-text">{bootProgress}%</div>
          </div>
        )}
        <div className="main-boot-messages">
          {bootProgress > 10  && <p className="cmd">INIT <span className="highlight">SYSTEM_BOOT</span>...</p>}
          {bootProgress > 30  && <p className="cmd delay-1">LOADING <span className="highlight">KERNEL</span>...</p>}
          {bootProgress > 50  && <p className="cmd delay-2">MOUNTING <span className="highlight">NEURAL_NET</span> [OK]</p>}
          {bootProgress > 80  && <p className="cmd delay-3">ESTABLISHING <span className="highlight">CONNECTION</span>...</p>}
          {bootProgress === 100 && <p className="cmd delay-4">WELCOME, <span className="highlight">GUEST</span>.</p>}
          {bootProgress === 100 && <p className="cmd blink-cursor delay-5">&gt; ACCESS GRANTED_</p>}
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const [splashDone, setSplashDone] = useState(false);
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
      setIsBarHidden(scrollTop > lastScrollTop.current);
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
      setIsMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setIsMenuOpen(false);
    navigate('/home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [navigate]);

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <ParticlesBackground />

      <div className="depth-gauge">
        <div className="depth-track">
          <div className="depth-fill" style={{ height: `${scrollProgress}%` }} />
          <div className="depth-marker" style={{ top: `${scrollProgress}%` }} />
        </div>
        <div className="depth-readout">
          DEPTH<br />
          <span className="depth-value">{Math.round(scrollProgress)}</span>
        </div>
      </div>

      <div className="background">
        <Navbar
          isBarHidden={isBarHidden}
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(p => !p)}
          scrollToSection={scrollToSection}
        />
        <Routes>
          <Route path="/home" element={<Home scrollToSection={scrollToSection} />} />
          <Route path="/project/:title" element={<ProjectPage scrollToSection={scrollToSection} />} />
          <Route path="/paper/:title" element={<PaperPage scrollToSection={scrollToSection} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Portfolio">
      <AppShell />
    </BrowserRouter>
  );
}
