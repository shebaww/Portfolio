import { useReveal } from '../hooks/useReveal';
import { Coursework as CourseworkData } from '../constants';
import './Coursework.css';

export default function Coursework() {
  const revealRef = useReveal();

  return (
    <section className="coursework-container">
      <h1 ref={revealRef as React.Ref<HTMLHeadingElement>}>Relevant Coursework</h1>
      <div className="coursework-columns">
        <div className="course-category glass glow-on-hover">
          <div className="category-header">
            <h3>HighSchool</h3>
            <div className="badge">hS</div>
          </div>
          <ul>
            {CourseworkData.graduate.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div className="course-category glass glow-on-hover">
          <div className="category-header">
            <h3>Independent Study</h3>
            <div className="badge">IS</div>
          </div>
          <ul>
            {CourseworkData.undergrad.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
