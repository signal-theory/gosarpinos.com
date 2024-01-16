// app/about/blog/[slug]/page.js
import { fetchPostBySlug } from '../../../lib/utils';
import Image from 'next/image';
import MenuNavigation from '../../MenuNavigation';
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
      <MenuNavigation
        mode="dark"
        activeItem="specials" />
      <section className="viewport">
        <div className="page-container">
          <div className="text-align-center">
            {/* <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} /> */}
            
            {/* {post?.featuredImage && (
              <Image
                src={featuredImageUrl}
                alt={post.title.rendered}
                width={1080}
                height={487}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )} */}
          </div> 
          {/* Post Content */}
          {/* <div className={styles.content} dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} /> */}
        </div>
      </section>
    </div>
  );
}
