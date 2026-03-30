import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';
import { useMagnetic } from '../hooks/useMagnetic';
import { Awards as AwardsData } from '../constants';
import './Awards.css';

function AwardsCard({ awards, index }: { awards: typeof AwardsData[0]; index: number }) {
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt(3);
  const { ref: magRef, onMouseMove: magMove, onMouseLeave: magLeave } = useMagnetic(0.4);
  
  // Direct absolute URL to your PDFs
  const pdfUrl = `https://nahomtmariam.com${awards.link}`;

  return (
    <div
      className="awards-card glass glow-on-hover"
      ref={tiltRef as React.Ref<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="awards-content">
          <h3>{awards.title}</h3>
          <p>{awards.description}</p>
        <span className="date">{awards.date}</span>
      </div>
      
      {/* View Certificate button - opens same PDF */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="awards-link-btn"
        ref={magRef as React.Ref<HTMLAnchorElement>}
        onMouseMove={magMove}
        onMouseLeave={magLeave}
      >
        View Certificate
      </a>
    </div>
  );
}

export default function Awards() {
  const revealRef = useReveal();

  return (
    <div className="awards-container">
      <h1 ref={revealRef as React.Ref<HTMLHeadingElement>}>Awards</h1>
      <div className="awards-grid">
        {AwardsData.map((awards, i) => (
          <AwardsCard key={awards.link} awards={awards} index={i} />
        ))}
      </div>
    </div>
  );
}
