import { useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';
import { useMagnetic } from '../hooks/useMagnetic';
import { Papers as PapersData } from '../constants';
import './Papers.css';

function PaperCard({ paper, index }: { paper: typeof PapersData[0]; index: number }) {
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt(3);
  const { ref: magRef, onMouseMove: magMove, onMouseLeave: magLeave } = useMagnetic(0.4);
  const navigate = useNavigate();

  return (
    <div
      className="paper-card glass glow-on-hover"
      ref={tiltRef as React.Ref<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="paper-content">
        <a onClick={() => navigate(`/paper/${paper.link}`)} style={{ cursor: 'pointer' }}>
          <h3>{paper.title}</h3>
        </a>
        <span className="date">{paper.date}</span>
      </div>
      <a
        href={`/assets/papers/${paper.link}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="paper-link-btn"
        ref={magRef as React.Ref<HTMLAnchorElement>}
        onMouseMove={magMove}
        onMouseLeave={magLeave}
      >
        View PDF
      </a>
    </div>
  );
}

export default function Papers() {
  const revealRef = useReveal();

  return (
    <div className="papers-container">
      <h1 ref={revealRef as React.Ref<HTMLHeadingElement>}>Papers</h1>
      <div className="paper-grid">
        {PapersData.map((paper, i) => <PaperCard key={paper.link} paper={paper} index={i} />)}
      </div>
    </div>
  );
}
