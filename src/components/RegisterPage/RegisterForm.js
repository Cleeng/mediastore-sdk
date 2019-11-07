import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FromStyled, FormErrorStyled } from '../LoginPage/LoginStyled';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import { validateRegisterPassword } from '../PasswordInput/PasswordHelper';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../../util/Constants';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      offerId: ENVIRONMENT_CONFIGURATION.OFFER_ID,
      errors: {
        email: '',
        password: ''
      },
      generalError: '',
      showPassword: false
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
    const { email, password } = this.state;
    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password)
    };
    this.setState({ errors: errorFields });
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateFields()) {
      this.register();
    }
  };

  register = async () => {
    const { email, password, offerId } = this.state;
    const { onRegistrationComplete } = this.props;

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
          consents: []
        })
      }
    );
    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, json.jwt);
      onRegistrationComplete();
    } else {
      this.setState({
        generalError: 'An error occured.'
      });
    }
    return true;
  };

  render() {
    const { email, password, errors, generalError, showPassword } = this.state;
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
        <Button type="submit">Register</Button>
      </FromStyled>
    );
  }
}

RegisterForm.propTypes = {
  onRegistrationComplete: PropTypes.func
};

RegisterForm.defaultProps = {
  onRegistrationComplete: () => {}
};

export default RegisterForm;
