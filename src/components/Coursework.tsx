import { useReveal } from '../hooks/useReveal';
import { useDecode } from '../hooks/useDecode';
import { Coursework as CourseworkData } from '../constants';
import './Coursework.css';

export default function Coursework() {
  const revealRef = useReveal();
  const { ref: decodeRef, onMouseEnter, onMouseLeave } = useDecode();

  const headingRef = (el: HTMLHeadingElement | null) => {
    (revealRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
    (decodeRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
  };

  return (
    <section className="coursework-container">
      <h1 ref={headingRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Relevant Coursework</h1>
      <div className="coursework-columns">
        <div className="course-category glass glow-on-hover">
          <div className="category-header">
            <h3>Graduate</h3>
            <div className="badge">MS</div>
          </div>
          <ul>
            {CourseworkData.graduate.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div className="course-category glass glow-on-hover">
          <div className="category-header">
            <h3>Undergrad</h3>
            <div className="badge">BS</div>
          </div>
          <ul>
            {CourseworkData.undergrad.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
