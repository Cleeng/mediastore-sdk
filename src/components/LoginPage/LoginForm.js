import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import Loader from 'components/Loader';
import loginCustomer from 'api/Auth/loginCustomer';
import Auth from 'services/auth';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import checkCaptcha from 'api/Auth/checkCaptcha';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import validateEmailField from 'components/EmailInput/EmailHelper';
import { validatePasswordField } from 'components/PasswordInput/PasswordHelper';
import {
  FromStyled,
  FormErrorStyled,
  StyledRecaptcha,
  StyledErrorDiv,
  FormSuccessStyled
} from './LoginStyled';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      captcha: '',
      errors: {
        email: '',
        password: '',
        captcha: ''
      },
      generalError: '',
      showCaptcha: false,
      processing: false,
      hideSuccessMessage: false
    };
    this.recaptchaRef = React.createRef();
  }

  componentDidMount() {
    this.updateCaptcha();
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

  validateCaptchaField = () => {
    const { captcha, showCaptcha } = this.state;
    const { t } = this.props;
    let message = '';
    if (showCaptcha && captcha === '') {
      message = t('Please complete the CAPTCHA to complete your login.');
    }
    return message;
  };

  onCaptchaChange = () => {
    const { errors } = this.state;
    const recaptchaValue = this.recaptchaRef.current.getValue();
    this.setState({
      captcha: recaptchaValue,
      errors: {
        ...errors,
        captcha: ''
      }
    });
  };

  updateCaptcha = async () => {
    const response = await checkCaptcha('customer-login');
    this.setState({
      showCaptcha: response.responseData.required
    });
  };

  validateFields = () => {
    const { email, password } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: t(validateEmailField(email)),
      password: t(validatePasswordField(password)),
      captcha: this.validateCaptchaField()
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
    if (!offerId && !isMyAccount) {
      setOfferError(true);
      return false;
    }
    if (this.validateFields()) {
      this.setState({
        processing: true,
        hideSuccessMessage: true
      });
      const { email, password, captcha } = this.state;

      let loginBy;
      if (isMyAccount) {
        loginBy = { publisherId };
      } else {
        loginBy = { offerId };
      }

      const response = await loginCustomer(email, password, loginBy, captcha);
      if (response.status === 200) {
        await getCustomerLocales()
          .then(resp => {
            localStorage.setItem(
              'CLEENG_CUSTOMER_IP',
              resp.responseData.ipAddress
            );
            Auth.login(!!isMyAccount, email, response.responseData.jwt);
          })
          .catch(() => {
            this.renderError();
          });
      } else if (response.status === 401 || response.status === 422) {
        this.renderError('Wrong email or password');
      } else if (response.status === 429) {
        this.renderError(
          "Sorry, the captcha information doesn't match. Please try again"
        );
      } else {
        this.renderError();
      }
    }
    return true;
  };

  renderError = (message = 'An error occurred.') => {
    const { t } = this.props;
    this.updateCaptcha();
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
      showCaptcha,
      processing,
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
        {showCaptcha && (
          <>
            <StyledRecaptcha>
              <ReCAPTCHA
                ref={this.recaptchaRef}
                sitekey="6LcJ_QsUAAAAANPDxN_HZUJs_5Zabd5UoEIeyLtu"
                onChange={this.onCaptchaChange}
              />
            </StyledRecaptcha>
            {errors.captcha !== '' && (
              <StyledErrorDiv lowestPos>{errors.captcha}</StyledErrorDiv>
            )}
          </>
        )}
        <Button type="submit" disabled={processing}>
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
