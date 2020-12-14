import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { PureSubscriptionSwitchesList as SubscriptionSwitchesList } from './SubscriptionSwitchesList';

const SUBSCRIPTIONMOCK = [
  {
    offerId: 'S582933670_ZW',
    status: 'active',
    expiresAt: 1587035728,
    nextPaymentPrice: 2.7,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'card',
    offerTitle: 'Monthly subscription to pride&prejudice',
    period: 'month'
  }
];
storiesOf('MyAccount/PlanDetails/SubscriptionSwitchesList', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 600,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Switches List', () => (
    <SubscriptionSwitchesList
      isOfferSelected
      subscriptions={SUBSCRIPTIONMOCK}
      switchSettings={[
        {
          toOfferId: 'S717351387_PL',
          switchDirection: 'downgrade',
          title: 'Monthly subscription to Sport TV',
          price: 10,
          currency: 'USD',
          currencySymbol: '$',
          period: 'month'
        },
        {
          toOfferId: 'S732952456_MN',
          switchDirection: 'upgrade',
          title: 'Annual subscription to Sport TV',
          price: 90,
          currency: 'USD',
          currencySymbol: '$',
          period: 'year'
        }
      ]}
    />
  ));
