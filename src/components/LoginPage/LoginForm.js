import React, { Component } from 'react';
import PropType from 'prop-types';
import { FromStyled, FormErrorStyled } from './LoginStyled';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import validatePasswordField from '../PasswordInput/PasswordHelper';

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
      loginError: ''
    };
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

  validateFields = () => {
    const { email, password } = this.state;
    const errorFields = {
      email: validateEmailField(email),
      password: validatePasswordField(password)
    };
    this.setState({ errors: errorFields });
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateFields()) {
      this.login();
    }
  };

  login = async () => {
    const { onLoginComplete } = this.props;
    onLoginComplete();
    // TODO: login logic after pass validation
    // if not successful login
    // this.setState({
    //   loginError: 'Wrong username or password.'
    // });
  };

  render() {
    const { email, password, errors, loginError } = this.state;
    return (
      <FromStyled onSubmit={this.handleSubmit} noValidate>
        <FormErrorStyled>{loginError}</FormErrorStyled>
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
        <Button type="submit">Log in</Button>
      </FromStyled>
    );
  }
}

LoginForm.propTypes = {
  onLoginComplete: PropType.func
};
LoginForm.defaultProps = {
  onLoginComplete: () => {}
};

export default LoginForm;
