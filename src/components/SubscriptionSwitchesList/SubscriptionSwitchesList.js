/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { SubscriptionStyled } from 'components/CurrentPlan/CurrentPlanStyled';
import {
  WrapperStyled,
  SimpleButtonStyled
} from 'components/SubscriptionManagement/SubscriptionManagementStyled';
import OfferCard from 'components/OfferCard';
import MyAccountError from 'components/MyAccountError';
import { ReactComponent as selectPlanIcon } from 'assets/images/selectPlan.svg';
import { SkeletonCard } from 'components/CurrentPlan/CurrentPlan';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { periodMapper } from 'util/planHelper';
import mapErrorToText from './helper';

const SubscriptionSwitchesList = ({
  switchSettings,
  showInnerPopup,
  isOfferSelected,
  isLoading,
  errors,
  fromOfferId,
  t
}) => {
  const planDetailsState = useSelector(state => state.planDetails);
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
        title={t('Click on the plan that you would like to switch from')}
        margin="0 auto"
      />
    );
  }

  const areAvailable = !!(
    switchSettings.available &&
    switchSettings.available.length &&
    switchSettings.available.filter(
      item => !pendingSwtichesToOfferIdsArray.includes(item.toOfferId)
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
        title={error.title}
        subtitle={error.subtitle}
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
          "Looks like there aren't any options for switching from your current plan right now"
        )}
        margin="0 auto"
      />
    );
  }
  const availableSorted = [...switchSettings.available].sort(
    (aOffer, bOffer) => bOffer.price - aOffer.price
  );

  return (
    <>
      {areAvailable &&
        availableSorted.map(subItem => (
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
              currency={subItem.nextPaymentPriceCurrencySymbol}
              price={Math.round(subItem.nextPaymentPrice * 100) / 100}
            />
            <WrapperStyled>
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
                {subItem.switchDirection}
              </SimpleButtonStyled>
            </WrapperStyled>
          </SubscriptionStyled>
        ))}
      {areUnAvailable &&
        switchSettings.unavailable.map(subItem => (
          <SubscriptionStyled key={subItem.toOfferId}>
            <OfferCard
              period={periodMapper[subItem.period].chargedForEveryText}
              offerType="S"
              title={subItem.title}
              currency={subItem.nextPaymentPriceCurrencySymbol}
              price={Math.round(subItem.nextPaymentPrice * 100) / 100}
              showInfoBox={subItem.reason.code}
            />
            <WrapperStyled>
              <SimpleButtonStyled disabled>
                {subItem.switchDirection}
              </SimpleButtonStyled>
            </WrapperStyled>
          </SubscriptionStyled>
        ))}
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
  t: PropTypes.func
};

SubscriptionSwitchesList.defaultProps = {
  switchSettings: {},
  showInnerPopup: () => {},
  errors: [],
  isLoading: false,
  fromOfferId: '',
  t: k => k
};

export { SubscriptionSwitchesList as PureSubscriptionSwitchesList };

export default withTranslation()(labeling()(SubscriptionSwitchesList));
