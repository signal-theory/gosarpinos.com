import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../../lib/utils'; // Adjust the path as necessary
import CompanyHero from '../../components/about/company/CompanyHero';

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

 
export default async function Company({ params }) {
  let data;
  let heroImage;

  try {
    data = await fetchPageData(pageId);
    if (data.acf && data.acf.company_hero) {
      heroImage = await fetchACFImage(data.acf.company_hero); // Pass the image ID
    }
  } catch (error) {
    console.error("Error in Page component:", error);
    // companyImage = null; // Set default or handle error
  }

  return (
    <>
    <CompanyHero data={data} heroImage={heroImage}
    />
    </>
  );
}