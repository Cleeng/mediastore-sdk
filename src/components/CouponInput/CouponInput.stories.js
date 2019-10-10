import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import CouponInput from './CouponInput';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from '../Input';
import '../../styles/index.scss';

const CouponInputFeedbackWrapper = ({ message, messageType }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [price, setPrice] = useState(20);

  const onSubmit = value => {
    action('onSubmit')(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setShowMessage(true);
        if (messageType === MESSAGE_TYPE_SUCCESS) {
          setPrice(Math.max(price - 1, 0));
          resolve();
        } else {
          reject();
        }
      }, 200);
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 20
      }}
    >
      <CouponInput
        placeholder="Type here"
        onSubmit={onSubmit}
        showMessage={showMessage}
        message={message}
        messageType={messageType}
      />
      <div>
        Price:{' '}
        {price < 20 && (
          <>
            <span style={{ textDecoration: 'line-through', color: 'red' }}>
              $20
            </span>{' '}
          </>
        )}
        ${price}
      </div>
    </div>
  );
};
CouponInputFeedbackWrapper.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS])
    .isRequired
};

storiesOf('CouponInput', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white' }}>{story()}</div>
  ))
  .add('All options', () => (
    <CouponInput
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
      onSubmit={action('onSubmit')}
    />
  ))
  .add('UC: Accept any code', () => (
    <CouponInputFeedbackWrapper
      message="Your coupon has been applied! Enjoy your 40% discount."
      messageType={MESSAGE_TYPE_SUCCESS}
    />
  ))
  .add('UC: Reject any code', () => (
    <CouponInputFeedbackWrapper
      message="This is not a valid coupon code for this offer. Please check the code on your coupon and try again."
      messageType={MESSAGE_TYPE_FAIL}
    />
  ));
