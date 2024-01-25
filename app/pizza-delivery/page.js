'use client';
import { APIProvider, Map, InfoWindow, AdvancedMarker, Marker } from '@vis.gl/react-google-maps';
import styles from './Page.module.css';
import mapstyle from './map-style'
import MarkerWithInfowindow from './MarkerWithInfowindow';

export default function Page() {

  return (
    <section className={styles.mapContainer}>
      <div className="responsive-column-container cream-color" style={{ height: '100%' }}>
        <div className={styles.map}>
          <APIProvider apiKey={globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}>
            <Map
              styles={mapstyle}
              zoom={6}
              // scrollwheel={false}
              center={{ lat: 28, lng: -82 }}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <MarkerWithInfowindow />
            </Map>
          </APIProvider>
        </div>
        <div className='flex-align-center'>Locations List</div>
      </div>
    </section>
  );
}
