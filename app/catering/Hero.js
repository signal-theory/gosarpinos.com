import styles from './Hero.module.css'
import Image from 'next/image';
import Link from 'next/link';
const Hero = ({ featuredImage, featuredImageAlt, data }) => {
  return (
    <>
    <div className="responsive-column-container" style={{margin: '1em 0 2em', gridGap: '4rem'}}>
      <div className={styles.mask}>
       {featuredImage && (
          <Image
            alt={featuredImageAlt}
            src={featuredImage}
            width={650}
            height={650}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            />
        )}
      </div>
      <div className='flex-align-center'>
        <div>
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
          <Link href="/" className="btn primary-btn glow" style={{margin: '1rem auto 1rem 0'}}><span>Contact Your local Sarpino&apos;s</span></Link>
          <p style={{maxWidth: '255px'}}>{data.acf.description}</p>
        </div>
      </div>
    </div>
    <Image src={'/heart-red-fill.svg'} width={30} height={30} className={styles.redFillHeart} alt="red fill heart" />
    <Image src={'/heart-green-fill.svg'} width={40} height={40} className={styles.greenFillHeart} alt="green fill heart" />
    <Image src={'/heart-green-outline.svg'} width={50} height={50} className={styles.greenOutlineHeart} alt="green outline heart" />
    <Image src={'/heart-red-outline.svg'} width={60} height={60} className={styles.redOutlineHeart} alt="red outline heart" />
    </>
  );
}

export default Hero;