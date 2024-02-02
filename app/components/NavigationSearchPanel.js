import React from 'react';
import { useRouter } from 'next/navigation'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from '../pizza-delivery/SearchPanel.module.css';
import he from 'he';

const NavigationSearchPanel = ({ locations, getUserLocation, selectedLocation, setSelectedLocation, handleSubmenu }) => {
  const router = useRouter();

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // localStorage.setItem('selectedCity', location.acf.name); // Save the city to local storage
    router.push(`/pizza-delivery?location=${encodeURIComponent(location)}`);
    handleSubmenu('Locations'); // Close the submenu
  };

  const handleUseCurrentLocation = async () => {
    await getUserLocation();
    router.push('/pizza-delivery');
    handleSubmenu('Locations'); // Close the submenu
  };

  const locationNames = locations ? locations.map(location => he.decode(location.title.rendered) + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip) : [];

  return (
    <div className={styles.listSearch}>
      <button className={styles.searchBtn} onClick={handleUseCurrentLocation}>Use Current Location</button>
      <span>-OR-</span>

      <Autocomplete
        disablePortal
        id="autocomplete-navigation"
        options={locationNames}
        value={selectedLocation || null}
        onChange={(event, newValue) => {
          if (!newValue) {
            localStorage.removeItem('selectedLocation');
            localStorage.removeItem('selectedCity');
          }
          handleLocationSelect(newValue || '');
        }}
        sx={{
          width: 200,
          '& .MuiInputBase-root': {
            backgroundColor: 'white',
            borderRadius: '100px',
            padding: '0.2rem 1rem 0.25rem 1rem',
            fontFamily: 'museo-slab, Cambria, Cochin',
            fontSize: '0.875rem',
          },
          '& .MuiAutocomplete-popper': {
            fontFamily: 'museo-slab, Cambria, Cochin',
            fontSize: '0.875rem',
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'museo-slab, Cambria, Cochin',
            fontSize: '0.875rem',
            transform: 'translate(20px, 12px) scale(1)',
            color: 'black',
            padding: '0 0.5rem'
          },
          '& .MuiInputLabel-root.Mui-focused': {
            transform: 'translate(14px, -18px) scale(0)',
            fontSize: '0',
          },
          '& .MuiFormLabel-filled': {
            transform: 'translate(14px, -18px) scale(0)',
            fontSize: '0',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <button className={styles.goBtn}
        onClick={() => {
          handleLocationSelect(selectedLocation || '');
        }}
      >
        <span className='screen-reader-text'>Go</span>
      </button>
    </div>

  );
}

export default NavigationSearchPanel;