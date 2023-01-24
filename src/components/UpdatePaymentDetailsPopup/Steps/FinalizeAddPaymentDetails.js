import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchFinalizeAddPaymentDetails } from 'redux/finalizeAddPaymentDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';

const FinalizeAddPaymentDetails = () => {
  // TODO: check { onSuccess } callback
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
      .then(addPaymentDetailsResponse => {
        console.log({ addPaymentDetailsResponse });
        dispatch(
          updatePaymentDetailsPopup({
            step: PAYMENT_DETAILS_STEPS.SUCCESS,
            isLoading: false
          })
        );
      })
      .catch(errors => {
        console.log({ errors });
        dispatch(
          updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR }) // TODO: customize texts
        );
      });
  };

  useEffect(() => {
    console.log('call submitRedirectResult');
    submitRedirectResult();
  }, []);

  return <Loader />;
};

export default FinalizeAddPaymentDetails;

FinalizeAddPaymentDetails.propTypes = {
  onSuccess: PropTypes.func
};

FinalizeAddPaymentDetails.defaultProps = {
  onSuccess: null
};
