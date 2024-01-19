import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Earn from './Earn';
import CalloutLoyalty from '../components/CalloutLoyalty';

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
  let mainImage;

  try {
    data = await fetchPageData(pageId);
    mainImage = data?.acf.main_image ? await fetchACFImage(data?.acf.main_image).catch(e => {
      console.error(`Error fetching main image: ${e}`);
      return null;
    }) : null;

    data = { ...data, mainImage };

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <section className="viewport cream-color">
        <div className="page-container" style={{ paddingTop: 0 }}>
          <Hero
            data={data}
            mainImage={mainImage} />
          <Earn
            data={data} />
        </div>
      </section>
      <CalloutLoyalty />
    </>
  );
}