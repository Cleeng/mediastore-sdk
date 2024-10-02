import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import Auth from 'services/auth';
import Button from 'components/Button';
import EmailInputLegacy from 'components/EmailInputLegacy';
import PasswordInput from 'components/PasswordInput';
import { validatePasswordField, validateEmailField } from 'util/validators';
import loginCustomer from '../../api/Auth/loginCustomer';
import { FromStyled, FormErrorStyled, FormSuccessStyled } from './LoginStyled';

export const thisThrowsAnError = () => {
  throw new Error('new error thrown without integrations');
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      },
      generalError: '',
      processing: false,
      overloaded: false,
      hideSuccessMessage: false
    };
  }

  componentDidMount() {
    if (this.emailInput && this.emailInput.current)
      this.emailInput.current.focus();
  }

  validateEmail = () => {
    const { email, errors } = this.state;
    const { t } = this.props;
    const message = validateEmailField(email);
    this.setState(() => ({
      errors: {
        ...errors,
        email: t(message)
      }
    }));
  };

  validatePassword = () => {
    const { password, errors } = this.state;
    const { t } = this.props;
    const message = validatePasswordField(password);
    this.setState(() => ({
      errors: {
        ...errors,
        password: t(message)
      }
    }));
  };

  validateFields = () => {
    const { email, password } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: t(validateEmailField(email)),
      password: t(validatePasswordField(password))
    };
    this.setState({ errors: errorFields, generalError: '' });
    return !Object.keys(errorFields).find((key) => errorFields[key] !== '');
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateFields()) {
      this.login();
    }
  };

  login = async () => {
    const { offerId, isMyAccount, publisherId, onSuccess } = this.props;
    const { email, password } = this.state;

    const { t } = this.props;

    this.setState({
      processing: true,
      hideSuccessMessage: true
    });

    const response = await loginCustomer(
      email,
      password,
      publisherId ? { publisherId } : { offerId }
    );
    if (response.status === 200) {
      Auth.login(
        !!isMyAccount,
        false,
        email,
        response.responseData.jwt,
        response.responseData.refreshToken,
        null,
        null,
        onSuccess
      );
    } else if (response.status === 401 || response.status === 422) {
      this.renderError(
        t('login-form.error.wrong-email-or-password', 'Wrong email or password')
      );
    } else if (response.status === 429) {
      this.setState({ overloaded: true });
      this.renderError(
        t(
          'login-form.error.server-overloaded',
          'Server overloaded. Please try again later.'
        )
      );
      setTimeout(() => {
        this.setState({
          overloaded: false,
          generalError: ''
        });
      }, 10 * 1000);
    } else {
      this.renderError();
    }
    return true;
  };

  renderError = (message) => {
    const { t } = this.props;
    this.setState({
      processing: false,
      generalError:
        message || t('login-form.error.general-error', 'An error occurred.')
    });
  };

  render() {
    const {
      email,
      password,
      errors,
      generalError,
      processing,
      overloaded,
      hideSuccessMessage
    } = this.state;
    const { emailChanged, t } = this.props;
    return (
      <FromStyled onSubmit={this.handleSubmit} noValidate>
        {emailChanged && !generalError && !hideSuccessMessage ? (
          <FormSuccessStyled>
            {t(
              'login-form.email-change-success',
              'Your email has been changed successfully'
            )}
          </FormSuccessStyled>
        ) : (
          <FormErrorStyled>{generalError}</FormErrorStyled>
        )}
        <EmailInputLegacy
          reference={this.emailInput}
          label={t('Email')}
          floatingLabels={false}
          value={email}
          onChange={(e) => this.setState({ email: e })}
          onBlur={this.validateEmail}
          error={errors.email}
        />
        <PasswordInput
          label={t('Password')}
          floatingLabels={false}
          value={password}
          onChange={(e) => this.setState({ password: e })}
          onBlur={this.validatePassword}
          error={errors.password}
        />
        <Button
          type='submit'
          size='big'
          theme='confirm'
          margin='10px 0'
          disabled={processing || overloaded}
        >
          {processing ? (
            <Loader buttonLoader color='#ffffff' />
          ) : (
            t('login-form.button.sign-in', 'Sign in')
          )}
        </Button>
      </FromStyled>
    );
  }
}

LoginForm.propTypes = {
  offerId: PropTypes.string,
  publisherId: PropTypes.string,
  isMyAccount: PropTypes.bool,
  emailChanged: PropTypes.bool,
  onSuccess: PropTypes.func,
  t: PropTypes.func
};

LoginForm.defaultProps = {
  offerId: '',
  publisherId: '',
  isMyAccount: false,
  emailChanged: false,
  onSuccess: () => null,
  t: (k) => k
};

export default LoginForm;
