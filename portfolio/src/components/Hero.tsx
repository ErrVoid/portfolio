import React from 'react';
import { config } from '../data/config';

export const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <h1 className="hero-title">
        {config.personal.name.split(' ').map((word, i) => (
          <React.Fragment key={i}>
            {word}
            {i < config.personal.name.split(' ').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
      
      <p className="hero-subtitle">
        {config.personal.subtitle}
      </p>
      
      <div className="scroll-indicator">
        Scroll to Explore ↓
      </div>
    </section>
  );
};
