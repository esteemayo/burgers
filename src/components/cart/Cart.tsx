'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Image from 'next/image';

import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/hooks/useCartStore';
import { useCartControls } from '@/hooks/useCartControls';

import './Cart.scss';

const Cart = () => {
  const { handleDecrement, handleIncrement } = useCartControls();

  const products = useCartStore((store) => store.products);
  const removeFromCart = useCartStore((store) => store.removeFromCart);

  const emptyHeaderClasses = useMemo(() => {
    return products.length < 1 ? 'cardHeading emptyCardHeading' : 'cardHeading';
  }, [products.length]);

  return (
    <aside className='productCart'>
      <div className='detailBox'>
        <div className='cardWrap'>
          <div className={emptyHeaderClasses}>Your cart</div>
          {products.length < 1 ? (
            <div className='emptyCart'>
              <div className='emptyHeading'>Empty cart</div>
              <div className='emptyLink'>
                <Link href='/products'>Continue shopping</Link>
              </div>
            </div>
          ) : (
            <div className='cardBody'>
              {products.map((product) => {
                const { id, name, price, quantity } = product;
                return (
                  <div key={id} className='catProduct'>
                    <div className='cardBox'>
                      <div className='cardProductWrap'>
                        <div className='cardProduct'>
                          <div className='cardName'>
                            <p>
                              <span>{quantity}</span>
                              <Link href={`/product/${id}`}>{name}</Link>
                            </p>
                          </div>
                          <div className='cardButtons'>
                            <button
                              type='button'
                              onClick={(e) => handleDecrement(e, id)}
                            >
                              <Image
                                src='/svg/chevron-down.svg'
                                width={17}
                                height={17}
                                alt='chevron-down icon'
                              />
                            </button>
                            <button
                              type='button'
                              onClick={(e) => handleIncrement(e, id)}
                            >
                              <Image
                                src='/svg/chevron-up.svg'
                                width={17}
                                height={17}
                                alt='chevron-up icon'
                              />
                            </button>
                          </div>
                          <button
                            type='button'
                            className='deleteCardBtn'
                            onClick={() => removeFromCart(id)}
                          >
                            <RemoveShoppingCartIcon />
                          </button>
                          <div className='cardPrice'>
                            {formatCurrency(price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {products.length > 0 && (
            <div className='cardFooter'>
              <Link href='/checkout'>Proceed to Checkout</Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Cart;
