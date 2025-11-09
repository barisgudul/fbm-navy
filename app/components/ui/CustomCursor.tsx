/* app/components/ui/CustomCursor.tsx */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <motion.div
      className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full bg-fbm-gold-400 z-[999] pointer-events-none"
      style={{ translateX: '-50%', translateY: '-50%' }}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20, 
        mass: 0.1 
      }}
    />
  );
};

