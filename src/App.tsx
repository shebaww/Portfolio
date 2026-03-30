import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import AwardsPage from './pages/AwardsPage';
import './App.css';

const ANCHORS = ['home', 'about', 'career', 'awards', 'projects', 'coursework'];

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
    color: { value: '#e4b363' },
    links: { color: '#e4b363', distance: 100, enable: true, opacity: 0.8, width: 1 },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: false,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true }, value: 90 },
    opacity: { value: 0.4 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

const ParticlesBackground = memo(function ParticlesBackground() {
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
});

const Navbar = memo(function Navbar({ isBarHidden, isMenuOpen, toggleMenu, scrollToSection }: {
  isBarHidden: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  scrollToSection: (id: string) => void;
}) {
  return (
    <div className={`nav-bar${isBarHidden ? ' hidden' : ''}`} role="navigation" aria-label="Main Navigation">
      <div className="top-bar">
        <h3 className="name-header">
          Nahom N. Teklemariam
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
});


function AppShell() {
  const navigate = useNavigate();
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          
          // Threshold of 10px to avoid flickering
          if (Math.abs(scrollTop - lastScrollTop.current) > 10) {
            setIsBarHidden(scrollTop > lastScrollTop.current && scrollTop > 70);
            lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setIsMenuOpen(false);
    const isHome = window.location.pathname.endsWith('/home') || window.location.pathname.endsWith('/Portfolio/') || window.location.pathname.endsWith('/Portfolio');
    
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150); // Increased timeout slightly for reliable navigation remount
    }
  }, [navigate]);

  return (
    <>
      <ParticlesBackground />

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
          <Route path="/awards/:title" element={<AwardsPage scrollToSection={scrollToSection} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
