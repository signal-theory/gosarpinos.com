'use client';
import Image from 'next/image';
import OrderBtn from '../../components/OrderBtn';
import styles from './Hero.module.css';

import { useEffect } from 'react';

const Hero = ({ data, heroImage }) => {
   useEffect(() => {
    if (window.innerWidth > 768) {
      import('rellax').then(({ default: Rellax }) => {
        new Rellax('.rellax1');
        new Rellax('.rellax2');
        new Rellax('.rellax3');
        new Rellax('.rellax4');
        new Rellax('.rellax5');
        new Rellax('.rellax6');
      });
    }
  }, []);
 
  return (
    <>
    <section className={`viewport`}>
      <div className={`full-page-container ${styles.container}`}>
        <div className="responsive-column-container">
          <div className={styles.animation}>
            <div className={styles.shadow}></div>
            <Image
              src={heroImage.sourceUrl}
              alt={heroImage.altText}
              width={750}
              height={641}
              className={styles.pizzaImg}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={`rellax1 ${styles.rellaxDiv}`} data-rellax-speed="-1">
              <Image src={'/basil-leaf-1.webp'} width={220} height={220} className={styles.basilLeaf1} alt="basil leaf" />
            </div>
            <div className={`rellax2 ${styles.rellaxDiv}`} data-rellax-speed="-2">
              <Image src={'/basil-leaf-2.webp'} width={300} height={300} className={styles.basilLeaf2} alt="basil leaf" />
            </div>
            <div className={`rellax3 ${styles.rellaxDiv}`} data-rellax-speed="-5">
              <Image src={'/basil-leaf-3.webp'} width={300} height={300} className={styles.basilLeaf3} alt="basil leaf" />
            </div>
            <div className={`rellax4 ${styles.rellaxDiv}`} data-rellax-speed="-3">
              <Image src={'/basil-leaf-4.webp'} width={300} height={300} className={styles.basilLeaf4} alt="basil leaf" />
            </div>
            <div className={`rellax5 ${styles.rellaxDiv}`} data-rellax-speed="-4">
              <Image src={'/basil-leaf-1.webp'} width={300} height={300} className={styles.basilLeaf5} alt="basil leaf" />
            </div>
            <div className={`rellax6 ${styles.rellaxDiv}`} data-rellax-speed="-3">
              <Image src={'/basil-leaf-2.webp'} width={300} height={300} className={styles.basilLeaf6} alt="basil leaf" />
            </div>
          </div>
          <div className={`${styles.content}`}>
            <div className={styles.innerHeroText}>
              <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
              <OrderBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Hero;