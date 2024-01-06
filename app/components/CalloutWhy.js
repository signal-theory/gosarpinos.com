import Link from 'next/link';
import Car from './svgs/drawing-car.jsx'
import Moon from './svgs/drawing-moon.jsx'
import Calendar from './svgs/drawing-calendar.jsx'
import styles from './CalloutWhy.module.css'

const CalloutWhy = () => {
 return(
   <div className="page-container cream-outline text-align-center">
    <h2 style={{ margin: '3rem 0' }}>WHY SARPINO&apos;S?</h2>
    <div className="responsive-three-column-container" style={{ margin: '3rem 0 0' }}>
      <div className="grid-item">
        <div className={styles.hoverCar}>
          <Car />
        </div>
        <h2 style={{ padding: '1.5rem 0' }}>Free <br />Delivery</h2>
      </div>
      <div className="grid-item">
        <div className={styles.hoverMoon}>
          <Moon />
        </div>
        <h2 style={{ padding: '1.5rem 0' }}>Open <br />Late</h2>
      </div>
      <div className="grid-item">
        <div className={styles.hoverCalendar}>
          <Calendar />
        </div>
        <h2 style={{ padding: '1.5rem 0' }}>Open <br />365 Days</h2>
       </div>
    </div>
    <Link href="/about/company" className="btn primary-btn" style={{ marginBottom: '2rem' }}><span>About Us</span></Link>
  </div>
 )
}

export default CalloutWhy;