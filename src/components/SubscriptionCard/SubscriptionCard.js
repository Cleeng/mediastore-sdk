import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { getData } from 'util/appConfigHelper';
import { ReactComponent as BlockedIcon } from 'assets/images/blocked.svg';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled,
  SubBoxStyled,
  BoxTextStyled
} from './SubscriptionCardStyled';

const SubscriptionCard = ({
  period,
  icon,
  title,
  description,
  currency,
  price,
  isTrialAvailable,
  showInfoBox,
  isSubscriptionOffer,
  t
}) => {
  const isSubscription =
    getData('CLEENG_OFFER_TYPE') === 'S' || isSubscriptionOffer;
  const mapCode = {
    TO_OFFER_COUNTRY_NOT_ALLOWED: {
      text: t(
        `This plan is <strong>not currently available</strong> in your country or region`
      ),
      icon: BlockedIcon
    },
    ALREADY_HAS_ACCESS: {
      text: t('It looks like you already have access to this offer'),
      icon: BlockedIcon
    },
    TO_FREE_OFFER_NOT_ALLOWED: {
      text: t('Switching from a paid to a free offer is not possible'),
      icon: BlockedIcon
    }
  };

  const IconComponent =
    showInfoBox && mapCode[showInfoBox].icon
      ? mapCode[showInfoBox].icon
      : React.Fragment;
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
      {showInfoBox ? (
        <SubBoxStyled>
          <IconComponent />
          <BoxTextStyled
            dangerouslySetInnerHTML={{ __html: mapCode[showInfoBox].text }}
          />
        </SubBoxStyled>
      ) : (
        ''
      )}
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
  showInfoBox: PropTypes.string,
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
  showInfoBox: null,
  isSubscriptionOffer: false,
  t: k => k
};

export { SubscriptionCard as PureSubscriptionCard };

export default withTranslation()(labeling()(SubscriptionCard));
