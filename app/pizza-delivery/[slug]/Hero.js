'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import he from 'he';
import styles from './Hero.module.css';
import OrderBtn from '@/app/components/OrderBtn';
import Link from 'next/link';
import { checkOpenStatus } from '../../lib/checkOpenStatus';



const Hero = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOpenTime, setCurrentOpenTime] = useState('');
  const [currentCloseTime, setCurrentCloseTime] = useState('');
  const [nextOpenTime, setNextOpenTime] = useState('');

  useEffect(() => {
    const status = checkOpenStatus(post);
    setIsOpen(status.isOpen);
    setCurrentOpenTime(status.currentOpenTime || '');
    setCurrentCloseTime(status.currentCloseTime || '');
    setNextOpenTime(status.nextOpenTime || '');
  }, [post]);

  return (
    <section className={styles.hero}>
      <Image
        src="/location-hero-sarpinos.jpg"
        alt={`Exterior view of Sarpinos Location`}
        width={1366}
        height={509}
        className={styles.heroImage}
      />
      <div className={`page-container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>{he.decode(post.title.rendered)}</h1>
        <h4>{isOpen ? `Open Now: ${currentOpenTime} - ${currentCloseTime}` : `Opens at: ${nextOpenTime}`}</h4>
        <OrderBtn />&nbsp;&nbsp;&nbsp; <Link className='btn secondary-btn' href={post.acf.google_write_a_review_link.url} target="_blank"><span>Rate us on Google</span></Link>
        <br />
        <Link className={styles.pinBtn} href="/pizza-delivery/">Other Pizza Near Me</Link>
      </div>
    </section>
  );
}

export default Hero;