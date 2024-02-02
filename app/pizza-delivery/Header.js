import React from 'react';
import styles from './Header.module.css';

const Header = ({ filteredLocations }) => {
  return (
    <>
      <h3 className={styles.title}>
        Free Pizza Delivery from {filteredLocations.length > 1 ? filteredLocations.length : ''} Sarpino&apos;s Restaurants
      </h3>
    </>
  );
}

export default Header;