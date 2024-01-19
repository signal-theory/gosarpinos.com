import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = ({ data, mainImage }) => {


  return (
    <div className="responsive-column-container">
      <div className={`flex-align-center order2 ${styles.textCol}`}>
        <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: data?.title.rendered || '' }} />
        <div dangerouslySetInnerHTML={{ __html: data?.content.rendered || '' }} />
        <div className='display-flex'>
          <Link href="" className="btn primary-btn"><span>Log In</span></Link>
          <Link href="" className="btn secondary-btn"><span>Sign Up</span></Link>
        </div>
      </div>
      <div className={`order1 ${styles.imageCol}`}>
        {mainImage && (
          <Image
            src={mainImage.sourceUrl}
            alt={mainImage.altText}
            width={650}
            height={412}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        )}
      </div>
    </div>
  );
}

export default Hero;