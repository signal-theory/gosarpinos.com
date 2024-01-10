import Image from 'next/image';
const MenuHeader = ({ featuredImage, featuredImageAlt, pageTitle, pageContent }) => {
  return (
    <div className="responsive-column-container" style={{margin: '1em 0'}}>
      <div>
       {featuredImage && (
          <Image
            alt={featuredImageAlt}
            src={featuredImage}
            width={600}
            height={300}
            />
        )}
      </div>
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: pageTitle }} />
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    </div>
  )
}

export default MenuHeader;