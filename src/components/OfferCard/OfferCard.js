import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SubscriptionIcon from 'components/SubscriptionIcon';
import Price from 'components/Price';
import { ReactComponent as BlockedIcon } from 'assets/images/blocked.svg';
import { ReactComponent as EditBlockedIcon } from 'assets/images/noEdit.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { ReactComponent as DowngradeIcon } from 'assets/images/downgrade_pending.svg';
import { ReactComponent as UpgradeIcon } from 'assets/images/upgrade_pending.svg';
import { ReactComponent as PauseIcon } from 'assets/images/pause_noti.svg';
import { dateFormat, INFINITE_DATE } from 'util/planHelper';
import { POPUP_TYPES } from 'redux/innerPopupReducer';

import {
  WrapperStyled,
  InnerWrapper,
  TitleStyled,
  DescriptionStyled,
  PriceWrapperStyled,
  TrialBadgeStyled,
  SubBoxStyled,
  BoxTextStyled,
  SubBoxButtonStyled,
  SubBoxContentStyled
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
  pendingSwitchId,
  expiresAt,
  showInnerPopup,
  offerId,
  isPriceBoxHidden,
  isPaused
}) => {
  const planDetailsState = useSelector(state => state.planDetails);
  const { pauseOffersIDs } = useSelector(state => state.offers);
  const switchDetails = planDetailsState.switchDetails[pendingSwitchId];
  const isPauseInProgress = pauseOffersIDs.includes(switchDetails?.toOfferId);

  const { t } = useTranslation();

  const getSwitchCopy = () => {
    if (switchDetails) {
      const subscription = planDetailsState.currentPlan.find(
        sub => sub.pendingSwitchId === pendingSwitchId
      );
      const subscriptionExpirationDate =
        subscription.expiresAt === INFINITE_DATE
          ? t('offer-card.next-season-start', 'the next season start')
          : dateFormat(subscription.expiresAt);
      const { title: switchTitle, fromOfferId, toOfferId } = switchDetails;
      const translatedTitle = t(`offer-title-${fromOfferId}`, title);
      const translatedSwitchTitle = t(`offer-title-${toOfferId}`, switchTitle);
      // if pause is in progress
      if (isPauseInProgress) {
        return t(
          'offer-card.info-box.pause-information-text',
          'Your current plan will be paused starting on {{subscriptionExpirationDate}}. While your subscription is paused, you won’t be charged for, and you won’t have access to, {{ translatedTitle }}. You can cancel this pause request at any time.',
          {
            subscriptionExpirationDate,
            translatedTitle
          }
        );
      }
      switch (switchDetails.algorithm) {
        case 'IMMEDIATE_WITHOUT_PRORATION':
          return t(
            'offer-card.switch-details.immediate-without-proration',
            `Your switch is pending and should be completed within few minutes. You will be charged a new price starting {{subscriptionExpirationDate}}.{{translatedSwitchTitle}} renews automatically. You can cancel anytime.`,
            { subscriptionExpirationDate, translatedSwitchTitle }
          );
        case 'IMMEDIATE_AND_CHARGE_WITH_REFUND':
        case 'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION':
          return t(
            'offer-card.switch-details.immediate-and-charge',
            `Your switch is pending and should be completed within few minutes. You will be charged a new price immediately and get access to {{translatedSwitchTitle}}. You can cancel anytime.`,
            { translatedSwitchTitle }
          );
        case 'DEFERRED':
          return t(
            'offer-card.switch-details.deferred',
            `Your switch is pending. You will have access to {{translatedTitle}} until {{subscriptionExpirationDate}}. From that time you will be charged your new price and will have access to {{translatedSwitchTitle}}. You can cancel this at any time.`,
            {
              translatedTitle,
              subscriptionExpirationDate,
              translatedSwitchTitle
            }
          );
        default:
          return '';
      }
    } else return '';
  };

  const getSwitchIcon = () => {
    if (switchDetails) {
      // if pause is in progress
      if (isPauseInProgress) {
        return PauseIcon;
      }
      switch (switchDetails.direction) {
        case 'downgrade':
          return DowngradeIcon;
        case 'upgrade':
          return UpgradeIcon;
        default:
          return null;
      }
    } else return null;
  };

  const mapCode = {
    TO_OFFER_COUNTRY_NOT_ALLOWED: {
      text: t(
        'offer-card.error.plan-unavailable',
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
        'offer-card.error.switch-not-possible',
        'Switching from a paid to a free offer is not possible'
      ),
      icon: BlockedIcon
    },
    SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
      text: t(
        'offer-card.error.change-with-coupon-not-allowed',
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
    INAPP_SUBSCRIPTION: {
      text: t(
        `${
          paymentMethod ? `Subscription purchased via ${paymentMethod}. ` : ``
        }Use an external service to edit the plan.`
      ),
      icon: EditBlockedIcon
    },
    SWITCH: {
      text: getSwitchCopy(),
      icon: getSwitchIcon()
    }
  };

  const IconComponent =
    showInfoBox && mapCode[showInfoBox] && mapCode[showInfoBox].icon
      ? mapCode[showInfoBox].icon
      : React.Fragment;

  return (
    <>
      <WrapperStyled>
        <SkeletonWrapper showChildren={isDataLoaded} width={50} height={50}>
          <SubscriptionIcon period={period || offerType} isPaused={isPaused} />
        </SkeletonWrapper>
        <InnerWrapper>
          <SkeletonWrapper
            showChildren={isDataLoaded}
            width={200}
            margin="0 10px 10px 10px"
          >
            <TitleStyled>{t(`offer-title-${offerId}`, title)}</TitleStyled>
          </SkeletonWrapper>
          <SkeletonWrapper
            showChildren={isDataLoaded}
            width={300}
            margin="0 10px 10px 10px"
          >
            <DescriptionStyled
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </SkeletonWrapper>
        </InnerWrapper>
        {!isPriceBoxHidden && (
          <PriceWrapperStyled>
            <SkeletonWrapper showChildren={isDataLoaded} width={80} height={30}>
              {isTrialAvailable && (
                <TrialBadgeStyled>
                  {t('offer-card.trial-period', 'trial period')}
                </TrialBadgeStyled>
              )}
              {((isMyAccount && offerType === 'S') || !isMyAccount) && (
                <Price
                  currency={currency}
                  price={price}
                  period={
                    offerType === 'S' && period !== 'season'
                      ? t(`offer-price.period-${period}`, period)
                      : null
                  }
                />
              )}
            </SkeletonWrapper>
          </PriceWrapperStyled>
        )}
      </WrapperStyled>
      {showInfoBox
        ? mapCode[showInfoBox] &&
          mapCode[showInfoBox].text && (
            <SubBoxStyled>
              <IconComponent />
              <SubBoxContentStyled>
                <BoxTextStyled
                  dangerouslySetInnerHTML={{
                    __html: mapCode[showInfoBox].text
                  }}
                />
                {showInfoBox === 'SWITCH' &&
                  switchDetails.algorithm === 'DEFERRED' && (
                    <SubBoxButtonStyled
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent(
                            'MSSDK:cancel-switch-button-clicked',
                            {
                              detail: {
                                pendingSwitchId,
                                fromOfferId: switchDetails.fromOfferId,
                                toOfferId: switchDetails.toOfferId
                              }
                            }
                          )
                        );
                        showInnerPopup({
                          type: isPauseInProgress
                            ? POPUP_TYPES.cancelPause
                            : POPUP_TYPES.cancelSwitch,
                          data: {
                            pendingSwitchId,
                            switchDirection: switchDetails.direction,
                            switchOfferTitle: switchDetails.title,
                            baseOfferTitle: title,
                            baseOfferExpirationDate: expiresAt,
                            baseOfferPrice: `${currency}${price}`
                          }
                        });
                      }}
                    >
                      {isPauseInProgress
                        ? t('offer-card.cancel-pause-button', 'Cancel pause')
                        : t('offer-card.cancel-switch', 'Cancel switch')}
                    </SubBoxButtonStyled>
                  )}
              </SubBoxContentStyled>
            </SubBoxStyled>
          )
        : ''}
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
  isMyAccount: PropTypes.bool,
  pendingSwitchId: PropTypes.string,
  expiresAt: PropTypes.number,
  showInnerPopup: PropTypes.func,
  offerId: PropTypes.string,
  isPriceBoxHidden: PropTypes.bool,
  isPaused: PropTypes.bool
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
  isMyAccount: false,
  pendingSwitchId: null,
  expiresAt: null,
  showInnerPopup: () => {},
  offerId: '',
  isPriceBoxHidden: false,
  isPaused: false
};

export { OfferCard as PureOfferCard };

export default OfferCard;
