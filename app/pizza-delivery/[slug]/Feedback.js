import styles from './Feedback.module.css';
const Feedback = ({ post }) => {
  return (
    <div className={styles.container}>
      <h3>Sarpino&apos;s Customer Review Policy</h3>
      <p>We receive positive and - unbelievable, but true - negative feedback from our customers. We publish, with customer permission, all feedback and reviews on our website. If the negative feedback is resolved to customer satisfaction, we take it off our web site, but we still let you know that we had it - we publish the total number of reviews.</p>
    </div>
  );
}

export default Feedback;