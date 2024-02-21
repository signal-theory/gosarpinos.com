'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../components/useStoreContext';

const LoginBtn = () => {
  const { store } = useContext(StoreContext);
  const [href, setHref] = useState('/pizza-delivery/?noStore=true');

  useEffect(() => {
    if (store && store !== 'null') {
      setHref(`https://${store}.gosarpinos.com/ordering/login?target=%2Floyalty`);
    }
  }, [store]);

  return (
    <a href={href} className="btn primary-btn"><span>Login</span></a>
  );
}

export default LoginBtn;