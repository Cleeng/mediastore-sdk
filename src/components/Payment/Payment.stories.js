import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import withMock from 'storybook-addon-mock';
import Payment from './Payment';
import 'styles/index.scss';

storiesOf('Checkout/Payment', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(withMock)
  .add('Basic Payment', () => <Payment onPaymentComplete={() => {}} />, {
    mockData: [
      {
        url: `${ENVIRONMENT_CONFIGURATION.API_URL}/payment-methods`,
        method: 'GET',
        status: 200,
        response: {
          responseData: {
            paymentMethods: [
              {
                id: 881885683,
                methodName: 'card',
                logoUrl: ''
              },
              {
                id: 386925084,
                methodName: 'paypal',
                logoUrl: ''
              }
            ],
            message: 'Payment method settings for publisher 105664357',
            status: 200
          },
          errors: []
        }
      }
    ]
  });
