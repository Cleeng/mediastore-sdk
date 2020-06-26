import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import Payment from './Payment';
import 'styles/index.scss';

storiesOf('Checkout/Payment', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('Basic Payment', () => <Payment onPaymentComplete={() => {}} />);
