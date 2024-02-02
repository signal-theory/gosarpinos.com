import styles from './StoreInfo.module.css';
import Link from 'next/link';
import moment from 'moment';


const StoreInfo = ({ post }) => {
  const groupDays = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let groupedDays = [];
    let currentGroup = [];

    for (let i = 0; i < days.length; i++) {
      if (i === 0 || (post.acf[days[i] + '_open'] === post.acf[days[i - 1] + '_open'] && post.acf[days[i] + '_close'] === post.acf[days[i - 1] + '_close'])) {
        currentGroup.push(days[i]);
      } else {
        groupedDays.push(currentGroup);
        currentGroup = [days[i]];
      }
    }

    groupedDays.push(currentGroup);

    return groupedDays.map(group => {
      const openTimeValue = post.acf[group[0] + '_open'];
      const closeTimeValue = post.acf[group[0] + '_close'];

      if (!openTimeValue || !closeTimeValue) {
        return '<p>Hours not available</p>';
      }

      const openTime = moment(openTimeValue, 'HH:mm:ss').format('h:mm a');
      const closeTime = moment(closeTimeValue, 'HH:mm:ss').format('h:mm a');
      const hours = openTime + ' - ' + closeTime;

      if (group.length === 1) {
        return '<p><strong>' + (group[0].charAt(0).toUpperCase() + group[0].slice(1)) + '</strong><br/> ' + hours + '</p>';
      } else {
        return '<p><strong>' + (group[0].charAt(0).toUpperCase() + group[0].slice(1)) + ' - ' + (group[group.length - 1].charAt(0).toUpperCase() + group[group.length - 1].slice(1)) + '</strong><br/> ' + hours + '</p>';
      }
    }).join('');
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.address}>
          <p><strong>{post.acf.phone_number}</strong></p>
          <p>{post.acf.address}<br />
            {post.acf.city}, {post.acf.zip}
          </p>
          <Link className="text-link" href={`https://www.google.com/maps?saddr=Your+Location&daddr=${post.acf.name}`} target="_blank">Directions</Link>
        </div>
        <div className={styles.hours}>
          <p dangerouslySetInnerHTML={{ __html: groupDays() }}></p>
        </div>
      </div>
      <div className={styles.content}>
        <h3>Looking for the Best Pizza Delivery in [neighborhood]?</h3>
        <p>Look no further than your local Sarpino&apos;s.
          We offer specialty pizza with the freshest of ingredients. Our menu is full of gourmet pizza options born from Italian tradition. We also provide numerous vegan/gluten free pizza options because everyone deserves great pizza in their life.

          Vegan pizza doesn&apos;t mean less flavor. Our vegan pizza place uses fresh ingredients from trusted brands such as Daiya Cheese, Beyond Meat, and Field Roast to ensure maximum flavor. We encourage you to try all our different vegan pizza options in Sarpino&apos;s Pizzeria [neighborhood]. We can even accommodate new creations, so feel free to order a customized vegan pizza today!</p>
      </div>
      <div className={styles.content}>
        <h5>The Only Choice for Free Delivery in [neighborhood].</h5>
        <p>We take pizza and food delivery to the next level. You get fast, free food delivery, even if it&apos;s a late night. There is no minimum order and you can take your time while using our online menu. And of course, you can always count on getting delicious pizza from {post.acf.name}.</p>
      </div>
    </>
  );
}

export default StoreInfo;