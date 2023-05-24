import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader';
import { fetchFinalizeAddPaymentDetails } from 'redux/finalizeAddPaymentDetailsSlice';
import { fetchPaymentDetails } from 'redux/paymentDetailsSlice';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';

const FinalizeAddPaymentDetails = () => {
  const adyenRedirectResult = new URLSearchParams(window.location.search).get(
    'redirectResult'
  );
  const paymentMethodId = new URLSearchParams(window.location.search).get(
    'paymentMethodId'
  );
  const dispatch = useDispatch();

  const submitRedirectResult = () => {
    dispatch(
      fetchFinalizeAddPaymentDetails({
        paymentMethodId,
        details: { redirectResult: adyenRedirectResult }
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          updatePaymentDetailsPopup({
            step: PAYMENT_DETAILS_STEPS.SUCCESS,
            isLoading: false
          })
        );
        dispatch(fetchPaymentDetails());
      })
      .catch(() => {
        dispatch(
          updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR })
        );
      })
      .finally(() => {
        window.history.replaceState(null, null, window.location.pathname);
      });
  };

  useEffect(() => {
    if (adyenRedirectResult && paymentMethodId) {
      submitRedirectResult();
    }
  }, []);

  return <Loader />;
};

export default FinalizeAddPaymentDetails;
