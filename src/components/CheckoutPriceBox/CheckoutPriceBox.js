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
  StyledPriceWrapper
} from './CheckoutPriceBoxStyled';

const CheckoutPriceBox = () => {
  const { customerPriceInclTax } = useSelector(state => state.offer.offer);
  const {
    priceBreakdown: {
      offerPrice,
      discountAmount,
      taxValue,
      customerServiceFee,
      paymentMethodFee
    },
    discount: { applied: isCouponApplied },
    taxRate,
    country,
    totalPrice: finalPrice,
    currency
  } = useSelector(state => state.order.order);

  const { t } = useTranslation();

  return (
    <StyledPriceBox>
      <StyledPriceBoxWrapper>
        <StyledPriceWrapper>
          <StyledLabel>{t('checkout-price-box.price', 'Price')}</StyledLabel>
          <StyledOfferPrice>
            {`${currencyFormat[currency]}${formatNumber(offerPrice)} `}
            <span>
              {country === 'US'
                ? t('checkout-price-box.excl-tax', 'excl. Tax')
                : t('checkout-price-box.excl-vat', 'excl. VAT')}
            </span>
          </StyledOfferPrice>
        </StyledPriceWrapper>

        {isCouponApplied && (
          <StyledPriceWrapper>
            <StyledLabel>
              {t('checkout-price-box.coupon-discount', 'Coupon Discount')}
            </StyledLabel>
            <StyledOfferPrice>
              - {currencyFormat[currency]}
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
                {currencyFormat[currency]}{' '}
                {calculateTaxValueForFreeOffer(
                  offerPrice,
                  taxRate,
                  customerPriceInclTax
                )}
              </p>
            ) : (
              `${currencyFormat[currency]}${formatNumber(taxValue)}`
            )}
          </StyledOfferPrice>
        </StyledPriceWrapper>

        {customerServiceFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>
              {t('checkout-price-box.service-fee', 'Service Fee')}
            </StyledLabel>
            <StyledOfferPrice>
              {`${currencyFormat[currency]}${formatNumber(customerServiceFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        {paymentMethodFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>
              {t('checkout-price-box.payment-method-fee', 'Payment Method Fee')}
            </StyledLabel>
            <StyledOfferPrice>
              {`${currencyFormat[currency]}${formatNumber(paymentMethodFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        <StyledPriceWrapper>
          <strong>
            <StyledTotalLabel>
              {t('checkout-price-box.total', 'Total')}
            </StyledTotalLabel>
            <StyledTotalOfferPrice>
              {`${currencyFormat[currency]}${formatNumber(finalPrice)}`}
            </StyledTotalOfferPrice>
          </strong>
        </StyledPriceWrapper>
      </StyledPriceBoxWrapper>
    </StyledPriceBox>
  );
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default CheckoutPriceBox;
