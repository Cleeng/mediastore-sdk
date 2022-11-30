import React from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'util/formatNumber';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

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

const CheckoutPriceBox = ({ t }) => {
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
    totalPrice: finalPrice
  } = useSelector(state => state.order.order);
  const { customerCurrencySymbol } = useSelector(state => state.offer.offer);

  return (
    <StyledPriceBox>
      <StyledPriceBoxWrapper>
        <StyledPriceWrapper>
          <StyledLabel>{t('Price')}</StyledLabel>
          <StyledOfferPrice>
            {`${customerCurrencySymbol}${formatNumber(offerPrice)} `}
            <span>{country === 'US' ? t('excl. Tax') : t('excl. VAT')}</span>
          </StyledOfferPrice>
        </StyledPriceWrapper>

        {isCouponApplied && (
          <StyledPriceWrapper>
            <StyledLabel>{t('Coupon Discount')}</StyledLabel>
            <StyledOfferPrice>
              - {customerCurrencySymbol}
              {formatNumber(discountAmount)}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}
        {(taxValue !== 0 || taxRate !== 0) && (
          <StyledPriceWrapper>
            <StyledLabel>
              {country === 'US' ? t('Applicable Tax') : t('Applicable VAT')}
            </StyledLabel>
            <StyledOfferPrice>
              {taxValue ? (
                `${customerCurrencySymbol}${formatNumber(taxValue)}`
              ) : (
                <></>
              )}
              {!taxValue && taxRate && isCouponApplied && (
                <p style={{ textDecoration: 'line-through' }}>
                  {customerCurrencySymbol} {formatNumber(taxRate * offerPrice)}
                </p>
              )}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        {customerServiceFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>{t('Service Fee')}</StyledLabel>
            <StyledOfferPrice>
              {`${customerCurrencySymbol}${formatNumber(customerServiceFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        {paymentMethodFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>{t('Payment Method Fee')}</StyledLabel>
            <StyledOfferPrice>
              {`${customerCurrencySymbol}${formatNumber(paymentMethodFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        <StyledPriceWrapper>
          <StyledTotalLabel>{t('Total')}</StyledTotalLabel>
          <StyledTotalOfferPrice>
            {`${customerCurrencySymbol}${formatNumber(finalPrice)}`}
          </StyledTotalOfferPrice>
        </StyledPriceWrapper>
      </StyledPriceBoxWrapper>
    </StyledPriceBox>
  );
};

CheckoutPriceBox.propTypes = {
  t: PropTypes.func
};

CheckoutPriceBox.defaultProps = {
  t: k => k
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default withTranslation()(labeling()(CheckoutPriceBox));
