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

const MarkerWithInfowindow = memo(({ locations, openInfoWindowId, setOpenInfoWindowId, store }) => {

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
          {openInfoWindowId === location.id && (
            <InfoWindow
              className={styleInfo.infoWindow}
              anchor={markerRefs.current[index]?.current}  // Use the current marker ref as the anchor
              maxWidth={200}
              onCloseClick={() => setOpenInfoWindowId(null)}
            >
              <h5 className={styleInfo.iwTitle}>{he.decode(location.title.rendered)}</h5>
              <p className={styleInfo.iwAddress}>
                {location.acf.address}<br />
                {location.acf.city}, {location.acf.state} {location.acf.zip}
              </p>
              <OrderBtn btnColor="dark" />
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
});

MarkerWithInfowindow.displayName = 'MarkerWithInfowindow';

export default MarkerWithInfowindow;