import React from 'react';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

import { useRouter } from 'next/navigation'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './SearchPanel.module.css';
import { StyledAutocomplete } from './SearchPanel.styles';

const SearchPanel = ({ id, locations, getUserLocation, selectedLocation, setSelectedLocation }) => {
  const router = useRouter();
  const { setStore } = useContext(StoreContext);

  useEffect(() => {
    if (selectedLocation) {
      // router.push(`/pizza-delivery?location=${encodeURIComponent(selectedLocation)}`);
    }
  }, [selectedLocation]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setStore(locationStore[locationNames.indexOf(location)]);
    router.push(`/pizza-delivery?location=${encodeURIComponent(location)}`);
  };

  const handleUseCurrentLocation = async () => {
    await getUserLocation();
    router.push('/pizza-delivery');
  };

  const locationNames = locations.map(location => 'Sarpino\'s ' + location.acf.name + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip);
  const locationStore = locations.map(location => location.acf.name);

  return (
    <div className={styles.listSearch}>
      <button className={styles.searchBtn} onClick={handleUseCurrentLocation}>Use Current Location</button>
      <span>-OR-</span>
      <StyledAutocomplete>
        <Autocomplete
          disablePortal
          id={id}
          options={locationNames}
          value={selectedLocation || null}
          onChange={(event, newValue) => {
            if (!newValue) {
              localStorage.removeItem('selectedLocation');
              localStorage.removeItem('selectedStore');
            }
            handleLocationSelect(newValue || '');
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </StyledAutocomplete>
    </div>

  );
}

export default SearchPanel;