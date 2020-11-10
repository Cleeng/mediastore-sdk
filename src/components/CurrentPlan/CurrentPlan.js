/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import Loader from 'components/Loader';
import MyAccountError from 'components/MyAccountError';
import { dateFormat, currencyFormat } from 'util/planHelper';
import SubscriptionCard from 'components/SubscriptionCard';
import roundNumber from 'util/roundNumber';
import {
  WrapStyled,
  SubscriptionStyled,
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
          {subscriptions.map(subItem => {
            const description = `${
              subItem.status === 'active'
                ? t('Next payment is on')
                : t('This plan will expire on')
            } ${dateFormat(subItem.expiresAt)}`;
            return (
              <SubscriptionStyled key={subItem.offerId}>
                <SubscriptionCard
                  period={subItem.period}
                  title={subItem.offerTitle}
                  description={description}
                  currency={currencyFormat[subItem.nextPaymentCurrency]}
                  price={roundNumber(subItem.nextPaymentPrice)}
                />
                <SubscriptionActionsStyled>
                  {subItem.status === 'active' && (
                    <UnsubscribeButtonStyled
                      theme="simple"
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
                      theme="simple"
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
