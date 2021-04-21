import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { PureUpdateSubscription } from './UpdateSubscription';

const showStory = false;
if (showStory) {
  storiesOf('MyAccount/PlanDetails/UpdateSubscription', module)
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
    .add('Unsubscribe', () => (
      <PureUpdateSubscription
        action="unsubscribe"
        updateList={() => {}}
        offerDetails={{
          offerId: 'S568296139_ZW',
          status: 'active',
          expiresAt: 1615897260,
          nextPaymentPrice: 22.15,
          nextPaymentCurrency: 'EUR',
          paymentGateway: 'adyen',
          paymentMethod: 'card',
          offerTitle: 'Annual subscription to Sport TV',
          period: 'year',
          totalPrice: 90
        }}
        hideInnerPopup={() => {}}
      />
    ))
    .add('Resubscribe', () => (
      <PureUpdateSubscription
        action="resubscribe"
        updateList={() => {}}
        hideInnerPopup={() => {}}
        offerDetails={{
          offerId: 'S568296139_ZW',
          status: 'cancelled',
          expiresAt: 1615897260,
          nextPaymentPrice: 22.15,
          nextPaymentCurrency: 'EUR',
          paymentGateway: 'adyen',
          paymentMethod: 'card',
          offerTitle: 'Annual subscription to Sport TV',
          period: 'year',
          totalPrice: 90
        }}
      />
    ));
}
