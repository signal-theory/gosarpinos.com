import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../../lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Columns from './Columns';
import FullWidth from './FullWidth.js';
import Experience from './Experience';

const pageId = 60;
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

 
export default async function WhySarpinos({ params }) {
  let data;
  let fullWidthImage;
  let experienceImage;

  try {
    data = await fetchPageData(pageId);
    fullWidthImage = data.acf && data.acf.full_width_background_image ? await fetchACFImage(data.acf.full_width_background_image) : null;
    experienceImage = data.acf && data.acf.video_poster_image ? await fetchACFImage(data.acf.video_poster_image) : null;
  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
    <div className="cream-color">
      <Hero data={data}/>
      <Columns data={data}/>
      <FullWidth data={data} fullWidthImage={fullWidthImage}/>
      <Experience data={data} experienceImage={experienceImage}/>
    </div>
    </>
  );
}