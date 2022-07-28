/* eslint-disable no-nested-ternary */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import { dateFormat, currencyFormat } from 'util/planHelper';

import MyAccountError from 'components/MyAccountError';
import OfferCard from 'components/OfferCard';
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
      <OfferCard isDataLoaded={false} />
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

  componentDidUpdate() {
    console.log(this.props);
    // console.log('componentDidMount');
    // this.showMessageBox(
    //   'upgrade',
    //   'Your switch is pending. You will have access to <current plan> until <subscription end date>. From that time you will be charged a new price and have access to <selected plan>. You can cancel anytime.',
    //   271645437
    // );
  }

  showMessageBox = (type, text, subscriptionId) => {
    this.setState({
      messageBoxType: type,
      messageBoxText: text,
      isMessageBoxOpened: true,
      messageSubscriptionId: subscriptionId
    });
  };

  showInfoBox = item => {
    if (item.offerType !== 'S') return null;
    const { switchesInProgress } = this.props;
    // some old condition
    if (
      !(
        item.offerType !== 'S' ||
        supportedPaymentGateways.includes(item.paymentGateway)
      )
    ) {
      return 'INAPP_SUBSCRIPTION';
    }
    // check if that item have pending subscription
    const pendingSwich = switchesInProgress.find(
      switchInProgress => switchInProgress.fromOfferId === item.offerId
    );
    if (pendingSwich) {
      console.log(pendingSwich);
      return `PENDING_${pendingSwich.direction.toUpperCase()}_${
        pendingSwich.algorithm
      }`;
    }
    return null;
  };

  cancelDowngrading = () => {
    console.log('Cancel downgrading button clicked');
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

    return isLoading ? (
      <SkeletonCard />
    ) : (
      <WrapStyled>
        {errors.length !== 0 ? (
          <MyAccountError generalError />
        ) : subscriptions.length === 0 ? (
          <MyAccountError
            title={t('No offers yet!')}
            subtitle={t(
              'If you choose your plan, you will be able to manage your Offers here.'
            )}
            icon={noSubscriptionsIcon}
          />
        ) : (
          <>
            {subscriptions.map(subItem => {
              let description;
              let price;
              let currency;
              let nextPaymentDate;
              let expiresAtDate;
              switch (subItem.offerType) {
                case 'S':
                  price = subItem.nextPaymentPrice;
                  currency = subItem.nextPaymentCurrency;
                  nextPaymentDate = dateFormat(subItem.nextPaymentAt);
                  expiresAtDate = dateFormat(subItem.expiresAt);
                  description =
                    subItem.status === 'active'
                      ? `${t('Next payment is on {{nextPaymentDate}}', {
                          nextPaymentDate
                        })}`
                      : `${t('This plan will expire on {{expiresAtDate}}', {
                          expiresAtDate
                        })}`;
                  break;
                case 'P':
                  price = subItem.totalPrice;
                  currency = subItem.customerCurrency;
                  description = `${t('Expires on')} ${dateFormat(
                    subItem.expiresAt
                  )}`;
                  break;
                default:
                  break;
              }

              return (
                <SubscriptionStyled
                  key={subItem.offerId}
                  onClick={() => {
                    if (
                      subscriptions.length > 1 &&
                      subItem.offerType === 'S' &&
                      subItem.status === 'active'
                    )
                      setOfferToSwitch(subItem);
                  }}
                  cursorPointer={
                    subscriptions.length > 1 &&
                    subItem.status === 'active' &&
                    subItem.offerType === 'S'
                  }
                  isSelected={
                    subscriptions.length > 1 &&
                    offerToSwitch.offerId === subItem.offerId
                  }
                >
                  <OfferCard
                    period={subItem.period}
                    offerType={subItem.offerType}
                    title={subItem.offerTitle}
                    description={description}
                    currency={currencyFormat[currency]}
                    price={price}
                    isMyAccount
                    showInfoBox={this.showInfoBox(subItem)}
                    paymentMethod={subItem.paymentMethod}
                    onInfoBoxButtonClick={() => this.cancelDowngrading()}
                    infoBoxButtonText="Cancel switch"
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
                  {subItem.offerType === 'S' &&
                    supportedPaymentGateways.includes(
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
  switchesInProgress: PropTypes.objectOf(PropTypes.any),
  updateList: PropTypes.func.isRequired,
  t: PropTypes.func
};

CurrentPlan.defaultProps = {
  subscriptions: [],
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  switchesInProgress: [],
  t: k => k
};

export { CurrentPlan as PureCurrentPlan };

export default withTranslation()(labeling()(CurrentPlan));
