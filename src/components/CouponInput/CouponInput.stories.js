import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import { State, Store } from '@sambego/storybook-state';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import CouponInput from './CouponInput';
import 'styles/index.scss';

const wrapperState = new Store({
  value: ''
});

class CouponInputFeedbackWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      price: 20,
      inputValue: ''
    };
  }

  onSubmit = value => {
    action('onSubmit')(value);
    const { messageType } = this.props;
    const { price } = this.state;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({ showMessage: true });
        if (messageType === MESSAGE_TYPE_SUCCESS) {
          this.setState({ price: Math.max(price - 1, 0) });
          resolve();
        } else {
          reject();
        }
      }, 200);
    });
  };

  render() {
    const { messageType, message } = this.props;
    const { price, showMessage, inputValue } = this.state;
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
          onSubmit={this.onSubmit}
          showMessage={showMessage}
          message={message}
          messageType={messageType}
          value={inputValue}
          onChange={e => this.setState({ inputValue: e })}
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
  }
}
CouponInputFeedbackWrapper.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS])
    .isRequired
};

storiesOf('Checkout/CouponInput', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white' }}>{story()}</div>
  ))
  .addDecorator(story => (
    <State store={wrapperState}>{state => story(state)}</State>
  ))
  .add('All options', state => (
    <CouponInput
      value={state.value}
      onChange={e => wrapperState.set({ value: e })}
      showMessage={boolean('showMessage', false)}
      message={text('message', 'Message')}
      messageType={select(
        'messageType',
        {
          success: MESSAGE_TYPE_SUCCESS,
          fail: MESSAGE_TYPE_FAIL
        },
        MESSAGE_TYPE_SUCCESS
      )}
      onSubmit={action('onSubmit')}
      isCouponInput
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
