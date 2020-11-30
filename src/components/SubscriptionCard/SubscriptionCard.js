import React from 'react';
import PropTypes from 'prop-types';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { getData } from 'util/appConfigHelper';
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
  icon,
  title,
  description,
  currency,
  price,
  isTrialAvailable
}) => {
  const isSubscription = getData('CLEENG_OFFER_TYPE') === 'S';
  return (
    <WrapperStyled>
      <SubscriptionIcon icon={icon} />
      <InnerWrapper>
        <TitleStyled>{title}</TitleStyled>
        <DescriptionStyled dangerouslySetInnerHTML={{ __html: description }} />
      </InnerWrapper>
      <PriceWrapperStyled>
        {isTrialAvailable && <TrialBadgeStyled>trial period</TrialBadgeStyled>}
        <Price
          currency={currency}
          price={price}
          period={isSubscription ? period : null}
        />
      </PriceWrapperStyled>
    </WrapperStyled>
  );
};

SubscriptionCard.propTypes = {
  period: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  price: PropTypes.number,
  isTrialAvailable: PropTypes.bool
};

SubscriptionCard.defaultProps = {
  period: '',
  icon: '',
  title: '',
  description: '',
  currency: '',
  price: '',
  isTrialAvailable: false
};

export default SubscriptionCard;
