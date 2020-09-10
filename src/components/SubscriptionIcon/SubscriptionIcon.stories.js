import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select } from '@storybook/addon-knobs';
import SubscriptionIcon from './SubscriptionIcon';

storiesOf('Common/SubscriptionIcon', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 200,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add('Default', () => (
    <SubscriptionIcon
      period={select('Period', [
        'default',
        'week',
        'month',
        '3months',
        '6months',
        'year'
      ])}
    />
  ));
