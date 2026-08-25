import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionProps {
  smooth?: boolean;
  damping?: number;
}

export const useMousePosition = ({ smooth = true, damping = 0.1 }: UseMousePositionProps = {}) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const currentPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const targetPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = {
        x: e.clientX,
        y: e.clientY,
      };

      if (!smooth) {
        setPosition(targetPosition.current);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth interpolation loop
    const animate = () => {
      if (smooth) {
        currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * damping;
        currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * damping;

        setPosition({ ...currentPosition.current });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (smooth) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [smooth, damping]);

  return position;
};

export const useMouseVelocity = () => {
  const [velocity, setVelocity] = useState<number>(0);
  const lastPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastTime = useRef<number>(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime > 0) {
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const newVelocity = distance / deltaTime;

        // Smooth velocity
        setVelocity((prev) => prev * 0.9 + newVelocity * 0.1);
      }

      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = currentTime;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return velocity;
};
