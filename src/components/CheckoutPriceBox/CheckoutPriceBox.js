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

const CheckoutPriceBox = ({ isCheckout, onRedeemClick }) => {
  const { customerPriceInclTax, period } = useAppSelector(selectOnlyOffer);
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
    const formattedDiscountAmount = formatNumber(discountAmount);

    if (finalPrice === 0) {
      if (discountedPeriods === 1) {
        // non standard period free
        if (period === '3months' || period === '6months') {
          return t(
            `coupon-note-billing-period-free`,
            'First billing period free!'
          );
        }
        return t(`coupon-note-${period}-free`, `First ${period} free!`, {
          period
        });
      }
      // non standard periods free
      if (period === '3months' || period === '6months') {
        return t(
          `coupon-note-billing-periods-free`,
          `First ${discountedPeriods} billing periods free!`,
          { discountedPeriods }
        );
      }
      return t(
        `coupon-note-${period}s-free`,
        `First ${discountedPeriods} ${period}s free!`,
        {
          discountedPeriods,
          period
        }
      );
    }
    if (discountedPeriods === 1) {
      // non standard periods
      if (period === '3months' || period === '6months') {
        const description = `${currencySymbol}${formattedDiscountAmount} off for the first billing period!`;
        return t('coupon-note-billing-period', description, {
          currencySymbol,
          formattedDiscountAmount
        });
      }
      return t(
        `coupon-note-${period}`,
        `${currencySymbol}${formattedDiscountAmount} off for the first ${period}!`,
        {
          currencySymbol,
          formattedDiscountAmount,
          period
        }
      );
    }
    // non standard periods
    if (period === '3months' || period === '6months') {
      const description = `${currencySymbol}${formattedDiscountAmount} off for the first ${discountedPeriods} billing periods!`;
      return t('coupon-note-billing-periods', description, {
        currencySymbol,
        formattedDiscountAmount,
        discountedPeriods
      });
    }
    return t(
      `coupon-note-${period}s`,
      `${currencySymbol}${formattedDiscountAmount} off for the first ${discountedPeriods} ${period}s!`,
      {
        currencySymbol,
        formattedDiscountAmount,
        discountedPeriods,
        period
      }
    );
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
                <CouponNoteStyled>{getCouponNote()}</CouponNoteStyled>
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
              {t('checkout-price-box.total', 'Total')}
            </StyledTotalLabel>
            <StyledTotalOfferPrice>
              {`${currencySymbol}${formatNumber(finalPrice)}`}
            </StyledTotalOfferPrice>
          </StyledTotalWrapper>
        </StyledPriceWrapper>
        {isCheckout && (
          <StyledRedeemButton>
            <span>Have a gift code?</span>
            <LinkStyled as="button" onClick={onRedeemClick}>
              Redeem here
            </LinkStyled>
          </StyledRedeemButton>
        )}
      </StyledPriceBox>
    </StyledPriceBoxWrapper>
  );
};

CheckoutPriceBox.propTypes = {
  isCheckout: PropTypes.bool,
  onRedeemClick: PropTypes.func
};

CheckoutPriceBox.defaultProps = {
  onRedeemClick: () => null,
  isCheckout: false
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default CheckoutPriceBox;
