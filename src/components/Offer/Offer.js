import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import CouponInput from 'containers/CouponInput/CouponInput.container';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Payment from 'components/Payment';
import Header from 'components/Header';
import SectionHeader from 'components/SectionHeader';
import Footer from 'components/Footer';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import FreeOffer from 'components/FreeOffer';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledOfferDetailsAndCoupon,
  StyledOfferCouponWrapper,
  OfferCardWrapperStyled
} from './OfferStyled';
import OfferCheckoutCard from '../OfferCheckoutCard';

const Offer = ({ couponProps: { onSubmit }, onPaymentComplete, t }) => {
  const [coupon, setCoupon] = useState('');
  const { trialAvailable } = useSelector(state => state.offer.offer);
  const {
    totalPrice,
    discount: { applied: discountApplied }
  } = useSelector(state => state.order.order);

  const isFree = totalPrice === 0 && !trialAvailable && !discountApplied;

  if (isFree) {
    return (
      <StyledOfferWrapper>
        <Header />
        <main>
          <FreeOffer onPaymentComplete={onPaymentComplete} />
        </main>
      </StyledOfferWrapper>
    );
  }

  return (
    <StyledOfferWrapper>
      <Header />
      <main>
        <>
          <StyledOfferBody>
            <SectionHeader center>{t('Complete your purchase')}</SectionHeader>
            <>
              <StyledOfferDetailsAndCoupon>
                <OfferCardWrapperStyled>
                  <OfferCheckoutCard />
                </OfferCardWrapperStyled>
                <StyledOfferCouponWrapper>
                  <CouponInput
                    onSubmit={onSubmit}
                    value={coupon}
                    onChange={e => setCoupon(e)}
                    source="checkout"
                  />
                </StyledOfferCouponWrapper>
              </StyledOfferDetailsAndCoupon>
            </>
            <CheckoutPriceBox />
          </StyledOfferBody>
          <Payment onPaymentComplete={onPaymentComplete} />
        </>
      </main>
      <Footer />
    </StyledOfferWrapper>
  );
};

Offer.propTypes = {
  couponProps: PropTypes.shape({
    showMessage: PropTypes.bool,
    message: PropTypes.node,
    messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
    onSubmit: PropTypes.func.isRequired,
    couponLoading: PropTypes.bool
  }),
  onPaymentComplete: PropTypes.func.isRequired,
  t: PropTypes.func
};

Offer.defaultProps = {
  couponProps: null,
  t: k => k
};

export { Offer as PureOffer };

export default withTranslation()(labeling()(Offer));
