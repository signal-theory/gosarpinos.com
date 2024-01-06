'use client';
import Image from 'next/image';
import styles from './Timeline.module.css';

import { useEffect } from 'react';

const Timeline = ({ data }) => {

   useEffect(() => {
    if (window.innerWidth > 768) {
      import('rellax').then(({ default: Rellax }) => {
        new Rellax('.rellax7');
        new Rellax('.rellax8');
        new Rellax('.rellax9');
        new Rellax('.rellax10');
        new Rellax('.rellax11');
        new Rellax('.rellax12');
      });
    }
  }, []);
  return (
    <section className={`viewport`}>
      <div className={`full-page-container ${styles.container}`}>
        <div className="responsive-column-container">
          <div className={`${styles.content}`}>
            <div className={styles.innerHeroText}>
              Pizza ipsum dolor amet meat lovers meatball buffalo sauce onions philly chicken broccoli pepperoni. Extra sauce bbq sauce steak pepperoni parmesan. Melted cheese pesto bacon peppers. Lasagna pizza pizza roll bbq pan large beef extra sauce. Broccoli party meatball philly steak ham philly chicken pizza garlic parmesan beef garlic parmesan NY style bianca ricotta. Green bell peppers pepperoni chicken and bacon thin crust hawaiian garlic garlic sauce. Deep crust bacon & tomato stuffed bianca chicken.

Personal peppers thin crust, sausage black olives pizza anchovies extra sauce platter philly steak thin crust meatball ricotta ham. Pie ranch pepperoni white pizza onions stuffed meatball thin crust. Red onions buffalo sauce bbq rib chicken wing meatball. Pepperoni pie red onions personal, steak meatball stuffed crust bacon & tomato bianca anchovies white garlic melted cheese pepperoni.

White garlic bbq rib fresh tomatoes sausage, beef ham chicken black olives pizza roll party meatball. Sauteed onions fresh tomatoes mayo, Chicago style anchovies onions black olives string cheese. Personal peppers spinach banana peppers meatball pizza roll. Chicken wing mozzarella ricotta pie, extra sauce peppers pepperoni banana peppers marinara sausage white garlic chicken wing anchovies. Pork pan stuffed crust, bacon pie meatball pepperoni lasagna black olives fresh tomatoes platter. Burnt mouth chicken wing deep crust, broccoli bbq rib spinach chicken and bacon parmesan sausage meatball anchovies hand tossed ranch pan meatball. Hand tossed bianca sausage pizza roll chicken wing philly steak banana peppers mozzarella beef Chicago style fresh tomatoes pepperoni stuffed crust.


            </div>
          </div>
          <div className={styles.animation}>
            <div className={styles.shadow}></div>
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