import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import formatNumber from 'util/formatNumber';
import { currencyFormat } from 'util/planHelper';
import calculateTaxValueForFreeOffer from 'util/calculateTaxValueForFreeOffer';
import { useAppSelector } from 'redux/store';
import { selectOnlyOffer } from 'redux/offerSlice';
import { selectOnlyOrder } from 'redux/orderSlice';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
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
  StyledRedeemButton
} from './CheckoutPriceBoxStyled';

const CheckoutPriceBox = ({ hideRedeemButton, isCheckout, onRedeemClick }) => {
  const { customerPriceInclTax } = useAppSelector(selectOnlyOffer);
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
    currency
  } = useAppSelector(selectOnlyOrder);

  const { trialAvailable } = useAppSelector(selectOnlyOffer);

  const currencySymbol = currencyFormat[currency];

  const { t } = useTranslation();

  const isTrial = trialAvailable && discountType === 'trial';

  const getCouponNote = () => {
    // unlimited
    if (discountedPeriods === 999) {
      return false;
    }

    return t(`coupon-note-applied`, 'Promotional Pricing applied!');
  };

  const shouldShowRedeemButton = !hideRedeemButton && isCheckout;

  return (
    <StyledPriceBoxWrapper>
      <StyledPriceBox>
        <StyledPriceWrapper>
          <StyledLabel>{t('checkout-price-box.price', 'Price')}</StyledLabel>
          <StyledOfferPrice>
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
                <StyledLabel>
                  {isTrial
                    ? t('checkout-price-box.trial-discount', 'Trial Discount')
                    : t(
                        'checkout-price-box.coupon-discount',
                        'Coupon Discount'
                      )}
                </StyledLabel>
                <StyledOfferPrice>
                  - {currencySymbol}
                  {formatNumber(discountAmount)}
                </StyledOfferPrice>
              </CouponNoteInnerWrapper>
              {discountType === 'coupon' && (
                <CouponNoteStyled data-testid="coupon-notes">
                  {getCouponNote()}
                </CouponNoteStyled>
              )}
            </CouponNoteOuterWrapper>
          </StyledPriceWrapper>
        )}
        <StyledPriceWrapper>
          <StyledLabel>
            {country === 'US'
              ? t('checkout-price-box.applicable-tax', 'Applicable Tax')
              : t('checkout-price-box.applicable-vat', 'Applicable VAT')}
          </StyledLabel>
          <StyledOfferPrice>
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
            <StyledLabel>
              {t('checkout-price-box.service-fee', 'Service Fee')}
            </StyledLabel>
            <StyledOfferPrice>
              {`${currencySymbol}${formatNumber(customerServiceFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}
        {paymentMethodFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>
              {t('checkout-price-box.payment-method-fee', 'Payment Method Fee')}
            </StyledLabel>
            <StyledOfferPrice>
              {`${currencySymbol}${formatNumber(paymentMethodFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}
        <StyledPriceWrapper>
          <StyledTotalWrapper>
            <StyledTotalLabel>
              {t('checkout-price-box.total', 'Today`s total')}
            </StyledTotalLabel>
            <StyledTotalOfferPrice>
              {`${currencySymbol}${formatNumber(finalPrice)}`}
            </StyledTotalOfferPrice>
          </StyledTotalWrapper>
        </StyledPriceWrapper>
        {shouldShowRedeemButton && (
          <StyledRedeemButton>
            <span>
              {t('checkout-price-box.gift-code-label', 'Have a gift code?')}
            </span>
            <LinkStyled as="button" onClick={onRedeemClick}>
              {t('checkout-price-box.button.redeem', 'Redeem here')}
            </LinkStyled>
          </StyledRedeemButton>
        )}
      </StyledPriceBox>
    </StyledPriceBoxWrapper>
  );
};

CheckoutPriceBox.propTypes = {
  hideRedeemButton: PropTypes.bool,
  isCheckout: PropTypes.bool,
  onRedeemClick: PropTypes.func
};

CheckoutPriceBox.defaultProps = {
  hideRedeemButton: false,
  isCheckout: false,
  onRedeemClick: () => null
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default CheckoutPriceBox;
