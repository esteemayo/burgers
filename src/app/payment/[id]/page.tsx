import PaymentClient from '@/app/payment/[id]/PaymentClient';

import './Payment.scss';

interface IParams {
  params: {
    id: string;
  };
}

const Payment = ({ params }: IParams) => {
  const { id: orderId } = params;

  return <PaymentClient orderId={orderId} />;
};

export default Payment;
