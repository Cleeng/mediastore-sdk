import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import { PureAdyen } from './Adyen';
import 'styles/index.scss';

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
  .add('Default', () => <PureAdyen onSubmit={action('onSubmit')} />);
