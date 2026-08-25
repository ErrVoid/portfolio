import { useEffect, useRef } from 'react';

interface UseCustomCursorProps {
  enabled?: boolean;
}

export const useCustomCursor = ({ enabled = true }: UseCustomCursorProps = {}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is touch-based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!enabled || isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;

    if (!cursor || !dot || !ring) return;

    // Cursor position tracking
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    // Smooth ring animation
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animateRing);
    };

    animateRing();

    // Hover states for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('a, button, .skill-item, .service-item, .project-link')) {
        if (ring) {
          ring.style.width = '60px';
          ring.style.height = '60px';
        }
        if (text) {
          text.textContent = 'VIEW';
          text.style.opacity = '1';
        }
      }

      if (target.closest('.image-hover, .project-image')) {
        if (ring) {
          ring.style.width = '80px';
          ring.style.height = '80px';
        }
        if (text) {
          text.textContent = 'EXPLORE';
          text.style.opacity = '1';
        }
      }

      if (target.closest('canvas, .webgl-element')) {
        if (ring) {
          ring.style.width = '100px';
          ring.style.height = '100px';
        }
        if (text) {
          text.textContent = 'INTERACT';
          text.style.opacity = '1';
        }
      }
    };

    const handleMouseLeave = () => {
      if (ring) {
        ring.style.width = '40px';
        ring.style.height = '40px';
      }
      if (text) {
        text.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  return { cursorRef, dotRef, ringRef, textRef };
};

// Custom Cursor Component
export const CustomCursor: React.FC = () => {
  const { cursorRef, dotRef, ringRef, textRef } = useCustomCursor({ enabled: true });

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={textRef} className="cursor-text" />
    </div>
  );
};
