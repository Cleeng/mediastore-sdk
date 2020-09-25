import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import Adyen from './Adyen';
import 'styles/index.scss';
import CreditCardExample from './util/CreditCardExample';

storiesOf('Checkout/Adyen', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40
      }}
    >
      {story()}
    </div>
  ))
  .add('With Sample Card', () => (
    <>
      <Adyen onSubmit={action('onSubmit')} />
      <CreditCardExample />
    </>
  ));
