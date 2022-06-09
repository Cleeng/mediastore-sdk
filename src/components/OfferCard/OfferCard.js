import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { ReactComponent as BlockedIcon } from 'assets/images/blocked.svg';
import { ReactComponent as EditBlockedIcon } from 'assets/images/noEdit.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled,
  SubBoxStyled,
  BoxTextStyled
} from './OfferCardStyled';

const OfferCard = ({
  period,
  offerType,
  title,
  description,
  currency,
  price,
  isTrialAvailable,
  showInfoBox,
  isDataLoaded,
  paymentMethod,
  isMyAccount,
  t
}) => {
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
    },
    SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
      text: t("You can't upgrade your subscription if coupon was applied."),
      icon: BlockedIcon
    },
    INAPP_SUBSCRIPTION: {
      text: t(
        `${
          paymentMethod ? `Subscription purchased via ${paymentMethod}. ` : ``
        }Use an external service to edit the plan.`
      ),
      icon: EditBlockedIcon
    }
  };

  const IconComponent =
    showInfoBox && mapCode[showInfoBox].icon
      ? mapCode[showInfoBox].icon
      : React.Fragment;
  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper showChildren={isDataLoaded} width={50} height={50}>
          <SubscriptionIcon period={period || offerType} />
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
            {((isMyAccount && offerType === 'S') || !isMyAccount) && (
              <Price
                currency={currency}
                price={price}
                period={offerType === 'S' ? period : null}
              />
            )}
          </SkeletonWrapper>
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

OfferCard.propTypes = {
  period: PropTypes.string,
  offerType: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  price: PropTypes.number,
  isTrialAvailable: PropTypes.bool,
  showInfoBox: PropTypes.string,
  isDataLoaded: PropTypes.bool,
  paymentMethod: PropTypes.string,
  t: PropTypes.func,
  isMyAccount: PropTypes.bool
};

OfferCard.defaultProps = {
  period: '',
  offerType: '',
  title: '',
  description: '',
  currency: '',
  price: null,
  isTrialAvailable: false,
  showInfoBox: null,
  isDataLoaded: true,
  paymentMethod: '',
  t: k => k,
  isMyAccount: false
};

export { OfferCard as PureOfferCard };

export default withTranslation()(labeling()(OfferCard));
