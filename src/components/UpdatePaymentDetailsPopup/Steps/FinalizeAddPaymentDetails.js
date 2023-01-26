import React, { useEffect } from 'react';
import { fetchFinalizeAddPaymentDetails } from 'redux/finalizeAddPaymentDetailsSlice';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader';
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

  const submitRedirectResult = async () => {
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
      })
      .catch(() => {
        dispatch(
          updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR }) // TODO: customize texts
        );
      });
  };

  useEffect(() => {
    submitRedirectResult();
  }, []);

  return <Loader />;
};

export default FinalizeAddPaymentDetails;
