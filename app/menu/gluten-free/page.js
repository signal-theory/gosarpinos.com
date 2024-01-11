// /menu/gluten-free/page.js
import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData } from '../../lib/utils';
import MenuHeader from '../MenuHeader';
import GFContent from '../GFContent';
import CalloutMenu from '../../components/CalloutMenu';
import CalloutMobileApp from '../../components/CalloutMobileApp';

const pageId = 206;
const postType = ['pizza', 'calzones'];
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
    <div>
      <section className="viewport innerhero">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
             featuredImageAlt='alt' 
             pageTitle={data.title.rendered} 
             pageContent={data.content.rendered}
            />
          {/* Render the menu posts */}
          <GFContent 
            posts={posts} 
            postType={postType}
            categoryTitle='Sort Gluten Free Menu' />
        </div>
      </section>
      
      <CalloutMenu />
      <CalloutMobileApp />
    </div>
    </>
  );
}
