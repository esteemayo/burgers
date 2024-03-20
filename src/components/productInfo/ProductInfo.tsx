import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './ProductInfo.scss';

const ProductInfo = () => {
  return (
    <section className='productInfo'>
      <div>
        <h3>Double grilled chicken burger</h3>
        <p className='desc'>
          Our Chicken nuggets are made from freshly ground well spiced chicken
          breast dipped in batter and fried to golden perfection!
        </p>
        <div>
          <div>
            <div>
              <FaStar />
            </div>
            <span>0 reviews</span>
          </div>
          <span className='heartWrap'>
            <Image
              src='/img/heart-1.png'
              width={20}
              height={20}
              alt='heart icon'
            />
          </span>
          <span className='price'>$5999.0</span>
        </div>
        <div className='quantity'>
          <input type='number' min={1} />
          <button type='button'>
            <ShoppingCartIcon />
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
