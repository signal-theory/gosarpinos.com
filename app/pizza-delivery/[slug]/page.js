import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchCPTMetadataBySlug, fetchCPTBySlug } from '../../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import ItemTabs from '../ItemTabs';
import StoreInfo from './StoreInfo';
import Feedback from './Feedback';
import DeliveryArea from './DeliveryArea';

const postType = 'locations';
export async function generateMetadata({ params }) {
  const postId = params.slug;
  const metadata = await fetchCPTMetadataBySlug(postId, postType);

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

  let post;
  try {
    post = await fetchCPTBySlug(params.slug, postType);

    post;

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }


  const content = [
    { id: 'tab1', component: <StoreInfo post={post} /> },
    { id: 'tab2', component: <Feedback post={post} /> },
    { id: 'tab3', component: <DeliveryArea post={post} /> },
    // Add more content as needed
  ];
  return (
    <div className="cream-color">
      <section className="hero">
        <Hero post={post} />
      </section>
      <section className="viewport">
        <div className="page-container">
          <ItemTabs
            bkgVariant="locations"
            tab1="Store Info"
            tab2="Feedback"
            tab3="Delivery Area"
            content={content} />
        </div>
      </section>
    </div>
  );
}
