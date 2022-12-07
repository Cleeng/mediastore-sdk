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
    totalPrice: finalPrice,
    currency
  } = useSelector(state => state.order.order);

  return (
    <StyledPriceBox>
      <StyledPriceBoxWrapper>
        <StyledPriceWrapper>
          <StyledLabel>{t('Price')}</StyledLabel>
          <StyledOfferPrice>
            {`${currency}${formatNumber(offerPrice)} `}
            <span>{country === 'US' ? t('excl. Tax') : t('excl. VAT')}</span>
          </StyledOfferPrice>
        </StyledPriceWrapper>

        {isCouponApplied && (
          <StyledPriceWrapper>
            <StyledLabel>{t('Coupon Discount')}</StyledLabel>
            <StyledOfferPrice>
              - {currency}
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
              {taxValue ? `${currency}${formatNumber(taxValue)}` : <></>}
              {!taxValue && taxRate && isCouponApplied && (
                <p style={{ textDecoration: 'line-through' }}>
                  {currency} {formatNumber(taxRate * offerPrice)}
                </p>
              )}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        {customerServiceFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>{t('Service Fee')}</StyledLabel>
            <StyledOfferPrice>
              {`${currency}${formatNumber(customerServiceFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        {paymentMethodFee !== 0 && (
          <StyledPriceWrapper>
            <StyledLabel>{t('Payment Method Fee')}</StyledLabel>
            <StyledOfferPrice>
              {`${currency}${formatNumber(paymentMethodFee)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        )}

        <StyledPriceWrapper>
          <StyledTotalLabel>{t('Total')}</StyledTotalLabel>
          <StyledTotalOfferPrice>
            {`${currency}${formatNumber(finalPrice)}`}
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
