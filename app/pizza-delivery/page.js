import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../lib/utils'; // Adjust the path as necessary
import MapHero from './Map';

const pageId = 214;
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

  return (
    <><MapHero /></>

  );
}
