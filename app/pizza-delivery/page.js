import dynamic from 'next/dynamic';
import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchCPTData, fetchPageData } from '../lib/utils'; // Adjust the path as necessary
// import MapHero from './Map';
const DynamicMap = dynamic(() => import('./Map'));

const pageId = 214;
const postType = ['locations'];
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
    jsonld: metadata.yoastMetadata.schema["@graph"]
  };
}


export default async function Page({ params }) {
  let posts;
  let data;
  try {
    posts = await fetchCPTData(postType);
    data = await fetchPageData(pageId);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return <DynamicMap posts={posts} data={data} />;
}
