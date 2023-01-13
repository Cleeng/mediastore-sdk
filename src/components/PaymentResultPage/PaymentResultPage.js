import React, { useEffect } from 'react';
import { StyledOfferWrapper } from 'components/Offer/OfferStyled';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { fetchFinalizeInitialPayment } from 'redux/finalizePaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledLoaderContent } from 'containers/OfferContainer/StyledOfferContainer';
import Loader from 'components/Loader';
import { ThankYouPage } from 'package';
import FailedPaymentPage from 'components/FailedPaymentPage';

const PaymentResultPage = () => {
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
    ).unwrap();
  };
  const { error, payment } = useSelector(state => state.finalizeInitialPayment);

  useEffect(() => {
    submitRedirectResult();
  }, []);

  if (error && error !== 'Cancelled') {
    return <FailedPaymentPage />;
  }

  if (payment.id) {
    return <ThankYouPage />;
  }

  return (
    <StyledOfferWrapper>
      <Header />
      <StyledLoaderContent>
        <Loader />
      </StyledLoaderContent>
      <Footer />
    </StyledOfferWrapper>
  );
};

export default PaymentResultPage;
