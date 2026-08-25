import React from 'react';
import { projects } from '../data/projects';

interface ProjectsProps {
  onProjectClick?: (project: typeof projects[0]) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
  return (
    <section className="projects" id="projects">
      {projects.map((project, index) => (
        <div 
          key={project.id} 
          className="project-item"
          onClick={() => onProjectClick?.(project)}
          style={{ cursor: 'pointer' }}
        >
          <div className="project-content">
            <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
            <h2 className="project-title">{project.title}</h2>
            <div className="project-category">{project.category}</div>
            <p className="project-description">{project.description}</p>
            <div className="project-meta">
              <span className="project-year">{project.year}</span>
              <span className="project-tech">{project.technologies.join(' / ')}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
