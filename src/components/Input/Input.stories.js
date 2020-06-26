import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import { State, Store } from '@sambego/storybook-state';
import 'styles/index.scss';
import Input from './Input';

const wrapperState = new Store({
  value: ''
});

const inputTypes = {
  text: 'text',
  email: 'email',
  password: 'password'
};

storiesOf('Checkout/Input', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <State store={wrapperState}>{state => story(state)}</State>
  ))
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white', padding: '20px 0' }}>
      {story()}
    </div>
  ))
  .add('All options', state => (
    <Input
      type={select('type', inputTypes)}
      placeholder={text('placeholder', 'Type here...')}
      onSubmit={async () => action('onSubmit')}
      value={state.value}
      onChange={e => wrapperState.set({ value: e })}
      error={text('error', '')}
      showVisibilityIcon={boolean('showVisibilityIcon', false)}
    />
  ));
