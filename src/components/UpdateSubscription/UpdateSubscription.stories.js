import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import UpdateSubscription from './UpdateSubscription';

storiesOf('MyAccount/PlanDetails/UpdateSubscription', module)
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
  .add('Unsubscribe', () => (
    <UpdateSubscription
      action="unsubscribe"
      offerDetails={{ price: '10$', expiresAt: 1588942729 }}
    />
  ))
  .add('Resubscribe', () => (
    <UpdateSubscription
      action="resubscribe"
      offerDetails={{ price: '10$', expiresAt: 1588942729 }}
    />
  ));
