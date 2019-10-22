import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import Login from './Login';
import 'styles/index.scss';

storiesOf('Login', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('Temporary Login', () => (
    <Login onLoginComplete={action('onLoginComplete')} />
  ));
