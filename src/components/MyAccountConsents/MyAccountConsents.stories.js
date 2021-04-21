import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { PureMyAccountConsents } from './MyAccountConsents';

storiesOf('MyAccount/UpdateProfile/Consents', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 400,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Default', () => (
    <PureMyAccountConsents
      setConsents={() => {}}
      consents={[
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: false,
          state: 'declined',
          version: '2',
          needsUpdate: false,
          label: 'I accept the Terms and Conditions of Cleeng',
          value: 'I accept the Terms and Conditions of Cleeng',
          newestVersion: '2',
          date: 1588942073
        },
        {
          customerId: '338816933',
          name: 'broadcaster_terms',
          required: true,
          state: 'accepted',
          version: '3',
          needsUpdate: false,
          label: 'I accept Terms and Conditions of Test Company.',
          value: 'https://cleeng.com/privacy',
          newestVersion: '3',
          date: 1588942073
        },
        {
          customerId: '338816933',
          name: 'terms',
          required: true,
          state: 'accepted',
          version: '1',
          needsUpdate: false,
          label: 'Notify me about new cool product updates and use cases',
          value: 'https://cleeng.com/cleeng-user-agreement',
          newestVersion: '1',
          date: 1588942073
        }
      ]}
    />
  ));
