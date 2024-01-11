import Image from 'next/image';
const MenuHeader = ({ featuredImage, featuredImageAlt, pageTitle, pageContent }) => {
  return (
    <div className="responsive-column-container" style={{margin: '1em 0 2em'}}>
      <div>
       {featuredImage && (
          <Image
            alt={featuredImageAlt}
            src={featuredImage}
            width={650}
            height={400}
            style={{objectFit: 'cover'}}
            />
        )}
      </div>
      <div className='flex-align-center'>
        <h2 style={{margin: '0 auto 0 0'}} dangerouslySetInnerHTML={{ __html: pageTitle }} />
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    </div>
  )
}

export default MenuHeader;