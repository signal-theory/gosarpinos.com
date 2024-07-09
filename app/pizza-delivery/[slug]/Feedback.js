'use client';
import { useEffect, useContext } from 'react';
import { StoreContext } from '@/app/context/useStoreContext';
import Script from 'next/script';
import styles from './Feedback.module.css';

const Feedback = ({ post }) => {
  const { setStore } = useContext(StoreContext); 

  useEffect(() => {
    if (post?.acf?.name) {
      setStore(post.acf.name); // Set the store context to the ACF "name"
    }
  }, [post, setStore]);
  
  return (
    <div className={styles.container}><div className="amplify-widget" data-token={globalThis.NEXT_PUBLIC_REVIEW_TOKEN ?? (process.env.NEXT_PUBLIC_REVIEW_TOKEN)} data-widget-id="11226" data-widget-type="full_page" data-external-id={post.acf.review_tracker_id}></div>
      <Script src="https://amplify.review-alerts.com/widget-init.js" />
    </div>
  );
}

export default Feedback;