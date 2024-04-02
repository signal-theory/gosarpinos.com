// app/menu/sarpinos-specialty-pizza/[slug]/page.js
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchACFImage } from '@/app/lib/utils';
import Image from 'next/image';
import MenuNavigation from '../MenuNavigation';
import OrderBtn from '@/app/components/OrderBtn';
import ShareToggle from '@/app/components/ShareToggle';
import ItemTabs from '../ItemTabs';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import ItemInfo from '../ItemInfo';
import ItemAllergens from '../ItemAllergens';
import styles from './Single.module.css';

const postType = 'pizza';
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
    jsonld: metadata.yoastMetadata.schema["@graph"]
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
    { id: 'tab1', component: <ItemInfo post={post} /> },
    { id: 'tab2', component: <ItemAllergens post={post} /> },
    // Add more content as needed
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        '@type': 'Menu',
        "name": `Order ${data.title.rendered} from Sarpino\'s Pizzeria`,
        "url": `https://www.gosarpinos.com/menu/${data.slug}`,
        "image": '/default-menu-image.svg',
        "description": data.yoast_head_json.description || data.excerpt.rendered,
        "servesCuisine": "Italian",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Gourmet Pizza Open Late Near You | Sarpino\'s Pizzeria",
            "item": "https://gosarpinos.com/"
          },

          {
            "@type": "ListItem",
            "position": 2,
            "name": `Order Gourmet Italian Food | Sarpino\'s Pizzeria`,
            "item": `https://www.gosarpinos.com/menu/${data.slug}`
          }
        ]
      }
    ],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="cream-color">
        <MenuNavigation
          mode="dark"
          activeItem="pizza" />
        <section className="viewport innermenu">
          <div className="page-container">
            <div className="responsive-column-container">
              <div>
                <Image
                  src={mainImage ? mainImage.sourceUrl : '/default-menu-image.svg'}
                  alt={mainImage ? mainImage.altText : 'specialty pizza'}
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
