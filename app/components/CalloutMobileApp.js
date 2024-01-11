import Link from 'next/link';
import Image from 'next/image';
import styles from './CalloutMobileApp.module.css';
import stylesF from './Footer.module.css';

const CalloutMobileApp = () => {
  return (
    <>
      <section className={`viewport ${styles.bkg}`}>
        <Image 
          src="/pizza-background-callout.jpg"
          alt="Pizza Background"
          fill
          className={styles.bkgImage}
          />
        <div className={styles.callout}>
          <div className="responsive-column-container">
            <div className={styles.column}>
              <h3 className={styles.title}>
                Order on our Mobile App
              </h3>
              <p>Get $10 off your next order by earning loyalty points while enjoying our delicious pizzas. </p>
              <div className={stylesF.appStoreLinks}>
              <div>
                <Link href="https://apps.apple.com/us/app/sarpinos-pizzeria/id1479489789">
                  <Image 
                    src={"/icon-app-store.png"} 
                    alt="App Store" 
                    width={136} 
                    height={40}
                    style={{paddingBottom: '1rem'}}
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
                className={stylesF.qrCode}
                />
            </div>
            </div>
            <div className={styles.column}>
              <Image
                src={"/mobile-order-coupon.webp"}
                alt="Mobile Order Coupon"
                width={200}
                height={200}
                className={styles.coupon}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalloutMobileApp;