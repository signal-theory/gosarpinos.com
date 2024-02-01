import styles from './List.module.css';
import Link from 'next/link';

const List = ({ locations, openInfoWindowId, setOpenInfoWindowId }) => {

  return (
    <ul>
      {locations.map((location, index) => (
        <li className={styles.listItem} key={location.id}>
          <h5 className={styles.listTitle} onClick={() => setOpenInfoWindowId(location.id)}>{location.acf.name}</h5>
          <div className={styles.listColumns}>
            <div>
              <p><strong>Open Now &bull; 10am - 2am</strong></p>
              <p>{location.acf.address}<br />
                {location.acf.city}, {location.acf.state} {location.acf.zip}
              </p>
              <Link className={styles.textLink} href="">Directions</Link>
            </div>
            <div>
              <p>{location.acf.phone || 'phone number'}</p>
              <Link className='btn primary-btn' href=""><span>See Store Info</span></Link>
            </div>
          </div>

        </li>
      ))}
    </ul>
  );
};

export default List;