import Head from 'next/head'
// import { Suspense } from 'react'
// import { NavigationEvents } from './components/NavigationEvents'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import './styles/global.css'
import './styles/animate.css';


export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin />
      </Head>
      <body>
        <Navigation />
        <main className="daytime-background-color">
          {children}
        </main>
        {/* <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense> */}
        <Footer />
      </body>
    </html>
  )
}
