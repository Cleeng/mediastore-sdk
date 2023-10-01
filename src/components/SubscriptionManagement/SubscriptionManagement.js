import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { currencyFormat } from 'util/planHelper';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setOfferToSwitch, updateList } from 'redux/planDetailsSlice';
import { useTranslation } from 'react-i18next';
import { applyCoupon } from 'api';
import CouponInput from 'components/CouponInput';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { showPopup } from 'redux/popupSlice';
import { useAppSelector } from 'redux/store';
import { selectOrder } from 'redux/orderSlice';
import eventDispatcher, {
  MSSDK_COUPON_FAILED,
  MSSDK_COUPON_SUCCESSFUL
} from 'util/eventDispatcher';
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

const SubscriptionManagement = ({ subscription, showMessageBox }) => {
  const { pauseOffersIDs } = useSelector(store => store.offers);
  const { data: switchSettings } = useSelector(
    store => store.plan.switchSettings
  );
  const { order } = useAppSelector(selectOrder);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isCouponInputOpened, setIsCouponInputOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [couponValue, setCouponValue] = useState('');
  const isPaused = pauseOffersIDs.includes(subscription.offerId);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitCoupon = subscriptionId => {
    if (couponValue) {
      setIsLoading(true);
      applyCoupon(subscriptionId, couponValue)
        .then(resp => {
          switch (resp.status) {
            case 200:
              setIsCouponInputOpened(false);
              setIsLoading(false);
              dispatch(updateList());
              showMessageBox(
                'success',
                t(
                  'subscription-management.coupon-redeemed',
                  'Your Coupon has been successfully reedemed.'
                ),
                subscriptionId
              );
              eventDispatcher(MSSDK_COUPON_SUCCESSFUL, {
                detail: {
                  coupon: couponValue,
                  source: 'myaccount'
                },
                order
              });
              break;
            case 422:
              if (resp.errors.some(e => e.includes('not found')))
                setErrorMsg(
                  t(
                    'subscription-management.invalid-coupon',
                    'Invalid coupon code.'
                  )
                );
              if (resp.errors.some(e => e.includes('already')))
                setErrorMsg(
                  t(
                    'subscription-management.coupon-already-used',
                    'Coupon already used'
                  )
                );
              setIsError(true);
              setIsLoading(false);
              eventDispatcher(MSSDK_COUPON_FAILED, {
                detail: {
                  coupon: couponValue,
                  source: 'myaccount'
                }
              });
              break;
            default:
              setErrorMsg(
                t(
                  'subscription-management.invalid-coupon',
                  'Invalid coupon code.'
                )
              );
              setIsError(true);
              setIsLoading(false);
              break;
          }
        })
        .catch(() => {
          eventDispatcher(MSSDK_COUPON_FAILED, {
            detail: {
              coupon: couponValue,
              source: 'myaccount'
            }
          });
          setErrorMsg(
            t('oops-something-went-wrong', 'Oops! Something went wrong.')
          );
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      setErrorMsg(
        t('subscription-management.enter-coupon', 'Please enter coupon code.')
      );
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
            {t('subscription-management.manage-button', 'Manage')}
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
                dispatch(setOfferToSwitch(subscription));
                dispatch(
                  showPopup({
                    type: POPUP_TYPES.updateSubscription,
                    data: {
                      action: 'unsubscribe',
                      offerData: {
                        ...subscription
                      }
                    }
                  })
                );
                window.dispatchEvent(
                  new CustomEvent('MSSDK:unsubscribe-button-clicked', {
                    detail: {
                      offerId: subscription.offerId
                    }
                  })
                );
              }}
            >
              {t('subscription-management.unsubscribe-button', 'Unsubscribe')}
            </SimpleButtonStyled>
          )}
          {subscription.status === 'cancelled' && !isCouponInputOpened && (
            <FullWidthButtonStyled
              theme="simple"
              onClickFn={event => {
                event.stopPropagation();
                dispatch(
                  showPopup({
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
                  })
                );
                window.dispatchEvent(
                  new CustomEvent('MSSDK:resume-button-clicked', {
                    detail: {
                      offerId: subscription.offerId
                    }
                  })
                );
              }}
            >
              {t('subscription-management.resume-button', 'Resume')}
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
                value={couponValue}
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
                dispatch(
                  showPopup({
                    type: POPUP_TYPES.resumeSubscription,
                    data: {
                      offerData: {
                        ...switchSettings[subscription?.offerId].available[0]
                      }
                    }
                  })
                );
              }}
            >
              {t(
                'subscription-management.resume-subscription-button',
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
  showMessageBox: PropTypes.func
};

SubscriptionManagement.defaultProps = {
  subscription: {},
  showMessageBox: () => null
};

export { SubscriptionManagement as PureSubscriptionManagement };

export default SubscriptionManagement;
