'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const OrderBtn = () => {
  const [store, setStore] = useState('');

  useEffect(() => {
    const selectedStore = localStorage.getItem('selectedStore');
    if (selectedStore) {
      setStore(selectedStore);
    }

    const handleStorageChange = (e) => {
      if (e.key === 'selectedStore') {
        setStore(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      {store ?
        <Link href={`https://${store}.gosarpinos.com`} className="btn primary-btn glow"><span>Order Now</span></Link> :
        <Link href={''} className="btn primary-btn glow"><span>Order Now</span></Link>}
    </>
  );
}

export default OrderBtn;