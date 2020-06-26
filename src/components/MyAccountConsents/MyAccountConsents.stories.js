import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import MyAccountConsents from './MyAccountConsents';

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
    <MyAccountConsents
      consents={[
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: false,
          state: 'declined',
          version: '2',
          needsUpdate: false,
          label:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          value:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
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
          label:
            'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
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
          label:
            'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
          value: 'https://cleeng.com/cleeng-user-agreement',
          newestVersion: '1',
          date: 1588942073
        }
      ]}
    />
  ));
