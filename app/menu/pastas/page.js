// /menu/pastas/page.js
import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData } from '../../lib/utils';
import MenuNavigation from '../MenuNavigation';
import MenuHeader from '../MenuHeader';
import MenuContent from '../MenuContent';
import CalloutMenu from '../../components/CalloutMenu';
import CalloutMobileApp from '../../components/CalloutMobileApp';

const pageId = 103;
const postType = ['pastas'];
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

  try {
    data = await fetchPageData(pageId);
    posts = await fetchCPTData(postType);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <MenuNavigation
        mode="light"
        activeItem="pastas" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
            featuredImageAlt={data._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 'fresh pastas'}
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
