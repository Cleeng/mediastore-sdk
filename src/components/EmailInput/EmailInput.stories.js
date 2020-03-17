import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import EmailInput from './EmailInput';

const wrapperState = new Store({
  value: ''
});

const ERROR_MESSAGES = {
  noError: '',
  wrongFormat: 'The email address is not properly formatted.',
  fillField: 'Please fill out this field.'
};

storiesOf('Checkout/EmailInput', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white', paddingBottom: 20 }}>
      {story()}
    </div>
  ))
  .addDecorator(story => (
    <State store={wrapperState}>{state => story(state)}</State>
  ))
  .add('All options', state => (
    <EmailInput
      error={select('Error message', ERROR_MESSAGES)}
      value={state.value}
      onChange={e => wrapperState.set({ value: e })}
    />
  ));
