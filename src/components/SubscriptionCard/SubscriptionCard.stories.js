import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select, text, number } from '@storybook/addon-knobs';
import SubscriptionCard from './SubscriptionCard';

storiesOf('Common/SubscriptionCard', module)
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
  .add('Default', () => (
    <SubscriptionCard
      period={select('Period', ['week', 'month', '3months', '6months', 'year'])}
      title={text('Title', 'Weekly subscription to Company')}
      description={text('Description', 'Some description for this offer')}
      currency={select('Currency', ['$', '€', 'PLN'])}
      price={number('Price', 20)}
    />
  ));
