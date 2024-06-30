import Link from 'next/link';
import { PaginationProps } from '@/types';

import './Pagination.scss';

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const pages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from(new Array(pages), (_, i) => i + 1);

  return (
    <div className='pagination'>
      <div className='wrapper'>
        {pageNumbers.map((page) => {
          return (
            <Link key={page} href='#' className='btnPagination'>
              {page}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
