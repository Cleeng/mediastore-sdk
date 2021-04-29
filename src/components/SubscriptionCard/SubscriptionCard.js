import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { getData } from 'util/appConfigHelper';
import SkeletonWrapper from 'components/SkeletonWrapper';
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
  isDataLoaded,
  t
}) => {
  const isSubscription =
    getData('CLEENG_OFFER_TYPE') === 'S' || isSubscriptionOffer;
  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper showChildren={isDataLoaded} width={50} height={50}>
          <SubscriptionIcon icon={icon} />
        </SkeletonWrapper>
        <InnerWrapper>
          <SkeletonWrapper
            showChildren={isDataLoaded}
            width={200}
            margin="0 0 10px 10px"
          >
            <TitleStyled>{title}</TitleStyled>
          </SkeletonWrapper>
          <SkeletonWrapper
            showChildren={isDataLoaded}
            width={300}
            margin="0 0 10px 10px"
          >
            <DescriptionStyled
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </SkeletonWrapper>
        </InnerWrapper>
        <PriceWrapperStyled>
          <SkeletonWrapper showChildren={isDataLoaded} width={80} height={30}>
            {isTrialAvailable && (
              <TrialBadgeStyled>{t('trial period')}</TrialBadgeStyled>
            )}
            <Price
              currency={currency}
              price={price}
              period={isSubscription ? period : null}
            />
          </SkeletonWrapper>
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
  isDataLoaded: PropTypes.bool,
  t: PropTypes.func
};

SubscriptionCard.defaultProps = {
  period: '',
  icon: '',
  title: '',
  description: '',
  currency: '',
  price: null,
  isTrialAvailable: false,
  isSubscriptionOffer: false,
  isDataLoaded: true,
  t: k => k
};

export { SubscriptionCard as PureSubscriptionCard };

export default withTranslation()(labeling()(SubscriptionCard));
