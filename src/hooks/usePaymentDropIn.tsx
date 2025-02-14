import { lazy } from 'react';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { useAppSelector } from 'appRedux/store';
import { shouldShowGatewayComponent } from 'util/paymentMethodHelper';

import { AdyenProps } from 'types/Adyen.types';

const Adyen = lazy(
  () => import(/* webpackChunkName: "adyen-component" */ 'components/Adyen')
);
const Primer = lazy(
  () => import(/* webpackChunkName: "primer-component" */ 'components/Primer')
);

const usePaymentDropIn = (adyenProps: AdyenProps) => {
  const { paymentMethods: publisherPaymentMethods } = useAppSelector(
    selectPublisherConfig
  );

  if (shouldShowGatewayComponent('primer', publisherPaymentMethods)) {
    return <Primer />;
  }

  if (shouldShowGatewayComponent('adyen', publisherPaymentMethods)) {
    return <Adyen {...adyenProps} />;
  }

  return null;
};

export default usePaymentDropIn;
