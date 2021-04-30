/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Loader from 'components/Loader';
import {
  SubscriptionStyled,
  SubscriptionActionsStyled,
  SimpleButtonStyled
} from 'components/CurrentPlan/CurrentPlanStyled';
import SubscriptionCard from 'components/SubscriptionCard';
import MyAccountError from 'components/MyAccountError';
import { ReactComponent as selectPlanIcon } from 'assets/images/selectPlan.svg';
import mapErrorToText from './helper';

const SubscriptionSwitchesList = ({
  switchSettings,
  showInnerPopup,
  isOfferSelected,
  isLoading,
  errors,
  t
}) => {
  if (isLoading) {
    return <Loader isMyAccount />;
  }
  if (errors.length) {
    return <MyAccountError generalError />;
  }
  if (!isOfferSelected) {
    return (
      <MyAccountError
        icon={selectPlanIcon}
        title={t('Start by selecting the plan that would like to switch from')}
        margin="0 auto"
      />
    );
  }
  const areAvailable = !!(
    switchSettings.available && switchSettings.available.length
  );
  const areUnAvailable = !!(
    switchSettings.unavailable && switchSettings.unavailable.length
  );
  const allSwitchesBlocked = switchSettings.unavailableReason;
  if (allSwitchesBlocked) {
    return (
      <MyAccountError
        icon={mapErrorToText[allSwitchesBlocked.code].icon}
        title={mapErrorToText[allSwitchesBlocked.code].title}
        subtitle={mapErrorToText[allSwitchesBlocked.code].subtitle}
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
  return (
    <>
      {areAvailable &&
        switchSettings.available.map(subItem => (
          <SubscriptionStyled key={subItem.toOfferId}>
            <SubscriptionCard
              period={subItem.period}
              title={subItem.title}
              currency={subItem.nextPaymentPriceCurrencySymbol}
              price={Math.round(subItem.nextPaymentPrice * 100) / 100}
            />
            <SubscriptionActionsStyled>
              <SimpleButtonStyled
                onClickFn={() => {
                  showInnerPopup({
                    type: 'switchPlan',
                    data: {
                      offerData: {
                        ...subItem
                      }
                    }
                  });
                }}
              >
                {t('Choose')}
              </SimpleButtonStyled>
            </SubscriptionActionsStyled>
          </SubscriptionStyled>
        ))}
      {areUnAvailable &&
        switchSettings.unavailable.map(subItem => (
          <SubscriptionStyled key={subItem.toOfferId}>
            <SubscriptionCard
              period={subItem.period}
              title={subItem.title}
              currency={subItem.nextPaymentPriceCurrencySymbol}
              price={Math.round(subItem.nextPaymentPrice * 100) / 100}
              showInfoBox={subItem.reason.code}
            />
            <SubscriptionActionsStyled>
              <SimpleButtonStyled disabled>{t('Choose')}</SimpleButtonStyled>
            </SubscriptionActionsStyled>
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
  t: PropTypes.func
};

SubscriptionSwitchesList.defaultProps = {
  switchSettings: {},
  showInnerPopup: () => {},
  errors: [],
  isLoading: false,
  t: k => k
};

export { SubscriptionSwitchesList as PureSubscriptionSwitchesList };

export default withTranslation()(labeling()(SubscriptionSwitchesList));
