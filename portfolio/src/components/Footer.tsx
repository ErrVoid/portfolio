import React from 'react';
import { config } from '../data/config';

export const Footer: React.FC = () => {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <h3 className="footer-name">{config.personal.name}</h3>
        <p className="footer-title">{config.personal.title}</p>
        
        <div className="footer-socials">
          {config.social.github && (
            <a href={config.social.github} className="footer-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {config.social.linkedin && (
            <a href={config.social.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {config.social.behance && (
            <a href={config.social.behance} className="footer-link" target="_blank" rel="noopener noreferrer">
              Behance
            </a>
          )}
          {config.social.twitter && (
            <a href={config.social.twitter} className="footer-link" target="_blank" rel="noopener noreferrer">
              X
            </a>
          )}
        </div>
        
        <p className="footer-location">{config.personal.location}</p>
        <p className="footer-copyright">© {new Date().getFullYear()} {config.personal.name}. All rights reserved.</p>
      </div>
      
      <a href="#" className="back-to-top" onClick={handleBackToTop}>
        Back to Top ↑
      </a>
    </footer>
  );
};
