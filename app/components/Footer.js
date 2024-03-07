import Link from 'next/link';
import Image from 'next/image';
import OrderGiftCard from './OrderGiftCard'
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div style={{ width: '100%' }}>
        <div className={styles.columns}>
          <div className={styles.order2}>
            <h3>Get our newsletter</h3>
            <p>See the latest updates, deals and information from Sarpino&apos;s.</p>
            <form className={styles.emailSignUp} name="signup" method="POST" data-netlify="true" action="/success"
              netlify-honeypot="bot-field"
            >
              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>
              <p>
                <label><span className="screen-reader-text">Email Address</span> <input placeholder="Email Address" type="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required /></label>
              </p>
              <p>
                <button type="submit">Sign Up</button>
              </p>
              <input type="hidden" name="form-name" value="signup"></input>
            </form>

            <h3>DOWNLOAD <br />OUR MOBILE APP</h3>
            <p style={{ maxWidth: '290px' }}>Get $10 off your next order by earning loyalty points while enjoying our delicious pizzas. </p>
            <div className={styles.appStoreLinks}>
              <div>
                <Link href="https://apps.apple.com/us/app/sarpinos-pizzeria/id1479489789">
                  <Image
                    src={"/icon-app-store.png"}
                    alt="App Store"
                    width={136}
                    height={40}
                    style={{ paddingBottom: '1rem' }}
                  />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.sarpinos">
                  <Image
                    src={"/icon-google-play.png"}
                    alt="App Store"
                    width={136}
                    height={40}
                  />
                </Link>
              </div>

              <Image
                src={"/qr-code-app.png"}
                alt="Scan the QR Code"
                width={78}
                height={97}
                className={styles.qrCode}
              />
            </div>
            <div style={{ display: 'flex', margin: '3rem 0' }}>
              <Image
                src={"/sarpinos-heart.svg"}
                width={66}
                height={58}
                alt="Sarpino's Heart"
              />
              <div style={{ paddingLeft: '2rem' }}>
                <p>Follow Us</p>
                <div className={styles.iconLinks}>
                  <Link href="https://www.facebook.com/SarpinosPizzeria/">
                    <Image
                      src={"/icon-facebook.svg"}
                      width={20}
                      height={20}
                      alt="Facebook"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/sarpinos_pizzeria/">
                    <Image
                      src={"/icon-instagram.svg"}
                      width={20}
                      height={20}
                      alt="Instagram"
                    />
                  </Link>
                  <Link href="https://x.com/sarpinos_pizza">
                    <Image
                      src={"/icon-x.svg"}
                      width={20}
                      height={20}
                      alt="Twitter"
                    />
                  </Link>
                  <Link href="https://www.youtube.com/company/sarpinos-pizzeria/">
                    <Image
                      src={"/icon-youtube.svg"}
                      width={20}
                      height={20}
                      alt="LinkedIn"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.order1}>
            <div className={styles.footerMenu}>
              <div>
                <h4 className={styles.header}>Our Menu</h4>
                <ul>
                  <li><Link href="/menu/sarpinos-specialty-pizza">Full Menu</Link></li>
                  <li><Link href="/vegan-menu/vegan-pizza">Vegan Menu</Link></li>
                  <li><Link href="/catering">Catering</Link></li>
                </ul>
                <h4 className={styles.header}>Customer Service</h4>
                <ul>
                  <li><Link href="/loyalty-program">Loyalty Program</Link></li>
                  <li><OrderGiftCard /></li>
                  <li><Link href="/pizza-delivery">Location Finder</Link></li>
                  <li><Link href="/">Rate Us</Link></li>
                  <li><Link href="/sitemap">Site Map</Link></li>
                </ul>
              </div>
              <div>
                <h4 className={styles.header}>Catering</h4>
                <ul>
                  <li><Link href="/catering">Catering Menu</Link></li>
                </ul>
                <h4 className={styles.header}>About Us</h4>
                <ul>
                  <li><Link href="https://jobs.gosarpinos.com/">Careers</Link></li>
                  <li><Link href="https://sarpinosfranchise.com/">Franchising Information</Link></li>
                  <li><Link href="/pizza-delivery">Location Finder</Link></li>
                  <li><Link href="/download-pizza-app">Mobile App</Link></li>
                </ul>
                <h4 className={styles.header}>Contact Us</h4>
                <ul>
                  <li>Phone: 847.374.6300</li>
                  <li>Fax: 866.630.8595</li>
                  <li>Email: <Link href="mailto:us@gosarpinos.com">us@gosarpinos.com</Link></li>
                </ul>
                <h4 className={styles.header}>Address</h4>
                <ul>
                  <li>200 Tri State International, Suite 550 <br />Lincolnshire, IL 60069</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-align-center" style={{ margin: '2rem auto 0' }}>
          <p>Franchisee Login &copy;{year} Sarpino&apos;s USA, Inc. All Rights Reserved</p>
          <Link href="/privacy" className="textBtn">Privacy Policy</Link> | <Link href="/tos" className="textBtn">Website Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}