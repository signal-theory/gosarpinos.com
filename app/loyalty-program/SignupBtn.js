'use client';
import { useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const SignupBtn = () => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);


  if (!store || store === 'null') {
    return (
      <a onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className="btn secondary-btn"><span>Sign Up</span></a>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/register?target=loyalty`} className="btn secondary-btn"><span>Sign Up</span></a>
    );
  }
}
export default SignupBtn;