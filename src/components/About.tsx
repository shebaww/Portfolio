import { useReveal } from '../hooks/useReveal';
import './About.css';

const SKILLS_1 = ['Python', 'React', 'TypeScript', 'HTML', 'SQL', 'Javascript', "Basic 3D Modeling"];
const SKILLS_2 = ['Deep Learning','Linux', 'Docker', 'Git','C', 'React-Native', "CSS", "TailWindCSS", "Data Structures"];

export default function About() {
  const revealRef = useReveal();

return (
<div className="about-container">
 <div className="about-content glass glow-on-hover">
 <h1 ref={revealRef as React.Ref<HTMLHeadingElement>}>About Me</h1>
<p>
        I'm a 16-year-old student in Ethiopia with a deep passion for 
        mathematics, programming, and quantitative finance. Currently pursuing self-study in Linear Algebra and Calculus I subjects 
        I believe form the foundation of any serious quantitative work.
      </p>
      <p>
        My interests sit at the intersection of code and markets. I'm building 
        skills in Python (with plans to tackle the scientific stack: Pandas, NumPy, 
        Matplotlib) and working toward algorithmic trading projects that combine 
        my love for programming with financial analysis. The goal: create trading 
        algorithms and bots that demonstrate real quantitative thinking.
      </p>
      <p>
        Beyond the screen, I'm deeply involved in my school community. I've 
        competed in multiple Model United Nations conferences taking home Best 
        Delegate and Outstanding Delegate awards and co-founded my school's first 
        Business Club, where I built the club website from scratch. I'm also an 
        executive member of MUN, a debate competitor, and someone who believes 
        leadership means building things that last.
      </p>
      <p>
        I'm currently working through Harvard's CS50, preparing for hackathons 
        (including MLH Ethiopia 2026), and documenting everything on GitHub. My 
        long-term vision involves quantitative research, building intelligent 
        systems, and eventually contributing to open-source projects that matter.
      </p>
      <p>
        Whether it's soldering electronics on a weekend or grinding through 
        integral problems on Daily Integral, I'm always looking for the next 
        challenge that blends analytical rigor with creative problem-solving.
      </p>
    </div>
      <div className="skills-grid">
        {[...SKILLS_1, ...SKILLS_2].map((s, i) => (
          <span key={i} className={`skill-tag ${i >= SKILLS_1.length ? 'secondary-tag' : ''}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
