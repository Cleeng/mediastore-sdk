import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input, { MESSAGE_TYPE_FAIL } from '../Input';
import Button from '../Button/Button';
import emailIcon from '../../assets/images/input/email.svg';
import resetPassword from '../../api/resetPassword';
import {
  PasswordResetPageStyled,
  StyledTitle,
  StyledMessage
} from './PasswordResetStyled';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showMessage: false,
      message: ''
    };
  }

  onSubmit = async () => {
    const { value } = this.state;
    const { onSuccess } = this.props;

    this.setState({
      showMessage: false
    });
    if (EMAIL_REGEX.test(value)) {
      const { errors } = await resetPassword({
        email: value
      });
      if (errors.length) {
        this.setState({
          showMessage: true,
          message: errors[0]
        });
      } else {
        onSuccess(value);
      }
    } else {
      this.setState({
        showMessage: true,
        message: 'The email address is not properly formatted.'
      });
    }
  };

  render() {
    const { value, showMessage, message } = this.state;
    return (
      <PasswordResetPageStyled>
        <StyledTitle>Forgot your password?</StyledTitle>
        <StyledMessage>
          Just enter your email address below and we will send you a link to
          reset your password
        </StyledMessage>
        <Input
          icon={emailIcon}
          showMessage={showMessage}
          messageType={MESSAGE_TYPE_FAIL}
          message={message}
          value={value}
          onChange={v => this.setState({ value: v })}
          onSubmit={this.onSubmit}
        />
        <Button onClickFn={this.onSubmit}>Reset Password</Button>
      </PasswordResetPageStyled>
    );
  }
}
PasswordReset.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export default PasswordReset;
