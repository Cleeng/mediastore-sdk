import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import EmailInput from 'components/EmailInput';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import Header from 'components/Header';
import Loader from 'components/Loader';
import resetPassword from 'api/Auth/resetPassword';
import saveOfferId from 'util/offerIdHelper';
import labeling from 'containers/labeling';
import Captcha, {
  isCaptchaRequired,
  validateCaptchaField
} from 'components/Captcha';
import {
  PasswordResetPageStyled,
  StyledTitle,
  StyledMessage,
  FormStyled
} from './PasswordResetStyled';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '',
      value: '',
      message: '',
      showCaptcha: false,
      captcha: '',
      captchaError: '',
      processing: false
    };
    this.recaptchaRef = React.createRef();
  }

  componentDidMount() {
    const { urlProps } = this.props;
    saveOfferId(urlProps.location, this.setOfferId);
    isCaptchaRequired('customer-reset-password').then(resp =>
      this.setState({
        showCaptcha: resp
      })
    );
  }

  setOfferId = value => this.setState({ offerId: value });

  onSubmit = async e => {
    e.preventDefault();
    const { value, offerId, captcha } = this.state;
    const { onSuccess, t } = this.props;
    if (this.validateFields()) {
      this.setState({
        processing: true
      });
      const { errors } = await resetPassword(offerId, value, captcha);
      if (errors.length) {
        this.setState({
          processing: false,
          showCaptcha: await isCaptchaRequired('customer-reset-password'),
          message: t(errors[0])
        });
      } else {
        onSuccess(value);
      }
    }

    return true;
  };

  validateFields() {
    const { captcha, showCaptcha, value } = this.state;
    const { t } = this.props;
    const errorFields = {
      captcha: t(validateCaptchaField(captcha, showCaptcha)),
      email: EMAIL_REGEX.test(value)
        ? ''
        : t('The email address is not properly formatted.')
    };
    this.setState({
      message: errorFields.email,
      captchaError: errorFields.captcha
    });
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  }

  render() {
    const {
      value,
      message,
      processing,
      showCaptcha,
      captchaError
    } = this.state;
    const {
      t,
      urlProps: { location }
    } = this.props;
    const fromMyAccount = location.state ? location.state.fromMyAccount : false;
    return (
      <>
        <Header>
          <BackButton isMyAccount={fromMyAccount} />
        </Header>
        <PasswordResetPageStyled>
          <StyledTitle>{t('Forgot your password?')}</StyledTitle>
          <StyledMessage>
            {t(
              'Just enter your email address below and we will send you a link to reset your password'
            )}
          </StyledMessage>
          <FormStyled onSubmit={this.onSubmit} noValidate>
            <EmailInput
              label={t('Email')}
              error={message}
              value={value}
              onChange={v => this.setState({ value: v })}
            />
            {showCaptcha && (
              <Captcha
                recaptchaRef={this.recaptchaRef}
                onChange={() =>
                  this.setState({
                    captcha: this.recaptchaRef.current.getValue(),
                    captchaError: ''
                  })
                }
                error={captchaError}
              />
            )}
            <Button type="submit" disabled={processing}>
              {processing ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('Reset Password')
              )}
            </Button>
          </FormStyled>
        </PasswordResetPageStyled>
      </>
    );
  }
}

PasswordReset.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
      state: PropTypes.object
    })
  }),
  t: PropTypes.func
};
PasswordReset.defaultProps = {
  urlProps: {},
  t: k => k
};

export { PasswordReset as PurePasswordReset };

export default withTranslation()(labeling()(PasswordReset));
