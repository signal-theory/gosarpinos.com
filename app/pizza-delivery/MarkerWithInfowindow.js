'use client';
import React, { useContext, useEffect, useRef, memo } from 'react';
import { StoreContext } from '../components/useStoreContext';
import Image from 'next/image';
import he from 'he';
import styleInfo from './MarkerInfo.module.css';
import OrderBtn from '../components/OrderBtn';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';

const MarkerWithInfowindow = memo(({ isLoading, locations, openInfoWindowId, setOpenInfoWindowId, store }) => {

  const { setStore } = useContext(StoreContext);

  const handleLocationSelect = (location) => {
    setStore(location.acf.name);
  };

  useEffect(() => {
    const selectedLocation = locations.find(location => location.acf.name === store);
    if (selectedLocation) {
      setOpenInfoWindowId(selectedLocation.id);
    }
  }, [store, setOpenInfoWindowId, locations]);

  const markerRefs = useRef([]); // Create a ref for the markerRefs array

  useEffect(() => {
    markerRefs.current = locations.map((_, i) => markerRefs.current[i] ?? React.createRef()); // Create a new ref for each location
  }, [locations]);

  const selectedLocation = locations.find(location => location.id === openInfoWindowId);

  return (
    <>
      {locations.map((location, index) => (
        <React.Fragment key={location.id}>
          <AdvancedMarker
            ref={markerRefs.current[index]}
            onClick={() => handleLocationSelect(location)}
            position={{ lat: parseFloat(location.acf.latitude), lng: parseFloat(location.acf.longitude) }}
            title={he.decode(location.title.rendered)}>
            <Pin>
              <Image
                src="/sarpinos-heart.svg"
                alt="map icon"
                width={57}
                height={50} />
            </Pin>
          </AdvancedMarker>
        </React.Fragment>
      ))}
      {(!isLoading && selectedLocation) && (
        <InfoWindow
          className={styleInfo.infoWindow}
          anchor={markerRefs.current[locations.indexOf(selectedLocation)]?.current}  // Use the current marker ref as the anchor
          maxWidth={200}
          onCloseClick={() => setOpenInfoWindowId(null)}
        >
          <h5 className={styleInfo.iwTitle}>{he.decode(selectedLocation.title.rendered)}</h5>
          <p className={styleInfo.iwAddress}>
            {selectedLocation.acf.address}<br />
            {selectedLocation.acf.city}, {selectedLocation.acf.state} {selectedLocation.acf.zip}
          </p>
          <OrderBtn btnColor="dark" />
        </InfoWindow>
      )}
    </>
  );
});

MarkerWithInfowindow.displayName = 'MarkerWithInfowindow';

export default MarkerWithInfowindow;