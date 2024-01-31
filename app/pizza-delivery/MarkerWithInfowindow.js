'use client';
import React, { useState, useEffect, useRef } from 'react';
import { fetchLocations } from '../lib/utils'; // Import the fetchLocations function

import styles from './Map.module.css';
import {
  Marker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import Link from 'next/link';

const MarkerWithInfowindow = () => {
  const [locations, setLocations] = useState([]);
  const [openInfoWindowIndex, setOpenInfoWindowIndex] = useState(null);
  const markerRefs = useRef([]); // Create a ref for the markerRefs array

  useEffect(() => {
    const getLocations = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
      markerRefs.current = locationsData.map((_, i) => markerRefs.current[i] ?? React.createRef()); // Create a new ref for each location
    };

    getLocations();
  }, []);

  return (
    <>
      {locations.map((location, index) => (
        <React.Fragment key={index}>
          <Marker
            ref={markerRefs.current[index]}
            onClick={() => setOpenInfoWindowIndex(index)}
            position={{ lat: parseFloat(location.acf.latitude), lng: parseFloat(location.acf.longitude) }}
            title={location.acf.name}
          />
          {openInfoWindowIndex === index && (
            <InfoWindow
              className={styles.infoWindow}
              anchor={markerRefs.current[index].current} // Use the current marker ref as the anchor
              maxWidth={200}
              onCloseClick={() => setOpenInfoWindowIndex(null)}
            >
              <h5 className={styles.iwTitle}>{location.acf.name}</h5>
              <p className={styles.iwAddress}>
                {location.acf.address}<br />
                {location.acf.city}, {location.acf.state} {location.acf.zip}
              </p>
              <Link className='btn tertiary-btn' href=""><span>Order Now</span></Link>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default MarkerWithInfowindow;