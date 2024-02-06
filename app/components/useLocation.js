import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from './useStoreContext';
import { fetchLocations } from '../lib/utils';

export const useLocation = () => {
  const { store, setStore } = useContext(StoreContext);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);


  useEffect(() => {
    const savedSelectedStore = localStorage.getItem('selectedStore');
    if (savedSelectedStore) {
      setStore(savedSelectedStore);
    }

    const savedSelectedLocation = localStorage.getItem('selectedLocation');
    if (savedSelectedLocation) {
      setSelectedLocation(savedSelectedLocation);
    }

    const savedUserLocation = JSON.parse(localStorage.getItem('userLocation'));
    if (savedUserLocation) {
      setUserLocation(savedUserLocation);
    }

    const fetchLocationsData = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
    };

    fetchLocationsData();
  }, [setStore, setSelectedLocation, setUserLocation, setLocations]);


  useEffect(() => {
    if (store) {
      localStorage.setItem('selectedStore', store);
    }
  }, [store]);

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem('selectedLocation', selectedLocation);
      localStorage.removeItem('userLocation'); // Clear the user location from local storage
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (userLocation) {
      localStorage.removeItem('selectedStore');
      setStore(null);
      localStorage.removeItem('selectedLocation');
      setSelectedLocation(null);
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
    }
  }, [userLocation, setStore, setSelectedLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      }, (error) => {
        console.error("Error occurred while getting user's location: ", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return {
    selectedLocation,
    setSelectedLocation,
    userLocation,
    setUserLocation,
    locations,
    setLocations,
    getUserLocation,
    selectedStore: store,
    setSelectedStore: setStore
  };
};