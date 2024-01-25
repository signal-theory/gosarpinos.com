'use client';
import React, { useState } from 'react';
import styles from './Map.module.css';
import {
  Marker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import Link from 'next/link';

const MarkerWithInfowindow = () => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <Marker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: 28, lng: -82 }}
        title={'MARKER'}
      />
      {infowindowOpen && (
        <InfoWindow className={styles.infoWindow}
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          <h5 className={styles.iwTitle}>LOCATION NAME</h5>
          <p className={styles.iwHours}><strong>Open Now</strong> 10am-2am</p>
          <p className={styles.iwPhone}>123-456-7890</p>
          <p className={styles.iwAddress}>123 Main St<br />
            Some City, State 12345</p>
          <Link className='btn tertiary-btn' href=""><span>Order Now</span></Link>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfowindow;