import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as noSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
// import Button from 'components/Button';
import Card from 'components/Card';
import MyAccountError from 'components/MyAccountError/MyAccountError';
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
  SubscriptionPriceStyled
  // SubscriptionActionsStyled
} from './CurrentPlanStyled';

class CurrentPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { subscriptions, t } = this.props;

    return (
      <WrapStyled>
        {subscriptions.length === 0 ? (
          <MyAccountError
            title={t('No subscriptions yet!')}
            subtitle={t(
              'If you choose your plan, you will be able to manage your Subscriptions here.'
            )}
            icon={noSubscriptionsIcon}
          />
        ) : (
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
                        {t('Next payment is on')}{' '}
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
                  {/* <SubscriptionActionsStyled>
                  <Button theme="secondary" size="small">Unsubscribe</Button>
                  <Button>Apply Coupon</Button>
                </SubscriptionActionsStyled> */}
                </SubscriptionStyled>
              );
            })}
          </Card>
        )}
      </WrapStyled>
    );
  }
}

CurrentPlan.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.any),
  t: PropTypes.func
};

CurrentPlan.defaultProps = {
  subscriptions: [],
  t: k => k
};

export { CurrentPlan as PureCurrentPlan };

export default withTranslation()(labeling()(CurrentPlan));
