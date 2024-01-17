// about.blog.page.js
import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchPostData } from '../../lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import BlogFeatured from './BlogFeatured';
import BlogContent from './BlogContent';

const pageId = 278;
export async function generateMetadata() {
  const metadata = await fetchMetadata(pageId);

  const metadataBase = METADATABASE_API_URL;

  return {
    metadataBase,
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : []
    },
    // Add other metadata properties if needed
  };
}

export default async function Page({ params }) {
  let data;
  let posts;

  try {
    data = await fetchPageData(pageId);
    posts = await fetchPostData();
  } catch (error) {
    console.error("Error in Page component:", error);
  }

  // Separate the featured post
  const featuredCategoryId = 15;
  // Filter posts to get only those in the "Featured" category, then sort by date
  const featuredPosts = posts.filter(post => post.categories.includes(featuredCategoryId));
  const sortedFeaturedPosts = featuredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the most recent featured post
  const mostRecentFeaturedPost = sortedFeaturedPosts[0];

  // Filter out the most recent featured post from all posts
  const nonFeaturedPosts = posts.filter(post => post !== mostRecentFeaturedPost);

  return (
    <>
      <div className="cream-color">
        <section className="viewport innerhero">
          <div className="page-container">
            <div className="content text-align-center">
              <div dangerouslySetInnerHTML={{ __html: data?.content.rendered || '' }} />
            </div>
            {/* Render the featured post */}
            {mostRecentFeaturedPost && (
              <Link href={`/about/blog/${mostRecentFeaturedPost.slug}`}>
                <BlogFeatured
                  post={mostRecentFeaturedPost}
                  featuredImage={mostRecentFeaturedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
                />
              </Link>
            )}
            <BlogContent initialPosts={nonFeaturedPosts} />
          </div>
        </section>
      </div>
    </>
  );
}
