import { Suspense } from 'react';
import Loader from 'components/Loader';
import usePaymentDropIn from 'hooks/usePaymentDropIn';

import { PaymentDropInProps } from './PaymentDropIn.types';

const PaymentDropIn = ({ adyenProps }: PaymentDropInProps) => {
  const dropInComponent = usePaymentDropIn(adyenProps);

  return <Suspense fallback={<Loader />}>{dropInComponent}</Suspense>;
};

export default PaymentDropIn;
