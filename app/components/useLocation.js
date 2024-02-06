import { useState, useEffect } from 'react';
import { geocode, calculateDistance } from '../lib/geocode';
import { fetchLocations } from '../lib/utils';

export const useLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  // useEffect(() => {
  //   console.log('selectedLocation', localStorage.getItem('selectedLocation'));
  //   console.log('selectedStore', localStorage.getItem('selectedStore'));
  //   console.log('userLocation', localStorage.getItem('userLocation'));
  // }, []);

  useEffect(() => {
    const savedSelectedLocation = localStorage.getItem('selectedLocation');
    const savedUserLocation = JSON.parse(localStorage.getItem('userLocation'));
    const savedSelectedStore = localStorage.getItem('selectedStore');

    if (savedSelectedLocation) {
      setSelectedLocation(savedSelectedLocation);
    }
    if (savedUserLocation) {
      setUserLocation(savedUserLocation);
    }
    if (savedSelectedStore) {
      setSelectedStore(savedSelectedStore);
    }

    const fetchLocationsData = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
    };

    fetchLocationsData();
  }, []);


  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem('selectedLocation', selectedLocation);
      localStorage.removeItem('userLocation'); // Clear the user location from local storage
    }

    if (selectedStore) {
      localStorage.setItem('selectedStore', selectedStore);
      localStorage.removeItem('userLocation'); // Clear the user location from local storage
    }
  }, [selectedLocation, selectedStore]);

  useEffect(() => {
    if (userLocation) {
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
    }
  }, [userLocation]);

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
    selectedStore,
    setSelectedStore
  };
};