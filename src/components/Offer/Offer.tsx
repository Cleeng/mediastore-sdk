import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/store';
import CouponInput from 'components/CouponInput';
import Payment from 'components/Payment';
import Header from 'components/Header';
import SectionHeader from 'components/SectionHeader';
import Footer from 'components/Footer';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import FreeOffer from 'components/FreeOffer';
import { selectOnlyOffer } from 'redux/offerSlice';
import { selectOrder, selectOnlyOrder } from 'redux/orderSlice';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledOfferDetailsAndCoupon,
  StyledOfferCouponWrapper,
  OfferCardWrapperStyled
} from './OfferStyled';
import OfferCheckoutCard from '../OfferCheckoutCard';
import { OfferProps } from './Offer.types';

const Offer = ({ onCouponSubmit, onPaymentComplete }: OfferProps) => {
  const { t } = useTranslation();
  const [coupon, setCoupon] = useState('');
  const { trialAvailable } = useAppSelector(selectOnlyOffer);
  const { isCouponLoading, couponDetails } = useAppSelector(selectOrder);
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
          <SectionHeader center>
            {t('offer.complete-purchase', 'Complete your purchase')}
          </SectionHeader>
          <StyledOfferDetailsAndCoupon>
            <OfferCardWrapperStyled>
              <OfferCheckoutCard />
            </OfferCardWrapperStyled>
            <StyledOfferCouponWrapper>
              <CouponInput
                onSubmit={onCouponSubmit}
                value={coupon}
                onChange={(e: string) => setCoupon(e)}
                source="checkout"
                couponLoading={isCouponLoading}
                couponDetails={couponDetails}
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

export default Offer;
