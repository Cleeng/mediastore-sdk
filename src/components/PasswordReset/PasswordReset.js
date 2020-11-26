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
import Footer from 'components/Footer';
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
      processing: false,
      overloaded: false
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    saveOfferId(urlProps.location, this.setOfferId);
  }

  setOfferId = value => this.setState({ offerId: value });

  onSubmit = async e => {
    e.preventDefault();
    const { value, offerId } = this.state;
    const { onSuccess, t } = this.props;
    if (this.validateFields()) {
      this.setState({
        processing: true
      });
      const response = await resetPassword(offerId, value);
      if (response.errors.length) {
        if (response.status === 429) {
          this.setState({
            overloaded: true,
            processing: false,
            message: 'Server overloaded. Please try again later.'
          });
          setTimeout(() => {
            this.setState({
              overloaded: false,
              message: ''
            });
          }, 10 * 1000);
        } else {
          this.setState({
            processing: false,
            message: t(response.errors[0])
          });
        }
      } else {
        onSuccess(value);
      }
    }

    return true;
  };

  validateFields() {
    const { value } = this.state;
    const { t } = this.props;
    const errorFields = {
      email: EMAIL_REGEX.test(value)
        ? ''
        : t('This address does not seem to have a normal email format.')
    };
    this.setState({
      message: errorFields.email
    });
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  }

  render() {
    const { value, message, processing, overloaded } = this.state;
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
            <Button
              type="submit"
              theme="confirm"
              size="big"
              disabled={processing || overloaded}
            >
              {processing ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('Reset Password')
              )}
            </Button>
          </FormStyled>
        </PasswordResetPageStyled>
        <Footer />
      </>
    );
  }
}

PasswordReset.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
      state: PropTypes.shape({
        fromMyAccount: PropTypes.bool
      })
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
