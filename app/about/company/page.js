import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Ingredients from './Ingredients';
import Timeline from './Timeline';
import Franchise from './Franchise';
import Breadcrumbs from '@/app/components/Breadcrumbs';

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
  let franchiseImage;

  try {
    data = await fetchPageData(pageId);
    franchiseImage = data.acf && data.acf.franchise_image ? await fetchACFImage(data.acf.franchise_image) : null;

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <div className="cream-color" style={{ overflow: 'hidden' }}>
        <Breadcrumbs style="nonmenu" />
        <Hero data={data} />
        <Ingredients data={data} />
        <Timeline data={data} />
        <Franchise data={data} franchiseImage={franchiseImage} />
      </div>
    </>
  );
}