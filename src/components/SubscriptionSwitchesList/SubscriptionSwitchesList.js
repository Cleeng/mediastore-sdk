/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SubscriptionStyled } from 'components/CurrentPlan/CurrentPlanStyled';
import { SimpleButtonStyled } from 'components/SubscriptionManagement/SubscriptionManagementStyled';
import OfferCard from 'components/OfferCard';
import MyAccountError from 'components/MyAccountError';
import { ReactComponent as selectPlanIcon } from 'assets/images/selectPlan.svg';
import { ReactComponent as happyData } from 'assets/images/happyData.svg';
import { SkeletonCard } from 'components/CurrentPlan/CurrentPlan';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { periodMapper, currencyFormat } from 'util/planHelper';
import isPriceTemporaryModified from 'util/isPriceTemporaryModified';
import { ButtonWrapperStyled } from './SubscriptionSwitchesListStyled';
import mapErrorToText from './helper';

const SubscriptionSwitchesList = ({
  switchSettings,
  showInnerPopup,
  isOfferSelected,
  isLoading,
  errors,
  isSwitchInProgress,
  fromOfferId
}) => {
  const planDetailsState = useSelector(state => state.planDetails);
  const { pauseOffersIDs } = useSelector(state => state.offers);

  const { t } = useTranslation();

  const pendingSwtichesToOfferIdsArray = Object.keys(
    planDetailsState.switchDetails
  ).map(item => {
    return planDetailsState.switchDetails[item].toOfferId;
  });

  if (isLoading) {
    return <SkeletonCard />;
  }
  if (errors.length) {
    return <MyAccountError generalError />;
  }
  if (!isOfferSelected) {
    return (
      <MyAccountError
        icon={selectPlanIcon}
        title={t(
          'subscription-switches-list.offer-not-selected',
          'Click on the plan that you would like to switch from'
        )}
        margin="0 auto"
      />
    );
  }
  if (isSwitchInProgress) {
    return (
      <MyAccountError
        icon={happyData}
        title={t(
          'subscription-switches-list.switch-in-progress',
          'Subscription switch in progress!'
        )}
        subtitle={t(
          'subscription-switches-list.try-again',
          'Please try again in a few moments.'
        )}
        margin="0 auto"
      />
    );
  }

  const areAvailable = !!(
    switchSettings.available &&
    switchSettings.available.length &&
    switchSettings.available.filter(
      ({ toOfferId }) => !pendingSwtichesToOfferIdsArray.includes(toOfferId)
    ).length
  );

  const areUnAvailable = !!(
    switchSettings.unavailable && switchSettings.unavailable.length
  );
  const allSwitchesBlocked = switchSettings.unavailableReason;
  if (allSwitchesBlocked) {
    const error = mapErrorToText[allSwitchesBlocked.code]
      ? mapErrorToText[allSwitchesBlocked.code]
      : mapErrorToText.DEFAULT;

    return (
      <MyAccountError
        icon={error.icon}
        title={t(error.title.translationKey, error.title.text)}
        subtitle={t(error.subtitle.translationKey, error.subtitle.text)}
        margin="0 auto"
        fullWidth
      />
    );
  }
  if (!areAvailable && !areUnAvailable) {
    return (
      <MyAccountError
        icon={selectPlanIcon}
        title={t(
          'subscription-switches-list.switching-unavailable',
          "Looks like there aren't any options for switching from your current plan right now"
        )}
        margin="0 auto"
      />
    );
  }
  const availableSorted = Array.isArray(switchSettings.available)
    ? [...switchSettings.available].sort(
        (aOffer, bOffer) => bOffer.price - aOffer.price
      )
    : [];

  // Filter out the pause subscription
  const availableFiltered = availableSorted?.filter(
    offer => !pauseOffersIDs.includes(offer.toOfferId)
  );
  const unavailableFiltered = Array.isArray(switchSettings.unavailable)
    ? switchSettings.unavailable.filter(
        offer => !pauseOffersIDs.includes(offer.toOfferId)
      )
    : [];

  return (
    <>
      {areAvailable &&
        availableFiltered.map(subItem => {
          const price =
            isPriceTemporaryModified(subItem.toOfferId) &&
            subItem.algorithm !== 'DEFERRED'
              ? subItem.price
              : subItem.nextPaymentPrice;
          return (
            <SubscriptionStyled
              key={subItem.toOfferId}
              hide={pendingSwtichesToOfferIdsArray.find(
                item => item === subItem.toOfferId
              )}
            >
              <OfferCard
                period={periodMapper[subItem.period].chargedForEveryText}
                offerType="S"
                title={subItem.title}
                currency={currencyFormat[subItem.nextPaymentPriceCurrency]}
                price={Math.round(price * 100) / 100}
                offerId={subItem.toOfferId}
              />
              <ButtonWrapperStyled>
                <SimpleButtonStyled
                  onClickFn={() => {
                    window.dispatchEvent(
                      new CustomEvent('MSSDK:switch-button-clicked', {
                        detail: {
                          fromOfferId,
                          toOfferId: subItem.toOfferId,
                          switchDirection: subItem.switchDirection,
                          algorithm: subItem.algorithm
                        }
                      })
                    );
                    showInnerPopup({
                      type: POPUP_TYPES.switchPlan,
                      data: {
                        offerData: {
                          ...subItem
                        }
                      }
                    });
                  }}
                >
                  {t(subItem.switchDirection)}
                </SimpleButtonStyled>
              </ButtonWrapperStyled>
            </SubscriptionStyled>
          );
        })}
      {areUnAvailable &&
        unavailableFiltered.map(subItem => {
          const price =
            isPriceTemporaryModified(subItem.toOfferId) &&
            subItem.algorithm !== 'DEFERRED'
              ? subItem.price
              : subItem.nextPaymentPrice;
          return (
            <SubscriptionStyled key={subItem.toOfferId}>
              <OfferCard
                period={periodMapper[subItem.period].chargedForEveryText}
                offerType="S"
                title={subItem.title}
                currency={currencyFormat[subItem.nextPaymentPriceCurrency]}
                price={Math.round(price * 100) / 100}
                showInfoBox={subItem.reason.code}
                offerId={subItem.toOfferId}
              />
              <ButtonWrapperStyled>
                <SimpleButtonStyled disabled>
                  {t(subItem.switchDirection)}
                </SimpleButtonStyled>
              </ButtonWrapperStyled>
            </SubscriptionStyled>
          );
        })}
    </>
  );
};

SubscriptionSwitchesList.propTypes = {
  switchSettings: PropTypes.objectOf(PropTypes.any),
  isOfferSelected: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  showInnerPopup: PropTypes.func,
  isLoading: PropTypes.bool,
  fromOfferId: PropTypes.string,
  isSwitchInProgress: PropTypes.bool
};

SubscriptionSwitchesList.defaultProps = {
  switchSettings: {},
  showInnerPopup: () => {},
  errors: [],
  isLoading: false,
  fromOfferId: '',
  isSwitchInProgress: false
};

export { SubscriptionSwitchesList as PureSubscriptionSwitchesList };

export default SubscriptionSwitchesList;
