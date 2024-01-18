// app/menu/desserts/[slug]/page.js
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchACFImage } from '../../../lib/utils';
import { METADATABASE_API_URL } from '../../../lib/constants';
import Image from 'next/image';
import MenuNavigation from '../../MenuNavigation';
import OrderBtn from '@/app/components/OrderBtn';
import ShareToggle from '@/app/components/ShareToggle';
import ItemTabs from '../../ItemTabs';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import ItemInfo from '../../ItemInfo';
import ItemAllergens from '../../ItemAllergens';
import styles from './Single.module.css';

const postType = 'desserts';
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
    // Add other metadata properties if needed
  };
}

export default async function Page({ params }) {

  let post;
  let mainImage;

  try {
    post = await fetchCPTBySlug(params.slug, postType);

    mainImage = post?.acf.main_image ? await fetchACFImage(post?.acf.main_image).catch(e => {
      console.error(`Error fetching main image: ${e}`);
      return null;
    }) : null;

    post = { ...post, mainImage };

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }


  const content = [
    { id: 'tab1', component: <ItemInfo /> },
    { id: 'tab2', component: <ItemAllergens /> },
    // Add more content as needed
  ];

  return (
    <>
      <div className="cream-color">
        <MenuNavigation
          mode="dark"
          activeItem="desserts" />
        <section className="viewport innermenu">
          <div className="page-container">
            <div className="responsive-column-container">
              <div>
                <Image
                  src={mainImage.sourceUrl}
                  alt={mainImage.altText}
                  width={612}
                  height={678}
                  className={styles.image}
                />
              </div>
              <div>
                <ShareToggle post={post} />
                <h1 dangerouslySetInnerHTML={{ __html: post?.title?.rendered || '' }} />
                <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered || '' }} />
                <OrderBtn />
                <ItemTabs
                  tab1="Nutritional Info"
                  tab2="Allergens"
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
