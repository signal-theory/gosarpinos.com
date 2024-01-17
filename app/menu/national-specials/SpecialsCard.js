import Image from 'next/image';
import styles from './SpecialsCard.module.css';

const SpecialsCard = ({ acfTitle, postTitle, category }) => {

  return (
    <>
      <div className={styles.specials}>
        <div className={styles.specialsItem}>
          <Image
            src={'/circle-outline-1.svg'}
            alt=""
            width={200}
            height={200}
            className={styles.specialsBkg}
          />
          <div className={styles.item}>
            <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: acfTitle || '' }} />
            <p>with code</p>
            <h3 className={styles.code}>{postTitle}</h3>
          </div>
        </div>
        {category.includes('Carryout Only') ? <p>Carryout Only</p> : null}
      </div>
    </>
  );
}

export default SpecialsCard;