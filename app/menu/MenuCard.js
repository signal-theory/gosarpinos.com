import Image from 'next/image';
import Link from 'next/link';
import OrderBtn from '../components/OrderBtn';
import styles from './MenuCard.module.css';

const MenuCard = ({ post, postTypeSlug, menuSlug, hoverImage, hoverAlt, featuredImage, featuredAlt }) => {

  const whichMenu = menuSlug === 'vegan-menu' ? 'vegan-menu' : 'menu';

  const url = `/${whichMenu}/${postTypeSlug}/${post.slug}`;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuThumb}>
          <Link href={url} className='fade-in'>
            {hoverImage && (
              <Image
                alt={hoverAlt}
                src={hoverImage}
                width={500}
                height={500}
                className={styles.hoverImage}
              />
            )}
            {featuredImage && (
              <Image
                alt={featuredAlt}
                src={featuredImage}
                width={500}
                height={500}
                className={styles.image}
              />
            )}
          </Link>
        </div>
        <div className={styles.label}>
          <h2 className={styles.title}><Link className={styles.link} href={url}>{post?.title?.rendered || ''}</Link></h2>
          <p
            className={styles.caption}
            dangerouslySetInnerHTML={{ __html: (post.acf.caption.split(' ').slice(0, 22).join(' ')) || 'Sarpino\'s traditional pan pizza baked to perfection and loaded with fresh ingredients.' }}
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