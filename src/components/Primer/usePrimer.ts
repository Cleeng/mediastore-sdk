import { useState } from 'react';
import { UniversalCheckoutOptions } from '@primer-io/checkout-web';
import {
  createPrimerSession
  // authorizePrimerPurchase
} from 'api';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'appRedux/popupSlice';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_FAILED,
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL
} from 'util/eventDispatcher';
import { UsePrimerHookProps } from 'types/Primer.types';
import { selectPaymentMethods } from 'appRedux/paymentMethodsSlice';
import updatePrimerPaymentDetails from 'api/PaymentDetails/Primer/updatePrimerPaymentDetails';

const CONTAINER = 'msd__primerWrapper';

export const usePrimer = ({ onSubmit, isMyAccount }: UsePrimerHookProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const selectedPaymentMethod = useAppSelector(selectPaymentMethods);

  console.log(selectedPaymentMethod);

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

      if (isMyAccount) {
        const { payment } = data;

        if (!payment?.id) {
          return;
        }

        await updatePrimerPaymentDetails(payment.id);

        eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
        dispatch(
          updatePaymentDetailsPopup({
            isLoading: false,
            step: PAYMENT_DETAILS_STEPS.SUCCESS
          })
        );

        // eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
        // dispatch(
        //   updatePaymentDetailsPopup({
        //     isLoading: false,
        //     step: PAYMENT_DETAILS_STEPS.ERROR
        //   })
        // );
        // return;
      }

      handler.showErrorMessage();
    },
    onCheckoutComplete: async (data) => {
      const { payment } = data;

      if (!payment) {
        setSessionError('An error occurred!');
        return;
      }

      // const { id } = payment;

      try {
        setIsLoading(true);
        // await authorizePrimerPurchase(id, parseInt(orderId, 10));

        if (onSubmit) {
          onSubmit();
        }
      } catch (error) {
        setSessionError('An error occurred!');

        if (isMyAccount) {
          eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
          dispatch(
            updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR })
          );
        }
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
