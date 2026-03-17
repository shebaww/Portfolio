import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTilt } from '../hooks/useTilt';
import { CardItem } from '../constants';
import './ProjectCard.css';

interface Props {
  project: CardItem;
}

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();
  const { ref: tiltRef, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt(5);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight effect via CSS variables
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    tiltMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    tiltLeave(e);
  };

  // Intersection observer for scroll-in animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Merge tilt and card refs
  const mergedRef = (el: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <div
      ref={mergedRef}
      className="project-card-host"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.title}`)}
    >
      <div className="project-card-container">
        <div className="project-image">
          <div className="cv-filter-overlay" />
          <div className="cv-scanner" />
          <img src={`assets/item-images/${project.title}.png`} alt={project.title} loading="lazy" />
        </div>
        <div className="project-info">
          <h3>{project.title}</h3>
          <p className="description">{project.description}</p>
          <div className="skill-list">
            {project.skills?.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
