'use client';
import { useRouter } from 'next/navigation'
import { useLocation } from '../components/useLocation';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { StoreContext } from '../components/useStoreContext';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { fetchLocations } from '../lib/utils';
import { geocode, calculateDistance } from '../lib/geocode';
import styles from './Map.module.css';
import MarkerWithInfoWindow from './MarkerWithInfowindow';
import Header from './Header';
import SearchPanel from '../components/SearchPanel';
import List from './List';
import he from 'he';

const MapHero = ({ posts }) => {
  const { store } = useContext(StoreContext);
  const router = useRouter();
  const { selectedLocation, setSelectedLocation, userLocation, setUserLocation, locations, setLocations, getUserLocation, setSelectedStore } = useLocation();
  const [mapCenter, setMapCenter] = useState({ lat: 41, lng: -94 }); // Initial map center
  const [mapZoom, setMapZoom] = useState(5); // Initial zoom level
  const markerRefs = useRef([]); // Create a reference for markerRefs
  const [openInfoWindowId, setOpenInfoWindowId] = useState(null); // Store the ID instead of the index

  const [isLoading, setIsLoading] = useState(true);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    // Simulate a delay before the map is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Get the selected location from the URL query parameters
  useEffect(() => {
    if (router.query && router.query.location) {
      setSelectedLocation(decodeURIComponent(router.query.location));
    }
  }, [router.query, setSelectedLocation]);


  useEffect(() => {
    const geocodeLocation = async () => {
      if (selectedLocation) {
        const coordinates = await geocode(selectedLocation);
        if (coordinates) {
          setSelectedCoordinates(coordinates);
          setMapCenter(coordinates);
          setMapZoom(10);
          // Find the selected location and open its InfoWindow
          const selected = locations.find(location => he.decode(location.title.rendered) + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip === selectedLocation);
          if (selected) {
            setOpenInfoWindowId(selected.id);

          }

        }
      }
    };

    geocodeLocation();
  }, [locations, selectedLocation]);

  // refocus the center of the map whenever the user's location is set
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(10);
      console.log('userLocation', userLocation);
    }
  }, [userLocation]);

  // refocus the center of the map whenever the list of locations is clicked
  useEffect(() => {
    const getLocations = async () => {
      const locationsData = await fetchLocations();
      locationsData.forEach((location, index) => {
        location.id = index;
      });
      setLocations(locationsData);
      // Initialize markerRefs array
      markerRefs.current = locationsData.map((_, i) => markerRefs.current[i] ?? React.createRef());
    };

    getLocations();
  }, [setLocations]);

  // check if selectedLocation is not empty, 
  // then filter by selectedLocation, 
  // otherwise filter by userLocation

  const filteredLocations = locations.filter(location => {
    if (selectedCoordinates) {
      return calculateDistance(selectedCoordinates, { lat: location.acf.latitude, lng: location.acf.longitude }) <= 90000;
    } else if (userLocation) {
      return calculateDistance(userLocation, { lat: location.acf.latitude, lng: location.acf.longitude }) <= 50000;
    }
    return true;
  });

  useEffect(() => {
    if (!selectedLocation) {
      setSelectedCoordinates(null);
      setMapZoom(5);
      setMapCenter({ lat: 41, lng: -94 });
    }
  }, [selectedLocation]);

  return (
    <section className={styles.mapContainer}>
      <div className="responsive-column-container cream-color" style={{ height: '100%' }}>
        <div className={styles.map}>
          <APIProvider
            async={true}
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
              <MarkerWithInfoWindow
                locations={filteredLocations}
                openInfoWindowId={openInfoWindowId}
                setOpenInfoWindowId={setOpenInfoWindowId}
                store={store}
                isLoading={isLoading}
                infoWindowOpen={infoWindowOpen}
                setInfoWindowOpen={setInfoWindowOpen} />

            </Map>
          </APIProvider>
        </div>
        <div className={styles.list}>
          <div className={styles.listContainer}>
            <SearchPanel
              id="autocomplete-map"
              theme="map"
              getUserLocation={getUserLocation}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              setSelectedStore={setSelectedStore}
              locations={locations}
              setInfoWindowOpen={setInfoWindowOpen} />
            <Header filteredLocations={filteredLocations} selectedLocation={selectedLocation} />
            <List
              posts={posts}
              locations={locations}
              filteredLocations={filteredLocations}
              openInfoWindowId={openInfoWindowId}
              setOpenInfoWindowId={setOpenInfoWindowId}
              setSelectedStore={setSelectedStore}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              store={store}
              infoWindowOpen={infoWindowOpen}
              setInfoWindowOpen={setInfoWindowOpen} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapHero;