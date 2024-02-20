import Footer from './components/Footer'
import Navigation from './components/Navigation'
import './styles/global.css'
import './styles/animate.css';
import { StoreProvider } from './components/useStoreProvider';
import MobileOrderBtn from './components/MobileOrderBtn';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="true" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="true" />
        <script defer type="text/javascript" src="https://myaskai.com/ev-embed-chat-js-min" id="3NG25REN0rI3SWL621be6E0SJOxhhW" async={true}></script>
        {/* <script defer type="text/javascript" src="https://www.bugherd.com/sidebarv2.js?apikey=vf4t1wlrfqxjnjtjxlxi1w" async={true}></script> */}
      </head>
      <body>
        <StoreProvider>
          <Navigation />
          <main className="daytime-background-color">
            {children}
          </main>
          <MobileOrderBtn />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
