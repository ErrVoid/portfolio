import React from 'react';

interface NavigationProps {
  isVisible?: boolean;
  onNavigate?: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isVisible = true, onNavigate }) => {
  const navItems = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = href.replace('#', '');
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onNavigate?.(section);
  };

  return (
    <nav 
      className="navigation"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <a href="#" className="nav-logo">
        {String.fromCharCode(65)} {/* Placeholder for logo */}
      </a>
      
      <div className="nav-links">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link"
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
