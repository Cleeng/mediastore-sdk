import { Component } from 'react';
import PropTypes from 'prop-types';
import submitConsents from 'api/Customer/submitConsents';
import Loader from 'components/Loader';
import Consent from 'components/Consents';
import { FromStyled, FormErrorStyled } from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import {
  validateRegisterPassword,
  validateEmailField,
  validateConsentsField
} from 'util/validators';
import registerCustomer from 'api/Auth/registerCustomer';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Auth from 'services/auth';
import { connect } from 'react-redux';

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
      processing: false,
      disableActionButton: false
    };
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
    const { onSuccess, publisherId, t } = this.props;
    this.setState({
      processing: true
    });
    const localesResponse = await getCustomerLocales();
    if (!localesResponse.responseData) {
      this.setState({
        processing: false,
        generalError: t('register-form.error.general', 'An error occurred.')
      });
      return false;
    }
    const locales = localesResponse.responseData;
    const response = await registerCustomer(
      email,
      password,
      publisherId,
      locales.locale,
      locales.country,
      locales.currency
    );
    if (response.status === 200) {
      Auth.login(
        false,
        true,
        email,
        response.responseData.jwt,
        response.responseData.refreshToken,
        submitConsents,
        [consents, consentDefinitions],
        onSuccess
      );
    } else if (response.status === 422) {
      if (response.errors[0].includes('Enterprise account is required')) {
        this.renderError(
          t(
            'register-form.error.account',
            'You would need our product <a href="https://cleeng.com/core-ott-subscriber-management" target="_blank">Core</a> to call this API'
          )
        );
      } else {
        this.renderError(
          'register-form.error.customer-exists',
          'Customer already exists.'
        );
      }
    } else if (response.status === 429) {
      this.setState({ disableActionButton: true });
      this.renderError(
        'register-form.error.server-overloaded',
        'Server overloaded. Please try again later.'
      );
      setTimeout(() => {
        this.setState({
          disableActionButton: false,
          generalError: ''
        });
      }, 10 * 1000);
    } else {
      this.setState({
        processing: false,
        generalError: t('register-form.error.general', 'An error occurred.')
      });
    }
    return true;
  };

  renderError = (message = 'An error occurred.') => {
    const { t } = this.props;

    this.setState({
      processing: false,
      generalError:
        message || t('register-form.error.general', 'An error occurred.')
    });
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

  disabledRegisterButton = () => {
    this.setState({
      disableActionButton: true
    });
  };

  render() {
    const {
      email,
      password,
      errors,
      generalError,
      showPassword,
      disableActionButton,
      processing,
      publisherConsentsError
    } = this.state;
    const { t } = this.props;

    return (
      <FromStyled onSubmit={this.handleSubmit} noValidate>
        <FormErrorStyled dangerouslySetInnerHTML={{ __html: generalError }} />
        <EmailInput
          label={t('register-form.label.email', 'Email')}
          floatingLabels={false}
          value={email}
          onChange={e => this.setState({ email: e })}
          onBlur={this.validateEmail}
          error={errors.email}
        />
        <PasswordInput
          label={t('register-form.label.password', 'Password')}
          floatingLabels={false}
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
          error={errors.consents}
          onChangeFn={this.handleConsentsChange}
        />
        <Button
          type="submit"
          size="big"
          theme="confirm"
          margin="10px 0"
          disabled={processing || disableActionButton || publisherConsentsError}
        >
          {processing ? (
            <Loader buttonLoader color="#ffffff" />
          ) : (
            t('register-form.button.register', 'Register')
          )}
        </Button>
      </FromStyled>
    );
  }
}

RegisterForm.propTypes = {
  publisherId: PropTypes.string,
  onSuccess: PropTypes.func,
  t: PropTypes.func
};

RegisterForm.defaultProps = {
  publisherId: '',
  onSuccess: () => null,
  t: k => k
};

export const mapStateToProps = state => ({
  publisherConsentsError: state.publisherConsents.error
});

export default connect(mapStateToProps)(RegisterForm);
