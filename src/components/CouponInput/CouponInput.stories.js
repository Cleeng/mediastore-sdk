import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import { State, Store } from '@sambego/storybook-state';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';
import { PureCouponInput as CouponInput } from './CouponInput';
import 'styles/index.scss';

const wrapperState = new Store({
  value: '',
  isOpened: false
});

class CouponInputFeedbackWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      inputValue: ''
    };
  }

  onSubmit = value => {
    action('onSubmit')(value);
    const { messageType } = this.props;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({ showMessage: true });
        if (messageType === MESSAGE_TYPE_SUCCESS) {
          resolve();
        } else {
          reject();
        }
      }, 200);
    });
  };

  render() {
    const { messageType, message } = this.props;
    const { showMessage, inputValue } = this.state;
    return (
      <CouponInput
        onSubmit={this.onSubmit}
        showMessage={showMessage}
        message={message}
        messageType={messageType}
        value={inputValue}
        onChange={e => this.setState({ inputValue: e })}
      />
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
    <div
      style={{
        width: 600,
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 20
      }}
    >
      {story()}
    </div>
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
    />
  ))
  .add('UC: Accept any code', () => (
    <CouponInputFeedbackWrapper
      message="Your coupon has been applied! Enjoy your 50% discount."
      messageType={MESSAGE_TYPE_SUCCESS}
    />
  ))
  .add('UC: Reject any code', () => (
    <CouponInputFeedbackWrapper
      message="This is not a valid coupon code for this offer. Please check the code on your coupon and try again."
      messageType={MESSAGE_TYPE_FAIL}
    />
  ));
