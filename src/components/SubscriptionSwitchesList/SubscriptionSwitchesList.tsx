/* eslint-disable no-nested-ternary */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { useTranslation } from 'react-i18next';
import { SubscriptionStyled } from 'components/CurrentPlan/CurrentPlanStyled';
import { SimpleButtonStyled } from 'components/SubscriptionManagement/SubscriptionManagementStyled';
import OfferSwitchCard from 'components/OfferSwitchCard';
import OfferSwitchCardLoader from 'components/OfferSwitchCard/OfferSwitchCardLoader';
import MyAccountError from 'components/MyAccountError';
import selectPlanIcon from 'assets/images/selectPlan.svg';
import { POPUP_TYPES, showPopup } from 'appRedux/popupSlice';
import eventDispatcher, {
  MSSDK_SWITCH_BUTTON_CLICKED
} from 'util/eventDispatcher';
import serverIcon from 'assets/images/errors/sad_server.svg';
import { ButtonWrapperStyled } from './SubscriptionSwitchesListStyled';
import mapErrorToText from './helper';

const SubscriptionSwitchesList = () => {
  const { t } = useTranslation();

  const { data: pendingSwitchesDetails } = useAppSelector(
    (state) => state.plan.pendingSwitchesDetails
  );
  const { pauseOffersIDs } = useAppSelector((state) => state.offers);
  const { offerToSwitch } = useAppSelector((state) => state.plan);

  const {
    data: allSwitchSettings,
    loading: isSwitchSettingsLoading,
    error: isAllSwitchSettingsError
  } = useAppSelector((state) => state.plan.switchSettings);

  const isOfferSelected = !!offerToSwitch.offerId;

  const switchSettings = allSwitchSettings[offerToSwitch?.offerId] || {};
  const fromOfferId = offerToSwitch?.offerId;
  const pendingSwitchesToOfferIdsArray = Object.keys(
    pendingSwitchesDetails
  ).map((item) => {
    return pendingSwitchesDetails[item].toOfferId;
  });
  const EXTERNALLY_MANAGED_ERROR = 'Subscription is externally managed';

  const dispatch = useAppDispatch();

  if (isSwitchSettingsLoading) {
    return (
      <SubscriptionStyled>
        <OfferSwitchCardLoader />
      </SubscriptionStyled>
    );
  }

  if (isAllSwitchSettingsError?.length) {
    if (isAllSwitchSettingsError.includes(EXTERNALLY_MANAGED_ERROR))
      return (
        <MyAccountError
          title={t(
            'subscription-switches-list.offer-externally-managed-title',
            'Subscription is externally managed.'
          )}
          subtitle={t(
            'subscription-switches-list.offer-externally-managed-subtitle',
            'Use an external service to change the plan.'
          )}
          icon={serverIcon}
        />
      );
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
        margin='0 auto'
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
    (offer) => !pauseOffersIDs.includes(offer.toOfferId)
  );
  const unavailableFiltered = Array.isArray(switchSettings.unavailable)
    ? switchSettings.unavailable.filter(
        (offer) => !pauseOffersIDs.includes(offer.toOfferId)
      )
    : [];

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
        margin='0 auto'
        fullWidth
      />
    );
  }

  if (!availableFiltered?.length && !unavailableFiltered?.length) {
    return (
      <MyAccountError
        icon={selectPlanIcon}
        title={t(
          'subscription-switches-list.switching-unavailable',
          "Looks like there aren't any options for switching from your current plan right now"
        )}
        margin='0 auto'
      />
    );
  }

  return (
    <>
      {!!availableFiltered.length &&
        availableFiltered.map((subItem) => {
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <SubscriptionStyled
              as='article'
              key={subItem.toOfferId}
              $hide={
                !!pendingSwitchesToOfferIdsArray.find(
                  (item) => item === subItem.toOfferId
                )
              }
            >
              <OfferSwitchCard
                baseOfferId={fromOfferId}
                toOfferId={subItem.toOfferId}
              />
              <ButtonWrapperStyled>
                <SimpleButtonStyled
                  variant='primary'
                  onClickFn={() => {
                    eventDispatcher(MSSDK_SWITCH_BUTTON_CLICKED, {
                      fromOfferId,
                      toOfferId: subItem.toOfferId,
                      switchDirection: subItem.switchDirection,
                      algorithm: subItem.algorithm
                    });
                    dispatch(
                      showPopup({
                        type: POPUP_TYPES.SWITCH_PLAN_POPUP,
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
      {!!unavailableFiltered.length &&
        unavailableFiltered.map((subItem) => {
          return (
            <SubscriptionStyled key={subItem.toOfferId}>
              <OfferSwitchCard
                baseOfferId={fromOfferId}
                toOfferId={subItem.toOfferId}
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
