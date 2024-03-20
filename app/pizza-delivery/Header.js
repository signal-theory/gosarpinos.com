import styles from './Header.module.css';

const Header = ({ filteredLocations }) => {

  return (
    <>
      <h3 className={styles.title}>
        {`Free Pizza Delivery from ${filteredLocations.length > 1 ? filteredLocations.length : ''} Sarpino\’s Restaurants`}
      </h3>
    </>
  );
}

export default Header;