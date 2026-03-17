import { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useDecode } from '../hooks/useDecode';
import { Career as CareerData } from '../constants';
import './Career.css';

export default function Career() {
  const revealRef = useReveal();
  const { ref: decodeRef, onMouseEnter, onMouseLeave } = useDecode();
  const containerRef = useRef<HTMLDivElement>(null);

  const headingRef = (el: HTMLHeadingElement | null) => {
    (revealRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
    (decodeRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
  };

  // Animate timeline entries and line on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const entryObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); entryObserver.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    container.querySelectorAll('.timeline-entry').forEach(el => entryObserver.observe(el));

    const lineObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('line-visible'); lineObserver.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    lineObserver.observe(container);

    return () => { entryObserver.disconnect(); lineObserver.disconnect(); };
  }, []);

  return (
    <div className="career-container">
      <h1 ref={headingRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Career</h1>
      <div className="timeline-container" ref={containerRef}>
        {CareerData.map((item, i) => (
          <div key={i} className="timeline-entry">
            <div className="timeline-dot" />
            <img src={item.image} alt="" aria-hidden="true" className="timeline-icon" loading="lazy" />
            <div className="timeline-content glass">
              <h3>
                {item.title}
                <span className="company-name"> @<a className="company-link" href={item.link} target="_blank" rel="noopener noreferrer">{item.company}</a></span>
              </h3>
              <span className="timeline-date">{item.date}</span>
              <p>{item.description}</p>
              {item.skills?.length && (
                <div className="skills">
                  {item.skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
