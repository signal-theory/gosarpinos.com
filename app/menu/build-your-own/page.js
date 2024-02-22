import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '../../lib/utils';
import MenuNavigation from '../MenuNavigation';
import MenuHeader from '../MenuHeader';
import MenuContent from '../MenuContent';
import CalloutMenu from '../../components/CalloutMenu';
import CalloutMobileApp from '../../components/CalloutMobileApp';

const pageId = 91;
const postType = ['build-your-own'];
export async function generateMetadata() {
  const metadata = await fetchMetadata(pageId);

  const metadataBase = METADATABASE_API_URL;

  return {
    metadataBase,
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : []
    }
  };
}

export default async function Page() {
  let data;
  let posts;
  let heroImage;
  try {
    data = await fetchPageData(pageId);
    console.log('Image ID:', data.acf?.hero_image); // Add this line
    posts = await fetchCPTData(postType);
    heroImage = await fetchACFImage(data.acf.hero_image);
    console.log('Hero Image:', heroImage); // Add this line

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  console.log('hero', heroImage)
  return (
    <>
      <MenuNavigation
        mode="light"
        activeItem="build-your-own" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={heroImage?.sourceUrl || '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'build your own fresh pizza'}
            pageTitle={data.title.rendered}
            pageContent={data.content.rendered}
          />
          {/* Render the menu posts */}
          <MenuContent
            posts={posts}
            postTypeSlug={postType}
            categoryTitle={'Sort ' + postType} />
        </div>
      </section>

      <CalloutMenu />
      <CalloutMobileApp />
    </>
  );
}
