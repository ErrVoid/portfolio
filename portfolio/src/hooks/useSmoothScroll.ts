import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface UseSmoothScrollProps {
  onScroll?: (scroll: number, velocity: number) => void;
}

export const useSmoothScroll = ({ onScroll }: UseSmoothScrollProps = {}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    let animationFrameId: number;

    const animate = (time: number) => {
      lenis.raf(time);
      
      // Emit scroll data
      if (onScroll) {
        const progress = lenis.scroll / (lenis.limit || 1);
        onScroll(progress, lenis.velocity || 0);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, [onScroll]);

  return lenisRef;
};

export const scrollToElement = (element: HTMLElement | null, offset: number = 0) => {
  if (!element) return;
  
  const y = element.getBoundingClientRect().top + window.scrollY - offset;
  
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};
