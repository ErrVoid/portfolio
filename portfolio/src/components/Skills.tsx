import React from 'react';
import { config } from '../data/config';

export const Skills: React.FC = () => {
  return (
    <section className="skills" id="skills">
      <h2>Expertise</h2>
      
      <div className="skills-list">
        {config.skills.map((skill, index) => (
          <span key={index} className="skill-item">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};
