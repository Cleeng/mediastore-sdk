import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import 'styles/index.scss';
import couponIcon from 'assets/images/input/coupon.svg';
import emailIcon from 'assets/images/input/email.svg';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from './InputConstants';
import Input from './Input';

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white' }}>{story()}</div>
  ))
  .add('All Input options', () => (
    <Input
      placeholder={text('placeholder', 'Type here...')}
      icon={select(
        'icon',
        {
          none: null,
          coupon: couponIcon,
          email: emailIcon
        },
        null
      )}
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
    />
  ));
