'use client';
import Image from 'next/image';
import styles from './InstagramFeed.module.css';

const InstagramFeed = ({ feed }) => {

  return (
    <div className={styles.socialFeed} style={{ margin: '6rem 0' }}>
      {feed.map((item, index) => {
        return (
          <div
            key={index} className={styles.imageContainer}>
            <Image
              src={item.image.sourceUrl}
              alt={item.image.altText}
              className={styles.image}
              width={100}
              height={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.overlay}>
              <span>FOLLOW US &nbsp;&nbsp;<Image
                src={"/icon-instagram.svg"}
                width={30}
                height={30}
                alt="Instagram"
              /></span>
              <span className={styles.handle}>@sarpinos_pizzeria</span>
            </div>
          </div>
        );
      }
      )}
    </div>
  );
};

export default InstagramFeed;