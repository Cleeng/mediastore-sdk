import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  updatePaymentDetailsPopup,
  PAYMENT_DETAILS_STEPS
} from 'redux/popupSlice';
import { setActiveTab, MYACCCOUNT_TABS } from 'redux/myaccountSlice';

const withAddPaymentDetailsFinalizationHandler = (Component) => {
  return ({ ...props }) => {
    const dispatch = useDispatch();
    const adyenRedirectResult =
      typeof window === 'object' &&
      new URLSearchParams(window.location.search)?.get('redirectResult');

    const paymentMethodId =
      typeof window === 'object' &&
      new URLSearchParams(window?.location.search)?.get('paymentMethodId');

    useEffect(() => {
      if (adyenRedirectResult && paymentMethodId) {
        dispatch(setActiveTab(MYACCCOUNT_TABS.paymentInfo));
        dispatch(
          updatePaymentDetailsPopup({
            isOpen: true,
            isLoading: true,
            step: PAYMENT_DETAILS_STEPS.FINALIZE_ADYEN
          })
        );
      }
    }, []);

    return <Component {...props} />;
  };
};

export default withAddPaymentDetailsFinalizationHandler;
