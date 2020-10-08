import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import PasswordInput from './PasswordInput';

const wrapperState = new Store({
  value: '',
  showPassword: false
});

const ERROR_MESSAGES = {
  noError: '',
  wrongFormat:
    'Your password must contain at least 8 characters, including 1 digit.',
  fillField: 'Please fill out this field.'
};

storiesOf('Checkout/PasswordInput', module)
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
    <PasswordInput
      handleClickShowPassword={() =>
        wrapperState.set({ showPassword: !state.showPassword })
      }
      error={select('Error message', ERROR_MESSAGES)}
      value={state.value}
      onChange={e => wrapperState.set({ value: e })}
      showVisibilityIcon={boolean('showVisibilityIcon', true)}
      showPassword={state.showPassword || boolean('showPassword', false)}
      showPasswordStrength={boolean('showPasswordStrength', false)}
    />
  ));
