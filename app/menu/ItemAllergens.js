import styles from './ItemAllergens.module.css';

const ItemAllergens = ({ post }) => {
  return (
    <div className={styles.allergens}>
      {post?.acf?.allergens || 'No allergens'}
    </div>
  )
};

export default ItemAllergens;