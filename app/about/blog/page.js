// about.blog.page.js
import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchPostData } from '../../lib/utils'; // Adjust the path as necessary

import Link from 'next/link';
import BlogHero from './BlogHero';
import BlogCard from'./BlogCard';

import CategoryMenu from '../../components/CategoryMenu';

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
  const featuredPost = posts.find(post => post.categories.includes(15));
  const remainingPosts = posts.filter(post => !post.categories.includes(15));

  // Create a state variable to track the selected category
  const availableTerms = ['All' , 'News', 'Pizza', 'Recipes'];

  // const filteredPosts = selectedCategory 
  //   ? remainingPosts.filter(post => post.categories.includes(selectedCategory))
  //   : remainingPosts;

  return (
    <>
    <div className="cream-color">
      <section className="viewport innerhero">
        <div className="page-container">
          <div className="content text-align-center">
            <div dangerouslySetInnerHTML={{ __html: data?.content.rendered }} />
          </div>
          {/* Render the featured post */}
          {featuredPost && (
            <Link href={`/about/blog/${featuredPost.slug}`}>
              <BlogHero
                post={featuredPost}
                featuredImage={featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
              />
            </Link>
          )}
          {/* Render the category selector */}
          <CategoryMenu
            selectionTitle="Sort by:"
            selectedCategory={"All"}
            availableTerms={availableTerms}
            // onCategorySelect={setSelectedCategory}
            />
          <div className="responsive-equal-height-container">
            {/* Render the remaining posts */}
            {remainingPosts.map((post, index) => {
              const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';

              return (
                <Link className='grid-box' key={index} href={`/about/blog/${post.slug}`}>
                  <BlogCard
                    post={post}
                    featuredImage={featuredImageUrl}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}