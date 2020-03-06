import React, { Component } from 'react';
import PropTypes from 'prop-types';
import submitConsents from 'api/submitConsents';
import Consent, { validateConsentsField } from '../Consents';
import { FromStyled, FormErrorStyled } from '../LoginPage/LoginStyled';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import { validateRegisterPassword } from '../PasswordInput/PasswordHelper';
import registerCustomer from '../../api/registerCustomer';
import getCustomerLocales from '../../api/getCustomerLocales';
import Auth from '../../services/auth';

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
    const message = validateRegisterPassword(password);
    this.setState(() => ({
      errors: {
        ...errors,
        password: t(message)
      }
    }));
  };

  validateFields = () => {
    const { email, password, consents, consentDefinitions } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: t(validateEmailField(email)),
      password: t(validateRegisterPassword(password)),
      consents: t(validateConsentsField(consents, consentDefinitions))
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
    const { email, password, consents, consentDefinitions } = this.state;
    const { offerId, setOfferError, t } = this.props;
    if (!offerId) {
      setOfferError(true);
      return false;
    }
    this.setState({
      processing: true
    });
    const localesResponse = await getCustomerLocales();
    if (!localesResponse.responseData) {
      this.setState({
        processing: false,
        generalError: t('An error occurred.')
      });
      return false;
    }
    const locales = localesResponse.responseData;
    const response = await registerCustomer(
      email,
      password,
      offerId,
      locales.locale,
      locales.country,
      locales.currency
    );
    if (response.status === 200) {
      Auth.login(email, response.responseData.jwt, submitConsents, [
        consents,
        consentDefinitions
      ]);
    } else if (response.status === 422) {
      this.setState({
        processing: false,
        generalError: t('Customer already exists.')
      });
    } else {
      this.setState({
        processing: false,
        generalError: t('An error occurred.')
      });
    }
    return true;
  };

  handlePasswordChange = value => {
    const { errors } = this.state;
    this.setState({
      password: value,
      errors: {
        ...errors,
        password: ''
      }
    });
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
    const { publisherId, t } = this.props;

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
          onChange={this.handlePasswordChange}
          onBlur={this.validatePassword}
          error={errors.password}
          showVisibilityIcon
          showPassword={showPassword}
          handleClickShowPassword={this.handleClickShowPassword}
          showPasswordStrength
          t={t}
        />
        <Consent
          t={t}
          publisherId={publisherId}
          error={errors.consents}
          onChangeFn={this.handleConsentsChange}
        />
        <Button type="submit" disabled={processing}>
          {processing ? <Loader buttonLoader white /> : t('Register')}
        </Button>
      </FromStyled>
    );
  }
}

RegisterForm.propTypes = {
  offerId: PropTypes.string,
  publisherId: PropTypes.string,
  setOfferError: PropTypes.func,
  t: PropTypes.func
};

RegisterForm.defaultProps = {
  offerId: '',
  publisherId: '',
  setOfferError: () => {},
  t: k => k
};

export default RegisterForm;
