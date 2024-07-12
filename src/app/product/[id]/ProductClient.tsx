'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProductReview from '@/components/productReview/ProductReview';
import Hero from '@/components/hero/Hero';
import ProductInfo from '@/components/productInfo/ProductInfo';
import EmptyState from '@/components/emptyState/EmptyState';
import RelatedProducts from '@/components/relatedProducts/RelatedProducts';

import { ProductClientProps } from '@/types';
import { getProduct } from '@/services/productService';

import './Product.scss';
import http from '@/services/httpService';

const ProductClient = ({ productId }: ProductClientProps) => {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const { data } = await http.get(`/api/products/${productId}`);
      return data;
    },
    enabled: !!productId,
  });

  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(data);
  }, [data]);

  if (!product) {
    return (
      <EmptyState
        title='Product not found'
        subtitle="Looks like there's no product with that ID."
        imgSrc='empty'
      />
    );
  }

  return (
    <div className='product'>
      <Hero name={product.name} image={product.image} />
      <ProductInfo product={product} currentUser={session?.user} onUpdate={setProduct} />
      <ProductReview actionId={product.id} />
      <RelatedProducts
        productId={product.id}
        ingredients={product.ingredients}
      />
    </div>
  );
};

export default ProductClient;
