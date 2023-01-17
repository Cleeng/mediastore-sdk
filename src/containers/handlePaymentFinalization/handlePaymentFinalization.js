import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import PaymentResultPage from 'components/PaymentResultPage';
import { setShouldShowFinalizePaymentComponent } from 'redux/finalizePaymentSlice';
import useFirstRender from 'hooks/useFirstRender';

const HandlePaymentFinalization = Component => {
  return function withHandlePaymentFinalization(props) {
    const dispatch = useDispatch();
    const firstRender = useFirstRender(null);

    const { error, shouldShowFinalizePaymentComponent } = useSelector(
      state => state.finalizeInitialPayment
    );

    const adyenRedirectResult = new URLSearchParams(window.location.search).get(
      'redirectResult'
    );

    if (adyenRedirectResult && !error) {
      dispatch(setShouldShowFinalizePaymentComponent(true));
    }

    useEffect(() => {
      if (!firstRender && !shouldShowFinalizePaymentComponent) {
        window.history.replaceState(null, null, window.location.pathname);
      }
    }, [firstRender, shouldShowFinalizePaymentComponent]);

    if (shouldShowFinalizePaymentComponent) {
      return <PaymentResultPage />;
    }
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} />;
  };
};

HandlePaymentFinalization.propTypes = {
  children: PropTypes.node
};

HandlePaymentFinalization.defaultProps = {
  children: ''
};

export default HandlePaymentFinalization;
