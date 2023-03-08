import { useState } from 'react';
import { useAppSelector } from 'redux/store';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import CouponInput from 'containers/CouponInput/CouponInput.container';
import Payment from 'components/Payment';
import Header from 'components/Header';
import SectionHeader from 'components/SectionHeader';
import Footer from 'components/Footer';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import FreeOffer from 'components/FreeOffer';
import { selectOffer } from 'redux/offerSlice';
import { selectOnlyOrder } from 'redux/orderSlice';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledOfferDetailsAndCoupon,
  StyledOfferCouponWrapper,
  OfferCardWrapperStyled
} from './OfferStyled';
import OfferCheckoutCard from '../OfferCheckoutCard';
import { OfferProps } from './Offer.types';

const Offer = ({ onSubmit, onPaymentComplete, t }: OfferProps) => {
  const [coupon, setCoupon] = useState('');
  const { trialAvailable } = useAppSelector(selectOffer).offer;
  const {
    totalPrice,
    discount: { applied: discountApplied }
  } = useAppSelector(selectOnlyOrder);

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
        <StyledOfferBody>
          <SectionHeader center>{t('Complete your purchase')}</SectionHeader>
          <StyledOfferDetailsAndCoupon>
            <OfferCardWrapperStyled>
              <OfferCheckoutCard />
            </OfferCardWrapperStyled>
            <StyledOfferCouponWrapper>
              <CouponInput
                onSubmit={onSubmit}
                value={coupon}
                onChange={(e: string) => setCoupon(e)}
                source="checkout"
              />
            </StyledOfferCouponWrapper>
          </StyledOfferDetailsAndCoupon>
          <CheckoutPriceBox />
        </StyledOfferBody>
        <Payment onPaymentComplete={onPaymentComplete} />
      </main>
      <Footer />
    </StyledOfferWrapper>
  );
};

export { Offer as PureOffer };

export default withTranslation()(labeling()(Offer));
