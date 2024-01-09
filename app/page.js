// `app/page.js` is the UI for the `/` URL
import { METADATABASE_API_URL } from './lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage, fetchCPTData } from './lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import Image from 'next/image';

import './styles/page.css';
import './styles/menu.css';

import OrderBtn from './components/OrderBtn'
import CalloutWhy from './components/CalloutWhy';
import SpecialsCarousel from './components/SpecialsCarousel';



export async function generateMetadata({ params }) {
  const pageId = params.pageId || 149; // default to 149 if no ID is provided
  const metadata = await fetchMetadata(pageId);
  
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

  let data;
  let menuItemsWithImages;
  let specialsData;
  let cateringImage;

  const pageId = params.pageId || 149; // Default to 149 if no ID is provided
  try {
    data = await fetchPageData(pageId);
    const popularMenuItems = data.acf.popular_menu_items || [];

    // Fetch image details for each item
    menuItemsWithImages = await Promise.all(popularMenuItems.map(async (item) => {
      const image = await fetchACFImage(item.image);
      const hoverImage = await fetchACFImage(item.hover_image);
      return {
        ...item,
        image: image,
        hoverImage: hoverImage
      };
    }));

    specialsData = await fetchCPTData('specials');
    cateringImage = await fetchACFImage(data.acf.catering_image);

  } catch (error) {
    console.error("Error in Page component:", error);
    // Handle the error appropriately
  }


  return (
    <>
      <section className="homepage-hero">
        <div className="hero-container">
          <div className="homepage-pizza-animation">
            <div className="pizza-shadow"></div>
            <Image src={"/olives.svg"} width={100} height={100} alt="olives" className="olives" />
            <Image src={"/tomatoes-cut.svg"} width={150} height={150} alt="cut tomatoes" className="tomatoes-cut" />
            <Image src={'/garlic-bulb.svg'} width={100} height={100} alt="garlic" className="garlic-bulb" />
            <Image src={'/pizza-hero.webp'} width={600} height={600} alt="pizza" className="pizza" 
              priority="true" />
            <Image src={'/onions-sliced.webp'} width={180} height={180} alt="sliced onions" className="onions" />
            <Image src={'/heart-green-outline.svg'} width={60} height={60} alt="green outline heart" className="heart-green-outline-1" />
            <Image src={'/peppercorns-two.svg'} width={60} height={60} alt="peppercorns" className="peppercorns" />
            <Image src={'/heart-tan-outline.svg'} width={60} height={60} alt="tan heart outline" className="heart-tan-outline" />
            <Image src={'/tomatoes-cut.webp'} width={100} height={100} alt="cut tomatoes" className="tomatoes-fresh-cut" />
            <Image src={'/heart-green-fill.svg'} width={60} height={60} alt= "green fill heart" className="heart-green-fill" />
            <Image src={'/basil-leaf-1.webp'} width={100} height={100} alt="basil leaf" className="basil-leaf-1" />
            <Image src={'/heart-green-outline.svg'} width={100} height={100} alt= "green outline heart" className="heart-green-outline-2" />
            <Image src={'/tomato-whole-and-slice.svg'} width={200} height={200} alt="sliced tomatoes" className="tomato-whole-and-slice" />
            <Image src={'/basil-leaf-2.webp'} width={100} height={100} alt="basil leaf" className="basil-leaf-2" />
            <Image src={'/basil-leaf-3.webp'} width={100} height={100} alt="basil leaf" className="basil-leaf-3" />
          </div>
          <div className="homepage-content">
            <div dangerouslySetInnerHTML={{ __html: data?.content.rendered }} style={{ margin: '4rem 0 2rem' }} />
            <div className="btn-slide">
              <OrderBtn />
            </div>
          </div>
        </div>
      </section>
      <section className="viewport homepage-items" style={{ padding: 0 }}>
        <div className="page-container cream-color text-align-center">
          <h2 style={{ paddingTop: '2rem' }}>{data.acf.popular_items_headline}</h2>
          <div className="responsive-three-column-container">
            {menuItemsWithImages.map((item, index) => {
              const url = new URL(item.link.url);
              const path = url.pathname;
              return (
                <div key={index} className="menupage-item">
                  <div className="menupage-thumbnail">
                    <Link href={path}>
                      <Image 
                        src={item.hoverImage.sourceUrl}
                        alt={item.hoverImage.altText}
                        className="mask hover-image"
                        width={100}
                        height={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      <Image 
                        src={item.image.sourceUrl}
                        alt={item.image.altText}
                        className="mask main-image"
                        width={100}
                        height={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                  </div>
                  <div className="menupage-label" style={{ alignItems: 'center' }}>
                    <h3><Link href={path}>{item.title}</Link></h3>
                    <div className="menupage-caption" dangerouslySetInnerHTML={{ __html: item.description }} />
                    <Link className="btn primary-btn" href={path}><span>{item.title}</span></Link>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="viewport red-color homepage-specials text-align-center" style={{ padding: '7rem 0' }}>
        <div className="full-page-container">
          <h2>{data.acf.national_specials_headline}</h2>
          <p style={{ maxWidth: '540px', margin: '0 auto' }}>{data.acf.national_specials_paragraph}</p>
          <div className="carousel-wrapper">
            <div className="carousel-container full">
              <SpecialsCarousel specialsData={specialsData} />
            </div>
          </div>
          <div style={{ margin: '2rem 0' }}>
            
          </div>
          <Link href="/" className="btn secondary-btn"><span>See More Specials</span></Link>
        </div>
      </section>
      <div className="catering-animation">
         <Image src={'/heart-tan-outline.svg'} width={60} height={60} className="heart-tan-outline" alt="tan outline heart" />
        <Image src={'/heart-green-fill.svg'} width={60} height={60} className="heart-green-fill" alt="green fill heart" />
         <Image src={'/heart-green-outline.svg'} width={60} height={60} className="heart-green-outline" alt="green outline heart" />
      </div>
      <section className="viewport catering green-color">
        <div className="page-container cream-color">
          <div className="responsive-twothirds-column-container">
            <div className="image-fill-container">
              <Image
                src={cateringImage.sourceUrl}
                alt={cateringImage.altText}
                fill={true}
                className="hover-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="content flex-align-center" style={{ alignItems: 'flex-start' }}>
              <h2>{data.acf.catering_headline}</h2>
              <p>{data.acf.catering_paragraph}</p>
              <Link href="/" className="btn primary-btn"><span>Catering Info</span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="viewport nighttime-background-color text-align-center" style={{ paddingTop: 0 }}>
        <h2 style={{ padding: '3rem 0 0' }}>WHY SARPINO&apos;S?</h2>
        <CalloutWhy
          containerClasses={'page-container cream-outline text-align-center'}
        />
        <Link href="/about/company" className="btn primary-btn" style={{ margin: '2rem 0' }}><span>About Us</span></Link>
        <div className="page-container text-align-center" style={{ marginTop: '2rem' }}>
          <h2>Sarpino&apos;s On Social</h2>
          <p style={{ maxWidth: '347px', margin: '0 auto' }}>Pizza pics, cheesy captions and saucy posts. Follow us on Instagram and Facebook.</p>
          <div className="social-feed" style={{ margin: '6rem 0' }}>
            INSTAGRAM FEED
          </div>
        </div>
      </section>
    </>
  );
}