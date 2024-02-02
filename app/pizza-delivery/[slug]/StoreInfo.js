import styles from './StoreInfo.module.css';
import Link from 'next/link';

const StoreInfo = ({ post }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.address}>
          <p><strong>{post.acf.phone_number}</strong></p>
          <p>{post.acf.address}<br />
            {post.acf.city}, {post.acf.zip}
          </p>
          <Link className="text-link" href="">Directions</Link>
        </div>
        <div className={styles.hours}>
          <p>
            <strong>Sunday</strong>  {post.acf.sunday_hours}<br />
            <strong>Monday</strong>  {post.acf.monday_hours}<br />
            <strong>Tuesday</strong>  {post.acf.tuesday_hours}<br />
            <strong>Wednesday</strong>  {post.acf.wednesday_hours}<br />
            <strong>Thursday</strong>  {post.acf.thursday_hours}<br />
            <strong>Friday</strong>  {post.acf.friday_hours}<br />
            <strong>Saturday</strong>  {post.acf.saturday_hours}<br />
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <h3>Looking for the Best Pizza Delivery in [neighborhood]?</h3>
        <p>Look no further than your local Sarpino&apos;s.
          We offer specialty pizza with the freshest of ingredients. Our menu is full of gourmet pizza options born from Italian tradition. We also provide numerous vegan/gluten free pizza options because everyone deserves great pizza in their life.

          Vegan pizza doesn&apos;t mean less flavor. Our vegan pizza place uses fresh ingredients from trusted brands such as Daiya Cheese, Beyond Meat, and Field Roast to ensure maximum flavor. We encourage you to try all our different vegan pizza options in Sarpino&apos;s Pizzeria [neighborhood]. We can even accommodate new creations, so feel free to order a customized vegan pizza today!</p>
      </div>
      <div className={styles.content}>
        <h5>The Only Choice for Free Delivery in[neighborhood].</h5>
        <p>We take pizza and food delivery to the next level. You get fast, free food delivery, even if it&apos;s a late night. There is no minimum order and you can take your time while using our online menu. And of course, you can always count on getting delicious pizza from Sarpino&apos;s (LOCATION).</p>
      </div>
    </>
  );
}

export default StoreInfo;