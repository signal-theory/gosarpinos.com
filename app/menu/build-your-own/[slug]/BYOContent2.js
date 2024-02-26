import styles from './BYOContent.module.css';

const BYOContent2 = ({ post }) => {

  const sauces = post?.acf?.sauces || '';
  return (
    <>
      {sauces && <div className={styles.ingredients}>
        <div className={styles.sauces} dangerouslySetInnerHTML={{ __html: sauces || '' }} />
      </div>}
    </>
  );
}

export default BYOContent2;