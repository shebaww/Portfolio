import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useDecode } from '../hooks/useDecode';
import { Projects as ProjectsData } from '../constants';
import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const revealRef = useReveal();
  const { ref: decodeRef, onMouseEnter, onMouseLeave } = useDecode();

  const headingRef = (el: HTMLHeadingElement | null) => {
    (revealRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
    (decodeRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
  };

  const relevant = ProjectsData.filter(p => p.relevant);
  const hidden   = ProjectsData.filter(p => !p.relevant);

  return (
    <section className="projects-container">
      <h1 ref={headingRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        Projects <span className="title-subtext">(click for more info)</span>
      </h1>
      <div className="project-list">
        {relevant.map(p => <ProjectCard key={p.title} project={p} />)}

        <button className="toggle-button" onClick={() => setShowAll(v => !v)}>
          {showAll ? 'Show Less' : 'Show More'}
          <img
            src="assets/arrow_down.png"
            alt=""
            aria-hidden="true"
            style={{ transform: showAll ? 'rotate(-180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          />
        </button>

        {showAll && hidden.map((p, i) => (
          <div key={p.title} className="project-card animate" style={{ animationDelay: `${i * 100}ms` }}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
