import { useState, useEffect, useRef } from 'react';
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

  // Initial terminal hint
  useEffect(() => {
    const t = setTimeout(() => {
      setTerminalHistory([{ text: 'Type "help" to see available commands.', type: 'info' }]);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (consoleBodyRef.current)
        consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
    }, 10);
  };

  const processCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const cmd = (e.target as HTMLInputElement).value.trim();
    (e.target as HTMLInputElement).value = '';
    if (!cmd) return;

    setTerminalHistory(prev => [...prev, { text: cmd, type: 'input' }]);
    const lower = cmd.toLowerCase();

    setTimeout(() => {
      let response: { text: string; type: string };
      if (lower === 'help')         response = { text: 'Available commands: whoami, skills, projects, contact, clear, sudo', type: 'info' };
      else if (lower === 'whoami')  response = { text: 'Nahom Teklemariam. Full Stack Web developer, Algorithmic Trader and Highschool Student', type: 'success' };
      else if (lower === 'skills')  response = { text: '> Python, C, Front-end, Back-end, SQL, React', type: 'success' };
      else if (lower === 'contact') response = { text: 'Email: nahomnatnael87@gmail.com', type: 'success' };
      else if (lower === 'projects')response = { text: 'Scroll down to view my projects.', type: 'info' };
      else if (lower === 'clear')   { setTerminalHistory([]); return; }
      else if (lower.startsWith('sudo')) response = { text: 'nahom is not in the sudoers file. This incident will be reported.', type: 'error' };
      else response = { text: `zsh: command not found: ${cmd}`, type: 'error' };

      setTerminalHistory(prev => [...prev, response]);
      scrollToBottom();
    }, 150);
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
            <SocialBtn href="https://www.linkedin.com/in/nahom-teklemariam-0652533b9" src="assets/linkedin-icon.png" alt="LinkedIn Profile" />
            <SocialBtn href="https://github.com/shebaww" src="assets/github-icon.png" alt="GitHub Profile" />
            <SocialBtn href="mailto:nahomnatnael87@gmail.com@gmail.com" src="assets/mail-icon.png" alt="Email Address" />
          </div>

          {/* Interactive Terminal */}
          <div className="hero-console animate-slide-up" style={{ animationDelay: '1.1s' }} onClick={() => inputRef.current?.focus()}>
            <div className="console-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="console-title">zsh — nahom@portfolio</span>
            </div>
            <div className="console-body" ref={consoleBodyRef}>
              <p className="console-line"><span className="prompt">~ %</span> ./init_autonomous_agent.sh</p>
              <p className="console-line success">[OK] Sensors Calibrated</p>
              <p className="console-line success">[OK] Neural Network Loaded</p>
              {terminalHistory.map((line, i) => (
                <p key={i} className={`console-line ${line.type}`}>
                  {line.type === 'input' && <span className="prompt">~ %</span>}
                  <span>{line.text}</span>
                </p>
              ))}
              <div className="console-input-wrapper">
                <span className="prompt">~ %</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="console-input"
                  onKeyDown={processCommand}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <img src="assets/arrow_down.png" alt="Scroll Down" aria-hidden="true" className="animate-bounce" />
      </div>
    </div>
  );
}
