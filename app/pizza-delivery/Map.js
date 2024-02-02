'use client';
import { debounce } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { fetchLocations } from '../lib/utils';
import { geocode, calculateDistance } from '../lib/geocode';
import styles from './Map.module.css';
import MarkerWithInfowindow from './MarkerWithInfowindow';
import Header from './Header';
import SearchPanel from './SearchPanel';
import List from './List';

const MapHero = ({ posts }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [openInfoWindowId, setOpenInfoWindowId] = useState(null); // Store the ID instead of the index
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 41, lng: -94 }); // Initial map center
  const [mapZoom, setMapZoom] = useState(6); // Initial zoom level
  const searchInputRef = useRef(null); // Create a reference to the input field
  const markerRefs = useRef([]); // Create a reference for markerRefs



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

  const filteredLocations = locations.filter(location => {
    const fullAddress = location.acf.name + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip;
    if (selectedLocation) {
      return fullAddress.toLowerCase() === selectedLocation.toLowerCase();
    } else if (userLocation) {
      return calculateDistance(userLocation, { lat: location.acf.latitude, lng: location.acf.longitude }) <= 40000;
    }
    return true;
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setSelectedLocation(''); // Clear the selected location
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
          <APIProvider
            apiKey={globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}
            libraries={['places']}>
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
            <SearchPanel getUserLocation={getUserLocation} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} locations={locations} />
            <Header filteredLocations={filteredLocations} />
            <List posts={posts} locations={filteredLocations} openInfoWindowId={openInfoWindowId} setOpenInfoWindowId={setOpenInfoWindowId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapHero;