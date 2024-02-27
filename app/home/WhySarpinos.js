'use client';
import { useState, useEffect } from 'react';
import { checkTime } from '../lib/checkTime';
import CalloutWhy from '../components/CalloutWhy';
import InstagramFeed from './InstagramFeed';
const WhySarpinos = ({ randomImages }) => {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    setIsDay(checkTime());
  }, []);
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