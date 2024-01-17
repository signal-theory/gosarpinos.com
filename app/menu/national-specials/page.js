// /menu/national-specials/page.js
import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData } from '../../lib/utils';
import MenuNavigation from '../MenuNavigation';
import SpecialsContent from './SpecialsContent';
import CalloutMenu from '../../components/CalloutMenu';
import CalloutMobileApp from '../../components/CalloutMobileApp';

const pageId = 88;
const postType = ['specials'];
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
        activeItem="specials" />
      <section className="viewport innermenu specials-background">
        <div className="page-container">
          <div className='flex-align-center text-align-center'>
            <h2 dangerouslySetInnerHTML={{ __html: data.title.rendered || '' }} />
            <div style={{ maxWidth: '500px' }} dangerouslySetInnerHTML={{ __html: data.content.rendered || '' }} />
          </div>
          {/* Render the menu posts */}
          <SpecialsContent
            posts={posts}
            postType={postType}
            categoryTitle={'Sort ' + postType} />
        </div>
      </section>

      <CalloutMenu />
      <CalloutMobileApp />
    </>
  );
}
