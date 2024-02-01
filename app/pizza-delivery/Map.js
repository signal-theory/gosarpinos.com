'use client';
import { debounce } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { fetchLocations } from '../lib/utils';
import { geocode, calculateDistance } from '../lib/geocode';
import styles from './Map.module.css';
import MarkerWithInfowindow from './MarkerWithInfowindow';
import Header from './Header';
import List from './List';

const MapHero = ({ posts }) => {
  //const [filteredLocations, setFilteredLocations] = useState([]);
  const [openInfoWindowId, setOpenInfoWindowId] = useState(null); // Store the ID instead of the index
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 41, lng: -94 }); // Initial map center
  const [mapZoom, setMapZoom] = useState(6); // Initial zoom level
  const searchInputRef = useRef(null); // Create a reference to the input field
  const markerRefs = useRef([]); // Create a reference for markerRefs

  const debouncedSearch = useRef(debounce(async (searchValue) => {
    setSearch(searchValue);
    try {
      const searchLocation = await geocode(searchValue);
      console.log(`Coordinates for search location: ${JSON.stringify(searchLocation)}`);
    } catch (error) {
      console.error(`Failed to geocode search input: ${error}`);
    }
  }, 300)).current;

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Set the focus back to the input field
    }
  }, [search]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(10); // Adjust zoom level as needed
    }
  }, [userLocation]);

  useEffect(() => {
    const getLocations = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
      // Initialize markerRefs array
      markerRefs.current = locationsData.map((_, i) => markerRefs.current[i] ?? React.createRef());
    };

    getLocations();
  }, []);

  const filteredLocations = locations.filter(location =>
    (location.acf.name.toLowerCase().includes(search.toLowerCase()) ||
      location.acf.address.toLowerCase().includes(search.toLowerCase()) ||
      location.acf.city.toLowerCase().includes(search.toLowerCase()) ||
      (location.acf.zip && String(location.acf.zip).includes(search))) &&
    (!userLocation || calculateDistance(userLocation, { lat: location.acf.latitude, lng: location.acf.longitude }) <= 40000)
  );

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setSearch(''); // Clear the search field
      }, (error) => {
        console.error("Error occurred while getting user's location: ", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const fetchLocationsData = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
    };

    fetchLocationsData();
  }, []);


  return (
    <section className={styles.mapContainer}>
      <div className="responsive-column-container cream-color" style={{ height: '100%' }}>
        <div className={styles.map}>
          <APIProvider apiKey={globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}>
            <Map
              mapId={'4726a23fb5e9ce49'}
              zoom={mapZoom}
              // scrollwheel={false}
              center={mapCenter}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <MarkerWithInfowindow locations={filteredLocations} openInfoWindowId={openInfoWindowId} setOpenInfoWindowId={setOpenInfoWindowId} />

            </Map>
          </APIProvider>
        </div>
        <div className={styles.list}>
          <div className={styles.listContainer}>
            <Header getUserLocation={getUserLocation} search={search} debouncedSearch={debouncedSearch} filteredLocations={filteredLocations} />
            <List posts={posts} locations={filteredLocations} openInfoWindowId={openInfoWindowId} setOpenInfoWindowId={setOpenInfoWindowId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapHero;