import { useState, useEffect, useCallback } from 'react';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const useTilt = (ref, { enableTilt = true }) => {
  const [style, setStyle] = useState({});

  const handlePointerMove = useCallback((e) => {
    if (!enableTilt || !ref.current) return;

    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    
    const x = clamp((clientX - left) / width, 0, 1);
    const y = clamp((clientY - top) / height, 0, 1);

    const rotateX = (x - 0.5) * 30; // Increased sensitivity for a better effect
    const rotateY = -(y - 0.5) * 30; // Increased sensitivity for a better effect

    setStyle({
      '--pointer-x': `${x * 100}%`,
      '--pointer-y': `${y * 100}%`,
      '--rotate-x': `${rotateX}deg`,
      '--rotate-y': `${rotateY}deg`,
      '--card-opacity': '1',
      '--transition-duration': '0.1s', // Fast transition for following the mouse
      '--transition-timing': 'ease-out',
    });
  }, [enableTilt, ref]);

  const handlePointerLeave = useCallback(() => {
    if (!enableTilt) return;
    
    setStyle({
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--card-opacity': '0',
      '--transition-duration': '0.6s', // Slower transition for resetting
      '--transition-timing': 'cubic-bezier(0.23, 1, 0.32, 1)',
    });
  }, [enableTilt]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enableTilt) return;

    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', handlePointerLeave);
    
    handlePointerLeave(); // Set initial state

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [ref, enableTilt, handlePointerMove, handlePointerLeave]);
  
  // No need to split styles anymore, pass the whole style object
  const wrapperProps = { style };

  // Glare and Shine don't need their own styles now, they will inherit transform
  const glareStyle = {};
  const shineStyle = {};

  return { wrapperProps, glareStyle, shineStyle };
};