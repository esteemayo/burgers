'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { SearchClientProps } from '@/types';
import ProductLists from '../productLists/ProductLists';

import './SearchClient.scss';

const SearchClient = ({ products }: SearchClientProps) => {
  const params = useSearchParams();
  const searchQuery = params ? params.get('q') : null;

  const encodedSearchQuery = encodeURI(searchQuery ?? '');
  const decodedSearchQuery = decodeURI(encodedSearchQuery);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className='searchClient'>
      <h3>
        Search results for
        <small>{`"${decodedSearchQuery}"`}</small>
      </h3>
      <ProductLists data={products} loading={isLoading} />
    </div>
  );
};

export default SearchClient;
