import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import loginCustomer from 'api/Auth/loginCustomer';
import Auth from 'services/auth';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import { validatePasswordField, validateEmailField } from 'util/validators';
import { setData } from 'util/appConfigHelper';
import { FromStyled, FormErrorStyled, FormSuccessStyled } from './LoginStyled';

class LoginForm extends Component {
  constructor(props) {
    super(props);
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
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateFields()) {
      this.login();
    }
  };

  login = async () => {
    const { offerId, setOfferError, isMyAccount, publisherId } = this.props;
    const { email, password } = this.state;

    if (!offerId && !isMyAccount) {
      setOfferError(true);
      return false;
    }

    this.setState({
      processing: true,
      hideSuccessMessage: true
    });

    let loginBy;
    if (isMyAccount) {
      loginBy = { publisherId };
    } else {
      loginBy = { offerId };
    }

    const response = await loginCustomer(email, password, loginBy);
    if (response.status === 200) {
      await getCustomerLocales()
        .then(resp => {
          setData('CLEENG_CUSTOMER_IP', resp.responseData.ipAddress);
          Auth.login(!!isMyAccount, email, response.responseData.jwt);
        })
        .catch(() => {
          this.renderError();
        });
    } else if (response.status === 401 || response.status === 422) {
      this.renderError('Wrong email or password');
    } else if (response.status === 429) {
      this.setState({ overloaded: true });
      this.renderError('Server overloaded. Please try again later.', true);
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

  renderError = (message = 'An error occurred.') => {
    const { t } = this.props;
    this.setState({
      processing: false,
      generalError: t(message)
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
            {t('Your email has been changed succesfully')}
          </FormSuccessStyled>
        ) : (
          <FormErrorStyled>{generalError}</FormErrorStyled>
        )}

        <EmailInput
          label={t('Email')}
          value={email}
          onChange={e => this.setState({ email: e })}
          onBlur={this.validateEmail}
          error={errors.email}
        />
        <PasswordInput
          label={t('Password')}
          value={password}
          onChange={e => this.setState({ password: e })}
          onBlur={this.validatePassword}
          error={errors.password}
        />
        <Button
          type="submit"
          size="big"
          theme="confirm"
          margin="10px 0"
          disabled={processing || overloaded}
        >
          {processing ? <Loader buttonLoader color="#ffffff" /> : t('Sign in')}
        </Button>
      </FromStyled>
    );
  }
}

LoginForm.propTypes = {
  offerId: PropTypes.string,
  publisherId: PropTypes.string,
  isMyAccount: PropTypes.bool,
  setOfferError: PropTypes.func,
  emailChanged: PropTypes.bool,
  t: PropTypes.func
};

LoginForm.defaultProps = {
  offerId: '',
  publisherId: '',
  isMyAccount: false,
  setOfferError: () => {},
  emailChanged: false,
  t: k => k
};

export default LoginForm;
