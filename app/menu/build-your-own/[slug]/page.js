// app/menu/[cptName]/[slug]/page.js
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchPageData } from '../../../lib/utils';
import { METADATABASE_API_URL } from '../../../lib/constants';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import MenuNavigation from '../../MenuNavigation';
import styles from './Single.module.css';
import ItemTabs from '../../ItemTabs';
import BYOContent1 from './BYOContent1';
import BYOContent2 from './BYOContent2';
import Parallax from './Parallax';
import OrderBtn from '../../../components/OrderBtn';
import Link from 'next/link';

const postType = 'build-your-own';
export async function generateMetadata({ params }) {
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
  };
}

export default async function Page({ params }) {

  let data;
  let post;

  try {

    data = await fetchPageData(1332);
    post = await fetchCPTBySlug(params.slug, postType);

    data = { ...data };
    post = { ...post };

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }
  const content = [
    { id: 'tab1', component: <BYOContent1 data={data} post={post} /> },
    { id: 'tab2', component: <BYOContent2 data={data} post={post} /> },
    // Add more content as needed
  ];

  return (
    <>

      <div className="cream-color">
        <MenuNavigation
          mode="dark"
          activeItem="build-your-own" />
        <section className="viewport innermenu">
          <div className={`page-container ${styles.container}`}>
            <div className={styles.content}>
              <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered || '' }} />
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered || '' }} />

              <ItemTabs
                bkgVariant="green"
                tab1="Ingredients"
                tab2="Sauces"
                content={content} />
              <div className="display-flex" style={{ alignItems: 'center' }}>
                <OrderBtn />
                <Link href="/SarpinosPizzeria_AllergenChart.pdf" target='_blank' className='text-link' style={{ paddingLeft: '2rem', color: 'white' }}>Allergen Info</Link>
              </div>
            </div>
          </div>
          <Parallax />
        </section>
        <CalloutMobileApp />
      </div>
    </>
  );
}
