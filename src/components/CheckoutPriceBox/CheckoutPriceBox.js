import React from 'react';
import formatNumber from 'util/formatNumber';
import { useTranslation } from 'react-i18next';
import { currencyFormat } from 'util/planHelper';
import calculateTaxValueForFreeOffer from 'util/calculateTaxValueForFreeOffer';
import { useAppSelector } from 'redux/store';
import { selectOnlyOffer } from 'redux/offerSlice';
import { selectOnlyOrder } from 'redux/orderSlice';
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
  CouponNoteInnerWrapper
} from './CheckoutPriceBoxStyled';

const CheckoutPriceBox = () => {
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

  const currencySymbol = currencyFormat[currency];

  const { t } = useTranslation();

  const getCouponNote = () => {
    // unlimited
    if (discountedPeriods === 999) {
      return false;
    }

    return t(`coupon-note-applied`, 'Promotional Pricing applied!');
  };

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
                  {t('checkout-price-box.coupon-discount', 'Coupon Discount')}
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
          <strong>
            <StyledTotalLabel>
              {t('checkout-price-box.total', 'Total')}
            </StyledTotalLabel>
            <StyledTotalOfferPrice>
              {`${currencySymbol}${formatNumber(finalPrice)}`}
            </StyledTotalOfferPrice>
          </strong>
        </StyledPriceWrapper>
      </StyledPriceBox>
    </StyledPriceBoxWrapper>
  );
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default CheckoutPriceBox;
