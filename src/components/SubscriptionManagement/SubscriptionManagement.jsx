import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyCoupon } from 'api';
import { setOfferToSwitch, updateList } from 'appRedux/planDetailsSlice';
import { showPopup, POPUP_TYPES } from 'appRedux/popupSlice';
import { currencyFormat } from 'util/planHelper';
import Button from 'components/Button';
import CouponInput from 'components/CouponInput';
import { getData } from 'util/appConfigHelper';
import trackMixpanelEvent from 'util/trackMixpanelEvent';

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
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isCouponInputOpened, setIsCouponInputOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [couponValue, setCouponValue] = useState('');

  const userId = getData('CLEENG_CUSTOMER_ID');
  const publisherId = getData('CLEENG_PUBLISHER_ID');
  const {
    offerId,
    offerTitle,
    nextPaymentPrice: offerPrice,
    nextPaymentCurrency: offerCurrency,
    status,
    subscriptionId
  } = subscription;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitCoupon = (targetSubscriptionId) => {
    if (couponValue) {
      setIsLoading(true);
      applyCoupon(targetSubscriptionId, couponValue)
        .then((resp) => {
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
                targetSubscriptionId
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
              if (
                resp.errors.some(
                  (e) =>
                    e.includes('not found') ||
                    e.includes('cannot be applied on this offer') ||
                    e.includes('cannot be applied on existing subscription') ||
                    e.includes('reserved')
                )
              ) {
                setErrorMsg(
                  t(
                    'subscription-management.invalid-coupon',
                    'Invalid coupon code.'
                  )
                );
              }
              if (resp.errors.some((e) => e.includes('already applied'))) {
                setErrorMsg(
                  t(
                    'subscription-management.coupon-already-applied',
                    'Coupon already applied'
                  )
                );
              }
              if (resp.errors.some((e) => e.includes('already used'))) {
                setErrorMsg(
                  t(
                    'subscription-management.coupon-already-used',
                    'Coupon already used'
                  )
                );
              }

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
          window.dispatchEvent(
            new CustomEvent('MSSDK:redeem-coupon-failed', {
              detail: {
                coupon: couponValue,
                source: 'myaccount'
              }
            })
          );
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

  const toggle = (e) => {
    e.stopPropagation();
    setIsOptionsVisible((isVisible) => !isVisible);
  };

  return (
    <SubscriptionManagementStyled>
      <ManageButtonWrapStyled>
        <Button variant='simple' width='unset' onClickFn={(e) => toggle(e)}>
          <ButtonTextStyled $isExpanded={isOptionsVisible}>
            {t('subscription-management.manage-button', 'Manage')}
          </ButtonTextStyled>
        </Button>
      </ManageButtonWrapStyled>
      <SubscriptionActionsStyled $isOpened={isOptionsVisible}>
        <WrapperStyled>
          {status === 'active' && !isCouponInputOpened && (
            <SimpleButtonStyled
              variant='simple'
              onClickFn={(event) => {
                event.stopPropagation();

                dispatch(setOfferToSwitch(subscription));
                dispatch(
                  showPopup({
                    type: POPUP_TYPES.UPDATE_SUBSCRIPTION_POPUP,
                    data: {
                      action: 'unsubscribe',
                      offerData: subscription
                    }
                  })
                );

                window.dispatchEvent(
                  new CustomEvent('MSSDK:unsubscribe-button-clicked', {
                    detail: {
                      offerId
                    }
                  })
                );
                trackMixpanelEvent('Unsubscribe Attempt', {
                  distinct_id: userId,
                  publisherId,
                  offerId,
                  offerTitle,
                  offerPrice,
                  offerCurrency
                });
              }}
            >
              {t('subscription-management.unsubscribe-button', 'Unsubscribe')}
            </SimpleButtonStyled>
          )}
          {status === 'cancelled' && !isCouponInputOpened && (
            <FullWidthButtonStyled
              variant='simple'
              onClickFn={(event) => {
                event.stopPropagation();
                dispatch(
                  showPopup({
                    type: POPUP_TYPES.UPDATE_SUBSCRIPTION_POPUP,
                    data: {
                      action: 'resubscribe',
                      offerData: {
                        ...subscription,
                        price: `${offerPrice}${currencyFormat[offerCurrency]}`
                      }
                    }
                  })
                );
                window.dispatchEvent(
                  new CustomEvent('MSSDK:resume-button-clicked', {
                    detail: {
                      offerId
                    }
                  })
                );
              }}
            >
              {t('subscription-management.resume-button', 'Resume')}
            </FullWidthButtonStyled>
          )}
          {status !== 'cancelled' && (
            <CouponWrapStyled>
              <CouponInput
                couponDetails={{
                  showMessage: isError,
                  message: errorMsg
                }}
                fullWidth
                value={couponValue}
                couponLoading={isLoading}
                onSubmit={() => submitCoupon(subscriptionId)}
                onChange={(e) => setCouponValue(e)}
                onClose={() => setIsCouponInputOpened((val) => !val)}
                onInputToggle={() => setIsCouponInputOpened((val) => !val)}
                source='myaccount'
              />
            </CouponWrapStyled>
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
