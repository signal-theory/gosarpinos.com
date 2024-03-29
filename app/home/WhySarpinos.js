'use client';
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import CalloutWhy from '@/app/components/CalloutWhy';
const WhySarpinos = () => {
  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';

  return (
    <section className={`viewport text-align-center ${isDay === false ? 'daytime-background-color' : 'nighttime-background-color'}`} style={{ paddingTop: 0 }}>
      <h2 style={{ padding: '3rem 0 0' }}>WHY SARPINO&apos;S?</h2>
      <CalloutWhy
        containerClasses={'page-container cream-outline text-align-center'}
        gridClasses={isDay === false ? 'night-theme' : ''}
      />
    </section>
  );
}

export default WhySarpinos;