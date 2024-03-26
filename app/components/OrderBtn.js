'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderBtn = ({ btnColor, theme, location }) => {
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
      <>
        {location === "coupon" ? (
          <a href="/pizza-delivery" onClick={(e) => { e.preventDefault(); setIsNavLocatorActive(!isNavLocatorActive); }} className="coupon">ORDER NOW</a>
        ) : (
          <button onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className={`btn glow ${btnColor === "dark" ? "tertiary-btn" : "primary-btn"} ${theme === "mobile" ? "mobile" : ""}`}>
            <span>ORDER NOW</span>
          </button>
        )}
      </>
    );
  } else {
    return (
      <>
        {location === "coupon" ? (
          <a href={`https://${store}.gosarpinos.com/ordering/intro`} className="coupon">ORDER NOW</a>
        ) : (
          <a href={`https://${store}.gosarpinos.com/ordering/intro`} className={`btn glow ${btnColor === "dark" ? "tertiary-btn" : "primary-btn"} ${theme === "mobile" ? "mobile" : ""}`}>
            <span>Order Now</span>
          </a>
        )}
      </>
    );
  }
}
export default OrderBtn;