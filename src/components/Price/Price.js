import React from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'util/formatNumber';
import { Trans } from 'react-i18next';
import {
  WrapperStyled,
  CurrencyStyled,
  PriceStyled,
  PeriodStyled,
  InnerWrapper,
  AdditionalLabelStyled
} from './PriceStyled';

const addSpaceAfterNumber = str => {
  if (!/\d/.test(str.charAt(0))) {
    return str;
  }
  return `${str.charAt(0)} ${str.substring(1)}`;
};

const Price = ({ currency, price, period }) => (
  <WrapperStyled>
    <InnerWrapper>
      <CurrencyStyled>{currency}</CurrencyStyled>
      <PriceStyled>{formatNumber(price)}</PriceStyled>
      <AdditionalLabelStyled>
        <Trans i18nKey="price-additional-label"> </Trans>
      </AdditionalLabelStyled>
    </InnerWrapper>
    {period && (
      <PeriodStyled>/&nbsp;{addSpaceAfterNumber(period)}</PeriodStyled>
    )}
  </WrapperStyled>
);

Price.propTypes = {
  currency: PropTypes.string,
  price: PropTypes.number,
  period: PropTypes.string
};

Price.defaultProps = {
  currency: '',
  price: '',
  period: ''
};

export default Price;
