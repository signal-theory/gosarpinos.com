import React from 'react';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

import { useRouter } from 'next/navigation'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './SearchPanel.module.css';
import { StyledAutocomplete } from './SearchPanel.styles';
import he from 'he';

const SearchPanel = ({ id, theme, locations, getUserLocation, selectedLocation, setSelectedLocation }) => {
  const router = useRouter();
  const { setStore } = useContext(StoreContext);


  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setStore(locationStore[locationNames.indexOf(location)]);
    router.push(`/pizza-delivery?location=${encodeURIComponent(location)}`);
  };

  const handleUseCurrentLocation = async () => {
    await getUserLocation();
    router.push('/pizza-delivery');
  };

  const locationNames = locations.map(location => he.decode(location.title.rendered) + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip);
  const locationStore = locations.map(location => location.acf.name);

  return (
    <div className={theme === "map" ? styles.listSearch : styles.navSearch}>
      <button className={styles.searchBtn} onClick={handleUseCurrentLocation}>Use Current Location</button>
      <span>-OR-</span>
      <StyledAutocomplete>
        <Autocomplete
          disablePortal
          id={id}
          options={locationNames}
          value={selectedLocation || null}
          onChange={(event, newValue) => {
            if (newValue) {
              handleLocationSelect(newValue);
            } else {
              localStorage.removeItem('selectedLocation');
              localStorage.removeItem('selectedStore');
              setSelectedLocation(null);
              setStore(null);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </StyledAutocomplete>
    </div>

  );
}

export default SearchPanel;