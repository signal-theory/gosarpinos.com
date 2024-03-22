import styles from './DeliveryArea.module.css';
const DeliveryArea = ({ post }) => {

  const areacities = post.acf?.area_cities || [];
  const areazips = post.acf?.area_zips || [];
  const areaneighborhoods = post.acf?.area_neighborhoods || [];
  const arealandmarks = post.acf?.area_landmarks || [];
  const areahotels = post.acf?.area_hotels || [];


  return (
    <>
      <div className={styles.container}>
        <h3>Sarpino&apos;s delivers food to:</h3>
        {areacities &&
          <ul className={styles.list}>
            {areacities.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        }
        <h5 className={styles.title}>Find best pizza places that deliver in and around {post.acf.city}, {post.acf.state}</h5>
        {areaneighborhoods &&
          <ul className={styles.list}>
            {areaneighborhoods.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        }
      </div>
      <div className={styles.container}>
        <h5 className={styles.title}>Food Delivery To Zip Codes</h5>
        {areazips &&
          <ul className={styles.list}>
            {areazips.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        }
      </div>
      <div className={styles.container}>
        <h5 className={styles.title}>Hotel Delivery Options</h5>
        {areahotels &&
          <ul className={styles.list}>
            {areahotels.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        }
      </div>
      <div className={styles.container}>
        <h5 className={styles.title}>Late Night Food Delivery To:</h5>
        {arealandmarks &&
          <ul className={styles.list}>
            {arealandmarks.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        }
      </div>
    </>
  );
}

export default DeliveryArea;