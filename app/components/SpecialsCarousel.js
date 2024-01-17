
import Link from 'next/link';
import Image from 'next/image';

import specialsBKG from '../../public/circle-outline-1.svg'


const SpecialsCarousel = ({ specialsData }) => {

  return (
    <ul className="special-carousel" style={{ gridTemplateColumns: `repeat(${specialsData.length}, 1fr)` }}>
      {specialsData.map((item, index) => (
        <li className="carousel-item" key={index}>
          <Image src={specialsBKG} alt="" className="specials-bkg" />
          <div className="item">
            <h3 className="item-title" dangerouslySetInnerHTML={{ __html: item.acf.title_of_special || '' }} />
            <p>with code</p>
            <h3 className="item-code">{item.title.rendered}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SpecialsCarousel;