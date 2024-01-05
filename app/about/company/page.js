import { METADATABASE_API_URL } from '../../lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '../../lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import Image from 'next/image';
import OrderBtn from '../../components/OrderBtn';

import styles from '../../components/Company.module.css';

export async function generateMetadata({ params }) {
  const pageId = params.pageId || 49; // default to 149 if no ID is provided
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

 
export default async function Company({ params }) {
  let data;
  let companyImage;

  const pageId = params.pageId || 49; // Default to 49 if no ID is provided
  try {
    data = await fetchPageData(pageId);
    if (data.acf && data.acf.company_hero) {
      companyImage = await fetchACFImage(data.acf.company_hero); // Pass the image ID
    }
  } catch (error) {
    console.error("Error in Page component:", error);
    // companyImage = null; // Set default or handle error
  }

  return (
    <>
    <section className="viewport cream-color">
        <div className={`full-page-container ${styles.innerHero}`}>
          <div className="responsive-column-container">
            <div className="featured-image">
              <div className={styles.basilAnimation}>
                <Image
                src={companyImage.sourceUrl}
                alt={companyImage.altText}
                width={750}
                height={641}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
                <Image src={'/basil-leaf-1.webp'} width={300} height={300} className={styles.basilLeaf1} alt="basil leaf" />
                <Image src={'/basil-leaf-2.webp'} width={300} height={300} className={styles.basilLeaf2} alt="basil leaf" />
                <Image src={'/basil-leaf-3.webp'} width={300} height={300} className={styles.basilLeaf3} alt="basil leaf" />
                <Image src={'/basil-leaf-4.webp'} width={300} height={300} className={styles.basilLeaf4} alt="basil leaf" />
                <Image src={'/basil-leaf-1.webp'} width={300} height={300} className={styles.basilLeaf5} alt="basil leaf" />
                <Image src={'/basil-leaf-2.webp'} width={300} height={300} className={styles.basilLeaf6} alt="basil leaf" />           
              </div>
            </div>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: data?.content.rendered }}  />
              <OrderBtn />
            </div>
          </div>
        </div>
      </section></>
  );
}