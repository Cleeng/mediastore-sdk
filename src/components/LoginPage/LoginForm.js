import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import loginCustomer from '../../api/loginCustomer';
import {
  FromStyled,
  FormErrorStyled,
  StyledRecaptcha,
  StyledErrorDiv
} from './LoginStyled';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import { validatePasswordField } from '../PasswordInput/PasswordHelper';
import Auth from '../../services/auth';

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
      processing: false
    };
    this.recaptchaRef = React.createRef();
  }

  componentDidMount() {
    this.checkCaptcha();
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

  checkCaptcha = () => {
    axios
      .get(
        `${ENVIRONMENT_CONFIGURATION.WEB_API}/webapi/form/is-captcha-required/customer-login`
      )
      .then(response => {
        this.setState({
          showCaptcha: response.data.required
        });
      })
      .catch();
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
    const { offerId, setOfferError } = this.props;
    if (!offerId) {
      setOfferError(true);
      return false;
    }
    if (this.validateFields()) {
      this.setState({
        processing: true
      });
      const { email, password, captcha } = this.state;
      const { t } = this.props;
      const response = await loginCustomer(email, password, offerId, captcha);
      if (response.status === 200) {
        Auth.login(email, response.responseData.jwt);
      } else if (response.status === 401 || response.status === 423) {
        this.checkCaptcha();
        this.setState({
          processing: false,
          generalError: t('Wrong email or password')
        });
      } else if (response.status === 429) {
        this.checkCaptcha();
        this.setState({
          processing: false,
          generalError: t(
            "Sorry, the captcha information doesn't match. Please try again"
          )
        });
      } else {
        this.checkCaptcha();
        this.setState({
          processing: false,
          generalError: t('An error occurred.')
        });
      }
    }
    return true;
  };

  render() {
    const {
      email,
      password,
      errors,
      generalError,
      showCaptcha,
      processing
    } = this.state;
    const { t } = this.props;
    return (
      <FromStyled onSubmit={this.handleSubmit} noValidate>
        <FormErrorStyled>{generalError}</FormErrorStyled>
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
          {processing ? <Loader buttonLoader white /> : t('Log in')}
        </Button>
      </FromStyled>
    );
  }
}

LoginForm.propTypes = {
  offerId: PropTypes.string.isRequired,
  t: PropTypes.func,
  setOfferError: PropTypes.func
};
LoginForm.defaultProps = {
  t: k => k,
  setOfferError: () => {}
};

export default LoginForm;
