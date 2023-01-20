import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaymentResultPage from 'components/PaymentResultPage';
import { setShouldShowFinalizePaymentComponent } from 'redux/finalizePaymentSlice';
import useFirstRender from 'hooks/useFirstRender';

const PaymentFinalizationHandler = Component => {
  // eslint-disable-next-line react/prop-types
  return function WithPaymentFinalizationHandler({ onSuccess, ...props }) {
    const dispatch = useDispatch();
    const firstRender = useFirstRender(null);

    const { error, shouldShowFinalizePaymentComponent } = useSelector(
      state => state.finalizeInitialPayment
    );

    const adyenRedirectResult = new URLSearchParams(window.location.search).get(
      'redirectResult'
    );
    const orderId = new URLSearchParams(window.location.search).get('orderId');

    useEffect(() => {
      if (!firstRender && !shouldShowFinalizePaymentComponent) {
        window.history.replaceState(null, null, window.location.pathname);
      }
    }, [firstRender, shouldShowFinalizePaymentComponent]);

    if (adyenRedirectResult && orderId && !error) {
      dispatch(setShouldShowFinalizePaymentComponent(true));
      return <PaymentResultPage onSuccess={onSuccess} />;
    }

    if (shouldShowFinalizePaymentComponent) {
      return <PaymentResultPage onSuccess={onSuccess} />;
    }
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component onSuccess={onSuccess} {...props} />;
  };
};

export default PaymentFinalizationHandler;
