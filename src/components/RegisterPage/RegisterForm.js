import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consent, { validateConsentsField } from '../Consents';
import { FromStyled, FormErrorStyled } from '../LoginPage/LoginStyled';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import { validateRegisterPassword } from '../PasswordInput/PasswordHelper';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      consents: [],
      errors: {
        email: '',
        password: '',
        consents: ''
      },
      generalError: '',
      showPassword: false,
      consentDefinitions: [],
      processing: false
    };
  }

  handleClickShowPassword = e => {
    e.preventDefault();
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

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
    const message = validateRegisterPassword(password);
    this.setState(() => ({
      errors: {
        ...errors,
        password: message
      }
    }));
  };

  validateFields = () => {
    const { email, password, consents, consentDefinitions } = this.state;
    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password),
      consents: validateConsentsField(consents, consentDefinitions)
    };
    this.setState({ errors: errorFields });
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  };

  handleConsentsChange = (value, consentDefinitions) => {
    this.setState(prev => ({
      consents: value,
      consentDefinitions,
      errors: {
        ...prev.errors,
        consents: ''
      }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateFields()) {
      this.register();
    }
  };

  register = async () => {
    const { email, password, consents } = this.state;
    const { onRegistrationComplete, offerId } = this.props;
    this.setState({
      processing: true
    });
    const response = await fetch(
      `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers`,
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
          consents
        })
      }
    );
    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem('CLEENG_AUTH_TOKEN', json.jwt);
      onRegistrationComplete();
    } else if (response.status === 422) {
      this.setState({
        processing: false,
        generalError: 'Customer already exists.'
      });
    } else {
      this.setState({
        processing: false,
        generalError: 'An error occurred.'
      });
    }
    return true;
  };

  render() {
    const {
      email,
      password,
      errors,
      generalError,
      showPassword,
      processing
    } = this.state;
    const { offerId } = this.props;

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
          showVisibilityIcon
          showPassword={showPassword}
          handleClickShowPassword={this.handleClickShowPassword}
        />
        <Consent
          offerId={offerId}
          error={errors.consents}
          onChangeFn={this.handleConsentsChange}
        />
        <Button type="submit" disabled={processing}>
          {processing ? <Loader buttonLoader /> : 'Register'}
        </Button>
      </FromStyled>
    );
  }
}

RegisterForm.propTypes = {
  onRegistrationComplete: PropTypes.func,
  offerId: PropTypes.string
};

RegisterForm.defaultProps = {
  onRegistrationComplete: () => {},
  offerId: ''
};

export default RegisterForm;
