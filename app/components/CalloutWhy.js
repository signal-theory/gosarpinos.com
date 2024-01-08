import Link from 'next/link';
import Car from './svgs/drawing-car.jsx'
import Moon from './svgs/drawing-moon.jsx'
import Calendar from './svgs/drawing-calendar.jsx'
import styles from './CalloutWhy.module.css'

const CalloutWhy = ({containerClasses, gridClasses}) => {
 return(
   <div className={containerClasses}>
    <div className="responsive-three-column-container" style={{ margin: '3rem 0 0', gridGap: '1.5rem' }}>
      <div className={`grid-item ${gridClasses}`} style={{borderRadius: '10px'}}>
        <div className={styles.hoverCar}>
          <div style={{padding: '2rem 1rem 1rem'}}>
            <Car />
          </div>
        </div>
        <h2 style={{ padding: '1.5rem 0' }}>Free <br />Delivery</h2>
      </div>
      <div className={`grid-item ${gridClasses}`} style={{borderRadius: '10px'}}>
        <div className={styles.hoverMoon} style={{padding: '2rem 1rem 1rem'}}>
          <Moon />
        </div>
        <h2 style={{ padding: '1.5rem 0' }}>Open <br />Late</h2>
      </div>
      <div className={`grid-item ${gridClasses}`} style={{borderRadius: '10px'}}>
        <div className={styles.hoverCalendar} style={{padding: '2rem 1rem 1rem'}}>
          <Calendar />
        </div>
        <h2 style={{ padding: '1.5rem 0' }}>Open <br />365 Days</h2>
       </div>
    </div>
  </div>
 )
}

export default CalloutWhy;