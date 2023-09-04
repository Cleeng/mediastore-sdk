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
import DeliveryDetails from 'components/DeliveryDetails';
import Button from 'components/Button';
import { selectOrder, selectOnlyOrder } from 'redux/orderSlice';
import { selectOffer } from 'redux/offerSlice';
import {
  StyledOfferBody,
  StyledOfferWrapper,
  StyledOfferDetailsAndCoupon,
  StyledOfferCouponWrapper,
  OfferCardWrapperStyled
} from './OfferStyled';
import OfferCheckoutCard from '../OfferCheckoutCard';
import { OfferProps } from './Offer.types';

const Offer = ({
  onCouponSubmit,
  onPaymentComplete,
  onRedeemClick
}: OfferProps) => {
  const { t } = useTranslation();
  const [coupon, setCoupon] = useState('');
  const { isCouponLoading, couponDetails } = useAppSelector(selectOrder);
  const {
    offerV2: { giftable }
  } = useAppSelector(selectOffer);

  const {
    totalPrice,
    discount: { applied: discountApplied }
  } = useAppSelector(selectOnlyOrder);

  const isFree = totalPrice === 0 && !discountApplied;

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
      {/* TODO: consider the context and conditionally render <main> element */}
      <main>
        <StyledOfferBody>
          <SectionHeader center>
            {t('offer.complete-purchase', 'Complete your purchase')}
          </SectionHeader>
          <StyledOfferDetailsAndCoupon>
            <OfferCardWrapperStyled>
              <OfferCheckoutCard isRedeemGift={false} />
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
              <Button onClickFn={onRedeemClick} type="submit" width="auto">
                Redeem gift
              </Button>
            </StyledOfferCouponWrapper>
          </StyledOfferDetailsAndCoupon>
          <CheckoutPriceBox />
        </StyledOfferBody>
        {giftable && <DeliveryDetails giftable={giftable} />}
        <Payment onPaymentComplete={onPaymentComplete} />
      </main>
      <Footer />
    </StyledOfferWrapper>
  );
};

export default Offer;
