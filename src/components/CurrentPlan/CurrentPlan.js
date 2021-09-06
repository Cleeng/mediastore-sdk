/* eslint-disable no-nested-ternary */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import { dateFormat, currencyFormat } from 'util/planHelper';

import MyAccountError from 'components/MyAccountError';
import SubscriptionCard from 'components/SubscriptionCard';
import SubscriptionManagement from 'components/SubscriptionManagement';
import MessageBox from 'components/MessageBox';

import {
  WrapStyled,
  SubscriptionStyled,
  StatusMessageWrapStyled
} from './CurrentPlanStyled';

export const SkeletonCard = () => {
  return (
    <SubscriptionStyled>
      <SubscriptionCard isDataLoaded={false} />
    </SubscriptionStyled>
  );
};

const supportedPaymentGateways = ['paypal', 'card', 'adyen'];
class CurrentPlan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMessageBoxOpened: false,
      messageBoxType: null,
      messageBoxText: '',
      messageSubscriptionId: null
    };
  }

  showMessageBox = (type, text, subscriptionId) => {
    this.setState({
      messageBoxType: type,
      messageBoxText: text,
      isMessageBoxOpened: true,
      messageSubscriptionId: subscriptionId
    });
  };

  render() {
    const {
      isMessageBoxOpened,
      messageBoxType,
      messageBoxText,
      messageSubscriptionId
    } = this.state;

    const {
      subscriptions,
      isLoading,
      errors,
      showInnerPopup,
      setOfferToSwitch,
      offerToSwitch,
      updateList,
      t
    } = this.props;

    const areFewOffers = subscriptions.length > 1;
    return isLoading ? (
      <SkeletonCard />
    ) : (
      <WrapStyled>
        {errors.length !== 0 ? (
          <MyAccountError generalError />
        ) : subscriptions.length === 0 ? (
          <MyAccountError
            title={t('No subscriptions yet!')}
            subtitle={t(
              'If you choose your plan, you will be able to manage your Subscriptions here.'
            )}
            icon={noSubscriptionsIcon}
          />
        ) : (
          <>
            {subscriptions.map(subItem => {
              const description = `${
                subItem.status === 'active'
                  ? t('Next payment is on')
                  : t('This plan will expire on')
              } ${dateFormat(subItem.expiresAt)}`;
              return (
                <SubscriptionStyled
                  key={subItem.offerId}
                  onClick={() => {
                    if (areFewOffers && subItem.status === 'active')
                      setOfferToSwitch(subItem);
                  }}
                  cursorPointer={areFewOffers && subItem.status === 'active'}
                  isSelected={
                    areFewOffers && offerToSwitch.offerId === subItem.offerId
                  }
                >
                  <SubscriptionCard
                    period={subItem.period}
                    title={subItem.offerTitle}
                    description={description}
                    currency={currencyFormat[subItem.nextPaymentCurrency]}
                    price={subItem.nextPaymentPrice}
                    showInfoBox={
                      supportedPaymentGateways.includes(subItem.paymentGateway)
                        ? ''
                        : 'INAPP_SUBSCRIPTION'
                    }
                    paymentMethod={subItem.paymentMethod}
                  />
                  {isMessageBoxOpened &&
                    messageSubscriptionId === subItem.subscriptionId && (
                      <StatusMessageWrapStyled>
                        <MessageBox
                          type={messageBoxType}
                          message={messageBoxText}
                        />
                      </StatusMessageWrapStyled>
                    )}
                  {supportedPaymentGateways.includes(
                    subItem.paymentGateway
                  ) && (
                    <SubscriptionManagement
                      subscription={subItem}
                      showInnerPopup={showInnerPopup}
                      updateList={updateList}
                      showMessageBox={this.showMessageBox}
                    />
                  )}
                </SubscriptionStyled>
              );
            })}
          </>
        )}
      </WrapStyled>
    );
  }
}

CurrentPlan.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.any),
  isLoading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  setOfferToSwitch: PropTypes.func.isRequired,
  offerToSwitch: PropTypes.objectOf(PropTypes.any),
  updateList: PropTypes.func.isRequired,
  t: PropTypes.func
};

CurrentPlan.defaultProps = {
  subscriptions: [],
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  t: k => k
};

export { CurrentPlan as PureCurrentPlan };

export default withTranslation()(labeling()(CurrentPlan));
