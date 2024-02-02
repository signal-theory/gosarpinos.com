import { useState, useEffect } from 'react';
import { geocode, calculateDistance } from '../lib/geocode';
import { fetchLocations } from '../lib/utils';

export const useLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log('selectedLocation', localStorage.getItem('selectedLocation'));
    console.log('selectedCity', localStorage.getItem('selectedCity'));
    console.log('userLocation', localStorage.getItem('userLocation'));
  }, []);

  useEffect(() => {
    const savedSelectedLocation = localStorage.getItem('selectedLocation');
    const savedUserLocation = JSON.parse(localStorage.getItem('userLocation'));

    if (savedSelectedLocation) {
      setSelectedLocation(savedSelectedLocation);
    }
    if (savedUserLocation) {
      setUserLocation(savedUserLocation);
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
      const city = selectedLocation.split(', ')[0]; // Extract the city from the location string
      localStorage.setItem('selectedCity', city); // Save the city to local storage
      localStorage.removeItem('userLocation'); // Clear the user location from local storage
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (userLocation) {
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
      localStorage.removeItem('selectedLocation'); // Clear the selected location from local storage
      localStorage.removeItem('selectedCity'); // Clear the selected city from local storage
    }
  }, [userLocation]);

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

  return {
    selectedLocation,
    setSelectedLocation,
    userLocation,
    setUserLocation,
    locations,
    setLocations,
    getUserLocation
  };
};