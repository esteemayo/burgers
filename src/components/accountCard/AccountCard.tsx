import Image from 'next/image';

import { AccountCardProps } from '@/types';

import './AccountCard.scss';

const AccountCard = ({ icon, count, price, label }: AccountCardProps) => {
  return (
    <article className='accountCard'>
      <div className='statsWrap'>
        <h2>{count ?? price}</h2>
        <span>{label}</span>
      </div>
      <div className='accountIconWrap'>
        <Image src={icon} width={25} height={25} alt='' />
      </div>
    </article>
  );
};

export default AccountCard;
