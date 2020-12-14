/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import { dateFormat, currencyFormat } from 'util/planHelper';

import Loader from 'components/Loader';
import MyAccountError from 'components/MyAccountError';
import SubscriptionCard from 'components/SubscriptionCard';

import {
  WrapStyled,
  SubscriptionStyled,
  SubscriptionActionsStyled,
  FullWidthButtonStyled,
  SimpleButtonStyled
} from './CurrentPlanStyled';

const CurrentPlan = ({
  subscriptions,
  isLoading,
  errors,
  showInnerPopup,
  setOfferToSwitch,
  offerToSwitch,
  t
}) => {
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
                  price={Math.round(subItem.nextPaymentPrice * 100) / 100}
                />
                <SubscriptionActionsStyled>
                  {subItem.status === 'active' && (
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
                  {subItem.status === 'cancelled' && (
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
                </SubscriptionActionsStyled>
              </SubscriptionStyled>
            );
          })}
        </>
      )}
    </WrapStyled>
  );
};

CurrentPlan.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.any),
  isLoading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  setOfferToSwitch: PropTypes.func.isRequired,
  offerToSwitch: PropTypes.objectOf(PropTypes.any),
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
