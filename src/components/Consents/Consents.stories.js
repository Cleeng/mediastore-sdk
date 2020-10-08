import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import withMock from 'storybook-addon-mock';
import Consent from './Consents';

storiesOf('Checkout/Consents', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(withMock)
  .addDecorator(story => (
    <div
      style={{
        width: 400,
        backgroundColor: 'white',
        padding: '20px 20px 50px 20px'
      }}
    >
      {story()}
    </div>
  ))
  .add('All options', () => <Consent publisherId="933103327" />, {
    mockData: [
      {
        url: `${ENVIRONMENT_CONFIGURATION.API_URL}/publishers/933103327/consents`,
        method: 'GET',
        status: 200,
        response: {
          responseData: {
            consents: [
              {
                broadcasterId: 0,
                name: 'terms',
                version: '1',
                value: 'https://cleeng.com/cleeng-user-agreement',
                label: 'I accept the Terms and Conditions of Cleeng',
                required: true
              },
              {
                broadcasterId: 100258828,
                name: 'broadcaster_terms',
                version: '10',
                value: 'https://cleeng.com/privacy',
                label: 'I accept Terms and Conditions of Test Company.',
                required: true
              },
              {
                broadcasterId: 100258828,
                name: 'broadcaster_marketing',
                version: '9',
                value: 'Notify me about new cool product updates and use cases',
                label: 'Notify me about new cool product updates and use cases',
                required: false
              }
            ]
          },
          errors: []
        }
      }
    ]
  });
