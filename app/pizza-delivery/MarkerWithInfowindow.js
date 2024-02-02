'use client';
import React, { useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import he from 'he';

import styleInfo from './MarkerInfo.module.css';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import Link from 'next/link';

const MarkerWithInfowindow = memo(({ locations, openInfoWindowId, setOpenInfoWindowId }) => {
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
            onClick={() => setOpenInfoWindowId(location.id)}
            position={{ lat: parseFloat(location.acf.latitude), lng: parseFloat(location.acf.longitude) }}
            title={he.decode(he.decode(location.title.rendered))}>
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
              <Link className='btn tertiary-btn' href=""><span>Order Now</span></Link>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
});

MarkerWithInfowindow.displayName = 'MarkerWithInfowindow';

export default MarkerWithInfowindow;