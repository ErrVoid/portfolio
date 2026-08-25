import React from 'react';
import { config } from '../data/config';

export const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="about-label">About</div>
      
      <div className="about-statement">
        {config.personal.bio.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < config.personal.bio.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      
      <div className="about-bio">
        <p>{config.personal.location}</p>
      </div>
    </section>
  );
};
