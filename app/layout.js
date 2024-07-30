'use client';
import { useEffect } from 'react';
import Footer from '@/app/components/Footer'
import Navigation from '@/app/components/Navigation'
import './styles/global.css'
import './styles/animate.css';
import { StoreProvider } from './context/useStoreProvider';
import { ThemeProvider } from './context/useThemeProvider';
import { NavLocatorProvider } from './context/useNavLocatorProvider';
import MobileOrderBtn from '@/app/components/MobileOrderBtn';


export default function RootLayout({ children }) {
  useEffect(() => {
    // Append the GTM script to the document head
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-GWW0B5H4YJ';
    document.head.appendChild(script);

    // Initialize the dataLayer and gtag functions
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-GWW0B5H4YJ');
    };

    // Clean up the script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="true" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="true" />
        <script defer type="text/javascript" src="https://myaskai.com/api/1.1/wf/embed-v2?i=vo9hbXcKD7t1GipmWGoZzNfniNd5h5" id="vo9hbXcKD7t1GipmWGoZzNfniNd5h5" async={true}></script>
      </head>
      <body>
        <StoreProvider>
          <NavLocatorProvider>
            <ThemeProvider>
              <Navigation />
              {children}
            </ThemeProvider>
            <MobileOrderBtn />
            <Footer />
          </NavLocatorProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
