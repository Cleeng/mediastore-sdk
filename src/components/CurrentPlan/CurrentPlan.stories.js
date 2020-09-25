import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { PureCurrentPlan as CurrentPlan } from './CurrentPlan';

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
storiesOf('MyAccount/PlanDetails/CurrentPlan', module)
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
  .add('Active subscription', () => (
    <CurrentPlan subscriptions={SUBSCRIPTIONMOCK}>
      Default CurrentPlan
    </CurrentPlan>
  ));
