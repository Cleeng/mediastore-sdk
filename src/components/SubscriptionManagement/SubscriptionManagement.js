import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { currencyFormat } from 'util/planHelper';

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
  t
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isCouponInputOpened, setIsCouponInputOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [couponValue, setCouponValue] = useState('');

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
              break;
            case 422:
              if (resp.errors.some(e => e.includes('not found')))
                setErrorMsg('Invalid coupon code.');
              if (resp.errors.some(e => e.includes('already')))
                setErrorMsg('Coupon already used');
              setIsError(true);
              setIsLoading(false);
              break;
            default:
              setErrorMsg('Invalid coupon code.');
              setIsError(true);
              setIsLoading(false);
              break;
          }
        })
        .catch(() => {
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
                showInnerPopup({
                  type: POPUP_TYPES.updateSubscription,
                  data: {
                    action: 'unsubscribe',
                    offerData: {
                      offerId: subscription.offerId,
                      expiresAt: subscription.expiresAt
                    }
                  }
                });
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
                      offerId: subscription.offerId,
                      expiresAt: subscription.expiresAt,
                      price: `${subscription.nextPaymentPrice}${
                        currencyFormat[subscription.nextPaymentCurrency]
                      }`
                    }
                  }
                });
              }}
            >
              {t('Resume')}
            </FullWidthButtonStyled>
          )}
          {subscription.status !== 'cancelled' && (
            <CouponWrapStyled>
              <CouponInput
                fullWidth
                showMessage={isError}
                value={couponValue}
                message={errorMsg}
                couponLoading={isLoading}
                onSubmit={() => submitCoupon(subscription.subscriptionId)}
                onChange={e => setCouponValue(e)}
                onClose={() => setIsCouponInputOpened(val => !val)}
                onInputToggle={() => setIsCouponInputOpened(val => !val)}
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
  updateList: PropTypes.func,
  showInnerPopup: PropTypes.func,
  showMessageBox: PropTypes.func,
  t: PropTypes.func
};

SubscriptionManagement.defaultProps = {
  subscription: {},
  updateList: () => {},
  showInnerPopup: () => {},
  showMessageBox: () => {},
  t: k => k
};

export { SubscriptionManagement as PureSubscriptionManagement };

export default withTranslation()(labeling()(SubscriptionManagement));
