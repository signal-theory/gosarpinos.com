
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';
import styles from './List.module.css';
import Link from 'next/link';
import { checkOpenStatus } from '../lib/checkOpenStatus';
import he from 'he';


const List = ({ locations, filteredLocations, setInfoWindowOpen, setOpenInfoWindowId, store, selectedLocation, setSelectedLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOpenTime, setCurrentOpenTime] = useState('');
  const [currentCloseTime, setCurrentCloseTime] = useState('');
  const [nextOpenTime, setNextOpenTime] = useState('');

  const { setStore } = useContext(StoreContext);

  const handleLocationSelect = (location) => {
    setStore(location.acf.name);
    setInfoWindowOpen(true);
  };
  const handleMetroSelect = (area) => {
    const filtered = locations.filter(location => location.acf.metro_area[0] === area);
    setSelectedLocation(area);
    setStore(null);
  };

  // Check the open status of each location
  useEffect(() => {
    filteredLocations.forEach(location => {
      const status = checkOpenStatus(location);
      location.isOpen = status.isOpen;
      location.currentOpenTime = status.currentOpenTime;
      location.currentCloseTime = status.currentCloseTime;
      location.nextOpenTime = status.nextOpenTime;
    });
  }, [filteredLocations]);

  // Set the selected location's InfoWindow to open when the store is selected
  useEffect(() => {
    const selectedLocation = locations.find(location => location.acf.name === store);
    if (selectedLocation) {
      setOpenInfoWindowId(selectedLocation.id);
    }
  }, [store, setOpenInfoWindowId, locations]);

  const metroAreas = [...new Set(locations.map(location =>
    typeof location.acf.metro_area[0] === 'string' ? location.acf.metro_area[0].trim() : ''
  ))];

  return (
    <ul>
      {filteredLocations.length > 0 ? (
        filteredLocations.map((location, index) => (
          <li className={styles.listItem} key={location.id}>
            <h5 className={styles.listTitle} onClick={() => handleLocationSelect(location)}>{he.decode(location.title.rendered)}</h5>
            <div className={styles.listColumns}>
              <div>
                <p><strong>{location.isOpen ? `Open Now: ${location.currentOpenTime} - ${location.currentCloseTime}` : `Opens at: ${location.nextOpenTime}`}</strong></p>
                <p>{location.acf.address}<br />
                  {location.acf.city}, {location.acf.state} {location.acf.zip}
                </p>
                <Link className="text-link" href={`https://www.google.com/maps?saddr=Your+Location&daddr=${he.decode(location.title.rendered)}`} target="_blank">Directions</Link>
              </div>
              <div>
                <p>{location.acf.phone_number || 'phone number'}</p>
                <Link className='btn primary-btn' href={`/pizza-delivery/${location.slug}`}><span>See Store Info</span></Link>
              </div>
            </div>

          </li>
        ))
      ) : (
        <li>
          {selectedLocation ? <h4>The closest Sarpino&apos;s store is more than 30 miles away. Try one of these metro areas:</h4> : <h4>No location selected, try one of these metro areas:</h4>}
          <ul>
            {metroAreas.map((area, index) => (
              <li key={index}>
                <button className={styles.areaBtn} onClick={() => handleMetroSelect(area)}>{area}</button>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
};

export default List;