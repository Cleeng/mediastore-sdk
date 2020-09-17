import React from 'react';
import PropTypes from 'prop-types';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled
} from './SubscriptionCardStyled';

const SubscriptionCard = ({
  period,
  title,
  description,
  currency,
  price,
  isTrialAvailable
}) => (
  <WrapperStyled>
    <SubscriptionIcon period={period} />
    <InnerWrapper>
      <TitleStyled>{title}</TitleStyled>
      <DescriptionStyled>{description}</DescriptionStyled>
    </InnerWrapper>
    <PriceWrapperStyled>
      {isTrialAvailable && <TrialBadgeStyled>trial period</TrialBadgeStyled>}
      <Price currency={currency} price={price} period={period} />
    </PriceWrapperStyled>
  </WrapperStyled>
);

SubscriptionCard.propTypes = {
  period: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  price: PropTypes.number,
  isTrialAvailable: PropTypes.bool
};

SubscriptionCard.defaultProps = {
  period: '',
  title: '',
  description: '',
  currency: '',
  price: null,
  isTrialAvailable: false
};

export default SubscriptionCard;
