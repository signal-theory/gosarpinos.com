'use client';
import { useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const LoginBtn = () => {
  //   const { store } = useContext(StoreContext);
  //   const [href, setHref] = useState('/pizza-delivery/?noStore=true');

  //   useEffect(() => {
  //     if (store && store !== 'null') {
  //       setHref(`https://${store}.gosarpinos.com/ordering/login?target=%2Floyalty`);
  //     }
  //   }, [store]);

  //   return (
  //     <a href={href} className="btn primary-btn"><span>Login</span></a>
  //   );
  // }
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);


  if (!store || store === 'null') {
    return (
      <a onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className="btn primary-btn"><span>Login</span></a>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/login?target=%2Floyalty`} className="btn primary-btn"><span>Login</span></a>
    );
  }
}
export default LoginBtn;