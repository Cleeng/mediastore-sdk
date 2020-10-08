import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import withMock from 'storybook-addon-mock';

import { PureUpdateSubscription } from './UpdateSubscription';

storiesOf('MyAccount/PlanDetails/UpdateSubscription', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(withMock)
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
      offerDetails={{ price: '10$', expiresAt: 1588942729 }}
    />
  ))
  .add('Resubscribe', () => (
    <PureUpdateSubscription
      action="resubscribe"
      offerDetails={{ price: '10$', expiresAt: 1588942729 }}
    />
  ));
