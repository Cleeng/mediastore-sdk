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
import {
  StyledLabel,
  StyledPriceWrapper,
  StyledOfferPrice,
  StyledPriceBoxWrapper,
  StyledPriceBox,
  StyledTotalLabel,
  StyledTotalOfferPrice
} from '../Offer/OfferStyled';

const wrapperState = new Store({
  value: '',
  isOpened: false
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
          this.setState({ price: Math.max(price - price / 2, 0) });
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
        <StyledPriceBox>
          <StyledPriceBoxWrapper>
            {price < 20 && (
              <StyledPriceWrapper>
                <StyledLabel>Coupon Discount</StyledLabel>
                <StyledOfferPrice>$10</StyledOfferPrice>
              </StyledPriceWrapper>
            )}
            <StyledPriceWrapper>
              <StyledTotalLabel>Total:</StyledTotalLabel>
              <StyledTotalOfferPrice>${price}</StyledTotalOfferPrice>
            </StyledPriceWrapper>
          </StyledPriceBoxWrapper>
        </StyledPriceBox>
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
    <div
      style={{
        width: 600,
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end'
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
      isCouponInput
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
