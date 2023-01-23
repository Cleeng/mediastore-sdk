import React from 'react';
import { useDispatch } from 'react-redux';
// import useFirstRender from 'hooks/useFirstRender';
import {
  updatePaymentDetailsPopup,
  PAYMENT_DETAILS_STEPS
} from 'redux/popupSlice';
import { setActiveTab, MYACCCOUNT_TABS } from 'redux/myaccountSlice';

const AddPaymentDetailsFinalizationHandler = Component => {
  return function WithAddPaymentDetailsFinalizationHandler({
    // eslint-disable-next-line react/prop-types
    onSuccess,
    ...props
  }) {
    const dispatch = useDispatch();
    // const firstRender = useFirstRender(null);

    // const { error } = useSelector(state => state.popupManager.paymentDetails);

    const adyenRedirectResult = new URLSearchParams(window.location.search).get(
      'redirectResult'
    );
    const paymentMethodId = new URLSearchParams(window.location.search).get(
      'paymentMethodId'
    );

    // useEffect(() => { //TODO: do it after call to finalize
    //   if (!firstRender) {
    //     window.history.replaceState(null, null, window.location.pathname);
    //   }
    // }, [firstRender]);

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

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component onSuccess={onSuccess} {...props} />;
  };
};

export default AddPaymentDetailsFinalizationHandler;
