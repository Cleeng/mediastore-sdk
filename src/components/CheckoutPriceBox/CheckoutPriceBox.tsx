import { useTranslation } from 'react-i18next';
import formatNumber from 'util/formatNumber';
import { currencyFormat } from 'util/planHelper';
import calculateTaxValueForFreeOffer from 'util/calculateTaxValueForFreeOffer';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { selectOnlyOffer } from 'appRedux/offerSlice';
import { fetchUpdateCoupon, selectOnlyOrder } from 'appRedux/orderSlice';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import { useCallback } from 'react';
import {
  StyledTotalLabel,
  StyledOfferPrice,
  StyledPriceBox,
  StyledPriceBoxWrapper,
  StyledTotalOfferPrice,
  StyledLabel,
  StyledPriceWrapper,
  CouponNoteStyled,
  CouponNoteOuterWrapper,
  CouponNoteInnerWrapper,
  StyledTotalWrapper,
  StyledRedeemButton,
  RemoveCouponButton
} from './CheckoutPriceBoxStyled';

type CheckoutPriceBoxProps = {
  hideRedeemButton: boolean;
  isCheckout: boolean;
  onRedeemClick: () => void;
};

const CheckoutPriceBox = ({
  hideRedeemButton,
  isCheckout,
  onRedeemClick
}: CheckoutPriceBoxProps) => {
  const dispatch = useAppDispatch();
  const { customerPriceInclTax, trialAvailable } =
    useAppSelector(selectOnlyOffer);
  const {
    priceBreakdown: {
      offerPrice,
      discountAmount,
      taxValue,
      customerServiceFee,
      paymentMethodFee
    },
    discount: {
      applied: isCouponApplied,
      type: discountType,
      periods: discountedPeriods
    },
    taxRate,
    country,
    totalPrice: finalPrice,
    currency,
    id: orderId
  } = useAppSelector(selectOnlyOrder);

  const currencySymbol = currencyFormat[currency];

  const { t } = useTranslation();

  const isTrial = trialAvailable && discountType === 'trial';

  const getCouponNote = () => {
    // unlimited
    if (discountedPeriods === 999) {
      return false;
    }

    return t(
      'checkout-price-box.coupon-note-applied',
      'Promotional Pricing applied!'
    );
  };

  const removeCoupon = useCallback(async () => {
    await dispatch(fetchUpdateCoupon({ id: orderId, couponCode: null }));
  }, [dispatch, fetchUpdateCoupon, orderId]);

  const shouldShowRedeemButton = !hideRedeemButton && isCheckout;

  return (
    <StyledPriceBoxWrapper>
      <StyledPriceBox>
        <StyledPriceWrapper>
          <StyledLabel id='offerPriceLabel'>
            {t('checkout-price-box.price', 'Price')}
          </StyledLabel>
          <StyledOfferPrice id='offerPriceValue'>
            {`${currencySymbol}${formatNumber(offerPrice)} `}
            <span>
              {country === 'US'
                ? t('checkout-price-box.excl-tax', 'excl. Tax')
                : t('checkout-price-box.excl-vat', 'excl. VAT')}
            </span>
          </StyledOfferPrice>
        </StyledPriceWrapper>
        {isCouponApplied && (
          <StyledPriceWrapper>
            <CouponNoteOuterWrapper>
              <CouponNoteInnerWrapper>
                <StyledLabel id='discountAmountLabel'>
                  {isTrial ? (
                    t('checkout-price-box.trial-discount', 'Trial Discount')
                  ) : (
                    <>
                      {t(
                        'checkout-price-box.coupon-discount',
                        'Coupon Discount'
                      )}
                      &nbsp;
                      <RemoveCouponButton onClick={removeCoupon}>
                        {t(
                          'checkout-price-box.remove-coupon-discount',
                          '[Remove]'
                        )}
                      </RemoveCouponButton>
                    </>
                  )}
                </StyledLabel>
                <StyledOfferPrice id='discountAmount'>
                  - {currencySymbol}
                  {formatNumber(discountAmount)}
                </StyledOfferPrice>
              </CouponNoteInnerWrapper>
              {discountType === 'coupon' && (
                <CouponNoteStyled data-testid='coupon-notes'>
                  {getCouponNote()}
                </CouponNoteStyled>
              )}
            </CouponNoteOuterWrapper>
          </StyledPriceWrapper>
        )}
        <StyledPriceWrapper>
          <StyledLabel id='taxValueLabel'>
            {country === 'US'
              ? t('checkout-price-box.applicable-tax', 'Applicable Tax')
              : t('checkout-price-box.applicable-vat', 'Applicable VAT')}
          </StyledLabel>
          <StyledOfferPrice id='taxValue'>
            {!taxValue && isCouponApplied ? (
              <p style={{ textDecoration: 'line-through' }}>
                {currencySymbol}{' '}
                {calculateTaxValueForFreeOffer(
                  offerPrice,
                  taxRate,
                  customerPriceInclTax
                )}
              </p>
            ) : (
              `${currencySymbol}${formatNumber(taxValue)}`
            )}
          </StyledOfferPrice>
        </StyledPriceWrapper>
        {customerServiceFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel id='customerServiceFeeLabel'>
              {t('checkout-price-box.service-fee', 'Service Fee')}
            </StyledLabel>
            <StyledOfferPrice id='customerServiceFee'>
              {`${currencySymbol}${formatNumber(customerServiceFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}
        {paymentMethodFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel id='paymentMethodFeeLabel'>
              {t('checkout-price-box.payment-method-fee', 'Payment Method Fee')}
            </StyledLabel>
            <StyledOfferPrice id='paymentMethodFee'>
              {`${currencySymbol}${formatNumber(paymentMethodFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}
        <StyledPriceWrapper>
          <StyledTotalWrapper>
            <StyledTotalLabel id='finalPriceLabel'>
              {t('checkout-price-box.total', 'Today`s total')}
            </StyledTotalLabel>
            <StyledTotalOfferPrice id='finalPrice'>
              {`${currencySymbol}${formatNumber(finalPrice)}`}
            </StyledTotalOfferPrice>
          </StyledTotalWrapper>
        </StyledPriceWrapper>
        {shouldShowRedeemButton && (
          <StyledRedeemButton>
            <span>
              {t('checkout-price-box.gift-code-label', 'Have a gift code?')}
            </span>
            <LinkStyled as='button' onClick={onRedeemClick}>
              {t('checkout-price-box.button.redeem', 'Redeem here')}
            </LinkStyled>
          </StyledRedeemButton>
        )}
      </StyledPriceBox>
    </StyledPriceBoxWrapper>
  );
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default CheckoutPriceBox;
