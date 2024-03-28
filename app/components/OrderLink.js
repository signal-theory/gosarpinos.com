'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderLink = ({ label }) => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or return a loading spinner, placeholder, etc.
  }

  if (!store || store === 'null') {
    return (
      <button onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className='text-link'>
        {label}
      </button>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/intro`} className='text-link'>
        {label}
      </a>
    );
  }
}
export default OrderLink;