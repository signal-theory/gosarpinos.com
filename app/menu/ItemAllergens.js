import styles from './ItemAllergens.module.css';
// import {useContext} from 'react';

// const ItemAllergens = () => {
//   const { item } = useContext(MenuContext);
//   const { allergens } = item;

//   return (
//     <div className={styles.allergens}>
//       {allergens.map((allergen) => (
//         <div key={allergen.id} className={styles.name}>
//           <div className={styles.name}>{allergen.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

const ItemAllergens = ({ post }) => {
  return (
    <div className={styles.allergens}>
      {post?.acf?.allergens || 'No allergens'}
    </div>
  )
};

export default ItemAllergens;