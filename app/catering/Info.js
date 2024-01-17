import ContactBtn from '../components/ContactBtn';
import styles from './Info.module.css';

const Info = ({ data }) => {
  return (
    <>
      <div>
        <h2 className={styles.headline} dangerouslySetInnerHTML={{ __html: data.acf.catering_headline || '' }} />
        <p className={styles.content} dangerouslySetInnerHTML={{ __html: data.acf.catering_content || '' }} />
      </div>
      <div className={`text-align-center ${styles.colContainer}`}>
        <div className="responsive-unlimited-equal-height-container">
          <div className={`${styles.col} grid-item green-gradient`}>
            <div className="slide-up-in" dangerouslySetInnerHTML={{ __html: data.acf.catering_col1 || '' }} />
          </div>
          <div className={`${styles.col} grid-item green-gradient`}>
            <div className="slide-up-in" dangerouslySetInnerHTML={{ __html: data.acf.catering_col2 || '' }} />
          </div>
          <div className={`${styles.col} grid-item green-gradient`}>
            <div className="slide-up-in" dangerouslySetInnerHTML={{ __html: data.acf.catering_col3 || '' }} />
          </div>
        </div>
      </div>
      <div className={`green-gradient ${styles.container}`}>
        <h2 className={styles.headline} dangerouslySetInnerHTML={{ __html: data.acf.servings_headline || '' }} />
        <p className={styles.headline} dangerouslySetInnerHTML={{ __html: data.acf.servings_content || '' }} />
        <div className="responsive-unlimited-equal-height-container">
          <div className={`${styles.col}`}>
            <div dangerouslySetInnerHTML={{ __html: data.acf.servings_col1 || '' }} />
          </div>
          <div className={`${styles.col}`}>
            <div dangerouslySetInnerHTML={{ __html: data.acf.servings_col2 || '' }} />
          </div>
          <div className={`${styles.col}`}>
            <div dangerouslySetInnerHTML={{ __html: data.acf.servings_col3 || '' }} />
          </div>
        </div>
        <ContactBtn />
      </div>
    </>
  );
}

export default Info;