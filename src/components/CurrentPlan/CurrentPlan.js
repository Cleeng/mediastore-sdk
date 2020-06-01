/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import Card from 'components/Card';
import Loader from 'components/Loader';
import MyAccountError from 'components/MyAccountError';
import { periodMapper, dateFormat, currencyFormat } from './helpers';

import {
  WrapStyled,
  SubscriptionStyled,
  SubscriptionInfoBoxStyled,
  SubscriptionIcon,
  SubscriptionInfoStyled,
  SubscriptionTitleStyled,
  SubscriptionNextPaymentStyled,
  SubscriptionPriceValueStyled,
  SubscriptionPricePeroidStyled,
  SubscriptionPriceStyled,
  SubscriptionActionsStyled,
  ResubscribeButtonStyled,
  UnsubscribeButtonStyled
} from './CurrentPlanStyled';

const CurrentPlan = ({
  subscriptions,
  currentPlanLoading,
  errors,
  showSurvey,
  setUpdateAction,
  t
}) => {
  return currentPlanLoading ? (
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
          <Card>
            {subscriptions.map(subItem => {
              const { color, bg, label, peroid } =
                periodMapper[subItem.period] || periodMapper.default;
              return (
                <SubscriptionStyled key={subItem.offerId}>
                  <SubscriptionInfoBoxStyled>
                    <SubscriptionIcon color={color || null} bg={bg || null}>
                      {label || ''}
                    </SubscriptionIcon>
                    <SubscriptionInfoStyled>
                      <SubscriptionTitleStyled>
                        {subItem.offerTitle}
                      </SubscriptionTitleStyled>
                      <SubscriptionNextPaymentStyled>
                        {subItem.status === 'active'
                          ? t('Next payment is on')
                          : t('This plan will expire on')}{' '}
                        {dateFormat(subItem.expiresAt)}
                      </SubscriptionNextPaymentStyled>
                    </SubscriptionInfoStyled>
                    <SubscriptionPriceStyled>
                      <SubscriptionPriceValueStyled>
                        {subItem.nextPaymentPrice}
                        {currencyFormat[subItem.nextPaymentCurrency]}
                      </SubscriptionPriceValueStyled>
                      <SubscriptionPricePeroidStyled>
                        {`/ ${t(peroid)}`}
                      </SubscriptionPricePeroidStyled>
                    </SubscriptionPriceStyled>
                  </SubscriptionInfoBoxStyled>
                  <SubscriptionActionsStyled>
                    {subItem.status === 'active' && (
                      <UnsubscribeButtonStyled
                        theme="simple"
                        size="small"
                        fontWeight="700"
                        onClickFn={() => {
                          setUpdateAction('unsubscribe');
                          showSurvey({
                            offerId: subItem.offerId,
                            expiresAt: subItem.expiresAt
                          });
                        }}
                      >
                        {t('Unsubscribe')}
                      </UnsubscribeButtonStyled>
                    )}
                    {subItem.status === 'cancelled' && (
                      <ResubscribeButtonStyled
                        theme="secondary"
                        size="small"
                        fontWeight="700"
                        onClickFn={() => {
                          setUpdateAction('resubscribe');
                          showSurvey({
                            offerId: subItem.offerId,
                            expiresAt: subItem.expiresAt,
                            price: `${subItem.nextPaymentPrice}${
                              currencyFormat[subItem.nextPaymentCurrency]
                            }`
                          });
                        }}
                      >
                        {t('Resubscribe')}
                      </ResubscribeButtonStyled>
                    )}

                    {/* <Button theme="secondary" size="small" fontWeight="700">
                      Apply Coupon
                    </Button> */}
                  </SubscriptionActionsStyled>
                </SubscriptionStyled>
              );
            })}
          </Card>
        </>
      )}
    </WrapStyled>
  );
};

CurrentPlan.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.any),
  setUpdateAction: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.any),
  showSurvey: PropTypes.func.isRequired,
  currentPlanLoading: PropTypes.bool,
  t: PropTypes.func
};

CurrentPlan.defaultProps = {
  subscriptions: [],
  errors: [],
  currentPlanLoading: false,
  t: k => k
};

export { CurrentPlan as PureCurrentPlan };

export default withTranslation()(labeling()(CurrentPlan));
