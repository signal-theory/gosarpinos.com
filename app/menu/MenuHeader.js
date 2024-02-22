import Image from 'next/image';
import styles from './MenuHeader.module.css';
const MenuHeader = ({ featuredImage, featuredImageAlt, pageTitle, pageContent }) => {
  return (
    <div className="responsive-column-container" style={{ margin: '1em 0 2em' }}>
      <div>
        {featuredImage && (
          <Image
            priority
            alt={featuredImageAlt}
            src={featuredImage}
            width={650}
            height={400}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        )}
      </div>
      <div className='flex-align-center'>
        <h2 style={{ margin: '0 auto 0 0' }} dangerouslySetInnerHTML={{ __html: pageTitle || '' }} />
        <div dangerouslySetInnerHTML={{ __html: pageContent || '' }} />
      </div>
    </div>
  )
}

export default MenuHeader;