'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

const OrderGiftCard = () => {
  const { store } = useContext(StoreContext);
  const [href, setHref] = useState('/pizza-delivery/');

  useEffect(() => {
    if (store && store !== 'null') {
      setHref(`https://${store}.gosarpinos.com/giftcards/actions`);
    }
  }, [store]);

  return (
    <a href={href} className="nav-link" target='_blank'>Gift Cards</a>
  );
}

export default OrderGiftCard;