'use client';
import { useContext } from 'react';
import { StoreContext } from '../components/useStoreContext';

import Link from "next/link";

const OrderBtn = () => {
  const { store } = useContext(StoreContext);

  return (
    <>
      {store ?
        <Link href={`https://${store}.gosarpinos.com`} className="btn primary-btn glow"><span>Order Now</span></Link> :
        <Link href={''} className="btn primary-btn glow"><span>Order Now</span></Link>}
    </>
  );
}

export default OrderBtn;