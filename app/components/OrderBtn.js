'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const OrderBtn = () => {
  const [city, setCity] = useState('');

  useEffect(() => {
    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
      setCity(selectedCity);
    }
  }, []);
  return (
    <>
      {city ?
        <Link href={``} className="btn primary-btn glow"><span>Order Now</span></Link> :
        <Link href={''} className="btn primary-btn glow"><span>Order Now</span></Link>}
    </>
  );
}

export default OrderBtn;