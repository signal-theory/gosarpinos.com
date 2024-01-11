import Image from 'next/image';
import Link from 'next/link';
import styles from '../components/CalloutMenu.module.css';

const MenuCallout = () => {
  return (
    <section className="viewport cream-color">
      <div className="page-container">
        <div className="responsive-column-container" style={{margin: '4em 0'}}>
          <div>
            <h3 className={styles.title}>
              Hungry for Our Vegan Menu or Our Gluten-Free Menu?
            </h3>
          </div>
          <div className={styles.buttons}>
            <Link href="/menu/vegan-menu" className={`${styles.button} btn primary-btn`}>See our vegan menu</Link>
            <Link href="/menu/gluten-free" className={`${styles.button} btn grayscale-outline-btn`}>See our Gluten-free menu</Link>
          </div>
        </div>
        <Image src={'/heart-red-fill.svg'} width={30} height={30} className={styles.redFillHeart} alt="red fill heart" />
        <Image src={'/heart-green-fill.svg'} width={30} height={30} className={styles.greenFillHeart} alt="green fill heart" />
        <Image src={'/heart-green-outline2.svg'} width={33} height={33} className={styles.greenOutlineHeart} alt="green outline heart" />
        <Image src={'/heart-red-outline.svg'} width={60} height={60} className={styles.redOutlineHeart} alt="red outline heart" />
      </div>
    </section>
  )
}

export default MenuCallout;