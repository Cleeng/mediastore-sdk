import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { PurePaymentMethod as PaymentMethod } from './PaymentMethod';

const PAYMENTDETAILS = [
  {
    id: 680860225,
    customerId: 338816933,
    token: '8315815183716450',
    paymentGateway: 'adyen',
    paymentMethod: 'card',
    paymentMethodSpecificParams: {
      variant: 'mc',
      lastCardFourDigits: '1111',
      holderName: 'Sample card',
      cardExpirationDate: '10/2020',
      socialSecurityNumber: ''
    },
    paymentMethodId: null
  }
];
storiesOf('MyAccount/PaymentInfo/PaymentMethod', module)
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
  .add('PaymentMethod', () => <PaymentMethod paymentDetails={PAYMENTDETAILS} />)
  .add('No payment method', () => <PaymentMethod paymentDetails={[]} />);
