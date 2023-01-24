import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledOfferWrapper } from 'components/Offer/OfferStyled';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { fetchFinalizeInitialPayment } from 'redux/finalizePaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledLoaderContent } from 'containers/OfferContainer/StyledOfferContainer';
import Loader from 'components/Loader';
import ThankYouPage from 'components/ThankYouPage';
import FailedPaymentPage from 'components/FailedPaymentPage';

const PaymentResultPage = ({ onSuccess }) => {
  const adyenRedirectResult = new URLSearchParams(window.location.search).get(
    'redirectResult'
  );
  const orderId = new URLSearchParams(window.location.search).get('orderId');
  const dispatch = useDispatch();

  const submitRedirectResult = async () => {
    dispatch(
      fetchFinalizeInitialPayment({
        orderId,
        details: { redirectResult: adyenRedirectResult }
      })
    );
  };
  const { error, payment } = useSelector(state => state.finalizeInitialPayment);

  useEffect(() => {
    submitRedirectResult();
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
    <StyledOfferWrapper data-testid="paymentResultPage-loader">
      <Header />
      <StyledLoaderContent>
        <Loader />
      </StyledLoaderContent>
      <Footer />
    </StyledOfferWrapper>
  );
};

export default PaymentResultPage;

PaymentResultPage.propTypes = {
  onSuccess: PropTypes.func
};

PaymentResultPage.defaultProps = {
  onSuccess: null
};
