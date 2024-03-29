import Image from 'next/image';
import Link from 'next/link';
import styles from './CalloutMenu.module.css';

const MenuCallout = () => {
  return (
    <section className="viewport cream-color">
      <div className="page-container">
        <div className="responsive-column-container" style={{ margin: '4em 0' }}>
          <div>
            <h3 className={styles.title}>
              Hungry for Our Vegan Menu?
            </h3>
          </div>
          <div className={styles.buttons}>
            <Link href="/vegan-menu/vegan-pizza" className={`${styles.button} btn primary-btn`}><span>See our vegan menu</span></Link>
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