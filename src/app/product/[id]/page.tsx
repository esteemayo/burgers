import type { Metadata } from 'next';

import ProductClient from './ProductClient';
import { getProduct } from '@/services/productService';

interface IParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = params;

  const { data } = await getProduct(id);

  return {
    title: `Burger - ${data.name} page`,
  };
}

const Product = async ({ params: { id } }: IParams) => {
  return <ProductClient productId={id} />;
};

export default Product;
