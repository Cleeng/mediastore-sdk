/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { OnCheckoutFailHandler, Payment } from '@primer-io/checkout-web';
import { createPrimerSession, authorizePrimerPurchase } from 'api';
import { UsePrimerHookProps } from 'types/Primer.types';

// Create your own type definition to replace the non-exported one
type PrimerClientError = {
  code: string;
  message: string;
  [key: string]: any;
};

export const usePrimer = ({ onSubmit }: UsePrimerHookProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

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
  const onCheckoutComplete = async (data: {
    payment: Payment | null;
  }): Promise<void> => {
    const { payment } = data;
    if (payment === null) {
      setSessionError('An error occurred!');
      return;
    }
    const { id, orderId } = payment;
    try {
      setIsLoading(true);
      await authorizePrimerPurchase(id, parseInt(orderId, 10));
      setIsLoading(false);
      onSubmit();
    } catch (error) {
      setSessionError('An error occurred!');
      setIsLoading(false);
    }
  };
  const onCheckoutFail = (
    error: PrimerClientError,
    data: { payment?: Payment | undefined },
    handler: OnCheckoutFailHandler | undefined
  ): void => {
    console.log('Checkout Fail!', error, data.payment);
    if (!handler) {
      return;
    }
    handler.showErrorMessage();
  };

  const onPaymentMethodAction = (action: string, data: object) => {
    console.log('Payment Method Action!', action, data);
    // for the PAYMENT_METHOD_SELECTED action we should call the
  };

  return {
    getPrimerToken,
    isLoading,
    setIsLoading,
    sessionError,
    setSessionError,
    onCheckoutComplete,
    onCheckoutFail,
    onPaymentMethodAction
  };
};
