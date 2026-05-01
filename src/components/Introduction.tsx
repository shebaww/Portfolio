import { useState, useEffect, useRef } from 'react';
import '../pages/Home.css';
import MagneticLink from '../components/MagneticLink';
import { useMagnetic } from '../hooks/useMagnetic';
import { Phrases } from '../constants';
import './Introduction.css';

// Each social button needs its own magnetic hook instance
function SocialBtn({ href, src, alt }: { href: string; src: string; alt: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.6);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <img src={src} alt={alt} />
    </a>
  );
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
export default function Introduction() {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<{ text: string; type: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleBodyRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = Phrases[phraseIndex];
      if (isDeleting) {
        setCurrentPhrase(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentPhrase(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % Phrases.length; speed = 500; }

      timeoutId = setTimeout(type, speed);
    };

    const startTimeout = setTimeout(type, 1000);
    return () => { clearTimeout(startTimeout); clearTimeout(timeoutId); };
  }, []);


  const scrollToBottom = () => {
    setTimeout(() => {
      if (consoleBodyRef.current)
        consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
    }, 10);
  };


  return (
    <div className="intro-container">
      <div className="background-glow" />
      <div className="content-wrapper">

        {/* Left: Photo */}
        <div className="left-side">
          <div className="image-container">
            <div className="hologram-overlay" />
            <img src="assets/nahom.jpg" alt="Nahom Natnael Headshot" className="animate-fade-in" />
            <div className="image-glow" />
          </div>
        </div>

        {/* Right: Text + Terminal */}
        <div className="right-side">
          <h2 className="animate-slide-up headline" style={{ animationDelay: '0.2s' }}>
            Hello, I'm <span className="gradient-text">Nahom</span>
          </h2>
          <h2 className="animate-slide-up subheadline" style={{ animationDelay: '0.4s', minHeight: '3rem' }}>
            {currentPhrase}
          </h2>
          <p className="animate-slide-up description" style={{ animationDelay: '0.6s' }}>
            Welcome to my portfolio! I'm a passionate 16 year old that builds Full-Stack Websites and Algorithm Trading Scripts.
          </p>

          <div className="button-container animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <SocialBtn href="https://www.linkedin.com/in/nahomtmariam" src="assets/linkedin-icon.png" alt="LinkedIn Profile" />
            <SocialBtn href="https://github.com/shebaww" src="assets/github-icon.png" alt="GitHub Profile" />
            <SocialBtn href="mailto:nahomnatnael87@gmail.com" src="assets/mail-icon.png" alt="Email Address" />
          </div>

         <MagneticLink href="assets/resume.pdf" className="resume-btn">               <img src="assets/download.svg" alt="" aria-hidden="true" className="btn-icon invert-icon" /> Download Resume
             </MagneticLink>
      </div>
        </div>

      <div className="scroll-indicator animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <img src="assets/arrow_down.png" alt="Scroll Down" aria-hidden="true" className="animate-bounce" />
      </div>
    </div>
  );
}
