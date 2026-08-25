import React from 'react';
import { config } from '../data/config';

export const Services: React.FC = () => {
  return (
    <section className="services" id="services">
      <h2>Services</h2>
      
      <div className="services-list">
        {config.services.map((service, index) => (
          <div key={index} className="service-item">
            <span className="service-number">{service.number}</span>
            <span className="service-title">{service.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
