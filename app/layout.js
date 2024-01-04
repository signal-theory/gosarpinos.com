
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import './styles/global.css'
import './styles/layout.css'



export default function RootLayout({ children }) {
 return (
    <html lang="en">
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
