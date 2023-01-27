import React, { useEffect } from 'react';
import { fetchFinalizeAddPaymentDetails } from 'redux/finalizeAddPaymentDetailsSlice';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';
import PropTypes from 'prop-types';

const FinalizeAddPaymentDetails = ({ updatePaymentDetailsSection }) => {
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
        updatePaymentDetailsSection();
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

FinalizeAddPaymentDetails.propTypes = {
  updatePaymentDetailsSection: PropTypes.func
};

FinalizeAddPaymentDetails.defaultProps = {
  updatePaymentDetailsSection: () => {}
};

export default FinalizeAddPaymentDetails;
