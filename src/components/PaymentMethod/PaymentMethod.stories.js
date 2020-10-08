import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { PurePaymentMethod } from './PaymentMethod';

const CARD = [
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

const PAYPAL = [
  {
    id: 666324682,
    customerId: 819605670,
    token: 'B-0NL91937JD123950W',
    paymentGateway: 'paypal',
    paymentMethod: 'paypal',
    paymentMethodSpecificParams: {
      payerId: 'D3RFTM8JLUTZQ',
      holderName: 'User  Name'
    },
    paymentMethodId: 996126615,
    active: true
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
  .add('Card', () => <PurePaymentMethod paymentDetails={CARD} />)
  .add('PayPal', () => <PurePaymentMethod paymentDetails={PAYPAL} />);
