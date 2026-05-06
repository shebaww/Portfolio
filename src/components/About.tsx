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
 I'm a 17-year-old in Ethiopia who self-studies MIT calculus because my school has no advanced math track. I build at the intersection of code and markets. Based in Addis Ababa, I self-study university-level mathematics (Linear Algebra, multivariable Calculus, Differential Equations via MIT OCW) and develop algorithmic trading systems in Python. I don't just watch lectures I solve every problem, write solutions in LaTeX, and publish everything on GitHub. I believe learning in the open is more honest, and a public commit history is more credible than a list of courses.
</p>
      <p>
I've built real systems: a fullstack platform serving 200+ readers for my school's newspaper club, the first website for a Business Club I co-founded, and my own portfolio from scratch. I shadowed Nib Bank's analytics team and worked as a Website Administrator at Addis Asqual.

Outside technical work: I've won multiple Model UN conferences (Best Delegate, Outstanding Delegate) and earned a UNESCO Facilitator certificate. As Head of Delegate Training, I coached over 30 students in argumentation and strategy. Two went on to win Best Delegate and earn international scholarships; five others placed. That matters more to me than my own awards.
</p><p>
I'm currently preparing for the AMC 12 while working through Harvard's CS50. My long-term goal is quantitative research: building systems that process real data, make reasoned decisions, and can be held accountable when wrong.


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
