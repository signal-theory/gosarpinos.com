'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderBtn = ({ btnColor, theme, location, category, itemCategory }) => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);

  const [isClient, setIsClient] = useState(false);

  let formattedCategory = 'Popular%20Items';

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
    if (category != null) {

      // Replace all hyphens in category with "%20"
      formattedCategory = category.replace(/-/g, "%20").replace(/\b\w/g, char => char.toUpperCase());

      if (category === "pizza") {
        formattedCategory = "Sarpino's%20Specialty%20Pizzas";
      }
      if (category === "deep-dish") {
        formattedCategory = "Deep%20Dish%20Pizzas";
      }
    }
    if (itemCategory != null && itemCategory != "Vegan") {

      if (itemCategory === "Wings") {
        formattedCategory = "Wings";
      }
      if (itemCategory === "Appetizers") {
        formattedCategory = "Appetizers";
      }
    } else if (itemCategory === "Vegan") {
      formattedCategory = "Vegan&Options";
    }
  }
  return (
    <>
      {location === "coupon" ? (
        <a href={`https://${store}.gosarpinos.com/ordering/intro`} className="coupon">ORDER NOW</a>
      ) : (
        <a href={`https://${store}.gosarpinos.com/ordering/menu/${formattedCategory}`} className={`btn glow ${btnColor === "dark" ? "tertiary-btn" : "primary-btn"} ${theme === "mobile" ? "mobile" : ""}`}>
          <span>Order Now</span>
        </a>
      )}
    </>
  );
}
export default OrderBtn;