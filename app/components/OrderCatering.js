'use client';
import { useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderCatering = ({ url }) => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);


  if (!store || store === 'null') {
    return (
      <button onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className="btn selectstore-btn">
        Select Store to Order Online
      </button>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/${url}`} className="btn selectstore-btn">
        Order Catering from {store}
      </a>
    );
  }
}

export default OrderCatering;