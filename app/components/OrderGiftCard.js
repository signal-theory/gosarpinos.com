'use client';
import { useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderGiftCard = () => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);


  if (!store || store === 'null') {
    return (
      <a onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className="nav-link">
        Gift Cards
      </a>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/giftcards/actions`} className="nav-link">
        Gift Cards
      </a>
    );
  }
}
export default OrderGiftCard;