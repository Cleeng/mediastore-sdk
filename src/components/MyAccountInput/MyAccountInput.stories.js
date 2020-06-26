import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import MyAccountInput from './MyAccountInput';

storiesOf('MyAccount/MyAccountInput', module)
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
    <MyAccountInput
      type={select('type', ['name', 'password', 'email'])}
      label={text('label', 'Enter your name')}
      disabled={boolean('disabled', false)}
      value={text('value', 'John')}
    />
  ));
