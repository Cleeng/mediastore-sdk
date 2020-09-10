import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapperStyled,
  CurrencyStyled,
  PriceStyled,
  PeriodStyled,
  InnerWrapper
} from './PriceStyled';

const Price = ({ currency, price, period }) => (
  <WrapperStyled>
    <InnerWrapper>
      <CurrencyStyled>{currency}</CurrencyStyled>
      <PriceStyled>{price}</PriceStyled>
    </InnerWrapper>

    <PeriodStyled>/&nbsp;{period}</PeriodStyled>
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
