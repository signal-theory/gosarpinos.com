'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';

const OrderCatering = ({ url }) => {
  const { store } = useContext(StoreContext);
  const [href, setHref] = useState('/pizza-delivery/?noStore=true');

  useEffect(() => {
    if (store && store !== 'null') {
      setHref(`https://${store}.gosarpinos.com/${url}`);
    }
  }, [store]);

  return (
    <a href={href} className="btn"><span>Order Now</span></a>
  );
}

export default OrderCatering;