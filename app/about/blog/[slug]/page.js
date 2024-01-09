// app/about/blog/[slug]/page.js
import { fetchPostBySlug } from '../../../lib/utils';
import Image from 'next/image';
import styles from './Single.module.css';

export default async function Page({ params }) {
  let post;
  
  try {
    post = await fetchPostBySlug(params.slug);
  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }

  // Return JSX with the post data
  return (
    <div className="cream-color">
      <section className="viewport innerhero">
        <div className="page-container">
          <div className="text-align-center">
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
            <p className={styles.date}>
              {post?.date && new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            {post?.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title.rendered}
                width={1080}
                height={487}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
        </div>
      </section>
    </div>
  );
}
