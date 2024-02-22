import Script from 'next/script';
import styles from './Feedback.module.css';
const Feedback = ({ post }) => {
  return (
    <div className={styles.container}>
      <h3>Sarpino&apos;s Customer Review Policy</h3>
      <p>id {post.acf.review_tracker_id}</p>
      <p>We receive positive and - unbelievable, but true - negative feedback from our customers. We publish, with customer permission, all feedback and reviews on our website. If the negative feedback is resolved to customer satisfaction, we take it off our web site, but we still let you know that we had it - we publish the total number of reviews.</p>
      <div className="amplify-widget" data-token="MTEyMjY6MmlSWW5jTlAxQk1EOVJocmwyVFpjV2NVWHp3" data-widget-id="11226" data-widget-type="full_page" data-external-id={post.acf.review_tracker_id}></div>
      <Script src="https://amplify.review-alerts.com/widget-init.js" />
    </div>
  );
}

export default Feedback;