// app/menu/[cptName]/[slug]/page.js
import Head from 'next/head';
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchACFImage } from '../../../lib/utils';
import { METADATABASE_API_URL } from '../../../lib/constants';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
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
  let metadata;

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
     <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        {metadata?.openGraph?.images.map((image, index) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}
      </Head>
      <div className="cream-color">
        <section className="viewport innerhero">
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
