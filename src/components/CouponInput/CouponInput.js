import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { ReactComponent as CloseIcon } from 'assets/images/xmark.svg';

import { withTranslation } from 'react-i18next';
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
    const {
      couponDetails: { showMessage, message, messageType }
    } = this.props;
    if (
      showMessage !== prevProps.couponDetails.showMessage ||
      message !== prevProps.couponDetails.message ||
      messageType !== prevProps.couponDetails.messageType
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
    const { onSubmit, onInputToggle, value, source } = this.props;
    if (!isOpened) {
      window.dispatchEvent(
        new CustomEvent('MSSDK:redeem-coupon-button-clicked', {
          detail: { source }
        })
      );
      onInputToggle();
      this.setState({ isOpened: true });
    } else {
      window.dispatchEvent(
        new CustomEvent('MSSDK:redeem-button-clicked', {
          detail: {
            coupon: value,
            source
          }
        })
      );
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
      couponDetails: { message, translationKey = '', messageType, showMessage },
      fullWidth,
      value,
      onChange,
      couponLoading,
      t
    } = this.props;

    const { suppressMessage, isOpened } = this.state;

    return (
      <InputComponentStyled isOpened={isOpened} fullWidth={fullWidth}>
        <InputElementWrapperStyled>
          <CloseButtonStyled
            onClick={() => this.onCloseClick()}
            isInputOpened={isOpened}
          >
            {CloseIcon && <CloseIcon />}
          </CloseButtonStyled>
          <InputElementStyled
            isOpened={isOpened}
            placeholder={t('coupon-input.placeholder', 'Your coupon')}
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
            aria-label={t('coupon-input.placeholder', 'Your coupon')}
            aria-required={false}
          />
          <Button
            width="auto"
            onClickFn={async () => {
              await this.onRedeemClick();
            }}
          >
            <>
              {couponLoading && <Loader buttonLoader color="#ffffff" />}
              {!couponLoading && isOpened && t('coupon-input.redeem', 'Redeem')}
              {!couponLoading &&
                !isOpened &&
                t('coupon-input.redeem-coupon', 'Redeem coupon')}
            </>
          </Button>
        </InputElementWrapperStyled>
        {isOpened && (
          <MessageStyled
            showMessage={showMessage && !suppressMessage}
            messageType={messageType}
          >
            {t(translationKey, message)}
          </MessageStyled>
        )}
      </InputComponentStyled>
    );
  }
}

CouponInput.propTypes = {
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  couponDetails: PropTypes.shape({
    showMessage: PropTypes.bool,
    translationKey: PropTypes.string,
    message: PropTypes.node,
    messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS])
  }),
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onInputToggle: PropTypes.func,
  t: PropTypes.func,
  couponLoading: PropTypes.bool.isRequired,
  source: PropTypes.oneOf(['myaccount', 'checkout', ''])
};

CouponInput.defaultProps = {
  value: '',
  couponDetails: {
    showMessage: false,
    message: '',
    messageType: MESSAGE_TYPE_SUCCESS
  },
  fullWidth: false,
  onChange: () => {},
  onClose: () => {},
  onInputToggle: () => {},
  t: k => k,
  source: ''
};

export { CouponInput as PureCouponInput };
export default withTranslation()(CouponInput);
