// /menu/calzones/page.js
import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '../../lib/utils';
import MenuNavigation from '../MenuNavigation';
import MenuHeader from '../MenuHeader';
import MenuContent from '../MenuContent';
import CalloutMenu from '@/app/components/CalloutMenu';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';

const pageId = 94;
const postType = ['calzones'];
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
    try {
      heroImage = await fetchACFImage(data.acf.hero_image);
    } catch (error) {
      console.error("Error fetching hero image:", data.acf.hero_image);
      throw error;
    }
  } catch (error) {
    console.error("Error in Page component:", error);
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        '@type': 'Menu',
        "name": `Order ${data.title.rendered} from Sarpino\'s Pizzeria`,
        "url": `https://www.gosarpinos.com/menu/${data.slug}`,
        "image": heroImage?.sourceUrl || '/default-menu-image.svg',
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
            "name": `${data.yoast_head_json.title} | Sarpino\'s Pizzeria`,
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
      <MenuNavigation
        mode="light"
        activeItem="calzones" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={heroImage?.sourceUrl || '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'fresh calzones'}
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
