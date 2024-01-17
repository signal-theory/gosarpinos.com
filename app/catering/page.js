import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchPageData } from '../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import How from './How';

const pageId = 109;
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
    <div className="cream-color">
       <section className="viewport innerhero">
        <div className="page-container">
          <Hero 
            featuredImage={data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
            featuredImageAlt={data._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 'fresh pizza'} 
            data={data}
          />
          </div>
      </section>
      <section className="viewport">
        <div className="page-container green-gradient">
          <How data={data} />
        </div>
      </section>
    </div>
    </>
  );
}