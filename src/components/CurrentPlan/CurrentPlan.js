/* eslint-disable no-nested-ternary */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import { dateFormat, currencyFormat } from 'util/planHelper';

import Loader from 'components/Loader';
import MyAccountError from 'components/MyAccountError';
import SubscriptionCard from 'components/SubscriptionCard';
import SubscriptionManagement from 'components/SubscriptionManagement';
import CouponInput from 'components/CouponInput';
import MessageBox from 'components/MessageBox';
import { applyCoupon } from 'api';

import {
  WrapStyled,
  SubscriptionStyled,
  SubscriptionActionsStyled,
  FullWidthButtonStyled,
  SimpleButtonStyled,
  CouponWrapStyled,
  StatusMessageWrapStyled
} from './CurrentPlanStyled';

class CurrentPlan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMessageBoxOpened: false,
      messageBoxType: null,
      messageBoxText: '',
      isErrorMessageShown: false,
      errorMessage: '',
      isCouponInputOpened: false,
      couponValue: ''
    };
  }

  submitCoupon = subscriptionId => {
    const { t, updateList } = this.props;
    const { couponValue } = this.state;

    this.resetErrorMessage();

    if (couponValue)
      applyCoupon(subscriptionId, couponValue)
        .then(resp => {
          switch (resp.status) {
            case 200:
              this.showMessageBox(
                'success',
                t('Your Coupon has been successfully reedemed.')
              );
              updateList();
              break;
            case 422:
              if (resp.errors.some(e => e.includes('not found')))
                this.showErrorMessage(t('Invalid coupon code.'));
              if (resp.errors.some(e => e.includes('already')))
                this.showErrorMessage(t('Coupon already used'));
              break;
            default:
              this.showErrorMessage(t('Invalid coupon code.'));
              break;
          }
        })
        .catch(() => {
          this.showErrorMessage('Ooops. Something went wrong.');
        });
    else {
      this.showErrorMessage(t('Please enter coupon code.'));
    }
  };

  onInputToggle = () => {
    this.setState({
      isCouponInputOpened: true
    });
  };

  resetErrorMessage = () => {
    this.setState({
      isErrorMessageShown: false
    });
  };

  showErrorMessage = message => {
    this.setState({
      isErrorMessageShown: true,
      errorMessage: message
    });
  };

  showMessageBox = (type, text) => {
    this.setState({
      messageBoxType: type,
      messageBoxText: text,
      isMessageBoxOpened: true
    });
  };

  render() {
    const {
      isMessageBoxOpened,
      isCouponInputOpened,
      isErrorMessageShown,
      messageBoxType,
      messageBoxText,
      errorMessage,
      couponValue
    } = this.state;

    const {
      subscriptions,
      isLoading,
      errors,
      showInnerPopup,
      setOfferToSwitch,
      offerToSwitch,
      isManagementBarOpen,
      t
    } = this.props;

    const areFewOffers = subscriptions.length > 1;
    return isLoading ? (
      <Loader isMyAccount />
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
                  />
                  {isMessageBoxOpened && (
                    <StatusMessageWrapStyled>
                      <MessageBox
                        type={messageBoxType}
                        message={messageBoxText}
                      />
                    </StatusMessageWrapStyled>
                  )}
                  <SubscriptionManagement
                    isOpened={isManagementBarOpen}
                    onClose={() =>
                      this.setState({ isCouponInputOpened: false })
                    }
                  >
                    <SubscriptionActionsStyled>
                      {subItem.status === 'active' && !isCouponInputOpened && (
                        <SimpleButtonStyled
                          theme="simple"
                          onClickFn={event => {
                            event.stopPropagation();
                            showInnerPopup({
                              type: 'updateSubscription',
                              data: {
                                action: 'unsubscribe',
                                offerData: {
                                  offerId: subItem.offerId,
                                  expiresAt: subItem.expiresAt
                                }
                              }
                            });
                          }}
                        >
                          {t('Unsubscribe')}
                        </SimpleButtonStyled>
                      )}
                      {subItem.status === 'cancelled' && !isCouponInputOpened && (
                        <FullWidthButtonStyled
                          theme="simple"
                          onClickFn={event => {
                            event.stopPropagation();
                            showInnerPopup({
                              type: 'updateSubscription',
                              data: {
                                action: 'resubscribe',
                                offerData: {
                                  offerId: subItem.offerId,
                                  expiresAt: subItem.expiresAt,
                                  price: `${subItem.nextPaymentPrice}${
                                    currencyFormat[subItem.nextPaymentCurrency]
                                  }`
                                }
                              }
                            });
                          }}
                        >
                          {t('Resume')}
                        </FullWidthButtonStyled>
                      )}
                      <CouponWrapStyled>
                        <CouponInput
                          fullWidth
                          showMessage={isErrorMessageShown}
                          value={couponValue}
                          message={errorMessage}
                          onSubmit={() =>
                            this.submitCoupon(subItem.subscriptionId)
                          }
                          onChange={e => this.setState({ couponValue: e })}
                          onClose={() =>
                            this.setState({ isCouponInputOpened: false })
                          }
                          onInputToggle={() => this.onInputToggle()}
                        />
                      </CouponWrapStyled>
                    </SubscriptionActionsStyled>
                  </SubscriptionManagement>
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
  isManagementBarOpen: PropTypes.bool,
  t: PropTypes.func
};

CurrentPlan.defaultProps = {
  subscriptions: [],
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  isManagementBarOpen: false,
  t: k => k
};

export { CurrentPlan as PureCurrentPlan };

export default withTranslation()(labeling()(CurrentPlan));
