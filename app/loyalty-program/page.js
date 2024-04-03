import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Earn from './Earn';
import CalloutLoyalty from '@/app/components/CalloutLoyalty';
import Breadcrumbs from '@/app/components/Breadcrumbs';

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
    jsonld: metadata.yoastMetadata?.schema?.["@graph"]
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
    <div className='cream-color'>
      <Breadcrumbs style="nonmenu" />
      <section className="viewport" style={{ marginTop: '-100px' }}>
        <div className="page-container" style={{ paddingTop: 0 }}>
          <Hero
            data={data}
            mainImage={mainImage} />
        </div>
      </section>
      <section className="viewport" style={{ overflow: 'hidden' }}>
        <div className="page-container" style={{ paddingTop: 0 }}>
          <Earn
            data={data} />
        </div>
      </section >
      <CalloutLoyalty />
    </div >
  );
}