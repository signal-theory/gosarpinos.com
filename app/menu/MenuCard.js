import Image from 'next/image';
import Link from 'next/link';
import OrderBtn from '../components/OrderBtn';
import styles from './MenuCard.module.css';

const MenuCard = ({ post, postType, hoverImage, hoverAlt, featuredImage, featuredAlt }) => {



  const url = `/menu/${postType}/${post.slug}`;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuThumb}>
         <Link href={url}>
          {hoverImage && (
            <Image
              alt={hoverAlt}
              src={hoverImage}
              width={500}
              height={300}
              className={styles.hoverImage}
            />
          )}
          {featuredImage && (
            <Image
              alt={featuredAlt}
              src={featuredImage}
              width={500}
              height={300}
              className={styles.image}
            />
          )}
        </Link>
        </div>
        <div className={styles.label}>
          
          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
          <p
            className={styles.caption}
            dangerouslySetInnerHTML={{  __html: post.acf.caption }}
          />
          <p className={styles.links}>
            <OrderBtn />
            <Link className={styles.link} href={url}>More Info</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default MenuCard;