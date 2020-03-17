import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

// import Button from 'components/Button';
import Card from 'components/Card';

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
  InfoMessageStyled
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
          <Card withShadow>
            <InfoMessageStyled>
              {t('There are no subscriptions purchased yet.')}
            </InfoMessageStyled>
          </Card>
        ) : (
          <Card>
            {subscriptions.map(subItem => (
              <SubscriptionStyled key={subItem.offerId}>
                <SubscriptionInfoBoxStyled>
                  <SubscriptionIcon
                    color={periodMapper[subItem.period].color}
                    bg={periodMapper[subItem.period].bg}
                  >
                    {periodMapper[subItem.period].label}
                  </SubscriptionIcon>
                  <SubscriptionInfoStyled>
                    <SubscriptionTitleStyled>
                      {subItem.offerTitle}
                    </SubscriptionTitleStyled>
                    <SubscriptionNextPaymentStyled>
                      {t('Next payment is on')} {dateFormat(subItem.expiresAt)}
                    </SubscriptionNextPaymentStyled>
                  </SubscriptionInfoStyled>
                  <SubscriptionPriceStyled>
                    <SubscriptionPriceValueStyled>
                      {subItem.nextPaymentPrice}
                      {currencyFormat[subItem.nextPaymentCurrency]}
                    </SubscriptionPriceValueStyled>
                    <SubscriptionPricePeroidStyled>
                      {`/ ${t(periodMapper[subItem.period].peroid)}`}
                    </SubscriptionPricePeroidStyled>
                  </SubscriptionPriceStyled>
                </SubscriptionInfoBoxStyled>
                {/* <SubscriptionActionsStyled>
                  <Button variant="secondary">Unsubscribe</Button>
                  <Button>Apply Coupon</Button>
                </SubscriptionActionsStyled> */}
              </SubscriptionStyled>
            ))}
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
