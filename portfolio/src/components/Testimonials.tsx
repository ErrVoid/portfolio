import React, { useState } from 'react';
import { config } from '../data/config';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="testimonials" id="testimonials">
      {config.testimonials.map((testimonial, index) => (
        <div
          key={index}
          style={{
            display: index === currentIndex ? 'block' : 'none',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <blockquote className="testimonial-quote">
            "{testimonial.quote}"
          </blockquote>
          <div className="testimonial-author">
            {testimonial.author} — {testimonial.role}
          </div>
        </div>
      ))}
      
      {config.testimonials.length > 1 && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
          {config.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? '#fff' : '#333',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
