import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import loginCustomer from 'api/Auth/loginCustomer';
import Auth from 'services/auth';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import validateEmailField from 'components/EmailInput/EmailHelper';
import { validatePasswordField } from 'components/PasswordInput/PasswordHelper';
import Captcha, {
  isCaptchaRequired,
  validateCaptchaField
} from 'components/Captcha';
import { setData } from 'util/appConfigHelper';
import { FromStyled, FormErrorStyled, FormSuccessStyled } from './LoginStyled';

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
    isCaptchaRequired('customer-login').then(resp =>
      this.setState({
        showCaptcha: resp
      })
    );
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
    const { email, password, captcha, showCaptcha } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: t(validateEmailField(email)),
      password: t(validatePasswordField(password)),
      captcha: t(validateCaptchaField(captcha, showCaptcha))
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
    const { email, password, captcha } = this.state;

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

    const response = await loginCustomer(email, password, loginBy, captcha);
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
      this.renderError(
        "Sorry, the captcha information doesn't match. Please try again"
      );
    } else {
      this.renderError();
    }
    return true;
  };

  renderError = (message = 'An error occurred.') => {
    const { t } = this.props;
    isCaptchaRequired('customer-login').then(resp => {
      this.setState({
        processing: false,
        showCaptcha: resp,
        generalError: t(message)
      });
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
