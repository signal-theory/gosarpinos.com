import styles from './BYOContent.module.css';

const BYOContent1 = () => {

  return (
    <div className={styles.itemInfo}>
      <div className={styles.sizes}>
        <div className={styles.sizeBtn}>8&quot;</div>
        <div className={styles.sizeBtn}>10&quot;</div>
        <div className={styles.sizeBtn}>12&quot;</div>
        <div className={styles.sizeBtn}>14&quot;</div>
        <div className={styles.sizeBtn}>16&quot;</div>
      </div>
      
    </div>
  );
}

export default BYOContent1;