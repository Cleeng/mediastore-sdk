import React, { Component } from 'react';
import PropType from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import {
  FromStyled,
  FormErrorStyled,
  StyledRecaptcha,
  StyledErrorDiv
} from './LoginStyled';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import { validatePasswordField } from '../PasswordInput/PasswordHelper';

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
      showCaptcha: false
    };
    this.recaptchaRef = React.createRef();
  }

  componentDidMount() {
    this.checkCaptcha();
  }

  validateEmail = () => {
    const { email, errors } = this.state;
    const message = validateEmailField(email);
    this.setState(() => ({
      errors: {
        ...errors,
        email: message
      }
    }));
  };

  validatePassword = () => {
    const { password, errors } = this.state;
    const message = validatePasswordField(password);
    this.setState(() => ({
      errors: {
        ...errors,
        password: message
      }
    }));
  };

  validateCaptchaField = () => {
    const { captcha, showCaptcha } = this.state;
    let message = '';
    if (showCaptcha && captcha === '') {
      message = 'Please complete the CAPTCHA to complete your login.';
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
    const errorFields = {
      email: validateEmailField(email),
      password: validatePasswordField(password),
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
    if (this.validateFields()) {
      const { email, password, captcha } = this.state;
      const { onLoginComplete, offerId } = this.props;
      const response = await fetch(
        `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/auths`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            offerId,
            captcha
          })
        }
      );
      if (response.status === 200) {
        const json = await response.json();
        localStorage.setItem('CLEENG_LOGIN_DATA', json.responseData.jwt);
        onLoginComplete();
      } else if (response.status === 422) {
        this.checkCaptcha();
        this.setState({
          generalError: 'Wrong email or password'
        });
      } else {
        this.checkCaptcha();
        this.setState({
          generalError: 'An error occurred.'
        });
      }
    }
    return true;
  };

  render() {
    const { email, password, errors, generalError, showCaptcha } = this.state;
    return (
      <FromStyled onSubmit={this.handleSubmit} noValidate>
        <FormErrorStyled>{generalError}</FormErrorStyled>
        <EmailInput
          value={email}
          onChange={e => this.setState({ email: e })}
          onBlur={this.validateEmail}
          error={errors.email}
        />
        <PasswordInput
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
        <Button type="submit">Log in</Button>
      </FromStyled>
    );
  }
}

LoginForm.propTypes = {
  offerId: PropType.string.isRequired,
  onLoginComplete: PropType.func
};
LoginForm.defaultProps = {
  onLoginComplete: () => {}
};

export default LoginForm;
