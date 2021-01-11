import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import Price from './Price';

storiesOf('Common/Price', module)
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
    <Price
      currency={text('Currency', '$')}
      price={number('Price', '20')}
      period={text('Period', 'month')}
    />
  ));
