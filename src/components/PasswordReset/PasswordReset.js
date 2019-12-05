import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import EmailInput from 'components/EmailInput/EmailInput';
import Button from '../Button/Button';
import Header from '../Header/Header';
import emailIcon from '../../assets/images/input/email.svg';
import resetPassword from '../../api/resetPassword';
import saveOfferId from '../../util/offerIdHelper';
import labeling from '../../containers/labeling';

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
    document.addEventListener('keydown', this.submitOnEnter, false);
  }

  submitOnEnter = e => {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  };

  setOfferId = value => this.setState({ offerId: value });

  onSubmit = async () => {
    const { value, offerId } = this.state;
    const { onSuccess, t } = this.props;

    if (EMAIL_REGEX.test(value)) {
      const { errors } = await resetPassword(offerId, value);
      if (errors.length) {
        this.setState({
          message: t(errors[0])
        });
      } else {
        onSuccess(value);
      }
    } else {
      this.setState({
        message: t('The email address is not properly formatted.')
      });
    }
  };

  render() {
    const { value, message } = this.state;
    const { t } = this.props;
    return (
      <>
        <Header showBackIcon />
        <PasswordResetPageStyled>
          <StyledTitle>{t('Forgot your password?')}</StyledTitle>
          <StyledMessage>
            {t(
              'Just enter your email address below and we will send you a link to reset your password'
            )}
          </StyledMessage>
          <InnerWrapper>
            <EmailInput
              label={t('Email')}
              icon={emailIcon}
              error={message}
              value={value}
              onChange={v => this.setState({ value: v })}
              onSubmit={this.onSubmit}
            />
            <Button onClickFn={this.onSubmit}>{t('Reset Password')}</Button>
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
  }),
  t: PropTypes.func
};
PasswordReset.defaultProps = {
  urlProps: {},
  t: k => k
};

export { PasswordReset as PurePasswordReset };

export default withTranslation()(labeling()(PasswordReset));
