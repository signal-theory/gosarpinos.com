// app/menu/[cptName]/[slug]/page.js
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchACFImage } from '../../../lib/utils';
import { METADATABASE_API_URL } from '../../../lib/constants';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import MenuNavigation from '../../MenuNavigation';
import styles from './Single.module.css';
import ItemTabs from '../../ItemTabs';
import BYOContent1 from '../BYOContent1';
import BYOContent2 from '../BYOContent2';

const postType = 'build-your-own';
export async function generateMetadata({params}) {
  const postId = params.slug;
  const metadata = await fetchCPTMetadataBySlug(postId, postType);
  
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

  let post;

  try {
    post = await fetchCPTBySlug(params.slug, postType);
    
    

    post = { ...post };

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }
  
  const content = [
    { id: 'tab1', component: <BYOContent1 /> },
    { id: 'tab2', component: <BYOContent2 /> },
    // Add more content as needed
  ];
  return (
    <>
     
      <div className="cream-color">
        <MenuNavigation
          mode="dark"
          activeItem="build-your-own" />
        <section className="viewport">
          <div className="page-container">
            <div className={styles.container}>
              <div className={styles.content}>
                <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                <ItemTabs
                  bkgVariant="green"
                  tab1="Ingredients"
                  tab2="Sauces"
                  content={content} />
              </div>
            </div>
          </div>
        </section>
      <CalloutMobileApp />
      </div>
    </>
  );
}
