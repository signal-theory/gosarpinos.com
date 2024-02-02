import styles from './DeliveryArea.module.css';
const DeliveryArea = ({ post }) => {
  return (
    <>
      <div className={styles.container}>
        <h3>Sarpino&apos;s delivers food to:</h3>
        <h5 className={styles.title}>{post.acf.city}</h5>
        <p>cities list</p>
      </div>
      <div className={styles.container}>
        <h5 className={styles.title}>Food Delivery To Zip Codes</h5>
        <p>zip code list</p>
      </div>
      <div className={styles.container}>
        <h5 className={styles.title}>Hotel Delivery Options</h5>
        <p>hotel list</p>
      </div>
      <div className={styles.container}>
        <h5 className={styles.title}>Late Night Food Delivery To:</h5>
        <p>cities list</p>
      </div>
    </>
  );
}

export default DeliveryArea;