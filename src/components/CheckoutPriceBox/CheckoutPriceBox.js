import React from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'util/formatNumber';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import {
  StyledTotalLabel,
  StyledOfferPrice,
  StyledPriceBox,
  StyledPriceBoxWrapper,
  StyledTotalOfferPrice,
  StyledLabel,
  StyledPriceWrapper
} from './CheckoutPriceBoxStyled';

const CheckoutPriceBox = ({
  isCouponApplied,
  finalPrice,
  discountAmount,
  taxValue,
  customerServiceFee,
  paymentMethodFee,
  customerCurrencySymbol,
  offerPrice,
  t
}) => (
  <StyledPriceBox>
    <StyledPriceBoxWrapper>
      {isCouponApplied && (
        <>
          <StyledPriceWrapper>
            <StyledLabel>{t('Price')}:</StyledLabel>
            <StyledOfferPrice>
              {`${customerCurrencySymbol}${formatNumber(offerPrice)} `}
              <span>{t('exVAT')}</span>
            </StyledOfferPrice>
          </StyledPriceWrapper>

          <StyledPriceWrapper>
            <StyledLabel>{t('Coupon Discount')}</StyledLabel>
            <StyledOfferPrice>
              {`${customerCurrencySymbol}${formatNumber(discountAmount)}`}
            </StyledOfferPrice>
          </StyledPriceWrapper>
        </>
      )}
      {taxValue !== 0 && (
        <StyledPriceWrapper>
          <StyledLabel>{t('Applicable Tax')}</StyledLabel>
          <StyledOfferPrice>
            {`${customerCurrencySymbol}${formatNumber(taxValue)}`}
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
        <StyledTotalLabel>{t('Total')}:</StyledTotalLabel>
        <StyledTotalOfferPrice>
          {`${customerCurrencySymbol}${formatNumber(finalPrice)}`}
        </StyledTotalOfferPrice>
      </StyledPriceWrapper>
    </StyledPriceBoxWrapper>
  </StyledPriceBox>
);

CheckoutPriceBox.propTypes = {
  customerCurrencySymbol: PropTypes.string,
  offerPrice: PropTypes.number,
  discountAmount: PropTypes.number,
  taxValue: PropTypes.number,
  customerServiceFee: PropTypes.number,
  paymentMethodFee: PropTypes.number,
  isCouponApplied: PropTypes.bool,
  finalPrice: PropTypes.number,
  t: PropTypes.func
};

CheckoutPriceBox.defaultProps = {
  customerCurrencySymbol: '',
  offerPrice: 0,
  discountAmount: 0,
  taxValue: 0,
  customerServiceFee: 0,
  paymentMethodFee: 0,
  isCouponApplied: false,
  finalPrice: 0,
  t: k => k
};

export { CheckoutPriceBox as PureCheckoutPriceBox };

export default withTranslation()(labeling()(CheckoutPriceBox));
