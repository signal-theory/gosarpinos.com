'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import styles from './Page.module.css';
import mapstyle from './map-style'
import MarkerWithInfowindow from './MarkerWithInfowindow';

const MapHero = () => {

  return (
    <section className={styles.mapContainer}>
      <div className="responsive-column-container cream-color" style={{ height: '100%' }}>
        <div className={styles.map}>
          <APIProvider apiKey={globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}>
            <Map
              styles={mapstyle}
              zoom={6}
              // scrollwheel={false}
              center={{ lat: 41, lng: -87 }}
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

export default MapHero;