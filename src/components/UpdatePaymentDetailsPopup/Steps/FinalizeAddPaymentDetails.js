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
    );
  };
  const { error, paymentDetails } = useSelector(
    state => state.finalizeAddPaymentDetails
  );

  useEffect(() => {
    console.log('call submitRedirectResult');
    submitRedirectResult();
  }, []);

  if (error) {
    dispatch(
      updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR }) // TODO: customize texts
    );
    return null;
  }

  if (paymentDetails?.id) {
    // if (onSuccess) { //TODO: check callback functions
    //   onSuccess();
    //   return null;
    // }
    dispatch(
      updatePaymentDetailsPopup({
        step: PAYMENT_DETAILS_STEPS.SUCCESS,
        isLoading: false
      })
    );
    return null;
  }

  return <Loader />;
};

export default FinalizeAddPaymentDetails;

FinalizeAddPaymentDetails.propTypes = {
  onSuccess: PropTypes.func
};

FinalizeAddPaymentDetails.defaultProps = {
  onSuccess: null
};
