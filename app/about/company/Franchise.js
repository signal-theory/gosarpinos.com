import Image from 'next/image';

const Franchise = () => {
  return (
    <section>
      <div className="full-page-container nighttime-background-color">
        <div className="responsive-column-container">
          <div style={{position: 'relative'}}>
            <Image src="/franchise-fpo.jpg" 
              width={1200}
              height={800}
              alt="franchise building exterior" 
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
            </div>
            <div className="flex-align-center" style={{padding: '2rem', maxWidth: '525px'}}>
              <h2>FRANCHISING OPPORTUNITIES AWAIT</h2>
              <p>Our vision is to be the best gourmet pizza in every market we serve. Our excellence has grown from practices started in Italy to our dozens of successful franchisees across the world. The simple operation, limited cooking, and traditional Italian recipes are what make Sarpino&apos;s work for our franchised system.</p>
              <p>We have created several options for investment to fit mostly any location, or locate, that allows our franchisees to get up and running as quickly as possible with an efficient capital structure and efficiency of operations. We have over 80 restaurants are open in 12 countries with 50 under development. We have opportunities in many areas, so take the next step and apply to be a Sarpino&apos;s franchise partner today.</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Franchise;