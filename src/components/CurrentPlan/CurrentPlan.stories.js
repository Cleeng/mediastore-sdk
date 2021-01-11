import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { PureCurrentPlan as CurrentPlan } from './CurrentPlan';

const SUBSCRIPTIONMOCK = [
  {
    offerId: 'S582933870_ZW',
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
const showStory = false;
if (showStory) {
  storiesOf('MyAccount/PlanDetails/CurrentPlan', module)
    .addDecorator(withKnobs)
    .addDecorator(jsxDecorator)
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
      <CurrentPlan
        subscriptions={SUBSCRIPTIONMOCK}
        isLoading={boolean('isLoading', false)}
        setOfferToSwitch={() => {}}
        showInnerPopup={() => {}}
      />
    ))
    .add('No subscription', () => (
      <CurrentPlan
        subscriptions={[]}
        isLoading={false}
        setOfferToSwitch={() => {}}
        showInnerPopup={() => {}}
      />
    ));
}
