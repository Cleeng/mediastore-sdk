import React, { Component } from 'react';
import PropTypes from 'prop-types';
import submitConsents from 'api/Customer/submitConsents';
import Loader from 'components/Loader';
import Consent, { validateConsentsField } from 'components/Consents';
import { FromStyled, FormErrorStyled } from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import validateEmailField from 'components/EmailInput/EmailHelper';
import { validateRegisterPassword } from 'components/PasswordInput/PasswordHelper';
import registerCustomer from 'api/Auth/registerCustomer';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Captcha, {
  isCaptchaRequired,
  validateCaptchaField
} from 'components/Captcha';
import Auth from 'services/auth';
import { setData } from 'util/appConfigHelper';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      consents: [],
      captcha: '',
      errors: {
        email: '',
        password: '',
        consents: '',
        captcha: ''
      },
      generalError: '',
      showPassword: false,
      consentDefinitions: [],
      processing: false,
      showCaptcha: false
    };
    this.recaptchaRef = React.createRef();
  }

  componentDidMount() {
    isCaptchaRequired('customer-registration').then(resp =>
      this.setState({
        showCaptcha: resp
      })
    );
  }

  handleClickShowPassword = () => {
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
    const {
      email,
      password,
      consents,
      consentDefinitions,
      captcha,
      showCaptcha
    } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: t(validateEmailField(email)),
      password: t(validateRegisterPassword(password)),
      consents: t(validateConsentsField(consents, consentDefinitions)),
      captcha: t(validateCaptchaField(captcha, showCaptcha))
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
    const {
      email,
      password,
      consents,
      consentDefinitions,
      captcha
    } = this.state;
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
    setData('CLEENG_CUSTOMER_IP', locales.ipAddress);
    const response = await registerCustomer(
      email,
      password,
      offerId,
      locales.locale,
      locales.country,
      locales.currency,
      captcha
    );
    if (response.status === 200) {
      Auth.login(false, email, response.responseData.jwt, submitConsents, [
        consents,
        consentDefinitions
      ]);
    } else if (response.status === 422) {
      isCaptchaRequired('customer-registration').then(resp => {
        this.setState({
          processing: false,
          showCaptcha: resp,
          generalError: t('Customer already exists.')
        });
      });
    } else {
      isCaptchaRequired('customer-registration').then(resp => {
        this.setState({
          processing: false,
          showCaptcha: resp,
          generalError: t('An error occurred.')
        });
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
      processing,
      showCaptcha
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
        {showCaptcha && (
          <Captcha
            recaptchaRef={this.recaptchaRef}
            onChange={() =>
              this.setState({
                captcha: this.recaptchaRef.current.getValue(),
                errors: {
                  ...errors,
                  captcha: ''
                }
              })
            }
            error={errors.captcha}
          />
        )}
        <Button type="submit" disabled={processing}>
          {processing ? <Loader buttonLoader color="#ffffff" /> : t('Register')}
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
