'use client';

import { useState, useEffect } from 'react';
import OrderBtn from './OrderBtn';

const MobileOrderBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolled]);

  return isScrolled && <OrderBtn theme="mobile" />;
}

export default MobileOrderBtn;