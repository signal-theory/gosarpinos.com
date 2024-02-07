'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

const OrderBtn = ({ btnColor }) => {
  const { store } = useContext(StoreContext);
  const [href, setHref] = useState('/pizza-delivery/');

  useEffect(() => {
    if (store && store !== 'null') {
      setHref(`https://${store}.gosarpinos.com/ordering/intro`);
    }
  }, [store]);

  return (
    <a href={href} className={`btn glow ${btnColor === "dark" ? "tertiary-btn" : "primary-btn"}`}><span>Order Now</span></a>
  );
}

export default OrderBtn;