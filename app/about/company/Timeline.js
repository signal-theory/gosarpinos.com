'use client';
import Image from 'next/image';
import styles from './Timeline.module.css';

import { useEffect } from 'react';

const Timeline = ({ data }) => {

   useEffect(() => {
     if (typeof window !== 'undefined' && window.innerWidth > 768) {
      import('rellax').then(({ default: Rellax }) => {
        new Rellax('.rellax7');
        new Rellax('.rellax8');
        new Rellax('.rellax9');
        new Rellax('.rellax10');
        new Rellax('.rellax11');
        new Rellax('.rellax12');
        new Rellax('.rellax13');
      });
    }
  }, []);

  const timeline = data.acf?.timeline || [];

  return (
    <section className={`viewport`}>
      <div className={`full-page-container ${styles.container}`}>
        <div className="responsive-column-container">
          <div className={`${styles.content}`}>
            <div className={styles.innerHeroText}>
              {timeline.map((item, index) => (
                <div key={index} className={styles.timeline}>
                  <h4 className={styles.timelineYear}>{item.year}</h4>
                  <div className={styles.timelineInfo}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.animation}>
            <div className={`fade-in rellax13 ${styles.shadow}`} data-rellax-speed="1"></div>
            <Image src="/pepperoniPizza.webp"
              width={750}
              height={581}
              alt="pepperoni pizza"
              className={styles.pizzaImg}
            />
            <div className={`rellax7 ${styles.rellaxDiv}`} data-rellax-speed="-1">
              <Image src={'/pepperoni-1.webp'} width={220} height={220} className={styles.pepperoni1} alt="pepperoni" />
            </div>
            <div className={`rellax8 ${styles.rellaxDiv}`} data-rellax-speed="-2">
              <Image src={'/pepperoni-2.webp'} width={300} height={300} className={styles.pepperoni2} alt="pepperoni" />
            </div>
            <div className={`rellax9 ${styles.rellaxDiv}`} data-rellax-speed="-1">
              <Image src={'/pepperoni-3.webp'} width={300} height={300} className={styles.pepperoni3} alt="pepperoni" />
            </div>
            <div className={`rellax10 ${styles.rellaxDiv}`} data-rellax-speed="-2">
              <Image src={'/pepperoni-4.webp'} width={300} height={300} className={styles.pepperoni4} alt="pepperoni" />
            </div>
            <div className={`rellax11 ${styles.rellaxDiv}`} data-rellax-speed="-3">
              <Image src={'/pepperoni-5.webp'} width={300} height={300} className={styles.pepperoni5} alt="pepperoni" />
            </div>
            <div className={`rellax12 ${styles.rellaxDiv}`} data-rellax-speed="-2">
              <Image src={'/pepperoni-6.webp'} width={300} height={300} className={styles.pepperoni6} alt="pepperoni" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;