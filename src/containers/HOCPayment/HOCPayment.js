import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import PaymentResultPage from 'components/PaymentResultPage';
import { setShouldShowFinalizePaymentComponent } from 'redux/finalizePaymentSlice';

const HOCPayment = Component => ({ ...props }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.finalizeInitialPayment);

  const adyenRedirectResult = new URLSearchParams(window.location.search).get(
    'redirectResult'
  );

  if (adyenRedirectResult && !error) {
    dispatch(setShouldShowFinalizePaymentComponent(true));
  }

  const { shouldShowFinalizePaymentComponent } = useSelector(
    state => state.finalizeInitialPayment
  );

  useEffect(() => {
    if (!shouldShowFinalizePaymentComponent) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [shouldShowFinalizePaymentComponent]);

  if (shouldShowFinalizePaymentComponent) {
    return <PaymentResultPage />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

HOCPayment.propTypes = {
  children: PropTypes.node
};

HOCPayment.defaultProps = {
  children: ''
};

export default HOCPayment;
