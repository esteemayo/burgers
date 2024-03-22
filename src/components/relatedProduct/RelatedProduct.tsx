import Link from 'next/link';
import Image from 'next/image';

import './RelatedProduct.scss';

const RelatedProduct = () => {
  return (
    <article className='relatedProduct'>
      <div className='relatedBox'>
        <Link href={`/product/1`}>
          <div className='relatedThumbnail'>
            <Image
              src='/img/hero.png'
              width={190}
              height={170}
              alt='product image'
            />
          </div>
        </Link>
        <div className='relatedContent'>
          <Link href={`/product/1`}>
            <h2 className='relatedHeading'>Grilled Chicken Burger</h2>
            <span className='relatedPrice'>$4,000.00</span>
          </Link>
          <button type='button' className='relatedBtn'>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default RelatedProduct;
