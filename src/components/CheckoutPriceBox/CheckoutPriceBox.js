import React from 'react';
import formatNumber from 'util/formatNumber';
import { useTranslation } from 'react-i18next';
import { currencyFormat } from 'util/planHelper';
import calculateTaxValueForFreeOffer from 'util/calculateTaxValueForFreeOffer';
import { useSelector } from 'react-redux';
import {
  StyledTotalLabel,
  StyledOfferPrice,
  StyledPriceBox,
  StyledPriceBoxWrapper,
  StyledTotalOfferPrice,
  StyledLabel,
  StyledPriceWrapper,
  CouponNoteStyled
} from './CheckoutPriceBoxStyled';

const CheckoutPriceBox = () => {
  const { customerPriceInclTax, period } = useSelector(
    state => state.offer.offer
  );
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
  } = useSelector(state => state.order.order);

  const currencySymbol = currencyFormat[currency];

  const { t } = useTranslation();

  const renderCouponNote = () => {
    let description;

    if (finalPrice === 0) {
      if (discountedPeriods === 1) {
        description = t(`coupon-note-${period}-free`, `First ${period} free!`, {
          period
        });
      } else {
        description = t(
          `coupon-note-${period}s-free`,
          `First ${discountedPeriods} ${period}s free!`,
          {
            discountedPeriods,
            period
          }
        );
      }
      return description;
    }
    if (discountedPeriods === 1) {
      description = t(
        `coupon-note-${period}`,
        `${currencySymbol}${discountAmount} off for the first ${period}!`,
        {
          currencySymbol,
          discountAmount,
          period
        }
      );
    } else {
      description = t(
        `coupon-note-${period}s`,
        `${currencySymbol}${discountAmount} off for the first ${discountedPeriods} ${
          period === 'week' ? 'weeks' : 'months'
        }!`,
        {
          currencySymbol,
          discountAmount,
          discountedPeriods,
          period
        }
      );
    }
    return description;
  };

  return (
    <StyledPriceBox>
      <StyledPriceBoxWrapper>
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <StyledLabel>
                {t('checkout-price-box.coupon-discount', 'Coupon Discount')}
              </StyledLabel>
              {discountType === 'coupon' && (
                <CouponNoteStyled>{renderCouponNote()}</CouponNoteStyled>
              )}
            </div>
            <StyledOfferPrice>
              - {currencySymbol}
              {formatNumber(discountAmount)}
            </StyledOfferPrice>
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
      </StyledPriceBoxWrapper>
    </StyledPriceBox>
  );
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default CheckoutPriceBox;
