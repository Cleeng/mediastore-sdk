import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  InputComponentStyled,
  InputElementWrapperStyled,
  InputElementStyled,
  MessageStyled,
  ErrorWrapper
} from './InputStyled';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from './InputConstants';

const FADE_OUT_DELAY = 5000;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppressMessage: false,
      timeoutId: 0
    };
  }

  componentDidUpdate(prevProps) {
    const {
      showMessage,
      clearMessageAfterDelay,
      message,
      messageType
    } = this.props;

    if (
      showMessage !== prevProps.showMessage ||
      message !== prevProps.message ||
      messageType !== prevProps.messageType ||
      clearMessageAfterDelay !== prevProps.clearMessageAfterDelay
    ) {
      this.disableSuppressMessage();
      this.clearFadeOutTimeout();
      if (showMessage && clearMessageAfterDelay) {
        this.scheduleFadeOut();
      }
    }
  }

  componentWillUnmount() {
    this.clearFadeOutTimeout();
  }

  disableSuppressMessage = () =>
    this.setState({
      suppressMessage: false
    });

  clearFadeOutTimeout = () => {
    const { timeoutId } = this.state;

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.setState({
        timeoutId: 0
      });
    }
  };

  scheduleFadeOut = () => {
    const timeoutId = setTimeout(() => {
      this.setState({
        suppressMessage: true,
        timeoutId: 0
      });
    }, FADE_OUT_DELAY);
    this.setState({
      timeoutId
    });
  };

  handleSubmit = event => {
    const { blurOnSubmit, onSubmit } = this.props;
    if (blurOnSubmit) {
      event.target.blur();
    }

    const callback = () =>
      this.setState({
        suppressMessage: false
      });

    onSubmit(event.target.value)
      .then(callback)
      .catch(callback);
  };

  render() {
    const {
      type,
      placeholder,
      icon,
      clearMessageOnFocus,
      showMessage,
      message,
      messageType,
      value,
      isCouponInput,
      onChange,
      onBlur,
      error
    } = this.props;
    const { suppressMessage } = this.state;

    return (
      <InputComponentStyled>
        {isCouponInput && (
          <MessageStyled
            showMessage={showMessage && !suppressMessage}
            messageType={messageType}
          >
            {message}
          </MessageStyled>
        )}
        <InputElementWrapperStyled
          error={error}
          showMessage={showMessage && !suppressMessage}
          messageType={messageType}
          icon={icon}
        >
          <InputElementStyled
            placeholder={placeholder}
            onKeyDown={event => {
              if (event.key === 'Enter' && isCouponInput) {
                this.handleSubmit(event);
              }
            }}
            onFocus={() => {
              if (clearMessageOnFocus) {
                this.setState({
                  suppressMessage: true
                });
              }
            }}
            autoComplete="off"
            value={value}
            onChange={event => onChange(event.target.value)}
            type={type}
            onBlur={onBlur}
          />
          {!isCouponInput && <ErrorWrapper>{error}</ErrorWrapper>}
        </InputElementWrapperStyled>
      </InputComponentStyled>
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  clearMessageAfterDelay: PropTypes.bool,
  clearMessageOnFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  showMessage: PropTypes.bool,
  message: PropTypes.node,
  messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  isCouponInput: PropTypes.bool,
  onBlur: PropTypes.func,
  error: PropTypes.string
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
  icon: null,
  clearMessageAfterDelay: false,
  clearMessageOnFocus: false,
  blurOnSubmit: false,
  showMessage: false,
  messageType: MESSAGE_TYPE_FAIL,
  message: null,
  onSubmit: () => {},
  isCouponInput: false,
  onChange: () => {},
  onBlur: () => {},
  error: '',
  value: ''
};

export default Input;
