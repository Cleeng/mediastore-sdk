import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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
  isTrialAvailable,
  isSubscriptionOffer,
  t
}) => {
  const isSubscription =
    getData('CLEENG_OFFER_TYPE') === 'S' || isSubscriptionOffer;
  return (
    <>
      <WrapperStyled>
        <SubscriptionIcon icon={icon} />
        <InnerWrapper>
          <TitleStyled>{title}</TitleStyled>
          <DescriptionStyled
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </InnerWrapper>
        <PriceWrapperStyled>
          {isTrialAvailable && (
            <TrialBadgeStyled>{t('trial period')}</TrialBadgeStyled>
          )}
          <Price
            currency={currency}
            price={price}
            period={isSubscription ? period : null}
          />
        </PriceWrapperStyled>
      </WrapperStyled>
    </>
  );
};

SubscriptionCard.propTypes = {
  period: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  price: PropTypes.number,
  isTrialAvailable: PropTypes.bool,
  isSubscriptionOffer: PropTypes.bool,
  t: PropTypes.func
};

SubscriptionCard.defaultProps = {
  period: '',
  icon: '',
  title: '',
  description: '',
  currency: '',
  price: '',
  isTrialAvailable: false,
  isSubscriptionOffer: false,
  t: k => k
};

export { SubscriptionCard as PureSubscriptionCard };

export default withTranslation()(labeling()(SubscriptionCard));
