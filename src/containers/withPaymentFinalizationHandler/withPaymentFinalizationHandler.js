import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaymentFinalizationPage from 'components/PaymentFinalizationPage';
import { setShouldShowFinalizePaymentComponent } from 'redux/finalizePaymentSlice';

const withPaymentFinalizationHandler = Component => {
  // eslint-disable-next-line react/prop-types
  return function WithPaymentFinalizationHandler({ onSuccess, ...props }) {
    const dispatch = useDispatch();

    const { error, shouldShowFinalizePaymentComponent } = useSelector(
      state => state.finalizeInitialPayment
    );

    const adyenRedirectResult = new URLSearchParams(window.location.search).get(
      'redirectResult'
    );
    const orderId = new URLSearchParams(window.location.search).get('orderId');

    if (adyenRedirectResult && orderId && !error) {
      dispatch(setShouldShowFinalizePaymentComponent(true));
      return <PaymentFinalizationPage onSuccess={onSuccess} />;
    }

    if (shouldShowFinalizePaymentComponent) {
      return <PaymentFinalizationPage onSuccess={onSuccess} />;
    }
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component onSuccess={onSuccess} {...props} />;
  };
};

export default withPaymentFinalizationHandler;
