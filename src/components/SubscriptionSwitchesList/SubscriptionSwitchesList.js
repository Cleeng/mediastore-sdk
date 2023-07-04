/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SubscriptionStyled } from 'components/CurrentPlan/CurrentPlanStyled';
import { SimpleButtonStyled } from 'components/SubscriptionManagement/SubscriptionManagementStyled';
import OfferCard from 'components/OfferCard';
import MyAccountError from 'components/MyAccountError';
import { ReactComponent as selectPlanIcon } from 'assets/images/selectPlan.svg';
import { SkeletonCard } from 'components/CurrentPlan/CurrentPlan';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { periodMapper, currencyFormat } from 'util/planHelper';
import isPriceTemporaryModified from 'util/isPriceTemporaryModified';
import { showPopup } from 'redux/popupSlice';
import { ButtonWrapperStyled } from './SubscriptionSwitchesListStyled';
import mapErrorToText from './helper';

const SubscriptionSwitchesList = () => {
  const { t } = useTranslation();

  const { data: switchDetails } = useSelector(
    state => state.plan.switchDetails
  );
  const { pauseOffersIDs } = useSelector(state => state.offers);
  const { offerToSwitch } = useSelector(state => state.plan);

  const {
    data: allSwitchSettings,
    loading: isSwitchSettingsLoading,
    error: isAllSwitchSettingsError
  } = useSelector(state => state.plan.switchSettings);

  const isOfferSelected = !!offerToSwitch.offerId;

  const switchSettings = allSwitchSettings[offerToSwitch?.offerId] || {};
  const fromOfferId = offerToSwitch?.offerId;
  const pendingSwtichesToOfferIdsArray = Object.keys(switchDetails).map(
    item => {
      return switchDetails[item].toOfferId;
    }
  );

  const dispatch = useDispatch();

  if (isSwitchSettingsLoading) {
    return <SkeletonCard />;
  }

  if (isAllSwitchSettingsError?.length) {
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
              as="article"
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
                    dispatch(
                      showPopup({
                        type: POPUP_TYPES.switchPlan,
                        data: {
                          offerData: {
                            ...subItem
                          }
                        }
                      })
                    );
                  }}
                >
                  {t(
                    `subscription-switches-list.${subItem.switchDirection}-button`,
                    subItem.switchDirection
                  )}
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
                  {t(
                    `subscription-switches-list.${subItem.switchDirection}-button`,
                    subItem.switchDirection
                  )}
                </SimpleButtonStyled>
              </ButtonWrapperStyled>
            </SubscriptionStyled>
          );
        })}
    </>
  );
};

export { SubscriptionSwitchesList as PureSubscriptionSwitchesList };

export default SubscriptionSwitchesList;
