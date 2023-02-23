import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { currencyFormat } from 'util/planHelper';

import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { applyCoupon } from 'api';
import CouponInput from 'components/CouponInput';
import { POPUP_TYPES } from 'redux/innerPopupReducer';

import {
  SubscriptionManagementStyled,
  ManageButtonWrapStyled,
  SubscriptionActionsStyled,
  ButtonTextStyled,
  WrapperStyled,
  SimpleButtonStyled,
  FullWidthButtonStyled,
  CouponWrapStyled
} from './SubscriptionManagementStyled';

const SubscriptionManagement = ({
  subscription,
  updateList,
  showInnerPopup,
  showMessageBox,
  setOfferToSwitch,
  t
}) => {
  const { pauseOffersIDs } = useSelector(store => store.offers);
  const { switchSettings } = useSelector(store => store.planDetails);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isCouponInputOpened, setIsCouponInputOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [couponValue, setCouponValue] = useState('');
  const isPaused = pauseOffersIDs.includes(subscription.offerId);

  const submitCoupon = subscriptionId => {
    if (couponValue) {
      setIsLoading(true);
      applyCoupon(subscriptionId, couponValue)
        .then(resp => {
          switch (resp.status) {
            case 200:
              setIsCouponInputOpened(false);
              setIsLoading(false);
              updateList();
              showMessageBox(
                'success',
                t('Your Coupon has been successfully reedemed.'),
                subscriptionId
              );
              window.dispatchEvent(
                new CustomEvent('MSSDK:redeem-coupon-success', {
                  detail: {
                    coupon: couponValue,
                    source: 'myaccount'
                  }
                })
              );
              break;
            case 422:
              if (resp.errors.some(e => e.includes('not found')))
                setErrorMsg('Invalid coupon code.');
              if (resp.errors.some(e => e.includes('already')))
                setErrorMsg('Coupon already used');
              setIsError(true);
              setIsLoading(false);
              window.dispatchEvent(
                new CustomEvent('MSSDK:redeem-coupon-failed', {
                  detail: {
                    coupon: couponValue,
                    source: 'myaccount'
                  }
                })
              );
              break;
            default:
              setErrorMsg('Invalid coupon code.');
              setIsError(true);
              setIsLoading(false);
              break;
          }
        })
        .catch(() => {
          window.dispatchEvent(
            new CustomEvent('MSSDK:redeem-coupon-failed', {
              detail: {
                coupon: couponValue,
                source: 'myaccount'
              }
            })
          );
          setErrorMsg('Ooops. Something went wrong.');
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      setErrorMsg('Please enter coupon code.');
      setIsError(true);
    }
  };

  const toggle = e => {
    e.stopPropagation();
    setIsOptionsVisible(isVisible => !isVisible);
  };

  return (
    <SubscriptionManagementStyled>
      <ManageButtonWrapStyled>
        <Button theme="simple" width="unset" onClickFn={e => toggle(e)}>
          <ButtonTextStyled isExpanded={isOptionsVisible}>
            {t('Manage')}
          </ButtonTextStyled>
        </Button>
      </ManageButtonWrapStyled>
      <SubscriptionActionsStyled isOpened={isOptionsVisible}>
        <WrapperStyled>
          {subscription.status === 'active' && !isCouponInputOpened && (
            <SimpleButtonStyled
              theme="simple"
              onClickFn={event => {
                event.stopPropagation();
                setOfferToSwitch(subscription);
                showInnerPopup({
                  type: POPUP_TYPES.updateSubscription,
                  data: {
                    action: 'unsubscribe',
                    offerData: {
                      ...subscription
                    }
                  }
                });
                window.dispatchEvent(
                  new CustomEvent('MSSDK:unsubscribe-button-clicked', {
                    detail: {
                      offerId: subscription.offerId
                    }
                  })
                );
              }}
            >
              {t('Unsubscribe')}
            </SimpleButtonStyled>
          )}
          {subscription.status === 'cancelled' && !isCouponInputOpened && (
            <FullWidthButtonStyled
              theme="simple"
              onClickFn={event => {
                event.stopPropagation();
                showInnerPopup({
                  type: POPUP_TYPES.updateSubscription,
                  data: {
                    action: 'resubscribe',
                    offerData: {
                      ...subscription,
                      price: `${subscription.nextPaymentPrice}${
                        currencyFormat[subscription.nextPaymentCurrency]
                      }`
                    }
                  }
                });
                window.dispatchEvent(
                  new CustomEvent('MSSDK:resume-button-clicked', {
                    detail: {
                      offerId: subscription.offerId
                    }
                  })
                );
              }}
            >
              {t('Resume')}
            </FullWidthButtonStyled>
          )}
          {subscription.status !== 'cancelled' && !isPaused && (
            <CouponWrapStyled>
              <CouponInput
                couponDetails={{
                  showMessage: isError,
                  message: errorMsg
                }}
                fullWidth
                showMessage={isError}
                value={couponValue}
                message={errorMsg}
                couponLoading={isLoading}
                onSubmit={() => submitCoupon(subscription.subscriptionId)}
                onChange={e => setCouponValue(e)}
                onClose={() => setIsCouponInputOpened(val => !val)}
                onInputToggle={() => setIsCouponInputOpened(val => !val)}
                source="myaccount"
              />
            </CouponWrapStyled>
          )}
          {isPaused && (
            <SimpleButtonStyled
              theme="primary"
              onClickFn={event => {
                event.stopPropagation();
                showInnerPopup({
                  type: POPUP_TYPES.resumeSubscription,
                  data: {
                    offerData: {
                      ...switchSettings[subscription?.offerId].available[0]
                    }
                  }
                });
              }}
            >
              {t(
                'subscription-management.resume-button',
                'Resume subscription'
              )}
            </SimpleButtonStyled>
          )}
        </WrapperStyled>
      </SubscriptionActionsStyled>
    </SubscriptionManagementStyled>
  );
};

SubscriptionManagement.propTypes = {
  subscription: PropTypes.objectOf(PropTypes.any),
  updateList: PropTypes.func,
  showInnerPopup: PropTypes.func,
  showMessageBox: PropTypes.func,
  t: PropTypes.func,
  setOfferToSwitch: PropTypes.func
};

SubscriptionManagement.defaultProps = {
  subscription: {},
  updateList: () => {},
  showInnerPopup: () => {},
  showMessageBox: () => {},
  t: k => k,
  setOfferToSwitch: () => {}
};

export { SubscriptionManagement as PureSubscriptionManagement };

export default withTranslation()(labeling()(SubscriptionManagement));
