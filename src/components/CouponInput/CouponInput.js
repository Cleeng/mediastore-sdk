import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { ReactComponent as CloseIcon } from 'assets/images/xmark.svg';

import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  InputComponentStyled,
  MessageStyled,
  InputElementWrapperStyled,
  InputElementStyled,
  CloseButtonStyled
} from './CouponInputStyled';

const FADE_OUT_DELAY = 5000;

class CouponInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppressMessage: false,
      timeoutId: 0,
      isOpened: false
    };
  }

  componentDidUpdate(prevProps) {
    const { showMessage, message, messageType } = this.props;
    if (
      showMessage !== prevProps.showMessage ||
      message !== prevProps.message ||
      messageType !== prevProps.messageType
    ) {
      this.disableSuppressMessage();
      this.clearFadeOutTimeout();
      if (showMessage) {
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

  handleSubmit = async event => {
    const { onSubmit } = this.props;
    event.target.blur();
    await onSubmit(event.target.value);
    this.setState({
      suppressMessage: false
    });
  };

  onRedeemClick = async () => {
    const { isOpened } = this.state;
    const { onSubmit, onInputToggle, value } = this.props;
    if (!isOpened) {
      onInputToggle();
      this.setState({ isOpened: true });
    } else {
      await onSubmit(value);
    }
  };

  onCloseClick = () => {
    const { isOpened } = this.state;
    const { onClose } = this.props;
    if (isOpened) {
      this.setState({ isOpened: false });
      onClose();
    }
  };

  render() {
    const {
      showMessage,
      fullWidth,
      message,
      messageType,
      value,
      onChange,
      couponLoading,
      t
    } = this.props;
    const { suppressMessage, isOpened } = this.state;

    return (
      <InputComponentStyled isOpened={isOpened} fullWidth={fullWidth}>
        <InputElementWrapperStyled
          showMessage={showMessage && !suppressMessage}
          messageType={messageType}
        >
          <CloseButtonStyled onClick={() => this.onCloseClick()}>
            {CloseIcon && <CloseIcon />}
          </CloseButtonStyled>
          <InputElementStyled
            isOpened={isOpened}
            placeholder={t('Your coupon')}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.handleSubmit(event);
              }
            }}
            onFocus={() => {
              this.setState({
                suppressMessage: true
              });
            }}
            autoComplete="off"
            value={value}
            onChange={event => onChange(event.target.value)}
            type="text"
            readOnly={couponLoading}
            fullWidth={fullWidth}
            aria-label={t('Your coupon')}
            aria-required={false}
          />
          {couponLoading && <Loader smallLoader />}
          <Button width="auto" onClickFn={() => this.onRedeemClick()}>
            {isOpened ? t('Redeem') : t('Redeem coupon')}
          </Button>
        </InputElementWrapperStyled>
        {isOpened && (
          <MessageStyled
            showMessage={showMessage && !suppressMessage}
            messageType={messageType}
          >
            {message}
          </MessageStyled>
        )}
      </InputComponentStyled>
    );
  }
}

CouponInput.propTypes = {
  value: PropTypes.string,
  showMessage: PropTypes.bool,
  fullWidth: PropTypes.bool,
  message: PropTypes.node,
  messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onInputToggle: PropTypes.func,
  t: PropTypes.func,
  couponLoading: PropTypes.bool
};

CouponInput.defaultProps = {
  value: '',
  showMessage: false,
  fullWidth: false,
  message: null,
  messageType: MESSAGE_TYPE_FAIL,
  onChange: () => {},
  onClose: () => {},
  onInputToggle: () => {},
  t: k => k,
  couponLoading: false
};

export { CouponInput as PureCouponInput };

export default withTranslation()(labeling()(CouponInput));
