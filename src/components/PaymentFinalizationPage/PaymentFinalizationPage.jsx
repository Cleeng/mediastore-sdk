import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledOfferWrapper } from 'components/Offer/OfferStyled';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { fetchFinalizeInitialPayment } from 'appRedux/finalizePaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledLoaderContent } from 'containers/OfferContainer/StyledOfferContainer';
import Loader from 'components/Loader';
import ThankYouPage from 'components/ThankYouPage';
import FailedPaymentPage from 'components/FailedPaymentPage';

const PaymentFinalizationPage = ({ onSuccess }) => {
  const adyenRedirectResult = new URLSearchParams(window.location.search).get(
    'redirectResult'
  );
  const orderId = new URLSearchParams(window.location.search).get('orderId');
  const dispatch = useDispatch();

  const submitRedirectResult = () => {
    dispatch(
      fetchFinalizeInitialPayment({
        orderId,
        details: { redirectResult: adyenRedirectResult }
      })
    ).then(() => {
      window.history.replaceState(null, null, window.location.pathname);
    });
  };
  const { error, payment } = useSelector(
    (state) => state.finalizeInitialPayment
  );

  useEffect(() => {
    if (adyenRedirectResult && orderId) {
      submitRedirectResult();
    }
  }, []);

  if (error) {
    return <FailedPaymentPage />;
  }

  if (payment.id) {
    if (onSuccess) {
      onSuccess();
      return null;
    }
    return <ThankYouPage />;
  }

  return (
    <StyledOfferWrapper data-testid='PaymentFinalizationPage-loader'>
      <Header />
      <StyledLoaderContent>
        <Loader />
      </StyledLoaderContent>
      <Footer />
    </StyledOfferWrapper>
  );
};

export default PaymentFinalizationPage;

PaymentFinalizationPage.propTypes = {
  onSuccess: PropTypes.func
};

PaymentFinalizationPage.defaultProps = {
  onSuccess: null
};
