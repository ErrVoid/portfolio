import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);

        if (intersecting && triggerOnce && !hasTriggered) {
          setHasTriggered(true);
        }

        if (!triggerOnce) {
          setIsIntersecting(intersecting);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref: elementRef, isIntersecting, hasTriggered };
};

// Hook for animating elements when they come into view
export const useRevealOnScroll = (animationClass = 'reveal-active') => {
  const { ref, isIntersecting, hasTriggered } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const element = ref.current;
    if (element && isIntersecting) {
      element.classList.add(animationClass);
    }
  }, [ref, isIntersecting, animationClass]);

  return { ref, isVisible: hasTriggered };
};
