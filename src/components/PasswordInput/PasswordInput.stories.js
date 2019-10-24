import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select } from '@storybook/addon-knobs';
import PasswordInput from './PasswordInput';

const ERROR_MESSAGES = {
  noError: '',
  wrongFormat:
    'Your password must contain at least 6 characters, including 1 digit.',
  fillField: 'Please fill out this field.'
};

storiesOf('PasswordInput', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white', paddingBottom: 20 }}>
      {story()}
    </div>
  ))
  .add('All options', () => (
    <PasswordInput error={select('Error message', ERROR_MESSAGES)} />
  ));
