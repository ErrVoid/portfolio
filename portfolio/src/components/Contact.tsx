import React from 'react';
import { config } from '../data/config';

export const Contact: React.FC = () => {
  return (
    <section className="contact" id="contact">
      <h2 className="contact-statement">
        LET'S MAKE<br />SOMETHING<br />IMPOSSIBLE.
      </h2>
      
      <div className="contact-links">
        <a href={`mailto:${config.personal.email}`} className="contact-link">
          {config.personal.email}
        </a>
        <a href={`tel:+1234567890`} className="contact-link">
          +1 (234) 567-890
        </a>
        <span className="contact-link">{config.personal.location}</span>
      </div>
    </section>
  );
};
