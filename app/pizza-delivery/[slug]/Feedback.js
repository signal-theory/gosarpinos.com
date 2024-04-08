import Script from 'next/script';
import styles from './Feedback.module.css';
const Feedback = ({ post }) => {
  return (
    <div className={styles.container}><div className="amplify-widget" data-token="MTEyMjY6MmlSWW5jTlAxQk1EOVJocmwyVFpjV2NVWHp3" data-widget-id="11226" data-widget-type="full_page" data-external-id={post.acf.review_tracker_id}></div>
      <Script src="https://amplify.review-alerts.com/widget-init.js" />
    </div>
  );
}

export default Feedback;