import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchPageData } from '../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';

const pageId = 111;
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
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <Hero data={data} />
        </div>
      </section>
    </>
  );
}