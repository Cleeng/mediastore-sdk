import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { ReactComponent as BlockedIcon } from 'assets/images/blocked.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { currencyFormat, periodMapper } from 'util/planHelper';
import isPriceTemporaryModified from 'util/isPriceTemporaryModified';

import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  PriceWrapperStyled,
  SubBoxStyled,
  BoxTextStyled,
  SubBoxContentStyled
} from './OfferSwitchCardStyled';

const OfferCard = ({ baseOfferId, toOfferId }) => {
  console.log({ baseOfferId });
  console.log({ toOfferId });

  const { t } = useTranslation();

  const {
    data: allSwitchSettings,
    loading: isSwitchSettingsLoading
  } = useSelector(state => state.plan.switchSettings);
  const switchDetails =
    allSwitchSettings[baseOfferId].available.find(
      switchData => switchData.toOfferId === toOfferId
    ) ||
    allSwitchSettings[baseOfferId].unavailable.find(
      switchData => switchData.toOfferId === toOfferId
    ) ||
    {};
  console.log({ switchDetails });
  const period = periodMapper[switchDetails?.period]?.chargedForEveryText;
  const currency = currencyFormat[switchDetails?.nextPaymentPriceCurrency];

  const mapCode = {
    TO_OFFER_COUNTRY_NOT_ALLOWED: {
      text: t(
        'offer-card.error.geo-restriction',
        `This plan is <strong>currently unavailable</strong> in your country or region`
      ),
      icon: BlockedIcon
    },
    ALREADY_HAS_ACCESS: {
      text: t(
        'offer-card.error.already-have-access',
        'It looks like you already have access to this offer'
      ),
      icon: BlockedIcon
    },
    TO_FREE_OFFER_NOT_ALLOWED: {
      text: t(
        'offer-card.error.to-free-offer',
        'Switching from a paid to a free offer is not possible'
      ),
      icon: BlockedIcon
    },
    SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
      text: t(
        'offer-card.error.coupon-applied',
        "You can't change your subscription if a coupon was applied. To change plan, please cancel your current subscription and purchase a new one."
      ),
      icon: BlockedIcon
    },
    SWITCH_IN_PROGRESS: {
      text: t(
        'offer-card.error.switch-in-progress',
        'Another switch is already in progress. Wait until the process finalization'
      ),
      icon: BlockedIcon
    },
    MISSING_PAYMENT_DETAILS: {
      text: t(
        'offer-card.error.missing-payment-details',
        'Your payment details are missing. Please add them to proceed with a subscription switch.'
      ),
      icon: BlockedIcon
    }
  };

  const IconComponent =
    switchDetails?.reason?.code && mapCode[switchDetails.reason.code]?.icon
      ? mapCode[switchDetails.reason.code].icon
      : React.Fragment;

  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper
          showChildren={!isSwitchSettingsLoading}
          width={50}
          height={50}
        >
          <SubscriptionIcon period={period || 'S'} />
        </SkeletonWrapper>
        <InnerWrapper>
          <SkeletonWrapper
            showChildren={!isSwitchSettingsLoading}
            width={200}
            margin="0 10px 10px 10px"
          >
            <TitleStyled>
              {t(`offer-title-${toOfferId}`, switchDetails.title)}
            </TitleStyled>
          </SkeletonWrapper>
          <SkeletonWrapper
            showChildren={!isSwitchSettingsLoading}
            width={300}
            margin="0 10px 10px 10px"
          />
        </InnerWrapper>
        <PriceWrapperStyled>
          <SkeletonWrapper
            showChildren={!isSwitchSettingsLoading}
            width={80}
            height={30}
          >
            <Price
              currency={currency}
              price={
                isPriceTemporaryModified(toOfferId) &&
                switchDetails.algorithm !== 'DEFERRED'
                  ? switchDetails.price
                  : switchDetails.nextPaymentPrice
              }
              period={
                switchDetails.period !== 'season'
                  ? t(
                      `offer-price.period-${switchDetails.period}`,
                      switchDetails.period
                    )
                  : null
              }
            />
          </SkeletonWrapper>
        </PriceWrapperStyled>
      </WrapperStyled>
      {switchDetails?.reason?.code
        ? mapCode[switchDetails.reason.code] &&
          mapCode[switchDetails.reason.code].text && (
            <SubBoxStyled>
              <IconComponent />
              <SubBoxContentStyled>
                <BoxTextStyled
                  dangerouslySetInnerHTML={{
                    __html: mapCode[switchDetails.reason.code].text
                  }}
                />
              </SubBoxContentStyled>
            </SubBoxStyled>
          )
        : ''}
    </>
  );
};

OfferCard.propTypes = {
  baseOfferId: PropTypes.string.isRequired,
  toOfferId: PropTypes.string.isRequired
};

OfferCard.defaultProps = {};

export { OfferCard as PureOfferCard };

export default OfferCard;
