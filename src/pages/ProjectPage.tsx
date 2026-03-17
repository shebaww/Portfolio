import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectPage.css';

interface Props {
  scrollToSection: (id: string) => void;
}

export default function ProjectPage({ scrollToSection }: Props) {
  const { title } = useParams<{ title: string }>();
  const [html, setHtml] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!title) return;
    fetch(`/assets/item-details/${title}.html`)
      .then(r => r.text())
      .then(text => {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        setHtml(doc.body.innerHTML);
      })
      .catch(() => setHtml('<p>Error loading project details.</p>'));
  }, [title]);

  return (
    <div className="page-container">
      <div className="project-content" dangerouslySetInnerHTML={{ __html: html }} />
      <button className="backBtn" onClick={() => scrollToSection('projects')}>
        <img src="/assets/arrow_down.png" alt="" aria-hidden="true" />
        Back to Projects
      </button>
    </div>
  );
}
