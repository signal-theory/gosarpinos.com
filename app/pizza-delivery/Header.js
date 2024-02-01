import React from 'react';
import styles from './Header.module.css';

const Header = ({ getUserLocation, search, debouncedSearch, filteredLocations }) => {
  return (
    <>
      <div className={styles.listSearch}>
        <button className={styles.searchBtn} onClick={getUserLocation}>Use Current Location</button>
        <span>-OR-</span>
        <input className={styles.inputBtn} type="text" value={search} onChange={e => { debouncedSearch(e.target.value); }} placeholder="Enter City, State, Zip" />
      </div>
      <h3 className={styles.title}>
        Free Pizza Delivery from {filteredLocations.length} Sarpino&apos;s Restaurants
      </h3>
    </>
  );
}

export default Header;