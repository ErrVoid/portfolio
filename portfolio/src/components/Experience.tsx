import React from 'react';
import { config } from '../data/config';

export const Experience: React.FC = () => {
  return (
    <section className="experience" id="experience">
      <h2>Experience</h2>
      
      <div className="timeline">
        {config.experience.map((item, index) => (
          <div key={index} className="timeline-item">
            <span className="timeline-year">{item.year}</span>
            <div className="timeline-content">
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
