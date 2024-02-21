import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header = ({ filteredLocations }) => {
  const router = useRouter();
  const noStore = router && router.query && router.query.noStore;
  return (
    <>
      <h3 className={styles.title}>
        {noStore ? 'Please choose your restaurant first' : `Free Pizza Delivery from ${filteredLocations.length > 1 ? filteredLocations.length : ''} Sarpino\’s Restaurants`}
      </h3>
    </>
  );
}

export default Header;