// hooks/useScrollDirection.ts

'use client';

import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ถ้าเลื่อนขึ้น (มากกว่า 50px) ให้แสดง navbar
      if (currentScrollY < prevScrollY - 50) {
        setIsVisible(true);
      }
      // ถ้าเลื่อนลง (น้อยกว่า -50px) ให้ซ่อน navbar
      else if (currentScrollY > prevScrollY + 50) {
        setIsVisible(false);
      }

      // ถ้าอยู่ที่ top สุด ให้แสดง navbar
      if (currentScrollY < 100) {
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return isVisible;
};
