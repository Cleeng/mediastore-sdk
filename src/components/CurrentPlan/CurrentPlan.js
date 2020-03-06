import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from 'components/Button';

import { periodMapper, dateFormat, currencyFormat } from './helpers';

import {
  WrapStyled,
  SubscriptionsStyled,
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
    const { subscriptions } = this.props;

    return (
      <WrapStyled>
        <SubscriptionsStyled>
          {subscriptions.length === 0 ? (
            <InfoMessageStyled>
              There is no subscriptions purchuased yet.
            </InfoMessageStyled>
          ) : (
            <>
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
                        Next Payment {dateFormat(subItem.expiresAt)}
                      </SubscriptionNextPaymentStyled>
                    </SubscriptionInfoStyled>
                    <SubscriptionPriceStyled>
                      <SubscriptionPriceValueStyled>
                        {subItem.nextPaymentPrice}
                        {currencyFormat[subItem.nextPaymentCurrency]}
                      </SubscriptionPriceValueStyled>
                      <SubscriptionPricePeroidStyled>
                        {`/ ${periodMapper[subItem.period].peroid}`}
                      </SubscriptionPricePeroidStyled>
                    </SubscriptionPriceStyled>
                  </SubscriptionInfoBoxStyled>
                  {/* <SubscriptionActionsStyled>
                  <Button variant="secondary">Unsubscribe</Button>
                  <Button>Apply Coupon</Button>
                </SubscriptionActionsStyled> */}
                </SubscriptionStyled>
              ))}
            </>
          )}
        </SubscriptionsStyled>
      </WrapStyled>
    );
  }
}

export default CurrentPlan;

CurrentPlan.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.any)
};

CurrentPlan.defaultProps = {
  subscriptions: []
};
