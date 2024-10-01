import dynamic from 'next/dynamic';

import OfferInfo from '../offerInfo/OfferInfo';

import './Offer.scss';

const OfferImage = dynamic(() => import('../offerImage/OfferImage'));

const Offer = () => {
  return (
    <section className='offer'>
      <div className='container'>
        <OfferImage />
        <OfferInfo />
      </div>
    </section>
  );
};

export default Offer;
