import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData } from '../../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Ingredients from './Ingredients';
import Timeline from './Timeline';
import Franchise from './Franchise';

const pageId = 49;
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

  try {
    data = await fetchPageData(pageId);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <div className="cream-color" style={{ overflow: 'hidden' }}>
        <Hero data={data} />
        <Ingredients data={data} />
        <Timeline data={data} />
        <Franchise />
      </div>
    </>
  );
}