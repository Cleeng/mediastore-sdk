import { useState } from 'react';
import { UniversalCheckoutOptions } from '@primer-io/checkout-web';
import { createPrimerSession, authorizePrimerPurchase } from 'api';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { selectOnlyOrder } from 'appRedux/orderSlice';
import { fetchPaymentDetails } from 'appRedux/paymentDetailsSlice';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'appRedux/popupSlice';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_FAILED,
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL
} from 'util/eventDispatcher';
import { UsePrimerHookProps } from 'types/Primer.types';
import updatePrimerPaymentDetails from 'api/PaymentDetails/Primer/updatePrimerPaymentDetails';

const CONTAINER = 'msd__primerWrapper';

export const usePrimer = ({ onSubmit, isMyAccount }: UsePrimerHookProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const { id: orderId } = useAppSelector(selectOnlyOrder);

  const handleUpdatePaymentDetails = async (externalPaymentId: string) => {
    try {
      await updatePrimerPaymentDetails(externalPaymentId);

      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
      dispatch(
        updatePaymentDetailsPopup({
          isLoading: false,
          step: PAYMENT_DETAILS_STEPS.SUCCESS
        })
      );
      dispatch(fetchPaymentDetails());
    } catch (error) {
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
      dispatch(
        updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR })
      );
    }
  };

  const getPrimerToken = async () => {
    try {
      setIsLoading(true);
      const response = await createPrimerSession(isMyAccount);
      return response;
    } catch (error) {
      setSessionError('An error occurred!');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const options: UniversalCheckoutOptions = {
    container: `#${CONTAINER}`,
    apiVersion: '2.4',
    form: {
      inputLabelsVisible: true
    },
    submitButton: {
      useBuiltInButton: true,
      amountVisible: true
    },
    successScreen: false,
    vault: {
      visible: !isMyAccount
    },
    onBeforePaymentCreate: (_, handler) => {
      // validate gift delivery details here
      return handler.continuePaymentCreation();
    },
    onPaymentCreationStart: () => {
      if (isMyAccount) {
        dispatch(updatePaymentDetailsPopup({ isLoading: true }));
      }
    },
    onCheckoutFail: async (error, data, handler) => {
      console.log('onCheckoutFail', error, data.payment);

      if (!handler) {
        return;
      }

      handler.showErrorMessage();
    },
    onCheckoutComplete: async (data) => {
      const { payment } = data;

      if (!payment?.id) {
        setSessionError('An error occurred!');
        return;
      }

      if (isMyAccount) {
        await handleUpdatePaymentDetails(payment.id);
        return;
      }

      try {
        setIsLoading(true);
        await authorizePrimerPurchase(payment.id, orderId);

        if (onSubmit) {
          onSubmit();
        }
      } catch (error) {
        setSessionError('An error occurred!');
      } finally {
        setIsLoading(false);
      }
    },
    onPaymentMethodAction: (paymentMethodAction) => {
      console.log('onPaymentMethodAction', paymentMethodAction);
      // selectPaymentMethod handler
    }
  };

  return {
    getPrimerToken,
    isLoading,
    sessionError,
    options
  };
};
