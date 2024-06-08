'use client';

import Link from 'next/link';
import Image from 'next/image';

import { formatDate } from '@/utils/formatDate';
import { excerpts } from '@/utils';
import { formatCurrency } from '@/utils/formatCurrency';

import { TableProps } from '@/types';

import './Table.scss';

const Table = ({
  data,
  isAdmin,
  dimension,
  orderStatus,
  onClick,
  onSubmit,
}: TableProps) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Price</th>
          <th>Products</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
          const { id, price, status, products, createdAt } = item;
          return (
            <tr
              key={id}
              className={`${
                status !== 'delivered' ? 'orderStatus' : 'orderDelivered'
              }`}
            >
              <td>
                <Link href={`/order/${encodeURIComponent(id)}`}>
                  #{excerpts(id, 10)}
                </Link>
              </td>
              <td>
                <time dateTime={createdAt}>{formatDate(createdAt)}</time>
              </td>
              <td>{formatCurrency(price)}</td>
              <td className='orderName'>
                {products?.map((product) => {
                  return (
                    <span key={product.id}>
                      {product.name} <br />
                    </span>
                  );
                })}
              </td>
              {!isAdmin ? (
                <td>{orderStatus(status)}</td>
              ) : (
                <td>
                  <form onSubmit={onSubmit}>
                    <input type='text' placeholder={orderStatus(status)} />
                    <button type='submit'>
                      <Image
                        src='/img/edit.png'
                        width={20}
                        height={20}
                        alt='edit icon'
                      />
                    </button>
                  </form>
                  {dimension <= 768 && (
                    <div className='statusContainer'>
                      {orderStatus(status)}
                      <button type='button' onClick={(e) => onClick(e, item)}>
                        <Image
                          src='/svg/edit.svg'
                          width={20}
                          height={20}
                          alt='edit icon'
                        />
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
