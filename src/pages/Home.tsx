import { memo } from 'react';
import Introduction from '../components/Introduction';
import About from '../components/About';
import Career from '../components/Career';
import Papers from '../components/Papers';
import Projects from '../components/Projects';
import Coursework from '../components/Coursework';
import { useMagnetic } from '../hooks/useMagnetic';
import './Home.css';

interface HomeProps {
  scrollToSection: (id: string) => void;
}

// Small wrapper so each magnetic button gets its own hook instance
function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.5);
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={className}
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

function ScrollTopBtn({ onClick }: { onClick: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.5);
  return (
    <div
      className="scroll-to-top"
      onClick={onClick}
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <img src="assets/arrow_down.png" alt="Scroll to Top" aria-hidden="true" />
    </div>
  );
}

const Home = memo(function Home({ scrollToSection }: HomeProps) {
  return (
    <div className="home-container">
      <section id="home"><Introduction /></section>
      <section id="about"><About /></section>
      <section id="career"><Career /></section>
      <section id="papers"><Papers /></section>
      <section id="projects"><Projects /></section>
      <section id="coursework"><Coursework /></section>

      {/* Footer */}
      <section id="contact" className="footer-section">
        <div className="footer-container glass glow-on-hover">
          <h1 className="footer-heading">
            Let's build something <br /><span className="gradient-text">amazing</span> together.
          </h1>
          <p className="footer-subtext">
            Always open for new opportunities and collaborations in robotics and AI.
          </p>
          <div className="footer-links">
            <MagneticLink href="mailto:evangoldman10@gmail.com" className="footer-btn primary-btn">
              <img src="assets/mail-icon.png" alt="" aria-hidden="true" className="btn-icon invert-icon" /> Say Hello
            </MagneticLink>
            <MagneticLink href="https://www.linkedin.com/in/egold018/" className="footer-btn secondary-btn">
              <img src="assets/linkedin-icon.png" alt="" aria-hidden="true" className="btn-icon invert-icon" /> LinkedIn
            </MagneticLink>
            <MagneticLink href="https://github.com/egold010?tab=repositories" className="footer-btn secondary-btn">
              <img src="assets/github-icon.png" alt="" aria-hidden="true" className="btn-icon invert-icon" /> GitHub
            </MagneticLink>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2026 Nahom Teklemariam.</p>
            <ScrollTopBtn onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>
        </div>
      </section>
    </div>
  );
});

export default Home;
