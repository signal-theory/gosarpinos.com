import Image from 'next/image';
import he from 'he';
import styles from './Hero.module.css';
import OrderBtn from '../../components/OrderBtn';
import Link from 'next/link';

const Hero = ({ post }) => {
  return (
    <section className={styles.hero}>
      <Image
        src="/location-hero-sarpinos.jpg"
        alt={`Exterior view of ${he.decode(post.title.rendered)}`}
        width={1366}
        height={509}
        className={styles.heroImage}
      />
      <div className={`page-container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>{he.decode(post.title.rendered)}</h1>
        <h4>OPEN NOW &bull; 10AM-2AM</h4>
        <OrderBtn />&nbsp;&nbsp;&nbsp; <Link className='btn primary-btn' href=""><span>Rate us</span></Link>
      </div>
    </section>
  );
}

export default Hero;