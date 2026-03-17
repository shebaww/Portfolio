import { useReveal } from '../hooks/useReveal';
import { useDecode } from '../hooks/useDecode';
import './About.css';

const SKILLS_1 = ['Python', 'C++', 'ROS1 / ROS2', 'React', 'TypeScript', 'PyTorch', 'Computer Vision', 'SLAM'];
const SKILLS_2 = ['Deep Learning', 'C#', 'Linux', 'Docker', 'Git', 'Embedded Systems', 'Path Planning', 'Sensor Fusion'];

export default function About() {
  const revealRef = useReveal();
  const { ref: decodeRef, onMouseEnter, onMouseLeave } = useDecode();

  // Merge both refs
  const headingRef = (el: HTMLHeadingElement | null) => {
    (revealRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
    (decodeRef as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
  };

  return (
    <div className="about-container">
      <div className="about-content glass glow-on-hover">
        <h1 ref={headingRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>About Me</h1>
        <p>
          I'm an Electrical Engineering graduate from the University of California, Riverside, with a Master's degree
          focused on Machine Intelligence and autonomous systems. My academic background in both Electrical Engineering
          and Applied Mathematics (Physics) has shaped my ability to approach complex technical challenges with analytical
          precision and interdisciplinary insight.
        </p>
        <p>
          I'm passionate about building intelligent machines that can perceive, decide, and act autonomously in dynamic
          environments. My experience spans robotics, computer vision, reinforcement learning, and embedded systems —
          enabling me to understand and contribute to intelligent systems across both hardware and software layers.
        </p>
        <p>
          Professionally, I've worked across startups, research labs, and industry roles, contributing to projects in
          SLAM, perception, and navigation pipelines. From integrating advanced localization algorithms at a robotics
          startup to leading autonomy development for a drone team, I bring a hands-on, full-cycle R&D mindset to every
          challenge.
        </p>
        <p>
          I'm always seeking opportunities to apply and grow these skills in meaningful, forward-thinking projects —
          whether in robotics, intelligent systems, or AI applications that create real-world impact.
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...SKILLS_1, ...SKILLS_1].map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
          </div>
        </div>
        <div className="marquee-container mt-2">
          <div className="marquee-content reverse">
            {[...SKILLS_2, ...SKILLS_2].map((s, i) => <span key={i} className="skill-tag secondary-tag">{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
