import { lazy, Suspense } from 'react';
import Introduction from './components/Introduction';
import { useMagnetic } from './hooks/useMagnetic';
import './Home.css';

// Lazy load components that are below the fold
const About = lazy(() => import('./components/About'));
const Career = lazy(() => import('./components/Career'));
const Awards = lazy(() => import('./components/Awards'));
const Projects = lazy(() => import('./components/Projects'));
const Coursework = lazy(() => import('./components/Coursework'));

// Loading fallback
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
  </div>
);

interface HomeProps {
  scrollToSection: (id: string) => void;
}

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

export default function Home({ scrollToSection }: HomeProps) {
  return (
    <div className="home-container">
      <section id="home"><Introduction /></section>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="about"><About /></section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="career"><Career /></section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="awards"><Awards /></section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="projects"><Projects /></section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="coursework"><Coursework /></section>
      </Suspense>

      {/* Footer */}
      <section id="contact" className="footer-section">
        <div className="footer-container glass glow-on-hover">
          <h1 className="footer-heading">
            Let's build something <br /><span className="gradient-text">amazing</span> together.
          </h1>
          <p className="footer-subtext">
            Always open for new opportunities and collaborations.
          </p>
          <div className="footer-links">
            <MagneticLink href="mailto:nahomnatnael87@gmail.com" className="footer-btn primary-btn">
              <img src="assets/mail-icon.png" alt="" aria-hidden="true" className="btn-icon invert-icon" /> Say Hello
            </MagneticLink>
            <MagneticLink external href="https://linkedin.com/in/nahom-teklemariam-0652533b9" className="footer-btn secondary-btn">
              <img src="assets/linkedin-icon.png" alt="" aria-hidden="true" className="btn-icon invert-icon" /> LinkedIn
            </MagneticLink>
            <MagneticLink href="https://github.com/shebaww" className="footer-btn secondary-btn">
              <img src="assets/github-icon.png" alt="" aria-hidden="true" className="btn-icon invert-icon" /> GitHub
            </MagneticLink>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2026 Nahom Natnael Teklemariam. Certificates issued as Nahom Natnael (Ethiopian naming convention).</p>
            <ScrollTopBtn onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>
        </div>
      </section>
    </div>
  );
}
