import Footer from './components/Footer'
import Navigation from './components/Navigation'
import './styles/global.css'
import './styles/animate.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" src="https://www.bugherd.com/sidebarv2.js?apikey=vf4t1wlrfqxjnjtjxlxi1w" async="true"></script>
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin />
      </head>
      <body>
        <Navigation />
        <main className="daytime-background-color">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
