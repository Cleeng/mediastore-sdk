import React, { useEffect } from 'react';
import { StyledOfferWrapper } from 'components/Offer/OfferStyled';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { fetchFinalizeInitialPayment } from 'redux/finalizePaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledLoaderContent } from 'containers/OfferContainer/StyledOfferContainer';
import Loader from 'components/Loader';
import { ThankYouPage } from 'package';
import { BodyStyled } from './PaymentResultPageStyled';

const PaymentResultPage = () => {
  const adyenRedirectResult = new URLSearchParams(window.location.search).get(
    'redirectResult'
  );
  const orderId = new URLSearchParams(window.location.search).get('orderId');
  const dispatch = useDispatch();

  const submitRedirectResult = async () => {
    dispatch(
      fetchFinalizeInitialPayment({ orderId, details: adyenRedirectResult })
    ).unwrap();
    // TODO:: redirect back to checkout when the transaction was cancelled, resultCode = 'Cancelled'
  };
  const { error, payment } = useSelector(state => state.finalizeInitialPayment);

  useEffect(() => {
    submitRedirectResult();
  }, []);

  if (payment) {
    // TODO:: adjust copy on thank you page
    return <ThankYouPage />;
  }

  if (error) {
    // TODO:: adjust copy on error page
    return (
      <StyledOfferWrapper>
        <Header />
        <BodyStyled>
          <>error occured {error}</>
        </BodyStyled>
        <Footer />
      </StyledOfferWrapper>
    );
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
