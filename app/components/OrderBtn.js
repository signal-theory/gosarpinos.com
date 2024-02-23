'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

const OrderBtn = ({ btnColor, theme, location }) => {
  const { store } = useContext(StoreContext);
  const [href, setHref] = useState('/pizza-delivery/?noStore=true');

  useEffect(() => {
    if (store && store !== 'null') {
      setHref(`https://${store}.gosarpinos.com/ordering/intro`);
    }
  }, [store]);

  return (
    <>
      {location === "coupon" ? (
        <a href={href} className="coupon">ORDERNOW</a>
      ) : (
        <a href={href} className={`btn glow ${btnColor === "dark" ? "tertiary-btn" : "primary-btn"} ${theme === "mobile" ? "mobile" : ""}`}><span>Order Now</span></a>
      )}
    </>
  );
}
export default OrderBtn;