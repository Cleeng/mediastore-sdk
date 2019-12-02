import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import { State, Store } from '@sambego/storybook-state';
import 'styles/index.scss';
import couponIcon from 'assets/images/input/coupon.svg';
import emailIcon from 'assets/images/input/email.svg';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from './InputConstants';
import Input from './Input';
import '../../styles/index.scss';
import passwordIcon from '../../assets/images/input/lock.svg';

const wrapperState = new Store({
  value: ''
});

const inputTypes = {
  text: 'text',
  email: 'email',
  password: 'password'
};

storiesOf('Input', module)
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
      icon={select(
        'icon',
        {
          none: null,
          coupon: couponIcon,
          email: emailIcon,
          password: passwordIcon
        },
        null
      )}
      isCouponInput={boolean('isCouponInput', false)}
      showMessage={boolean('showMessage', false)}
      message={text('message', '')}
      messageType={select(
        'messageType',
        {
          success: MESSAGE_TYPE_SUCCESS,
          fail: MESSAGE_TYPE_FAIL
        },
        MESSAGE_TYPE_SUCCESS
      )}
      clearMessageAfterDelay={boolean('clearMessageAfterDelay', false)}
      clearMessageOnFocus={boolean('clearMessageOnFocus', false)}
      blurOnSubmit={boolean('blurOnSubmit', false)}
      onSubmit={async () => action('onSubmit')}
      value={state.value}
      onChange={e => wrapperState.set({ value: e })}
      error={text('error', '')}
      showVisibilityIcon={boolean('showVisibilityIcon', false)}
    />
  ));
