'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

const SignupBtn = () => {
  const { store } = useContext(StoreContext);
  const [href, setHref] = useState('/pizza-delivery/');

  useEffect(() => {
    if (store && store !== 'null') {
      setHref(`https://${store}.gosarpinos.com/ordering/register?target=loyalty`);
    }
  }, [store]);

  return (
    <a href={href} className="btn secondary-btn"><span>Sign Up</span></a>
  );
}

export default SignupBtn;