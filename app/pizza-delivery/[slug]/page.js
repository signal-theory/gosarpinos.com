import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchCPTMetadataBySlug, fetchCPTBySlug } from '../../lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import Hero from './Hero';
import StoreInfo from './StoreInfo';
import tabStyles from '../../components/TabList.module.css';

const postType = 'locations';
export async function generateMetadata({ params }) {
  const postId = params.slug;
  const metadata = await fetchCPTMetadataBySlug(postId, postType);

  return {
    metadataBase: METADATABASE_API_URL,
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : []
    },
  };
}


export default async function Page({ params }) {

  let post;
  try {
    post = await fetchCPTBySlug(params.slug, postType);

    post;

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }

  const slug = post.slug || '';
  const url = `/pizza-delivery/${slug}`;
  return (
    <div className="cream-color">
      <section className="hero">
        <Hero post={post} />
      </section>
      <section className="viewport">
        <div className="page-container">
          <ul className={`${tabStyles.tabList} ${tabStyles.locationTabs}`}>
            <li className={`${tabStyles.tabItem} ${tabStyles.active}`}>
              <Link href={url}>Store Info</Link>
            </li>
            <li className={`${tabStyles.tabItem}`}>
              <Link href={url + '/feedback'}>Feedback</Link>
            </li>
            <li className={`${tabStyles.tabItem}`}>
              <Link href={url + '/deliveryarea'}>Delivery Area</Link>
            </li>
          </ul>
          <StoreInfo post={post} />
        </div>
      </section>
    </div>
  );
}
