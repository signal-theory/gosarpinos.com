// `app/page.js` is the UI for the `/` URL
import { METADATABASE_API_URL } from './lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage, fetchCPTData } from './lib/utils';

import Hero from './home/Hero';
import PopularItems from './home/PopularItems';
import Specials from './home/Specials';
import Catering from './home/Catering';
import WhySarpinos from './home/WhySarpinos';
import InstagramFeed from './home/InstagramFeed';



export async function generateMetadata({ params }) {
  const pageId = params.pageId || 149; // default to 149 if no ID is provided
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
  let menuItemsWithImages;
  let specialsData;
  let cateringImage;
  let socialImagesData;

  const pageId = params.pageId || 149; // Default to 149 if no ID is provided

  try {
    data = await fetchPageData(pageId);
    const popularMenuItems = data.acf.popular_menu_items || [];

    // Fetch image details for each item
    menuItemsWithImages = await Promise.all(popularMenuItems.map(async (item) => {
      const image = await fetchACFImage(item.image);
      const hoverImage = await fetchACFImage(item.hover_image);
      return {
        ...item,
        image: image,
        hoverImage: hoverImage
      };
    }));

    specialsData = await fetchCPTData(['specials']);
    cateringImage = await fetchACFImage(data.acf.catering_image);

    const socialImagesFeed = data.acf.social_images || [];
    socialImagesData = await Promise.all(socialImagesFeed.map(async (item) => {
      const image = await fetchACFImage(item.image);
      return {
        ...item,
        image: image,
      };
    }));
  } catch (error) {
    console.error("Error in Page component:", error);
    // Handle the error appropriately
  }

  // Select random images
  function getRandomImages(images) {
    const shuffled = images.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  const randomImages = getRandomImages(socialImagesData);

  return (
    <>
      <div className="nightmode-overlay">
        <Hero data={data} />
        <PopularItems data={data} menuItemsWithImages={menuItemsWithImages} />
        <Specials data={data} specialsData={specialsData} />
        <Catering data={data} cateringImage={cateringImage} />
        <WhySarpinos />
        <InstagramFeed feed={randomImages} />
      </div>
    </>
  );
}