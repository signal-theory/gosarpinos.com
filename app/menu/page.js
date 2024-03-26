// /menu/pizza/page.js
import { METADATABASE_API_URL } from '../lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '../lib/utils';
import MenuNavigation from './MenuNavigation';
import MenuHeader from './MenuHeader';
import MenuContent from './MenuContent';
import CalloutMenu from '../components/CalloutMenu';
import CalloutMobileApp from '../components/CalloutMobileApp';

const pageId = 34;
const postType = ['pizza'];
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
    jsonld: metadata.yoastMetadata.schema["@graph"]
  };
}

export default async function Page() {


  let data;
  let posts;
  let heroImage;
  try {
    data = await fetchPageData(pageId);
    posts = await fetchCPTData(postType);
    heroImage = await fetchACFImage(data.acf.hero_image);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <MenuNavigation
        mode="light"
        activeItem="pizza" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={heroImage?.sourceUrl || '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'fresh pizza'}
            pageTitle={data.title.rendered}
            pageContent={data.content.rendered}
          />
          {/* Render the menu posts */}
          <MenuContent
            posts={posts}
            postTypeSlug="sarpinos-specialty-pizza"
            categoryTitle="Sort Specialty Pizzas"
          />
        </div>
      </section>

      <CalloutMenu />
      <CalloutMobileApp />
    </>
  );
}
