import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectPage.css';

interface Props {
  scrollToSection: (id: string) => void;
}

export default function AwardsPage({ scrollToSection }: Props) {
  const { title } = useParams<{ title: string }>();

  useEffect(() => { window.scrollTo(0, 0); }, [title]);

  return (
    <div className="awards-container">
      <iframe
        src={`${title}.pdf`}
        title={title}
        style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '12px' }}
      />
      <button className="backBtn" onClick={() => scrollToSection('awards')}>
        <img src="/assets/arrow_down.png" alt="" aria-hidden="true" />
        Back
      </button>
    </div>
  );
}
