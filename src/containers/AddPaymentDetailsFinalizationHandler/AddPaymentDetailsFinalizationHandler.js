import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFirstRender from 'hooks/useFirstRender';
import { showInnerPopup } from 'redux/innerPopupReducer';

const AddPaymentDetailsFinalizationHandler = Component => {
  return function WithAddPaymentDetailsFinalizationHandler({
    // eslint-disable-next-line react/prop-types
    onSuccess,
    ...props
  }) {
    const dispatch = useDispatch();
    const firstRender = useFirstRender(null);

    const { error, shouldShowFinalizePaymentComponent } = useSelector(
      state => state.finalizeInitialPayment
    );

    const adyenRedirectResult = new URLSearchParams(window.location.search).get(
      'redirectResult'
    );
    const paymentMethodId = new URLSearchParams(window.location.search).get(
      'paymentMethodId'
    );

    useEffect(() => {
      if (!firstRender && !shouldShowFinalizePaymentComponent) {
        window.history.replaceState(null, null, window.location.pathname);
      }
    }, [firstRender, shouldShowFinalizePaymentComponent]);

    if (adyenRedirectResult && paymentMethodId && !error) {
      dispatch(showInnerPopup({ type: 'paymentDetails' }));
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component onSuccess={onSuccess} {...props} />;
  };
};

export default AddPaymentDetailsFinalizationHandler;
