/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { createPrimerSession, authorizePrimerPurchase } from 'api';
import { fetchUpdateOrder, selectOnlyOrder } from 'appRedux/orderSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import {
  selectPublisherConfig,
  selectTermsUrl
} from 'appRedux/publisherConfigSlice';

export const usePrimer = (onSubmit) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const { paymentMethods: publisherPaymentMethods } = useAppSelector(
    selectPublisherConfig
  );
  const a = useAppSelector((state) => state.paymentMethods);

  console.log(a);

  const getPrimerToken = async () => {
    try {
      const response = await createPrimerSession();
      setIsLoading(false);
      return response;
    } catch (error) {
      setSessionError('An error occurred!');
      setIsLoading(false);
      return null;
    }
  };

  const onCheckoutComplete = async ({ payment }) => {
    console.log('Checkout Complete!', payment);
    const { id, orderId } = payment;
    // Initial purchase authorization
    try {
      const response = await authorizePrimerPurchase(id);
      onSubmit();
    } catch (error) {
      setSessionError('An error occurred!');
      setIsLoading(false);
    }

    // Redirect to success page
    return null;
  };

  const onCheckoutFail = (error: any, data: { payment?: any }, handler) => {
    console.log('Checkout Fail!', error, data.payment);
    if (!handler) {
      return;
    }
    return handler.showErrorMessage();
  };

  return {
    getPrimerToken,
    isLoading,
    setIsLoading,
    sessionError,
    setSessionError,
    onCheckoutComplete,
    onCheckoutFail
  };
};
