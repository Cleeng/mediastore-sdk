import React, { Component } from 'react';
import store from 'appRedux/store';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import EmailInputLegacy from 'components/EmailInputLegacy';
import Button from 'components/Button';
import Header from 'components/Header';
import Loader from 'components/Loader';
import resetPassword from 'api/Auth/resetPassword';
import Footer from 'components/Footer';
import { getData, setData } from 'util/appConfigHelper';
import {
  PasswordResetPageStyled,
  StyledTitle,
  StyledMessage,
  FormStyled,
  PasswordResetWrapperStyled
} from './PasswordResetStyled';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      message: '',
      processing: false,
      overloaded: false
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const publisherId = getData('CLEENG_PUBLISHER_ID');

    const { value } = this.state;
    const { onSuccess, t } = this.props;

    const {
      publisherConfig: { resetUrl }
    } = store.getState();

    if (this.validateFields()) {
      this.setState({
        processing: true
      });
      const response = await resetPassword(value, publisherId, resetUrl);
      if (response.errors.length) {
        if (response.status === 429) {
          this.setState({
            overloaded: true,
            processing: false,
            message: t(
              'password-reset.error.server-overloaded',
              'Server overloaded. Please try again later.'
            )
          });
          setTimeout(() => {
            this.setState({
              overloaded: false,
              message: ''
            });
          }, 10 * 1000);
        } else {
          this.setState({
            processing: false,
            message: t(response.errors[0])
          });
        }
      } else {
        setData('CLEENG_CUSTOMER_EMAIL', value);
        onSuccess(value);
      }
    }

    return true;
  };

  validateFields() {
    const { value } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: EMAIL_REGEX.test(value)
        ? ''
        : t(
            'password-reset.error.invalid-email',
            'This address does not seem to have a normal email format.'
          )
    };
    this.setState({
      message: errorFields.email
    });
    return !Object.keys(errorFields).find((key) => errorFields[key] !== '');
  }

  render() {
    const { value, message, processing, overloaded } = this.state;
    const { t } = this.props;

    return (
      <PasswordResetWrapperStyled>
        <Header />
        <PasswordResetPageStyled>
          <StyledTitle>
            {t('password-reset.error.title', 'Forgot your password?')}
          </StyledTitle>
          <StyledMessage>
            {t(
              'password-reset.error.message',
              'Just enter your email address below and we will send you a link to reset your password'
            )}
          </StyledMessage>
          <FormStyled onSubmit={this.onSubmit} noValidate>
            <EmailInputLegacy
              label={t('password-reset.label.email', 'Email')}
              error={message}
              value={value}
              onChange={(v) => this.setState({ value: v })}
            />
            <Button
              type='submit'
              theme='confirm'
              size='big'
              disabled={processing || overloaded}
            >
              {processing ? (
                <Loader buttonLoader color='#ffffff' />
              ) : (
                t('password-reset.button.reset-password', 'Reset Password')
              )}
            </Button>
          </FormStyled>
        </PasswordResetPageStyled>
        <Footer />
      </PasswordResetWrapperStyled>
    );
  }
}

PasswordReset.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
      state: PropTypes.shape({
        fromMyAccount: PropTypes.bool
      })
    })
  }),
  t: PropTypes.func
};
PasswordReset.defaultProps = {
  urlProps: {},
  t: (k) => k
};

export { PasswordReset as PurePasswordReset };

export default withTranslation()(PasswordReset);
