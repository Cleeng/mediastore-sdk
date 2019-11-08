import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button/Button';
import Header from '../Header/Header';
import emailIcon from '../../assets/images/input/email.svg';
import resetPassword from '../../api/resetPassword';
import saveOfferId from '../../util/offerIdHelper';

import {
  PasswordResetPageStyled,
  StyledTitle,
  StyledMessage,
  InnerWrapper
} from './PasswordResetStyled';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '',
      value: '',
      message: ''
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    saveOfferId(urlProps.location, this.setOfferId);
  }

  setOfferId = value => this.setState({ offerId: value });

  onSubmit = async () => {
    const { value, offerId } = this.state;
    const { onSuccess } = this.props;

    if (EMAIL_REGEX.test(value)) {
      const { errors } = await resetPassword(offerId, value);
      if (errors.length) {
        this.setState({
          message: errors[0]
        });
      } else {
        onSuccess(value);
      }
    } else {
      this.setState({
        message: 'The email address is not properly formatted.'
      });
    }
  };

  render() {
    const { value, message } = this.state;
    return (
      <>
        <Header showBackIcon />
        <PasswordResetPageStyled>
          <StyledTitle>Forgot your password?</StyledTitle>
          <StyledMessage>
            Just enter your email address below and we will send you a link to
            reset your password
          </StyledMessage>
          <InnerWrapper>
            <Input
              icon={emailIcon}
              error={message}
              value={value}
              onChange={v => this.setState({ value: v })}
              onSubmit={this.onSubmit}
            />
            <Button onClickFn={this.onSubmit}>Reset Password</Button>
          </InnerWrapper>
        </PasswordResetPageStyled>
      </>
    );
  }
}

PasswordReset.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  })
};
PasswordReset.defaultProps = {
  urlProps: {}
};

export default PasswordReset;
